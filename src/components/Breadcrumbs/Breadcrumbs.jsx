import React, { useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { HiArrowSmRight } from "react-icons/hi";
import { useLanguage } from '../../hooks/useLanguage';
import { getCurrentLanguageFromPath } from '../../i18n';
import { getNewsItemById } from '../../data/contentData';
import developData from '../../database/brands/develop.json';
import recosystemsData from '../../database/brands/recosystems.json';
import idealGuillotineData from '../../database/brands/ideal-guillotine.json';
import idealShredderData from '../../database/brands/ideal-shredder.json';
import vividData from '../../database/brands/vivid.json';
import cyklosData from '../../database/brands/cyklos.json';
import rapidData from '../../database/brands/rapid.json';
import duploData from '../../database/brands/duplo.json';
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
    'info': 'navigation.info',
    'privacy-policy': 'navigation.privacy_policy',
    // Бренды
    'iecho': 'IECHO',
    'teneth': 'Teneth',
    'ideal': 'Ideal',
    'guillotine': 'categories.guillotine_cutter',
    'shredder': 'categories.shredder',
    'accessories': 'categories.accessories',
    'duplo': 'Duplo',
    // Категории
    'office': 'categories.office',
    'professional': 'categories.professional',
    'materials': 'categories.materials',
    'cutting': 'categories.cutting',
    'supplies': 'categories.supplies',
    'plotters': 'categories.plotters',
    'plotter-catalog': 'plotterCatalog.title',
    'inks': 'catalog.inks',
    'toner': 'catalog.toner',
    'scanner': 'navigation.scanner',
    'recosystems': 'RecoSystems',
    'vivid': 'Vivid',
    'cyklos': 'Cyklos',
    'rapid': 'Rapid',
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

    if (segments[0] === 'toner' && segments.length === 1) {
      const catalogPath = currentLang ? `/${currentLang}/catalog` : '/catalog';
      const suppliesPath = currentLang ? `/${currentLang}/catalog/supplies` : '/catalog/supplies';
      const tonerPath = currentLang ? `/${currentLang}/toner` : '/toner';
      crumbs.push(
        { label: t('navigation.catalog'), path: catalogPath, isActive: false },
        { label: t('categories.supplies'), path: suppliesPath, isActive: false },
        { label: t('catalog.toner'), path: tonerPath, isActive: true }
      );
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

      const cuttingSystemsIdx = segments.indexOf('cutting-systems');
      if (
        cuttingSystemsIdx >= 0 &&
        segments[cuttingSystemsIdx + 1] === 'ideal' &&
        segments[cuttingSystemsIdx + 2] === 'guillotine' &&
        index > cuttingSystemsIdx
      ) {
        return;
      }

      if (
        cuttingSystemsIdx >= 0 &&
        (segments[cuttingSystemsIdx + 1] === 'recosystems'
          || segments[cuttingSystemsIdx + 1] === 'vivid'
          || segments[cuttingSystemsIdx + 1] === 'cyklos'
          || segments[cuttingSystemsIdx + 1] === 'rapid'
          || segments[cuttingSystemsIdx + 1] === 'duplo') &&
        index > cuttingSystemsIdx
      ) {
        return;
      }

      const idealIdx = segments.indexOf('ideal');
      if (idealIdx >= 0 && segments[idealIdx + 1] === 'products' && index > idealIdx) {
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

      // id новости уже добавлен в блоке выше — не обрабатываем как catalog route
      // (иначе /news/professional-equipment матчится на professional-equipment)
      if (segments[index - 1] === 'news') {
        return;
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
      
      // cutting-systems/recosystems: Home - Catalog - Cutting Systems - RecoSystems [- model]
      if (segment === 'cutting-systems' && nextSegment === 'recosystems') {
        const catalogPath = currentLang ? `/${currentLang}/catalog` : '/catalog';
        const cuttingPath = currentLang ? `/${currentLang}/cutting-systems` : '/cutting-systems';
        const recosystemsPath = `${cuttingPath}/recosystems`;

        crumbs.push(
          { label: t('navigation.catalog'), path: catalogPath, isActive: false },
          { label: t('categories.cutting'), path: cuttingPath, isActive: false },
          { label: 'RecoSystems', path: recosystemsPath, isActive: !segments[index + 2] }
        );

        if (segments[index + 2]) {
          const modelId = segments[index + 2];
          const product = recosystemsData?.products?.find(p => p.id === modelId);
          crumbs.push({
            label: product?.name || modelId,
            path: `${recosystemsPath}/${modelId}`,
            isActive: true
          });
        }
        return;
      }

      // cutting-systems/duplo: Home - Catalog - Cutting Systems - Duplo [- model]
      if (segment === 'cutting-systems' && nextSegment === 'duplo') {
        const catalogPath = currentLang ? `/${currentLang}/catalog` : '/catalog';
        const cuttingPath = currentLang ? `/${currentLang}/cutting-systems` : '/cutting-systems';
        const duploPath = `${cuttingPath}/duplo`;

        crumbs.push(
          { label: t('navigation.catalog'), path: catalogPath, isActive: false },
          { label: t('categories.cutting'), path: cuttingPath, isActive: false },
          { label: 'Duplo', path: duploPath, isActive: !segments[index + 2] }
        );

        if (segments[index + 2]) {
          const modelId = segments[index + 2];
          const product = duploData?.products?.find(p => p.id === modelId);
          crumbs.push({
            label: product?.name || modelId,
            path: `${duploPath}/${modelId}`,
            isActive: true
          });
        }
        return;
      }

      // cutting-systems/rapid: Home - Catalog - Cutting Systems - Rapid [- model]
      if (segment === 'cutting-systems' && nextSegment === 'rapid') {
        const catalogPath = currentLang ? `/${currentLang}/catalog` : '/catalog';
        const cuttingPath = currentLang ? `/${currentLang}/cutting-systems` : '/cutting-systems';
        const rapidPath = `${cuttingPath}/rapid`;

        crumbs.push(
          { label: t('navigation.catalog'), path: catalogPath, isActive: false },
          { label: t('categories.cutting'), path: cuttingPath, isActive: false },
          { label: 'Rapid', path: rapidPath, isActive: !segments[index + 2] }
        );

        if (segments[index + 2]) {
          const modelId = segments[index + 2];
          const product = rapidData?.products?.find(p => p.id === modelId);
          crumbs.push({
            label: product?.name || modelId,
            path: `${rapidPath}/${modelId}`,
            isActive: true
          });
        }
        return;
      }

      // cutting-systems/cyklos: Home - Catalog - Cutting Systems - Cyklos [- model]
      if (segment === 'cutting-systems' && nextSegment === 'cyklos') {
        const catalogPath = currentLang ? `/${currentLang}/catalog` : '/catalog';
        const cuttingPath = currentLang ? `/${currentLang}/cutting-systems` : '/cutting-systems';
        const cyklosPath = `${cuttingPath}/cyklos`;

        crumbs.push(
          { label: t('navigation.catalog'), path: catalogPath, isActive: false },
          { label: t('categories.cutting'), path: cuttingPath, isActive: false },
          { label: 'Cyklos', path: cyklosPath, isActive: !segments[index + 2] }
        );

        if (segments[index + 2]) {
          const modelId = segments[index + 2];
          const product = cyklosData?.products?.find(p => p.id === modelId);
          crumbs.push({
            label: product?.name || modelId,
            path: `${cyklosPath}/${modelId}`,
            isActive: true
          });
        }
        return;
      }

      // cutting-systems/vivid: Home - Catalog - Cutting Systems - Vivid [- model]
      if (segment === 'cutting-systems' && nextSegment === 'vivid') {
        const catalogPath = currentLang ? `/${currentLang}/catalog` : '/catalog';
        const cuttingPath = currentLang ? `/${currentLang}/cutting-systems` : '/cutting-systems';
        const vividPath = `${cuttingPath}/vivid`;

        crumbs.push(
          { label: t('navigation.catalog'), path: catalogPath, isActive: false },
          { label: t('categories.cutting'), path: cuttingPath, isActive: false },
          { label: 'Vivid', path: vividPath, isActive: !segments[index + 2] }
        );

        if (segments[index + 2]) {
          const modelId = segments[index + 2];
          const product = vividData?.products?.find(p => p.id === modelId);
          crumbs.push({
            label: product?.name || modelId,
            path: `${vividPath}/${modelId}`,
            isActive: true
          });
        }
        return;
      }

      // cutting-systems/ideal/guillotine: Home - Catalog - Cutting Systems - Ideal - Guillotine [- model]
      if (segment === 'cutting-systems' && nextSegment === 'ideal' && segments[index + 2] === 'guillotine') {
        const catalogPath = currentLang ? `/${currentLang}/catalog` : '/catalog';
        const cuttingPath = currentLang ? `/${currentLang}/cutting-systems` : '/cutting-systems';
        const idealPath = `${cuttingPath}/ideal`;
        const guillotinePath = `${idealPath}/guillotine`;

        crumbs.push(
          { label: t('navigation.catalog'), path: catalogPath, isActive: false },
          { label: t('categories.cutting'), path: cuttingPath, isActive: false },
          { label: 'Ideal', path: idealPath, isActive: false },
          { label: t('categories.guillotine_cutter'), path: guillotinePath, isActive: !segments[index + 3] }
        );

        if (segments[index + 3]) {
          const modelId = segments[index + 3];
          const product = idealGuillotineData?.products?.find(p => p.id === modelId);
          crumbs.push({
            label: product?.name || modelId,
            path: `${guillotinePath}/${modelId}`,
            isActive: true
          });
        }
        return;
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

      // ideal/products: Home - Catalog - Cutting Systems - Ideal - Products
      if (segment === 'ideal' && nextSegment === 'products') {
        const catalogPath = currentLang ? `/${currentLang}/catalog` : '/catalog';
        const cuttingPath = currentLang ? `/${currentLang}/cutting-systems` : '/cutting-systems';
        const idealPath = `${cuttingPath}/ideal`;
        const productsPath = currentLang ? `/${currentLang}/ideal/products` : '/ideal/products';

        crumbs.push(
          { label: t('navigation.catalog'), path: catalogPath, isActive: false },
          { label: t('categories.cutting'), path: cuttingPath, isActive: false },
          { label: 'Ideal', path: idealPath, isActive: false },
          { label: t('ideal.all_products'), path: productsPath, isActive: true }
        );
        return;
      }

      // shredder: Home - Catalog - Cutting Systems - Ideal - Shredder [- model]
      if (segment === 'shredder') {
        const catalogPath = currentLang ? `/${currentLang}/catalog` : '/catalog';
        const cuttingPath = currentLang ? `/${currentLang}/cutting-systems` : '/cutting-systems';
        const idealPath = `${cuttingPath}/ideal`;
        const shredderPath = currentLang ? `/${currentLang}/shredder` : '/shredder';

        crumbs.push(
          { label: t('navigation.catalog'), path: catalogPath, isActive: false },
          { label: t('categories.cutting'), path: cuttingPath, isActive: false },
          { label: 'Ideal', path: idealPath, isActive: false },
          { label: t('categories.shredder'), path: shredderPath, isActive: !segments[index + 1] }
        );

        if (segments[index + 1]) {
          const modelId = segments[index + 1];
          const product = idealShredderData?.products?.find(p => p.id === modelId);
          crumbs.push({
            label: product?.name || modelId,
            path: `${shredderPath}/${modelId}`,
            isActive: true
          });
        }
        return;
      }

      // Пропускаем modelId для recosystems — он уже добавлен в специальной обработке выше
      if (segments[index - 1] === 'recosystems' && segments[index - 2] === 'cutting-systems') {
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

      // Пропускаем modelId для recosystems — он уже добавлен в специальной обработке выше
      if (segments[index - 1] === 'recosystems') {
        return;
      }
      if (segments[index - 1] === 'shredder') {
        return;
      }

      // Пропускаем modelId для vivid — он уже добавлен в специальной обработке выше
      if (segments[index - 1] === 'vivid') {
        return;
      }

      // Пропускаем modelId для cyklos — он уже добавлен в специальной обработке выше
      if (segments[index - 1] === 'cyklos') {
        return;
      }

      // Пропускаем modelId для rapid — он уже добавлен в специальной обработке выше
      if (segments[index - 1] === 'rapid') {
        return;
      }

      // Пропускаем modelId для duplo — он уже добавлен в специальной обработке выше
      if (segments[index - 1] === 'duplo') {
        return;
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

