import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageAmbientBackground from '../../components/PageAmbientBackground/PageAmbientBackground';
import LedModules from '../../components/LedModules/LedModules';
import LedsHelpCta from '../../components/LedsHelpCta/LedsHelpCta';
import LedsCategories from './LedsCategories';
import LedsHero from './LedsHero';
import './LedsPage.css';

const LedsPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Hero CTA opens the modules page on the matching product
  const handleViewDetails = useCallback(
    (id) => {
      const langPrefix = pathname.match(/^\/(en|ka)(?=\/|$)/)?.[0] ?? '';
      navigate(`${langPrefix}/leds/modules#led-${id}`);
    },
    [navigate, pathname]
  );

  return (
    <div className="leds-page page-ambient-shell">
      <PageAmbientBackground />

      <LedModules />

      <LedsHero onViewDetails={handleViewDetails} />

      <LedsCategories />

      <LedsHelpCta />
    </div>
  );
};

export default LedsPage;
