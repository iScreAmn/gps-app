import { wireComb, wireComb2 } from '../assets/images';

// Listed at /catalog/supplies/wirecombs, each at /catalog/supplies/wirecombs/:supplyId
export const wirecombsProducts = [
  {
    id: 'recosystems',
    brand: 'RecoSystems',
    image: wireComb,
    titleKey: 'catalog.wire_comb',
    descKey: 'catalog.wire_comb_desc',
    sizesTitleKey: 'catalog.available_sizes',
    // [inch, mm]
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
    id: 'renz',
    brand: 'RENZ',
    image: wireComb2,
    titleKey: 'catalog.plastic_comb',
    descKey: 'catalog.plastic_comb_desc',
    sizesTitleKey: 'catalog.available_sizes',
    sizes: [
      { main: '19', subKey: 'catalog.mm', colorKey: 'catalog.color_black', swatch: '#111827' },
      { main: '25', subKey: 'catalog.mm', colorKey: 'catalog.color_black', swatch: '#111827' },
      { main: '19', subKey: 'catalog.mm', colorKey: 'catalog.color_white', swatch: '#FFFFFF' },
      { main: '25', subKey: 'catalog.mm', colorKey: 'catalog.color_blue', swatch: '#1D4ED8' },
      { main: '8', subKey: 'catalog.mm', colorKey: 'catalog.color_black', swatch: '#111827' },
    ],
  },
];
