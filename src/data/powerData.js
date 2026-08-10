// TMT LED power supplies — data source for the /leds/power page.
// Model names are brand names and stay untranslated; spec labels live in i18n (`leds.power.specs`).

import { power2, power3, power4, power5 } from '../assets/images';

export const powerProducts = [
  {
    id: 'led-driver-100w',
    name: 'LED Driver - 100W',
    image: power2,
    specs: [
      { label: 'leds.power.specs.current', value: '8.3A' },
      { label: 'leds.power.specs.inputPower', value: '100W' },
      { label: 'leds.power.specs.acCurrent', value: '0.8A' },
      { label: 'leds.power.specs.dimensions', value: '151x35x26mm / 0.24kg' }
    ]
  },
  {
    id: 'led-driver-200w',
    name: 'LED Driver - 200W',
    image: power3,
    specs: [
      { label: 'leds.power.specs.current', value: '16A' },
      { label: 'leds.power.specs.inputPower', value: '200W' },
      { label: 'leds.power.specs.acCurrent', value: '1.6A' },
      { label: 'leds.power.specs.dimensions', value: '151x54x36mm / 0.51kg' }
    ]
  },
  {
    id: 'led-driver-300w',
    name: 'LED Driver - 300W',
    image: power4,
    specs: [
      { label: 'leds.power.specs.current', value: '25A' },
      { label: 'leds.power.specs.inputPower', value: '300W' },
      { label: 'leds.power.specs.acCurrent', value: '2.3A' },
      { label: 'leds.power.specs.dimensions', value: '168x54x36mm / 0.60kg' }
    ]
  },
  {
    id: 'led-driver-400w',
    name: 'LED Driver - 400W',
    image: power5,
    specs: [
      { label: 'leds.power.specs.current', value: '33A' },
      { label: 'leds.power.specs.inputPower', value: '400W' },
      { label: 'leds.power.specs.acCurrent', value: '3.1A' },
      { label: 'leds.power.specs.dimensions', value: '216x68x43mm / 1.10kg' }
    ]
  }
];
