import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { 
  MdLocalShipping, 
  MdBuild, 
  MdSettings,
  MdSpeed,
  MdSecurity,
  MdSupport
} from 'react-icons/md';
import './BestDeals.css';

const BestDeals = () => {
  const { t } = useLanguage();

  return (
    <div className="best-deals">
      <div className="deals-header">
        <h3 className="deals-title">{t('deals.title')}</h3>
        <p className="deals-subtitle">{t('deals.subtitle')}</p>
      </div>
      
      <div className="deals-visual">
      </div>
      
      <div className="deals-cta none">
        <Link to="/catalog/supplies" className="deals-button">
          {t('deals.cta')}
        </Link>
      </div>
    </div>
  );
};

export default BestDeals;
