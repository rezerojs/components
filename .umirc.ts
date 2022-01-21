import { defineConfig } from 'dumi';
import { Children } from 'react';
import { join } from 'path';

const isDeploy = process.env.SITE_DEPLOY === 'TRUE';

export default defineConfig({
  title: 'ReZeroJS Components',
  favicon: 'https://s2.loli.net/2022/01/17/T49md2Y6E8ZqDaC.png',
  logo: 'https://s2.loli.net/2022/01/17/T49md2Y6E8ZqDaC.png',
  outputPath: 'docs-dist',
  mode: 'site',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  webpack5: {},
  base: '/components',
  publicPath: '/components/',
  exportStatic: {},
  mfsu: !isDeploy ? {} : undefined,
  ssr: isDeploy ? {} : undefined,
  fastRefresh: {},
  hash: true,
  alias: {
    '@rezerojs/components': join(__dirname, 'src'),
  },
  navs: [
    {
      title: 'Components',
      path: '/components',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/rezerojs/components',
    },
  ],
});
