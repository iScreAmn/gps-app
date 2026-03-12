import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import tonnerBg from '../../assets/images/icons/tonner-bg.webp';
import './BestDeals.css';

const BestDeals = () => {
  const { language, t } = useLanguage();

  return (
    <Link to={`/${language}/catalog/supplies`} className="best-deals">
      <div className="deals-header">
        <h3 className="deals-title">{t('deals.title')}</h3>
        <p className="deals-subtitle none">{t('deals.subtitle')}</p>
      </div>
      
      <div className="deals-visual">
        <img src={tonnerBg} alt="Toner cartridge" className="deals-image" />
      </div>
      
    </Link>
  );
};

export default BestDeals;
