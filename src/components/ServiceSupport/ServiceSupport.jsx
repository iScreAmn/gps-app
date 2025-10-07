import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import serviceIcon from '../../assets/images/icons/service-icon.webp';
import './ServiceSupport.css';

const ServiceSupport = () => {
  const { t } = useLanguage();

  return (
    <div className="service-support">
      <div className="support-header">
        <h3 className="support-title">{t('support.title')}</h3>
        <p className="support-subtitle none">{t('support.subtitle')}</p>
      </div>
      
      <div className="support-visual">
        <img src={serviceIcon} alt="Service support" className="support-image" />
      </div>
      
      <div className="support-cta none">
        <Link to="/services" className="support-button">
          {t('support.cta')}
        </Link>
      </div>
    </div>
  );
};

export default ServiceSupport;
