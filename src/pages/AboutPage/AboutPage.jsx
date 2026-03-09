import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import AnimatedNumber from "../../components/widgets/AnimatedNumber/AnimatedNumber";
import { counterVariants, counterContainerVariants } from '../../utils/animation';
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
import "./AboutPage.css";


const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <div className="about-page">
      <div className="container">
        <div className="about__content">
          <div className="about__cover-container">
            <div className="about__cover-gradient">
              <img src={aboutCover.logo} alt={aboutCover.logoAlt} className="about__cover-logo" />
            </div>
            <img src={aboutCover.image} alt={aboutCover.imageAlt} className="about__cover" />
          </div>
          <div className="about__title">
            {aboutParallaxTitles.map((item, i) => (
              <ParallaxText key={i} baseVelocity={item.baseVelocity} colorClass={item.colorClass}>
                {item.text}
              </ParallaxText>
            ))}
          </div>
          <motion.div
            className="about__counter"
            variants={counterContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {aboutCounters.map((item, i) => (
              <motion.div key={i} className="counter__item" variants={counterVariants}>
                <div className="counter__number">
                  <AnimatedNumber value={item.value} duration={item.duration} delay={item.delay} />
                </div>
                <div className="counter__label">{t(item.labelKey)}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <div className="about__partners">
          <div className="container">
            <TextType
              text={[t(aboutPartners.titleKey)]}
              typingSpeed={aboutPartners.typingSpeed}
              pauseDuration={aboutPartners.pauseDuration}
              showCursor={true}
              cursorCharacter={aboutPartners.cursorCharacter}
              className="about__partners-text"
            />
            <PartnersCarousel />
          </div>
        </div>
        
        <div className="about__info-wrapper">
          {aboutInfoBlocks.map((block, i) => (
            <div key={i} className="about__info">
              {!block.imageOnLeft && (
                <div className="about__description">
                  <h2>{block.titleKey ? t(block.titleKey) : block.title}</h2>
                  {block.textKeys.map((key) => (
                    <p key={key}>{t(key)}</p>
                  ))}
                </div>
              )}
              <div className="about__img-container">
                <img className="about__img" src={block.image} alt={block.imageAlt} />
              </div>
              {block.imageOnLeft && (
                <div className="about__description">
                  <h2>{block.titleKey ? t(block.titleKey) : block.title}</h2>
                  {block.textKeys.map((key) => (
                    <p key={key}>{t(key)}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="about__option">
          <h2 className="option__title">{t(aboutOption.titleKey)}</h2>
          <p className="option__description">{t(aboutOption.descriptionKey)}</p>
          <div className="option__wrapper">
            {aboutOption.features.map((feature, i) => (
              <div key={i} className="option__item">
                <img className="option__img" src={feature.image} alt={feature.imageAlt} />
                <h2 className="option__item-title">{t(feature.titleKey)}</h2>
                <p className="option__item-description">{t(feature.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="about__cta-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="cta__container">
            <motion.div 
              className="cta__content"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="cta__text">
                <h2 className="cta__title">{t(aboutCta.titleKey)}</h2>
                <p className="cta__description">{t(aboutCta.descriptionKey)}</p>
              </div>
              <motion.div
                className="cta__buttons"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {aboutCta.buttons.map((btn, i) => (
                  <motion.button
                    key={i}
                    type="button"
                    className={btn.className}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {t(btn.labelKey)}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="cta__visual"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="cta__gradient-circle"></div>
              <div className="cta__animated-line"></div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AboutPage;
