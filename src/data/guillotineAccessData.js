import { cuttingKnives, cuttingSticks } from '../assets/images';

// Listed at /catalog/supplies/guillotineaccess, each at /catalog/supplies/guillotineaccess/:supplyId
export const guillotineAccessProducts = [
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
