import request from '@/utils/request';

const loginPrefix = '/api/login';

/** 退出登录接口 */
export async function outLogin(options?: Record<string, any>) {
  return request<Record<string, any>>(`${loginPrefix}/outLogin`, {
    method: 'POST',
    ...(options || {}),
  });
}
