import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import contactsData from '../../data/contactsData';
import './LedsHelpCta.css';

/** Closing CTA for the /leds section — same fill+arrow button style as .about-cta. */
const LedsHelpCta = () => {
  const { t } = useLanguage();

  return (
    <section className="leds-help-cta">
      <div className="container">
        <div className="leds-help-cta__inner">
          <h2 className="leds-help-cta__title">{t('leds.helpCta.title')}</h2>
          <p className="leds-help-cta__desc">{t('leds.helpCta.description')}</p>

          <a
            href={contactsData.phone.href}
            className="leds-help-cta__btn"
            aria-label={contactsData.phone.label}
          >
            <span className="leds-help-cta__btn-label">{t('leds.helpCta.cta')}</span>
            <span className="leds-help-cta__btn-arrow" aria-hidden>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M4 14L14 4M14 4H6M14 4V12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="leds-help-cta__btn-fill" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LedsHelpCta;
