import React, { useState } from 'react';
import './VideoPlayer.css';

/**
 * Компонент для встраивания видео с YouTube и RuTube
 * 
 * @param {string} src - URL видео или ID
 * @param {string} platform - 'youtube' или 'rutube'
 * @param {string} title - Заголовок видео
 * @param {string} description - Описание видео
 * @param {string} width - Ширина плеера (по умолчанию '100%')
 * @param {string} height - Высота плеера (по умолчанию '315px')
 * @param {boolean} autoplay - Автовоспроизведение (по умолчанию false)
 * @param {string} startTime - Время начала в секундах (только для YouTube)
 * @param {boolean} showControls - Показывать элементы управления
 * @param {string} caption - Подпись под видео
 */
const VideoPlayer = ({
  src,
  platform = 'youtube',
  title = 'Обучающее видео',
  description,
  width = '100%',
  height = '315px',
  autoplay = false,
  startTime,
  showControls = true,
  caption,
  className = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Функция для извлечения ID видео из URL
  const extractVideoId = (url, platform) => {
    if (!url) return '';

    if (platform === 'youtube') {
      // Различные форматы YouTube URL
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /^([a-zA-Z0-9_-]{11})$/, // Прямой ID
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
      }
    } else if (platform === 'rutube') {
      // Различные форматы RuTube URL
      const patterns = [
        /rutube\.ru\/video\/([a-f0-9]+)/,
        /rutube\.ru\/embed\/([a-f0-9]+)/,
        /^([a-f0-9]+)$/, // Прямой ID
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
      }
    }

    return url; // Возвращаем исходный URL, если не удалось извлечь ID
  };

  // Генерация URL для встраивания
  const generateEmbedUrl = () => {
    const videoId = extractVideoId(src, platform);
    
    if (platform === 'youtube') {
      let embedUrl = `https://www.youtube.com/embed/${videoId}`;
      const params = new URLSearchParams();
      
      if (autoplay) params.append('autoplay', '1');
      if (startTime) params.append('start', startTime);
      if (!showControls) params.append('controls', '0');
      params.append('rel', '0'); // Не показывать похожие видео
      params.append('modestbranding', '1'); // Минимальный брендинг YouTube
      
      const queryString = params.toString();
      return queryString ? `${embedUrl}?${queryString}` : embedUrl;
    } else if (platform === 'rutube') {
      let embedUrl = `https://rutube.ru/play/embed/${videoId}`;
      const params = new URLSearchParams();
      
      if (autoplay) params.append('autoplay', 'true');
      
      const queryString = params.toString();
      return queryString ? `${embedUrl}?${queryString}` : embedUrl;
    }
    
    return src;
  };

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoaded(false);
    setHasError(true);
  };

  const embedUrl = generateEmbedUrl();

  const containerClasses = [
    'video-player-container',
    `video-player-${platform}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <figure className={containerClasses}>
      {/* Заголовок и описание */}
      {(title || description) && (
        <div className="video-header">
          {title && <h4 className="video-title">{title}</h4>}
          {description && <p className="video-description">{description}</p>}
        </div>
      )}

      {/* Контейнер видеоплеера */}
      <div 
        className="video-wrapper"
        style={{ 
          width,
          paddingBottom: height === '315px' ? '56.25%' : undefined, // 16:9 aspect ratio
          height: height !== '315px' ? height : undefined,
        }}
      >
        {/* Индикатор загрузки */}
        {!isLoaded && !hasError && (
          <div className="video-loading">
            <div className="loading-spinner"></div>
            <span>Загрузка видео...</span>
          </div>
        )}

        {/* Сообщение об ошибке */}
        {hasError && (
          <div className="video-error">
            <div className="error-icon">🎥</div>
            <p>Не удалось загрузить видео</p>
            <small>Проверьте URL: {src}</small>
            <small>Платформа: {platform}</small>
          </div>
        )}

        {/* Iframe с видео */}
        <iframe
          src={embedUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={handleLoad}
          onError={handleError}
          className={`video-iframe ${isLoaded ? 'loaded' : ''}`}
          loading="lazy"
        />

        {/* Информация о платформе */}
        <div className="video-platform-badge">
          {platform === 'youtube' && (
            <span className="platform-youtube">YouTube</span>
          )}
          {platform === 'rutube' && (
            <span className="platform-rutube">RuTube</span>
          )}
        </div>
      </div>

      {/* Подпись под видео */}
      {caption && (
        <figcaption className="video-caption">
          {caption}
        </figcaption>
      )}

      {/* Дополнительная информация */}
      <div className="video-info">
        <small className="video-source">
          Источник: {platform === 'youtube' ? 'YouTube' : 'RuTube'}
        </small>
        {startTime && platform === 'youtube' && (
          <small className="video-start-time">
            Начало: {Math.floor(startTime / 60)}:{(startTime % 60).toString().padStart(2, '0')}
          </small>
        )}
      </div>
    </figure>
  );
};

export default VideoPlayer;