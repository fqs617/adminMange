import {template, Random} from '../mock.base'
import express from 'express'
const router = express.Router()

// 获取行业
router.get('/utils/get/business/type/list', (req, res) => {
  res.json(template(
    [
      {
        industryId: 1,
        industryName: '行业1'
      }, {
        industryId: 2,
        industryName: '行业2'
      }
    ]
  ))
})
// 获取区域信息
router.get('/utils/get/region/list', (req, res) => {
  let regionId = parseInt(req.query.regionId)
  switch (true) {
    case regionId === 1:
      res.json(template({
        'regionList|19': [{
          'regionId|+1': 2,
          regionName: '@province',
          'flag': true
        }]
      }))
      break
    case regionId >= 2 && regionId < 20:
      res.json(template({
        'regionList|20': [{
          'regionId|+1': 20,
          regionName: '@city',
          'flag|1-2': true
        }]
      }))
      break
    case regionId >= 20 && regionId < 40:
      res.json(template({
        'regionList|20': [{
          'regionId|+1': 40,
          regionName: '@county',
          flag: false
        }]
      }))
      break
    default:
      res.json({
        regionList: []
      })
  }
})
// 选取sku
router.get('/util/activity/sku/list', (req, res) => {
  res.json(template({
    configId: 1,
    provinceId: 1,
    cityId: 1,
    industryId: 1,
    industryName: 'whah',
    page: 1,
    size: 10,
    total: 4,
    list: [{
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
    },
    {
      id: 4,
      sku: 123456783,
      goodsPic: 'http://img.bqmart.cn/data/files/store/0a3fdfc618194850d365ab3ff4020c21.jpeg',
      goodsName: '哇哈哈哈',
      spec: '盒4',
      goodsUnit: '个',
      salesCount: 12,
      sortValue: 3
    },
    {
      id: 5,
      sku: 123456783,
      goodsPic: 'http://img.bqmart.cn/data/files/store/0a3fdfc618194850d365ab3ff4020c21.jpeg',
      goodsName: '哇哈哈哈',
      spec: '盒5',
      goodsUnit: '个',
      salesCount: 12,
      sortValue: 3
    },
    {
      id: 5,
      sku: 123456783,
      goodsPic: 'http://img.bqmart.cn/data/files/store/0a3fdfc618194850d365ab3ff4020c21.jpeg',
      goodsName: '哇哈哈哈',
      spec: '盒5',
      goodsUnit: '个',
      salesCount: 12,
      sortValue: 3
    },
    {
      id: 5,
      sku: 123456783,
      goodsPic: 'http://img.bqmart.cn/data/files/store/0a3fdfc618194850d365ab3ff4020c21.jpeg',
      goodsName: '哇哈哈哈',
      spec: '盒5',
      goodsUnit: '个',
      salesCount: 12,
      sortValue: 3
    },
    {
      id: 5,
      sku: 123456783,
      goodsPic: 'http://img.bqmart.cn/data/files/store/0a3fdfc618194850d365ab3ff4020c21.jpeg',
      goodsName: '哇哈哈哈',
      spec: '盒5',
      goodsUnit: '个',
      salesCount: 12,
      sortValue: 3
    }]
  }))
})
export default {
  api: '/fe/api',
  router: router
}
