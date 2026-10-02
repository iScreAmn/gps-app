import React from 'react';
import './SpecSheet.css';

// Short measurements (3200mm, 6600W, 720 მმ…) become headline tiles; prose stays in the ruled rows
const KEY_SPEC_MAX_LENGTH = 22;
const KEY_SPEC_COUNT = 4;
const MEASUREMENT = /^[\d.]|\d\s?(mm|cm|m|kg|g|w|dpi|მმ|სმ|მ|კგ|ვტ)(?![\p{L}])/iu;

const pad = (n) => String(n).padStart(2, '0');
// GPS Mt has no "×" glyph — it renders as a blank, so dimensions fall back to a plain "x"
const clean = (text) => String(text).replace(/×/g, 'x');

// `specs` is a list of [label, value] pairs; `highlight` turns the first few measurements into tiles
export const SpecSheet = ({ title, specs: rawSpecs, highlight = true }) => {
  if (!rawSpecs?.length) return null;

  const specs = rawSpecs.map(([label, value]) => [clean(label), clean(value)]);
  const keySpecs = highlight
    ? specs.filter(([, value]) => value.length <= KEY_SPEC_MAX_LENGTH && MEASUREMENT.test(value)).slice(0, KEY_SPEC_COUNT)
    : [];
  const rows = specs.filter((spec) => !keySpecs.includes(spec));

  return (
    <section className="spec-sheet">
      <h2 className="showcase__section-title">
        {title}
        <span className="spec-sheet__count">{pad(specs.length)}</span>
      </h2>

      {keySpecs.length > 0 && (
        <ul className="spec-sheet__keys">
          {keySpecs.map(([label, value], i) => (
            <li key={label} className="spec-sheet__key" style={{ '--i': i }}>
              <span className="spec-sheet__key-value">{value}</span>
              <span className="spec-sheet__key-label">{label}</span>
            </li>
          ))}
        </ul>
      )}

      {rows.length > 0 && (
        <dl className="spec-sheet__sheet">
          {rows.map(([label, value], i) => (
            <div key={`${label}-${i}`} className="spec-sheet__row">
              <span className="spec-sheet__index" aria-hidden="true">{pad(keySpecs.length + i + 1)}</span>
              <dt className="spec-sheet__label">{label}</dt>
              <dd className="spec-sheet__value">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
};

export const FeatureList = ({ title, items }) => {
  if (!items?.length) return null;

  return (
    <section className="spec-sheet">
      <h2 className="showcase__section-title">
        {title}
        <span className="spec-sheet__count">{pad(items.length)}</span>
      </h2>
      <ul className="spec-sheet__features">
        {items.map((item) => (
          <li key={item} className="spec-sheet__feature">{clean(item)}</li>
        ))}
      </ul>
    </section>
  );
};
