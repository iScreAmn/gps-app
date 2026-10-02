import React from 'react';
import { useParams, useSearchParams, Link, Navigate } from 'react-router-dom';
import { getBrandSearchRoute } from '../../data/searchableProducts';
import { useLanguage } from "../../hooks/useLanguage";
import ProductCard from '../../components/ProductCard/ProductCard';
import CategoryCards from '../../components/CategoryCards/CategoryCards';
import CatalogHero from '../../components/CatalogHero/CatalogHero';
import CatalogCard from '../../components/CatalogCard/CatalogCard';
import { searchProducts } from '../../utils/productSearch';
import { developPrinter1, developPrinter3, developPrinter4, developPrinter5, developPrinter6, developPro1, developPro2, developPro3, developPro4, nocai, audley, teneth, PK0604, PK0604plus, PK0705, PK0705plus, PK1209, plotterCutting, inks, toner, wirecombCover, guillotineCover } from '../../assets/images';
import developData from '../../database/brands/develop.json';
import { professionalData } from '../../data/professionalData';
import iechoData from '../../database/brands/iecho.json';
import { suppliesProducts } from '../../data/suppliesData';
import { materialsProducts } from '../../data/materialsData';
import './BrandListing.css';
import './CatalogPage.css';

const CatalogPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const { language, t } = useLanguage();
  // Add Develop products
  const developProducts = developData?.products?.length > 0
    ? developData.products.map((product) => ({
        id: `develop-${product.id}`,
        name: product.name,
        brand: 'Develop',
        category: 'office',
        type: 'multifunction',
        speed: '55',
        format: 'A3',
        tonerLifetime: product.systemSpecs?.tonerLifetime,
        image: developPrinter1,
        price: t('catalog.price_on_request'),
        link: `/${language}/catalog/office/${product.id}`
      }))
    : [];

  const professionalImageByKey = { developPro1, developPro2, developPro3, developPro4 };
  const professionalProducts = professionalData?.products?.length > 0
    ? professionalData.products.map((product) => ({
        id: `professional-${product.id}`,
        name: product.name,
        brand: 'Develop',
        category: 'professional',
        image: professionalImageByKey[product.imageKey] || developPro1,
        price: t('catalog.price_on_request'),
        link: `/${language}/catalog/professional/${product.id}`
      }))
    : [];

  const iechoImageMap = { pk0604: PK0604, 'pk0604-plus': PK0604plus, pk0705: PK0705, 'pk0705-plus': PK0705plus, 'pk1209-pro-max': PK1209 };

  const iechoProducts = iechoData?.products?.length > 0
    ? iechoData.products.map((product) => ({
        id: `iecho-${product.id}`,
        name: product.name,
        brand: 'IECHO',
        category: 'cutting',
        description: [product.materials, product.tools].flat().join(' '),
        image: iechoImageMap[product.id] || PK0604,
        price: t('catalog.price_on_request'),
        link: `/${language}/cutting-systems/iecho/${product.id}`
      }))
    : [];

  if (category === 'industrial') {
    return <Navigate to={`/${language}/catalog/materials`} replace />;
  }

  if (category === 'laminators') {
    return <Navigate to={`/${language}/leds`} replace />;
  }

  const brandSearchRoute = getBrandSearchRoute(searchQuery, language);
  if (brandSearchRoute) {
    return <Navigate to={brandSearchRoute} replace />;
  }

  const allProducts = [...developProducts, ...professionalProducts, ...iechoProducts];
  const products = searchQuery.trim() ? searchProducts(allProducts, searchQuery) : allProducts;

  // Map product IDs to images for brand sections
  const imageMap = {
    'ineo-550i': developPrinter1,
    'ineo-450i': developPrinter3,
    'ineo-360i': developPrinter4,
    'ineo-759': developPrinter5,
    'ineo-4020i': developPrinter6
  };

  return (
    <div className="catalog-page">
      {/* Search results */}
      {searchQuery && (
        <div className="container">
          <h1 className="catalog-page__found-count">
            {products.length} {t('catalog.products_found')}
          </h1>
          {products.length > 0 ? (
            <div className="office-equipment__grid">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={product.link || `/${language}/product/${product.id}`}
                  className="office-equipment__card"
                >
                  <div className="office-equipment__card-image">
                    <img src={product.image} alt={product.name} />
                    <div className="office-equipment__overlay">
                      <span className="office-equipment__more">{t('common.more')}</span>
                    </div>
                  </div>
                  <div className="office-equipment__card-content">
                    <h3 className="office-equipment__card-title">{product.name}</h3>
                    <div className="office-equipment__specs">
                      {product.speed && <span className="spec"><strong>{t('product.speed')}</strong> {product.speed} {t('common.ppm')}</span>}
                      {product.tonerLifetime && <span className="spec"><strong>Toner lifetime</strong> {product.tonerLifetime}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>{t('catalog.no_products')}</p>
          )}
        </div>
      )}

      {/* Category Cards Section */}
      {!category && !searchQuery && <CategoryCards />}

      {/* Plotters Section */}
      {category === 'plotters' && !searchQuery && (
        <div className="office-equipment">
          <div className="container">
            <CatalogHero
              title={t('categories.plotters')}
              description={t('categories.plotters_description')}
              wide
            />
            <div className="catalog-page__plotters-brands">
              <Link
                to={`/${language}/plotter-catalog/nocai`}
                className="catalog-page__plotters-brand-card"
              >
                <img src={nocai} alt="Nocai" className="catalog-page__plotters-brand-logo" />
              </Link>
              <Link
                to={`/${language}/plotter-catalog/audley`}
                className="catalog-page__plotters-brand-card"
              >
                <img src={audley} alt="Audley" className="catalog-page__plotters-brand-logo" />
              </Link>
              <Link
                to={`/${language}/plotter-catalog/teneth`}
                className="catalog-page__plotters-brand-card"
              >
                <img src={teneth} alt="Teneth" className="catalog-page__plotters-brand-logo" />
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Materials Section */}
      {category === 'materials' && !searchQuery && (
        <div className="office-equipment">
          <div className="container">
            <CatalogHero
              title={t('categories.materials')}
              description={t('categories.materials_description')}
              wide
            />
            <div className="catalog-cards">
              <CatalogCard
                to={`/${language}/plotter-catalog`}
                index={0}
                image={plotterCutting}
                name={t('catalog.plotter_cutting_solutions')}
                moreLabel={t('common.more')}
                showIndex={false}
                cover
              />
              {materialsProducts.map((product, index) => (
                <CatalogCard
                  key={product.id}
                  to={`/${language}/catalog/materials/${product.id}`}
                  index={index + 1}
                  image={product.image}
                  name={t(product.titleKey)}
                  moreLabel={t('common.more')}
                  showIndex={false}
                  cover
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Supplies Section */}
      {category === 'supplies' && !searchQuery && (
        <div className="office-equipment">
          <div className="container">
            <CatalogHero
              title={t('categories.supplies')}
              description={t('categories.supplies_description')}
              wide
            />
            <div className="catalog-cards">
              <CatalogCard
                to={`/${language}/toner`}
                index={0}
                image={toner}
                name={t('catalog.toner')}
                moreLabel={t('common.more')}
                showIndex={false}
                cover
              />
              <CatalogCard
                to={`/${language}/catalog/supplies/inks`}
                index={1}
                image={inks}
                name={t('catalog.inks')}
                moreLabel={t('common.more')}
                showIndex={false}
                cover
              />
              <CatalogCard
                to={`/${language}/catalog/supplies/wirecombs`}
                index={2}
                image={wirecombCover}
                name={t('catalog.wirecombs')}
                moreLabel={t('common.more')}
                showIndex={false}
                cover
              />
              <CatalogCard
                to={`/${language}/catalog/supplies/guillotineaccess`}
                index={3}
                image={guillotineCover}
                name={t('catalog.guillotine_access')}
                moreLabel={t('common.more')}
                showIndex={false}
                cover
              />
              {suppliesProducts.map((product, index) => (
                <CatalogCard
                  key={product.id}
                  to={`/${language}/catalog/supplies/${product.id}`}
                  index={index + 4}
                  image={product.image}
                  imagePosition={product.imagePosition}
                  name={t(product.titleKey)}
                  moreLabel={t('common.more')}
                  showIndex={false}
                  cover
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Professional Equipment Section */}
      {category === 'professional' && !searchQuery && professionalData?.products && (
        <div className="office-equipment">
          <div className="container">
            <CatalogHero
              title={t('categories.professional')}
              description={t('categories.professional_description')}
              wide
            />
            <div className="catalog-cards">
              {professionalData.products.map((product, index) => (
                <CatalogCard
                  key={product.id}
                  to={`/${language}/catalog/professional/${product.id}`}
                  index={index}
                  image={professionalImageByKey[product.imageKey] || developPro1}
                  name={product.name}
                  moreLabel={t('common.more')}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Office Equipment Brands Section */}
      {category === 'office' && !searchQuery && developData?.products && (
        <div className="office-equipment">
          <div className="container">
            <CatalogHero
              title={t('products.develop.displayName')}
              description={t('catalog.subtitle')}
              wide
            />
            <div className="catalog-cards">
              {developData.products.map((product, index) => (
                <CatalogCard
                  key={product.id}
                  to={`/${language}/catalog/office/${product.id}`}
                  index={index}
                  image={imageMap[product.id]}
                  name={product.name}
                  moreLabel={t('common.more')}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
