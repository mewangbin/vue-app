import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'default',
      component: () => import('../pages/Default.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../pages/test/Index.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/Login.vue'),
      meta: { requireAuth: false }
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
  store.commit('httpStore/clear')
  if (to.matched.some((tmp) => tmp.meta.requireAuth)) {
    let token = store.getters['userStore/getToken']
    if (token) {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } })
    }
  } else {
    next()
  }
})

export default router
