export interface GlobalModelState {
  isQiankun: boolean;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {};
  reducers: {};
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    // 是否从qiankun启动
    isQiankun: !!window.__POWERED_BY_QIANKUN__,
  },

  effects: {},

  reducers: {},
};

export default GlobalModel;
