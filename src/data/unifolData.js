// Unifol plotter films — codes, names and swatch colors taken from the printed Unifol color cards.

const glossy = [
  { code: '3700', name: 'White', hex: '#E8E4E5' },
  { code: '3702', name: 'Clear', hex: '#EADFD9' },
  { code: '3702', name: 'Beige', hex: '#DCC4AA' },
  { code: '3792', name: 'Silver', hex: '#A79F9D' },
  { code: '3714', name: 'Grey', hex: '#757479' },
  { code: '3710', name: 'Black', hex: '#171516' },
  { code: '3722', name: 'Dark Yellow', hex: '#E89535' },
  { code: '3734', name: 'Orange', hex: '#DC5126' },
  { code: '3730', name: 'Light Red', hex: '#BA251E' },
  { code: '3732', name: 'Red', hex: '#A1201B' },
  { code: '3738', name: 'Light Pink', hex: '#C8468C' },
  { code: '3740', name: 'Pink', hex: '#CA2B63' },
  { code: '3744', name: 'Light Blue', hex: '#4293D4' },
  { code: '3786', name: 'Light Turquoise', hex: '#3B85A8' },
  { code: '3782', name: 'Turquoise', hex: '#15748A' },
  { code: '3746', name: 'Reflex Blue', hex: '#0A2388' },
  { code: '3784', name: 'Midnight Blue', hex: '#051755' },
  { code: '3756', name: 'Dark Green', hex: '#072405' },
  { code: '3726', name: 'Light Yellow', hex: '#F9E44B' },
  { code: '3724', name: 'Yellow', hex: '#F4C142' },
  { code: '3782', name: 'Gold', hex: '#CC9F44' },
  { code: '3720', name: 'Light Orange', hex: '#E48C32' },
  { code: '3742', name: 'Violet', hex: '#38064B' },
  { code: '3752', name: 'Lime Green', hex: '#78B937' },
  { code: '3754', name: 'Grass Green', hex: '#11611C' },
  { code: '3750', name: 'Green', hex: '#2A623B' },
  { code: '3748', name: 'Blue', hex: '#285FB2' },
  { code: '3762', name: 'Burgundy', hex: '#510A10' },
];

const metallic = [
  { code: '5994', name: 'Silver', hex: '#A5A1A0' },
  { code: '5996', name: 'Gold', hex: '#D2A741' },
];

const matte = [
  { code: '3701', name: 'White', hex: '#F6EEEB' },
  { code: '3703', name: 'Clear', hex: '#ECE8E9' },
  { code: '3793', name: 'Silver', hex: '#A09C9B' },
  { code: '3715', name: 'Grey', hex: '#808988' },
  { code: '3713', name: 'Dark Grey', hex: '#474B4A' },
  { code: '3745', name: 'Light Blue', hex: '#4389D1' },
  { code: '3749', name: 'Blue', hex: '#3A69B9' },
  { code: '3747', name: 'Reflex Blue', hex: '#133191' },
  { code: '3785', name: 'Midnight Blue', hex: '#081C61' },
  { code: '3711', name: 'Black', hex: '#1C1819' },
  { code: '3735', name: 'Orange', hex: '#E15927' },
  { code: '3733', name: 'Red', hex: '#B22420' },
  { code: '3763', name: 'Burgundy', hex: '#510C0F' },
  { code: '3771', name: 'Brown', hex: '#210A04' },
  { code: '3743', name: 'Violet', hex: '#3E1849' },
  { code: '3719', name: 'Beige', hex: '#D5C0A5' },
  { code: '3725', name: 'Yellow', hex: '#F3A63C' },
  { code: '3723', name: 'Dark Yellow', hex: '#C58D2E' },
  { code: '3721', name: 'Light Orange', hex: '#D3922A' },
  { code: '3797', name: 'Gold', hex: '#AA9333' },
  { code: '3753', name: 'Lime Green', hex: '#79BC3B' },
  { code: '3755', name: 'Dark Lime Green', hex: '#53972A' },
  { code: '3751', name: 'Green', hex: '#32744E' },
  { code: '3757', name: 'Dark Green', hex: '#091E0B' },
];

const WIDTHS_A = ['104', '122', '137', '152.7', '160', '173', '200'];
const WIDTHS_B = ['104', '126', '137', '152.7', '200'];

// finish: 'glossy' | 'matt'; clear: transparent film; adhesive: backing color shown on hover
const ecoSolvent = [
  { code: '3980', name: 'White Glossy', finish: 'glossy', widths: WIDTHS_A },
  { code: '3981', name: 'White Matt', finish: 'matt', widths: WIDTHS_A },
  { code: '3982', name: 'Clear Glossy', finish: 'glossy', clear: true, widths: ['104', '122', '137', '152.7', '160', '200'] },
  { code: '3183', name: 'Clear Matt', finish: 'matt', clear: true, widths: ['104', '126', '137', '152.7'] },
  { code: '3988G', name: 'Grey Adhesive White Glossy', finish: 'glossy', adhesive: 'grey', widths: WIDTHS_A },
  { code: '3189G', name: 'Grey Adhesive White Matt', finish: 'matt', adhesive: 'grey', widths: WIDTHS_A },
  { code: '3100', name: 'White Glossy', finish: 'glossy', widths: WIDTHS_B },
  { code: '3101', name: 'White Matt', finish: 'matt', widths: WIDTHS_B },
  { code: '3108', name: 'Grey Adhesive White Glossy', finish: 'glossy', adhesive: 'grey', widths: WIDTHS_B },
  { code: '3109', name: 'Grey Adhesive White Matt', finish: 'matt', adhesive: 'grey', widths: WIDTHS_B },
  { code: '3180', name: 'Unifast White Glossy', finish: 'glossy', widths: ['137'] },
];

export const unifolColorSections = [
  { id: 'glossy', titleKey: 'plotterCatalog.sections.glossy', width: '122', colors: glossy },
  { id: 'metallic', titleKey: 'plotterCatalog.sections.metallic', width: '122', colors: metallic, metallic: true },
  { id: 'matte', titleKey: 'plotterCatalog.sections.matte', width: '122', colors: matte },
];

export const unifolEcoSolvent = ecoSolvent;

// Readable text color on top of a swatch (WCAG relative luminance).
export const inkFor = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.32 ? '#111111' : '#FFFFFF';
};
