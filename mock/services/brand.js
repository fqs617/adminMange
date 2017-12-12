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
router.get('/brand/category/list', (req, res) => {
  res.json(template([
    {
      brandId: 1,
      createTime: '2017-01-02 12:34:56',
      region: '所属地区',
      industryName: '所属行业',
      status: '品牌分类状态',
      detailList: {
        name: '哇哈哈哈1',
        imgUrl: IMGS[Math.floor(Math.random() * 5)]
      }
    },
    {
      brandId: 2,
      createTime: '2017-01-02 12:34:56',
      region: '所属地区',
      industryName: '所属行业',
      status: '品牌分类状态',
      detailList: {
        name: '哇哈哈哈2',
        imgUrl: IMGS[Math.floor(Math.random() * 5)]
      }
    },
    {
      brandId: 3,
      createTime: '2017-01-02 12:34:56',
      region: '所属地区',
      industryName: '所属行业',
      status: '品牌分类状态',
      detailList: {
        name: '哇哈哈哈3',
        imgUrl: IMGS[Math.floor(Math.random() * 5)]
      }
    },
    {
      brandId: 4,
      createTime: '2017-01-02 12:34:56',
      region: '所属地区',
      industryName: '所属行业',
      status: '品牌分类状态',
      detailList: {
        name: '哇哈哈哈4',
        imgUrl: IMGS[Math.floor(Math.random() * 5)]
      }
    }
  ]))
})
export default {
  api: '/fe/api',
  router: router
}
