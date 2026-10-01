import { wireComb, laminationFilm, cuttingKnives, cuttingSticks } from '../assets/images';

// Standalone supplies that live directly under /catalog/supplies/:supplyId (no brand listing page)
export const suppliesProducts = [
  {
    id: 'wire-comb',
    brand: 'RecoSystems',
    image: wireComb,
    titleKey: 'catalog.wire_comb',
    descKey: 'catalog.wire_comb_desc',
    sizesTitleKey: 'catalog.available_sizes',
    // [inch, mm] pairs, or { main, sub } variants
    sizes: [
      ['1/4', 6.4],
      ['5/16', 7.9],
      ['3/8', 9.5],
      ['7/16', 11.1],
      ['1/2', 12.7],
      ['9/16', 14.3],
      ['5/8', 16],
      ['3/16', 4.8],
    ],
  },
  {
    id: 'lamination-film',
    brand: 'Vivid',
    image: laminationFilm,
    titleKey: 'catalog.lamination_film',
    descKey: 'catalog.lamination_film_desc',
    sizesTitleKey: 'catalog.available_sizes',
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
    id: 'guillotine-knife',
    brand: 'IDEAL',
    image: cuttingKnives,
    titleKey: 'catalog.guillotine_knife',
    compatible: {
      brand: 'IDEAL',
      models: ['6550', '4700', '4705', '4810', '4815', '4850', '4860', '4205', '4305', '4215', '3905'],
    },
  },
  {
    id: 'guillotine-sticks',
    brand: 'IDEAL',
    image: cuttingSticks,
    titleKey: 'catalog.guillotine_sticks',
    compatible: {
      brand: 'IDEAL',
      models: ['7228', '7206', '7828', '7895', '4700', '4810', '4815', '4850', '4855', '4860', '4205', '4305', '4215', '4315', '4250', '4350', '3905', '6550', '5221', '5222', '5255'],
    },
  },
];
