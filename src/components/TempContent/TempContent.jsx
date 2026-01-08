import React from 'react';
import { whatsApp } from '../../assets/images';
import { useLanguage } from '../../hooks/useLanguage';
import './TempContent.css';

const TempContent = () => {
  const { t } = useLanguage();

  return (
    <section className="temp-content-section">
      <div className="container">
        <div className="temp-content__wrapper">
          <div className="temp-content__text">
            <h2 className="temp-content__title">{t('tempContent.title')}</h2>
            <p className="temp-content__paragraph">{t('tempContent.paragraph1')}</p>
            <p className="temp-content__paragraph">{t('tempContent.paragraph2')}</p>
            <a
              className="temp-content__button"
              href="https://www.whatsapp.com/channel/0029Vb6P79E1yT2I2KS8GG3Y"
              target="_blank"
              rel="noreferrer noopener"
            >
              {t('tempContent.cta')}
            </a>
          </div>
          <div className="temp-content__media">
            <img
              src={whatsApp}
              alt={t('tempContent.imageAlt')}
              className="temp-content__image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TempContent;

