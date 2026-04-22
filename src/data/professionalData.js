/**
 * Professional printers data.
 * To add a new product:
 * 1. Add image to assets/images/index.js (export as developProN)
 * 2. Add entry to products array with id, name, imageKey, specs
 * 3. Add imageKey to imageMap in ProfessionalEquipment and ProfessionalModelPage
 */
export const professionalData = {
  brand: 'develop',
  displayName: 'Professional',
  products: [
    {
      id: 'ineo-7090',
      name: 'Ineo 7090',
      imageKey: 'developPro1',
      specs: {
        'Print speed A4': 'Colour: 90 ppm Mono: 110 ppm',
        'Print speed A3': 'Colour: 48 ppm Mono: 58 ppm',
        'Print resolution': '3,600 x 2,400 dpi x 8 bit',
        'Paper weight': '52-400 gsm',
        'Paper sizes': '330.2 x 487.7 mm, 330.2 x 900 mm (max. duplex), 330.2 x 1300 mm (max. simplex)',
        'Maximum paper input capacity': '15,140 sheets',
        'Main unit dimensions (W x D x H)': '800 x 1138 x 1478 mm',
        'Main unit weight': '335 kg'
      }
    },
    {
      id: 'ineo-2100',
      name: 'Ineo 2100',
      imageKey: 'developPro2',
      specs: {
        'Description': 'Fast, top-quality output in black & white. Up to 1,500,000 pages per month. Handles a broad range of media (up to 350 g/m²). Wide variety of finishing options (e.g. booklet). Powerful controller as standard.',
        'Copy and Print': 'Up to 100 ppm A4 or 6,000 per hour',
        'Scan': 'Up to max. 180 opm',
        'Controller': 'Embedded ineo controller 2 GHz',
        'Media weight': 'Up to 350 g/m²',
        'Paper input standard': '3,000 sheets (2 x 1,500 sheets per cassette, 40–244 g/m²)',
        'Paper input optional': 'Paper Feeding Unit for Media up to 350 g/m², max. 9,000 sheets. Multi-Bypass Tray 250 sheets (80 gsm)',
        'Finisher FS-532m': 'Output max. 4,200 sheets, 2-point and corner stapling (up to 100 sheets), Pre-printed sheet insertion (PI), 2 Post insertion trays 500 sheets each, Punching (2 and 4 hole), Folding (half-fold, z-fold, letter fold, booklet), Subtray 200 sheets',
        'Booklet module SD-510': 'Up to 25 sheets (100 images), saddle stitching, output tray for up to 35 booklets'
      }
    },
    {
      id: 'ineo-4065',
      name: 'Ineo 4065',
      imageKey: 'developPro3',
      specs: {
        'Description': 'Quality output with amazing imaging capabilities. High-speed colour printing. Flexible choice of controller technologies. Handles a broad range of media (up to 360 g/m²).',
        'Envelope printing': 'Standard',
        'Banner printing': 'Simplex up to 1,300 mm, duplex up to 864 mm',
        'Optional': 'Media Sensor for automated paper settings',
        'Connectivity': 'Third party applications (OpenAPI), Hotfolder printing',
        'Paper input standard': '1,500 sheets (62–256 gsm)',
        'Paper input optional': 'Up to 7,500 sheets',
        'Finishing': 'Stapling, Auto-shift sorting and grouping, Punching (2 and 4 holes), Multi (GBC) punching, Folding, Post insertion, Booklet making, Trimming'
      }
    },
    {
      id: 'ineo-4070',
      name: 'Ineo 4070',
      imageKey: 'developPro4',
      specs: {
        'Description': 'Quality output with amazing imaging capabilities. High-speed colour printing. Flexible choice of controller technologies. Handles a broad range of media (up to 360 g/m²). Wide variety of finishing options.',
        'Envelope printing': 'Standard',
        'Automatic density balance': 'Adjustment',
        'Banner printing': 'Simplex up to 1,300 mm, duplex up to 864 mm',
        'Optional': 'Media Sensor for automated paper settings',
        'Connectivity': 'Third party applications (OpenAPI), Hotfolder printing',
        'Paper input standard': '1,500 sheets (62–256 gsm)',
        'Paper input optional': 'Up to 15,390 sheets',
        'Finishing': 'Stapling, Large-capacity stacking (trolley-based), Auto-shift sorting and grouping, Punching (2 and 4 holes), Multi (GBC) punching, Auto ring binding, Numerous folding modes, Post insertion, Booklet making, Trimming, Perfect binding'
      }
    }
  ]
};
