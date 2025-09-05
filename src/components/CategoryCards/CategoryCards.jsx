import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from "../../hooks/useLanguage";
import './CategoryCards.css';

const CategoryCards = () => {
  const { language, t } = useLanguage();

  const categories = [
    {
      id: 'office',
      title: t('categories.office'),
      image: '/api/placeholder/400/300',
      link: `/${language}/catalog/office`,
      description: t('categories.office_description')
    },
    {
      id: 'professional',
      title: t('categories.professional'),
      image: '/api/placeholder/400/300',
      link: `/${language}/catalog/professional`,
      description: t('categories.professional_description')
    },
    {
      id: 'industrial',
      title: t('categories.industrial'),
      image: '/api/placeholder/400/300',
      link: `/${language}/catalog/industrial`,
      description: t('categories.industrial_description')
    }
  ];

  return (
    <section className="category-cards-section section">
      <div className="container">
        <h2 className="section-title">
          {t('categories.title')}
        </h2>
        
        <div className="category-cards-grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="category-card"
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
