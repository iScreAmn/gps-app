/**
 * Product search utility — pure JS, production-ready.
 * Search by: name/title, brand, category, description, features.
 * Case-insensitive, partial match (includes), relevance sorting, debounce.
 */

const SEARCH_FIELDS = ['name', 'title', 'brand', 'category', 'description', 'subtitle'];
const DEBOUNCE_DELAY = 300;

/**
 * Extracts searchable text from product.
 * Handles both flat structure and nested (e.g. productGalleryFeatures).
 * @param {Object} item - Product or gallery item with optional nested `product`
 * @param {Function} [resolveKey] - Optional i18n resolver: (key) => string
 * @returns {string}
 */
function getSearchableText(item, resolveKey = (v) => v) {
  const p = item.product ?? item;
  const parts = [];

  for (const field of SEARCH_FIELDS) {
    const val = p[field] ?? item[field];
    if (val != null && val !== '') {
      parts.push(typeof val === 'string' ? resolveKey(val) : '');
    }
  }

  const features = p.features ?? item.features;
  if (Array.isArray(features)) {
    features.forEach((f) => {
      parts.push(typeof f === 'string' ? resolveKey(f) : '');
    });
  }

  return parts.join(' ').toLowerCase();
}

/**
 * Computes relevance score for sorting.
 * Higher = more relevant.
 */
function getRelevanceScore(product, query, searchText, resolveKey) {
  const text = searchText || getSearchableText(product, resolveKey);
  const q = query.toLowerCase().trim();
  if (!q) return 0;

  let score = 0;
  const p = product.product ?? product;

  const getVal = (field) => {
    const v = p[field] ?? product[field];
    return (typeof v === 'string' ? resolveKey(v) : '').toLowerCase();
  };

  const name = getVal('name') || getVal('title') || '';
  const brand = getVal('brand') || '';
  const category = getVal('category') || '';
  const description = getVal('description') || '';

  if (name === q) score += 100;
  else if (name.startsWith(q)) score += 50;
  else if (name.includes(q)) score += 25;

  if (brand === q) score += 80;
  else if (brand.startsWith(q)) score += 40;
  else if (brand.includes(q)) score += 20;

  if (category === q) score += 60;
  else if (category.startsWith(q)) score += 30;
  else if (category.includes(q)) score += 15;

  if (description.includes(q)) score += 10;

  const features = p.features ?? product.features ?? [];
  if (Array.isArray(features)) {
    features.forEach((f) => {
      const s = typeof f === 'string' ? resolveKey(f).toLowerCase() : '';
      if (s.includes(q)) score += 5;
    });
  }

  return score;
}

/**
 * Search products by query.
 * @param {Object[]} products - Array of products
 * @param {string} query - Search query (empty = all products)
 * @param {Object} [options]
 * @param {Function} [options.resolveKey] - i18n: (key) => string
 * @returns {Object[]} Filtered and sorted products
 */
export function searchProducts(products, query, options = {}) {
  if (!Array.isArray(products)) return [];
  const resolveKey = options.resolveKey ?? ((k) => (typeof k === 'string' ? k : ''));

  const q = query.trim().toLowerCase();
  if (!q) return [...products];

  const withScores = products
    .map((product) => {
      const text = getSearchableText(product, resolveKey);
      if (!text.includes(q)) return null;
      const score = getRelevanceScore(product, query, text, resolveKey);
      return { product, score };
    })
    .filter(Boolean);

  return withScores
    .sort((a, b) => b.score - a.score)
    .map(({ product }) => product);
}

/**
 * Debounce function.
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export function debounce(fn, delay = DEBOUNCE_DELAY) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Creates debounced search handler for input.
 * @param {Object[]} products
 * @param {Function} onResults - (results: Object[]) => void
 * @param {Object} [options]
 * @param {Function} [options.resolveKey]
 * @param {number} [options.delay]
 * @returns {Function} (query: string) => void — call on input change
 */
export function createDebouncedSearch(products, onResults, options = {}) {
  const { resolveKey, delay = DEBOUNCE_DELAY } = options;
  const debounced = debounce((query) => {
    const results = searchProducts(products, query, { resolveKey });
    onResults(results);
  }, delay);
  return debounced;
}

/**
 * Connect search to a vanilla input (e.g. in header/catalog).
 * @example
 * // HTML: <input type="text" id="search" placeholder="Search products">
 *
 * import { connectSearchInput } from '../utils/productSearch';
 * import { getProductGalleryFeatures } from '../data/contentData';
 * import i18n from '../i18n';
 *
 * const products = getProductGalleryFeatures();
 * const resolveKey = (key) => i18n.t(key);
 * connectSearchInput('search', products, (results) => {
 *   console.log(results);
 *   // update UI: setState, render list, etc.
 * }, { resolveKey });
 */
export function connectSearchInput(inputId, products, onResults, options = {}) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const search = createDebouncedSearch(products, onResults, options);
  input.addEventListener('input', (e) => search(e.target.value));
  input.addEventListener('change', (e) => search(e.target.value));
}
