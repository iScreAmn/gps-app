import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { FaInstagram, FaFacebookF, FaPhoneAlt } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { mainLogo, mainLogoWhite } from '../../assets/images';
import contactsData from '../../data/contactsData';
import SearchDropdown from './SearchDropdown/SearchDropdown';
import { useLanguage } from '../../hooks/useLanguage';
import './TopHeader.css';

const TopHeader = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const currentLogo = theme === 'dark' ? mainLogoWhite : mainLogo;

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
          <SearchDropdown />

          {/* Contact & Social Actions */}
          <div className="header-actions">
            <a
              href={contactsData.phone.href}
              className="header-action header-action--phone"
            >
              <FaPhoneAlt />
              <span>{contactsData.phone.label}</span>
            </a>
            <a
              href={contactsData.email.href}
              className="header-action header-action--icon"
              aria-label="Email"
            >
              <HiOutlineMail />
            </a>
            <a
              href={contactsData.socials.instagram}
              className="header-action header-action--icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href={contactsData.socials.facebook}
              className="header-action header-action--icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
