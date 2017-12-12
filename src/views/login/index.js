import Login from './src/index.vue'
export default function (router) {
  /**
   * 登录
   */
  router.push({
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  })
}
