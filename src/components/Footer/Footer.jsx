import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from "../../hooks/useLanguage";
import { useTheme } from '../../contexts/ThemeContext';
import { mainLogo, mainLogoWhite } from '../../assets/images';
import './Footer.css';

const Footer = () => {
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  
  // Determine logo based on theme
  const currentLogo = theme === 'dark' ? mainLogoWhite : mainLogo;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <Link to={`/${language}`} className="logo-footer">
              <img 
                src={currentLogo} 
                alt="Georgian GPS Logo" 
                className="footer-logo-image"
              />
            </Link>
            <p className="footer-description">
              {t('footer.description')}
            </p>
          </div>
          
          <div className="footer-section">
            <h4>{t('footer.contact')}</h4>
            <p>📞 +995 32 230 81 77</p>
            <p>✉️ info@geopolser.ge</p>
            <p>📍 {t('contacts.tbilisi_georgia')}</p>
          </div>
          
          <div className="footer-section">
            <h4>{t('footer.quick_links')}</h4>
            <div className="footer-links">
              <Link to={`/${language}/catalog`}>
                {t('navigation.catalog')}
              </Link>
              <Link to={`/${language}/services`}>
                {t('navigation.services')}
              </Link>
              <Link to={`/${language}/contacts`}>
                {t('navigation.contacts')}
              </Link>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Georgian Polygraph Services. {t('footer.all_rights')}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
