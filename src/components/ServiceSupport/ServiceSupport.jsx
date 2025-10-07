import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { 
  MdSupport, 
  MdBuild, 
  MdSettings,
  MdSpeed,
  MdSecurity,
  MdPhone
} from 'react-icons/md';
import './ServiceSupport.css';

const ServiceSupport = () => {
  const { t } = useLanguage();

  return (
    <div className="service-support">
      <div className="support-header">
        <h3 className="support-title">{t('support.title')}</h3>
        <p className="support-subtitle">{t('support.subtitle')}</p>
      </div>
      
      <div className="support-visual">
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
