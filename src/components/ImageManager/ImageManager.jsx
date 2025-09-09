import React, { useState } from 'react';
import { 
  getAllImages, 
  getAvailableImageKeys, 
  validateImageKey, 
  resolveImage,
  addImageToCollection 
} from '../../data/contentData';
import './ImageManager.css';

const ImageManager = ({ onImageSelect, currentImageKey = null }) => {
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [newImageKey, setNewImageKey] = useState('');
  const [newImagePath, setNewImagePath] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const allImages = getAllImages();
  const availableKeys = getAvailableImageKeys();

  // Фильтрация изображений по коллекции
  const getFilteredImages = () => {
    if (selectedCollection === 'all') {
      return availableKeys.map(key => ({ key, path: resolveImage(key) }));
    }
    
    const collection = allImages[selectedCollection];
    if (!collection) return [];
    
    return Object.keys(collection).map(key => ({
      key: `${selectedCollection}.${key}`,
      path: resolveImage(`${selectedCollection}.${key}`)
    }));
  };

  const handleImageSelect = (imageKey) => {
    if (onImageSelect) {
      onImageSelect(imageKey);
    }
  };

  const handleAddImage = () => {
    if (newImageKey && newImagePath) {
      const [collection, ...keyParts] = newImageKey.split('.');
      const imageName = keyParts.join('.');
      
      if (collection && imageName) {
        addImageToCollection(collection, imageName, newImagePath);
        setNewImageKey('');
        setNewImagePath('');
        setShowAddForm(false);
      } else {
        alert('Используйте формат: collection.imageName');
      }
    }
  };

  const filteredImages = getFilteredImages();

  return (
    <div className="image-manager">
      <div className="image-manager-header">
        <h3>Управление изображениями</h3>
        <button 
          className="btn-secondary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Отмена' : 'Добавить изображение'}
        </button>
      </div>

      {showAddForm && (
        <div className="add-image-form">
          <div className="form-group">
            <label>Ключ изображения (collection.imageName):</label>
            <input
              type="text"
              value={newImageKey}
              onChange={(e) => setNewImageKey(e.target.value)}
              placeholder="products.newProduct"
            />
          </div>
          <div className="form-group">
            <label>Путь к изображению:</label>
            <input
              type="text"
              value={newImagePath}
              onChange={(e) => setNewImagePath(e.target.value)}
              placeholder="/path/to/image.jpg или import"
            />
          </div>
          <button className="btn-primary" onClick={handleAddImage}>
            Добавить
          </button>
        </div>
      )}

      <div className="collection-filter">
        <label>Коллекция:</label>
        <select 
          value={selectedCollection} 
          onChange={(e) => setSelectedCollection(e.target.value)}
        >
          <option value="all">Все изображения</option>
          {Object.keys(allImages).map(collection => (
            <option key={collection} value={collection}>
              {collection}
            </option>
          ))}
        </select>
      </div>

      <div className="current-selection">
        {currentImageKey && (
          <div className="current-image">
            <strong>Текущее изображение:</strong> {currentImageKey}
            <div className="image-validation">
              {validateImageKey(currentImageKey) ? (
                <span className="valid">✓ Валидно</span>
              ) : (
                <span className="invalid">✗ Невалидно</span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="images-grid">
        {filteredImages.map(({ key, path }) => (
          <div 
            key={key} 
            className={`image-item ${currentImageKey === key ? 'selected' : ''}`}
            onClick={() => handleImageSelect(key)}
          >
            <div className="image-preview">
              {path && path !== '/api/placeholder/400/300' ? (
                <img 
                  src={path} 
                  alt={key}
                  onError={(e) => {
                    e.target.src = '/api/placeholder/150/100';
                  }}
                />
              ) : (
                <div className="placeholder">
                  <span>No Image</span>
                </div>
              )}
            </div>
            <div className="image-info">
              <div className="image-key">{key}</div>
              <div className="image-path">{path}</div>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="no-images">
          <p>Изображения не найдены в выбранной коллекции</p>
        </div>
      )}

      <div className="usage-example">
        <h4>Примеры использования:</h4>
        <code>
          createHeroSlide('id', 'category', 'title', 'subtitle', 'hero.office', '/link')
        </code>
        <br />
        <code>
          createProductSlide('id', 'title', 'subtitle', 'products.garmin', [], '/link')
        </code>
      </div>
    </div>
  );
};

export default ImageManager;
