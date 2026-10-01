import React from 'react';
import './CatalogHero.css';

const CatalogHero = ({ title, description, wide = false }) => (
  <header className={`catalog-hero${wide ? ' catalog-hero--wide' : ''}`}>
    <span className="catalog-hero__crop catalog-hero__crop--tl" aria-hidden="true" />
    <span className="catalog-hero__crop catalog-hero__crop--tr" aria-hidden="true" />
    <span className="catalog-hero__crop catalog-hero__crop--bl" aria-hidden="true" />
    <span className="catalog-hero__crop catalog-hero__crop--br" aria-hidden="true" />

    <div className="catalog-hero__meta" aria-hidden="true">
      <svg className="catalog-hero__reg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="6.5" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M12 1v22M1 12h22" />
      </svg>
      <span className="catalog-hero__swatches">
        <i className="catalog-hero__swatch catalog-hero__swatch--c" />
        <i className="catalog-hero__swatch catalog-hero__swatch--m" />
        <i className="catalog-hero__swatch catalog-hero__swatch--y" />
        <i className="catalog-hero__swatch catalog-hero__swatch--k" />
      </span>
    </div>

    <h1 className="catalog-hero__title" data-text={title}>
      <span className="catalog-hero__title-inner">{title}</span>
    </h1>

    {description && (
      <div className="catalog-hero__desc-row">
        <span className="catalog-hero__rule" aria-hidden="true" />
        <p className="catalog-hero__desc">{description}</p>
      </div>
    )}
  </header>
);

export default CatalogHero;
