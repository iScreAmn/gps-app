import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../hooks/useLanguage';
import './Header.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { key: 'navigation.home', path: `/${language}` },
    { key: 'navigation.about', path: `/${language}/about` },
    { key: 'navigation.catalog', path: `/${language}/catalog` },
    { key: 'navigation.services', path: `/${language}/services` },
    { key: 'navigation.news', path: `/${language}/news` },
    { key: 'navigation.contacts', path: `/${language}/contacts` },
  ];

  const isActiveLink = (path) => {
    if (path === `/${language}`) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLanguageChange = (newLang) => {
    changeLanguage(newLang);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to={`/${language}`} className="logo">
            <div className="logo-text">
              <span className="logo-main">Georgian Polygraph</span>
              <span className="logo-sub">Service</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            {navigation.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`nav-link ${isActiveLink(item.path) ? 'active' : ''}`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="header-controls">
            {/* Language Switcher */}
            <div className="language-switcher">
              <button
                className={`lang-btn ${language === 'ka' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('ka')}
              >
                GE
              </button>
              <span className="lang-separator">|</span>
              <button
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('en')}
              >
                EN
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className={`nav-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
          {navigation.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              className={`nav-link-mobile ${isActiveLink(item.path) ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
