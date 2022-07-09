/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { logout } from '@/utils/utils';
import { message, notification } from 'antd';
import Cookies from 'js-cookie';
import { delay } from 'lodash';
import { extend } from 'umi-request';

interface ResponseError<D = any> extends Error {
  name: string;
  data: D;
  response: Response;
}

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  const { response = {} as Response } = error;
  if (response && response.status) {
    const errortext = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errortext,
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

request.interceptors.request.use((url, options) => {
  const { headers = {} } = options;
  headers['x-requested-with'] = 'XMLHttpRequest';
  return {
    url,
    options: {
      ...options,
      headers,
    },
  };
});

request.interceptors.response.use(
  async (response): Promise<any> => {
    const { status, headers } = response;
    // const res = await response.clone().json();
    if (status === 403) {
      const redirect = headers.get('redirect') || '';
      window.location.href = redirect;
    }

    return new Promise((resolve, reject) => {
      response
        .clone()
        .json()
        .then((res) => {
          if (res?.code === '0') {
            resolve(res.result);
          } else if (res?.code === '0006') {
            Cookies.remove('access_token');
            Cookies.remove('refresh_token');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            delay(() => {
              logout();
            }, 100);
            reject(res);
          } else {
            message.error(res.message);
            reject(res);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
);

export default request;

/**
 * 返回消息
 */
export interface ResponseObject<T> {
  /**
   * 状态码
   */
  code?: string;
  /**
   * 结果
   */
  success?: boolean;
  /**
   * 消息
   */
  message?: string;
  /**
   * 消息
   */
  cause?: string;
  /**
   * 结果
   */
  result?: T;
}

export function getResult<T = any>(
  data: ResponseObject<T>,
  showError = false,
): T | Promise<any> {
  if (data?.code === '0') {
    return <T>data.result;
  } else {
    if (showError) {
      message.error(data?.message);
    }
    return Promise.reject(data?.message);
  }
}
