import React, { useState, useCallback } from 'react';
import { motion } from "motion/react";
import { useLanguage } from '../../hooks/useLanguage';
import { 
  getSpecialOffersByCategory, 
  getSpecialOffersCategories 
} from '../../data/contentData';
import './SpecialOffers.css';

const SpecialOffers = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('promotions');

  // Get all special offers categories
  const allCategories = getSpecialOffersCategories();
  
  // Category definitions with proper translations
  const categories = [
    { id: 'promotions', key: 'specialOffers.categories.promotions' },
    { id: 'discounts', key: 'specialOffers.categories.discounts' },
    { id: 'seasonal', key: 'specialOffers.categories.seasonal' },
    { id: 'bundles', key: 'specialOffers.categories.bundles' }
  ].filter(category => allCategories.includes(category.id));

  // Get filtered offers based on active category
  const getFilteredOffers = useCallback(() => {
    return getSpecialOffersByCategory(activeCategory);
  }, [activeCategory]);

  const filteredOffers = getFilteredOffers();

  // Handle category change
  const handleCategoryChange = useCallback((categoryId) => {
    setActiveCategory(categoryId);
  }, []);

  // Format valid until date
  const formatValidUntil = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Render offer card based on type
  const renderOfferCard = (offer) => {
    const commonProps = {
      className: `special-offer-card special-offer-card--${offer.type}`,
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: "easeInOut" },
      whileHover: { y: -5, scale: 1.02 },
    };

    return (
      <motion.div key={offer.id} {...commonProps}>
        {/* Offer Badge */}
        {offer.badge && (
          <div className="offer-badge">
            <span>{t(offer.badge)}</span>
          </div>
        )}

        {/* Discount Badge */}
        {offer.discount && (
          <div className="discount-badge">
            <span>{offer.discount}</span>
          </div>
        )}

        {/* Offer Image */}
        <div className="offer-image">
          <img 
            src={offer.image.src} 
            alt={offer.image.alt || t(offer.title)} 
          />
          <div className="offer-image-overlay"></div>
        </div>

        {/* Offer Content */}
        <div className="offer-content">
          <div className="offer-header">
            <h3 className="offer-title">{t(offer.title)}</h3>
            <p className="offer-subtitle">{t(offer.subtitle)}</p>
          </div>

          <p className="offer-description">
            {t(offer.description)}
          </p>

          {/* Bundle Pricing */}
          {offer.type === 'bundle' && offer.originalPrice && offer.bundlePrice && (
            <div className="bundle-pricing">
              <div className="pricing-row">
                <span className="original-price">
                  Regular: <span className="price-value">{offer.originalPrice}</span>
                </span>
                <span className="bundle-price">
                  Bundle: <span className="price-value">{offer.bundlePrice}</span>
                </span>
              </div>
              {offer.savings && (
                <div className="savings-highlight">
                  You save: <span className="savings-amount">{offer.savings}</span>
                </div>
              )}
            </div>
          )}

          {/* Bundle Includes */}
          {offer.includes && offer.includes.length > 0 && (
            <div className="bundle-includes">
              <h4 className="includes-title">Includes:</h4>
              <ul className="includes-list">
                {offer.includes.slice(0, 2).map((item, index) => (
                  <li key={index} className="include-item">
                    <span className="include-icon">✓</span>
                    <span className="include-text">{t(item)}</span>
                  </li>
                ))}
                {offer.includes.length > 2 && (
                  <li className="include-item include-more">
                    <span className="include-icon">+</span>
                    <span className="include-text">
                      {offer.includes.length - 2} more items
                    </span>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Features */}
          {offer.features && offer.features.length > 0 && (
            <div className="offer-features">
              <ul className="features-list">
                {offer.features.slice(0, 2).map((feature, index) => (
                  <li key={index} className="feature-item">
                    <span className="feature-icon">★</span>
                    <span className="feature-text">{t(feature)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Additional Info */}
          <div className="offer-meta">
            {offer.validUntil && (
              <div className="valid-until">
                <span className="meta-label">Valid until:</span>
                <span className="meta-value">{formatValidUntil(offer.validUntil)}</span>
              </div>
            )}
            {offer.minQuantity && (
              <div className="min-quantity">
                <span className="meta-label">Minimum quantity:</span>
                <span className="meta-value">{offer.minQuantity} units</span>
              </div>
            )}
            {offer.requirements && (
              <div className="requirements">
                <span className="meta-label">Requirements:</span>
                <span className="meta-value">{offer.requirements}</span>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div className="offer-cta">
            <motion.a
              href={offer.ctaLink}
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {t(offer.cta)}
            </motion.a>
          </div>
        </div>
      </motion.div>
    );
  };

  if (!filteredOffers.length) {
    return (
      <section className="special-offers">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('specialOffers.section.title')}</h2>
            <p className="section-subtitle">{t('specialOffers.section.subtitle')}</p>
          </div>

          {/* Category Filter Buttons */}
          <div className="offers-category-filters">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`category-filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {t(category.key)}
              </motion.button>
            ))}
          </div>

          <div className="no-offers-message">
            <p>No special offers available in this category at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="special-offers">
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <h2 className="section-title">{t('specialOffers.section.title')}</h2>
          <p className="section-subtitle">{t('specialOffers.section.subtitle')}</p>
        </motion.div>

        {/* Category Filter Buttons */}
        <motion.div 
          className="offers-category-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`category-filter-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {t(category.key)}
            </motion.button>
          ))}
        </motion.div>

        {/* Offers Grid */}
        <motion.div 
          className="special-offers-grid"
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {filteredOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeInOut" 
              }}
            >
              {renderOfferCard(offer)}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOffers;
