import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { searchProducts, createDebouncedSearch } from '../../../utils/productSearch';
import { getSearchableProducts } from '../../../data/searchableProducts';
import { useLanguage } from '../../../hooks/useLanguage';
import './SearchDropdown.css';

const STORAGE_KEY = 'gps_search_query';

export default function SearchDropdown() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const wrapperRef = useRef(null);

  const products = useMemo(() => getSearchableProducts(language, t), [language, t]);
  const [query, setQuery] = useState(() => searchParams.get('q') || localStorage.getItem(STORAGE_KEY) || '');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const search = useMemo(
    () => createDebouncedSearch(products, (res) => setResults(res), { delay: 300 }),
    [products]
  );

  useEffect(() => {
    if (query.trim()) {
      search(query);
    } else {
      setResults([]);
    }
  }, [query, search]);

  useEffect(() => {
    const urlQ = searchParams.get('q');
    const stored = localStorage.getItem(STORAGE_KEY);
    setQuery(urlQ || stored || '');
  }, [searchParams]);

  const saveQuery = (q) => {
    if (q.trim()) localStorage.setItem(STORAGE_KEY, q);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setIsOpen(true);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsOpen(true);
  };

  const handleResultClick = (product) => {
    saveQuery(query);
    setIsOpen(false);
    navigate(product.link);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      saveQuery(q);
      navigate(`/${language}/catalog?q=${encodeURIComponent(q)}`);
      setIsOpen(false);
    }
  };

  const handleClickOutside = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      e.target.blur();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayResults = query.trim() ? results : products;
  const showDropdown = isOpen && (isFocused || query.trim());
  const hasQuery = query.trim().length > 0;

  return (
    <div className="search-dropdown" ref={wrapperRef}>
      <form className="search-dropdown__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-dropdown__input"
          placeholder={t('header.searchPlaceholder')}
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          autoComplete="off"
        />
        <button type="submit" className="search-dropdown__btn" aria-label="Search">
          <FaSearch />
        </button>
      </form>

      {showDropdown && (
        <div className="search-dropdown__panel" role="listbox">
          {hasQuery && displayResults.length === 0 ? (
            <div className="search-dropdown__empty">{t('catalog.no_products')}</div>
          ) : (
            <ul className="search-dropdown__list">
              {displayResults.slice(0, 8).map((product) => (
                <li key={product.id}>
                  <button
                    type="button"
                    className="search-dropdown__item"
                    onClick={() => handleResultClick(product)}
                    role="option"
                  >
                    <div className="search-dropdown__item-thumb">
                      <img src={product.image} alt="" />
                    </div>
                    <div className="search-dropdown__item-body">
                      <span className="search-dropdown__item-name">{product.name}</span>
                      <span className="search-dropdown__item-brand">{product.brand}</span>
                      {product.price && (
                        <span className="search-dropdown__item-price">{product.price}</span>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
