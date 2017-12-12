import {template, Random} from '../mock.base'
import multipart from 'connect-multiparty'
import express from 'express'
import path from 'path'
const router = express.Router()
const multipartMiddleware = multipart({uploadDir: path.join(__dirname, '../../static/upload')})
import Config from '../../config/index'

// 获取行业列表
router.get('/get/business/type/list', (req, res) => {
  res.json(template([
    {
      industryId: 100,
      industryName: '@cname',
    },
    {
      industryId: 110,
      industryName: '@cname',
    }
  ]))
})

// 获取证件列表
router.get('/get/certificate/type/list', (req, res) => {
  res.json(template([
    {
      certificateTypeId: 1000,
      certificateTypeName: '@cname',
    },
    {
      certificateTypeId: 1101,
      certificateTypeName: '@cname',
    }
  ]))
})

// 返回选择买家
router.get('/select/buyer', (req, res) => {
  res.json(template([
    {
      storeId: 1,
      storeName: 'wea',
      type: 1,
      regionName: '山东-济南',
      industryName: '鲜花1',
      statusDesc: '-1',
      isSelect: false
    },
    {
      storeId: 2,
      storeName: '呵呵',
      type: 2,
      regionName: '北京-北京',
      industryName: '鲜花2',
      statusDesc: '0',
      isSelect: false
    }
  ]))
})

// 选择买家后缓存接口
router.post('/select/buyer/redis/save', (req, res) => {
  res.json(req.body)
})

// 获取选择买家后缓存接口
router.get('/select/buyer/redis/get', (req, res) => {
  res.json(template([
    {
      storeId: 1,
      storeName: 'wea',
      type: 1,
      regionName: '山东-济南',
      industryName: '鲜花3',
      statusDesc: '-1',
      isSelect: true
    },
    {
      storeId: 2,
      storeName: '呵呵',
      type: 2,
      regionName: '北京-北京',
      industryName: '鲜花4',
      statusDesc: '0',
      isSelect: false
    }
  ]))
})

// 获取商品分类数据
router.get('/get/category/list', (req, res) => {
  res.json(template([
    {
      cateId: 110,
      cateName: '@cname',
    },
    {
      cateId: 120,
      cateName: '@cname',
    }
  ]))
})

// 获取可查看专题列表
router.get('/activity/special/topic/list', (req, res) => {
  res.json(template({
    page: 1,
    size: 10,
    total: 50,
    'list|10':[
      {
        'topicId|+1': 12,
        'topicName': '@cname',
        'region': Random.city(),
        'industryName': '@cname'
      }
    ]
  }))
})

// 获取可查看的sku列表
router.get('/activity/sku/list', (req, res) => {
  res.json(template({
    page: 1,
    size: 10,
    total: 40,
    'list|10':[
      {
        'sku|+1': 12222221,
        'goodsName': '@cname',
        'defaultImage': 'http://img2.imgtn.bdimg.com/it/u=235760568,466687112&fm=26&gp=0.jpg',
        'spec': '@cname',
        'unit': 'KG',
        'salesCount|+1': 100
      }
    ]
  }))
})

// 七牛云图片上传(后端上传)
router.post('/qiniuyun/img/upload', multipartMiddleware, (req, res) => {
  let path = req.files.imageUrl.path
  let url = path.split('static/upload')[1]
  res.json({
    path: req.files.imageUrl.path,
    url: `http://127.0.0.1:${Config.mock.port}/static/upload${url}`
  })
})

// 保存上传的图片
router.post('/image/url/save', (req, res) => {
  res.json(res.body)
})

// 获取图片库选择列表
router.get('/get/local/image/url/list', (req, res) => {
  res.json(template({
    page: 1,
    size: 8,
    total: 30,
    'list|18':[
      {'imgUrl': Random.image()}
    ]
  }))
})

export default {
  api: '/fe/utils',
  router: router
}
