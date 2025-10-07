import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { FaDotCircle } from 'react-icons/fa';
import './SidebarCategory.css';

const SidebarCategory = () => {
  const { t } = useLanguage();

  const categories = [
    {
      id: 'office-equipment',
      title: 'categories.office_equipment',
      link: '/catalog/office'
    },
    {
      id: 'production-printers',
      title: 'categories.production_printers',
      link: '/catalog/production'
    },
    {
      id: 'wide-format-printers',
      title: 'categories.wide_format_printers',
      link: '/catalog/wide-format'
    },
    {
      id: 'guillotine-cutter',
      title: 'categories.guillotine_cutter',
      link: '/catalog/guillotine'
    },
    {
      id: 'shredder',
      title: 'categories.shredder',
      link: '/catalog/shredder'
    },
    {
      id: 'laminator',
      title: 'categories.laminator',
      link: '/catalog/laminator'
    },
    {
      id: 'accessories',
      title: 'categories.accessories',
      link: '/catalog/accessories'
    },
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
