import { ink1, ink2, ink3, ink4, ink5 } from '../assets/images';

export const inksProducts = [
  { id: 'audley-dtf', image: ink2, titleKey: 'inks.audley_dtf', descKey: 'inks.audley_dtf_desc' },
  { id: 'audley-eco', image: ink3, titleKey: 'inks.audley_eco', descKey: 'inks.audley_eco_desc' },
  { id: 'nocai-uv', image: ink1, titleKey: 'inks.nocai_uv', descKey: 'inks.nocai_uv_desc' },
  {
    id: 'roll-uv',
    image: ink4,
    titleKey: 'inks.roll_uv',
    descKey: 'inks.roll_uv_desc',
    sizesTitleKey: 'catalog.colors_title',
    sizes: [
      { main: 'C', swatch: '#00AEEF' },
      { main: 'M', swatch: '#EC008C' },
      { main: 'Y', swatch: '#FFD400' },
      { main: 'K', swatch: '#111827' },
      { main: 'W', swatch: '#FFFFFF' },
      { main: 'Varnish', swatch: 'linear-gradient(135deg, #F9FAFB, #D1D5DB 50%, #F9FAFB)' },
    ],
  },
  { id: 'eco-solvent-cleaner', image: ink5, titleKey: 'inks.eco_cleaner', descKey: 'inks.eco_cleaner_desc' },
];
