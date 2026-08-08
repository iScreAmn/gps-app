// TMT LED modules — data source for the /leds page (hero slider + product range).
// Model names are brand names and stay untranslated; copy lives in i18n (`leds.*`).

import { leds1, leds2, leds3, leds4, leds5 } from '../assets/images';

export const ledProducts = [
  {
    id: 'tiny-led-module',
    name: 'Tiny LED Module',
    image: leds5,
    description: 'leds.products.tiny.description',
    features: [
      'leds.products.tiny.feature1',
      'leds.products.tiny.feature2',
      'leds.products.tiny.feature3',
      'leds.products.tiny.feature4',
      'leds.products.tiny.feature5',
      'leds.products.tiny.feature6'
    ],
    stats: [
      { value: '37–41', label: 'leds.stats.lumensPerModule' },
      { value: '115', label: 'leds.stats.lumensPerWatt' }
    ]
  },
  {
    id: 'slim-led-module',
    name: 'Slim LED Module',
    image: leds4,
    description: 'leds.products.slim.description',
    features: [
      'leds.products.slim.feature1',
      'leds.products.slim.feature2',
      'leds.products.slim.feature3',
      'leds.products.slim.feature4',
      'leds.products.slim.feature5'
    ],
    stats: [
      { value: '70–120', label: 'leds.stats.lumensPerModule' },
      { value: '115', label: 'leds.stats.lumensPerWatt' }
    ]
  },
  {
    id: 'midi-edge-lit',
    name: 'Midi Edge-lit Game Changer',
    image: leds3,
    description: 'leds.products.midiEdge.description',
    features: [
      'leds.products.midiEdge.feature1',
      'leds.products.midiEdge.feature2',
      'leds.products.midiEdge.feature3',
      'leds.products.midiEdge.feature4',
      'leds.products.midiEdge.feature5'
    ],
    stats: [
      { value: '12 / 24 V', label: 'leds.stats.voltage' },
      { value: 'Clean White', label: 'leds.stats.technology' }
    ]
  },
  {
    id: 'midi-4',
    name: 'Midi 4 Game Changer',
    image: leds2,
    description: 'leds.products.midi4.description',
    features: [
      'leds.products.midi4.feature1',
      'leds.products.midi4.feature2',
      'leds.products.midi4.feature3',
      'leds.products.midi4.feature4',
      'leds.products.midi4.feature5',
      'leds.products.midi4.feature6',
      'leds.products.midi4.feature7'
    ],
    stats: [
      { value: '240–320', label: 'leds.stats.lumensPerModule' },
      { value: '155', label: 'leds.stats.lumensPerWatt' }
    ]
  },
  {
    id: 'mini-2',
    name: 'Mini 2 Game Changer',
    image: leds1,
    description: 'leds.products.mini2.description',
    features: [
      'leds.products.mini2.feature1',
      'leds.products.mini2.feature2',
      'leds.products.mini2.feature3',
      'leds.products.mini2.feature4',
      'leds.products.mini2.feature5'
    ],
    stats: [
      { value: '178', label: 'leds.stats.lumensPerWatt' },
      { value: '49 × 14 mm', label: 'leds.stats.footprint' }
    ]
  }
];
