// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { remarkCodeHike, recmaCodeHike } from 'codehike/mdx';

const chConfig = {
  components: { code: 'MyCode' },
  syntaxHighlighting: {
    theme: 'github-dark',
  },
};

const config: Config = {
  title: 'FE Tech Talk',
  tagline: '개발 이야기',
  favicon: 'img/favicon.ico',

  url: 'https://jskdevblog.vercel.app/',
  baseUrl: '/',

  organizationName: 'Jisu Kim',
  projectName: 'FE Tech Talk',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  // 플러그인 추가
  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-XXXXXXXXXX', // 여기에 Google Analytics 추적 ID를 넣으세요
        anonymizeIP: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/jsk3342/my-website/edit/main/docs/',
          beforeDefaultRemarkPlugins: [[remarkCodeHike, chConfig]],
          recmaPlugins: [[recmaCodeHike, chConfig]],
          showLastUpdateTime: true, // 마지막 업데이트 시간 표시
          showLastUpdateAuthor: true, // 마지막 업데이트 작성자 표시
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/jsk3342/my-website/edit/main/blog/',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All Posts',
          remarkPlugins: [remarkCodeHike],
          postsPerPage: 10, // 페이지당 포스트 수
          blogTitle: 'FE Tech Blog',
          blogDescription: '프론트엔드 개발 관련 기술 블로그',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // SEO 최적화를 위한 이미지 설정
    image: 'img/docusaurus-social-card.jpg',

    // SEO를 위한 메타데이터 추가
    metadata: [
      { name: 'keywords', content: '프론트엔드, 개발, JavaScript, React, Web Development, FE Tech' },
      { name: 'description', content: '프론트엔드 개발자의 기술 블로그입니다. 개발 경험과 지식을 공유합니다.' },
      { name: 'og:title', content: 'FE Tech Talk' },
      { name: 'og:description', content: '프론트엔드 개발자의 기술 블로그' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    navbar: {
      title: 'FE Tech Talk',
      items: [
        { to: '/docs/dev/', label: '개발', position: 'left' },
        {
          href: 'https://github.com/jsk3342/my-website',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Information',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/jsk3342',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} FE Tech Talk, Made by JSK`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
