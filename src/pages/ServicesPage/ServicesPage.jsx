import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import PageAmbientBackground from "../../components/PageAmbientBackground/PageAmbientBackground";
import ParallaxText from "../../components/widgets/ParallaxText/ParallaxText";
import contactsData from "../../data/contactsData";
import {
  servicesHero,
  servicesMarquee,
  servicesSegments,
  servicesSupplies,
  servicesCta,
} from "../../data/servicesData";
import "./ServicesPage.css";

const pad = (n) => String(n).padStart(2, "0");

const useIsMobile = (query = "(max-width: 768px)") => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, [query]);
  return isMobile;
};

const ServicesHero = ({ t }) => {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const disabled = prefersReducedMotion || isMobile;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], disabled ? [0, 0] : [0, -60]);
  const veilOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section ref={ref} className="services-hero">
      <motion.div className="services-hero__atmos" aria-hidden style={{ opacity: veilOpacity }}>
        <div className="services-hero__beam services-hero__beam--a" />
        <div className="services-hero__beam services-hero__beam--b" />
        <div className="services-hero__noise" />
      </motion.div>

      <div className="container services-hero__inner"> 
        <motion.div
          className="services-hero__topline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="services-hero__dot" aria-hidden />
          <span>{t(servicesHero.eyebrowKey)}</span>
        </motion.div>

        <motion.h1 className="services-hero__title" style={{ y: titleY }}>
          <motion.span
            className="services-hero__title-line"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            {t(servicesHero.titleLine1Key)}
          </motion.span>
          <motion.span
            className="services-hero__title-line services-hero__title-line--italic"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            {t(servicesHero.titleLine2Key)}
          </motion.span>
          <motion.span
            className="services-hero__title-line"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          >
            {t(servicesHero.titleLine3Key)}
            <span className="services-hero__title-dot">.</span>
          </motion.span>
        </motion.h1>

        <div className="services-hero__split">
          <motion.p
            className="services-hero__lead"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
          >
            {t(servicesHero.leadKey)}
          </motion.p>

          <motion.ul
            className="services-hero__media"
            aria-hidden
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.13, delayChildren: 0.6 } },
            }}
          >
            {servicesHero.media.map((m, i) => (
              <motion.li
                key={i}
                className={`services-hero__media-tile services-hero__media-tile--${i}`}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.97 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                <img src={m.src} alt="" draggable={false} />
              </motion.li>
            ))}
          </motion.ul>
        </div>

      </div>
    </section>
  );
};

const ServicesMarquee = () => (
  <section className="services-marquee" aria-hidden>
    <div className="services-marquee__atmos" />
    <div className="services-marquee__stack">
      {servicesMarquee.map((row, i) => (
        <div key={i} className={`services-marquee__row services-marquee__row--${i}`}>
          <ParallaxText baseVelocity={row.baseVelocity} colorClass={row.colorClass}>
            {row.text}
          </ParallaxText>
        </div>
      ))}
    </div>
    <div className="services-marquee__fade services-marquee__fade--top" />
    <div className="services-marquee__fade services-marquee__fade--bottom" />
  </section>
);

const SegmentNav = ({ activeId, visible, onJump, t }) => {
  return (
    <nav
      className={`services-nav ${visible ? "is-visible" : ""}`}
      aria-label={t("servicesV2.nav.label")}
    >
      <span className="services-nav__title" aria-hidden>
        {t("servicesV2.nav.label")}
      </span>
      <ul className="services-nav__list">
        {servicesSegments.map((s) => {
          const active = activeId === s.id;
          return (
            <li key={s.id} className={`services-nav__item ${active ? "is-active" : ""}`}>
              <button
                type="button"
                onClick={() => onJump(s.id)}
                aria-current={active ? "true" : undefined}
                aria-label={t(`servicesV2.nav.${s.keyId}`)}
              >
                <span className="services-nav__label">{t(`servicesV2.nav.${s.keyId}`)}</span>
                <span className="services-nav__idx">{s.indexLabel}</span>
                <span className="services-nav__marker" aria-hidden />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const SegmentSection = ({ segment, index, t }) => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const disabled = isMobile || prefersReducedMotion;
  const flipped = index % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bigTypeX = useTransform(
    scrollYProgress,
    [0, 1],
    disabled ? ["0%", "0%"] : flipped ? ["8%", "-12%"] : ["-12%", "8%"]
  );
  return (
    <motion.section
      ref={ref}
      id={`segment-${segment.id}`}
      className={`services-segment ${flipped ? "is-flipped" : ""}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        className="services-segment__bigtype"
        style={{ x: bigTypeX }}
        aria-hidden
      >
        {segment.bigType}
      </motion.span>

      <div className="container services-segment__inner">
        <header className="services-segment__head">
          <div className="services-segment__meta">
            <span className="services-segment__index">{segment.indexLabel}</span>
          </div>
          <p className="services-segment__eyebrow">{t(segment.eyebrowKey)}</p>
          <h2 className="services-segment__title">{t(segment.titleKey)}</h2>
        </header>

        <div className="services-segment__body">
          <motion.figure
            className="services-segment__media"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="services-segment__media-frame">
              <img
                src={segment.cover}
                alt=""
                aria-hidden
                draggable={false}
              />
              <span className="services-segment__media-veil" aria-hidden />
            </div>
          </motion.figure>

          <div className="services-segment__column">
            <motion.ul
              className="services-cards"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
              }}
            >
              {segment.services.map((svc, i) => (
                <motion.li
                  key={svc.key}
                  className="services-card"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <span className="services-card__num">{pad(i + 1)}</span>
                  <span className="services-card__glyph" aria-hidden>{svc.icon}</span>
                  <h3 className="services-card__title">
                    {t(`servicesV2.segments.${segment.keyId}.services.${svc.key}.title`)}
                  </h3>
                  <p className="services-card__desc">
                    {t(`servicesV2.segments.${segment.keyId}.services.${svc.key}.desc`)}
                  </p>
                  <span className="services-card__glow" aria-hidden />
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const SuppliesSection = ({ t }) => {
  return (
    <section className="services-supplies">
      <div className="container services-supplies__inner">
        <header className="services-supplies__head">
          <span className="services-supplies__eyebrow">
            <span className="services-supplies__eyebrow-dot" />
            {t(servicesSupplies.eyebrowKey)}
          </span>
          <motion.h2
            className="services-supplies__title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t(servicesSupplies.titleKey)}
          </motion.h2>
          <motion.p
            className="services-supplies__desc"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {t(servicesSupplies.descriptionKey)}
          </motion.p>
        </header>

        <motion.ul
          className="services-supplies__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {servicesSupplies.groups.map((g, i) => (
            <motion.li
              key={g.id}
              className="services-supply"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <div className="services-supply__frame">
                <img src={g.image} alt="" draggable={false} aria-hidden />
                <span className="services-supply__veil" aria-hidden />
              </div>
              <div className="services-supply__meta">
                <span className="services-supply__idx">{pad(i + 1)}</span>
                <span className="services-supply__label">{t(g.labelKey)}</span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

const ServicesCta = ({ t }) => (
  <section className="services-cta">
    <div className="services-cta__atmos" aria-hidden>
      <div className="services-cta__beam" />
    </div>
    <div className="container services-cta__inner">
      <motion.div
        className="services-cta__grid"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="services-cta__eyebrow">
          <span className="services-cta__eyebrow-dot" />
          {t(servicesCta.eyebrowKey)}
        </span>
        <h2 className="services-cta__title">{t(servicesCta.titleKey)}</h2>
        <p className="services-cta__desc">{t(servicesCta.descriptionKey)}</p>
        <div className="services-cta__actions">
          <a href={contactsData.phone.href} className="services-cta__btn services-cta__btn--primary">
            <span>{t(servicesCta.primaryLabelKey)}</span>
            <span className="services-cta__btn-arrow" aria-hidden>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 14L14 4M14 4H6M14 4V12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="services-cta__btn-fill" aria-hidden />
          </a>
          <a href={contactsData.email?.href || "#"} className="services-cta__btn services-cta__btn--ghost">
            <span>{t(servicesCta.secondaryLabelKey)}</span>
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const ServicesPage = () => {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState(servicesSegments[0].id);
  const [navVisible, setNavVisible] = useState(false);
  const segmentsRef = useRef(null);
  const segments = useMemo(() => servicesSegments, []);

  const onJump = (id) => {
    const el = document.getElementById(`segment-${id}`);
    if (el) {
      // clear the fixed header stack
      const offset = el.getBoundingClientRect().top + window.scrollY - 200;
      window.scrollTo({ top: Math.max(offset, 0), behavior: "smooth" });
    }
  };

  // Sequential active-segment tracking + show the rail only while the
  // segments region occupies the viewport.
  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const vh = window.innerHeight;
      const line = vh * 0.4;

      let current = segments[0].id;
      for (const seg of segments) {
        const el = document.getElementById(`segment-${seg.id}`);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = seg.id;
      }
      setActiveId((prev) => (prev === current ? prev : current));

      const wrap = segmentsRef.current;
      if (wrap) {
        const r = wrap.getBoundingClientRect();
        // visible only while the segments region straddles the viewport
        // centre — hides before the following section scrolls in.
        const visible = r.top < vh * 0.5 && r.bottom > vh * 0.78;
        setNavVisible((prev) => (prev === visible ? prev : visible));
      }
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [segments]);

  return (
    <div className="services-page page-ambient-shell">
      <PageAmbientBackground />

      <ServicesHero t={t} />

      <ServicesMarquee />

      <SegmentNav activeId={activeId} visible={navVisible} onJump={onJump} t={t} />

      <div className="services-segments" ref={segmentsRef}>
        <div className="services-stream">
          {segments.map((segment, i) => (
            <SegmentSection
              key={segment.id}
              segment={segment}
              index={i}
              t={t}
            />
          ))}
        </div>
      </div>

      <SuppliesSection t={t} />

      <ServicesCta t={t} />
    </div>
  );
};

export default ServicesPage;
