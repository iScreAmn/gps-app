import { polipropilenSticker } from '../assets/images';

// Listed at /catalog/materials, each at /catalog/materials/:supplyId
export const materialsProducts = [
  {
    id: 'polypropylene-stickers',
    image: polipropilenSticker,
    titleKey: 'catalog.pp_stickers',
    descKey: 'catalog.pp_stickers_desc',
    sizesTitleKey: 'product.specifications',
    sizesWide: true,
    sizes: [
      { main: '75 mic · Matte White PP', sub: 'LaserJet · Waterbased · 135g CCK liner · 487/330' },
      { main: '60 mic · Glossy White PP', sub: 'LaserJet · Waterbased · 135g CCK liner · 487/330' },
      { main: '50 mic · Holographic PP', sub: 'LaserJet · Solvent · 135g White liner · 483/330' },
      { main: '50 mic · Clear PP', sub: 'LaserJet · Waterbased · 135g White liner · 487/330' },
    ],
  },
];
