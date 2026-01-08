import React from "react";
import { useLanguage } from "../../../../../hooks/useLanguage";
import { ConstructionModal } from "../../../../../assets/images";
import "./Construction.css";

const Construction = () => {
  const { t } = useLanguage();

  return (
    <div className="construction">
      <div className="construction__media">
          <img
            src={ConstructionModal}
            alt={t("construction.title")}
            className="construction__image"
          />
      </div>
      <div className="construction__body">
        <p className="construction__message">{t("construction.message")}</p>
        <a href="https://geopolser.ge/test" className="construction__redirect">{t("construction.redirect")}</a>
      </div>
    </div>
  );
};

export default Construction;