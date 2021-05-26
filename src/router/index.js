import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../pages/Login.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../pages/test/index.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  store.commit('http/clear')
  next()
})

export default router
