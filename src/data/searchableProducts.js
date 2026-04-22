import { developPrinter1, developPro1, developPro2, developPro3, developPro4, nocai1, nocaiArt, PK0604, PK0604plus, PK0705, PK0705plus, PK1209, ink1, ink2, ink3, plotterCutting } from '../assets/images';
import developData from '../database/brands/develop.json';
import iechoData from '../database/brands/iecho.json';
import { professionalData } from './professionalData';
import { nocaiData } from './nocaiData';

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

  const professionalImageByKey = { developPro1, developPro2, developPro3, developPro4 };
  const professionalProducts = professionalData?.products?.length > 0
    ? professionalData.products.map((p) => ({
        id: `professional-${p.id}`,
        name: p.name,
        brand: 'Develop',
        category: 'professional',
        image: professionalImageByKey[p.imageKey] || developPro1,
        price: t('catalog.price_on_request'),
        link: `/${language}/professional-equipment/develop/${p.id}`
      }))
    : [];

  const inksProducts = [
    {
      id: 'inks-audley-dtf',
      name: t('inks.audley_dtf'),
      brand: 'Audley',
      category: 'inks',
      image: ink2,
      link: `/${language}/catalog/supplies/inks/audley-dtf`,
    },
    {
      id: 'inks-audley-eco',
      name: t('inks.audley_eco'),
      brand: 'Audley',
      category: 'inks',
      image: ink3,
      link: `/${language}/catalog/supplies/inks/audley-eco`,
    },
    {
      id: 'inks-nocai-uv',
      name: t('inks.nocai_uv'),
      brand: 'Nocai',
      category: 'inks',
      image: ink1,
      link: `/${language}/catalog/supplies/inks/nocai-uv`,
    },
  ];

  const nocaiImageByKey = { nocai1, nocaiArt };
  const nocaiPlotterProducts = nocaiData?.products?.length > 0
    ? nocaiData.products.map((p) => ({
        id: `nocai-${p.id}`,
        name: p.name,
        brand: 'Nocai',
        category: 'plotter',
        image: nocaiImageByKey[p.imageKey] || nocai1,
        price: t('catalog.price_on_request'),
        link: `/${language}/plotter-catalog/nocai/${p.id}`
      }))
    : [];

  const plotterCuttingProduct = {
    id: 'plotter-cutting-unifol',
    name: t('catalog.plotter_cutting_solutions'),
    brand: 'Unifol',
    category: 'plotter',
    image: plotterCutting,
    link: `/${language}/plotter-catalog`,
  };

  return [...developProducts, ...professionalProducts, ...iechoProducts, ...nocaiPlotterProducts, ...inksProducts, plotterCuttingProduct].map((p) => ({
    ...p,
    link: p.link || `/${language}/product/${p.id}`
  }));
}
