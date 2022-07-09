import { history, setCreateHistoryOptions } from 'umi';

// const isDev = process.env.NODE_ENV === 'development';

declare global {
  interface Window {
    __POWERED_BY_QIANKUN__?: boolean;
  }
}

function getRouterBaseName() {
  const base = '/vat';
  const pathname = history.location.pathname;
  const index = pathname.indexOf(base);
  const prefix = pathname.slice(0, index);
  return `${prefix}${base}`;
}
if (window.__POWERED_BY_QIANKUN__) {
  const basename = getRouterBaseName();
  console.log('getLocale', history.location.pathname, basename);
  setCreateHistoryOptions({
    basename,
  });
}
export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any) {
    console.log('财税数据分享子应用 bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props: any) {
    console.log('财税数据分享子应用 mount', props);
  },
  // 应用卸载之后触发
  async unmount(props: any) {
    console.log('财税数据分享子应用 unmount', props);
  },
};
