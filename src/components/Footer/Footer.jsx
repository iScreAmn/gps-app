import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from "../../hooks/useLanguage";
import { useTheme } from '../../contexts/ThemeContext';
import { mainLogo, mainLogoWhite } from '../../assets/images';
import contactsData from '../../data/contactsData';
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail, MdLocationPin } from "react-icons/md";


import './Footer.css';

const Footer = () => {
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  
  // Determine logo based on theme
  const currentLogo = theme === 'dark' ? mainLogoWhite : mainLogo;

  return (
    <footer className="footer">
      <div className="container-mini">
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
            <a
              href={contactsData.phone.href}
              className="footer-contact-item footer-contact-link"
            >
              <FaPhoneAlt />
              <span>{contactsData.phone.label}</span>
            </a>
            <a
              href={contactsData.email.href}
              className="footer-contact-item footer-contact-link"
            >
              <MdOutlineMail />
              <span>{contactsData.email.label}</span>
            </a>
            <div className="footer-contact-item">
              <MdLocationPin />
              <span>{t('contacts.tbilisi_georgia')}</span>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Georgian Polygraph Services. {t('footer.all_rights')}.</p>
          <Link
            to={`/${language}/privacy-policy`}
            className="footer-bottom-link"
          >
            {t('footer.privacy_policy')}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
