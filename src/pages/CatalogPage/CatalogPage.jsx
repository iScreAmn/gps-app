import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from "../../hooks/useLanguage";
import ProductCard from '../../components/ProductCard/ProductCard';
import CategoryCards from '../../components/CategoryCards/CategoryCards';
import './CatalogPage.css';

const CatalogPage = () => {
  const { category } = useParams();
  const { language, t } = useLanguage();
  const [filters, setFilters] = useState({
    type: '',
    speed: '',
    format: ''
  });

  // Mock data - replace with real data
  const products = [
    {
      id: 1,
      name: 'Konica Minolta bizhub C300i',
      category: 'office',
      type: 'multifunction',
      speed: '30',
      format: 'A3',
      image: '/api/placeholder/300/200',
      price: t('catalog.price_on_request')
    },
    {
      id: 2,
      name: 'Konica Minolta bizhub C450i',
      category: 'professional',
      type: 'multifunction',
      speed: '45',
      format: 'A3',
      image: '/api/placeholder/300/200',
      price: t('catalog.price_on_request')
    },
    {
      id: 3,
      name: 'Konica Minolta AccurioPress C3080',
      category: 'industrial',
      type: 'printer',
      speed: '80',
      format: 'A3+',
      image: '/api/placeholder/300/200',
      price: t('catalog.price_on_request')
    }
  ];

  const filteredProducts = products.filter(product => {
    if (category && product.category !== category) return false;
    if (filters.type && product.type !== filters.type) return false;
    if (filters.speed && product.speed !== filters.speed) return false;
    if (filters.format && product.format !== filters.format) return false;
    return true;
  });

  const getCategoryTitle = () => {
    if (!category) return t('catalog.full_catalog');
    switch (category) {
      case 'office':
        return t('categories.office');
      case 'professional':
        return t('categories.professional');
      case 'industrial':
        return t('categories.industrial');
      default:
        return t('catalog.title');
    }
  };

  return (
    <div className="catalog-page">
      {/* Category Cards Section */}
      {!category && <CategoryCards />}
      
      <div className="container">
        <div className="catalog-header">
          <h1 className="catalog-title">{getCategoryTitle()}</h1>
          <p className="catalog-subtitle">
            {t('catalog.subtitle')}
          </p>
        </div>

        <div className="catalog-content">
          {/* Filters */}
          <aside className="catalog-filters">
            <h3>{t('catalog.filters')}</h3>
            
            <div className="filter-group">
              <label>{t('catalog.type')}</label>
              <select 
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
              >
                <option value="">{t('catalog.all')}</option>
                <option value="multifunction">{t('catalog.multifunction')}</option>
                <option value="printer">{t('catalog.printer')}</option>
              </select>
            </div>

            <div className="filter-group">
              <label>{t('catalog.speed')}</label>
              <select 
                value={filters.speed}
                onChange={(e) => setFilters({...filters, speed: e.target.value})}
              >
                <option value="">{language === 'ka' ? 'ყველა' : 'All'}</option>
                <option value="30">30</option>
                <option value="45">45</option>
                <option value="80">80</option>
              </select>
            </div>

            <div className="filter-group">
              <label>{t('catalog.format')}</label>
              <select 
                value={filters.format}
                onChange={(e) => setFilters({...filters, format: e.target.value})}
              >
                <option value="">{language === 'ka' ? 'ყველა' : 'All'}</option>
                <option value="A3">A3</option>
                <option value="A3+">A3+</option>
                <option value="A4">A4</option>
              </select>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="catalog-products">
            <div className="products-count">
              {filteredProducts.length} {t('catalog.products_found')}
            </div>
            
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="no-products">
                <p>{t('catalog.no_products')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
