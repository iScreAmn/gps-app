import React from 'react';
import {
  duplo,
  knb,
  konika,
  unifol,
  vivid,
  audley,
  tmt,
  fedrigoni,
  iecho,
  mondi,
  nocai,
  reinauer,
} from '../../assets/images';
import './PartnersSection.css';

const PartnersSection = () => {
  // Show exactly 12 partners in 2x6 grid as per screenshot
  const partners = [
    { id: 1, logo: konika, name: 'Konika' },
    { id: 2, logo: iecho, name: 'Iecho' },
    { id: 3, logo: nocai, name: 'Nocai' },
    { id: 4, logo: unifol, name: 'Unifol' },
    { id: 5, logo: vivid, name: 'Vivid' },
    { id: 6, logo: audley, name: 'Audley' },
    { id: 7, logo: tmt, name: 'tmt' },
    { id: 8, logo: fedrigoni, name: 'Fedrigoni' },
    { id: 9, logo: knb, name: 'KNB' },
    { id: 10, logo: mondi, name: 'Mondi' },
    { id: 11, logo: duplo, name: 'Duplo' },
    { id: 12, logo: reinauer, name: 'Reinauer' }
  ];

  return (
    <section className="partners-section">
      <div className="container">
        <div className="partners-grid">
          {partners.map((partner) => (
            <div key={partner.id} className="partner-card">
              <img 
                src={partner.logo} 
                alt={`${partner.name} logo`}
                className="partner-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
