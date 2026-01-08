import React, { useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { getCurrentLanguageFromPath } from '../../i18n';
import developData from '../../database/brands/develop.json';
import './Breadcrumbs.css';

const Breadcrumbs = ({ items, separator = '→' }) => {
  const location = useLocation();
  const params = useParams();
  const { language, t } = useLanguage();

  // Маппинг путей к ключам переводов
  const pathToLabelMap = {
    '': 'navigation.home',
    'catalog': 'navigation.catalog',
    'cutting-systems': 'categories.cutting',
    'about': 'navigation.about',
    'services': 'navigation.services',
    'news': 'navigation.news',
    'contacts': 'navigation.contacts',
    'privacy-policy': 'navigation.privacy_policy',
    // Бренды
    'iecho': 'IECHO',
    'teneth': 'Teneth',
    'ideal': 'Ideal',
    'duplo': 'Duplo',
    // Категории
    'office': 'categories.office',
    'professional': 'categories.professional',
    'industrial': 'categories.industrial',
    'cutting': 'categories.cutting',
  };

  // Функция для получения перевода или исходного значения
  const getLabel = (segment, isParamValue = false) => {
    // Если это значение параметра (например, id, category, brand из params)
    if (isParamValue) {
      // Пытаемся найти перевод для значения сегмента
      const translationKey = pathToLabelMap[segment];
      if (translationKey) {
        const translated = t(translationKey);
        // Если перевод найден и не равен ключу, используем его
        if (translated !== translationKey) {
          return translated;
        }
      }
      // Если перевод не найден, используем сегмент с заглавной буквы
      return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    }
    
    // Обычный сегмент пути
    const translationKey = pathToLabelMap[segment];
    if (translationKey) {
      const translated = t(translationKey);
      if (translated !== translationKey) {
        return translated;
      }
    }
    
    // Если перевод не найден, используем сегмент с заглавной буквы
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
  };

  // Автоматическое построение крошек из URL
  const breadcrumbs = useMemo(() => {
    // Если переданы кастомные крошки, используем их
    if (items && items.length > 0) {
      return items;
    }

    const pathname = location.pathname;
    const currentLang = getCurrentLanguageFromPath(pathname);
    
    // Убираем префикс языка из пути
    const pathWithoutLang = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    
    // Разбиваем путь на сегменты
    const segments = pathWithoutLang.split('/').filter(Boolean);
    
    const crumbs = [];
    
    // Всегда добавляем главную страницу
    const homePath = currentLang ? `/${currentLang}` : '/';
    crumbs.push({
      label: t('navigation.home'),
      path: homePath,
      isActive: segments.length === 0
    });

    // Строим путь для каждого сегмента
    let currentPath = currentLang ? `/${currentLang}` : '';
    
    segments.forEach((segment, index) => {
      const isLast = index === segments.length - 1;
      const nextSegment = segments[index + 1];
      
      // Специальная обработка для страницы продукта
      if (segment === 'product' && params.id) {
        // Добавляем каталог перед продуктом
        const catalogPath = currentLang ? `/${currentLang}/catalog` : '/catalog';
        crumbs.push({
          label: t('navigation.catalog'),
          path: catalogPath,
          isActive: false
        });
        // Добавляем сам продукт
        currentPath += `/${segment}/${params.id}`;
        crumbs.push({
          label: params.id || 'Product',
          path: currentPath,
          isActive: true
        });
        return; // Прерываем цикл
      }
      
      // Специальная обработка для cutting-systems - добавляем Catalog перед ним
      if (segment === 'cutting-systems') {
        // Добавляем каталог перед cutting-systems
        const catalogPath = currentLang ? `/${currentLang}/catalog` : '/catalog';
        // Проверяем, не добавлен ли уже catalog
        const catalogExists = crumbs.some(crumb => crumb.path === catalogPath);
        if (!catalogExists) {
          crumbs.push({
            label: t('navigation.catalog'),
            path: catalogPath,
            isActive: false
          });
        }
      }
      
      // Специальная обработка для office-equipment - ведет на catalog/office
      if (segment === 'office-equipment') {
        const officeCatalogPath = currentLang ? `/${currentLang}/catalog/office` : '/catalog/office';
        crumbs.push({
          label: t('categories.office'),
          path: officeCatalogPath,
          isActive: false
        });
        // Обновляем currentPath для следующих сегментов
        currentPath = officeCatalogPath;
        return; // Пропускаем стандартную обработку
      }
      
      // Пропускаем сегмент "develop", если следующий сегмент существует (это modelId)
      if (segment === 'develop' && nextSegment) {
        // Пропускаем "develop", модель будет обработана в следующей итерации
        return;
      }
      
      // Специальная обработка для modelId после "develop"
      if (segments[index - 1] === 'develop') {
        // Добавляем модель, пропуская "develop"
        currentPath += `/develop/${segment}`;
        // Получаем название модели из данных Develop
        const product = developData?.products?.find(p => p.id === segment);
        const modelLabel = product?.name || segment || 'Model';
        crumbs.push({
          label: modelLabel,
          path: currentPath,
          isActive: true
        });
        return; // Пропускаем стандартную обработку
      }
      
      // Проверяем, является ли сегмент значением параметра из URL
      const isParamValue = params && (
        segment === params.id || 
        segment === params.category || 
        segment === params.brand ||
        segment === params.modelId
      );
      
      currentPath += `/${segment}`;
      
      crumbs.push({
        label: getLabel(segment, isParamValue),
        path: currentPath,
        isActive: isLast
      });
    });

    return crumbs;
  }, [location.pathname, params, language, t, items]);

  // Не показываем крошки только на строго главной странице
  if (!items) {
    // Если нет элементов, не показываем
    if (!breadcrumbs || breadcrumbs.length === 0) {
      return null;
    }
    
    // Если только один элемент (главная страница), не показываем
    if (breadcrumbs.length <= 1) {
      return null;
    }
  }

  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li key={`${crumb.path}-${index}`} className="breadcrumbs__item">
              {isLast ? (
                <span className="breadcrumbs__item--active">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link to={crumb.path} className="breadcrumbs__link">
                    {crumb.label}
                  </Link>
                  {!isLast && (
                    <span className="breadcrumbs__separator" aria-hidden="true">
                      {separator}
                    </span>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

