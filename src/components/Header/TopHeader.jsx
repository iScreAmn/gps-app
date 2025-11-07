import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../contexts/ThemeContext';
import { FaSearch, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { mainLogo, mainLogoWhite } from '../../assets/images';
import contactsData from '../../data/contactsData';
import './TopHeader.css';

const TopHeader = () => {
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  const currentLogo = theme === 'dark' ? mainLogoWhite : mainLogo;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <div className="top-header">
      <div className="container">
        <div className="top-header-content">
          {/* Logo */}
          <Link to={`/${language}`} className="top-header-logo">
            <img 
              src={currentLogo} 
              alt="Georgian GPS Logo" 
              className="logo-image"
            />
          </Link>

          {/* Search */}
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              placeholder={t('header.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              <FaSearch />
            </button>
          </form>

          {/* Contact Info */}
          <div className="contact-info">
            <div className="phone-numbers">
              <a
                href={contactsData.phone.href}
                className="phone contact-link"
              >
                {contactsData.phone.label}
              </a>
            </div>
            <a
              href={contactsData.email.href}
              className="email contact-link"
            >
              {contactsData.email.label}
            </a>
          </div>

          {/* Social Media */}
          <div className="social-section">
            <div className="social-media">
              <a 
                href={contactsData.socials.whatsapp} 
                className="social-link whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a 
                href={contactsData.socials.telegram} 
                className="social-link telegram"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <FaTelegram />
              </a>
            </div>
            <div className="hours none">{t('header.hours')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
