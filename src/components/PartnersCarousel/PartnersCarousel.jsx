import React from 'react';
import { konika, duplo, fujifilm, knb, rapid, renz, unifol, vivid } from '../../assets/images';
import './PartnersCarousel.css';

const PartnersCarousel = () => {
  const partners = [
    { logo: konika, name: 'Konica Minolta', url: 'https://www.konica-minolta.com/ge/en/index.html' },
    { logo: duplo, name: 'Duplo', url: 'https://www.duplo.com/ge/en/index.html' },
    { logo: fujifilm, name: 'Fujifilm', url: 'https://www.fujifilm.com/ge/en/index.html' },
    { logo: knb, name: 'Knb', url: 'https://www.knb.com/ge/en/index.html' },
    { logo: rapid, name: 'Rapid', url: 'https://www.rapid.com/ge/en/index.html' },
    { logo: renz, name: 'Renz', url: 'https://www.renz.com/ge/en/index.html' },
    { logo: unifol, name: 'Unifol', url: 'https://www.unifol.com/ge/en/index.html' },
    { logo: vivid, name: 'Vivid', url: 'https://www.vivid.com/ge/en/index.html' }
  ];

  // Дублируем массив для бесшовной анимации
  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="partners-carousel">
      <div className="partners-carousel__track">
        {duplicatedPartners.map((partner, index) => (
          <a
            key={`${partner.name}-${index}`}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="partners-carousel__item"
            aria-label={`Visit ${partner.name} website`}
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="partners-carousel__logo"
              loading="lazy"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default PartnersCarousel;
