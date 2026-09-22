export const GA_MEASUREMENT_ID = 'G-T5QR8S0LHK';

const GA_SCRIPT_ID = 'ga4-gtag';
const GA_DISABLE_FLAG = `ga-disable-${GA_MEASUREMENT_ID}`;
const GA_COOKIE_PATTERN = /^(_ga|_gid|_gat|_gcl_au)/;

let loadPromise = null;

const ensureGtagStub = () => {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }
};

/**
 * Injects gtag.js on demand. Safe to call repeatedly: the script is appended
 * once and every caller receives the same promise.
 */
export const loadGoogleAnalytics = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.resolve(false);
  }

  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve) => {
    ensureGtagStub();
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });

    const script = document.createElement('script');
    script.id = GA_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.addEventListener('load', () => resolve(true), { once: true });
    script.addEventListener('error', () => resolve(false), { once: true });
    document.head.appendChild(script);
  });

  return loadPromise;
};

export const isAnalyticsLoaded = () => loadPromise !== null;

/**
 * Flips the opt-out flag gtag.js checks before every hit, so a revoked
 * consent stops tracking even though the script stays in the document.
 */
export const setAnalyticsEnabled = (enabled) => {
  if (typeof window === 'undefined') return;
  window[GA_DISABLE_FLAG] = !enabled;
};

export const trackPageView = ({ pagePath, pageLocation, pageTitle }) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  if (window[GA_DISABLE_FLAG]) return;

  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_location: pageLocation,
    page_title: pageTitle,
  });
};

/**
 * Best-effort removal of the JS-readable GA cookies. HttpOnly cookies and
 * cookies scoped to another path cannot be reached from here.
 */
export const clearAnalyticsCookies = () => {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  const names = document.cookie
    .split(';')
    .map((entry) => entry.split('=')[0].trim())
    .filter((name) => name && GA_COOKIE_PATTERN.test(name));

  if (names.length === 0) return;

  const { hostname, pathname } = window.location;
  const hostParts = hostname.split('.');
  const domains = [null, hostname];
  for (let i = 0; i < hostParts.length - 1; i += 1) {
    domains.push(`.${hostParts.slice(i).join('.')}`);
  }

  const paths = ['/'];
  pathname.split('/').reduce((prefix, segment) => {
    if (!segment) return prefix;
    const next = `${prefix}/${segment}`;
    paths.push(next);
    return next;
  }, '');

  names.forEach((name) => {
    paths.forEach((path) => {
      domains.forEach((domain) => {
        const domainPart = domain ? `; domain=${domain}` : '';
        document.cookie = `${name}=; path=${path}${domainPart}; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
      });
    });
  });
};
