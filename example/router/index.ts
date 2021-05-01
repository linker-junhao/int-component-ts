import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../view/home/index')
  },
  {
    path: '/drag-drop',
    component: () => import('../view/drag-drop')
  },
  {
    path: '/proxy-config',
    component: () => import('../view/proxy-config/index')
  }
];

export default createRouter({
  // 4. Provide the history implementation to use.
  // We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes // short for `routes: routes`
});
