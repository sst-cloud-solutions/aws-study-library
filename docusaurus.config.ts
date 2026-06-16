import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import sidebars from './sidebars';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'AWS Study Library',
  tagline: 'A premium, structured reading environment for mastering AWS cloud engineering and architecture.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://adavoudi.info',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'adavoudi', // Usually your GitHub org/user name.
  projectName: 'aws-sap', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        gtag: {
          trackingID: 'G-3FWPK6J51D',
          anonymizeIP: false,
        },
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/adavoudi/aws-sap/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },
      } satisfies Preset.Options,
      
    ],
  ],

  markdown: {
    mermaid: true,
  },

  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,

        // For Docs using Chinese, it is recomended to set:
        // language: ["en", "zh"],

        // If you're using `noIndex: true`, set `forceIgnoreNoIndex` to enable local index:
        // forceIgnoreNoIndex: true,
      }),
    ]
  ],

  plugins: [
    function gtagStubPlugin() {
      return {
        name: 'gtag-stub-plugin',
        getClientModules() {
          return [require.resolve('./src/gtag-stub.js')];
        },
        injectHtmlTags() {
          return {
            headTags: [
              {
                tagName: 'script',
                innerHTML: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  window.gtag = gtag;
                `,
              },
              {
                tagName: 'link',
                attributes: {
                  rel: 'preconnect',
                  href: 'https://fonts.googleapis.com',
                },
              },
              {
                tagName: 'link',
                attributes: {
                  rel: 'preconnect',
                  href: 'https://fonts.gstatic.com',
                  crossorigin: 'anonymous',
                },
              },
              {
                tagName: 'link',
                attributes: {
                  rel: 'stylesheet',
                  href: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Outfit:wght@100..900&display=swap',
                },
              },
            ],
          };
        },
      };
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'AWS Study Library',
      logo: {
        alt: 'AWS Study Library Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/',
          label: 'Home',
          position: 'left',
          exact: true,
        },
        {
          type: 'docSidebar',
          sidebarId: 'foundationSidebar',
          label: '00 / IT Foundation',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: '01 / Developer Associate (DVA-C02)',
          position: 'left',
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'dvaSidebar',
              label: 'Study Topics',
            },
            {
              type: 'docSidebar',
              sidebarId: 'dvaPracticeSidebar',
              label: 'Practice Exams',
            },
          ],
        },
        {
          type: 'dropdown',
          label: '02 / Solutions Architect Professional (SAP-C02)',
          position: 'left',
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'tutorialSidebar',
              label: 'Study Topics',
            },
            {
              type: 'docSidebar',
              sidebarId: 'practiceSidebar',
              label: 'Practice Exams',
            },
          ],
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} AWS Study Library. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
