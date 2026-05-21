import React from 'react';
import { partners } from '../../data/aboutData';
import './PartnersCarousel.css';

const half = Math.ceil(partners.length / 2);
const rowA = partners.slice(0, half);
const rowB = partners.slice(half);

const renderGroup = (items, ariaHidden) => (
  <div className="partners-marquee__group" aria-hidden={ariaHidden || undefined}>
    {items.map((p, i) => (
      <a
        key={`${p.name}-${i}`}
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        className="partners-marquee__item"
        aria-label={`Visit ${p.name}`}
        tabIndex={ariaHidden ? -1 : 0}
      >
        <span className="partners-marquee__logo-wrap">
          <img
            src={p.logo}
            alt={p.name}
            className="partners-marquee__logo"
            loading="lazy"
          />
        </span>
      </a>
    ))}
  </div>
);

const renderRow = (items, dir) => (
  <div className={`partners-marquee__viewport partners-marquee__viewport--${dir}`}>
    <div className="partners-marquee__track">
      {renderGroup(items, false)}
      {renderGroup(items, true)}
    </div>
  </div>
);

const PartnersCarousel = () => (
  <div className="partners-marquee" data-count={partners.length}>
    {renderRow(rowA, 'ltr')}
    {renderRow(rowB, 'rtl')}
  </div>
);

export default PartnersCarousel;
