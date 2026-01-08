import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from "../../hooks/useLanguage";
import ProductCard from '../../components/ProductCard/ProductCard';
import CategoryCards from '../../components/CategoryCards/CategoryCards';
import { printer2, printer3, developPrinter1 } from '../../assets/images';
import developData from '../../database/brands/develop.json';
import './CatalogPage.css';

const CatalogPage = () => {
  const { category } = useParams();
  const { language, t } = useLanguage();
  const [filters, setFilters] = useState({
    speed: '',
    tonerLifetime: ''
  });

  // Mock data - replace with real data
  const baseProducts = [
    {
      id: 2,
      name: 'Konica Minolta bizhub C450i',
      category: 'professional',
      type: 'multifunction',
      speed: '45',
      format: 'A3',
      image: printer2,
      price: t('catalog.price_on_request')
    },
    {
      id: 3,
      name: 'Konica Minolta AccurioPress C3080',
      category: 'industrial',
      type: 'printer',
      speed: '80',
      format: 'A3+',
      image: printer3,
      price: t('catalog.price_on_request')
    }
  ];

  // Add Develop Ineo 550i products
  const developProducts = developData && developData.products && developData.products.length > 0
    ? developData.products.map((product) => ({
        id: `develop-${product.id}`,
        name: product.name,
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

  const products = [...baseProducts, ...developProducts];

  // Debug: Check if developData is loaded
  console.log('CatalogPage Debug:', {
    category,
    developDataExists: !!developData,
    developProductsCount: developProducts.length,
    totalProducts: products.length,
    officeProducts: products.filter(p => p.category === 'office').map(p => p.name)
  });


  // Map product IDs to images for brand sections
  const imageMap = {
    'ineo-550i': developPrinter1
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
      {/* Category Cards Section */}
      {!category && <CategoryCards />}
      
      {/* Office Equipment Brands Section */}
      {category === 'office' && developData && developData.products && (
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
