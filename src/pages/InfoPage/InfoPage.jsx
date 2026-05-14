import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars -- motion primitives (m.div, m.h1, …)
import { motion as m, useReducedMotion } from 'motion/react';
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaArrowRight,
  FaArrowUp,
} from 'react-icons/fa';
import {
  FiTool,
  FiPrinter,
  FiSend,
  FiZap,
  FiDroplet,
} from 'react-icons/fi';
import contactsData from '../../data/contactsData';
import ProblemReportModal from './ProblemReportModal';
import './InfoPage.css';

const Reveal = ({ children, delay = 0, y = 24, className = '' }) => (
  <m.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-10% 0px' }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </m.div>
);

const InfoPage = () => {
  const { t, i18n } = useTranslation();
  const pageLang =
    String(i18n.resolvedLanguage || i18n.language || '').split('-')[0] === 'ka'
      ? 'ka'
      : 'en';
  const phoneHref = contactsData.phone.href;
  const phoneLabel = contactsData.phone.label;
  const waHref = contactsData.socials.whatsapp;
  const contactsHref = `/${pageLang}/contacts`;

  const reduceMotion = useReducedMotion();
  const [reportOpen, setReportOpen] = useState(false);

  const scrollInfoPageToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  const quickActionDefs = [
    { key: 'master', icon: <FiTool />, href: contactsHref, accent: 'red', external: false },
    { key: 'cartridge', icon: <FiDroplet />, href: '#supplies', accent: 'blue', external: false },
    { key: 'whatsapp', icon: <FaWhatsapp />, href: waHref, accent: 'green', external: true },
    { key: 'call', icon: <FaPhoneAlt />, href: phoneHref, accent: 'amber', external: false },
  ];
  const quickActions = quickActionDefs.map((def) => ({
    ...def,
    title: t(`infoPage.quickActions.${def.key}.title`),
    sub: def.key === 'call' ? phoneLabel : t(`infoPage.quickActions.${def.key}.sub`),
  }));

  return (
    <div className="info-page" data-page-lang={pageLang}>
      <div className="info-bg-layer" aria-hidden>
        <div className="info-orb info-orb-1" />
        <div className="info-orb info-orb-2" />
        <div className="info-orb info-orb-3" />
        <div className="info-grid-overlay" />
      </div>

      <section className="info-hero" data-hero-lang={pageLang}>
        <div className="info-container">
          <m.h1
            className="info-hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('infoPage.hero.titleLine1')}
            <br />
            <span className="info-hero-title-accent">{t('infoPage.hero.titleAccent')}</span>
          </m.h1>
          <m.div
            className="info-hero-cta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
          >
            <a href={phoneHref} className="info-btn info-btn-primary">
              <FaPhoneAlt /> {t('infoPage.hero.ctaContact')}
            </a>
            <button
              type="button"
              onClick={() => setReportOpen(true)}
              className="info-btn info-btn-ghost"
            >
              <FiSend /> {t('infoPage.hero.ctaRequest')}
            </button>
          </m.div>

          {/* floating printer card */}
          <m.div
            className="info-hero-printer"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="info-hero-printer-glow" />
            <div className="info-hero-printer-card">
              <div className="info-hero-printer-top">
                <span className="info-hero-printer-dot" />
                <span className="info-hero-printer-dot" />
                <span className="info-hero-printer-dot" />
              </div>
              <div className="info-hero-printer-body">
                <FiPrinter className="info-hero-printer-icon" />
                <div className="info-hero-printer-meta">
                  <span className="info-hero-printer-status">
                    <span className="info-pulse-dot info-pulse-dot-green" />
                    {t('infoPage.hero.printerStatus')}
                  </span>
                  <span className="info-hero-printer-name">{t('infoPage.hero.printerTagline')}</span>
                </div>
              </div>
              <div className="info-hero-printer-stats">
                <div>
                  <span>{t('infoPage.hero.stat1Title')}</span>
                  <small>{t('infoPage.hero.stat1Sub')}</small>
                </div>
                <div>
                  <span>{t('infoPage.hero.stat2Title')}</span>
                  <small>{t('infoPage.hero.stat2Sub')}</small>
                </div>
                <div>
                  <span>{t('infoPage.hero.stat3Title')}</span>
                  <small>{t('infoPage.hero.stat3Sub')}</small>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      <section className="info-section info-quick">
        <div className="info-container">
          <Reveal>
            <header className="info-section-head">
              <span className="info-eyebrow">
                <FiZap /> {t('infoPage.quick.eyebrow')}
              </span>
              <h2>{t('infoPage.quick.title')}</h2>
            </header>
          </Reveal>

          <div className="info-quick-grid">
            {quickActions.map((a, i) => (
              <Reveal key={a.key} delay={i * 0.05}>
                <a
                  className={`info-quick-card info-accent-${a.accent}`}
                  href={a.href}
                  {...(a.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <div className="info-quick-icon">{a.icon}</div>
                  <div className="info-quick-text">
                    <span className="info-quick-title">{a.title}</span>
                    <span className="info-quick-sub">{a.sub}</span>
                  </div>
                  <FaArrowRight className="info-quick-arrow" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="info-section info-footer-cta">
        <div className="info-container">
          <Reveal>
            <div className="info-footer-card">
              <div className="info-footer-card-bg">
                <div className="info-orb info-orb-cta-1" />
                <div className="info-orb info-orb-cta-2" />
              </div>
              <div className="info-footer-card-content">
                <h2>{t('infoPage.footerCta.title')}</h2>
                <p>{t('infoPage.footerCta.lead')}</p>
                <div className="info-footer-card-cta">
                  <a href={phoneHref} className="info-btn info-btn-primary info-btn-lg">
                    <FaPhoneAlt /> {t('infoPage.footerCta.call')}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div
        className="info-sticky-bar"
        data-sticky-lang={pageLang}
      >
        <a href={phoneHref} className="info-sticky-btn info-sticky-call">
          <FaPhoneAlt /> <span>{t('infoPage.sticky.call')}</span>
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          className="info-sticky-btn info-sticky-wa"
          aria-label={t('infoPage.aria.whatsapp')}
        >
          <FaWhatsapp />
        </a>
        <button
          type="button"
          className="info-sticky-btn info-sticky-top"
          aria-label={t('infoPage.aria.toTop')}
          onClick={scrollInfoPageToTop}
        >
          <FaArrowUp />
        </button>
      </div>

      <ProblemReportModal
        open={reportOpen}
        onClose={() => setReportOpen(false)}
      />
    </div>
  );
};

export default InfoPage;
