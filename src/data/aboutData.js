import {
  aboutImage,
  mainLogo,
  konikaAbout,
  konikaAbout2,
  servicesAbout,
  global,
  service3,
  demo,
  konika,
  duplo,
  knb,
  unifol,
  vivid,
  audley,
  colorking,
  fedrigoni,
  iecho,
  mondi,
  nocai,
  reinauer,
  Rightint,
  teneth,
  tmt,
  goldensign,
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

export const partners = [
  { logo: konika, name: 'Konica Minolta', url: 'https://www.konicaminolta.eu' },
  { logo: duplo, name: 'Duplo', url: 'https://www.duplo.com' },
  { logo: knb, name: 'Koenig & Bauer', url: 'https://www.koenig-bauer.com' },
  { logo: unifol, name: 'Unifol', url: 'https://www.unifol.com.tr' },
  { logo: audley, name: 'Audley', url: 'https://www.audley-printer.com' },
  { logo: colorking, name: 'ColorKing', url: '#' },
  { logo: fedrigoni, name: 'Fedrigoni', url: 'https://fedrigoni.com' },
  { logo: iecho, name: 'Iecho', url: 'https://www.iechocutter.com' },
  { logo: mondi, name: 'Mondi', url: 'https://www.mondigroup.com' },
  { logo: nocai, name: 'Nocai', url: 'https://www.gznuocai.com' },
  { logo: reinauer, name: 'Reinauer', url: 'https://www.reinauer.eu' },
  { logo: Rightint, name: 'Rightint', url: 'https://www.rightint.com' },
  { logo: teneth, name: 'Teneth', url: 'https://www.teneth.com' },
  { logo: tmt, name: 'TMT', url: 'https://www.tmtleds.com' },
  { logo: vivid, name: 'Vivid', url: 'https://www.vivid-online.com' },
  { logo: goldensign, name: 'Goldensign', url: 'https://www.goldensign.net' },
];

/** Info blocks (title, text i18n keys, image, imageOnLeft) */
export const aboutInfoBlocks = [
  {
    titleKey: 'about.description.title0',
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
  {
    titleKey: 'about.description.title2',
    textKeys: ['about.description.text4', 'about.description.text5'],
    image: servicesAbout,
    imageAlt: 'GPS Services',
    imageOnLeft: false,
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
};
