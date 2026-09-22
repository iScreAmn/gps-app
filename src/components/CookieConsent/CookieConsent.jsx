import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars -- motion primitives (m.section)
import { motion as m, AnimatePresence, useReducedMotion } from 'motion/react';
import { FaCookieBite } from 'react-icons/fa';
import { useLanguage } from '../../hooks/useLanguage';
import { useCookieConsent } from '../../hooks/useCookieConsent';
import './CookieConsent.css';

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const CookieCategory = ({ id, title, description, checked, onChange, disabled, badge, switchLabel }) => (
  <li className="cookie-category">
    <div className="cookie-category__head">
      <h3 className="cookie-category__title" id={`${id}-title`}>
        {title}
      </h3>
      <label className={`cookie-switch${disabled ? ' cookie-switch--locked' : ''}`}>
        <input
          type="checkbox"
          role="switch"
          className="cookie-switch__input"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.checked)}
          aria-label={switchLabel}
          aria-describedby={`${id}-description`}
        />
        <span className="cookie-switch__track" aria-hidden="true">
          <span className="cookie-switch__thumb" />
        </span>
      </label>
    </div>
    <p className="cookie-category__description" id={`${id}-description`}>
      {description}
    </p>
    {badge && <span className="cookie-category__badge">{badge}</span>}
  </li>
);

const CookieConsent = () => {
  const { t, language } = useLanguage();
  const {
    consent,
    isBannerVisible,
    isSettingsOpen,
    acceptAll,
    rejectOptional,
    savePreferences,
    openSettings,
    closeSettings,
  } = useCookieConsent();

  const prefersReducedMotion = useReducedMotion();
  const [draft, setDraft] = useState({ analytics: false, externalMedia: false });
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);
  const consentRef = useRef(consent);
  consentRef.current = consent;

  // Re-seed the toggles from the stored choice each time the panel opens, so
  // closing without saving never leaks an abandoned draft into the next visit.
  useEffect(() => {
    if (!isSettingsOpen) return;
    const stored = consentRef.current;
    setDraft({
      analytics: stored?.analytics === true,
      externalMedia: stored?.externalMedia === true,
    });
  }, [isSettingsOpen]);

  useEffect(() => {
    if (!isSettingsOpen) return undefined;

    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const dialog = dialogRef.current;
    dialog?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        closeSettings();
        return;
      }

      if (event.key !== 'Tab' || !dialog) return;

      const focusable = Array.from(dialog.querySelectorAll(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.body.style.overflow = previousOverflow;

      const previous = previousFocusRef.current;
      if (previous && document.contains(previous) && typeof previous.focus === 'function') {
        previous.focus();
      }
    };
  }, [isSettingsOpen, closeSettings]);

  const handleOverlayMouseDown = useCallback(
    (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        closeSettings();
      }
    },
    [closeSettings]
  );

  const privacyPath = `/${language}/privacy-policy`;

  const banner = isBannerVisible && (
    <m.section
      key="cookie-banner"
      className="cookie-consent cookie-banner"
      role="region"
      aria-label={t('cookieConsent.banner.ariaLabel')}
      inert={isSettingsOpen}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: '120%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={
        prefersReducedMotion
          ? { opacity: 0, transition: { duration: 0.15 } }
          : { opacity: 0, y: '120%', transition: { duration: 0.28, ease: [0.4, 0, 1, 1] } }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0.2 }
          : { type: 'spring', stiffness: 260, damping: 30, mass: 0.9, delay: 0.25 }
      }
    >
      <div className="cookie-banner__head">
        <span className="cookie-banner__icon" aria-hidden="true">
          <FaCookieBite />
        </span>
        <div className="cookie-banner__text">
          <h2 className="cookie-banner__title">{t('cookieConsent.banner.title')}</h2>
          <p className="cookie-banner__description">
            {t('cookieConsent.banner.description')}{' '}
            <Link to={privacyPath} className="cookie-banner__link">
              {t('cookieConsent.banner.privacyLink')}
            </Link>
          </p>
        </div>
      </div>

      <div className="cookie-banner__actions">
        <button type="button" className="cookie-btn cookie-btn--primary" onClick={acceptAll}>
          {t('cookieConsent.actions.acceptAll')}
        </button>
        <button type="button" className="cookie-btn cookie-btn--ghost" onClick={openSettings}>
          {t('cookieConsent.actions.customize')}
        </button>
      </div>
    </m.section>
  );

  const settings = isSettingsOpen && (
    <div className="cookie-consent cookie-modal" onMouseDown={handleOverlayMouseDown}>
      <div className="cookie-modal__overlay" />
      <div
        className="cookie-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
        aria-describedby="cookie-settings-description"
        ref={dialogRef}
        tabIndex={-1}
      >
        <div className="cookie-modal__header">
          <h2 className="cookie-modal__title" id="cookie-settings-title">
            {t('cookieConsent.settings.title')}
          </h2>
          <button
            type="button"
            className="cookie-modal__close"
            onClick={closeSettings}
            aria-label={t('cookieConsent.actions.close')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <p className="cookie-modal__description" id="cookie-settings-description">
          {t('cookieConsent.settings.description')}
        </p>

        <ul className="cookie-categories">
          <CookieCategory
            id="cookie-necessary"
            title={t('cookieConsent.categories.necessary.title')}
            description={t('cookieConsent.categories.necessary.description')}
            switchLabel={t('cookieConsent.categories.necessary.switchLabel')}
            badge={t('cookieConsent.categories.necessary.badge')}
            checked
            disabled
          />
          <CookieCategory
            id="cookie-analytics"
            title={t('cookieConsent.categories.analytics.title')}
            description={t('cookieConsent.categories.analytics.description')}
            switchLabel={t('cookieConsent.categories.analytics.switchLabel')}
            checked={draft.analytics}
            onChange={(value) => setDraft((prev) => ({ ...prev, analytics: value }))}
          />
          <CookieCategory
            id="cookie-external-media"
            title={t('cookieConsent.categories.externalMedia.title')}
            description={t('cookieConsent.categories.externalMedia.description')}
            switchLabel={t('cookieConsent.categories.externalMedia.switchLabel')}
            checked={draft.externalMedia}
            onChange={(value) => setDraft((prev) => ({ ...prev, externalMedia: value }))}
          />
        </ul>

        <div className="cookie-modal__actions">
          <button
            type="button"
            className="cookie-btn cookie-btn--primary"
            onClick={() => savePreferences(draft)}
          >
            {t('cookieConsent.actions.save')}
          </button>
          <button type="button" className="cookie-btn cookie-btn--primary" onClick={acceptAll}>
            {t('cookieConsent.actions.acceptAll')}
          </button>
          <button type="button" className="cookie-btn cookie-btn--ghost" onClick={rejectOptional}>
            {t('cookieConsent.actions.rejectOptional')}
          </button>
        </div>

        <Link to={privacyPath} className="cookie-modal__link" onClick={closeSettings}>
          {t('cookieConsent.banner.privacyLink')}
        </Link>
      </div>
    </div>
  );

  return createPortal(
    <>
      <AnimatePresence>{banner}</AnimatePresence>
      {settings}
    </>,
    document.body
  );
};

export default CookieConsent;
