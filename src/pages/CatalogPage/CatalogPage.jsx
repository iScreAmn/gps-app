import React, { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from "../../hooks/useLanguage";
import ProductCard from '../../components/ProductCard/ProductCard';
import CategoryCards from '../../components/CategoryCards/CategoryCards';
import { searchProducts } from '../../utils/productSearch';
import { developPrinter1, developPrinter3, developPrinter4, developPrinter5, developPrinter6, developPro1, developPro2, developPro3, developPro4, nocai, PK0604, PK0604plus, PK0705, PK0705plus, PK1209, plotterCutting, inks, recoSystems, vivid } from '../../assets/images';
import developData from '../../database/brands/develop.json';
import { professionalData } from '../../data/professionalData';
import iechoData from '../../database/brands/iecho.json';
import './CatalogPage.css';

const CatalogPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const { language, t } = useLanguage();
  const [filters, setFilters] = useState({
    speed: '',
    tonerLifetime: ''
  });

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
        link: `/${language}/office-equipment/develop/${product.id}`
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
        link: `/${language}/professional-equipment/develop/${product.id}`
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

  const speedOptions = Array.from(new Set(products.map(p => p.speed).filter(Boolean)));
  const tonerOptions = Array.from(new Set(products.map(p => p.tonerLifetime).filter(Boolean)));

  const developMeta = developProducts.reduce((acc, product) => {
    const key = product.id.replace('develop-', '');
    acc[key] = product;
    return acc;
  }, {});

  const filtersContent = (
    <aside className="catalog-filters">
      <div className="filters-header">
        <h3>{t('catalog.filters')}</h3>
      </div>
      
      <div className="filter-group">
        <label>{t('catalog.speed')}</label>
        <select 
          value={filters.speed}
          onChange={(e) => setFilters({...filters, speed: e.target.value})}
        >
          <option value="">{language === 'ka' ? 'ყველა' : 'All'}</option>
          {speedOptions.map((speed) => (
            <option key={speed} value={speed}>{speed}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Toner lifetime</label>
        <select 
          value={filters.tonerLifetime}
          onChange={(e) => setFilters({...filters, tonerLifetime: e.target.value})}
        >
          <option value="">{language === 'ka' ? 'ყველა' : 'All'}</option>
          {tonerOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </aside>
  );

  return (
    <div className="catalog-page">
      {/* Search results */}
      {searchQuery && (
        <div className="container" style={{ paddingTop: '2rem' }}>
          <h2>{products.length} {t('catalog.products_found')}</h2>
          {products.length > 0 ? (
            <div className="office-equipment__grid" style={{ marginTop: '1rem' }}>
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
            <h1 className="office-equipment__title">{t('categories.plotters')}</h1>
            <p className="catalog-subtitle">
              {t('categories.plotters_description')}
            </p>
            <div className="catalog-page__plotters-brands">
              <Link
                to={`/${language}/plotter-catalog/nocai`}
                className="catalog-page__plotters-brand-card"
              >
                <img src={nocai} alt="Nocai" className="catalog-page__plotters-brand-logo" />
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Supplies Section */}
      {category === 'supplies' && !searchQuery && (
        <div className="office-equipment supplies-section">
          <div className="container">
            <h1 className="office-equipment__title">{t('categories.supplies')}</h1>
            <p className="catalog-subtitle">
              {t('categories.supplies_description')}
            </p>
            <div className="supplies__grid">
              <Link
                to={`/${language}/plotter-catalog`}
                className="supplies__card"
              >
                <img src={plotterCutting} alt={t('catalog.plotter_cutting_solutions')} className="supplies__card-img" />
                <h3 className="supplies__card-title">{t('catalog.plotter_cutting_solutions')}</h3>
              </Link>
              <Link
                to={`/${language}/catalog/supplies/inks`}
                className="supplies__card"
              >
                <img src={inks} alt={t('catalog.inks')} className="supplies__card-img" />
                <h3 className="supplies__card-title">{t('catalog.inks')}</h3>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Laminators Brands Section */}
      {category === 'laminators' && !searchQuery && (
        <div className="office-equipment">
          <div className="container">
            <div className="catalog-page__laminators-brands">
              <Link
                to="/recosystems"
                className="catalog-page__laminators-brand-card"
              >
                <img
                  src={recoSystems}
                  alt="recoSystems"
                  className="catalog-page__laminators-brand-logo"
                />
              </Link>
              <Link
                to={`/${language}/catalog/laminators?brand=vivid`}
                className="catalog-page__laminators-brand-card"
              >
                <img
                  src={vivid}
                  alt="vivid"
                  className="catalog-page__laminators-brand-logo"
                />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Professional Equipment Section */}
      {category === 'professional' && !searchQuery && professionalData?.products && (
        <div className="office-equipment">
          <div className="container">
            <h1 className="office-equipment__title">{t('categories.professional')}</h1>
            <p className="catalog-subtitle">
              {t('categories.professional_description')}
            </p>
            <div className="office-equipment__grid">
              {professionalData.products.map((product) => (
                <Link
                  key={product.id}
                  to={`/${language}/professional-equipment/develop/${product.id}`}
                  className="office-equipment__card"
                >
                  <div className="office-equipment__card-image">
                    <img
                      src={professionalImageByKey[product.imageKey] || developPro1}
                      alt={product.name}
                    />
                    <div className="office-equipment__overlay">
                      <span className="office-equipment__more">{t('common.more')}</span>
                    </div>
                  </div>
                  <div className="office-equipment__card-content">
                    <h3 className="office-equipment__card-title">{product.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Office Equipment Brands Section */}
      {category === 'office' && !searchQuery && developData?.products && (
        <div className="office-equipment">
          <div className="container">
            <h1 className="office-equipment__title">{t('products.develop.displayName')}</h1>
            <p className="catalog-subtitle">
              {t('catalog.subtitle')}
            </p>
            <div className="office-equipment__header">
              {filtersContent}
              <div className="office-equipment__grid">
                {developData.products.map((product) => {
                  const meta = developMeta[product.id] || {};
                  const speed = meta.speed || '55';
                  const tonerLifetime = meta.tonerLifetime || product.systemSpecs?.tonerLifetime;

                  return (
                    <Link
                      key={product.id}
                      to={`/${language}/office-equipment/develop/${product.id}`}
                      className="office-equipment__card"
                    >
                      <div className="office-equipment__card-image">
                        <img 
                          src={imageMap[product.id]} 
                          alt={product.name}
                        />
                        <div className="office-equipment__overlay">
                          <span className="office-equipment__more">{t('common.more')}</span>
                        </div>
                      </div>
                      <div className="office-equipment__card-content">
                        <h3 className="office-equipment__card-title">{product.name}</h3>
                        <div className="office-equipment__specs">
                          <span className="spec">
                            <strong>{t('product.speed')}</strong> {speed} {t('common.ppm')}
                          </span>
                          <span className="spec">
                            <strong>Toner lifetime</strong> {tonerLifetime || t('common.not_available')}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
