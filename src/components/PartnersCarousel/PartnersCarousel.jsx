import React from 'react';
import { konika, duplo, knb, unifol, vivid, audley, colorking, fedrigoni, iecho, mondi, nocai, reinauer, Rightint, teneth, tmt, goldensign } from '../../assets/images';
import './PartnersCarousel.css';

const partners = [
  { logo: konika, name: 'Konica Minolta', url: 'https://www.konica-minolta.com/ge/en/index.html' },
  { logo: duplo, name: 'Duplo', url: 'https://www.duplo.com/ge/en/index.html' },
  { logo: knb, name: 'Koenig & Bauer', url: 'https://www.knb.com/ge/en/index.html' },
  { logo: unifol, name: 'Unifol', url: 'https://www.unifol.com/ge/en/index.html' },
  { logo: audley, name: 'Audley', url: '#' },
  { logo: colorking, name: 'ColorKing', url: '#' },
  { logo: fedrigoni, name: 'Fedrigoni', url: '#' },
  { logo: iecho, name: 'iEcho', url: '#' },
  { logo: mondi, name: 'Mondi', url: '#' },
  { logo: nocai, name: 'Nocai', url: '#' },
  { logo: reinauer, name: 'Reinauer', url: '#' },
  { logo: Rightint, name: 'Rightint', url: '#' },
  { logo: teneth, name: 'Teneth', url: '#' },
  { logo: tmt, name: 'TMT', url: '#' },
  { logo: vivid, name: 'Vivid', url: '#' },
  { logo: goldensign, name: 'Goldensign', url: 'https://www.goldensign.net/' },
];

const half = Math.ceil(partners.length / 2);
const rowA = partners.slice(0, half);
const rowB = partners.slice(half);

const renderRow = (items, offset, dir) => {
  const loop = [...items, ...items];
  return (
    <div className={`partners-marquee__viewport partners-marquee__viewport--${dir}`}>
      <div className="partners-marquee__track">
        {loop.map((p, i) => {
          const baseIdx = (i % items.length) + offset + 1;
          return (
            <a
              key={`${p.name}-${i}`}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="partners-marquee__item"
              aria-label={`Visit ${p.name}`}
            >
              <span className="partners-marquee__num">{String(baseIdx).padStart(2, '0')}</span>
              <span className="partners-marquee__logo-wrap">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="partners-marquee__logo"
                  loading="lazy"
                />
              </span>
              <span className="partners-marquee__name">{p.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

const PartnersCarousel = () => (
  <div className="partners-marquee" data-count={partners.length}>
    {renderRow(rowA, 0, 'ltr')}
    {renderRow(rowB, rowA.length, 'rtl')}
  </div>
);

export default PartnersCarousel;
