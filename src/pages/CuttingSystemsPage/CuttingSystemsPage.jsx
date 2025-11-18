import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { iecho, teneth, duplo, ideal } from '../../assets/images';
import './CuttingSystemsPage.css';

const CuttingSystemsPage = () => {
  const { language } = useLanguage();

  const brands = [
    {
      id: 'iecho',
      name: 'IECHO',
      logo: iecho,
      link: `/${language}/cutting-systems/iecho`,
      modifier: 'iecho'
    },
    {
      id: 'teneth',
      name: 'Teneth',
      logo: teneth,
      link: `/${language}/catalog/cutting/teneth`,
      modifier: 'teneth'
    },
    {
      id: 'ideal',
      name: 'Ideal',
      logo: ideal,
      link: `/${language}/catalog/cutting/ideal`,
      modifier: 'ideal'
    },
    {
      id: 'duplo',
      name: 'Duplo',
      logo: duplo,
      link: `/${language}/catalog/cutting/duplo`,
      modifier: 'duplo'
    }
  ];

  return (
    <div className="cutting-systems-page">
      <div className="container">
        <div className="cutting-systems-page__brands">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={brand.link}
              className="brand-card__logo-wrapper"
            >
              <img 
                src={brand.logo} 
                alt={brand.name}
                className="brand-card__logo"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CuttingSystemsPage;

