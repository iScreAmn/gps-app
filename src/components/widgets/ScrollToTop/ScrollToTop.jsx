import React, { useState, useEffect, useRef } from 'react';
import { FaArrowUp } from "react-icons/fa";
import './ScrollToTop.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);

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
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
