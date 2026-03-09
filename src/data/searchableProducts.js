import { developPrinter1, PK0604, PK0604plus, PK0705, PK0705plus, PK1209 } from '../assets/images';
import developData from '../database/brands/develop.json';
import iechoData from '../database/brands/iecho.json';

const iechoImageMap = { pk0604: PK0604, 'pk0604-plus': PK0604plus, pk0705: PK0705, 'pk0705-plus': PK0705plus, 'pk1209-pro-max': PK1209 };

export function getSearchableProducts(language, t) {
  const developProducts = developData?.products?.length > 0
    ? developData.products.map((p) => ({
        id: `develop-${p.id}`,
        name: p.name,
        brand: 'Develop',
        category: 'office',
        image: developPrinter1,
        price: t('catalog.price_on_request'),
        link: `/${language}/office-equipment/develop/${p.id}`
      }))
    : [];

  const iechoProducts = iechoData?.products?.length > 0
    ? iechoData.products.map((p) => ({
        id: `iecho-${p.id}`,
        name: p.name,
        brand: 'IECHO',
        category: 'cutting',
        description: [p.materials, p.tools].flat().join(' '),
        image: iechoImageMap[p.id] || PK0604,
        price: t('catalog.price_on_request'),
        link: `/${language}/cutting-systems/iecho/${p.id}`
      }))
    : [];

  return [...developProducts, ...iechoProducts].map((p) => ({
    ...p,
    link: p.link || `/${language}/product/${p.id}`
  }));
}
