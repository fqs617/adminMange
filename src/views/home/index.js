const Home = () => import ('./src/home.vue')
export default function(router) {
  router.push({
    path: '/',
    name: 'home',
    component: Home,
    alias: '/home',
    meta: {
      isMenu: true,
      title: '首页'
    }
  })
}
