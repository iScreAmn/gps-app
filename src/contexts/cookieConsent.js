import { createContext } from 'react';

export const CONSENT_STORAGE_KEY = 'gps-cookie-consent';

/** Bump this whenever the meaning of a category changes: stored consent
 *  from an older schema is treated as missing and the banner returns. */
export const CONSENT_VERSION = 1;

export const CookieConsentContext = createContext(null);

export const readStoredConsent = () => {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    if (parsed.version !== CONSENT_VERSION) return null;

    return {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: parsed.analytics === true,
      externalMedia: parsed.externalMedia === true,
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : null,
    };
  } catch {
    return null;
  }
};

export const writeStoredConsent = ({ analytics, externalMedia }) => {
  const record = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: analytics === true,
    externalMedia: externalMedia === true,
    updatedAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Private mode or a full quota: consent still applies for this session.
  }

  return record;
};
