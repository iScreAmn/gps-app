import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from "../../hooks/useLanguage";
import { categoryOffice, categoryProfessional, categoryIndustrial, iechoCategory, duploBinder } from '../../assets/images';
import './CategoryCards.css';

const CategoryCards = () => {
  const { language, t } = useLanguage();

  const categories = [
    {
      id: 'office',
      title: t('categories.office'),
      image: categoryOffice,
      link: `/${language}/catalog/office`,
      description: t('categories.office_description'),
      wide: false
    },
    {
      id: 'professional',
      title: t('categories.professional'),
      image: categoryProfessional,
      link: `/${language}/catalog/professional`,
      description: t('categories.professional_description'),
      wide: false
    },
    {
      id: 'industrial',
      title: t('categories.industrial'),
      image: categoryIndustrial,
      link: `/${language}/catalog/industrial`,
      description: t('categories.industrial_description'),
      wide: false
    },
    {
      id: 'cutting',
      title: t('categories.cutting'),
      image: iechoCategory,
      link: `/${language}/cutting-systems`,
      description: t('categories.cutting_description'),
      wide: true
    },
    {
      id: 'binder',
      title: t('categories.binder'),
      image: duploBinder,
      link: `/${language}/catalog/binder`,
      description: t('categories.binder_description'),
      wide: false
    }
  ];

  return (
    <section className="category-cards-section section">
      <div className="container">
        <div className="category-cards-grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className={`category-card ${category.wide ? 'category-card-wide' : ''}`}
            >
              <div className="category-card-image">
                <img src={category.image} alt={category.title} />
                <div className="category-card-overlay">
                  <div className="category-card-content">
                    <h3 className="category-card-title">{category.title}</h3>
                    <p className="category-card-description">{category.description}</p>
                    <span className="category-card-cta">
                      {t('common.more')} →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
