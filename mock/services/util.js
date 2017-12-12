import {template, Random} from '../mock.base'
// import Mock from 'mockjs'
import express from 'express'
let router = express.Router()
// 获取sku列表
router.get('/activity/sku/list', (req, res) => {
  console.log(req.query)
  // console.log(req.params)
  res.json(template({
    'page': req.query.page,
    'size': 10,
    'total': 200,
    'total|10': [{
      'sku': '@id',
      'goodsPic': Random.image(),
      'goodsName': '@ctitle',
      'spec': /200ml|150g/,
      'unit': /瓶|袋|克/,
      'programName': '@ctitle',
      'sales|1000-2000': 1,
      'sortValue': '1'
    }]
  }))
})
// /store/view
// 启用禁用
// router.get
export default {
  api: '/fe/api/util',
  router: router
}
