
// createRouter：创建router实例对象
// createWebHistory：创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import { getCategoryAPI } from '@/api/category'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/laout/index.vue'),
      children: [{
        path: '',
        component: () => import('@/views/Home/index.vue')
      },
      {
        path: 'Category/:id',
        component: () => import('@/views/Category/index.vue')
      },
      {
        path: 'Category/sub/:id',
        component: () => import('@/views/SubCategory/index.vue')
      },
      {
        path: 'Detail/:id',
        component: () => import('@/views/Detail/index.vue')
      },
      {
        path: 'CartList',
        component: () => import('@/views/CartList/index.vue')
      }]

    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    }
  ],
  // 路由行为定制 切换路由时默认滚动在顶部
  scrollBehavior() {
    return {
      top: 0
    }
  }
})




export default router
