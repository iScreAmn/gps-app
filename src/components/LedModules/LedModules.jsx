import React, { useState, useEffect } from "react";
import "./LedModules.css";
import { mainLogoWhite, tmtLogo, modulesArt } from "../../assets/images";
import tmtCatalog from "../../assets/files/tmt-catalog.pdf";
import { useLanguage } from "../../hooks/useLanguage";

const DOWNLOAD_COOLDOWN = 15 * 60 * 1000; // 15 минут в миллисекундах
const STORAGE_KEY = "tmt_catalog_download_time";

const LedModules = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const lastDownloadTime = localStorage.getItem(STORAGE_KEY);
    if (lastDownloadTime) {
      const timePassed = Date.now() - parseInt(lastDownloadTime, 10);
      if (timePassed < DOWNLOAD_COOLDOWN) {
        setStatus("already-downloaded");
      }
    }
  }, []);

  const handleDownload = (e) => {
    e.preventDefault();

    const lastDownloadTime = localStorage.getItem(STORAGE_KEY);
    if (lastDownloadTime) {
      const timePassed = Date.now() - parseInt(lastDownloadTime, 10);
      if (timePassed < DOWNLOAD_COOLDOWN) {
        setStatus("already-downloaded");
        return;
      }
    }

    setStatus("uploading");

    setTimeout(() => {
      const link = document.createElement("a");
      link.href = tmtCatalog;
      link.download = "tmt-catalog.pdf";
      link.click();

      localStorage.setItem(STORAGE_KEY, Date.now().toString());
      setStatus("success");
    }, 3000);
  };

  return (
    <div className="led-modules">
      <div className="container">
        <div className="led-modules__wrapper">
          <img src={modulesArt} alt="LED Modules Art" className="led-modules__art led-modules__art--left" />
          <img src={modulesArt} alt="LED Modules Art" className="led-modules__art led-modules__art--right" />
          <div className="led-modules__content">
            <div className="led-modules__logos">
              <img src={mainLogoWhite} alt="GPS Logo" className="led-modules__logo" />
              <img src={tmtLogo} alt="TMT Logo" className="led-modules__logo" />
            </div>
            <h3 className="led-modules__title">{t("ledModules.title")}</h3>

            <div className="led-modules__status">
              {status === "idle" && (
                <a
                  href={tmtCatalog}
                  onClick={handleDownload}
                  className="btn"
                  rel="noreferrer"
                >
                  <span className="btn__circle"></span>
                  <span className="btn__white-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" id="icon-arrow-right" viewBox="0 0 21 12">
                      <path d="M17.104 5.072l-4.138-4.014L14.056 0l6 5.82-6 5.82-1.09-1.057 4.138-4.014H0V5.072h17.104z"></path>
                    </svg>
                  </span>
                  <span className="btn__text">{t("ledModules.downloadButton")}</span>
                </a>
              )}

              {status === "uploading" && (
                <div className="led-modules__loader">
                  <div className="led-modules__spinner"></div>
                  <p className="led-modules__loader-text">{t("ledModules.downloading")}</p>
                </div>
              )}

              {status === "success" && (
                <div className="led-modules__success">
                  <div className="led-modules__success-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <p className="led-modules__success-text">{t("ledModules.successMessage")}</p>
                </div>
              )}

              {status === "already-downloaded" && (
                <div className="led-modules__already-downloaded">
                  <div className="led-modules__info-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                  </div>
                  <p className="led-modules__info-text">{t("ledModules.alreadyDownloaded")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LedModules;
