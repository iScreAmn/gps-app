import React from 'react';
import { useLanguage } from "../../hooks/useLanguage";
import './Footer.css';

const Footer = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo-footer">
              <span className="logo-main">Georgian Polygraph</span>
              <span className="logo-sub">Service</span>
            </div>
            <p className="footer-description">
              {t('footer.description')}
            </p>
          </div>
          
          <div className="footer-section">
            <h4>{t('footer.contact')}</h4>
            <p>📞 +995 32 2 XX XX XX</p>
            <p>✉️ info@gps.ge</p>
            <p>📍 {t('contacts.tbilisi_georgia')}</p>
          </div>
          
          <div className="footer-section">
            <h4>{t('footer.quick_links')}</h4>
            <div className="footer-links">
              <a href={`/${language}/catalog`}>
                {t('navigation.catalog')}
              </a>
              <a href={`/${language}/services`}>
                {t('navigation.services')}
              </a>
              <a href={`/${language}/contacts`}>
                {t('navigation.contacts')}
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Georgian Polygraph Service. {t('footer.all_rights')}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
