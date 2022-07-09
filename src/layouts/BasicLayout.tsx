/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
import type {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import type { HeaderViewProps } from '@ant-design/pro-layout/lib/Header';
import type { ConnectState } from '@/models/connect';
import ProLayout from '@ant-design/pro-layout';
import React from 'react';
import { Link, history, connect } from 'umi';
import defaultSettings from '../../config/defaultSetting';
// import RightContent from '@/components/GlobalHeader/RightContent';

export type BasicLayoutProps = {
  settings: Settings;
  isQiankun: boolean;
} & ProLayoutProps;

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    return {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
  });

const menuRender = (
  props: HeaderViewProps,
  defaultDom: React.ReactNode,
): React.ReactNode => {
  return props.collapsed ? null : defaultDom;
};

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    children,
    location = {
      pathname: '/',
    },
    isQiankun,
  } = props;

  console.log('isQiankun', isQiankun);
  return (
    <ProLayout
      {...defaultSettings}
      {...props}
      contentStyle={{
        margin: 0,
      }}
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      menuDataRender={menuDataRender}
      menuRender={window.__POWERED_BY_QIANKUN__ ? false : menuRender}
      headerRender={false}
    >
      {children}
    </ProLayout>
  );
};

export default connect(({ global }: ConnectState) => ({
  isQiankun: global.isQiankun,
}))(BasicLayout);
