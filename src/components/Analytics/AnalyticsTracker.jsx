import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useCookieConsent } from '../../hooks/useCookieConsent';
import { loadGoogleAnalytics, trackPageView } from '../../utils/analytics';

export default function AnalyticsTracker() {
  const location = useLocation();
  const { analyticsAllowed } = useCookieConsent();

  // Survives the StrictMode effect replay, so one navigation is one page_view.
  const lastPagePathRef = useRef(null);

  useEffect(() => {
    if (!analyticsAllowed) {
      lastPagePathRef.current = null;
      return;
    }

    const pagePath = location.pathname + location.search;
    if (lastPagePathRef.current === pagePath) return;
    lastPagePathRef.current = pagePath;

    loadGoogleAnalytics().then((ready) => {
      if (!ready) return;
      trackPageView({
        pagePath,
        pageLocation: window.location.href,
        pageTitle: document.title,
      });
    });
  }, [analyticsAllowed, location.pathname, location.search]);

  return null;
}
