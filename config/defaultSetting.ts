import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = ProSettings & {
  pwa: boolean;
  company: string;
  autoHideHeader: boolean;
  collapse: boolean;
  sso: boolean;
  description: string;
};

const proSettings: DefaultSettings = {
  navTheme: 'dark',
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  autoHideHeader: true,
  fixSiderbar: false,
  menu: {
    locale: false,
  },
  title: '财税数据分享',
  pwa: true,
  iconfontUrl: '//at.alicdn.com/t/font_1087809_g3gond0sy9f.js',
  collapse: true,
  colorWeak: false,
  description: '',
  company: '云帐房网络科技有限公司',
  sso: true,
};

export type { DefaultSettings };

export default proSettings;
