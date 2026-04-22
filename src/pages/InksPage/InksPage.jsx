import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { inksProducts } from '../../data/inksData';
import './InksPage.css';

const InksPage = () => {
  const { t, language } = useLanguage();

  return (
    <section className="inks-page">
      <div className="container">
        <div className="inks-page__header">
          <h1 className="inks-page__title">{t('catalog.inks')}</h1>
          <p className="inks-page__subtitle">{t('inks.subtitle')}</p>
        </div>

        <div className="inks-grid">
          {inksProducts.map((product) => (
            <Link
              key={product.id}
              to={`/${language}/catalog/supplies/inks/${product.id}`}
              className="inks-card"
            >
              <div className="inks-card__image-wrap">
                <img
                  src={product.image}
                  alt={t(product.titleKey)}
                  className="inks-card__image"
                  loading="lazy"
                />
              </div>
              <div className="inks-card__body">
                <h2 className="inks-card__title">
                  {t(product.titleKey)}
                </h2>
                <span className="inks-card__more">{t('common.more')}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InksPage;
