import React, { useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { HiArrowSmRight } from "react-icons/hi";
import { useLanguage } from '../../hooks/useLanguage';
import { getCurrentLanguageFromPath } from '../../i18n';
import { getNewsItemById } from '../../data/contentData';
import developData from '../../database/brands/develop.json';
import { professionalData } from '../../data/professionalData';
import { nocaiData } from '../../data/nocaiData';
import { inksProducts } from '../../data/inksData';
import './Breadcrumbs.css';

const Breadcrumbs = ({ items, separator }) => {
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
    'supplies': 'categories.supplies',
    'plotters': 'categories.plotters',
    'plotter-catalog': 'plotterCatalog.title',
    'inks': 'catalog.inks',
    'scanner': 'navigation.scanner',
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
    const pathWithoutLang = pathname.replace(/^\/(en|ka)(?=\/|$)/, '') || '/';
    
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

    // Специальная обработка для catalog/supplies/inks и catalog/supplies/inks/:inkId
    if (segments[0] === 'catalog' && segments[1] === 'supplies' && segments[2] === 'inks') {
      const catalogPath = currentLang ? `/${currentLang}/catalog` : '/catalog';
      const suppliesPath = currentLang ? `/${currentLang}/catalog/supplies` : '/catalog/supplies';
      const inksPath = currentLang ? `/${currentLang}/catalog/supplies/inks` : '/catalog/supplies/inks';
      crumbs.push(
        { label: t('navigation.catalog'), path: catalogPath, isActive: false },
        { label: t('categories.supplies'), path: suppliesPath, isActive: false },
        { label: t('catalog.inks'), path: inksPath, isActive: !segments[3] }
      );
      if (segments[3]) {
        const ink = inksProducts.find((p) => p.id === segments[3]);
        crumbs.push({
          label: ink ? t(ink.titleKey) : segments[3],
          path: inksPath + '/' + segments[3],
          isActive: true
        });
      }
      return crumbs;
    }

    // Строим путь для каждого сегмента
    let currentPath = currentLang ? `/${currentLang}` : '';
    
    segments.forEach((segment, index) => {
      const isLast = index === segments.length - 1;
      const nextSegment = segments[index + 1];

      // Пропускаем nocai и modelId — уже обработаны в plotter-catalog блоке
      if (segments[0] === 'plotter-catalog' && segments[1] === 'nocai' && index >= 1) {
        return;
      }
      
      // Специальная обработка для страницы новости
      if (segment === 'news') {
        const newsId = nextSegment || params.id;
        if (newsId) {
          // Добавляем новости перед конкретной новостью
          const newsPath = currentLang ? `/${currentLang}/news` : '/news';
          crumbs.push({
            label: t('navigation.news'),
            path: newsPath,
            isActive: false
          });
          // Получаем название новости из данных
          const newsItem = getNewsItemById(newsId);
          let newsTitle = null;
          if (newsItem && newsItem.titleKey) {
            const translated = t(newsItem.titleKey);
            // Если перевод найден (не равен ключу), используем его
            if (translated !== newsItem.titleKey) {
              newsTitle = translated;
            }
          }
          // Если название не найдено, не добавляем последний элемент breadcrumbs
          if (newsTitle) {
            currentPath += `/${segment}/${newsId}`;
            crumbs.push({
              label: newsTitle,
              path: currentPath,
              isActive: true
            });
          }
          return; // Прерываем цикл
        } else {
          // Просто страница новостей без конкретной новости
          currentPath += `/${segment}`;
          crumbs.push({
            label: t('navigation.news'),
            path: currentPath,
            isActive: isLast
          });
          return;
        }
      }
      
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
        const catalogPath = currentLang ? `/${currentLang}/catalog` : '/catalog';
        const catalogExists = crumbs.some(crumb => crumb.path === catalogPath);
        if (!catalogExists) {
          crumbs.push({
            label: t('navigation.catalog'),
            path: catalogPath,
            isActive: false
          });
        }
      }

      // Специальная обработка для plotter-catalog/nocai: Home - Catalog - Nocai [- модель]
      if (segment === 'plotter-catalog' && nextSegment === 'nocai') {
        const catalogPath = currentLang ? `/${currentLang}/catalog` : '/catalog';
        const nocaiPath = currentLang ? `/${currentLang}/plotter-catalog/nocai` : '/plotter-catalog/nocai';
        crumbs.push(
          { label: t('navigation.catalog'), path: catalogPath, isActive: false },
          { label: 'Nocai', path: nocaiPath, isActive: !segments[index + 2] }
        );
        if (segments[index + 2]) {
          const modelId = segments[index + 2];
          const product = nocaiData?.products?.find(p => p.id === modelId);
          crumbs.push({
            label: product?.name || modelId,
            path: `${nocaiPath}/${modelId}`,
            isActive: true
          });
        }
        return;
      }

      // plotter-catalog без nocai (например главная plotter-catalog)
      if (segment === 'plotter-catalog') {
        const catalogPath = currentLang ? `/${currentLang}/catalog` : '/catalog';
        const plotterPath = currentLang ? `/${currentLang}/plotter-catalog` : '/plotter-catalog';
        crumbs.push(
          { label: t('navigation.catalog'), path: catalogPath, isActive: false },
          { label: t('plotterCatalog.title'), path: plotterPath, isActive: true }
        );
        return;
      }
      
      // Специальная обработка для office-equipment: Home - Catalog - Office - модель
      if (segment === 'office-equipment') {
        const catalogPath = currentLang ? `/${currentLang}/catalog` : '/catalog';
        const officeCatalogPath = currentLang ? `/${currentLang}/catalog/office` : '/catalog/office';
        crumbs.push(
          { label: t('navigation.catalog'), path: catalogPath, isActive: false },
          { label: t('categories.office'), path: officeCatalogPath, isActive: !segments[index + 2] }
        );
        if (nextSegment === 'develop' && segments[index + 2]) {
          const modelId = segments[index + 2];
          const product = developData?.products?.find(p => p.id === modelId);
          crumbs.push({
            label: product?.name || modelId,
            path: `${currentLang ? `/${currentLang}` : ''}/office-equipment/develop/${modelId}`,
            isActive: true
          });
        }
        return;
      }

      // Специальная обработка для professional-equipment: Home - Catalog - Professional - модель
      if (segment === 'professional-equipment') {
        const catalogPath = currentLang ? `/${currentLang}/catalog` : '/catalog';
        const professionalCatalogPath = currentLang ? `/${currentLang}/catalog/professional` : '/catalog/professional';
        crumbs.push(
          { label: t('navigation.catalog'), path: catalogPath, isActive: false },
          { label: t('categories.professional'), path: professionalCatalogPath, isActive: !segments[index + 2] }
        );
        if (nextSegment === 'develop' && segments[index + 2]) {
          const modelId = segments[index + 2];
          const product = professionalData?.products?.find(p => p.id === modelId);
          crumbs.push({
            label: product?.name || modelId,
            path: `${currentLang ? `/${currentLang}` : ''}/professional-equipment/develop/${modelId}`,
            isActive: true
          });
        }
        return;
      }
      
      // Пропускаем сегмент "develop", если следующий сегмент существует (это modelId)
      if (segment === 'develop' && nextSegment) {
        // Пропускаем "develop", модель будет обработана в следующей итерации
        return;
      }
      
      // Пропускаем modelId для professional-equipment — уже добавлен выше
      if (segments[index - 1] === 'develop' && segments[0] === 'professional-equipment') {
        return;
      }

      // Специальная обработка для modelId после "develop" (office-equipment)
      if (segments[index - 1] === 'develop') {
        currentPath = `${currentLang ? `/${currentLang}` : ''}/office-equipment/develop/${segment}`;
        const product = developData?.products?.find(p => p.id === segment);
        const modelLabel = product?.name || segment || 'Model';
        crumbs.push({
          label: modelLabel,
          path: currentPath,
          isActive: true
        });
        return; // Пропускаем стандартную обработку
      }
      
      // Пропускаем id новости после "news" (он уже обработан выше)
      if (segments[index - 1] === 'news') {
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
      <div className="container">
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
                        {separator || <HiArrowSmRight />}
                      </span>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;

