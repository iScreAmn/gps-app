import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../hooks/useLanguage';
import { PK0604, PK0604plus, PK0705, PK0705plus, PK1209 } from '../../../assets/images';
import iechoData from '../../../database/brands/iecho.json';
import './Iecho.css';

const Iecho = () => {
  const { language } = useLanguage();

  // Map product IDs to images
  const imageMap = {
    'pk0604': PK0604,
    'pk0604-plus': PK0604plus,
    'pk0705': PK0705,
    'pk0705-plus': PK0705plus,
    'pk1209-pro-max': PK1209
  };

  return (
    <div className="iecho">
      <div className="container">
        <div className="iecho__header">
          <h1 className="iecho__title">{iechoData.displayName}</h1>
        </div>
        
        <div className="iecho__grid">
          {iechoData.products.map((product) => (
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
              </div>
              <h3 className="iecho__card-title">{product.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Iecho;

