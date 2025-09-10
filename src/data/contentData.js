import { 
  productGarmin, 
  productTrimble, 
  productLeica,
  printer4
} from '../assets/images';

/**
 * СИСТЕМА УПРАВЛЕНИЯ КОНТЕНТОМ ДЛЯ GPS-APP
 * 
 * Вспомогательные функции для создания элементов контента:
 * 
 * createSlide(id, type, data) - создает слайд любого типа
 * createContentSlide(id, content, backgroundImage) - создает контентный слайд с текстом
 * createImageSlide(id, image, content) - создает слайд с изображением и контентом
 * createProductSlide(id, product, image) - создает слайд продукта
 * createServiceSlide(id, service, backgroundImage) - создает слайд услуги
 * createCategory(id, category) - создает категорию
 * 
 * Все элементы контента поддерживают:
 * - title/subtitle - заголовки (ключи для переводов)
 * - cta/ctaLink - кнопки призыва к действию
 * - изображения (импортированные или пути)
 * - дополнительные свойства (features, description, etc.)
 */

// Вспомогательные функции для работы с контентом
export const createSlide = (id, type, data) => ({
  id,
  type,
  ...data
});

export const createContentSlide = (id, content, backgroundImage = null) => 
  createSlide(id, 'content', { content, backgroundImage });

export const createImageSlide = (id, image, content) => 
  createSlide(id, 'image', { image, content });

export const createProductSlide = (id, product, image) => 
  createSlide(id, 'product', { product, image });

export const createServiceSlide = (id, service, backgroundImage = null) => 
  createSlide(id, 'service', { service, backgroundImage });

export const createCategory = (id, category) => ({
  id,
  ...category
});

// Основной контент приложения
export const gpsContent = {
  // Карусель на главной странице
  carousel: {
    slides: [
      createContentSlide('office-hero', {
        title: 'hero.office.title',
        subtitle: 'hero.office.subtitle',
        cta: 'hero.office.cta',
        ctaLink: '/catalog/office'
      }, {
        src: productLeica,
        alt: 'Office GPS Equipment Background'
      }),
      
      createImageSlide('professional-equipment', 
        {
          src: productGarmin,
          alt: 'Professional GPS Equipment'
        },
        {
          title: 'hero.professional.title',
          subtitle: 'hero.professional.subtitle',
          cta: 'hero.professional.cta',
          ctaLink: '/catalog/professional'
        }
      ),
      
      createImageSlide('industrial-solutions',
        {
          src: productTrimble,
          alt: 'Industrial GPS Solutions'
        },
        {
          title: 'hero.industrial.title',
          subtitle: 'hero.industrial.subtitle',
          cta: 'hero.industrial.cta',
          ctaLink: '/catalog/industrial'
        }
      ),
      
      createContentSlide('support-services', {
        title: 'hero.support.title',
        subtitle: 'hero.support.subtitle',
        cta: 'hero.support.cta',
        ctaLink: '/services'
      }, {
        src: printer4,
        alt: 'GPS Support Services Background'
      })
    ],
    autoPlay: true,
    autoPlayInterval: 5000,
    showDots: true,
    showArrows: true
  },

  // Секция продуктов
  products: {
    title: 'products.section.title',
    subtitle: 'products.section.subtitle',
    items: [
      createProductSlide('garmin-gps', {
        title: 'products.garmin.title',
        subtitle: 'products.garmin.subtitle',
        description: 'products.garmin.description',
        features: [
          'products.garmin.feature1',
          'products.garmin.feature2', 
          'products.garmin.feature3'
        ],
        cta: 'products.garmin.cta',
        ctaLink: '/products/garmin-gps',
        price: 'products.garmin.price'
      }, {
        src: productGarmin,
        alt: 'Garmin GPS Device'
      }),
      
      createProductSlide('trimble-surveying', {
        title: 'products.trimble.title',
        subtitle: 'products.trimble.subtitle',
        description: 'products.trimble.description',
        features: [
          'products.trimble.feature1',
          'products.trimble.feature2',
          'products.trimble.feature3'
        ],
        cta: 'products.trimble.cta',
        ctaLink: '/products/trimble-surveying',
        price: 'products.trimble.price'
      }, {
        src: productTrimble,
        alt: 'Trimble Surveying Equipment'
      }),
      
      createProductSlide('leica-total-station', {
        title: 'products.leica.title',
        subtitle: 'products.leica.subtitle',
        description: 'products.leica.description',
        features: [
          'products.leica.feature1',
          'products.leica.feature2',
          'products.leica.feature3'
        ],
        cta: 'products.leica.cta',
        ctaLink: '/products/leica-total-station',
        price: 'products.leica.price'
      }, {
        src: productLeica,
        alt: 'Leica Total Station'
      })
    ],
    cta: {
      text: 'products.section.viewAll',
      link: '/catalog'
    }
  },

  // Секция услуг
  services: {
    title: 'services.section.title',
    subtitle: 'services.section.subtitle',
    items: [
      createServiceSlide('maintenance-service', {
        title: 'services.maintenance.title',
        subtitle: 'services.maintenance.subtitle',
        description: 'services.maintenance.description',
        features: [
          'services.maintenance.feature1',
          'services.maintenance.feature2',
          'services.maintenance.feature3'
        ],
        cta: 'services.maintenance.cta',
        ctaLink: '/services/maintenance',
        icon: 'MdBuild'
      }, {
        src: '/api/placeholder/600/400',
        alt: 'Equipment Maintenance Service'
      }),
      
      createServiceSlide('training-service', {
        title: 'services.training.title',
        subtitle: 'services.training.subtitle',
        description: 'services.training.description',
        features: [
          'services.training.feature1',
          'services.training.feature2',
          'services.training.feature3'
        ],
        cta: 'services.training.cta',
        ctaLink: '/services/training',
        icon: 'MdSchool'
      }, {
        src: '/api/placeholder/600/400',
        alt: 'Technical Training Service'
      }),
      
      createServiceSlide('consultation-service', {
        title: 'services.consultation.title',
        subtitle: 'services.consultation.subtitle',
        description: 'services.consultation.description',
        features: [
          'services.consultation.feature1',
          'services.consultation.feature2',
          'services.consultation.feature3'
        ],
        cta: 'services.consultation.cta',
        ctaLink: '/services/consultation',
        icon: 'MdSupportAgent'
      }, {
        src: '/api/placeholder/600/400',
        alt: 'Technical Consultation Service'
      })
    ],
    cta: {
      text: 'services.section.viewAll',
      link: '/services'
    }
  },

  // Секция About
  about: {
    title: 'about.section.title',
    description: 'about.section.description',
    cta: {
      text: 'about.section.learnMore',
      link: '/about'
    }
  },

  // Категории продуктов
  categories: {
    title: 'categories.section.title',
    subtitle: 'categories.section.subtitle',
    items: [
      createCategory('office-gps', {
        name: 'categories.office.name',
        description: 'categories.office.description',
        icon: 'MdLocationOn',
        link: '/catalog/office',
        image: {
          src: '/api/placeholder/300/200',
          alt: 'Office GPS Equipment'
        }
      }),
      
      createCategory('professional-equipment', {
        name: 'categories.professional.name',
        description: 'categories.professional.description',
        icon: 'MdEngineering',
        link: '/catalog/professional',
        image: {
          src: '/api/placeholder/300/200',
          alt: 'Professional GPS Equipment'
        }
      }),
      
      createCategory('industrial-solutions', {
        name: 'categories.industrial.name',
        description: 'categories.industrial.description',
        icon: 'MdPrecisionManufacturing',
        link: '/catalog/industrial',
        image: {
          src: '/api/placeholder/300/200',
          alt: 'Industrial GPS Solutions'
        }
      })
    ]
  }
};

// Экспорт по умолчанию
export default gpsContent;

// Утилитарные функции для работы с контентом в стиле law-firm
export const getCarouselSlides = () => {
  return gpsContent.carousel.slides;
};

export const getProductItems = () => {
  return gpsContent.products.items;
};

export const getServiceItems = () => {
  return gpsContent.services.items;
};

export const getCategoryItems = () => {
  return gpsContent.categories.items;
};

export const getSectionContent = (sectionName) => {
  return gpsContent[sectionName] || {};
};

// Функции для добавления нового контента
export const addCarouselSlide = (slide) => {
  gpsContent.carousel.slides.push(slide);
};

export const addProductItem = (product) => {
  gpsContent.products.items.push(product);
};

export const addServiceItem = (service) => {
  gpsContent.services.items.push(service);
};

export const addCategoryItem = (category) => {
  gpsContent.categories.items.push(category);
};

// Функции для удаления контента
export const removeContentById = (sectionName, itemId) => {
  const section = gpsContent[sectionName];
  if (section) {
    if (section.slides) {
      section.slides = section.slides.filter(item => item.id !== itemId);
    } else if (section.items) {
      section.items = section.items.filter(item => item.id !== itemId);
    }
  }
};

// Функция для обновления контента
export const updateContentById = (sectionName, itemId, updates) => {
  const section = gpsContent[sectionName];
  if (section) {
    const items = section.slides || section.items;
    if (items) {
      const itemIndex = items.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        items[itemIndex] = { ...items[itemIndex], ...updates };
      }
    }
  }
};
