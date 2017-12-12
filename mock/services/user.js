import {template, Random} from '../mock.base'
// import Mock from 'mockjs'
import express from 'express'
let router = express.Router()
// 获取sku列表
router.post('/login', (req, res) => {
  res.json(template({
    'operatorId': 12433,
    'userName': 'userNameValue',
    'token': '12313131312321'
  }))
})
// /store/view
// 启用禁用
// router.get
export default {
  api: '/fe/user',
  router: router
}
