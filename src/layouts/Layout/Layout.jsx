import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { getCurrentLanguageFromPath } from '../../i18n';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  // Scroll to top when route changes, but not when only language changes
  useEffect(() => {
    const currentPath = location.pathname;
    const prevPath = prevPathRef.current;
    
    // Get current and previous language
    const currentLang = getCurrentLanguageFromPath(currentPath);
    const prevLang = getCurrentLanguageFromPath(prevPath);
    
    // Remove language prefix from paths for comparison
    const currentPathWithoutLang = currentPath.replace(/^\/[a-z]{2}/, '') || '/';
    const prevPathWithoutLang = prevPath.replace(/^\/[a-z]{2}/, '') || '/';
    
    // Only scroll to top if the path structure changed (not just language)
    if (currentPathWithoutLang !== prevPathWithoutLang) {
      window.scrollTo(0, 0);
    }
    
    // Update previous path reference
    prevPathRef.current = currentPath;
  }, [location.pathname]);

  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
