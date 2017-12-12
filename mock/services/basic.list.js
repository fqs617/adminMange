import {template} from '../mock.base'
import express from 'express'
const router = express.Router()

router.get('/setting/new/seller/role/list', (req, res) => {
  res.json(template({
    page: 1,
    pageSize: 20,
    total: 100,
    'roleList|2': [
      {
        'roleId|+1': 100,
        rolename: '@cname',
        createTime: '@date'
      }
    ]
  }))
})

export default {
  api: '/fe/basic',
  router: router
}
