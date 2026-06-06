import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../hooks/useLanguage';
import { cyklos1, cyklos2, cyklos3, cyklos4, cyklos5, cyklos6 } from '../../../../assets/images';
import cyklosData from '../../../../database/brands/cyklos.json';
import '../../CatalogPage.css';

const Cyklos = () => {
  const { language, t } = useLanguage();

  const imageMap = {
    'cyklos-ksl-435': cyklos1,
    'cyklos-ksl-320': cyklos2,
    'cyklos-gpm-320': cyklos3,
    'cyklos-gpm-315': cyklos4,
    'cyklos-ucr-9': cyklos5,
    'cyklos-ccr-40': cyklos6
  };

  return (
    <div className="catalog-page">
      <div className="office-equipment">
        <div className="container">
          <div className="office-equipment__grid">
            {cyklosData.products.map((product) => {
              const cardSpecs = language === 'en' && product.cardSpecsEn
                ? product.cardSpecsEn
                : product.cardSpecs;
              const productName = language === 'en' && product.nameEn
                ? product.nameEn
                : product.name;

              return (
                <Link
                  key={product.id}
                  to={`/${language}/cutting-systems/cyklos/${product.id}`}
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
                    <div className="office-equipment__specs">
                      {cardSpecs?.map((spec) => (
                        <span key={`${product.id}-${spec.label}`} className="spec">
                          <strong>{spec.label}:</strong>{' '}
                          <span className="spec__value">{spec.value}</span>
                        </span>
                      ))}
                    </div>
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

export default Cyklos;
