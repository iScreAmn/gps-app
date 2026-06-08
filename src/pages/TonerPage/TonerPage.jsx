import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { toner } from '../../assets/images';
import './TonerPage.css';

const TonerPage = () => {
  const { t } = useLanguage();

  return (
    <section className="toner-page">
      <div className="container">
        <h1 className="toner-page__title">{t('catalog.toner')}</h1>
        <div className="toner-page__image-wrap">
          <img
            src={toner}
            alt={t('catalog.toner')}
            className="toner-page__image"
          />
        </div>
      </div>
    </section>
  );
};

export default TonerPage;
