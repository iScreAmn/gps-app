import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CookieConsentContext, readStoredConsent, writeStoredConsent } from './cookieConsent';
import { clearAnalyticsCookies, loadGoogleAnalytics, setAnalyticsEnabled } from '../utils/analytics';

export const CookieConsentProvider = ({ children }) => {
  const [consent, setConsent] = useState(readStoredConsent);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const analyticsAllowed = consent?.analytics === true;
  const externalMediaAllowed = consent?.externalMedia === true;
  const hasDecision = consent !== null;

  const consentRef = useRef(consent);
  useEffect(() => {
    consentRef.current = consent;
  }, [consent]);

  useEffect(() => {
    setAnalyticsEnabled(analyticsAllowed);

    if (analyticsAllowed) {
      loadGoogleAnalytics();
    } else {
      clearAnalyticsCookies();
    }
  }, [analyticsAllowed]);

  const commit = useCallback((choice) => {
    setConsent(writeStoredConsent(choice));
    setIsSettingsOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    commit({ analytics: true, externalMedia: true });
  }, [commit]);

  const rejectOptional = useCallback(() => {
    commit({ analytics: false, externalMedia: false });
  }, [commit]);

  const savePreferences = useCallback(
    (preferences) => {
      commit({
        analytics: preferences?.analytics === true,
        externalMedia: preferences?.externalMedia === true,
      });
    },
    [commit]
  );

  const allowExternalMedia = useCallback(() => {
    commit({
      analytics: consentRef.current?.analytics === true,
      externalMedia: true,
    });
  }, [commit]);

  const openSettings = useCallback(() => setIsSettingsOpen(true), []);
  const closeSettings = useCallback(() => setIsSettingsOpen(false), []);

  const value = useMemo(
    () => ({
      consent,
      hasDecision,
      analyticsAllowed,
      externalMediaAllowed,
      isSettingsOpen,
      isBannerVisible: !hasDecision,
      acceptAll,
      rejectOptional,
      savePreferences,
      allowExternalMedia,
      openSettings,
      closeSettings,
    }),
    [
      consent,
      hasDecision,
      analyticsAllowed,
      externalMediaAllowed,
      isSettingsOpen,
      acceptAll,
      rejectOptional,
      savePreferences,
      allowExternalMedia,
      openSettings,
      closeSettings,
    ]
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
};
