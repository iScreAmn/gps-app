import React from 'react';
import '../../styles/pageAmbientBackground.css';

const PageAmbientBackground = () => (
  <div className="info-bg-layer" aria-hidden>
    <div className="info-orb info-orb-1" />
    <div className="info-orb info-orb-2" />
    <div className="info-orb info-orb-3" />
    <div className="info-grid-overlay" />
  </div>
);

export default PageAmbientBackground;
