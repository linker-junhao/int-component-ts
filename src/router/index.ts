import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/home.vue')
  }
]

export default createRouter({
  history: createWebHistory('./'),
  routes
})