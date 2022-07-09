import request from '@/utils/request';

const basePrefix = '';
// const basePrefix = '/api';

// 接口测试
export async function testApi(
  body: Record<string, any>,
  options?: Record<string, any>,
) {
  return request<Record<string, any>>(`${basePrefix}/test`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
