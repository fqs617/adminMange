import {template, Random} from '../mock.base'
// import Mock from 'mockjs'
import express from 'express'
let router = express.Router()
// 获取默认配置
router.get('/clobal/configuration', (req, res) => {
  res.json(template({
    configId: 1,
    provinceId: 1,
    cityId: 1,
    industryId: 1,
    industryName: 'whah',
    goodsList: [{
      id: 1,
      sku: 123456781,
      goodsPic: 'http://img.bqmart.cn/data/files/store/0a3fdfc618194850d365ab3ff4020c21.jpeg',
      goodsName: '哇哈哈哈',
      spec: '盒1',
      goodsUnit: '个',
      salesCount: 12,
      sortValue: 1
    }]
  }))
})
// 编辑获取配置
router.get('/clobal/edit', (req, res) => {
  res.json(template({
    configId: 1,
    provinceId: 5,
    cityId: 33,
    industryId: '1',
    industryName: 'whah',
    goodsList: [{
      id: 1,
      sku: 123456781,
      goodsPic: 'http://img.bqmart.cn/data/files/store/0a3fdfc618194850d365ab3ff4020c21.jpeg',
      goodsName: '哇哈哈哈',
      spec: '盒1',
      goodsUnit: '个',
      salesCount: 12,
      sortValue: 1
    },
    {
      id: 2,
      sku: 123456782,
      goodsPic: 'http://img.bqmart.cn/data/files/store/0a3fdfc618194850d365ab3ff4020c21.jpeg',
      goodsName: '哇哈哈哈',
      spec: '盒2',
      goodsUnit: '个',
      salesCount: 12,
      sortValue: 2
    },
    {
      id: 3,
      sku: 123456783,
      goodsPic: 'http://img.bqmart.cn/data/files/store/0a3fdfc618194850d365ab3ff4020c21.jpeg',
      goodsName: '哇哈哈哈',
      spec: '盒3',
      goodsUnit: '个',
      salesCount: 12,
      sortValue: 3
    }]
  }))
})
// /store/view
// 启用禁用
// 推荐商品配置类表页
router.get('/clobal/configuration/list', (req, res) => {
  res.json(template({
    page: 1,
    size: 20,
    total: 30,
    'goodsList|20': [{
      configId: '@id',
      createTime: '@county',
      region: '@county',
      industry: '@city',
      skuCount: '@id',
      isShow: 1
    }]
  }))
})
// 查看推荐商品配置类表页
router.get('/clobal/goods/list', (req, res) => {
  res.json(template([
    {
     region: '北京市-朝阳区',
     industryName: '商超',
     skuCount: 20,
     goodsList: [
      {
        sku: '1010229321',
        goodsPic: 'http://img.bqmart.cn/data/files/store/0a3fdfc618194850d365ab3ff4020c21.jpeg',
        goodsName: '商品名称',
        spec: '规格',
        goodsUnit: '单位',
        sales: 12393,
        sortValue: 1
      },
      {
        sku: '1010229321',
        goodsPic: 'http://img.bqmart.cn/data/files/store/0a3fdfc618194850d365ab3ff4020c21.jpeg',
        goodsName: '商品名称',
        spec: '规格',
        goodsUnit: '单位',
        sales: 12393,
        sortValue: 1
      }
     ]
    }
  ]))
})
export default {
  api: '/fe/homeconfig/program',
  router: router
}
