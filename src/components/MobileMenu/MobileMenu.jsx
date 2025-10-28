import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../contexts/ThemeContext';
import { IoSunny, IoMoon } from "react-icons/io5";
import * as motion from 'motion/react-client';
import './MobileMenu.css';

const MobileMenu = ({ isOpen, setIsOpen }) => {
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const { language, changeLanguage, t } = useLanguage();
  const location = useLocation();

  const navigationItems = [
    { path: '', key: 'navigation.home' },
    { path: '/about', key: 'navigation.about' },
    { path: '/catalog', key: 'navigation.catalog' },
    { path: '/services', key: 'navigation.services' },
    { path: '/news', key: 'navigation.news' },
    { path: '/contacts', key: 'navigation.contacts' }
  ];

  // Block body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, setIsOpen]);

  const getLocalizedPath = (path) => {
    return `/${language}${path}`;
  };

  const isActivePath = (path) => {
    const localizedPath = getLocalizedPath(path);
    return location.pathname === localizedPath || 
           (path === '' && location.pathname === `/${language}`);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className="mobile-menu"
      data-is-open={isOpen}
    >
      <motion.div 
        className="mobile-menu-background" 
        variants={sidebarVariants} 
      />
      <Navigation 
        items={navigationItems}
        getLocalizedPath={getLocalizedPath}
        isActivePath={isActivePath}
        t={t}
        onLinkClick={handleLinkClick}
      />
      <MenuToggle toggle={() => setIsOpen(!isOpen)} />
    </motion.nav>
  );
};

const navVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Navigation = ({ 
  items, 
  getLocalizedPath, 
  isActivePath, 
  t, 
  onLinkClick 
}) => (
  <motion.div className="mobile-menu-content" variants={navVariants}>
    <motion.ul className="mobile-nav-list" variants={navVariants}>
      {items.map((item) => (
        <MenuItem 
          key={item.path} 
          item={item}
          getLocalizedPath={getLocalizedPath}
          isActivePath={isActivePath}
          t={t}
          onLinkClick={onLinkClick}
        />
      ))}
    </motion.ul>
    <motion.div 
      className="mobile-controls-container"
      variants={itemVariants}
    >
      <MobileLanguageSwitcher onLanguageChange={onLinkClick} />
      <MobileThemeToggle />
    </motion.div>
  </motion.div>
);

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MenuItem = ({ item, getLocalizedPath, isActivePath, t, onLinkClick }) => {
  const isActive = isActivePath(item.path);
  
  return (
    <motion.li
      className="mobile-nav-item"
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link 
        to={getLocalizedPath(item.path)} 
        className={`mobile-nav-link ${isActive ? 'active' : ''}`}
        onClick={onLinkClick}
      >
        {t(item.key)}
      </Link>
    </motion.li>
  );
};

const sidebarVariants = {
  open: (height = 1000) => ({
    clipPath: `circle(${Math.max(height, window.innerHeight) * 2 + 200}px at calc(100vw - 45px) 45px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at calc(100vw - 45px) 45px)",
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ toggle }) => (
  <button className="menu-toggle" onClick={toggle} aria-label="Toggle menu">
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);

// Language switcher for mobile menu
const MobileLanguageSwitcher = ({ onLanguageChange }) => {
  const { language, changeLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (newLang) => {
    // Get current path without language prefix
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const currentLang = pathSegments[0];
    
    // Remove current language from path if it exists
    if (['ka', 'en'].includes(currentLang)) {
      pathSegments.shift();
    }
    
    // Create new path with new language
    const newPath = `/${newLang}${pathSegments.length > 0 ? '/' + pathSegments.join('/') : ''}`;
    changeLanguage(newLang);
    navigate(newPath);
    
    // Close mobile menu
    onLanguageChange();
  };

  return (
    <div className="mobile-language-switcher">
      <button
        className={`mobile-lang-btn ${language === 'ka' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('ka')}
      >
        GE
      </button>
      <span className="mobile-lang-separator">|</span>
      <button
        className={`mobile-lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('en')}
      >
        EN
      </button>
    </div>
  );
};

// Theme toggle for mobile menu
const MobileThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="mobile-theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <IoMoon /> : <IoSunny />}
    </button>
  );
};

// Hook for getting element dimensions
const useDimensions = (ref) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  return dimensions.current;
};

export default MobileMenu;

