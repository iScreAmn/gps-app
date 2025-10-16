
# Georgian Polygraph Services, equipment sales Web Application

Modern web application for showcasing and selling GPS equipment and surveying systems. Built with React, this project provides a fully-featured interface for product catalog, special offers, and online ordering.

## 🚀 Key Features

- **Multilingual Support**: English and Georgian languages with automatic detection
- **Dark/Light Theme**: Theme switching with localStorage persistence
- **Product Catalog**: Detailed GPS equipment showcase with image galleries
- **Special Offers**: Promotions, discounts, seasonal offers, and bundles
- **Online Ordering**: Equipment ordering form
- **Partners Showcase**: Carousel with partner logos
- **Responsive Design**: Optimized for all devices
- **Animations**: Smooth transitions and effects using GSAP and Motion

## 📋 Tech Stack

### Core Technologies
- **React** 19.1.1 - UI library
- **Vite** 5.4.10 - Build tool and dev server
- **React Router DOM** 7.8.2 - Routing
- **i18next** 25.5.0 - Internationalization
- **GSAP** 3.13.0 - Animations
- **Motion** 12.23.13 - Additional animations

### Additional Libraries
- **react-icons** - Icons
- **motion** - Animations
- **@motionone/utils** - Animation utilities

## 🎨 Application Pages

### Home Page (`/`)
- Hero section with carousel
- Partners section
- Product gallery
- Special offers
- Online order form

### Catalog (`/catalog`)
- Category filtering
- Product cards
- Detailed information

### Product Page (`/product/:id`)
- Image gallery
- Specifications
- Description
- Documents and videos

### About (`/about`)
- Company history
- Achievements
- Statistics (years of experience, clients, projects)

### Services (`/services`)
- Technical maintenance
- Equipment rental
- Consumables

### News (`/news`)
- Company blog

### Contacts (`/contacts`)
- Contact form
- Contact information
- Map

## 🌐 Locales

Supported languages:
- **English** (`/en/*`)
- **Georgian** (`/ka/*`)

Localization files located in `src/i18n/locales/`:
- `en.json` - English translations
- `ka.json` - Georgian translations

## 🎭 Dark/Light Theme

Application supports switching between light and dark themes:
- Automatic choice persistence in localStorage
- Applied via data-attribute on body
- Smooth transitions between themes

## 🎬 Animations

### Used Libraries
- **GSAP** - for complex animations
- **Motion** - for component animations

### Animated Widgets
- `AnimatedNumber` - animated counters
- `ParallaxText` - parallax effect for text
- `TextType` - typewriter effect for text
- `ScrollToTop` - scroll to top button

## 📱 Responsiveness

Application is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1440px+)

## 🔒 Security

- ESLint for code checking
- React Strict Mode for additional checks
- Form data validation
- Safe user input handling

## 📈 Performance

- Code splitting via React Router
- Lazy loading components
- Image optimization (WebP format)
- Minification and compression in production build

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

Project developed for LLC Georgian Polygraph Services.

## 👥 Contact

**LLC Georgian Polygraph Services**
- 📧 Email: info@geopolser.ge
- 📞 Phone: +995 32 230 81 77
- 📍 Location: Tbilisi, Georgia
- 💬 WhatsApp: [Chat](https://whatsapp.com/channel/0029Vb6P79E1yT2I2KS8GG3Y)
