import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./LedModules.css";
import { mainLogoWhite, tmtLogo, modulesArt } from "../../assets/images";
import { useLanguage } from "../../hooks/useLanguage";

const LedModules = () => {
  const { t, language } = useLanguage();
  const { pathname } = useLocation();
  const isOnLedsPage = /\/leds(?:\/|$)/.test(pathname);

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

            {!isOnLedsPage && (
              <div className="led-modules__status">
                <Link to={`/${language}/leds`} className="btn">
                  <span className="btn__circle"></span>
                  <span className="btn__white-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" id="icon-arrow-right" viewBox="0 0 21 12">
                      <path d="M17.104 5.072l-4.138-4.014L14.056 0l6 5.82-6 5.82-1.09-1.057 4.138-4.014H0V5.072h17.104z"></path>
                    </svg>
                  </span>
                  <span className="btn__text">{t("ledModules.downloadButton")}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LedModules;
