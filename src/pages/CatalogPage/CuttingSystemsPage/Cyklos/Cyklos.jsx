import React from 'react';
import { useLanguage } from '../../../../hooks/useLanguage';
import CatalogCard from '../../../../components/CatalogCard/CatalogCard';
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
          <div className="catalog-cards">
            {cyklosData.products.map((product, index) => (
              <CatalogCard
                key={product.id}
                to={`/${language}/cutting-systems/cyklos/${product.id}`}
                index={index}
                image={imageMap[product.id]}
                name={language === 'en' && product.nameEn ? product.nameEn : product.name}
                moreLabel={t('common.more')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cyklos;
