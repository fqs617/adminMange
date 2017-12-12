import {template} from '@/base/router.base'
import Seller from './src/seller.vue'
import Backstage from './src/backstage.vue'
const showPower = resolve => require(['./src/show.power.vue'], resolve)

export default function(router) {
  let children = []
  router.push({
    path: '/basic',
    component: template,
    children: children,
    meta: {
      isMenu: true,
      title: '基础设置'
    }
  })
  /**
   * 云采卖家角色与权限设置
   */
  children.push({
    path: '/basic/seller',
    name: 'basicSeller',
    component: Seller,
    meta: {
      isMenu: true,
      title: '云采卖家角色与权限设置',
      keepAlive: true
    }
  })
  /**
   * 云采后台角色与权限设置
   */
  children.push({
    path: '/basic/backstage',
    name: 'basicBackstage',
    component: Backstage,
    meta: {
      isMenu: true,
      title: '云采后台角色与权限设置',
      keepAlive: true
    }
  })
  /**
   * 云采卖家角色与权限设置/权限查看 新增云采卖家角色
   * @param {String} add true 新增 false 查看
   * @param {String} type 0 卖家
   */
  children.push({
    path: '/basic/add/:add/:type',
    name: 'basicAddSingle',
    component: showPower,
    meta: {
      isMenu: true,
      title: '新增云采卖家角色'
    }
  })
  /**
   * 云采后台角色与权限设置/权限查看 新增云采卖家角色
   * @param {String} add true 新增 false 查看
   */
  children.push({
    path: '/basic/add/:add',
    name: 'basicAdd',
    component: showPower,
    meta: {
      isMenu: true,
      title: '新增云采后台角色'
    }
  })
  /**
   * 云采卖家角色与权限设置/权限查看 新增云采卖家角色
   * @param {String} add true 新增 false 查看
   * @param {String} type 0 卖家
   */
  children.push({
    path: '/basic/edit/:add/:id/:type',
    name: 'basicEditSeller',
    component: showPower,
    meta: {
      isMenu: true,
      title: '编辑云采卖家角色'
    }
  })
  /**
   * 云采卖家角色与权限设置/权限查看 新增云采卖家角色
   * @param {String} add true 新增 false 查看
   * @param {String} type 0 卖家
   */
  children.push({
    path: '/basic/edit/:add/:id/',
    name: 'basicEdit',
    component: showPower,
    meta: {
      isMenu: true,
      title: '编辑云采后台角色'
    }
  })
  /**
   * 云采后台角色与权限设置/权限查看 新增云采卖家角色
   * @param {String} add true 新增 false 查看
   */
  children.push({
    path: '/basic/edit/:add',
    name: 'basicShowPower',
    component: showPower,
    meta: {
      isMenu: true,
      title: '编辑云采后台角色'
    }
  })
  /**
   * 云采后台角色与权限设置/权限查看 新增云采卖家角色
   * @param {String} type 0 卖家
   * @param {String} id 角色id
   */
  children.push({
    path: '/basic/show/:id/:type',
    name: 'basicShow',
    component: showPower,
    meta: {
      isMenu: true,
      title: '查看权限'
    }
  })
}
