import React, { useEffect, useState } from 'react';
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
  FiZap,
  FiDroplet,
} from 'react-icons/fi';
import { RiCustomerService2Fill, RiChat3Line } from "react-icons/ri";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import contactsData from '../../data/contactsData';
import ProblemReportModal from './ProblemReportModal';
import ChatModal from './ChatModal';
import './InfoPage.css';

/** IANA id supported by this runtime, or null → UTC+4 (Georgia, no DST). */
let cachedGeorgiaTz;
function getGeorgiaTimeZoneId() {
  if (cachedGeorgiaTz !== undefined) return cachedGeorgiaTz;
  for (const tz of ['Europe/Tbilisi', 'Asia/Tbilisi']) {
    try {
      new Date().toLocaleString('en-US', { timeZone: tz });
      cachedGeorgiaTz = tz;
      return tz;
    } catch {
      /* next */
    }
  }
  cachedGeorgiaTz = null;
  return null;
}

const TBILISI_WEEKDAYS_EN = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

/** Mon–Fri 10:00–18:00, Sat 10:00–14:00 (Georgia). */
function isTbilisOfficeHours(date = new Date()) {
  const tz = getGeorgiaTimeZoneId();
  let weekday;
  let hour;
  let minute;

  if (tz) {
    weekday = date.toLocaleDateString('en-US', { timeZone: tz, weekday: 'long' });
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(date);
    hour = Number(parts.find((p) => p.type === 'hour')?.value);
    minute = Number(parts.find((p) => p.type === 'minute')?.value);
  } else {
    const shifted = new Date(date.getTime() + 4 * 60 * 60 * 1000);
    weekday = TBILISI_WEEKDAYS_EN[shifted.getUTCDay()];
    hour = shifted.getUTCHours();
    minute = shifted.getUTCMinutes();
  }

  if (Number.isNaN(hour) || Number.isNaN(minute)) return false;
  const mins = hour * 60 + minute;

  if (weekday === 'Sunday') return false;
  if (weekday === 'Saturday') return mins >= 10 * 60 && mins < 14 * 60;
  if (
    weekday === 'Monday' ||
    weekday === 'Tuesday' ||
    weekday === 'Wednesday' ||
    weekday === 'Thursday' ||
    weekday === 'Friday'
  ) {
    return mins >= 10 * 60 && mins < 18 * 60;
  }
  return false;
}

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
  const waChatHref = contactsData.socials.whatsappChat;
  const contactsHref = `/${pageLang}/contacts`;

  const reduceMotion = useReducedMotion();
  const [reportOpen, setReportOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [printerOnline, setPrinterOnline] = useState(() => isTbilisOfficeHours());

  useEffect(() => {
    const tick = () => setPrinterOnline(isTbilisOfficeHours());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const scrollInfoPageToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  const quickActionDefs = [
    { key: 'master', icon: <FiTool />, href: contactsHref, accent: 'red', external: false },
    { key: 'cartridge', icon: <FiDroplet />, href: phoneHref, accent: 'blue', external: false },
    { key: 'whatsapp', icon: <FaWhatsapp />, href: waChatHref, accent: 'green', external: true },
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
              <VscGitPullRequestNewChanges /> {t('infoPage.hero.ctaRequest')}
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
                <RiCustomerService2Fill className="info-hero-printer-icon" />
                <div className="info-hero-printer-meta">
                  <span className="info-hero-printer-status">
                    <span
                      className={
                        printerOnline
                          ? 'info-pulse-dot info-pulse-dot-green'
                          : 'info-pulse-dot info-pulse-dot-red'
                      }
                      aria-hidden
                    />
                    {printerOnline
                      ? t('infoPage.hero.printerStatusOnline')
                      : t('infoPage.hero.printerStatusOffline')}
                  </span>
                  <span className="info-hero-printer-name">
                    {printerOnline
                      ? t('infoPage.hero.printerTagline')
                      : t('infoPage.hero.printerOutsideHours')}
                  </span>
                  <div className="info-hero-printer-hours">
                    <span>{t('infoPage.hero.printerHoursLabel')}</span>
                    <span>{t('infoPage.hero.printerHoursWeekdays')}</span>
                    <span>{t('infoPage.hero.printerHoursSaturday')}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="info-hero-printer-textus"
                onClick={() => setChatOpen(true)}
                disabled={!printerOnline}
                aria-disabled={!printerOnline}
              >
                <RiChat3Line />
                {printerOnline
                  ? t('infoPage.hero.textUs')
                  : t('infoPage.hero.textUsOffline')}
              </button>
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
            {quickActions.map((a, i) => {
              const cardClass = `info-quick-card info-accent-${a.accent}`;
              const inner = (
                <>
                  <div className="info-quick-icon">{a.icon}</div>
                  <div className="info-quick-text">
                    <span className="info-quick-title">{a.title}</span>
                    <span className="info-quick-sub">{a.sub}</span>
                  </div>
                  <FaArrowRight className="info-quick-arrow" />
                </>
              );
              if (a.accent === 'red') {
                return (
                  <Reveal key={a.key} delay={i * 0.05}>
                    <button
                      type="button"
                      className={cardClass}
                      onClick={() => setReportOpen(true)}
                    >
                      {inner}
                    </button>
                  </Reveal>
                );
              }
              if (a.accent === 'blue') {
                return (
                  <Reveal key={a.key} delay={i * 0.05}>
                    <a href={phoneHref} className={cardClass}>
                      {inner}
                    </a>
                  </Reveal>
                );
              }
              return (
                <Reveal key={a.key} delay={i * 0.05}>
                  <a
                    className={cardClass}
                    href={a.href}
                    {...(a.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    {inner}
                  </a>
                </Reveal>
              );
            })}
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
      <ChatModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
};

export default InfoPage;
