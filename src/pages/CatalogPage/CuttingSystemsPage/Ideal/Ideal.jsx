import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../hooks/useLanguage';
import { guillotine, shredder, accessories } from '../../../../assets/images';
import './Ideal.css';

const Ideal = () => {
  const { language, t } = useLanguage();

  const categories = [
    {
      id: 'guillotine',
      titleKey: 'categories.guillotine_cutter',
      image: guillotine,
      link: `/${language}/cutting-systems/ideal/guillotine`
    },
    {
      id: 'shredder',
      titleKey: 'categories.shredder',
      image: shredder,
      link: `/${language}/shredder`
    },
    {
      id: 'accessories',
      titleKey: 'categories.accessories',
      image: accessories,
      link: `/${language}/cutting-systems/ideal/accessories`
    }
  ];

  return (
    <div className="ideal">
      <div className="container">
        <div className="ideal__header">
          <h1 className="ideal__title">{t('ideal.title')}</h1>
        </div>

        <div className="ideal__grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="ideal__card"
            >
              <div className="ideal__card-image">
                <img
                  src={category.image}
                  alt={t(category.titleKey)}
                />
              </div>
              <div className="ideal__card-content">
                <h3 className="ideal__card-title">{t(category.titleKey)}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ideal;
