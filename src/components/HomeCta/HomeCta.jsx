import React, { useRef } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useLanguage } from "../../hooks/useLanguage";
import contactsData from "../../data/contactsData";
import { cutLine1, cutLine2, cutLine3, cutLine4 } from "../../assets/images";
import "./HomeCta.css";

const EASE = [0.16, 1, 0.3, 1];

const products = [
  { key: "office", image: cutLine1, path: "office-equipment/develop", speed: 60 },
  { key: "pro", image: cutLine2, path: "professional-equipment/develop", speed: 120 },
  { key: "iecho", image: cutLine3, path: "cutting-systems/iecho", speed: 40 },
  { key: "nocai", image: cutLine4, path: "plotter-catalog/nocai", speed: 100 },
];

const pad = (n) => String(n).padStart(2, "0");

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <path
      d="M4 14L14 4M14 4H6M14 4V12"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Headline line that slides up out of a clipping mask.
 * The observer sits on the mask itself — the inner span starts clipped,
 * so it would never register as in view.
 */
const RevealLine = ({ children, delay = 0, className = "" }) => (
  <motion.span
    className={`home-cta__line ${className}`}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.6 }}
  >
    <motion.span
      className="home-cta__line-inner"
      variants={{
        hidden: { y: "110%" },
        visible: { y: "0%", transition: { duration: 1.1, ease: EASE, delay } },
      }}
    >
      {children}
    </motion.span>
  </motion.span>
);

/** Round button that drifts toward the cursor, wrapped in a rotating text ring. */
const MagneticButton = ({ href, label, ariaLabel, ring, disabled }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });

  const handleMove = (e) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      className="home-cta__magnet"
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <svg className="home-cta__ring" viewBox="0 0 200 200" aria-hidden>
        <defs>
          <path id="home-cta-ring-path" d="M100,100 m-84,0 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0" />
        </defs>
        <text>
          <textPath href="#home-cta-ring-path" textLength="520">
            {ring}
          </textPath>
        </text>
      </svg>

      <motion.div style={{ x: sx, y: sy }} className="home-cta__magnet-body">
        <a href={href} className="home-cta__button" aria-label={ariaLabel}>
          <span className="home-cta__button-fill" aria-hidden />
          <span className="home-cta__button-arrow">
            <ArrowIcon />
          </span>
          <span className="home-cta__button-label">{label}</span>
        </a>
      </motion.div>
    </div>
  );
};

const ProductCard = ({ product, index, progress, disabled, language, t }) => {
  const y = useTransform(progress, [0, 1], disabled ? [0, 0] : [product.speed, -product.speed * 0.4]);

  return (
    <motion.li
      className="home-cta__product"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: EASE, delay: index * 0.08 }}
    >
      <Link to={`/${language}/${product.path}`} className="home-cta__product-link">
        <span className="home-cta__product-meta">
          <span className="home-cta__product-idx">({pad(index + 1)})</span>
          <span className="home-cta__product-arrow">
            <ArrowIcon />
          </span>
        </span>

        <span className="home-cta__product-stage">
          <motion.img
            src={product.image}
            alt=""
            aria-hidden
            draggable={false}
            loading="lazy"
            className="home-cta__product-img"
            style={{ y }}
          />
        </span>

        <span className="home-cta__product-name">
          {t(`homeCta.products.${product.key}`)}
        </span>
        <span className="home-cta__product-explore">{t("homeCta.explore")}</span>
      </Link>
    </motion.li>
  );
};

const HomeCta = () => {
  const { language, t } = useLanguage();
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const marqueeX = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["4%", "-12%"]);

  const marqueeItems = t("homeCta.marquee", { returnObjects: true });
  const marqueeList = Array.isArray(marqueeItems) ? marqueeItems : [];

  return (
    <section ref={sectionRef} className="home-cta" aria-labelledby="home-cta-title">
      <div className="container">
        <div className="home-cta__head">
          <h2 id="home-cta-title" className="home-cta__title">
            <RevealLine>{t("homeCta.titleLine1")}</RevealLine>
            <RevealLine className="home-cta__line--accent" delay={0.08}>
              {t("homeCta.titleAccent")}
            </RevealLine>
            <RevealLine delay={0.16}>
              {t("homeCta.titleLine2")}
            </RevealLine>
          </h2>

          <motion.div
            className="home-cta__aside"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: EASE, delay: 0.25 }}
          >
            <MagneticButton
              href={contactsData.phone.href}
              label={t("homeCta.cta")}
              ariaLabel={`${t("homeCta.cta")}: ${contactsData.phone.label}`}
              ring={t("homeCta.ring").repeat(2)}
              disabled={prefersReducedMotion}
            />
          </motion.div>
        </div>
      </div>

      <div className="home-cta__marquee" aria-hidden>
        <motion.div className="home-cta__marquee-shift" style={{ x: marqueeX }}>
          <div className="home-cta__marquee-track">
            {[0, 1].map((copy) => (
              <span key={copy} className="home-cta__marquee-group">
                {marqueeList.map((item, i) => (
                  <span key={i} className="home-cta__marquee-item">
                    {item}
                    <span className="home-cta__marquee-star">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="container">
        <ul className="home-cta__products">
          {products.map((product, i) => (
            <ProductCard
              key={product.key}
              product={product}
              index={i}
              progress={scrollYProgress}
              disabled={prefersReducedMotion}
              language={language}
              t={t}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HomeCta;
