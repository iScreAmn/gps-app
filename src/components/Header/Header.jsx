import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../hooks/useLanguage';
import { IoSunny, IoMoon } from "react-icons/io5";
import MobileMenu from '../MobileMenu/MobileMenu';
import './Header.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Create navigation array that updates when language changes
  const navigation = React.useMemo(() => [
    { key: 'navigation.home', path: `/${language}` },
    { key: 'navigation.about', path: `/${language}/about` },
    { key: 'navigation.catalog', path: `/${language}/catalog` },
    { key: 'navigation.services', path: `/${language}/services` },
    { key: 'navigation.news', path: `/${language}/news` },
    { key: 'navigation.contacts', path: `/${language}/contacts` },
  ], [language]);

  const isActiveLink = React.useCallback((path) => {
    if (path === `/${language}`) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  }, [language, location.pathname]);

  const handleLanguageChange = (newLang) => {
    changeLanguage(newLang);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            {/* Desktop Navigation */}
            <nav className="nav-desktop">
              {navigation.map((item) => (
                <Link
                  key={`${language}-${item.key}`}
                  to={item.path}
                  className={`nav-link ${isActiveLink(item.path) ? 'active' : ''}`}
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>

            {/* Desktop Controls */}
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
                {theme === 'light' ? <IoMoon /> : <IoSunny />}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </>
  );
};

export default Header;
