import List from './src/list.vue'
import Add from './src/add.vue'
import ServiceSet from './src/serviceset.vue'
import Detial from './src/detail.vue'
import './src/public.scss'
export default function (router) {
  const children = []
  router.push({
    path: '/account',
    name: 'account',
    component: {template: `<router-view></router-view>`},
    children: children,
    meta: {
      isMenu: true,
      title: '账户管理'
    }
  })
  /**
   * 账户管理列表页面
   */
  children.push({
    path: '/account/list',
    name: 'accountList',
    component: List,
    meta: {
      isMenu: true,
      title: '用户列表'
    }
  })
  /**
   * 账户管理添加
   */
  children.push({
    path: '/account/add',
    name: 'accountAdd',
    component: Add,
    meta: {
      isMenu: true,
      title: '新增用户'
    }
  })
  /**
   * 账户基本信息修改
   */
  children.push({
    path: '/account/up/:id',
    name: 'accountUpdate',
    component: Add,
    meta: {
      isMenu: true,
      title: '用户编辑'
    }
  })
  /**
   * 账户管理新增用户服务设置页面
   */
  children.push({
    path: '/account/set/:id',
    name: 'accountAddSet',
    component: ServiceSet,
    meta: {
      title: '新增用户'
    }
  })
  /**
   * 账户管理服务设置页面
   */
  children.push({
    path: '/account/setup/:id',
    name: 'accountSet',
    component: ServiceSet,
    meta: {
      title: '服务设置'
    }
  })
  /**
   * 账户管理查看页面
   */
  children.push({
    path: '/account/detail/:id',
    name: 'accountDetail',
    component: Detial,
    meta: {
      title: '用户查看'
    }
  })
}
