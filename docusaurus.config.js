const {themes} = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Документация веб-ГИС СОЛИ',
  tagline: 'Полное руководство пользователя геоинформационной системы',
  favicon: 'img/favicon.ico',

  // Настройки деплоя
  url: 'https://alexkobyakov.github.io',
  baseUrl: '/soli-docs/',

  // GitHub pages настройки
  organizationName: 'AlexKobyakov',
  projectName: 'soli-docs',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Интернационализация
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    localeConfigs: {
      ru: {
        label: 'Русский',
        direction: 'ltr',
        htmlLang: 'ru',
        calendar: 'gregory',
        path: 'ru',
      },
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en',
        calendar: 'gregory', 
        path: 'en',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/', // Документация как главная страница
          editUrl: 'https://github.com/alexkobyakov/soli-docs/tree/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false, // Отключаем блог для фокуса на документации
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Метаданные для SEO
      metadata: [
        {name: 'keywords', content: 'ГИС, геоинформационные системы, СОЛИ, картография, GIS'},
        {name: 'description', content: 'Полная документация по использованию веб-геоинформационной системы СОЛИ'},
      ],

      // Конфигурация цветовой схемы
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },

      // Верхняя навигация
      navbar: {
        title: 'СОЛИ',
        logo: {
          alt: 'Логотип СОЛИ',
          src: 'img/logo.svg',
          srcDark: 'img/logo_dark.svg',
          width: 32,
          height: 32,
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'mainSidebar',
            position: 'left',
            label: 'Документация',
          },
          {
            type: 'docSidebar',
            sidebarId: 'apiSidebar',
            position: 'left',
            label: 'API',
          },
          {
            to: '/examples',
            label: 'Примеры',
            position: 'left',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'xn--h1afil.xn--80adichiqbvfacj0a3o.xn--p1ai',
            className: 'header-github-link',
            'aria-label': 'GitHub репозиторий',
            position: 'right',
          },
        ],
        hideOnScroll: true,
      },

      // Подвал сайта
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Документация',
            items: [
              {
                label: 'Быстрый старт',
                to: '/getting-started',
              },
              {
                label: 'Руководство пользователя',
                to: '/user-guide',
              },
              {
                label: 'API Справочник',
                to: '/api',
              },
            ],
          },
          {
            title: 'Сообщество',
            items: [
              {
                label: 'Форум поддержки',
                href: 'https://t.me/+CFMpwUh1MvxmNDQy',
              },
              {
                label: 'Telegram чат',
                href: 'https://t.me/+CFMpwUh1MvxmNDQy',
              },
            ],
          },
          {
            title: 'Поддержка',
            items: [
              {
                label: 'Связаться с нами',
                href: 'mailto:support@forest-it.ru',
              },
              {
                label: 'Сообщить об ошибке',
                href: 'xn--h1afil.xn--80adichiqbvfacj0a3o.xn--p1ai',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Веб-ГИС СОЛИ. Все права защищены. Создано с ❤️ с помощью Docusaurus.`,
      },

      // Подсветка синтаксиса
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
        additionalLanguages: [
          'bash',
          'json',
          'python',
          'sql',
          'yaml',
          'docker',
          'nginx',
        ],
      },

      // Объявления (banners)
      announcementBar: {
        id: 'new_version',
        content:
          '🎉 Вышла новая версия СОЛИ 3.0! <a target="_blank" rel="noopener noreferrer" href="/changelog">Узнать что нового</a>',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: true,
      },

      // Настройки изображений
      image: 'img/soli-social-card.jpg',
    }),

  // Дополнительные stylesheets
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
};

module.exports = config;