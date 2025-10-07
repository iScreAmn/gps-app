import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../contexts/ThemeContext';
import { FaSearch, FaPhone, FaEnvelope, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { mainLogo, mainLogoWhite } from '../../assets/images';
import './TopHeader.css';

const TopHeader = () => {
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Determine logo based on theme
  const currentLogo = theme === 'dark' ? mainLogoWhite : mainLogo;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
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
              <div className="phone">{t('header.phone1')}</div>
            </div>
            <div className="email">{t('header.email')}</div>
          </div>

          {/* Social Media */}
          <div className="social-section">
            <div className="social-media">
              <a 
                href={t('header.telegramLink')} 
                className="social-link telegram"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <FaTelegram />
              </a>
              <a 
                href={t('header.whatsappLink')} 
                className="social-link whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
            <div className="hours">{t('header.hours')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
