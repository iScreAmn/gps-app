import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { aboutImage } from "../../assets/images";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import AnimatedNumber from "../../components/widgets/AnimatedNumber/AnimatedNumber";
import { 
  counterVariants,
  counterContainerVariants
} from '../../utils/animation';
import { konikaAbout, konikaAbout2 } from "../../assets/images";
import PartnersCarousel from "../../components/PartnersCarousel/PartnersCarousel";
import TextType from "../../components/widgets/TextType/TextType";
import { global, service3, demo } from "../../assets/images";
import "./AboutPage.css";


const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <TextType 
            text={[
              "Georgian Polygraph Services..."
            ]}
            typingSpeed={95}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            className="about-subtitle"
          />
        </div>

        <div className="about__content">
          <div className="about__cover-container">
            <img src={aboutImage} alt="" className="about__cover" />
          </div>
          <motion.div 
            className="about__counter"
            variants={counterContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="counter__item"
              variants={counterVariants}
            >
              <div className="counter__number">
                <AnimatedNumber 
                  value="18+" 
                  duration={2} 
                  delay={0.2} 
                />
              </div>
              <div className="counter__label">{t("about.counter.years")}</div>
            </motion.div>
            
            <motion.div 
              className="counter__item"
              variants={counterVariants}
            >
              <div className="counter__number">
                <AnimatedNumber 
                  value="500+" 
                  duration={2} 
                  delay={0.4} 
                />
              </div>
              <div className="counter__label">{t("about.counter.clients")}</div>
            </motion.div>
            
            <motion.div 
              className="counter__item"
              variants={counterVariants}
            >
              <div className="counter__number">
                <AnimatedNumber 
                  value="1000+" 
                  duration={2} 
                  delay={0.6} 
                />
              </div>
              <div className="counter__label">{t("about.counter.projects")}</div>
            </motion.div>
            
            <motion.div 
              className="counter__item"
              variants={counterVariants}
            >
              <div className="counter__number">
                <AnimatedNumber 
                  value="100%" 
                  duration={2} 
                  delay={0.8} 
                />
              </div>
              <div className="counter__label">{t("about.counter.satisfaction")}</div>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="about__partners">
          <div className="container">
            <TextType 
              text={[
                t("about.partners.title")
              ]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className="about__partners-text"
            />
            <PartnersCarousel />
          </div>
        </div>
        
        <div className="about__info-wrapper">
            <div className="about__info">
              <div className="about__description">
                <h2>Georgian Polygraph Services</h2>
                <p>{t("about.description.text1")}</p>
                <p>{t("about.description.text2")}</p>           
              </div>
              <div className="about__img-container">
                <img className="about__img" src={konikaAbout} alt="" />
              </div>
            </div>
            <div className="about__info">
              <div className="about__img-container">
                <img className="about__img" src={konikaAbout2} alt="" />
              </div>
              <div className="about__description">
                <h2>Konika Minolta Official Dealer</h2>
                <p>{t("about.description.text3")}</p>
              </div>
            </div>
        </div>

        <div className="about__option">
          <h2 className="option__title">რატომ ვართ საუკეთესო არჩევანი?</h2>
          <p className="option__description">დღესდღეობით Georgian Polygraph Services მომსახურებას უწევს 300-ზე მეტ ორგანიზაციას და ფიზიკურ პირს. მომხმარებელთა სიაში შედის არა მხოლოდ მცირე და საშუალო სარეკლამო კომპანიები, არამედ სტამბები, ოფისები, უნივერსიტეტები და სამთავრობო სტრუქტურები.</p>
          <div className="option__wrapper">
            <div className="option__item">
              <img className="option__img" src={global} alt="Global Brand Trust" />
              <h2 className="option__item-title">Global Brand Trust</h2>
              <p className="option__item-description">Over 13 years of experience and partnerships with world-leading brands ensure reliability and long-term success.</p>
            </div>
            <div className="option__item">
              <img className="option__img" src={service3} alt="Expert Service & Support" />
              <h2 className="option__item-title">Expert Service & Support</h2>
              <p className="option__item-description">Certified specialists provide full-cycle service — from consultation to maintenance — keeping your business running smoothly.</p>
            </div>
            <div className="option__item">
              <img className="option__img" src={demo} alt="Solutions for Every Business" />
              <h2 className="option__item-title">Solutions for Every Business</h2>
              <p className="option__item-description">From small agencies to government institutions, we deliver tailored solutions to fit every scale and need.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
