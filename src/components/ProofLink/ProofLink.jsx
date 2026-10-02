import React from 'react';
import { Link } from 'react-router-dom';
import './ProofLink.css';

// Print-proof button: crop marks spread, ink rolls in, label misregisters on hover
const ProofLink = ({ to, label, className = '' }) => (
  <Link to={to} className={`proof-link ${className}`.trim()}>
    <span className="proof-link__crop proof-link__crop--tl" aria-hidden="true" />
    <span className="proof-link__crop proof-link__crop--tr" aria-hidden="true" />
    <span className="proof-link__crop proof-link__crop--bl" aria-hidden="true" />
    <span className="proof-link__crop proof-link__crop--br" aria-hidden="true" />

    <span className="proof-link__label" data-text={label}>
      {label}
    </span>

    <span className="proof-link__arrow" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  </Link>
);

export default ProofLink;
