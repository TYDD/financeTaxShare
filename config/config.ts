// https://umijs.org/config/
import { defineConfig } from 'umi';
import proxy from './proxy';
import routes from './routes.config';
import theme from './theme.config';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  base: '/vat/',
  publicPath: '/vat/',
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  devServer: {
    port: 8081,
  },
  runtimeHistory: {},
  qiankun: {
    slave: {},
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    // https://ant.design/docs/react/customize-theme-variable-cn
    // 'root-entry-name': 'variable',
    ...theme,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  nodeModulesTransform: { type: 'none' },
  // mfsu: {},
  webpack5: {},
  exportStatic: {},
});
