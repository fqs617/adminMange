import {template, Random} from '../mock.base'
import express from 'express'
const router = express.Router()
// 单栏专区列表
router.post('/program/single/list', (req, res) => {
  res.json(template({
    page: 1,
    size: 20,
    total: 50,
    'programList|20': [
      {
        'programId|+1': 100,
        'region': '@cname',
        'industryName': '@cname',
        'isShow': '1',
        'sortValue|+1': '1',
        'programName': '@cname',
        createTime: '@date(yyyy-MM-dd hh:mm:ss)',
        showStartTime: '@date(yyyy-MM-dd hh:mm:ss)',
        showEndTime: '@date(yyyy-MM-dd hh:mm:ss)',
        programPic: 'http://img2.imgtn.bdimg.com/it/u=235760568,466687112&fm=26&gp=0.jpg',
        mainTitleName: '@cname',
        mainTitleColor: Random.color(),
        subTitleName: '@cname',
        subTitleColor: Random.color(),
        linkValue: '@url',
        linkDesc: '@ctitle(6)',
        backgroundType: 1,
        backgroundValue: Random.color()
      }
    ]
  }))
})
// 多栏列表
router.post('/program/group/list', (req, res) => {
  res.json(template({
    page: 1,
    size: 20,
    total: 100,
    'programList|2': [
      {
        'programId|+1': 100,
        'region': '@cname',
        'industryName': '@cname',
        'isShow': '1',
        'sortValue|+1': 1,
        'programName': '@cname',
        createTime: '@date(yyyy-MM-dd hh:mm:ss)',
        showStartTime: '@date(yyyy-MM-dd hh:mm:ss)',
        showEndTime: '@date(yyyy-MM-dd hh:mm:ss)',
        programPic: Random.image(),
        mainTitleName: '@cname',
        mainTitleColor: Random.color(),
        subTitleName: '@cname',
        subTitleColor: Random.color(),
        linkValue: '@url',
        linkDesc: '@ctitle(6)',
        backgroundType: 2,
        backgroundValue: Random.color()
      }
    ]
  }))
})
// 单栏编辑
router.post('/program/single/edit', (req, res) => {
  res.json(template({
    programId: 1,
    provinceId: 5,
    cityId: 33,
    industryId: 1,
    industryName: '行业1',
    region: '省-市',
    programName: '@cname',
    backgroundType: 2,
    backgroundValue: 'http://img2.imgtn.bdimg.com/it/u=235760568,466687112&fm=26&gp=0.jpg',
    programPic: 'http://img2.imgtn.bdimg.com/it/u=235760568,466687112&fm=26&gp=0.jpg',
    mainTitleName: '@cname',
    mainTitleColor: Random.color(),
    subTitleName: '@cname',
    subTitleColor: Random.color(),
    linkType: 2,
    linkValue: {
      type: 2,
      cate1: 110,
      cate2: 120
    },
    linkDesc: '分类列表-一级-二级',
    isShow: '1',
    sortValue: '2',
    showStartTime: '@date(yyyy-MM-dd hh:mm:ss)',
    showEndTime: '@date(yyyy-MM-dd hh:mm:ss)'
  }))
})
// 多栏编辑
router.post('/program/group/edit', (req, res) => {
  res.json(template({
    programId: '2',
    provinceId: '2',
    cityId: '1',
    industryId: '1',
    industryName: '行业1',
    region: '省-市',
    programName: '@cname',
    backgroundType: 1,
    backgroundValue: Random.color(),
    programPic: 'http://img2.imgtn.bdimg.com/it/u=235760568,466687112&fm=26&gp=0.jpg',
    mainTitleName: '@cname',
    mainTitleColor: Random.color(),
    subTitleName: '@cname',
    subTitleColor: Random.color(),
    linkType: '1',
    linkValue: 'http://img2.imgtn.bdimg.com/it/u=235760568,466687112&fm=26&gp=0.jpg',
    linkDesc: '@cname',
    isShow: '1',
    sortValue: '2',
    showStartTime: '@date(yyyy-MM-dd hh:mm:ss)',
    showEndTime: '@date(yyyy-MM-dd hh:mm:ss)'
  }))
})
// 新增/编辑保存单栏专区
router.post('/program/single/add', (req, res) => {
  res.json(req.body)
})
// 新增/编辑保存组合专区
router.post('/program/group/add', (req, res) => {
  res.json(req.body)
})
// 关闭单栏专区
router.post('/program/single/close', (req, res) => {
  res.json(req.body)
})
// 删除单栏专区配置
router.post('/program/single/delete', (req, res) => {
  res.json(req.body)
})
export default {
  api: '/fe/homeconfig',
  router: router
}
