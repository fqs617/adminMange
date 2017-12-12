const Merchant = () => import ('./src/merchant.list.vue')
const AddMerchant = () => import ('./src/add.merchant.vue')
const MerchantDetail = () => import ('./src/merchant.detail.vue')
export default function (router) {

  let children = []
  router.push({
    path: '/merchant',
    name: 'merchant',
    component: {template: '<router-view></router-view>'},
    children: children,
    meta: {
      isMenu: true,
      title: '商户管理'
    }
  })

  children.push({
    path: '/merchant/list',
    name: 'merchantList',
    component: Merchant,
    meta: {
      isMenu: true,
      title: '商户列表',
      keepAlive: true
    }
  })

  children.push({
    path: '/merchant/:page',
    name: 'addMerchantStep',
    component: AddMerchant,
    meta: {
      isMenu: true,
      title: '新增商户'
    }
  })

  children.push({
    path: '/merchant/:page/:step/:merchantId',
    name: 'completeMerchant',
    component: AddMerchant,
    meta: {
      isMenu: true,
      title: '新增商户'
    }
  })

  children.push({
    path: '/merchant/:page/:storeId',
    name: 'merchantDetail',
    component: MerchantDetail,
    meta: {
      title: '商户详情'
    }
  })
}
