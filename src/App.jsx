import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from './layouts/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import ProductPage from './pages/ProductPage/ProductPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import NewsPage from './pages/NewsPage/NewsPage';
import ContactsPage from './pages/ContactsPage/ContactsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage/PrivacyPolicyPage';
import CuttingSystemsPage from './pages/CuttingSystemsPage/CuttingSystemsPage';
import Iecho from './pages/CuttingSystemsPage/Iecho/Iecho';
import IechoModelPage from './pages/CuttingSystemsPage/Iecho/IechoModelPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <LanguageProvider>
          <Layout>
            <Routes>
              {/* Georgian routes */}
              <Route path="/ka" element={<HomePage />} />
              <Route path="/ka/catalog" element={<CatalogPage />} />
              <Route path="/ka/catalog/:category" element={<CatalogPage />} />
              <Route path="/ka/cutting-systems" element={<CuttingSystemsPage />} />
              <Route path="/ka/cutting-systems/iecho" element={<Iecho />} />
              <Route path="/ka/cutting-systems/iecho/:modelId" element={<IechoModelPage />} />
              <Route path="/ka/cutting-systems/:brand" element={<CatalogPage />} />
              <Route path="/ka/product/:id" element={<ProductPage />} />
              <Route path="/ka/about" element={<AboutPage />} />
              <Route path="/ka/services" element={<ServicesPage />} />
              <Route path="/ka/news" element={<NewsPage />} />
              <Route path="/ka/contacts" element={<ContactsPage />} />
              <Route path="/ka/privacy-policy" element={<PrivacyPolicyPage />} />
              
              {/* English routes */}
              <Route path="/en" element={<HomePage />} />
              <Route path="/en/catalog" element={<CatalogPage />} />
              <Route path="/en/catalog/:category" element={<CatalogPage />} />
              <Route path="/en/cutting-systems" element={<CuttingSystemsPage />} />
              <Route path="/en/cutting-systems/iecho" element={<Iecho />} />
              <Route path="/en/cutting-systems/iecho/:modelId" element={<IechoModelPage />} />
              <Route path="/en/cutting-systems/:brand" element={<CatalogPage />} />
              <Route path="/en/product/:id" element={<ProductPage />} />
              <Route path="/en/about" element={<AboutPage />} />
              <Route path="/en/services" element={<ServicesPage />} />
              <Route path="/en/news" element={<NewsPage />} />
              <Route path="/en/contacts" element={<ContactsPage />} />
              <Route path="/en/privacy-policy" element={<PrivacyPolicyPage />} />

              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/cutting-systems" element={<CuttingSystemsPage />} />
              <Route path="/cutting-systems/iecho" element={<Iecho />} />
              <Route path="/cutting-systems/iecho/:modelId" element={<IechoModelPage />} />
              <Route path="/cutting-systems/:brand" element={<CatalogPage />} />
              
              {/* Default route - show Georgian homepage */}
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </LanguageProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;