/**
 * Конфигурация боковых панелей для документации СОЛИ
 */

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // Основная документация
  mainSidebar: [
    // Введение
    'intro',
    
    // Быстрый старт
    {
      type: 'category',
      label: '🚀 Быстрый старт',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/first-login',
      ],
    },

    // Часто задаваемые вопросы
    'faq',

    // Глоссарий
    'glossary',

    // История изменений
    'changelog',
  ],

  // API документация (пока пустая)
  apiSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'API скоро будет доступно',
    },
  ],
};

module.exports = sidebars;