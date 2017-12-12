import {template} from '@/base/router.base'
const List = () => import ('./src/list.vue')
const Add = () => import ('./src/add.vue')
const Detail = () => import ('./src/detail.vue')
export default function (router) {
  const children = []
  router.push({
    path: '/recommend',
    name: 'recommend',
    component: template,
    children: children,
    meta: {
      isMenu: true,
      title: '推荐商品配置'
    }
  })
  /**
   * 推荐商品配置列表
   */
  children.push({
    path: '/recommend/list',
    name: 'recommendList',
    component: List,
    meta: {
      isMenu: true,
      title: '推荐商品配置列表',
      keepAlive: true
    }
  })
  /**
   * 新增推荐商品
   */
  children.push({
    path: '/recommend/add/:flagId',
    name: 'recommendAdd',
    component: Add,
    meta: {
      title: '新增推荐商品配置'
    }
  })
  /**
   * 新增推荐商品(全局默认)
   */
  children.push({
    path: '/recommend/default/:flagId',
    name: 'recommendAddDefault',
    component: Add,
    meta: {
      title: '全局默认配置'
    }
  })
  /**
   * 编辑推荐商品
   */
  children.push({
    path: '/recommend/add/:flagId/:configId',
    name: 'recommendEdit',
    component: Add,
    meta: {
      title: '推荐商品编辑'
    }
  })
  /**
   * 查看推荐商品
   */
  children.push({
    path: '/recommend/detail/:id',
    name: 'recommendDetail',
    component: Detail,
    meta: {
      title: '推荐商品查看'
    }
  })
}
