import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { aboutImage } from "../../assets/images";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import AnimatedNumber from "../../components/AnimatedNumber/AnimatedNumber";
import { 
  counterVariants,
  counterContainerVariants
} from '../../utils/animation';
import { konikaAbout } from "../../assets/images";
import PartnersCarousel from "../../components/PartnersCarousel/PartnersCarousel";
import "./AboutPage.css";

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <h1>{t("about.title")}</h1>
          <p className="about-subtitle">{t("about.subtitle")}</p>
        </div>

        <div className="about__content">
          <img src={aboutImage} alt="" className="about__cover" />
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
                  value="500+" 
                  duration={2} 
                  delay={0.2} 
                />
              </div>
              <div className="counter__label">{t("about.clients")}</div>
            </motion.div>
            
            <motion.div 
              className="counter__item"
              variants={counterVariants}
            >
              <div className="counter__number">
                <AnimatedNumber 
                  value="15+" 
                  duration={2} 
                  delay={0.4} 
                />
              </div>
              <div className="counter__label">{t("about.years")}</div>
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
              <div className="counter__label">{t("about.projects")}</div>
            </motion.div>
            
            <motion.div 
              className="counter__item"
              variants={counterVariants}
            >
              <div className="counter__number">
                <AnimatedNumber 
                  value="99%" 
                  duration={2} 
                  delay={0.8} 
                />
              </div>
              <div className="counter__label">{t("about.satisfaction")}</div>
            </motion.div>
          </motion.div>
          <div className="about__info">
            <div className="about__description">
              <h2>Georgian Polygraph Services</h2>
              <p>შპს "ჯორჯიან პოლიგრაფ სერვისის" მუდმივად მზარდი ტიპის კომპანიაა საქართველოს პოლიგრაფიული ტექნიკისა და პოლიგრაფიული მასალების დისტრიბუციის ბაზარზე. 13 წლიანი გამოცდილება და პროფესიონალთა გუნდი საშუალებას გვაძლევს მოგაწოდოთ უახლესი ბეჭდვის ტექნოლოგიები და მაღალი დონის მომსახურება. ჩვენთან თანამშრომლობით, თქვენ მიიღებთ არა მხოლოდ აღჭურვილობას, არამედ მომსახურების მთელ სპექტრს.</p>
              
              <p>თუმცა „ჯორჯიან პოლიგრაფ სერვისის“ თავის ყველაზე მნიშვნელოვან მიღწევად მიიჩნევს 2016-2019 წლებში მოპოვებულ ექსკლუზიურ უფლებას ყოფილიყო Konica Minolta-ს ერთადერთი ოფიცილური წარმომადგენელი საქართველოში. თუმცა 2019 წლიდან ის გახდა Konica Minolta-ს ბრენდის Develop-ის ოფიციალური დილერი და ოქროს პარტნიორი.</p>           
            </div>
            <img className="about__img" src={konikaAbout} alt="" />
          </div>
          <div className="about__partners">
            <h3 className="about__partners-text">შპს "ჯორჯიან პოლიგრაფ სერვისის" წარმატებით თანამშრომლობს მსოფლიოში ცნობილ კომპანიებთან</h3>
            <PartnersCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
