import {
  aboutImage,
  mainLogo,
  konikaAbout,
  konikaAbout2,
  global,
  service3,
  demo,
} from '../assets/images';

/** Cover / hero block */
export const aboutCover = {
  image: aboutImage,
  imageAlt: 'cover',
  logo: mainLogo,
  logoAlt: 'GPS Logo',
};

/** Parallax title lines (text, velocity, colorClass) */
export const aboutParallaxTitles = [
  { text: 'Georgian Polygraph Services', baseVelocity: -3, colorClass: 'parallax__text--blue' },
  { text: 'თქვენი სანდო პარტნიორი პოლიგრაფიის სამყაროში', baseVelocity: 3, colorClass: 'parallax__text--green' },
];

/** Stats counters (value, duration, delay, label i18n key) */
export const aboutCounters = [
  { value: '19', duration: 2, delay: 0.2, labelKey: 'about.counter.years' },
  { value: '300+', duration: 2, delay: 0.4, labelKey: 'about.counter.clients' },
  { value: '1000+', duration: 2, delay: 0.6, labelKey: 'about.counter.projects' },
  { value: '100%', duration: 2, delay: 0.8, labelKey: 'about.counter.satisfaction' },
];

/** Partners section */
export const aboutPartners = {
  titleKey: 'about.partners.title',
  typingSpeed: 75,
  pauseDuration: 1500,
  cursorCharacter: '|',
};

/** Info blocks (title, text i18n keys, image, imageOnLeft) */
export const aboutInfoBlocks = [
  {
    title: 'Georgian Polygraph Services',
    textKeys: ['about.description.text1', 'about.description.text2'],
    image: konikaAbout,
    imageAlt: 'GPS About',
    imageOnLeft: false,
  },
  {
    titleKey: 'about.description.title',
    textKeys: ['about.description.text3'],
    image: konikaAbout2,
    imageAlt: 'Konica Minolta',
    imageOnLeft: true,
  },
];

/** Option / features block */
export const aboutOption = {
  titleKey: 'about.option.title',
  descriptionKey: 'about.option.description',
  features: [
    {
      image: global,
      imageAlt: 'Global Brand Trust',
      titleKey: 'about.option.feature1.title',
      descriptionKey: 'about.option.feature1.description',
    },
    {
      image: service3,
      imageAlt: 'Expert Service & Support',
      titleKey: 'about.option.feature2.title',
      descriptionKey: 'about.option.feature2.description',
    },
    {
      image: demo,
      imageAlt: 'Solutions for Every Business',
      titleKey: 'about.option.feature3.title',
      descriptionKey: 'about.option.feature3.description',
    },
  ],
};

/** CTA section */
export const aboutCta = {
  titleKey: 'about.cta.title',
  descriptionKey: 'about.cta.description',
  buttons: [
    { labelKey: 'about.cta.contact', href: null, className: 'cta__button cta__button--primary' },
    { labelKey: 'about.cta.learnMore', href: null, className: 'cta__button cta__button--secondary' },
  ],
};
