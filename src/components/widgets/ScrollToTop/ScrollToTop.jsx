import React, { useState, useEffect, useRef } from 'react';
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
  const buttonRef = useRef(null);

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

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  useEffect(() => {
    const footer = document.querySelector('.footer');
    const buttonEl = buttonRef.current;

    if (!footer || !buttonEl) {
      return undefined;
    }

    const toPixels = (value) => {
      if (!value) return null;
      const trimmed = value.trim();
      if (!trimmed) return null;

      if (trimmed.endsWith('px')) {
        const parsed = parseFloat(trimmed);
        return Number.isNaN(parsed) ? null : parsed;
      }

      if (trimmed.endsWith('rem')) {
        const base = parseFloat(trimmed);
        if (Number.isNaN(base)) return null;
        const rootFontSize = parseFloat(
          window.getComputedStyle(document.documentElement).fontSize
        ) || 16;
        return base * rootFontSize;
      }

      const fallback = parseFloat(trimmed);
      return Number.isNaN(fallback) ? null : fallback;
    };

    let lastAppliedOffset = null;
    let footerCurrentlyVisible = false;

    const updatePosition = () => {
      const computed = window.getComputedStyle(buttonEl);
      const baseOffset = toPixels(computed.getPropertyValue('--scroll-to-top-base'))
        ?? toPixels(computed.bottom)
        ?? 32;

      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const overlap = viewportHeight - footerRect.top;
      const shouldAdjust = overlap > 0;

      if (shouldAdjust !== footerCurrentlyVisible) {
        footerCurrentlyVisible = shouldAdjust;
        buttonEl.classList.toggle('scroll-to-top--footer-visible', shouldAdjust);
      }

      if (shouldAdjust) {
        const offset = Math.max(baseOffset, overlap);

        if (lastAppliedOffset === null || Math.abs(offset - lastAppliedOffset) > 0.5) {
          buttonEl.style.setProperty('--scroll-to-top-offset', `${offset}px`);
          lastAppliedOffset = offset;
        }
      } else if (lastAppliedOffset !== null) {
        buttonEl.style.removeProperty('--scroll-to-top-offset');
        lastAppliedOffset = null;
      }
    };

    updatePosition();

    const opts = { passive: true };
    window.addEventListener('scroll', updatePosition, opts);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, opts);
      window.removeEventListener('resize', updatePosition);
      buttonEl.classList.remove('scroll-to-top--footer-visible');
      buttonEl.style.removeProperty('--scroll-to-top-offset');
    };
  }, [hideFloatingOnInfoMobile]);

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
      ref={buttonRef}
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTop;
