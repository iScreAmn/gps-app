import React from 'react';
import { plotterCutting2, plotterCutting3, plotterCutting4 } from '../../assets/images';
import { useLanguage } from '../../hooks/useLanguage';
import './PlotterCatalogPage.css';

const PlotterCatalogPage = () => {
  const { t } = useLanguage();

  return (
    <section className="plotter-catalog-page">
      <div className="container">
        <h1 className="plotter-catalog__title">{t('plotterCatalog.title')}</h1>
        <div className="plotter-catalog__grid">
          <img
            src={plotterCutting2}
            alt={t('plotterCatalog.image1Alt')}
            className="plotter-catalog__image"
          />
          <img
            src={plotterCutting3}
            alt={t('plotterCatalog.image2Alt')}
            className="plotter-catalog__image"
          />
          <img
            src={plotterCutting4}
            alt={t('plotterCatalog.image3Alt')}
            className="plotter-catalog__image"
          />
        </div>
      </div>
    </section>
  );
};

export default PlotterCatalogPage;
