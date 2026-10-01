import React from 'react';
import { Link } from 'react-router-dom';
import './CatalogCard.css';

// Without `to` the card renders as a static block (no link, no "more" button).
// `cover` fills the stage with the photo — for lifestyle shots rather than cut-out product images.
const CatalogCard = ({ to, index, image, name, moreLabel, showIndex = true, cover = false, children }) => {
  const content = (
    <>
      <div className={`catalog-card__media${cover ? ' catalog-card__media--cover' : ''}`}>
        {showIndex && (
          <span className="catalog-card__index" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
        <img src={image} alt={name} className="catalog-card__img" loading="lazy" />
        {to && moreLabel && (
          <span className="catalog-card__more">
            {moreLabel}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </span>
        )}
      </div>
      <div className="catalog-card__body">
        <h3 className="catalog-card__title">{name}</h3>
        {children}
      </div>
    </>
  );

  return to ? (
    <Link to={to} className="catalog-card" style={{ '--i': index }}>
      {content}
    </Link>
  ) : (
    <div className="catalog-card catalog-card--static" style={{ '--i': index }}>
      {content}
    </div>
  );
};

export default CatalogCard;
