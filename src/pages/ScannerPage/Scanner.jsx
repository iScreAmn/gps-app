import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import qrcodeSuccessSound from "../../assets/files/qrcode.mp3";
import "./Scanner.css";

const STORAGE_KEY = "scanner_scans_v1";
const SHEET_TRANSITION_MS = 280;
const SHEET_SWIPE_CLOSE_PX = 100;

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
  const [cameraOpen, setCameraOpen] = useState(false);
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

  const instanceRef = useRef(null);
  const lastCodeRef = useRef(null);
  const stoppingRef = useRef(false);
  const successAudioRef = useRef(null);
  const sheetRef = useRef(null);
  const sheetStartPtrYRef = useRef(0);
  const sheetActiveDragRef = useRef(false);
  const sheetCloseTimerRef = useRef(null);
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
    if (!qr || stoppingRef.current) return;
    stoppingRef.current = true;
    try {
      if (qr.isScanning) {
        await qr.stop();
      }
      qr.clear();
    } catch {
      /* already stopped */
    } finally {
      instanceRef.current = null;
      stoppingRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (!cameraOpen) return undefined;

    if (!isCameraContextOk()) {
      setError(
        "Камера доступна только по HTTPS (или на localhost). Откройте сайт по защищенному соединению."
      );
      setCameraOpen(false);
      return undefined;
    }

    lastCodeRef.current = null;
    setError(null);

    const scanConfig = {
      fps: 10,
      qrbox: { width: 260, height: 260 },
    };

    const onSuccess = async (decodedText) => {
      const scanRecord = buildScanRecord(decodedText);
      if (scanRecord.cleanCode === lastCodeRef.current) return;
      lastCodeRef.current = scanRecord.cleanCode;

      playSuccessSound();

      await stopScanner();
      setCameraOpen(false);
      setLastScan(scanRecord);
      setPostError(null);
      setScans((prev) => {
        const next = saveToHistory(prev, scanRecord);
        saveScansToStorage(next);
        return next;
      });

      try {
        await postScan(scanRecord.cleanCode);
      } catch {
        setPostError("Не удалось отправить данные на сервер");
      }
    };

    const onError = () => {
      /* ignore noisy frame errors */
    };

    const qr = new Html5Qrcode(readerId, { verbose: false });
    instanceRef.current = qr;

    const start = async () => {
      try {
        await qr.start(
          { facingMode: "environment" },
          scanConfig,
          onSuccess,
          onError
        );
      } catch (e1) {
        try {
          const devices = await Html5Qrcode.getCameras();
          if (!devices.length) {
            throw new Error("Камеры не найдены");
          }
          await qr.start(devices[0].id, scanConfig, onSuccess, onError);
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
        }
      }
    };

    start();

    return () => {
      void stopScanner();
    };
  }, [cameraOpen, playSuccessSound, readerId, stopScanner]);

  const handleScanClick = () => {
    primeSuccessSound();
    setError(null);
    setPostError(null);
    setLastScan(null);
    setCameraOpen(true);
  };

  const handleCloseCamera = async () => {
    setError(null);
    await stopScanner();
    setCameraOpen(false);
  };

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

  const httpsHint =
    typeof window !== "undefined" && !isCameraContextOk() ? (
      <p className="scanner__hint">
        Для работы камеры нужен HTTPS (на продакшене) или localhost при разработке.
      </p>
    ) : null;

  const sectionClassName =
    lastScan != null
      ? "scanner scanner--success"
      : "scanner";
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
      <div className="scanner__actions">
        <button
          type="button"
          className="scanner__button scanner__button--primary"
          onClick={handleScanClick}
          disabled={cameraOpen || !isCameraContextOk()}
        >
          Scan
        </button>
        {cameraOpen ? (
          <button
            type="button"
            className="scanner__button"
            onClick={() => void handleCloseCamera()}
          >
            Close
          </button>
        ) : null}
      </div>

      {httpsHint}

      {error ? <p className="scanner__error">{error}</p> : null}

      {cameraOpen ? (
        <>
          <p className="scanner__hint">Наведите камеру на QR или штрих-код</p>
          <div id={readerId} className="scanner__reader" />
        </>
      ) : null}

      {postError ? <p className="scanner__error">{postError}</p> : null}

      {groupedEntries.length > 0 ? (
        <div className="scanner__history" aria-live="polite">
          <div className="scanner__history-header">
            <p className="scanner__hint scanner__hint--success">
              История сканирований:
            </p>
            <button
              type="button"
              className="scanner__button scanner__button--danger"
              onClick={handleClearHistory}
            >
              Clear history
            </button>
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
            <h3 className="scanner__modal-title">Позиция</h3>
            <p className="scanner__sheet-code">{itemForModal.cleanCode}</p>
            <p className="scanner__sheet-meta">
              {itemForModal.type} · {itemForModal.rawCode}
            </p>
            <label className="scanner__field" htmlFor="scanner-product-name">
              Название продукта
            </label>
            <input
              id="scanner-product-name"
              className="scanner__input"
              type="text"
              value={draftProductName}
              onChange={(e) => setDraftProductName(e.target.value)}
              placeholder="Необязательно"
              autoComplete="off"
            />
            <p className="scanner__field-label">Количество</p>
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
                className="scanner__button scanner__button--modal-cancel"
                onClick={() => closeItemSheet()}
              >
                Cancel
              </button>
              <button
                type="button"
                className="scanner__button scanner__button--primary scanner__button--inline"
                onClick={handleItemSave}
              >
                Save
              </button>
            </div>
            <button
              type="button"
              className="scanner__button scanner__button--danger scanner__button--delete"
              onClick={handleItemDeleteRequest}
            >
              Delete from list
            </button>
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
            <h3 className="scanner__modal-title">Удалить позицию?</h3>
            <p className="scanner__modal-text">
              {itemPendingDelete
                ? `Удалить «${itemPendingDelete.cleanCode}»${itemPendingDelete.productName ? ` (${itemPendingDelete.productName})` : ""} из списка?`
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
            <h3 className="scanner__modal-title">Удалить историю?</h3>
            <p className="scanner__modal-text">
              Это действие удалит все отсканированные коды из localStorage.
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
