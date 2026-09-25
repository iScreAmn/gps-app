import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaArrowUp } from "react-icons/fa";
import './ScrollToTop.css';

/** Same breakpoint as `.info-sticky-bar` hide on desktop in InfoPage.css */
const INFO_PAGE_FLOATING_SCROLL_HIDE_MQ = '(max-width: 899px)';
const INFO_PAGE_PATH = /^\/(en|ka)\/info$|^\/info$/i;

const ScrollToTop = () => {
  const location = useLocation();
  const [hideFloatingOnInfoMobile, setHideFloatingOnInfoMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      INFO_PAGE_PATH.test(location.pathname)
      && window.matchMedia(INFO_PAGE_FLOATING_SCROLL_HIDE_MQ).matches
    );
  });
  const [isVisible, setIsVisible] = useState(false);
  const [footerLift, setFooterLift] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia(INFO_PAGE_FLOATING_SCROLL_HIDE_MQ);
    const sync = () => {
      setHideFloatingOnInfoMobile(
        INFO_PAGE_PATH.test(location.pathname) && mq.matches
      );
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [location.pathname]);

  // Кнопка прижата к низу экрана, поэтому на футере она легла бы поверх его
  // содержимого — приподнимаем её ровно на ту высоту, на которую футер зашёл
  // в кадр, и кнопка жёстко «останавливается» над ним.
  useEffect(() => {
    let frame = null;

    const measure = () => {
      frame = null;
      setIsVisible(window.scrollY > 300);

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);

      // Ищем футер на каждом кадре: после смены маршрута он может смонтироваться заново.
      const footer = document.querySelector('.footer');
      if (!footer) {
        setFooterLift(0);
        return;
      }

      const overlap = window.innerHeight - footer.getBoundingClientRect().top;
      setFooterLift(Math.max(0, overlap));
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [hideFloatingOnInfoMobile, location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (hideFloatingOnInfoMobile) {
    return null;
  }

  return (
    <button
      className={`scroll-to-top ${isVisible ? 'visible' : ''} ${footerLift > 0 ? 'scroll-to-top--footer-visible' : ''}`}
      style={{ '--footer-lift': `${footerLift}px`, '--scroll-progress': progress }}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      {/* Кольцо заполняется по мере прокрутки страницы */}
      <svg className="scroll-to-top__ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle className="scroll-to-top__ring-track" cx="24" cy="24" r="22" />
        <circle className="scroll-to-top__ring-bar" cx="24" cy="24" r="22" />
      </svg>
      <FaArrowUp className="scroll-to-top__icon" />
    </button>
  );
};

export default ScrollToTop;
