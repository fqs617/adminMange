import BrandList from './src/brand.list.vue'
import BrandAdd from './src/brand.add.vue'
export default function (router) {
  let children = []
  router.push({
    path: '/brand',
    component: {template: '<router-view></router-view>'},
    children: children,
    meta: {
      isMenu: true,
      title: '品牌分类专区配置'
    }
  })

  router.push({
    path: '/brand/list',
    name: 'brandList',
    component: BrandList,
    meta: {
      isMenu: true,
      title: '品牌分类专区配置'
    }
  })

  children.push({
    path: '/brand/add',
    name: 'brandAdd',
    component: BrandAdd,
    meta: {
      title: '新增品牌分类专区'
    }
  })

  children.push({
    path: '/brand/add/:brandId',
    name: 'brandEdit',
    component: BrandAdd,
    meta: {
      title: '编辑品牌分类专区'
    }
  })
}
