export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/welcome',
        name: 'welcome',
        component: './Welcome',
      },
      {
        path: '/404',
        component: './404',
      },
      {
        redirect: '/welcome',
      },
    ],
  },
];
