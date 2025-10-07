import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { 
  MdLocationOn, 
  MdEngineering, 
  MdPrecisionManufacturing,
  MdSpeed,
  MdSecurity,
  MdSupport
} from 'react-icons/md';
import './PopularSolutions.css';

const PopularSolutions = () => {
  const { t } = useLanguage();

  const solutions = [
    {
      id: 'office-gps',
      icon: MdLocationOn,
      title: 'solutions.office.title',
      description: 'solutions.office.description',
      link: '/catalog/office'
    },
    {
      id: 'professional-equipment',
      icon: MdEngineering,
      title: 'solutions.professional.title',
      description: 'solutions.professional.description',
      link: '/catalog/professional'
    },
    {
      id: 'industrial-solutions',
      icon: MdPrecisionManufacturing,
      title: 'solutions.industrial.title',
      description: 'solutions.industrial.description',
      link: '/catalog/industrial'
    },
  ];

  return (
    <div className="popular-solutions">
      <div className="solutions-header">
        <h3 className="solutions-title">{t('solutions.title')}</h3>
        <p className="solutions-subtitle">{t('solutions.subtitle')}</p>
      </div>
      
      <div className="solutions-list">
        {solutions.map((solution) => {
          const IconComponent = solution.icon;
          return (
            <Link 
              key={solution.id}
              to={solution.link}
              className="solution-item"
            >
              <div className="solution-icon">
                <IconComponent />
              </div>
              <div className="solution-content">
                <h4 className="solution-title">{t(solution.title)}</h4>
                <p className="solution-description">{t(solution.description)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PopularSolutions;
