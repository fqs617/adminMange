import {template} from '@/base/router.base'
const List = () => import ('./src/list.vue')
const Area = () => import ('./src/add.area.vue')
export default function(routers) {
  let children = []
  routers.push({
    path: '/index/list/',
    name: 'indexListTmpl',
    component: template,
    children: children,
    meta: {
      isMenu: true,
      title: '单栏专区配置'
    }
  })
  /**
   * 首页配置/单栏专区配置
   * @param {String} type 0 单栏
   */
  children.push({
    path: '/index/list/:type',
    name: 'indexList',
    component: List,
    meta: {
      isMenu: true,
      title: '单栏专区配置列表',
      keepAlive: true
    }
  })
  /**
   * 首页配置/组合专区配置
   */
  children.push({
    path: '/index/group/',
    name: 'indexGroup',
    component: List,
    meta: {
      isMenu: true,
      title: '组合专区配置列表',
      keepAlive: true
    }
  })
  /**
   * 首页配置/新增单栏专区配置 新增
   * @param {String} type 0 单栏 1 组合
   */
  children.push({
    path: '/index/addarea/:type',
    name: 'indexAddAreaSingle',
    component: Area,
    meta: {
      isMenu: true,
      title: '新增单栏专区配置'
    }
  })
  /**
   * 首页配置/新增单栏专区配置 编辑
   * @param {String} type 0 单栏 1 组合
   */
  children.push({
    path: '/index/editarea/:programId/:type',
    name: 'indexEditAreaSingle',
    component: Area,
    meta: {
      isMenu: true,
      title: '编辑单栏专区配置'
    }
  })
  /**
   * 首页配置/组合专区配置 新增
   */
  children.push({
    path: '/index/addarea',
    name: 'indexAddArea',
    component: Area,
    meta: {
      isMenu: true,
      title: '新增组合专区配置'
    }
  })
  /**
   * 首页配置/组合专区配置 编辑
   */
  children.push({
    path: '/index/editarea/:programId',
    name: 'indexEditArea',
    component: Area,
    meta: {
      isMenu: true,
      title: '编辑组合专区配置'
    }
  })
}
