import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../../hooks/useLanguage';
import { PK0604, PK0604plus, PK0705, PK0705plus, PK1209 } from '../../../assets/images';
import iechoData from '../../../database/brands/iecho.json';
import './IechoModelPage.css';

const IechoModelPage = () => {
  const { modelId } = useParams();
  const { language } = useLanguage();

  // Map product IDs to images
  const imageMap = {
    'pk0604': PK0604,
    'pk0604-plus': PK0604plus,
    'pk0705': PK0705,
    'pk0705-plus': PK0705plus,
    'pk1209-pro-max': PK1209
  };

  // Find the product
  const product = iechoData.products.find(p => p.id === modelId);

  if (!product) {
    return (
      <div className="iecho-model">
        <div className="container">
          <p>Model not found</p>
          <Link to={`/${language}/cutting-systems/iecho`}>Back to IECHO</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="iecho-model">
      <div className="container">
        <div className="iecho-model__header">
          <Link to={`/${language}/cutting-systems/iecho`} className="iecho-model__back">
            ← Back to IECHO
          </Link>
          <h1 className="iecho-model__title">{product.name}</h1>
          <button 
            className="iecho-model__help-btn"
            onClick={(e) => {
              e.preventDefault();
              // TODO: Add help functionality
            }}
          >
            Need Help?
          </button>
        </div>

        <div className="iecho-model__content">
          <div className="iecho-model__image-wrapper">
            <img 
              src={imageMap[product.id]} 
              alt={product.name}
              className="iecho-model__image-big"
            />
          </div>

          <div className="iecho-model__specs">
            <h2 className="iecho-model__specs-title">Specifications</h2>
            
            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Cutting Head Type:</span>
              <span className="iecho-model__spec-value">{product.cuttingHeadType}</span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Machine Type:</span>
              <span className="iecho-model__spec-value">{product.machineType}</span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Cutting Area (L×W):</span>
              <span className="iecho-model__spec-value">
                {product.cuttingArea.lengthMm}mm × {product.cuttingArea.widthMm}mm
              </span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Flooring Area (L×W×H):</span>
              <span className="iecho-model__spec-value">
                {product.flooringArea.lengthMm}mm × {product.flooringArea.widthMm}mm × {product.flooringArea.heightMm}mm
              </span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Cutting Tools:</span>
              <span className="iecho-model__spec-value">
                {product.tools.join(', ')}
              </span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Cutting Materials:</span>
              <span className="iecho-model__spec-value">
                {product.materials.join(', ')}
              </span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Cutting Thickness:</span>
              <span className="iecho-model__spec-value">{product.cuttingThicknessMm}mm</span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Media:</span>
              <span className="iecho-model__spec-value">{product.media}</span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Max Cutting Speed:</span>
              <span className="iecho-model__spec-value">{product.maxCuttingSpeedMmPerS}mm/s</span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Cutting Accuracy:</span>
              <span className="iecho-model__spec-value">±{product.cuttingAccuracyMm}mm</span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Data Formats:</span>
              <span className="iecho-model__spec-value">{product.dataFormats.join(', ')}</span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Voltage:</span>
              <span className="iecho-model__spec-value">{product.voltage}</span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Power:</span>
              <span className="iecho-model__spec-value">{product.powerKw}kW</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IechoModelPage;

