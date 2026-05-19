import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import AnimatedNumber from "../../components/widgets/AnimatedNumber/AnimatedNumber";
import PartnersCarousel from "../../components/PartnersCarousel/PartnersCarousel";
import TextType from "../../components/widgets/TextType/TextType";
import ParallaxText from "../../components/widgets/ParallaxText/ParallaxText";
import {
  aboutCover,
  aboutParallaxTitles,
  aboutCounters,
  aboutPartners,
  aboutInfoBlocks,
  aboutOption,
  aboutCta,
} from "../../data/aboutData";
import PageAmbientBackground from "../../components/PageAmbientBackground/PageAmbientBackground";
import "./AboutPage.css";

const pad = (n) => String(n).padStart(2, "0");

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <div className="about-page page-ambient-shell">
      <PageAmbientBackground />

      {/* ── Editorial Hero ──────────────────────────────── */}
      <section className="about-hero">
        <div className="container about-hero__inner">
          <div className="about-hero__grid">
            <motion.div
              className="about-hero__lead"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="about-hero__caption">
                Est. 2006 — Printing technology, precision engineering, and partnership built across two decades.
              </p>
              <h1 className="about-hero__title">
                <span className="about-hero__title-line">Georgian</span>
                <span className="about-hero__title-line about-hero__title-line--accent">Polygraph</span>
                <span className="about-hero__title-line">Services<span className="about-hero__title-dot">.</span></span>
              </h1>
            </motion.div>

            <motion.figure
              className="about-hero__media"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <div className="about-hero__media-frame">
                <img
                  src={aboutCover.image}
                  alt={aboutCover.imageAlt}
                  className="about-hero__image"
                />
                <div className="about-hero__media-veil" />
                <img
                  src={aboutCover.logo}
                  alt={aboutCover.logoAlt}
                  className="about-hero__mark"
                />
              </div>
              <figcaption className="about-hero__media-caption">
                <span>GPS · Tbilisi</span>
                <span>{new Date().getFullYear()}</span>
              </figcaption>
            </motion.figure>
          </div>

          {/* Stat strip — editorial typography, no card */}
          <motion.div
            className="about-stats"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {aboutCounters.map((item, i) => (
              <motion.div
                key={i}
                className="about-stat"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                <span className="about-stat__idx">{pad(i + 1)}</span>
                <span className="about-stat__value">
                  <AnimatedNumber value={item.value} duration={item.duration} delay={item.delay} />
                </span>
                <span className="about-stat__label">{t(item.labelKey)}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Cinematic Parallax Moment ───────────────────── */}
      <section className="about__title about-parallax">
        <div className="about-parallax__atmos" aria-hidden>
          <div className="about-parallax__beam about-parallax__beam--a" />
          <div className="about-parallax__beam about-parallax__beam--b" />
        </div>
        <div className="about-parallax__stack">
          {aboutParallaxTitles.map((item, i) => (
            <div
              key={i}
              className={`about-parallax__row about-parallax__row--${i}`}
              data-row={i}
            >
              <ParallaxText baseVelocity={item.baseVelocity} colorClass={item.colorClass}>
                {item.text}
              </ParallaxText>
            </div>
          ))}
        </div>
        <div className="about-parallax__fade about-parallax__fade--top" aria-hidden />
        <div className="about-parallax__fade about-parallax__fade--bottom" aria-hidden />
      </section>

      {/* ── Partners ────────────────────────────────────── */}
      <section className="about-partners">
        <div className="container about-partners__inner">
          <div className="about-partners__head">
            <TextType
              text={[t(aboutPartners.titleKey)]}
              typingSpeed={aboutPartners.typingSpeed}
              pauseDuration={aboutPartners.pauseDuration}
              showCursor={true}
              cursorCharacter={aboutPartners.cursorCharacter}
              className="about-partners__title"
            />
          </div>
          <div className="about-partners__carousel">
            <PartnersCarousel />
          </div>
        </div>
      </section>

      {/* ── Editorial Story Blocks ──────────────────────── */}
      <section className="about-story">
        <div className="container">
          <div className="about-story__head">
            <span className="about-story__kicker">{pad(3)} / {pad(4)} — Story</span>
            <h2 className="about-story__heading">A practice in precision.</h2>
          </div>

          <div className="about-story__blocks">
            {aboutInfoBlocks.map((block, i) => (
              <motion.article
                key={i}
                className={`about-story__block ${block.imageOnLeft ? "is-flipped" : ""}`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="about-story__media">
                  <span className="about-story__chapter">Ch. {pad(i + 1)}</span>
                  <div className="about-story__media-frame">
                    <img src={block.image} alt={block.imageAlt} />
                  </div>
                </div>
                <div className="about-story__body">
                  <h3 className="about-story__title">
                    {block.titleKey ? t(block.titleKey) : block.title}
                  </h3>
                  <div className="about-story__divider" />
                  <div className="about-story__copy">
                    {block.textKeys.map((key) => (
                      <p key={key}>{t(key)}</p>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pillars / Options ───────────────────────────── */}
      <section className="about-pillars">
        <div className="container">
          <div className="about-pillars__head">
            <span className="about-pillars__kicker">{pad(4)} / {pad(4)} — Pillars</span>
            <h2 className="about-pillars__title">{t(aboutOption.titleKey)}</h2>
            <p className="about-pillars__lede">{t(aboutOption.descriptionKey)}</p>
          </div>

          <ol className="about-pillars__grid">
            {aboutOption.features.map((feature, i) => (
              <motion.li
                key={i}
                className="about-pillar"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="about-pillar__head">
                  <span className="about-pillar__num">{pad(i + 1)}</span>
                  <span className="about-pillar__rule" />
                </div>
                <div className="about-pillar__media">
                  <img src={feature.image} alt={feature.imageAlt} />
                </div>
                <h3 className="about-pillar__title">{t(feature.titleKey)}</h3>
                <p className="about-pillar__desc">{t(feature.descriptionKey)}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Closing CTA ─────────────────────────────────── */}
      <section className="about-cta">
        <div className="container">
          <motion.div
            className="about-cta__inner"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="about-cta__mark">— End —</span>
            <h2 className="about-cta__title">{t(aboutCta.titleKey)}</h2>
            <p className="about-cta__desc">{t(aboutCta.descriptionKey)}</p>
            <div className="about-cta__actions">
              {aboutCta.buttons.map((btn, i) => (
                <motion.button
                  key={i}
                  type="button"
                  className={`about-cta__btn ${i === 0 ? "is-primary" : "is-ghost"}`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                >
                  <span>{t(btn.labelKey)}</span>
                  <span className="about-cta__btn-arrow" aria-hidden>→</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
