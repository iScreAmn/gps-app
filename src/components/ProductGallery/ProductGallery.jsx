import React, { useState, useRef, useCallback, useEffect } from 'react';
import Carousel from '../Carousel/Carousel';
import { getProductItems } from '../../data/contentData';
import { useLanguage } from '../../hooks/useLanguage';
import './ProductGallery.css';
import { productGarmin } from '../../assets/images';

const ProductGallery = () => {
  const { t } = useLanguage();
  const productItems = getProductItems();

  // State for image gallery - must be at top level
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isChangingImage, setIsChangingImage] = useState(false);
  const imageRef = useRef(null);
  const zoomRef = useRef(null);

  // Check if device is mobile
  const isMobile = useCallback(() => {
    return window.innerWidth <= 767;
  }, []);

  // Handle thumbnail click
  const handleThumbnailClick = useCallback((index) => {
    if (index === activeImageIndex) return;
    
    setIsChangingImage(true);
    setIsZooming(false);
    
    // Small delay for smooth transition
    setTimeout(() => {
      setActiveImageIndex(index);
      setIsChangingImage(false);
    }, 150);
  }, [activeImageIndex]);

  // Handle mouse enter on main image
  const handleMouseEnter = useCallback(() => {
    if (!isMobile()) {
      setIsZooming(true);
    }
  }, [isMobile]);

  // Handle mouse leave from main image
  const handleMouseLeave = useCallback(() => {
    setIsZooming(false);
  }, []);

  // Handle mouse move on main image
  const handleMouseMove = useCallback((e) => {
    if (!imageRef.current || !isZooming || isMobile()) return;

    // Get the image container rect for positioning
    const containerRect = imageRef.current.parentElement.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;
    
    // Get the actual image dimensions within the container
    const imageRect = imageRef.current.getBoundingClientRect();
    const imageX = e.clientX - imageRect.left;
    const imageY = e.clientY - imageRect.top;
    
    // Ensure coordinates are within image bounds
    const boundedX = Math.max(0, Math.min(imageX, imageRect.width));
    const boundedY = Math.max(0, Math.min(imageY, imageRect.height));
    
    // Calculate percentage position for zoom (0-100%)
    const xPercent = (boundedX / imageRect.width) * 100;
    const yPercent = (boundedY / imageRect.height) * 100;
    
    // For zoom overlay, we need to show a 2x zoomed portion of the image
    // The zoom overlay is 400x400px, so we need to show a 200x200px area from the original image
    // Position the background so the area under cursor appears in the center of the zoom overlay
    // Since we're using transform, we need to offset by half the zoom area to center it
    setZoomPosition({
      x: -xPercent + 25, // Offset by 25% to center the 50% zoom area
      y: -yPercent + 25
    });

    // Update mouse position for zoom indicator (relative to image container)
    setMousePosition({ 
      x: x, 
      y: y 
    });
  }, [isZooming, isMobile]);

  // Handle window resize to disable zoom on mobile
  useEffect(() => {
    const handleResize = () => {
      if (isMobile() && isZooming) {
        setIsZooming(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, isZooming]);

  if (!productItems.length) {
    return (
      <section className="product-gallery">
        <div className="container">
          <div className="product-gallery-empty">
            <p>No products available</p>
          </div>
        </div>
      </section>
    );
  }

  // Get the first product for detailed view
  const featuredProduct = productItems[0];
  const productData = featuredProduct?.product;
  const productImage = featuredProduct?.image;

  // Create array of images (using same image for demo, but structure for multiple)
  const images = [
    { src: productImage?.src || productGarmin, alt: productImage?.alt || 'Product image' },
    { src: productImage?.src || productGarmin, alt: 'Product image 2' },
    { src: productImage?.src || productGarmin, alt: 'Product image 3' },
    { src: productImage?.src || productGarmin, alt: 'Product image 4' },
    { src: productImage?.src || productGarmin, alt: 'Product image 5' },
    { src: productImage?.src || productGarmin, alt: 'Product image 6' }
  ];

  return (
    <section className="product-gallery">
      <div className="container">
        <h2 className='section-title'>{t('products.title')}</h2>
        <Carousel 
          slides={productItems}
          autoPlay={false}
          autoPlayInterval={6000}
          showDots={true}
          showArrows={true}
          className="product-carousel"
        />

        <div className="product__gallery-features">
          <div className="product__wrapper">
            <div className="product__image-section">
              <div className="product__thumbnails">
                {images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`product__thumbnail ${index === activeImageIndex ? 'active' : ''}`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                    />
                  </div>
                ))}
              </div>
              <div className="product__main-image">
                <div 
                  className="product__image-container"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                >
                  <img 
                    ref={imageRef}
                    src={images[activeImageIndex].src} 
                    alt={images[activeImageIndex].alt} 
                    className={`main-product-image ${isChangingImage ? 'changing' : ''}`}
                  />
                  
                  {/* Zoom indicator square */}
                  {isZooming && (
                    <div 
                      className="zoom-indicator"
                      style={{
                        left: mousePosition.x,
                        top: mousePosition.y,
                      }}
                    />
                  )}
                  
                  {/* Zoomed image overlay */}
                  {isZooming && (
                    <div className="zoom-overlay">
                      <div 
                        ref={zoomRef}
                        className="zoomed-image"
                        style={{
                          backgroundImage: `url(${images[activeImageIndex].src})`,
                          transform: `translate(${zoomPosition.x}%, ${zoomPosition.y}%)`,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="product__info">
              <div className="product__badge">
                <span className="product__discount">{t('products.discount', 'თქვენი დაზოგვა 15%')}</span>
              </div>
              
              <div className="product__header">
                <h1 className="product__title">{t(productData?.title)}</h1>
                <div className="product__brand">
                  <span className="brand-name">{t(productData?.subtitle)}</span>
                  <span className="product__code">{t('products.code', 'კოდი')}: {productData?.subtitle}</span>
                </div>
              </div>

              

              <div className="product__pricing">
                <div className="price-section">
                  <span className="current-price">18,500.00 ₾</span>
                  <span className="original-price">21,679.00 ₾</span>
                </div>
              </div>

              <div className="product__actions">
                <div className="quantity-section">
                  <label htmlFor="quantity">{t('products.quantity', 'რაოდენობა')}:</label>
                  <div className="quantity-controls">
                    <button className="quantity-btn minus" type="button">−</button>
                    <input 
                      type="number" 
                      id="quantity" 
                      className="quantity-input" 
                      defaultValue="1" 
                      min="1"
                    />
                    <button className="quantity-btn plus" type="button">+</button>
                  </div>
                </div>

                <button className="add-to-cart-btn">{t('products.addToCart', 'კალათაში')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default ProductGallery;
