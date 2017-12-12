import {template, Random} from '../mock.base'
import multipart from 'connect-multiparty'
import express from 'express'
import path from 'path'
const router = express.Router()
const multipartMiddleware = multipart({uploadDir: path.join(__dirname, '../../static/upload')})
import Config from '../../config/index'

// /api/list
router.get('/list', (req, res) => {
  if (req.query.page === '1') {
    res.json(template({
      name: '@guid',
      city: Random.city(),
      'modules': [
        {
          type: 'ad',
          email: '@email',
          link: [
            {
              type: 'template',
              id: 1
            },
            {
              type: 'category',
              cate1: 1,
              cate2: 2
            },
            {
              type: 'goods',
              spedId: 1000
            },
            {
              type: 'coupon',
              pid: 1
            }
          ]
        }
      ]
    }))
    return
  }
  res.json(template({
    next: 2,
    size: 20,
    'list|20': [
      {
        'id|+1': 1,
        name: '@cname',
        bool: '@bool',
        'boolean|1-2': true,
        'number|1-100.1-10': 1,
        'number1|123.1-10': 1,
        'number2|123.3': 1,
        'object|2': {
          '310000': '上海市',
          '320000': '江苏省'
        },
        time: '@now("yyyy-MM-dd HH:mm:ss")',
        img: '@image',
        color: '@color',
        desc: '@paragraph',
        desc1: '@cparagraph'
      }
    ]
  }))
})

router.post('/add', (req, res) => {
  console.log(req.headers['Token'])
  // console.log(JSON.parse(req.body.menu))
  res.json(req.body)
})

router.post('/upload', multipartMiddleware, (req, res) => {
  let path = req.files.file.path
  let url = path.split('static/upload')[1]
  res.json({
    path: req.files.file.path,
    url: `http://127.0.0.1:${Config.mock.port}/static/upload${url}`
  })
})

// 验证姓名
router.post('/vaild', (req, res) => {
  res.json({
    vaild: req.body.name === 'haha'
  })
})

export default {
  api: '/fe/test',
  router: router
}
