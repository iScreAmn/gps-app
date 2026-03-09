import React from 'react';
import { Link } from 'react-router-dom';
import { plotterCutting } from '../../assets/images';
import { useLanguage } from '../../hooks/useLanguage';
import './PlotterCuttingSection.css';

const PlotterCuttingSection = () => {
  const { language, t } = useLanguage();

  return (
    <section className="plotter-cutting-section">
      <div className="container">
        <div className="plotter-cutting__wrapper">
          <img
            src={plotterCutting}
            alt={t('plotterCutting.imageAlt')}
            className="plotter-cutting__image"
          />
          <div className="plotter-cutting__status">
              <Link
                to={`/${language}/plotter-catalog`}
                className="btn plotter-cutting__btn"
              >
                <span className="btn__circle" />
                <span className="btn__white-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 12">
                    <path d="M17.104 5.072l-4.138-4.014L14.056 0l6 5.82-6 5.82-1.09-1.057 4.138-4.014H0V5.072h17.104z" />
                  </svg>
                </span>
                <span className="btn__text">{t('plotterCutting.viewCatalog')}</span>
              </Link>
            </div>
        </div>
      </div>
    </section>
  );
};

export default PlotterCuttingSection;
