// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { remarkCodeHike, recmaCodeHike } from 'codehike/mdx';

const chConfig = {
  components: { code: 'MyCode' }, // 커스텀 코드 컴포넌트
  syntaxHighlighting: {
    theme: 'github-dark', // 사용할 코드 하이라이팅 테마
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

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/jsk3342/my-website/edit/main/docs/', // 문서 편집 URL 수정
          beforeDefaultRemarkPlugins: [[remarkCodeHike, chConfig]], // remarkCodeHike 추가
          recmaPlugins: [[recmaCodeHike, chConfig]], // recmaCodeHike 추가
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/jsk3342/my-website/edit/main/blog/', // 블로그 편집 URL 수정
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All Posts',
          remarkPlugins: [remarkCodeHike], // 블로그에서도 remarkCodeHike 추가
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'FE Tech Talk',
      items: [
        { to: '/docs/dev/', label: '개발', position: 'left' },
        {
          href: 'https://github.com/jsk3342/my-website', // GitHub URL 수정
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
      theme: prismThemes.github, // prism 테마 업데이트
      darkTheme: prismThemes.dracula, // 다크 테마 업데이트
    },
  } satisfies Preset.ThemeConfig,
};

export default config; // TypeScript에서 내보내기
