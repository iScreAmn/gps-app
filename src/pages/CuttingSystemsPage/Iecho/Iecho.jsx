import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../hooks/useLanguage';
import { PK0604, PK0604plus, PK0705, PK0705plus, PK1209 } from '../../../assets/images';
import iechoData from '../../../database/brands/iecho.json';
import './Iecho.css';

const Iecho = () => {
  const { language, t } = useLanguage();
  const [filters, setFilters] = useState({
    cuttingThickness: '',
    cuttingSpeed: ''
  });

  // Map product IDs to images
  const imageMap = {
    'pk0604': PK0604,
    'pk0604-plus': PK0604plus,
    'pk0705': PK0705,
    'pk0705-plus': PK0705plus,
    'pk1209-pro-max': PK1209
  };

  // Get unique filter options
  const cuttingThicknessOptions = Array.from(new Set(iechoData.products.map(p => `${p.cuttingThicknessMm}mm`).filter(Boolean)));
  const cuttingSpeedOptions = Array.from(new Set(iechoData.products.map(p => `${p.maxCuttingSpeedMmPerS}mm/s`).filter(Boolean)));

  // Filter products
  const filteredProducts = iechoData.products.filter((product) => {
    if (filters.cuttingThickness && `${product.cuttingThicknessMm}mm` !== filters.cuttingThickness) {
      return false;
    }
    if (filters.cuttingSpeed && `${product.maxCuttingSpeedMmPerS}mm/s` !== filters.cuttingSpeed) {
      return false;
    }
    return true;
  });

  const filtersContent = (
    <aside className="catalog-filters">
      <div className="filters-header">
        <h3>{t('catalog.filters')}</h3>
      </div>
      
      <div className="filter-group">
        <label>Cutting Thickness</label>
        <select 
          value={filters.cuttingThickness}
          onChange={(e) => setFilters({...filters, cuttingThickness: e.target.value})}
        >
          <option value="">{language === 'ka' ? 'ყველა' : 'All'}</option>
          {cuttingThicknessOptions.map((thickness) => (
            <option key={thickness} value={thickness}>{thickness}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Cutting Speed</label>
        <select 
          value={filters.cuttingSpeed}
          onChange={(e) => setFilters({...filters, cuttingSpeed: e.target.value})}
        >
          <option value="">{language === 'ka' ? 'ყველა' : 'All'}</option>
          {cuttingSpeedOptions.map((speed) => (
            <option key={speed} value={speed}>{speed}</option>
          ))}
        </select>
      </div>
    </aside>
  );

  return (
    <div className="iecho">
      <div className="container">
        <div className="iecho__header">
          <h1 className="iecho__title">{iechoData.displayName}</h1>
        </div>
        <div className="iecho__header-wrapper">
          {filtersContent}
          <div className="iecho__grid">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/${language}/cutting-systems/iecho/${product.id}`}
                className="iecho__card"
              >
                <div className="iecho__card-image">
                  <img 
                    src={imageMap[product.id]} 
                    alt={product.name}
                  />
                  <div className="iecho__overlay">
                    <span className="iecho__more">{t('common.more')}</span>
                  </div>
                </div>
                <div className="iecho__card-content">
                  <h3 className="iecho__card-title">{product.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Iecho;

