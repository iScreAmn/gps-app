import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TopHeader from '../../components/Header/TopHeader';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ScrollToTop from '../../components/widgets/ScrollToTop/ScrollToTop';
import { Modal } from '../../components/widgets/Modals';
import Construction from '../../components/widgets/Modals/Popup/Construction/Construction';
import { useLanguage } from '../../hooks/useLanguage';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const constructionTimerRef = useRef(null);
  const [isConstructionModalOpen, setIsConstructionModalOpen] = useState(false);
  const { t } = useLanguage();

  // Auto-open construction modal 8s after initial mount, regardless of the current route
  useEffect(() => {
    constructionTimerRef.current = setTimeout(() => {
      setIsConstructionModalOpen(true);
      constructionTimerRef.current = null;
    }, 8000);

    return () => {
      if (constructionTimerRef.current) {
        clearTimeout(constructionTimerRef.current);
      }
    };
  }, []);

  const handleCloseConstructionModal = () => {
    setIsConstructionModalOpen(false);

    if (constructionTimerRef.current) {
      clearTimeout(constructionTimerRef.current);
      constructionTimerRef.current = null;
    }
  };

  // Scroll to top when route changes, but not when only language changes
  useEffect(() => {
    const currentPath = location.pathname;
    const prevPath = prevPathRef.current;
    
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
      <TopHeader />
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <Modal
        isOpen={isConstructionModalOpen}
        onClose={handleCloseConstructionModal}
        className="construction-modal"
        title={t("construction.title")}
      >
        <Construction />
      </Modal>
    </div>
  );
};

export default Layout;
