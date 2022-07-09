import type { GlobalModelState } from './global';

export { GlobalModelState, UserModelState };

export interface Loading {
  global: boolean;
  effects: Record<string, boolean | undefined>;
  models: {
    global?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
}
