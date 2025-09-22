import React from 'react';
import { konika, duplo, knb, unifol, vivid, audley, colorking, fedrigoni, iecho, mondi, nocai, reinauer, Rightint, teneth, tmt } from '../../assets/images';
import './PartnersCarousel.css';

const PartnersCarousel = () => {
  const partners = [
    { logo: konika, name: 'Konica Minolta', url: 'https://www.konica-minolta.com/ge/en/index.html' },
    { logo: duplo, name: 'Duplo', url: 'https://www.duplo.com/ge/en/index.html' },
    { logo: knb, name: 'Knb', url: 'https://www.knb.com/ge/en/index.html' },
    { logo: unifol, name: 'Unifol', url: 'https://www.unifol.com/ge/en/index.html' },
    { logo: audley, name: 'Audley', url: 'https://www.vivid.com/ge/en/index.html' },
    { logo: colorking, name: 'colorking', url: 'https://www.vivid.com/ge/en/index.html' },
    { logo: fedrigoni, name: 'fedrigoni', url: 'https://www.vivid.com/ge/en/index.html' },
    { logo: iecho, name: 'iecho', url: 'https://www.vivid.com/ge/en/index.html' },
    { logo: mondi, name: 'mondi', url: 'https://www.vivid.com/ge/en/index.html' },
    { logo: nocai, name: 'nocai', url: 'https://www.vivid.com/ge/en/index.html' },
    { logo: reinauer, name: 'reinauer', url: 'https://www.vivid.com/ge/en/index.html' },
    { logo: Rightint, name: 'Rightint', url: 'https://www.vivid.com/ge/en/index.html' },
    { logo: teneth, name: 'teneth', url: 'https://www.vivid.com/ge/en/index.html' },
    { logo: tmt, name: 'tmt', url: 'https://www.vivid.com/ge/en/index.html' },
    { logo: vivid, name: 'vivid', url: 'https://www.vivid.com/ge/en/index.html' },
  ];

  // Дублируем массив для бесшовной анимации
  const duplicatedPartners = [...partners, ...partners];

  const renderPartnerItem = (partner, index, className = '') => (
    <a
      key={`${partner.name}-${index}`}
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`partners-carousel__item ${className}`}
      aria-label={`Visit ${partner.name} website`}
    >
      <img
        src={partner.logo}
        alt={partner.name}
        className="partners-carousel__logo"
        loading="lazy"
      />
    </a>
  );

  return (
    <div className="partners-carousel">
      {/* Основная карусель - движение влево */}
      <div className="partners-carousel__track partners-carousel__track--primary">
        {duplicatedPartners.map((partner, index) => 
          renderPartnerItem(partner, index, 'partners-carousel__item--primary')
        )}
      </div>
      
      {/* Дополнительная карусель - движение вправо */}
      <div className="partners-carousel__track partners-carousel__track--secondary">
        {duplicatedPartners.map((partner, index) => 
          renderPartnerItem(partner, index, 'partners-carousel__item--secondary')
        )}
      </div>
    </div>
  );
};

export default PartnersCarousel;
