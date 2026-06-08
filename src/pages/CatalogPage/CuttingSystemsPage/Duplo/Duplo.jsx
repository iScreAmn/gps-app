import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../hooks/useLanguage';
import {
  duplo1,
  duplo2,
  duplo3,
  duplo4,
  duplo5,
  duplo6,
  duplo7,
  duplo8,
  duplo9,
  duplo10
} from '../../../../assets/images';
import duploData from '../../../../database/brands/duplo.json';
import '../../CatalogPage.css';

const Duplo = () => {
  const { language, t } = useLanguage();

  const imageMap = {
    'duplo-df-1200': duplo1,
    'duplo-df-980': duplo2,
    'duplo-df-970': duplo3,
    'duplo-dc-646': duplo4,
    'duplo-dpb-500': duplo5,
    'duplo-kb-4000': duplo6,
    'duplo-dsc-10-60il': duplo7,
    'duplo-dsc-10-20': duplo8,
    'duplo-dc-446': duplo9,
    'duplo-dfc-101': duplo10
  };

  return (
    <div className="catalog-page">
      <div className="office-equipment">
        <div className="container">
          <div className="office-equipment__grid">
            {duploData.products.map((product) => {
              const cardSpecs = language === 'en' && product.cardSpecsEn
                ? product.cardSpecsEn
                : product.cardSpecs;
              const productName = language === 'en' && product.nameEn
                ? product.nameEn
                : product.name;

              return (
                <Link
                  key={product.id}
                  to={`/${language}/cutting-systems/duplo/${product.id}`}
                  className="office-equipment__card"
                >
                  <div className="office-equipment__card-image">
                    <img
                      src={imageMap[product.id]}
                      alt={productName}
                    />
                    <div className="office-equipment__overlay">
                      <span className="office-equipment__more">{t('common.more')}</span>
                    </div>
                  </div>
                  <div className="office-equipment__card-content">
                    <h3 className="office-equipment__card-title">{productName}</h3>
                    {cardSpecs?.length > 0 && (
                      <div className="office-equipment__specs">
                        {cardSpecs.map((spec) => (
                          <span key={`${product.id}-${spec.label}`} className="spec">
                            <strong>{spec.label}:</strong>{' '}
                            <span className="spec__value">{spec.value}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Duplo;
