import {
  categoryPro,
  fix1,
  fix2,
  fix3,
  duploBinder,
  plotterCutting2,
  plotterCutting3,
  inks,
  audley1,
  develop1,
  iecho1,
  supplies,
  toners,
  iechoPrinter,
  nocaiArt,
} from '../assets/images';

/** Hero / opener */
export const servicesHero = {
  eyebrowKey: 'servicesV2.hero.eyebrow',
  titleLine1Key: 'servicesV2.hero.line1',
  titleLine2Key: 'servicesV2.hero.line2',
  titleLine3Key: 'servicesV2.hero.line3',
  leadKey: 'servicesV2.hero.lead',
  metricsKey: 'servicesV2.hero.metrics',
  media: [
    { src: fix1, alt: 'Office printer service' },
    { src: fix2, alt: 'Production printer service' },
    { src: fix3, alt: 'Wide-format printer service' },
  ],
};

/** Floating ambient marquee (between hero & segments) */
export const servicesMarquee = [
  { text: 'Service · Calibration · Diagnostics · Repair · Supply', baseVelocity: -2.6, colorClass: 'parallax__text--blue' },
  { text: 'პრინტერი — საჭრელი — ფართოფორმატიანი — ფინიშინგი', baseVelocity: 2.2, colorClass: 'parallax__text--green' },
];

/** 4 cinematic segments */
export const servicesSegments = [
  {
    id: 'printer',
    keyId: 'printer',
    indexLabel: '01',
    eyebrowKey: 'servicesV2.segments.printer.eyebrow',
    titleKey: 'servicesV2.segments.printer.title',
    descriptionKey: 'servicesV2.segments.printer.description',
    bigType: 'Print',
    cover: develop1,
    accentMedia: categoryPro,
    services: [
      { key: 'install', icon: '◆' },
      { key: 'calibration', icon: '◉' },
      { key: 'repair', icon: '◇' },
      { key: 'preventive', icon: '✦' },
    ],
  },
  {
    id: 'cutting',
    keyId: 'cutting',
    indexLabel: '02',
    eyebrowKey: 'servicesV2.segments.cutting.eyebrow',
    titleKey: 'servicesV2.segments.cutting.title',
    descriptionKey: 'servicesV2.segments.cutting.description',
    bigType: 'Cutting',
    cover: iecho1,
    accentMedia: iechoPrinter,
    services: [
      { key: 'blades', icon: '◆' },
      { key: 'tuning', icon: '◉' },
      { key: 'software', icon: '◇' },
      { key: 'parts', icon: '✦' },
    ],
  },
  {
    id: 'wideformat',
    keyId: 'wideformat',
    indexLabel: '03',
    eyebrowKey: 'servicesV2.segments.wideformat.eyebrow',
    titleKey: 'servicesV2.segments.wideformat.title',
    descriptionKey: 'servicesV2.segments.wideformat.description',
    bigType: 'Wide',
    cover: audley1,
    accentMedia: nocaiArt,
    services: [
      { key: 'heads', icon: '◆' },
      { key: 'profile', icon: '◉' },
      { key: 'media', icon: '◇' },
      { key: 'firmware', icon: '✦' },
    ],
  },
];

/** Supplies ecosystem */
export const servicesSupplies = {
  eyebrowKey: 'servicesV2.supplies.eyebrow',
  titleKey: 'servicesV2.supplies.title',
  descriptionKey: 'servicesV2.supplies.description',
  groups: [
    { id: 'inks', image: inks, labelKey: 'servicesV2.supplies.items.inks' },
    { id: 'toners', image: toners, labelKey: 'servicesV2.supplies.items.toners' },
    { id: 'consumables', image: supplies, labelKey: 'servicesV2.supplies.items.consumables' },
    { id: 'media', image: plotterCutting2, labelKey: 'servicesV2.supplies.items.media' },
    { id: 'parts', image: duploBinder, labelKey: 'servicesV2.supplies.items.parts' },
    { id: 'rolls', image: plotterCutting3, labelKey: 'servicesV2.supplies.items.rolls' },
  ],
};

/** Cinematic CTA */
export const servicesCta = {
  eyebrowKey: 'servicesV2.cta.eyebrow',
  titleKey: 'servicesV2.cta.title',
  descriptionKey: 'servicesV2.cta.description',
  primaryLabelKey: 'servicesV2.cta.primary',
  secondaryLabelKey: 'servicesV2.cta.secondary',
};

