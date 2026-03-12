import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../hooks/useLanguage';
import { nocai1, nocaiArt } from '../../../assets/images';
import { nocaiData } from '../../../data/nocaiData';
import './Nocai.css';

const imageMap = {
  nocai1,
  nocaiArt
};

const Nocai = () => {
  const { language, t } = useLanguage();

  return (
    <div className="office-equipment nocai-plotters">
      <div className="container">
        <div className="office-equipment__header">
          <h1 className="office-equipment__title">{nocaiData.displayName}</h1>
        </div>

        <div className="office-equipment__grid">
          {nocaiData.products.map((product) => (
            <Link
              key={product.id}
              to={`/${language}/plotter-catalog/nocai/${product.id}`}
              className="office-equipment__card"
            >
              <div className="office-equipment__card-image">
                <img
                  src={imageMap[product.imageKey]}
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
  );
};

export default Nocai;
