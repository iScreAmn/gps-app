import { laminationFilm, rigel, rakel, stepler } from '../assets/images';

// Standalone supplies that live directly under /catalog/supplies/:supplyId (no brand listing page)
export const suppliesProducts = [
  {
    id: 'lamination-film',
    brand: 'Vivid',
    image: laminationFilm,
    // Catalog card crop: the product sits in the lower half of these portrait shots
    imagePosition: 'center 75%',
    titleKey: 'catalog.lamination_film',
    descKey: 'catalog.lamination_film_desc',
    sizesTitleKey: 'catalog.available_sizes',
    sizesWide: true,
    // { main, sub?, subKey?, colorKey?, swatch? } variants, or [inch, mm] pairs
    sizes: [
      { main: '315 x 200mm', sub: '24Mic · Gloss' },
      { main: '315 x 200mm', sub: '24Mic · Matt' },
      { main: '440 x 200mm', sub: '24Mic · Gloss' },
      { main: '440 x 200mm', sub: '24Mic · Matt' },
      { main: '315 x 500mm', sub: '24Mic · 77mm · Digital Gloss' },
      { main: '315 x 500mm', sub: '24Mic · 77mm · Digital Matt' },
      { main: '440 x 500mm', sub: '24Mic · 77mm · Digital Gloss' },
      { main: '440 x 500mm', sub: '24Mic · 77mm · Digital Matt' },
      { main: '315 x 500mm', sub: '30Mic · 77mm · Soft Touch' },
      { main: '445 x 500mm', sub: '30Mic · 77mm · Soft Touch' },
    ],
  },
  {
    id: 'calendar-rigel',
    image: rigel,
    imagePosition: 'center 80%',
    titleKey: 'catalog.calendar_rigel',
    descKey: 'catalog.calendar_rigel_desc',
    sizesTitleKey: 'catalog.sizes_title',
    sizes: [
      { main: '150', subKey: 'catalog.mm' },
      { main: '200', subKey: 'catalog.mm' },
    ],
  },
  {
    id: 'squeegee',
    image: rakel,
    imagePosition: 'center 85%',
    titleKey: 'catalog.squeegee',
    descKey: 'catalog.squeegee_desc',
  },
  {
    id: 'electric-stapler-staples',
    brand: 'RAPID',
    image: stepler,
    titleKey: 'catalog.stapler_staples',
    descKey: 'catalog.stapler_staples_desc',
    link: { path: 'cutting-systems/rapid', labelKey: 'catalog.stapler_staples_link' },
    sizesTitleKey: 'catalog.sizes_title',
    sizes: [
      { main: '66/6' },
      { main: '66/8+' },
    ],
  },
];
