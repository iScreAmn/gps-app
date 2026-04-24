import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import qrcodeSuccessSound from "../../assets/files/qrcode.mp3";
import { exportScansToExcel, scansToXlsxBase64 } from "../../utils/excelExport";
import "./Scanner.css";

const API_URL = (() => {
  const envUrl =
    import.meta.env.VITE_API_URL && String(import.meta.env.VITE_API_URL).trim();
  if (envUrl) return envUrl.replace(/\/$/, "");
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return `http://${host}:3001`;
    }
    return "https://gps-app-server.vercel.app";
  }
  return "https://gps-app-server.vercel.app";
})();

const STORAGE_KEY = "scanner_scans_v1";
const SHEET_TRANSITION_MS = 280;
const SHEET_SWIPE_CLOSE_PX = 100;

function clearReaderDomById(id) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = "";
  }
}

/** GS1 Application Identifier — убираем известные префиксы (дополняй knownPrefixes при новых AI). */
function normalizeCode(raw) {
  if (typeof raw !== "string") return raw;
  const knownPrefixes = ["(1P)", "1P"];
  for (const prefix of knownPrefixes) {
    if (raw.startsWith(prefix)) {
      return raw.replace(prefix, "");
    }
  }
  return raw;
}

function getCodeType(rawCode, cleanCode) {
  if (typeof rawCode !== "string" || typeof cleanCode !== "string") {
    return "TEXT";
  }
  return rawCode !== cleanCode ? "GS1" : "TEXT";
}

function buildScanRecord(rawCode) {
  const cleanCode = normalizeCode(rawCode);
  return {
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    rawCode,
    cleanCode,
    timestamp: Date.now(),
    type: getCodeType(rawCode, cleanCode),
  };
}

function loadScansFromStorage() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => ({
      ...item,
      count: typeof item.count === "number" && item.count > 0 ? item.count : 1,
      productName: typeof item.productName === "string" ? item.productName : "",
    }));
  } catch {
    return [];
  }
}

function saveScansToStorage(scans) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scans));
}

function clearScansStorage() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

const groupScansByDate = (scans) => {
  return scans.reduce((groups, scan) => {
    const date = new Date(scan.timestamp).toLocaleDateString();
    if (!groups[date]) groups[date] = [];
    groups[date].push(scan);
    return groups;
  }, {});
};

function isSameDay(leftTimestamp, rightTimestamp) {
  return (
    new Date(leftTimestamp).toDateString() === new Date(rightTimestamp).toDateString()
  );
}

function saveToHistory(history, scanRecord) {
  const existingIndex = history.findIndex(
    (item) =>
      item.cleanCode === scanRecord.cleanCode &&
      isSameDay(item.timestamp, scanRecord.timestamp)
  );

  if (existingIndex > -1) {
    return history.map((item, index) =>
      index === existingIndex
        ? {
            ...item,
            rawCode: scanRecord.rawCode,
            timestamp: scanRecord.timestamp,
            type: scanRecord.type,
            count: (item.count || 1) + 1,
            productName: item.productName ?? "",
          }
        : item
    );
  }

  return [{ ...scanRecord, count: 1, productName: "" }, ...history];
}

function updateScanInList(list, id, patch) {
  return list.map((item) => (item.id === id ? { ...item, ...patch } : item));
}

function removeScanInList(list, id) {
  return list.filter((item) => item.id !== id);
}

function isCameraContextOk() {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  const local =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "[::1]";
  if (!window.isSecureContext && !local) return false;
  return Boolean(navigator.mediaDevices?.getUserMedia);
}

const TARGET_ZOOM_2X = 2;

/** Chrome/Android: zoom { min, max, step }; часть устройств — без zoom. */
function isZoomSupportedByCapabilities(caps) {
  if (!caps || caps.zoom == null) {
    return false;
  }
  const z = caps.zoom;
  if (typeof z === "object" && "max" in z && typeof z.max === "number") {
    return z.max > (typeof z.min === "number" ? z.min : 1);
  }
  return true;
}

function getZoom1xValue(caps) {
  if (!caps?.zoom) {
    return 1;
  }
  const z = caps.zoom;
  if (typeof z === "object" && typeof z.min === "number") {
    return z.min;
  }
  return 1;
}

function getZoom2xClampedValue(caps) {
  if (!caps?.zoom) {
    return TARGET_ZOOM_2X;
  }
  const z = caps.zoom;
  if (typeof z === "object" && typeof z.max === "number") {
    const min = typeof z.min === "number" ? z.min : 1;
    const t = Math.min(TARGET_ZOOM_2X, z.max);
    return Math.max(min, t);
  }
  return TARGET_ZOOM_2X;
}

/**
 * Haptic on successful read. Decode callbacks are not a user gesture; Chrome may ignore
 * the first `vibrate` while a touch is active — retry on next task + after ~100ms.
 * Safari (incl. iOS): `vibrate` is missing — return false, UI can show a visual bump.
 */
function triggerScanHaptic() {
  if (typeof globalThis === "undefined") return false;
  const nav = globalThis.navigator;
  if (typeof nav?.vibrate !== "function") return false;

  const ms = 100;
  let settled = false;
  const once = () => {
    if (settled) return;
    let ok = true;
    try {
      nav.vibrate(0);
    } catch {
      /* ignore */
    }
    try {
      const r = nav.vibrate(ms);
      if (r === false) ok = false;
    } catch {
      ok = false;
    }
    if (ok) settled = true;
  };

  once();
  setTimeout(once, 0);
  setTimeout(once, 100);
  return true;
}

async function postScan(code) {
  const timestamp = new Date().toISOString();
  const res = await fetch("/api/scan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, timestamp }),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
}

export default function Scanner() {
  const readerId = useId().replace(/:/g, "");
  const location = useLocation();
  const navigate = useNavigate();
  const normalizedPath = (location.pathname || "/").replace(/\/$/, "") || "/";
  const isLive = /\/scanner\/scan$/.test(normalizedPath);
  const listPath = isLive
    ? normalizedPath.replace(/\/scanner\/scan$/, "/scanner")
    : normalizedPath;
  const scanPath = `${listPath}/scan`;

  const [cameraOpen, setCameraOpen] = useState(() => isLive);
  const [lastScan, setLastScan] = useState(null);
  const [scans, setScans] = useState(() => loadScansFromStorage());
  const [error, setError] = useState(null);
  const [postError, setPostError] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteItemConfirmId, setDeleteItemConfirmId] = useState(null);
  const [itemModalId, setItemModalId] = useState(null);
  const [isItemSheetEntered, setIsItemSheetEntered] = useState(false);
  const [sheetDragY, setSheetDragY] = useState(0);
  const [isSheetDragging, setIsSheetDragging] = useState(false);
  const [draftProductName, setDraftProductName] = useState("");
  const [draftCount, setDraftCount] = useState("1");
  const [hapticFallbackBump, setHapticFallbackBump] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [isTorchSupported, setIsTorchSupported] = useState(false);
  const [isZoom2x, setIsZoom2x] = useState(false);
  const [isZoomSupported, setIsZoomSupported] = useState(false);
  const [exportFlow, setExportFlow] = useState(null);
  const [exportEmail, setExportEmail] = useState("");
  const [exportSending, setExportSending] = useState(false);
  const [exportEmailError, setExportEmailError] = useState(null);

  const instanceRef = useRef(null);
  const readerIdRef = useRef(readerId);
  readerIdRef.current = readerId;
  const cameraRunIdRef = useRef(0);
  const liveSoundPrimedRef = useRef(false);
  const lastCodeRef = useRef(null);
  const stoppingRef = useRef(false);
  const successAudioRef = useRef(null);
  const sheetRef = useRef(null);
  const sheetStartPtrYRef = useRef(0);
  const sheetActiveDragRef = useRef(false);
  const sheetCloseTimerRef = useRef(null);
  const hapticFallbackTimerRef = useRef(null);
  const scansRef = useRef(scans);
  scansRef.current = scans;

  const closeItemSheet = useCallback(
    (options) => {
      if (sheetCloseTimerRef.current) {
        clearTimeout(sheetCloseTimerRef.current);
        sheetCloseTimerRef.current = null;
      }
      setIsItemSheetEntered(false);
      setSheetDragY(0);
      setIsSheetDragging(false);
      sheetActiveDragRef.current = false;
      sheetCloseTimerRef.current = window.setTimeout(() => {
        setItemModalId(null);
        options?.onAfter?.();
        sheetCloseTimerRef.current = null;
      }, SHEET_TRANSITION_MS);
    },
    []
  );

  const openItem = useCallback((id) => {
    if (sheetCloseTimerRef.current) {
      clearTimeout(sheetCloseTimerRef.current);
      sheetCloseTimerRef.current = null;
    }
    setItemModalId(id);
    setIsItemSheetEntered(false);
    setSheetDragY(0);
    setIsSheetDragging(false);
    sheetActiveDragRef.current = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsItemSheetEntered(true);
      });
    });
  }, []);

  const sheetDragYRef = useRef(0);

  const handleSheetPointerDown = useCallback((e) => {
    if (e.target.closest("input, button, textarea, select")) {
      return;
    }
    const isHandle = e.target.closest(".scanner__sheet-handle");
    const sc = sheetRef.current;
    if (!isHandle && sc && sc.scrollTop > 0) {
      return;
    }
    sheetStartPtrYRef.current = e.clientY;
    sheetActiveDragRef.current = true;
    sheetDragYRef.current = 0;
    setIsSheetDragging(true);
    setSheetDragY(0);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const handleSheetPointerMove = useCallback((e) => {
    if (!sheetActiveDragRef.current) {
      return;
    }
    const delta = Math.max(0, e.clientY - sheetStartPtrYRef.current);
    const capped = Math.min(delta, window.innerHeight);
    sheetDragYRef.current = capped;
    setSheetDragY(capped);
  }, []);

  const endSheetPointer = useCallback(
    (e) => {
      if (!sheetActiveDragRef.current) {
        return;
      }
      sheetActiveDragRef.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
      setIsSheetDragging(false);
      const y = sheetDragYRef.current;
      sheetDragYRef.current = 0;
      if (y > SHEET_SWIPE_CLOSE_PX) {
        closeItemSheet();
      }
      setSheetDragY(0);
    },
    [closeItemSheet]
  );

  const handleSheetPointerUp = useCallback(
    (e) => {
      endSheetPointer(e);
    },
    [endSheetPointer]
  );

  const handleSheetPointerCancel = useCallback(
    (e) => {
      endSheetPointer(e);
    },
    [endSheetPointer]
  );

  useEffect(() => {
    return () => {
      if (sheetCloseTimerRef.current) {
        clearTimeout(sheetCloseTimerRef.current);
      }
      if (hapticFallbackTimerRef.current) {
        clearTimeout(hapticFallbackTimerRef.current);
      }
    };
  }, []);

  const playSuccessSound = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      if (!successAudioRef.current) {
        successAudioRef.current = new Audio(qrcodeSuccessSound);
      }
      const audio = successAudioRef.current;
      audio.muted = false;
      audio.volume = 1;
      audio.currentTime = 0;
      void audio.play();
    } catch {
      /* decode / autoplay */
    }
  }, []);

  /** Warm Audio element in the Scan click stack (iOS). Use muted, not volume=0 — mobile often still plays a blip. */
  const primeSuccessSound = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      if (!successAudioRef.current) {
        successAudioRef.current = new Audio(qrcodeSuccessSound);
      }
      const audio = successAudioRef.current;
      audio.muted = true;
      audio.volume = 1;
      const unlock = audio.play();
      const finish = () => {
        audio.pause();
        audio.currentTime = 0;
        audio.muted = false;
      };
      if (unlock && typeof unlock.then === "function") {
        unlock.then(finish).catch(finish);
      } else {
        finish();
      }
    } catch {
      /* ignore unlock failure */
    }
  }, []);

  const stopScanner = useCallback(async () => {
    const qr = instanceRef.current;
    if (!qr) {
      clearReaderDomById(readerIdRef.current);
      return;
    }
    if (stoppingRef.current) {
      return;
    }
    stoppingRef.current = true;
    try {
      if (qr.isScanning) {
        try {
          const cap = qr.getRunningTrackCapabilities();
          if (cap.torch) {
            await qr.applyVideoConstraints({ advanced: [{ torch: false }] });
          }
        } catch {
          /* ignore */
        }
        await qr.stop();
      }
      setTorchOn(false);
      setIsTorchSupported(false);
      setIsZoom2x(false);
      setIsZoomSupported(false);
      try {
        qr.clear();
      } catch {
        /* noop */
      }
    } catch {
      /* already stopped */
    } finally {
      instanceRef.current = null;
      stoppingRef.current = false;
      clearReaderDomById(readerIdRef.current);
    }
  }, []);

  const toggleTorch = useCallback(async () => {
    const qr = instanceRef.current;
    if (!qr?.isScanning) return;
    const next = !torchOn;
    try {
      const cap = qr.getRunningTrackCapabilities();
      const adv = { torch: next };
      if (isZoomSupportedByCapabilities(cap)) {
        adv.zoom = isZoom2x ? getZoom2xClampedValue(cap) : getZoom1xValue(cap);
      }
      await qr.applyVideoConstraints({ advanced: [adv] });
      setTorchOn(next);
    } catch (err) {
      console.error("Failed to toggle torch", err);
    }
  }, [torchOn, isZoom2x]);

  const toggleZoom2x = useCallback(async () => {
    const qr = instanceRef.current;
    if (!qr?.isScanning || !isZoomSupported) {
      return;
    }
    const next = !isZoom2x;
    try {
      const cap = qr.getRunningTrackCapabilities();
      const value = next ? getZoom2xClampedValue(cap) : getZoom1xValue(cap);
      const adv = { zoom: value };
      if (Boolean(cap.torch) && torchOn) {
        adv.torch = true;
      }
      await qr.applyVideoConstraints({ advanced: [adv] });
      setIsZoom2x(next);
    } catch (err) {
      console.error("Failed to set camera zoom", err);
    }
  }, [isZoom2x, isZoomSupported, torchOn]);

  useEffect(() => {
    if (!cameraOpen) {
      return undefined;
    }

    if (!isCameraContextOk()) {
      setError(
        "Камера доступна только по HTTPS (или на localhost). Откройте сайт по защищенному соединению."
      );
      setCameraOpen(false);
      if (isLive) {
        navigate(listPath, { replace: true });
      }
      return undefined;
    }

    lastCodeRef.current = null;
    setError(null);

    const myRun = ++cameraRunIdRef.current;
    let cancelled = false;

    const scanConfig = {
      fps: 10,
      /* Горизонтальная полоса (1D / code-128 / EAN) — библиотека рисует #qr-shaded-region под неё. */
      qrbox: (viewfinderWidth, viewfinderHeight) => {
        const w = Math.max(2, Math.floor(viewfinderWidth * 0.92));
        const h = Math.max(2, Math.floor(viewfinderHeight * 0.3));
        return { width: w, height: h };
      },
    };

    const syncTrackCapabilities = (qr) => {
      try {
        const cap = qr.getRunningTrackCapabilities();
        setIsTorchSupported(Boolean(cap.torch));
        setTorchOn(false);
        setIsZoomSupported(isZoomSupportedByCapabilities(cap));
        setIsZoom2x(false);
      } catch {
        setIsTorchSupported(false);
        setTorchOn(false);
        setIsZoomSupported(false);
        setIsZoom2x(false);
      }
    };

    const onSuccess = async (decodedText) => {
      const scanRecord = buildScanRecord(decodedText);
      if (scanRecord.cleanCode === lastCodeRef.current) return;
      lastCodeRef.current = scanRecord.cleanCode;

      const hapticOn = triggerScanHaptic();
      if (!hapticOn) {
        if (hapticFallbackTimerRef.current) {
          clearTimeout(hapticFallbackTimerRef.current);
        }
        setHapticFallbackBump(true);
        hapticFallbackTimerRef.current = window.setTimeout(() => {
          setHapticFallbackBump(false);
          hapticFallbackTimerRef.current = null;
        }, 220);
      }
      playSuccessSound();

      await stopScanner();
      setLastScan(scanRecord);
      setPostError(null);
      setScans((prev) => {
        const next = saveToHistory(prev, scanRecord);
        saveScansToStorage(next);
        return next;
      });

      let postFailed = false;
      try {
        await postScan(scanRecord.cleanCode);
      } catch {
        setPostError("Не удалось отправить данные на сервер");
        postFailed = true;
      }

      if (postFailed) {
        setCameraOpen(false);
        return;
      }
      if (isLive) {
        navigate(listPath, { replace: true });
      } else {
        setCameraOpen(false);
      }
    };

    const onError = () => {
      /* ignore noisy frame errors */
    };

    (async () => {
      const waitMs = 80;
      const deadline = Date.now() + 4000;
      while (stoppingRef.current && Date.now() < deadline) {
        await new Promise((r) => {
          setTimeout(r, waitMs);
        });
      }
      if (myRun !== cameraRunIdRef.current || cancelled) {
        return;
      }
      await stopScanner();
      if (myRun !== cameraRunIdRef.current || cancelled) {
        return;
      }
      clearReaderDomById(readerId);

      const qr = new Html5Qrcode(readerId, { verbose: false });
      if (myRun !== cameraRunIdRef.current || cancelled) {
        return;
      }
      instanceRef.current = qr;
      if (myRun !== cameraRunIdRef.current || cancelled) {
        return;
      }
      try {
        await qr.start(
          { facingMode: "environment" },
          scanConfig,
          onSuccess,
          onError
        );
        if (myRun !== cameraRunIdRef.current || cancelled) {
          await stopScanner();
          return;
        }
        syncTrackCapabilities(qr);
      } catch (e1) {
        if (cancelled || myRun !== cameraRunIdRef.current) {
          return;
        }
        try {
          const devices = await Html5Qrcode.getCameras();
          if (!devices.length) {
            throw new Error("Камеры не найдены");
          }
          if (myRun !== cameraRunIdRef.current || cancelled) {
            return;
          }
          await qr.start(devices[0].id, scanConfig, onSuccess, onError);
          if (myRun !== cameraRunIdRef.current || cancelled) {
            await stopScanner();
            return;
          }
          syncTrackCapabilities(qr);
        } catch (e2) {
          const msg =
            e2?.message ||
            e1?.message ||
            "Не удалось получить доступ к камере. Разрешите доступ в настройках браузера.";
          setError(msg);
          setCameraOpen(false);
          try {
            qr.clear();
          } catch {
            /* noop */
          }
          instanceRef.current = null;
          clearReaderDomById(readerId);
          if (isLive) {
            navigate(listPath, { replace: true });
          }
        }
      }
    })();

    return () => {
      cancelled = true;
      cameraRunIdRef.current += 1;
      void (async () => {
        await stopScanner();
        clearReaderDomById(readerId);
      })();
    };
  }, [
    cameraOpen,
    playSuccessSound,
    readerId,
    stopScanner,
    isLive,
    listPath,
    navigate,
  ]);

  const handleOpenScan = useCallback(() => {
    if (hapticFallbackTimerRef.current) {
      clearTimeout(hapticFallbackTimerRef.current);
      hapticFallbackTimerRef.current = null;
    }
    setHapticFallbackBump(false);
    primeSuccessSound();
    setError(null);
    setPostError(null);
    setLastScan(null);
    navigate(scanPath);
  }, [navigate, scanPath, primeSuccessSound]);

  const handleCloseCamera = useCallback(async () => {
    setError(null);
    await stopScanner();
    if (isLive) {
      navigate(listPath, { replace: true });
    } else {
      setCameraOpen(false);
    }
  }, [isLive, listPath, navigate, stopScanner]);

  useEffect(() => {
    if (!isLive || !cameraOpen) {
      return undefined;
    }
    const onKey = (e) => {
      if (e.key === "Escape") {
        void handleCloseCamera();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isLive, cameraOpen, handleCloseCamera]);

  const onLivePointerDown = useCallback(() => {
    if (liveSoundPrimedRef.current) {
      return;
    }
    liveSoundPrimedRef.current = true;
    primeSuccessSound();
  }, [primeSuccessSound]);

  const handleClearHistory = () => {
    if (sheetCloseTimerRef.current) {
      clearTimeout(sheetCloseTimerRef.current);
      sheetCloseTimerRef.current = null;
    }
    setItemModalId(null);
    setIsItemSheetEntered(false);
    setSheetDragY(0);
    setIsSheetDragging(false);
    setDeleteItemConfirmId(null);
    setIsConfirmOpen(true);
  };

  const handleConfirmClearHistory = () => {
    clearScansStorage();
    setScans([]);
    setLastScan(null);
    setIsConfirmOpen(false);
  };

  const handleCancelClearHistory = () => {
    setIsConfirmOpen(false);
  };

  useEffect(() => {
    if (!itemModalId) {
      return;
    }
    const s = scansRef.current.find((x) => x.id === itemModalId);
    if (s) {
      setDraftProductName(s.productName ?? "");
      setDraftCount(String(Math.max(1, s.count || 1)));
    }
  }, [itemModalId]);

  useEffect(() => {
    if (!itemModalId) {
      return;
    }
    if (!scans.some((s) => s.id === itemModalId)) {
      setItemModalId(null);
    }
  }, [itemModalId, scans]);

  useEffect(() => {
    if (!itemModalId) {
      return undefined;
    }
    const onKey = (e) => {
      if (e.key === "Escape") {
        closeItemSheet();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [itemModalId, closeItemSheet]);

  useEffect(() => {
    if (!deleteItemConfirmId) {
      return undefined;
    }
    const onKey = (e) => {
      if (e.key === "Escape") {
        setDeleteItemConfirmId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [deleteItemConfirmId]);

  const handleDraftCountChange = (e) => {
    const v = e.target.value.replace(/[^\d]/g, "");
    setDraftCount(v === "" ? "" : v);
  };

  const handleAdjustCount = (delta) => {
    setDraftCount((prev) => {
      const base = Math.max(1, parseInt(prev, 10) || 1);
      const n = Math.min(99999, Math.max(1, base + delta));
      return String(n);
    });
  };

  const handleItemSave = () => {
    if (!itemModalId) return;
    const n = Math.max(
      1,
      Math.min(99999, parseInt(draftCount, 10) || 1)
    );
    setScans((prev) => {
      const next = updateScanInList(prev, itemModalId, {
        productName: draftProductName.trim(),
        count: n,
      });
      saveScansToStorage(next);
      return next;
    });
    closeItemSheet();
  };

  const handleItemDeleteRequest = () => {
    if (!itemModalId) {
      return;
    }
    const idToRemove = itemModalId;
    closeItemSheet({
      onAfter: () => {
        setDeleteItemConfirmId(idToRemove);
      },
    });
  };

  const handleConfirmDeleteItem = () => {
    if (!deleteItemConfirmId) {
      return;
    }
    const id = deleteItemConfirmId;
    setScans((prev) => {
      const next = removeScanInList(prev, id);
      saveScansToStorage(next);
      return next;
    });
    setDeleteItemConfirmId(null);
  };

  const handleCancelDeleteItem = () => {
    setDeleteItemConfirmId(null);
  };

  const handleOpenExportModal = useCallback(() => {
    setExportFlow("menu");
    setExportEmail("");
    setExportEmailError(null);
  }, []);

  const handleCloseExportModal = useCallback(() => {
    if (exportSending) return;
    setExportFlow(null);
    setExportEmail("");
    setExportEmailError(null);
  }, [exportSending]);

  const handleExportSaveToDevice = useCallback(() => {
    exportScansToExcel(scans);
    setExportFlow(null);
  }, [scans]);

  const handleExportShowEmail = useCallback(() => {
    setExportFlow("email");
    setExportEmailError(null);
  }, []);

  const handleExportBackToMenu = useCallback(() => {
    setExportFlow("menu");
    setExportEmailError(null);
  }, []);

  const handleExportSendEmail = useCallback(async () => {
    const to = exportEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      setExportEmailError("Invalid email");
      return;
    }
    const packed = scansToXlsxBase64(scans);
    if (!packed) {
      setExportEmailError("Nothing to export");
      return;
    }
    setExportSending(true);
    setExportEmailError(null);
    try {
      const res = await fetch(`${API_URL}/api/scanner/send-report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to,
          attachmentBase64: packed.base64,
          filename: packed.filename,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || `HTTP ${res.status}`);
      }
      setExportFlow(null);
      setExportEmail("");
    } catch (e) {
      setExportEmailError(e.message || "Send failed");
    } finally {
      setExportSending(false);
    }
  }, [exportEmail, scans]);

  const httpsHint =
    typeof window !== "undefined" && !isCameraContextOk() ? (
      <p className="scanner__hint">
        Для работы камеры нужен HTTPS (на продакшене) или localhost при разработке.
      </p>
    ) : null;

  const sectionClassName = [
    "scanner",
    isLive && "scanner--live",
    lastScan != null && "scanner--success",
    hapticFallbackBump && "scanner--haptic-bump",
  ]
    .filter(Boolean)
    .join(" ");
  const groupedScans = groupScansByDate(scans);
  const groupedEntries = Object.entries(groupedScans).sort(
    (a, b) =>
      Math.max(...b[1].map((scan) => scan.timestamp)) -
      Math.max(...a[1].map((scan) => scan.timestamp))
  );

  const itemForModal = itemModalId
    ? scans.find((s) => s.id === itemModalId)
    : null;

  const itemPendingDelete = deleteItemConfirmId
    ? scans.find((s) => s.id === deleteItemConfirmId)
    : null;

  return (
    <section className={sectionClassName} aria-label="Сканер кодов">
      {!isLive ? (
        <div className="scanner__actions">
          <button
            type="button"
            className="scanner__button scanner__button--primary"
            onClick={handleOpenScan}
            disabled={!isCameraContextOk()}
          >
            Scan
          </button>
        </div>
      ) : null}

      {httpsHint}

      {error ? <p className="scanner__error">{error}</p> : null}

      {isLive && cameraOpen ? (
        <div
          className="scanner__live"
          onPointerDown={onLivePointerDown}
        >
          <p className="scanner__live-hint">
            Hold 15–20 cm away, barcode horizontal. Tap 2× for digital zoom.
          </p>
          <div className="scanner__viewfinder" aria-label="Viewfinder">
            <div id={readerId} className="scanner__reader scanner__reader--live" />
            <div
              className="scanner__viewfinder-guides scanner__viewfinder-guides--barcode"
              aria-hidden="true"
            >
              <div className="scanner__barcode-frame" />
            </div>
          </div>
          <div className="scanner__live-bar">
            <button
              type="button"
              className="scanner__live-button scanner__live-button--flash"
              onClick={() => void toggleTorch()}
              disabled={!isTorchSupported}
              aria-pressed={torchOn}
              aria-label="Flash / torch"
              title={isTorchSupported ? "Flash" : "Flash not available on this device"}
            >
              Flash
            </button>
            <button
              type="button"
              className="scanner__live-button scanner__live-button--zoom"
              onClick={() => void toggleZoom2x()}
              disabled={!isZoomSupported}
              aria-pressed={isZoom2x}
              aria-label={isZoom2x ? "Normal zoom" : "Digital zoom 2×"}
              title={
                isZoomSupported
                  ? isZoom2x
                    ? "1× (normal)"
                    : "2× (hold phone 15–20 cm from code)"
                  : "Digital zoom is not available on this camera"
              }
            >
              {isZoom2x ? "1×" : "2×"}
            </button>
            <button
              type="button"
              className="scanner__live-button scanner__live-button--close"
              onClick={() => void handleCloseCamera()}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}

      {postError ? <p className="scanner__error">{postError}</p> : null}
      {isLive && !cameraOpen && postError ? (
        <div className="scanner__live-error-actions">
          <button
            type="button"
            className="scanner__button scanner__button--primary"
            onClick={() => void handleCloseCamera()}
          >
            Close
          </button>
        </div>
      ) : null}

      {!isLive && groupedEntries.length > 0 ? (
        <div className="scanner__history" aria-live="polite">
          <div className="scanner__history-header">
            <p className="scanner__hint scanner__hint--success">
              Scan History:
            </p>
            <div className="scanner__history-buttons">
              <button
                type="button"
                className="scanner__button scanner__button--export"
                onClick={handleOpenExportModal}
              >
                Export
              </button>
              <button
                type="button"
                className="scanner__button scanner__button--danger"
                onClick={handleClearHistory}
              >
                Clear
              </button>
            </div>
          </div>
          {groupedEntries.map(([date, dateScans]) => (
            <div key={date} className="scanner__group">
              <h4 className="scanner__group-title">{date}</h4>
              <ul className="scanner__list">
                {dateScans.map((scan) => (
                  <li key={scan.id} className="scanner__list-item">
                    <button
                      type="button"
                      className="scanner__item"
                      onClick={() => openItem(scan.id)}
                    >
                      <output
                        className="scanner__result scanner__result--success"
                        aria-label="Отсканированный код"
                      >
                        {scan.cleanCode}
                      </output>
                      {scan.productName ? (
                        <p className="scanner__product-name">{scan.productName}</p>
                      ) : null}
                      <div className="scanner__meta">
                        <span className="scanner__meta-left">
                          <span>{scan.type}</span>
                          <span className="scanner__count-badge">
                            x{scan.count || 1}
                          </span>
                        </span>
                        <span>
                          {new Date(scan.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}

      {itemModalId && itemForModal ? (
        <div
          className={`scanner__modal-overlay scanner__modal-overlay--item${
            isItemSheetEntered ? " scanner__modal-overlay--item-open" : ""
          }`}
          onClick={() => closeItemSheet()}
          role="presentation"
        >
          <div
            ref={sheetRef}
            className={[
              "scanner__sheet",
              isItemSheetEntered ? "scanner__sheet--open" : "scanner__sheet--closed",
              isSheetDragging ? "scanner__sheet--dragging" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={
              isSheetDragging && isItemSheetEntered
                ? {
                    transform: `translate3d(0, ${sheetDragY}px, 0)`,
                    touchAction: "none",
                  }
                : undefined
            }
            role="dialog"
            aria-modal="true"
            aria-label="Редактирование скана"
            onClick={(event) => event.stopPropagation()}
            onPointerDown={handleSheetPointerDown}
            onPointerMove={handleSheetPointerMove}
            onPointerUp={handleSheetPointerUp}
            onPointerCancel={handleSheetPointerCancel}
          >
            <div className="scanner__sheet-handle" aria-hidden="true" />
            <p className="scanner__sheet-code">{itemForModal.cleanCode}</p>
            <p className="scanner__sheet-meta">
              {itemForModal.type} · {itemForModal.rawCode}
            </p>
            <label className="scanner__field" htmlFor="scanner-product-name">
              Product Name
            </label>
            <input
              id="scanner-product-name"
              className="scanner__input"
              type="text"
              value={draftProductName}
              onChange={(e) => setDraftProductName(e.target.value)}
              placeholder="Enter product name"
              autoComplete="off"
            />
            <p className="scanner__field-label">Quantity</p>
            <div className="scanner__count-row">
              <button
                type="button"
                className="scanner__button scanner__button--step"
                onClick={() => handleAdjustCount(-1)}
                aria-label="Минус"
              >
                −
              </button>
              <input
                className="scanner__input scanner__input--count"
                type="text"
                inputMode="numeric"
                value={draftCount}
                onChange={handleDraftCountChange}
                aria-label="Количество"
              />
              <button
                type="button"
                className="scanner__button scanner__button--step"
                onClick={() => handleAdjustCount(1)}
                aria-label="Плюс"
              >
                +
              </button>
            </div>
            <div className="scanner__sheet-actions">
              <button
                type="button"
                className="scanner__button scanner__button--primary scanner__button--inline"
                onClick={handleItemSave}
              >
                Save
              </button>

              <button
                type="button"
                className="scanner__button scanner__button--danger scanner__button--delete"
                onClick={handleItemDeleteRequest}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {deleteItemConfirmId ? (
        <div
          className="scanner__modal-overlay scanner__modal-overlay--stack"
          onClick={handleCancelDeleteItem}
          role="presentation"
        >
          <div
            className="scanner__modal"
            role="dialog"
            aria-modal="true"
            aria-label="Подтверждение удаления позиции"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="scanner__modal-title">Delete Item?</h3>
            <p className="scanner__modal-text">
              {itemPendingDelete
                ? `Delete «${itemPendingDelete.cleanCode}»${itemPendingDelete.productName ? ` (${itemPendingDelete.productName})` : ""} from the list?`
                : "Удалить эту позицию из списка?"}
            </p>
            <div className="scanner__modal-actions">
              <button
                type="button"
                className="scanner__button scanner__button--modal-cancel"
                onClick={handleCancelDeleteItem}
              >
                Cancel
              </button>
              <button
                type="button"
                className="scanner__button scanner__button--danger"
                onClick={handleConfirmDeleteItem}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {exportFlow ? (
        <div
          className="scanner__modal-overlay scanner__modal-overlay--stack"
          onClick={handleCloseExportModal}
          role="presentation"
        >
          <div
            className="scanner__modal scanner__modal--export"
            role="dialog"
            aria-modal="true"
            aria-label="Export scans"
            onClick={(event) => event.stopPropagation()}
          >
            {exportFlow === "menu" ? (
              <>
                <h3 className="scanner__modal-title">Export</h3>
                <p className="scanner__modal-text">
                  Save the XLSX on this device or send it by email
                </p>
                <div className="scanner__export-choices">
                  <button
                    type="button"
                    className="scanner__button scanner__button--primary scanner__export-choice"
                    onClick={handleExportSaveToDevice}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="scanner__button scanner__button--export scanner__export-choice"
                    onClick={handleExportShowEmail}
                  >
                    Send Email
                  </button>
                </div>
                <div className="scanner__modal-actions">
                </div>
              </>
            ) : (
              <>
                <h3 className="scanner__modal-title">Send Email</h3>
                <label className="scanner__field" htmlFor="scanner-export-email">
                  Recipient
                </label>
                <input
                  id="scanner-export-email"
                  type="email"
                  className="scanner__input"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={exportEmail}
                  onChange={(e) => setExportEmail(e.target.value)}
                  disabled={exportSending}
                />
                {exportEmailError ? (
                  <p className="scanner__error scanner__error--compact">{exportEmailError}</p>
                ) : null}
                <div className="scanner__modal-actions scanner__modal-actions--spread">
                  <button
                    type="button"
                    className="scanner__button scanner__button--modal-cancel"
                    onClick={handleExportBackToMenu}
                    disabled={exportSending}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="scanner__button scanner__button--primary"
                    onClick={() => void handleExportSendEmail()}
                    disabled={exportSending}
                  >
                    {exportSending ? "Sending…" : "Send"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}

      {isConfirmOpen ? (
        <div
          className="scanner__modal-overlay"
          onClick={handleCancelClearHistory}
          role="presentation"
        >
          <div
            className="scanner__modal"
            role="dialog"
            aria-modal="true"
            aria-label="Подтверждение удаления истории"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="scanner__modal-title">Delete history?</h3>
            <p className="scanner__modal-text">
              This action will delete all scanned codes from localStorage.
            </p>
            <div className="scanner__modal-actions">
              <button
                type="button"
                className="scanner__button scanner__button--modal-cancel"
                onClick={handleCancelClearHistory}
              >
                Cancel
              </button>
              <button
                type="button"
                className="scanner__button scanner__button--danger"
                onClick={handleConfirmClearHistory}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
