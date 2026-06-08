import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { tonerProducts } from '../../data/tonerData';
import './TonerPage.css';

const TonerPage = () => {
  const { t } = useLanguage();

  return (
    <section className="toner-page">
      <div className="container">
        <h1 className="toner-page__title">{t('catalog.toner')}</h1>

        <div className="toner-grid">
          {tonerProducts.map((product) => (
            <div key={product.id} className="toner-card">
              <div className="toner-card__image-wrap">
                <img
                  src={product.image}
                  alt={product.title}
                  className="toner-card__image"
                  loading="lazy"
                />
              </div>
              <div className="toner-card__body">
                <h2 className="toner-card__title">{product.title}</h2>
                <p className="toner-card__compatibility">
                  <span className="toner-card__compatibility-label">თავსებადობა: </span>
                  {product.compatibility}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TonerPage;
