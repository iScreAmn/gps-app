import React from 'react';
import { Link } from 'react-router-dom';
import { unifol } from '../../assets/images';
import { unifolColorSections, inkFor } from '../../data/unifolData';
import { useLanguage } from '../../hooks/useLanguage';
import './PlotterCuttingSection.css';

const allColors = unifolColorSections.flatMap((section) => section.colors);

// Swatches shown in the fan, picked by code from the glossy + metallic ranges
const FAN_CODES = ['3740', '3730', '3734', '3726', '5996', '3752', '3782', '3744', '3746', '3742'];
const fanColors = FAN_CODES.map((code) => allColors.find((c) => c.code === code));

const PlotterCuttingSection = () => {
  const { language, t } = useLanguage();
  const center = (fanColors.length - 1) / 2;

  return (
    <section className="plotter-cutting-section">
      <div className="container">
        <Link to={`/${language}/plotter-catalog`} className="pc-teaser">
          <div className="pc-teaser__content">
            <img src={unifol} alt="Unifol" className="pc-teaser__logo" />

            <h2 className="pc-teaser__title">{t('plotterCatalog.title')}</h2>

            <ul className="pc-teaser__tags">
              {['glossy', 'metallic', 'matte', 'ecoSolvent'].map((key) => (
                <li key={key} className="pc-teaser__tag">
                  {t(`plotterCatalog.sections.${key}`)}
                </li>
              ))}
            </ul>

            <div className="pc-teaser__footer">
              <span className="pc-teaser__count">
                {allColors.length}
                <small>{t('plotterCutting.colors')}</small>
              </span>

              <span className="pc-teaser__cta">
                <span className="pc-teaser__cta-text">{t('plotterCutting.viewCatalog')}</span>
                <span className="pc-teaser__cta-arrow" aria-hidden="true">
                  <svg viewBox="0 0 21 12">
                    <path d="M17.104 5.072l-4.138-4.014L14.056 0l6 5.82-6 5.82-1.09-1.057 4.138-4.014H0V5.072h17.104z" />
                  </svg>
                </span>
              </span>
            </div>
          </div>

          <div className="pc-teaser__fan" aria-hidden="true">
            {fanColors.map((color, i) => (
              <span
                key={color.code}
                className="pc-teaser__blade"
                style={{ '--sw': color.hex, '--ink': inkFor(color.hex), '--o': i - center }}
              >
                <span className="pc-teaser__blade-color" />
                <span className="pc-teaser__blade-code">{color.code}</span>
                <span className="pc-teaser__blade-name">{color.name}</span>
              </span>
            ))}
          </div>

          <div className="pc-teaser__marquee" aria-hidden="true">
            <div className="pc-teaser__track">
              {[0, 1].map((copy) =>
                allColors.map((color, i) => (
                  <span
                    key={`${copy}-${i}`}
                    className="pc-teaser__chip"
                    style={{ '--sw': color.hex, '--ink': inkFor(color.hex) }}
                  >
                    {color.code}
                  </span>
                ))
              )}
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default PlotterCuttingSection;
