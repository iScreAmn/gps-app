import React from 'react';
import { useLanguage } from "../../hooks/useLanguage";
import './ServicesPage.css';

const ServicesPage = () => {
  const { language, t } = useLanguage();

  const services = [
    {
        title: t('services.technical_service'),
      description: t('services.technical_desc'),
      icon: '🔧'
    },
    {
      title: t('services.rental'),
      description: t('services.rental_desc'),
      icon: '📄'
    },
    {
      title: t('services.consumables'),
      description: t('services.consumables_desc'),
      icon: '🔋'
    }
  ];

  return (
    <div className="services-page">
      <div className="container">
        <div className="services-header">
          <h1>{t('services.title')}</h1>
          <p>{t('services.subtitle')}</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
