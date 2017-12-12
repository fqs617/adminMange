import {template} from '@/base/router.base'
const List = () => import ('./src/list.vue')
const Add = () => import ('./src/add.vue')
export default function (router) {
  const children = []
  router.push({
    path: '/banner',
    name: 'banner',
    component: template,
    children: children,
    meta: {
      isMenu: true,
      title: 'Banner配置'
    }
  })
  /**
   * Banner列表
   */
  children.push({
    path: '/banner/list',
    name: 'bannerList',
    component: List,
    meta: {
      isMenu: true,
      title: 'Banner列表',
      keepAlive: true
    }
  })
  /**
   * Banner增加
   */
  children.push({
    path: '/banner/add',
    name: 'bannerAdd',
    component: Add,
    meta: {
      title: '新增Banner'
    }
  })
   /**
   * Banner修改
   */
  children.push({
    path: '/banner/add/:id',
    name: 'bannerEdit',
    component: Add,
    meta: {
      title: '编辑Banner'
    }
  })
}
