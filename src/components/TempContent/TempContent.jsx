import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from 'motion/react';
import { whatsApp } from '../../assets/images';
import { useLanguage } from '../../hooks/useLanguage';
import './TempContent.css';

const EASE = [0.16, 1, 0.3, 1];

const TempContent = () => {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const reveal = (x, delay) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, x },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 1, ease: EASE, delay },
        };

  return (
    <section className="temp-content-section">
      <div className="container">
        <div className="temp-content__wrapper">
          <motion.div className="temp-content__text" {...reveal(-60, 0)}>
            <h2 className="temp-content__title">{t('tempContent.title')}</h2>
            <p className="temp-content__paragraph">{t('tempContent.paragraph1')}</p>
            <p className="temp-content__paragraph">{t('tempContent.paragraph2')}</p>
            <a
              className="temp-content__button"
              href="https://www.whatsapp.com/channel/0029Vb6P79E1yT2I2KS8GG3Y"
              target="_blank"
              rel="noreferrer noopener"
            >
              {t('tempContent.cta')}
            </a>
          </motion.div>
          <motion.div className="temp-content__media" {...reveal(60, 0.15)}>
            <img
              src={whatsApp}
              alt={t('tempContent.imageAlt')}
              className="temp-content__image"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TempContent;

