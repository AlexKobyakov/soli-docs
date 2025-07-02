import React, { useState } from 'react';
import './Screenshot.css';

/**
 * Компонент для отображения скриншотов интерфейса СОЛИ
 */
const Screenshot = ({
  src,
  alt = 'Скриншот интерфейса СОЛИ',
  title,
  description,
  zoomable = true,
  size = 'large',
  align = 'center',
  shadow = true,
  border = true,
  caption,
  annotations = [],
  className = '',
  style = {},
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleZoomToggle = () => {
    if (zoomable) {
      setIsZoomed(!isZoomed);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isZoomed) {
      setIsZoomed(false);
    }
  };

  React.useEffect(() => {
    if (isZoomed) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isZoomed]);

  const containerClasses = [
    'screenshot-container',
    `screenshot-${size}`,
    `screenshot-align-${align}`,
    shadow && 'screenshot-shadow',
    border && 'screenshot-border',
    zoomable && 'screenshot-zoomable',
    className,
  ].filter(Boolean).join(' ');

  return (
    <>
      <figure className={containerClasses} style={style}>
        {/* Индикатор загрузки */}
        {isLoading && (
          <div className="screenshot-loading">
            <div className="loading-spinner"></div>
            <span>Загрузка изображения...</span>
          </div>
        )}

        {/* Ошибка загрузки */}
        {hasError && (
          <div className="screenshot-error">
            <div className="error-icon">🖼️</div>
            <p>Не удалось загрузить изображение</p>
            <small>{src}</small>
          </div>
        )}

        {/* Основное изображение */}
        {!hasError && (
          <div className="screenshot-wrapper">
            <img
              src={src}
              alt={alt}
              title={title}
              onLoad={handleImageLoad}
              onError={handleImageError}
              onClick={handleZoomToggle}
              className={`screenshot-image ${isLoading ? 'loading' : ''}`}
              loading="lazy"
            />

            {/* Аннотации */}
            {annotations.length > 0 && (
              <div className="screenshot-annotations">
                {annotations.map((annotation, index) => (
                  <div
                    key={index}
                    className={`annotation annotation-${annotation.type || 'info'}`}
                    style={{
                      left: `${annotation.x}%`,
                      top: `${annotation.y}%`,
                    }}
                  >
                    <div className="annotation-marker">
                      {annotation.number || index + 1}
                    </div>
                    {annotation.tooltip && (
                      <div className="annotation-tooltip">
                        {annotation.tooltip}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Иконка увеличения */}
            {zoomable && !isLoading && !hasError && (
              <div className="zoom-indicator">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/>
                </svg>
              </div>
            )}
          </div>
        )}

        {/* Заголовок и описание */}
        {(title || description) && (
          <div className="screenshot-content">
            {title && <h4 className="screenshot-title">{title}</h4>}
            {description && (
              <p className="screenshot-description">{description}</p>
            )}
          </div>
        )}

        {/* Подпись */}
        {caption && (
          <figcaption className="screenshot-caption">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Модальное окно увеличенного изображения */}
      {isZoomed && (
        <div className="screenshot-modal" onClick={handleZoomToggle}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={handleZoomToggle}
              aria-label="Закрыть увеличенное изображение"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            <img
              src={src}
              alt={alt}
              className="modal-image"
            />
            {(title || description) && (
              <div className="modal-info">
                {title && <h3>{title}</h3>}
                {description && <p>{description}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Screenshot;