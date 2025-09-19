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
import { konikaAbout, konikaAbout2, aboutOrder } from "../../assets/images";
import PartnersCarousel from "../../components/PartnersCarousel/PartnersCarousel";
import TextType from "../../components/widgets/TextType/TextType";
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
        
        <div className="container">

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
          
          <div className="about__order">
            <img className="order__img" src={aboutOrder} alt="" />
            <div className="order__content">
              <h2 className="order__content-title">{t("about.order.title")}</h2>
              <p className="order__content-subtitle">{t("about.order.description")}</p>
              <button className="order__content-btn">{t("about.order.cta")}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
