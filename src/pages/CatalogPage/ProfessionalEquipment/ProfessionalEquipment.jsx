import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../hooks/useLanguage';
import { developPro1, developPro2, developPro3, developPro4 } from '../../../assets/images';
import { professionalData } from '../../../data/professionalData';
import './ProfessionalEquipment.css';

const imageMap = {
  developPro1,
  developPro2,
  developPro3,
  developPro4
};

const ProfessionalEquipment = () => {
  const { language, t } = useLanguage();

  return (
    <div className="office-equipment">
      <div className="container">
        <div className="office-equipment__header">
          <h1 className="office-equipment__title">{t('categories.professional')}</h1>
        </div>

        <div className="office-equipment__grid">
          {professionalData.products.map((product) => (
            <Link
              key={product.id}
              to={`/${language}/professional-equipment/develop/${product.id}`}
              className="office-equipment__card"
            >
              <div className="office-equipment__card-image">
                <img
                  src={imageMap[product.imageKey]}
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

export default ProfessionalEquipment;
