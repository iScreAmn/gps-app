import React, { useEffect, useRef } from 'react';
import CatalogHero from '../../components/CatalogHero/CatalogHero';
import { unifolColorSections, unifolEcoSolvent, inkFor } from '../../data/unifolData';
import { useLanguage } from '../../hooks/useLanguage';
import './PlotterCatalogPage.css';

const swatchId = (sectionId, index) => `uf-${sectionId}-${index}`;

// Adds `is-visible` once the element scrolls into view (drives the staggered reveal).
const useReveal = () => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (!('IntersectionObserver' in window)) {
      node.classList.add('is-visible');
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
};

const SectionHeader = ({ index, title, width, cm }) => (
  <header className="uf-section__head">
    <span className="uf-section__index" aria-hidden="true">
      {String(index).padStart(2, '0')}
    </span>
    <h2 className="uf-section__title">{title}</h2>
    {width && (
      <span className="uf-section__width">
        {width} <small>{cm}</small>
      </span>
    )}
  </header>
);

const Spectrum = ({ sections }) => {
  const ping = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('is-pinged');
    window.clearTimeout(el.pingTimer);
    el.pingTimer = window.setTimeout(() => el.classList.remove('is-pinged'), 1800);
  };

  return (
    <div className="uf-spectrum">
      {sections.flatMap((section) =>
        section.colors.map((color, i) => (
          <button
            key={swatchId(section.id, i)}
            type="button"
            className="uf-spectrum__stripe"
            style={{ '--sw': color.hex, '--ink': inkFor(color.hex) }}
            onClick={() => ping(swatchId(section.id, i))}
            aria-label={`${color.code} ${color.name}`}
          >
            <span className="uf-spectrum__code">{color.code}</span>
          </button>
        ))
      )}
    </div>
  );
};

const ColorSection = ({ section, index, title, cm }) => {
  const ref = useReveal();

  const setGlow = (hex) => ref.current?.style.setProperty('--uf-glow', hex);

  return (
    <section
      ref={ref}
      className={`uf-section${section.metallic ? ' uf-section--metallic' : ''}`}
      onPointerLeave={() => ref.current?.style.removeProperty('--uf-glow')}
    >
      <SectionHeader index={index} title={title} width={section.width} cm={cm} />

      <ul className="uf-grid">
        {section.colors.map((color, i) => (
          <li
            key={swatchId(section.id, i)}
            id={swatchId(section.id, i)}
            className="uf-swatch"
            style={{ '--sw': color.hex, '--ink': inkFor(color.hex), '--i': i }}
            onPointerEnter={() => setGlow(color.hex)}
            tabIndex={0}
            onFocus={() => setGlow(color.hex)}
          >
            <span className="uf-swatch__fill" aria-hidden="true" />
            <span className="uf-swatch__code">{color.code}</span>
            <span className="uf-swatch__name">{color.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

const EcoSection = ({ index, title, widthLabel }) => {
  const ref = useReveal();

  return (
    <section ref={ref} className="uf-section uf-section--eco">
      <SectionHeader index={index} title={title} />

      <ul className="uf-eco-grid">
        {unifolEcoSolvent.map((film, i) => (
          <li key={film.code} className="uf-eco" style={{ '--i': i }} tabIndex={0}>
            <span
              className={[
                'uf-eco__sheet',
                `uf-eco__sheet--${film.finish}`,
                film.clear && 'uf-eco__sheet--clear',
                film.adhesive === 'grey' && 'uf-eco__sheet--grey-adhesive',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-hidden="true"
            />
            <div className="uf-eco__body">
              <span className="uf-eco__code">{film.code}</span>
              <span className="uf-eco__name">{film.name}</span>
              <div className="uf-eco__widths">
                <span className="uf-eco__widths-label">{widthLabel}:</span>
                {film.widths.map((w) => (
                  <span key={w} className="uf-eco__width">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

const PlotterCatalogPage = () => {
  const { t } = useLanguage();
  const cm = t('plotterCatalog.cm');

  return (
    <section className="plotter-catalog-page unifol-page">
      <div className="container">
        <CatalogHero title={t('plotterCatalog.title')} wide />

        <Spectrum sections={unifolColorSections} />

        {unifolColorSections.map((section, i) => (
          <ColorSection
            key={section.id}
            section={section}
            index={i + 1}
            title={t(section.titleKey)}
            cm={cm}
          />
        ))}

        <EcoSection
          index={unifolColorSections.length + 1}
          title={t('plotterCatalog.sections.ecoSolvent')}
          widthLabel={t('plotterCatalog.widthLabel')}
        />
      </div>
    </section>
  );
};

export default PlotterCatalogPage;
