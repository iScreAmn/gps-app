import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { FaDotCircle } from 'react-icons/fa';
import './SidebarCategory.css';

const SidebarCategory = () => {
  const { t, language } = useLanguage();

  const categories = [
    {
      id: 'office',
      title: 'categories.office',
      link: `/${language}/catalog/office`
    },
    {
      id: 'professional',
      title: 'categories.professional',
      link: `/${language}/catalog/professional`
    },
    {
      id: 'industrial',
      title: 'categories.industrial',
      link: `/${language}/catalog/industrial`
    },
    {
      id: 'cutting',
      title: 'categories.cutting',
      link: `/${language}/cutting-systems`
    },
    {
      id: 'binder',
      title: 'categories.binder',
      link: `/${language}/catalog/binder`
    },
    {
      id: 'laminators',
      title: 'categories.laminators',
      link: `/${language}/catalog/laminators`
    },
    {
      id: 'plotters',
      title: 'categories.plotters',
      link: `/${language}/catalog/plotters`
    }
  ];

  return (
    <div className="sidebar-category">
      <div className="category-header">
        <h3 className="category-title">{t('categories.title')}</h3>
      </div>
      
      <div className="category-list">
        {categories.map((category) => (
          <Link 
            key={category.id}
            to={category.link}
            className="category-item"
          >
            <FaDotCircle className="category-icon" />
            <span className="category-text">{t(category.title)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarCategory;
