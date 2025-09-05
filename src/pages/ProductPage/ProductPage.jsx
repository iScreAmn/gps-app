import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from "../../hooks/useLanguage";
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('description');
  const [mainImage, setMainImage] = useState(0);

  // Mock product data
  const product = {
    id: parseInt(id),
    name: 'Konica Minolta bizhub C300i',
    images: [
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    specs: {
      speed: '30',
      format: 'A3',
      resolution: '1200x1200 dpi',
      memory: '8GB',
      storage: '256GB SSD'
    },
    description: language === 'ka' 
      ? 'მრავალფუნქციური მოწყობილობა, რომელიც გთავაზობთ მაღალი ხარისხის ბეჭდვას და კოპირებას.'
      : 'Multifunction device offering high-quality printing and copying capabilities.',
    features: language === 'ka'
      ? ['მაღალი ხარისხის ბეჭდვა', 'სწრაფი სკანირება', 'ენერგოეფექტური', 'მარტივი მართვა']
      : ['High-quality printing', 'Fast scanning', 'Energy efficient', 'Easy operation']
  };

  const tabs = [
    { key: 'description', label: language === 'ka' ? 'აღწერა' : 'Description' },
    { key: 'specs', label: language === 'ka' ? 'მახასიათებლები' : 'Specifications' },
    { key: 'documents', label: language === 'ka' ? 'დოკუმენტები' : 'Documents' },
    { key: 'video', label: language === 'ka' ? 'ვიდეო' : 'Video' }
  ];

  return (
    <div className="product-page">
      <div className="container">
        <div className="product-content">
          {/* Product Gallery */}
          <div className="product-gallery">
            <div className="main-image">
              <img src={product.images[mainImage]} alt={product.name} />
            </div>
            <div className="thumbnail-images">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${index === mainImage ? 'active' : ''}`}
                  onClick={() => setMainImage(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-specs-card">
              <h3>{language === 'ka' ? 'ძირითადი მახასიათებლები' : 'Key Specifications'}</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <strong>{language === 'ka' ? 'სიჩქარე:' : 'Speed:'}</strong>
                  <span>{product.specs.speed} {language === 'ka' ? 'გვ/წთ' : 'ppm'}</span>
                </div>
                <div className="spec-item">
                  <strong>{language === 'ka' ? 'ფორმატი:' : 'Format:'}</strong>
                  <span>{product.specs.format}</span>
                </div>
                <div className="spec-item">
                  <strong>{language === 'ka' ? 'რეზოლუცია:' : 'Resolution:'}</strong>
                  <span>{product.specs.resolution}</span>
                </div>
              </div>
            </div>

            <button className="btn-primary request-quote-btn">
              {t('btn.request')}
            </button>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-details">
          <div className="tabs-nav">
            {tabs.map(tab => (
              <button
                key={tab.key}
                className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-pane">
                <h3>{language === 'ka' ? 'პროდუქტის აღწერა' : 'Product Description'}</h3>
                <p>{product.description}</p>
                <h4>{language === 'ka' ? 'თავისებურებები' : 'Features'}</h4>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="tab-pane">
                <h3>{language === 'ka' ? 'ტექნიკური მახასიათებლები' : 'Technical Specifications'}</h3>
                <div className="specs-table">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="spec-row">
                      <span className="spec-label">{key}:</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="tab-pane">
                <h3>{language === 'ka' ? 'დოკუმენტები' : 'Documents'}</h3>
                <p>{language === 'ka' ? 'დოკუმენტები მალე დაემატება' : 'Documents coming soon'}</p>
              </div>
            )}

            {activeTab === 'video' && (
              <div className="tab-pane">
                <h3>{language === 'ka' ? 'ვიდეო მიმოხილვა' : 'Video Overview'}</h3>
                <p>{language === 'ka' ? 'ვიდეო მალე დაემატება' : 'Video coming soon'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
