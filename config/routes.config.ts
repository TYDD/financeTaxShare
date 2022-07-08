export default [
  {
    path: '/welcome',
    name: 'welcome',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        component: './Welcome',
      },
      // {
      //   component: './404',
      // },
    ],
  },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  // {
  //   component: './404',
  // },
];
