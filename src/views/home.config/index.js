import bannerRouter from '@/views/banner'
import IndexRouter from '@/views/index'
import recommendRouter from '@/views/recommend'
// import brandRouter from '@/views/brand'

export default function (router) {
  const children = []
  router.push({
    path: '/home/config',
    name: 'homeConfig',
    component: {template: `<router-view></router-view>`},
    children: children,
    meta: {
      isMenu: true,
      title: '首页配置'
    }
  })
  bannerRouter(children)
  recommendRouter(children)
  IndexRouter(children)
  // brandRouter(children)
}
