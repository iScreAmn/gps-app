import { developPrinter1, developPro1, developPro2, developPro3, developPro4, nocai1, nocaiArt, PK0604, PK0604plus, PK0705, PK0705plus, PK1209, ink1, ink2, ink3, plotterCutting, laminator1, laminator2, laminator3, laminator4, laminator5, laminator6, laminator7, laminator8, laminator9, laminator10, laminator11, laminator12, guillotine1, guillotine2, guillotine3, guillotine4, guillotine5, guillotine6, guillotine7, guillotine8, guillotine9, guillotine10, guillotine11, guillotine12, guillotine13, guillotine14, shredder1, shredder2, shredder3, shredder4, shredder5, shredder6 } from '../assets/images';
import developData from '../database/brands/develop.json';
import iechoData from '../database/brands/iecho.json';
import vividData from '../database/brands/vivid.json';
import recosystemsData from '../database/brands/recosystems.json';
import idealGuillotineData from '../database/brands/ideal-guillotine.json';
import idealShredderData from '../database/brands/ideal-shredder.json';
import { professionalData } from './professionalData';
import { nocaiData } from './nocaiData';

const iechoImageMap = { pk0604: PK0604, 'pk0604-plus': PK0604plus, pk0705: PK0705, 'pk0705-plus': PK0705plus, 'pk1209-pro-max': PK1209 };

const vividImageMap = {
  'matrix-duo-md-460': laminator5,
  'matrix-duo-md-650': laminator5,
  'matrix-easymount-1200-double-hot': laminator6,
  'matrix-mx-530dp': laminator7,
  'matrix-omni-flow-370': laminator8,
  'matrix-omni-flow-460': laminator9,
  'matrix-take-up-unit': laminator10
};

const recosystemsImageMap = {
  'rl-39s': laminator1,
  'rl-68s': laminator2,
  'rl-69s': laminator3,
  'rl-106': laminator4,
  'reco-lam-321-a3': laminator11,
  'royal-sovereign-es-400': laminator12
};

const guillotineImageMap = {
  'ideal-4300': guillotine1,
  'ideal-4305': guillotine2,
  'ideal-4315': guillotine3,
  'ideal-4350': guillotine4,
  'ideal-4705': guillotine5,
  'ideal-4815': guillotine6,
  'ideal-4850': guillotine7,
  'ideal-4855': guillotine14,
  'ideal-4860': guillotine8,
  'ideal-5255': guillotine9,
  'ideal-5260': guillotine10,
  'ideal-6655': guillotine11,
  'ideal-6660': guillotine12,
  'ideal-7260': guillotine13
};

const shredderImageMap = {
  'shredder-4606-cc': shredder1,
  'shredder-2220': shredder2,
  'shredder-2240': shredder3,
  'shredder-2240-cc': shredder4,
  'shredder-2260': shredder5,
  'shredder-2260-cc': shredder6
};

function buildLaminatorDescription(p, language) {
  const lines = (language === 'en' && p.descriptionLinesEn) ? p.descriptionLinesEn : p.descriptionLines;
  const specs = Array.isArray(p.cardSpecs) ? p.cardSpecs.map((s) => `${s.label} ${s.value}`).join(' ') : '';
  const short = language === 'en' ? p.shortDescriptionEn : p.shortDescriptionKa;
  return [short, specs, Array.isArray(lines) ? lines.join(' ') : ''].filter(Boolean).join(' ');
}

function buildIdealProductDescription(p, language) {
  const lines = (language === 'en' && p.descriptionLinesEn) ? p.descriptionLinesEn : p.descriptionLines;
  const specs = language === 'en' && p.cardSpecsEn
    ? p.cardSpecsEn.map((s) => `${s.label} ${s.value}`).join(' ')
    : Array.isArray(p.cardSpecs) ? p.cardSpecs.map((s) => `${s.label} ${s.value}`).join(' ') : '';
  return [specs, Array.isArray(lines) ? lines.join(' ') : ''].filter(Boolean).join(' ');
}

export function isIdealBrandSearch(query) {
  return query.trim().toLowerCase() === 'ideal';
}

export function isRecoSystemsBrandSearch(query) {
  const q = query.trim().toLowerCase();
  return q === 'recosystems' || q === 'reco systems';
}

export function isVividBrandSearch(query) {
  return query.trim().toLowerCase() === 'vivid';
}

export function getBrandSearchRoute(query, language) {
  if (isIdealBrandSearch(query)) return `/${language}/ideal/products`;
  if (isRecoSystemsBrandSearch(query)) return `/${language}/cutting-systems/recosystems`;
  if (isVividBrandSearch(query)) return `/${language}/cutting-systems/vivid`;
  return null;
}

function mapIdealGuillotineProducts(language, t) {
  return idealGuillotineData?.products?.length > 0
    ? idealGuillotineData.products.map((p) => ({
        id: `ideal-guillotine-${p.id}`,
        name: p.name,
        brand: 'Ideal',
        category: 'guillotine',
        description: buildIdealProductDescription(p, language),
        image: guillotineImageMap[p.id] || guillotine1,
        price: t('catalog.price_on_request'),
        link: `/${language}/cutting-systems/ideal/guillotine/${p.id}`,
        cardSpecs: language === 'en' && p.cardSpecsEn ? p.cardSpecsEn : p.cardSpecs
      }))
    : [];
}

function mapIdealShredderProducts(language, t) {
  return idealShredderData?.products?.length > 0
    ? idealShredderData.products.map((p) => ({
        id: `ideal-shredder-${p.id}`,
        name: p.name,
        brand: 'Ideal',
        category: 'shredder',
        description: buildIdealProductDescription(p, language),
        image: shredderImageMap[p.id] || shredder1,
        price: t('catalog.price_on_request'),
        link: `/${language}/shredder/${p.id}`,
        cardSpecs: language === 'en' && p.cardSpecsEn ? p.cardSpecsEn : p.cardSpecs
      }))
    : [];
}

export function getIdealProducts(language, t) {
  return [...mapIdealGuillotineProducts(language, t), ...mapIdealShredderProducts(language, t)];
}

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

  const vividProducts = vividData?.products?.length > 0
    ? vividData.products.map((p) => ({
        id: `vivid-${p.id}`,
        name: p.name,
        brand: 'Vivid',
        category: 'laminators',
        description: buildLaminatorDescription(p, language),
        image: vividImageMap[p.id] || laminator5,
        price: t('catalog.price_on_request'),
        link: `/${language}/cutting-systems/vivid/${p.id}`
      }))
    : [];

  const recosystemsProducts = recosystemsData?.products?.length > 0
    ? recosystemsData.products.map((p) => ({
        id: `recosystems-${p.id}`,
        name: p.name,
        brand: 'RecoSystems',
        category: 'laminators',
        description: buildLaminatorDescription(p, language),
        image: recosystemsImageMap[p.id] || laminator1,
        price: t('catalog.price_on_request'),
        link: `/${language}/cutting-systems/recosystems/${p.id}`
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

  const idealGuillotineProducts = mapIdealGuillotineProducts(language, t);
  const idealShredderProducts = mapIdealShredderProducts(language, t);

  return [...developProducts, ...professionalProducts, ...iechoProducts, ...vividProducts, ...recosystemsProducts, ...nocaiPlotterProducts, ...inksProducts, ...idealGuillotineProducts, ...idealShredderProducts, plotterCuttingProduct].map((p) => ({
    ...p,
    link: p.link || `/${language}/product/${p.id}`
  }));
}
