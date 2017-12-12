import {template, Random} from '../mock.base'
import express from 'express'
let router = express.Router()
const IMGS = [
  'http://img.bqmart.cn/data/files/store/413f4dc50eca5a4dd3063397dbb2f7d6.png',
  'http://img.bqmart.cn/data/files/store/301ee88267ca66e9cc3c857c701028d7.jpeg',
  'http://img.bqmart.cn/data/files/store/2f4954e0abef939d2cc59bb9bff64241.jpeg',
  'http://img.bqmart.cn/data/files/store/b5b9018a3d3ae24f90bb8b7db7660cf2.jpeg',
  'http://img.bqmart.cn/data/files/store/9e728833b84e500e6615ad52fb653f87.jpeg',
  'https://si.geilicdn.com/bj-pc-1235379437-1502682490097-301145863_2048_1365.jpg?w=1080&h=719'
]
router.get('/clobal/list', (req, res) => {
  res.json(template({
    page: 1,
    size: 20,
    total: 100,
    'programList|20': [
      {
        'programId|+1': 1,
        'bannerId|+1': 1,
        region: '@city',
        industryName: '@cname',
        "type|1-3": 1,
        regionName: Random.city(),
        isShow: 1,
        sortValue: 1,
        programName: '@cname',
        createTime: '@now("yyyy-MM-dd HH:mm:ss")',
        showStartTime:'@now("yyyy-MM-dd HH:mm:ss")',
        showEndTime: '@now("yyyy-MM-dd HH:mm:ss")',
        programPic: 'http://img.bqmart.cn/data/files/store/2f4954e0abef939d2cc59bb9bff64241.jpeg',
        mainTitleName: '@cname',
        mainTitleColor: '##12ff',
        subTitleName: '@cname',
        subTitleColor: '##12ff',
        linkValue: 'http://img.bqmart.cn/data/files/store/2f4954e0abef939d2cc59bb9bff64241.jpeg',
        linkDesc: '@cname',
        backgroundType: 1,
        backgroundValue: '##1122ff'
      }
    ]
  }))
})
router.get('/banner/edit', (req, res) => {
  res.json(template([
    {
      programId: 1,
      region: '北京市-朝阳区',
      provinceId: 5,
      cityId: 33,
      industryName: '行业2',
      industryId: '2',
      regionName: Random.city(),
      bannerName: '哈哈哈',
      isShow: 1,
      sortValue: 1,
      programName: '挖掘机',
      showStartTime:'2017-09-10 00:00:00',
      showEndTime: '2017-10-10 00:00:00',
      programPic: 'http://img.bqmart.cn/data/files/store/2f4954e0abef939d2cc59bb9bff64241.jpeg',
      linkValue: 'http://azeroth.bqmart.cn/topic/1',
      linkDesc: '专题-001'
    }
  ]))
})
export default {
  api: '/fe/homeconfig/program',
  router: router
}
