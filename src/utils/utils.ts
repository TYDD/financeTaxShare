/*
 * @Author: 周冰洁
 * @desc: 业务需求公共函数
 */

export const logout = () => {
  // 本地启动的时候不用退出跳转
  if (window.location.hostname === 'localhost') {
    return;
  }
  // 判断是生产环境，还是测试环境，退出跳转到对应的页面
  if (location.host === 'workbench.fat.yzf.net') {
    window.location.href = 'http://account.fat.yzf.net/vac/login';
  } else if (location.host === 'workbench.devn.yzf.net') {
    window.location.href = 'http://account.devn.yzf.net/vac/login';
  } else {
    window.location.href = 'https://account.yunzhangfang.com/vac/login';
  }
};
