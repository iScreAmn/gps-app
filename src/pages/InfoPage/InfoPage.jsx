import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import {
  FaPhoneAlt,
  FaTelegramPlane,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
} from 'react-icons/fa';
import {
  FiTool,
  FiPrinter,
  FiShoppingBag,
  FiHeadphones,
  FiSend,
  FiZap,
  FiSettings,
  FiTruck,
  FiActivity,
  FiBox,
  FiDroplet,
  FiLayers,
  FiFileText,
  FiCpu,
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiAward,
} from 'react-icons/fi';
import contactsData from '../../data/contactsData';
import './InfoPage.css';

/* ------------------------------------------------------------------ */
/*  Animated counter — counts up when the card scrolls into view       */
/* ------------------------------------------------------------------ */
const Counter = ({ to, suffix = '', duration = 1600 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className="info-stat-value">
      {value.toLocaleString('ru-RU')}
      <span className="info-stat-suffix">{suffix}</span>
    </span>
  );
};

/* ------------------------------------------------------------------ */
/*  Reveal-on-scroll wrapper                                           */
/* ------------------------------------------------------------------ */
const Reveal = ({ children, delay = 0, y = 24, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-10% 0px' }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
const InfoPage = () => {
  const phoneHref = contactsData.phone.href;
  const phoneLabel = contactsData.phone.label;
  const tgHref = contactsData.socials.telegram;
  const waHref = contactsData.socials.whatsapp;
  const emailHref = contactsData.email.href;
  const emailLabel = contactsData.email.label;

  /* hide sticky bar when footer-cta is in view */
  const footerCtaRef = useRef(null);
  const footerCtaInView = useInView(footerCtaRef, { margin: '-30% 0px 0px 0px' });

  const quickActions = [
    {
      icon: <FiTool />,
      title: 'Вызвать мастера',
      sub: 'Выезд в день обращения',
      href: '#contact-form',
      accent: 'red',
    },
    {
      icon: <FiDroplet />,
      title: 'Купить картридж',
      sub: 'Оригинал и совместимые',
      href: '#supplies',
      accent: 'blue',
    },
    {
      icon: <FiSettings />,
      title: 'Обслуживание',
      sub: 'Регулярный сервис',
      href: '#services',
      accent: 'violet',
    },
    {
      icon: <FaTelegramPlane />,
      title: 'Telegram',
      sub: 'Ответим в течение 5 минут',
      href: tgHref,
      external: true,
      accent: 'cyan',
    },
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp',
      sub: 'Чат с инженером',
      href: waHref,
      external: true,
      accent: 'green',
    },
    {
      icon: <FaPhoneAlt />,
      title: 'Позвонить',
      sub: phoneLabel,
      href: phoneHref,
      accent: 'amber',
    },
  ];

  const services = [
    { icon: <FiActivity />, title: 'Диагностика', desc: 'Полная проверка узлов и калибровка' },
    { icon: <FiTool />, title: 'Ремонт принтеров', desc: 'Лазерные, струйные, МФУ, плоттеры' },
    { icon: <FiDroplet />, title: 'Заправка картриджей', desc: 'Оригинальные тонеры и чернила' },
    { icon: <FiUsers />, title: 'Обслуживание офисов', desc: 'Контракты на парк техники' },
    { icon: <FiTruck />, title: 'Выезд мастера', desc: 'По Тбилиси — в течение часа' },
    { icon: <FiCpu />, title: 'Настройка оборудования', desc: 'Сеть, драйверы, профили печати' },
  ];

  const supplies = [
    { icon: <FiBox />, title: 'Картриджи', tag: 'Все бренды' },
    { icon: <FiDroplet />, title: 'Тонеры', tag: 'Оригинал' },
    { icon: <FiLayers />, title: 'Фотобарабаны', tag: 'OEM качество' },
    { icon: <FiFileText />, title: 'Бумага', tag: 'A4 — A0' },
    { icon: <FiSettings />, title: 'Запчасти', tag: 'В наличии' },
    { icon: <FiPrinter />, title: 'Чернила', tag: 'Pigment / Dye' },
  ];

  const stats = [
    { value: 15, suffix: '+', label: 'лет на рынке', icon: <FiAward /> },
    { value: 12000, suffix: '+', label: 'обслуженных устройств', icon: <FiCheckCircle /> },
    { value: 60, suffix: ' мин', label: 'средняя скорость выезда', icon: <FiClock /> },
    { value: 350, suffix: '+', label: 'корпоративных клиентов', icon: <FiUsers /> },
  ];

  return (
    <div className="info-page">
      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="info-hero">
        <div className="info-bg-layer">
          <div className="info-orb info-orb-1" />
          <div className="info-orb info-orb-2" />
          <div className="info-orb info-orb-3" />
          <div className="info-grid-overlay" />
        </div>

        <div className="info-container">
          <motion.div
            className="info-hero-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="info-pulse-dot" />
            QR-сервис · GPS Print
          </motion.div>

          <motion.h1
            className="info-hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            Сервис и расходные материалы
            <br />
            <span className="info-hero-title-accent">для вашего принтера</span>
          </motion.h1>

          <motion.p
            className="info-hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Вы отсканировали QR-код на устройстве. Здесь — всё, что нужно,
            чтобы оно работало без остановок: ремонт, расходники и поддержка в один тап.
          </motion.p>

          <motion.div
            className="info-hero-cta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
          >
            <a href={phoneHref} className="info-btn info-btn-primary">
              <FaPhoneAlt /> Связаться
            </a>
            <a
              href={tgHref}
              target="_blank"
              rel="noreferrer"
              className="info-btn info-btn-ghost"
            >
              <FaTelegramPlane /> Telegram
            </a>
            <a href="#contact-form" className="info-btn info-btn-ghost">
              <FiSend /> Оставить заявку
            </a>
          </motion.div>

          {/* floating printer card */}
          <motion.div
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
                <span className="info-hero-printer-label">device.online</span>
              </div>
              <div className="info-hero-printer-body">
                <FiPrinter className="info-hero-printer-icon" />
                <div className="info-hero-printer-meta">
                  <span className="info-hero-printer-status">
                    <span className="info-pulse-dot info-pulse-dot-green" />
                    Подключено к сервису
                  </span>
                  <span className="info-hero-printer-name">Ваш принтер · GPS</span>
                </div>
              </div>
              <div className="info-hero-printer-stats">
                <div>
                  <span>24/7</span>
                  <small>поддержка</small>
                </div>
                <div>
                  <span>~60м</span>
                  <small>выезд</small>
                </div>
                <div>
                  <span>15+</span>
                  <small>лет</small>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  QUICK ACTIONS                                                */}
      {/* ============================================================ */}
      <section className="info-section info-quick">
        <div className="info-container">
          <Reveal>
            <header className="info-section-head">
              <span className="info-eyebrow">
                <FiZap /> быстрые действия
              </span>
              <h2>Что вам нужно?</h2>
              <p>Выберите действие — мы откликнемся в течение нескольких минут.</p>
            </header>
          </Reveal>

          <div className="info-quick-grid">
            {quickActions.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.05}>
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

      {/* ============================================================ */}
      {/*  SERVICES                                                     */}
      {/* ============================================================ */}
      <section className="info-section info-services" id="services">
        <div className="info-container">
          <Reveal>
            <header className="info-section-head">
              <span className="info-eyebrow">
                <FiTool /> сервис и ремонт
              </span>
              <h2>Полный цикл обслуживания</h2>
              <p>От разовой диагностики до контракта на парк техники.</p>
            </header>
          </Reveal>

          <div className="info-services-grid">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04}>
                <article className="info-service-card">
                  <div className="info-service-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <span className="info-service-shine" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SUPPLIES                                                     */}
      {/* ============================================================ */}
      <section className="info-section info-supplies" id="supplies">
        <div className="info-container">
          <Reveal>
            <header className="info-section-head">
              <span className="info-eyebrow">
                <FiBox /> расходные материалы
              </span>
              <h2>Всё, что печатает — у нас в наличии</h2>
              <p>Подберём по модели вашего принтера. Доставим в день заказа.</p>
            </header>
          </Reveal>

          <div className="info-supplies-grid">
            {supplies.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04}>
                <article className="info-supply-card">
                  <div className="info-supply-visual">
                    <span className="info-supply-glow" />
                    <div className="info-supply-icon">{s.icon}</div>
                  </div>
                  <div className="info-supply-meta">
                    <span className="info-supply-tag">{s.tag}</span>
                    <h3>{s.title}</h3>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="info-supplies-foot">
              <span>Не нашли свою модель?</span>
              <a href={tgHref} target="_blank" rel="noreferrer" className="info-link-cta">
                Напишите нам <FaArrowRight />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TRUST                                                        */}
      {/* ============================================================ */}
      <section className="info-section info-trust">
        <div className="info-container">
          <Reveal>
            <header className="info-section-head">
              <span className="info-eyebrow">
                <FiAward /> доверие в цифрах
              </span>
              <h2>Нас выбирают, когда печать критична</h2>
            </header>
          </Reveal>

          <div className="info-stats-grid">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="info-stat-card">
                  <div className="info-stat-icon">{s.icon}</div>
                  <Counter to={s.value} suffix={s.suffix} />
                  <span className="info-stat-label">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CONTACT                                                      */}
      {/* ============================================================ */}
      <section className="info-section info-contact" id="contact-form">
        <div className="info-container">
          <Reveal>
            <header className="info-section-head">
              <span className="info-eyebrow">
                <FiHeadphones /> контакты
              </span>
              <h2>На связи 24/7</h2>
              <p>Один тап — и вы с инженером, а не в очереди.</p>
            </header>
          </Reveal>

          <div className="info-contact-grid">
            <Reveal className="info-contact-card-wrap">
              <div className="info-contact-card">
                <a href={phoneHref} className="info-contact-row">
                  <span className="info-contact-row-icon"><FaPhoneAlt /></span>
                  <span className="info-contact-row-text">
                    <small>Телефон</small>
                    <strong>{phoneLabel}</strong>
                  </span>
                  <FaArrowRight className="info-contact-row-arrow" />
                </a>

                <a
                  href={tgHref}
                  target="_blank"
                  rel="noreferrer"
                  className="info-contact-row"
                >
                  <span className="info-contact-row-icon info-bg-tg"><FaTelegramPlane /></span>
                  <span className="info-contact-row-text">
                    <small>Telegram</small>
                    <strong>@geopolser</strong>
                  </span>
                  <FaArrowRight className="info-contact-row-arrow" />
                </a>

                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="info-contact-row"
                >
                  <span className="info-contact-row-icon info-bg-wa"><FaWhatsapp /></span>
                  <span className="info-contact-row-text">
                    <small>WhatsApp</small>
                    <strong>Чат с инженером</strong>
                  </span>
                  <FaArrowRight className="info-contact-row-arrow" />
                </a>

                <a href={emailHref} className="info-contact-row">
                  <span className="info-contact-row-icon"><FaEnvelope /></span>
                  <span className="info-contact-row-text">
                    <small>Email</small>
                    <strong>{emailLabel}</strong>
                  </span>
                  <FaArrowRight className="info-contact-row-arrow" />
                </a>

                <div className="info-contact-row info-contact-row-static">
                  <span className="info-contact-row-icon"><FaMapMarkerAlt /></span>
                  <span className="info-contact-row-text">
                    <small>Адрес</small>
                    <strong>Тбилиси, Грузия</strong>
                  </span>
                </div>

                <div className="info-contact-row info-contact-row-static">
                  <span className="info-contact-row-icon"><FaClock /></span>
                  <span className="info-contact-row-text">
                    <small>График</small>
                    <strong>Пн–Сб · 10:00 — 19:00</strong>
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="info-map-wrap">
              <div className="info-map">
                <iframe
                  title="GPS office map"
                  src="https://www.google.com/maps?q=41.724653,44.786316&z=15&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen=""
                />
                <div className="info-map-overlay" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER CTA                                                   */}
      {/* ============================================================ */}
      <section className="info-section info-footer-cta" ref={footerCtaRef}>
        <div className="info-container">
          <Reveal>
            <div className="info-footer-card">
              <div className="info-footer-card-bg">
                <div className="info-orb info-orb-cta-1" />
                <div className="info-orb info-orb-cta-2" />
              </div>
              <div className="info-footer-card-content">
                <h2>Нужен сервис или расходные материалы?</h2>
                <p>Оставьте заявку — инженер свяжется с вами в течение 15 минут.</p>
                <div className="info-footer-card-cta">
                  <a href={phoneHref} className="info-btn info-btn-primary info-btn-lg">
                    <FaPhoneAlt /> Позвонить сейчас
                  </a>
                  <a
                    href={tgHref}
                    target="_blank"
                    rel="noreferrer"
                    className="info-btn info-btn-ghost info-btn-lg"
                  >
                    <FaTelegramPlane /> Написать в Telegram
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STICKY MOBILE CTA BAR                                       */}
      {/* ============================================================ */}
      <div
        className="info-sticky-bar"
        data-hidden={footerCtaInView ? 'true' : 'false'}
      >
        <a href={phoneHref} className="info-sticky-btn info-sticky-call">
          <FaPhoneAlt /> <span>Позвонить</span>
        </a>
        <a
          href={tgHref}
          target="_blank"
          rel="noreferrer"
          className="info-sticky-btn info-sticky-tg"
          aria-label="Telegram"
        >
          <FaTelegramPlane />
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          className="info-sticky-btn info-sticky-wa"
          aria-label="WhatsApp"
        >
          <FaWhatsapp />
        </a>
      </div>
    </div>
  );
};

export default InfoPage;
