import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import styles from "./Scanner.module.css";

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
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [postError, setPostError] = useState(null);

  const instanceRef = useRef(null);
  const lastCodeRef = useRef(null);
  const stoppingRef = useRef(false);

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
      if (decodedText === lastCodeRef.current) return;
      lastCodeRef.current = decodedText;

      await stopScanner();
      setCameraOpen(false);
      setResult(decodedText);
      setPostError(null);

      try {
        await postScan(decodedText);
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
  }, [cameraOpen, readerId, stopScanner]);

  const handleScanClick = () => {
    setError(null);
    setPostError(null);
    setResult(null);
    setCameraOpen(true);
  };

  const handleCloseCamera = async () => {
    setError(null);
    await stopScanner();
    setCameraOpen(false);
  };

  const httpsHint =
    typeof window !== "undefined" && !isCameraContextOk() ? (
      <p className={styles.hint}>
        Для работы камеры нужен HTTPS (на продакшене) или localhost при разработке.
      </p>
    ) : null;

  return (
    <section className={styles.wrap} aria-label="Сканер кодов">
      <div className={styles.row}>
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={handleScanClick}
          disabled={cameraOpen || !isCameraContextOk()}
        >
          Сканировать
        </button>
        {cameraOpen ? (
          <button
            type="button"
            className={styles.btn}
            onClick={() => void handleCloseCamera()}
          >
            Закрыть камеру
          </button>
        ) : null}
      </div>

      {httpsHint}

      {error ? <p className={styles.error}>{error}</p> : null}

      {cameraOpen ? (
        <>
          <p className={styles.hint}>Наведите камеру на QR или штрих-код</p>
          <div id={readerId} className={styles.reader} />
        </>
      ) : null}

      {result != null ? (
        <div>
          <p className={styles.hint}>Результат:</p>
          <div className={styles.result}>{result}</div>
          {postError ? <p className={styles.error}>{postError}</p> : null}
        </div>
      ) : null}
    </section>
  );
}
