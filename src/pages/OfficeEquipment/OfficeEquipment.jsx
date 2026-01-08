import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { developPrinter1, developPrinter3, developPrinter4, developPrinter5, developPrinter6 } from '../../assets/images';
import developData from '../../database/brands/develop.json';
import './OfficeEquipment.css';

const OfficeEquipment = () => {
  const { language, t } = useLanguage();

  // Map product IDs to images
  const imageMap = {
    'ineo-550i': developPrinter1,
    'ineo-450i': developPrinter3,
    'ineo-360i': developPrinter4,
    'ineo-759': developPrinter5,
    'ineo-4020i': developPrinter6
  };

  return (
    <div className="office-equipment">
      <div className="container">
        <div className="office-equipment__header">
          <h1 className="office-equipment__title">{t('products.develop.displayName')}</h1>
        </div>
        
        <div className="office-equipment__grid">
          {developData.products.map((product) => (
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
              </div>
              <h3 className="office-equipment__card-title">{product.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfficeEquipment;

