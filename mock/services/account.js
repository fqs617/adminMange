import {template} from '../mock.base'
import Mock from 'mockjs'
import express from 'express'
let router = express.Router()
// 用户列表数据
router.get('/list', (req, res) => {
  console.log(req.query)
  // console.log(req.params)
  res.json(template({
    page: req.query.page,
    size: 20,
    total: 100,
    'list|20': [{
      'userId|+1': (req.query.page * req.query.pageSize),
      'userName': /^YZ_\d{8}/,
      'phone': /^1[34578]\d{9}$/,
      'email': '@email',
      'provinceId|1-100': 1,
      'province': '@province',
      'cityId|100=200': 1,
      'city': '@city',
      'districtId|200-300': 200,
      'district': '@county',
      'homeLocation': '归属地',
      'createTimeStr': '@date',
      'createTime': 435346,
      'type': /0|2|3|4|7/,
      'isParentType': /1|2/,
      'status': /0|1|2/
    }]
  }))
})
// 用户删除
router.post('/delete', (req, res) => {
  console.log(req.params)
  // console.log(req.query)
  // console.log(req.params)
  res.json(Mock.mock({
    code: '0',
    message: 'success',
    data: 'success'
  }))
})
// 用户启用或禁用
router.post('/change/status', (req, res) => {
  console.log(req.query)
  console.log(req.params)
  res.json(template({
    userId: req.params.userId,
    status: (req.params.status * 1) === 0 ? 1 : 0
  }))
})
// 用户启用或禁用
router.post('/reset/password', (req, res) => {
  console.log(req.query)
  console.log(req.params)
  res.json(Mock.mock({
    code: '0',
    message: 'success',
    data: 'success'
  }))
})
// 新增账号
router.post('/info/add', (req, res) => {
  console.log(req.query)
  console.log(req.params)
  res.json(template({
    'userId|1-1000': 2,
    'userName': /^YZ_\d{8}/,
    'phone': /^1[34578]\d{9}$/,
    'homeLocation': '归属地'
  }))
})
// 获取服务设置
router.get('/service/edit', (req, res) => {
  console.log(req.query)
  console.log(req.params)
  res.json(template({
    'userId|1-1000': 2,
    'userName': /^YZ_\d{8}/,
    'phone': /^1[34578]\d{9}$/,
    'homeLocation': '归属地',
    cloudStoreService: null,
    cloudBackendService: null
  }))
})
// 获取商户列表
router.get('/store/list', (req, res) => {
  console.log(req.query)
  console.log(req.params)
  res.json(template({
    page: req.query.page,
    size: 10,
    total: 200,
    'list|10': [{
      'storeId|+1': (req.query.page * req.query.pageSize),
      'storeName': '@csentence(3, 5)',
      'homeLocation': '归属地',
      'industryName': '@csentence(3, 5)',
      'status': /0|1/
    }]
  }))
})
// 获取商户具体信息
router.get('/store/view', (req, res) => {
  console.log(req.query)
  console.log(req.params)
  res.json(template({
    'storeId': req.query.storeId,
    'storeName': '@csentence(3, 5)',
    'homeLocation': '归属地',
    'industryName': '@csentence(3, 5)',
    'status': /0|1/
  }))
})
// 获取接触权限信息
router.get('/auth/setting', (req, res) => {
  console.log(req.query)
  console.log(req.params)
  res.json(template({
    'roleList|5-8': [{
      'roleId|+1': 1,
      'roleName': '@cword(3,8)',
      'roleType': 3,
      'menuIds': /20,15,30,50|8,15,30,3|20,33,44,48/
    }],
    menuList: [
      {
        menuId: 1,
        menuParentId: 0,
        menuName: '商品管理',
        subMenuList: [
          {
            'menuId': 2,
            'menuParentId': 1,
            'menuName': '我要供货',
            'subMenuList': [
              {
                'menuId': 3,
                'menuParentId': 2,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 4,
                'menuParentId': 2,
                'menuName': '填写供货信息',
                'subMenuList': ''
              }
            ]
          },
          {
            'menuId': 5,
            'menuParentId': 1,
            'menuName': '我的供货',
            'subMenuList': [
              {
                'menuId': 6,
                'menuParentId': 5,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 7,
                'menuParentId': 5,
                'menuName': '添加供货商品',
                'subMenuList': ''
              },
              {
                'menuId': 8,
                'menuParentId': 5,
                'menuName': '供货信息编辑',
                'subMenuList': ''
              },
              {
                'menuId': 9,
                'menuParentId': 5,
                'menuName': '上架下架',
                'subMenuList': ''
              },
              {
                'menuId': 10,
                'menuParentId': 5,
                'menuName': '记录',
                'subMenuList': ''
              },
              {
                'menuId': 11,
                'menuParentId': 5,
                'menuName': '基本信息编辑',
                'subMenuList': ''
              }
            ]
          },
          {
            'menuId': 12,
            'menuParentId': 1,
            'menuName': '分类标签',
            'subMenuList': [
              {
                'menuId': 13,
                'menuParentId': 12,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 14,
                'menuParentId': 12,
                'menuName': '新增分类标签',
                'subMenuList': ''
              },
              {
                'menuId': 15,
                'menuParentId': 12,
                'menuName': '编辑',
                'subMenuList': ''
              },
              {
                'menuId': 16,
                'menuParentId': 12,
                'menuName': '查看商品',
                'subMenuList': ''
              },
              {
                'menuId': 17,
                'menuParentId': 12,
                'menuName': '移除',
                'subMenuList': ''
              },
              {
                'menuId': 18,
                'menuParentId': 12,
                'menuName': '恢复或停止显示',
                'subMenuList': ''
              },
              {
                'menuId': 19,
                'menuParentId': 12,
                'menuName': '还原',
                'subMenuList': ''
              },
              {
                'menuId': 20,
                'menuParentId': 12,
                'menuName': '删除',
                'subMenuList': ''
              }
            ]
          },
          {
            'menuId': 21,
            'menuParentId': 1,
            'menuName': '库存管理',
            'subMenuList': [
              {
                'menuId': 22,
                'menuParentId': 21,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 23,
                'menuParentId': 21,
                'menuName': '库存导入',
                'subMenuList': ''
              },
              {
                'menuId': 24,
                'menuParentId': 21,
                'menuName': '库存导出',
                'subMenuList': ''
              }
            ]
          }
        ]
      },
      {
        'menuId': 25,
        'menuParentId': 0,
        'menuName': '交易管理',
        'subMenuList': [
          {
            'menuId': 26,
            'menuParentId': 25,
            'menuName': '订货管理',
            'subMenuList': [
              {
                'menuId': 27,
                'menuParentId': 26,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 28,
                'menuParentId': 26,
                'menuName': '代客下单',
                'subMenuList': ''
              },
              {
                'menuId': 29,
                'menuParentId': 26,
                'menuName': '详情',
                'subMenuList': ''
              },
              {
                'menuId': 30,
                'menuParentId': 26,
                'menuName': '打印',
                'subMenuList': ''
              },
              {
                'menuId': 31,
                'menuParentId': 26,
                'menuName': '取消',
                'subMenuList': ''
              },
              {
                'menuId': 32,
                'menuParentId': 26,
                'menuName': '确认',
                'subMenuList': ''
              },
              {
                'menuId': 33,
                'menuParentId': 26,
                'menuName': '发货',
                'subMenuList': ''
              },
              {
                'menuId': 34,
                'menuParentId': 26,
                'menuName': '记录',
                'subMenuList': ''
              },
              {
                'menuId': 35,
                'menuParentId': 26,
                'menuName': '验收差异处理',
                'subMenuList': ''
              },
              {
                'menuId': 36,
                'menuParentId': 26,
                'menuName': '验收差异查看',
                'subMenuList': ''
              }
            ]
          },
          {
            'menuId': 37,
            'menuParentId': 25,
            'menuName': '退货管理',
            'subMenuList': [
              {
                'menuId': 38,
                'menuParentId': 37,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 39,
                'menuParentId': 37,
                'menuName': '查看',
                'subMenuList': ''
              },
              {
                'menuId': 40,
                'menuParentId': 37,
                'menuName': '打印',
                'subMenuList': ''
              },
              {
                'menuId': 41,
                'menuParentId': 37,
                'menuName': '审核',
                'subMenuList': ''
              },
              {
                'menuId': 42,
                'menuParentId': 37,
                'menuName': '确认收货',
                'subMenuList': ''
              }
            ]
          },
          {
            'menuId': 43,
            'menuParentId': 25,
            'menuName': '退款管理',
            'subMenuList': [
              {
                'menuId': 44,
                'menuParentId': 43,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 45,
                'menuParentId': 43,
                'menuName': '审核',
                'subMenuList': ''
              }
            ]
          },
          {
            'menuId': 46,
            'menuParentId': 25,
            'menuName': '已售商品',
            'subMenuList': [
              {
                'menuId': 47,
                'menuParentId': 46,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 48,
                'menuParentId': 46,
                'menuName': '导出',
                'subMenuList': ''
              }
            ]
          }
        ]
      },
      {
        'menuId': 49,
        'menuParentId': 0,
        'menuName': '我的钱包',
        'subMenuList': [
          {
            'menuId': 50,
            'menuParentId': 49,
            'menuName': '收支查询',
            'subMenuList': [
              {
                'menuId': 51,
                'menuParentId': 50,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 52,
                'menuParentId': 50,
                'menuName': '导出',
                'subMenuList': ''
              }
            ]
          },
          {
            'menuId': 53,
            'menuParentId': 49,
            'menuName': '账户余额',
            'subMenuList': [
              {
                'menuId': 54,
                'menuParentId': 53,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 55,
                'menuParentId': 53,
                'menuName': '提现',
                'subMenuList': ''
              }
            ]
          },
          {
            'menuId': 56,
            'menuParentId': 49,
            'menuName': '机构扣点',
            'subMenuList': [
              {
                'menuId': 57,
                'menuParentId': 56,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 58,
                'menuParentId': 56,
                'menuName': '导出',
                'subMenuList': ''
              }
            ]
          }
        ]
      }
    ]
  }))
})
// 查看角色权限
router.get('/auth/setting/view', (req, res) => {
  res.json(template({
    'roleList|2-5': [{
      'roleId|+1': 1,
      'roleName': '@cword(3,8)',
      'roleType': 3,
      'menuIds': /20,15,30,50|8,15,30,3|20,33,44,48/
    }],
    menuList: [
      {
        menuId: 1,
        menuParentId: 0,
        menuName: '商品管理',
        subMenuList: [
          {
            'menuId': 2,
            'menuParentId': 1,
            'menuName': '我要供货',
            'subMenuList': [
              {
                'menuId': 3,
                'menuParentId': 2,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 4,
                'menuParentId': 2,
                'menuName': '填写供货信息',
                'subMenuList': ''
              }
            ]
          },
          {
            'menuId': 5,
            'menuParentId': 1,
            'menuName': '我的供货',
            'subMenuList': [
              {
                'menuId': 6,
                'menuParentId': 5,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 7,
                'menuParentId': 5,
                'menuName': '添加供货商品',
                'subMenuList': ''
              },
              {
                'menuId': 8,
                'menuParentId': 5,
                'menuName': '供货信息编辑',
                'subMenuList': ''
              },
              {
                'menuId': 9,
                'menuParentId': 5,
                'menuName': '上架下架',
                'subMenuList': ''
              },
              {
                'menuId': 10,
                'menuParentId': 5,
                'menuName': '记录',
                'subMenuList': ''
              },
              {
                'menuId': 11,
                'menuParentId': 5,
                'menuName': '基本信息编辑',
                'subMenuList': ''
              }
            ]
          },
          {
            'menuId': 12,
            'menuParentId': 1,
            'menuName': '分类标签',
            'subMenuList': [
              {
                'menuId': 13,
                'menuParentId': 12,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 14,
                'menuParentId': 12,
                'menuName': '新增分类标签',
                'subMenuList': ''
              },
              {
                'menuId': 15,
                'menuParentId': 12,
                'menuName': '编辑',
                'subMenuList': ''
              },
              {
                'menuId': 16,
                'menuParentId': 12,
                'menuName': '查看商品',
                'subMenuList': ''
              },
              {
                'menuId': 17,
                'menuParentId': 12,
                'menuName': '移除',
                'subMenuList': ''
              },
              {
                'menuId': 18,
                'menuParentId': 12,
                'menuName': '恢复或停止显示',
                'subMenuList': ''
              },
              {
                'menuId': 19,
                'menuParentId': 12,
                'menuName': '还原',
                'subMenuList': ''
              },
              {
                'menuId': 20,
                'menuParentId': 12,
                'menuName': '删除',
                'subMenuList': ''
              }
            ]
          },
          {
            'menuId': 21,
            'menuParentId': 1,
            'menuName': '库存管理',
            'subMenuList': [
              {
                'menuId': 22,
                'menuParentId': 21,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 23,
                'menuParentId': 21,
                'menuName': '库存导入',
                'subMenuList': ''
              },
              {
                'menuId': 24,
                'menuParentId': 21,
                'menuName': '库存导出',
                'subMenuList': ''
              }
            ]
          }
        ]
      },
      {
        'menuId': 25,
        'menuParentId': 0,
        'menuName': '交易管理',
        'subMenuList': [
          {
            'menuId': 26,
            'menuParentId': 25,
            'menuName': '订货管理',
            'subMenuList': [
              {
                'menuId': 27,
                'menuParentId': 26,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 28,
                'menuParentId': 26,
                'menuName': '代客下单',
                'subMenuList': ''
              },
              {
                'menuId': 29,
                'menuParentId': 26,
                'menuName': '详情',
                'subMenuList': ''
              },
              {
                'menuId': 30,
                'menuParentId': 26,
                'menuName': '打印',
                'subMenuList': ''
              },
              {
                'menuId': 31,
                'menuParentId': 26,
                'menuName': '取消',
                'subMenuList': ''
              },
              {
                'menuId': 32,
                'menuParentId': 26,
                'menuName': '确认',
                'subMenuList': ''
              },
              {
                'menuId': 33,
                'menuParentId': 26,
                'menuName': '发货',
                'subMenuList': ''
              },
              {
                'menuId': 34,
                'menuParentId': 26,
                'menuName': '记录',
                'subMenuList': ''
              },
              {
                'menuId': 35,
                'menuParentId': 26,
                'menuName': '验收差异处理',
                'subMenuList': ''
              },
              {
                'menuId': 36,
                'menuParentId': 26,
                'menuName': '验收差异查看',
                'subMenuList': ''
              }
            ]
          },
          {
            'menuId': 37,
            'menuParentId': 25,
            'menuName': '退货管理',
            'subMenuList': [
              {
                'menuId': 38,
                'menuParentId': 37,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 39,
                'menuParentId': 37,
                'menuName': '查看',
                'subMenuList': ''
              },
              {
                'menuId': 40,
                'menuParentId': 37,
                'menuName': '打印',
                'subMenuList': ''
              },
              {
                'menuId': 41,
                'menuParentId': 37,
                'menuName': '审核',
                'subMenuList': ''
              },
              {
                'menuId': 42,
                'menuParentId': 37,
                'menuName': '确认收货',
                'subMenuList': ''
              }
            ]
          },
          {
            'menuId': 43,
            'menuParentId': 25,
            'menuName': '退款管理',
            'subMenuList': [
              {
                'menuId': 44,
                'menuParentId': 43,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 45,
                'menuParentId': 43,
                'menuName': '审核',
                'subMenuList': ''
              }
            ]
          },
          {
            'menuId': 46,
            'menuParentId': 25,
            'menuName': '已售商品',
            'subMenuList': [
              {
                'menuId': 47,
                'menuParentId': 46,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 48,
                'menuParentId': 46,
                'menuName': '导出',
                'subMenuList': ''
              }
            ]
          }
        ]
      },
      {
        'menuId': 49,
        'menuParentId': 0,
        'menuName': '我的钱包',
        'subMenuList': [
          {
            'menuId': 50,
            'menuParentId': 49,
            'menuName': '收支查询',
            'subMenuList': [
              {
                'menuId': 51,
                'menuParentId': 50,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 52,
                'menuParentId': 50,
                'menuName': '导出',
                'subMenuList': ''
              }
            ]
          },
          {
            'menuId': 53,
            'menuParentId': 49,
            'menuName': '账户余额',
            'subMenuList': [
              {
                'menuId': 54,
                'menuParentId': 53,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 55,
                'menuParentId': 53,
                'menuName': '提现',
                'subMenuList': ''
              }
            ]
          },
          {
            'menuId': 56,
            'menuParentId': 49,
            'menuName': '机构扣点',
            'subMenuList': [
              {
                'menuId': 57,
                'menuParentId': 56,
                'menuName': '页面查看',
                'subMenuList': ''
              },
              {
                'menuId': 58,
                'menuParentId': 56,
                'menuName': '导出',
                'subMenuList': ''
              }
            ]
          }
        ]
      }
    ]
  }))
})
// 服务设置
router.post('/service/setting/save', (req, res) => {
  console.log(req.query)
  console.log(req.params)
  res.json(Mock.mock({
    code: '0',
    message: 'success',
    data: 'success'
  }))
})
// 用户信息查看
router.get('/get', (req, res) => {
  console.log(req.query)
  res.json(template({
    'userId': req.query.userId,
    'userName': '@csentence(3, 5)',
    'phone': /^1[34578]\d{9}$/,
    'status': /0|1/,
    'homeLocation': '@county(true)',
    'email': '@email',
    'createTimeStr': '@datetime',
    cloudStoreService: {
      'storeId|1-100': 1,
      'storeName': '@csentence(3, 5)',
      'homeLocation': '@county(true)',
      'industryName': '@csentence(3, 5)',
      'status': /0|1/
    }
  }))
})
// /store/view
// 启用禁用
// router.get
export default {
  api: '/fe/api/user',
  router: router
}
