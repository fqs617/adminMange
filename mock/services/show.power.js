import {template, Random} from '../mock.base'
import express from 'express'
let router = express.Router()

// /api/list
router.get('/util/yuncai/seller/authority/get', (req, res) => {
    res.json(template({
              "authority": [
                {
                  "menuId": 2,
                  "menuParentId": 0,
                  "menuName": "商品管理",
                  "selected": 2,
                  "subMenu": [
                    {
                      "menuId": 3,
                      "menuParentId": 2,
                      "menuName": "我要供货",
                      "selected": 2,
                      "subMenu": [
                        {
                          "menuId": 0,
                          "menuParentId": 3,
                          "menuName": "页面查看",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 23,
                          "menuParentId": 3,
                          "menuName": "填写供货信息",
                          "selected": 2,
                          "subMenu": ""
                        }
                      ]
                    },
                    {
                      "menuId": 4,
                      "menuParentId": 2,
                      "menuName": "我的供货",
                      "selected": 2,
                      "subMenu": [
                        {
                          "menuId": 0,
                          "menuParentId": 4,
                          "menuName": "页面查看",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 24,
                          "menuParentId": 4,
                          "menuName": "添加供货商品",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 26,
                          "menuParentId": 4,
                          "menuName": "供货信息编辑",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 27,
                          "menuParentId": 4,
                          "menuName": "上架下架",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 28,
                          "menuParentId": 4,
                          "menuName": "记录",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 65,
                          "menuParentId": 4,
                          "menuName": "基本信息编辑",
                          "selected": 2,
                          "subMenu": ""
                        }
                      ]
                    },
                    {
                      "menuId": 22,
                      "menuParentId": 2,
                      "menuName": "分类标签",
                      "selected": 2,
                      "subMenu": [
                        {
                          "menuId": 0,
                          "menuParentId": 22,
                          "menuName": "页面查看",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 29,
                          "menuParentId": 22,
                          "menuName": "新增分类标签",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 30,
                          "menuParentId": 22,
                          "menuName": "编辑",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 31,
                          "menuParentId": 22,
                          "menuName": "查看商品",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 32,
                          "menuParentId": 22,
                          "menuName": "移除",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 33,
                          "menuParentId": 22,
                          "menuName": "恢复或停止显示",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 34,
                          "menuParentId": 22,
                          "menuName": "还原",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 35,
                          "menuParentId": 22,
                          "menuName": "删除",
                          "selected": 2,
                          "subMenu": ""
                        }
                      ]
                    },
                    {
                      "menuId": 25,
                      "menuParentId": 2,
                      "menuName": "库存管理",
                      "selected": 2,
                      "subMenu": [
                        {
                          "menuId": 0,
                          "menuParentId": 25,
                          "menuName": "页面查看",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 63,
                          "menuParentId": 25,
                          "menuName": "库存导入",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 64,
                          "menuParentId": 25,
                          "menuName": "库存导出",
                          "selected": 2,
                          "subMenu": ""
                        }
                      ]
                    }
                  ]
                },
                {
                  "menuId": 5,
                  "menuParentId": 0,
                  "menuName": "交易管理",
                  "selected": 2,
                  "subMenu": [
                    {
                      "menuId": 6,
                      "menuParentId": 5,
                      "menuName": "订货管理",
                      "selected": 2,
                      "subMenu": [
                        {
                          "menuId": 0,
                          "menuParentId": 6,
                          "menuName": "页面查看",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 10,
                          "menuParentId": 6,
                          "menuName": "代客下单",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 36,
                          "menuParentId": 6,
                          "menuName": "详情",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 37,
                          "menuParentId": 6,
                          "menuName": "打印",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 38,
                          "menuParentId": 6,
                          "menuName": "取消",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 39,
                          "menuParentId": 6,
                          "menuName": "确认",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 40,
                          "menuParentId": 6,
                          "menuName": "发货",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 42,
                          "menuParentId": 6,
                          "menuName": "记录",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 61,
                          "menuParentId": 6,
                          "menuName": "验收差异处理",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 62,
                          "menuParentId": 6,
                          "menuName": "验收差异查看",
                          "selected": 2,
                          "subMenu": ""
                        }
                      ]
                    },
                    {
                      "menuId": 7,
                      "menuParentId": 5,
                      "menuName": "退货管理",
                      "selected": 2,
                      "subMenu": [
                        {
                          "menuId": 0,
                          "menuParentId": 7,
                          "menuName": "页面查看",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 43,
                          "menuParentId": 7,
                          "menuName": "查看",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 44,
                          "menuParentId": 7,
                          "menuName": "打印",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 45,
                          "menuParentId": 7,
                          "menuName": "审核",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 46,
                          "menuParentId": 7,
                          "menuName": "确认收货",
                          "selected": 2,
                          "subMenu": ""
                        }
                      ]
                    },
                    {
                      "menuId": 8,
                      "menuParentId": 5,
                      "menuName": "退款管理",
                      "selected": 2,
                      "subMenu": [
                        {
                          "menuId": 0,
                          "menuParentId": 8,
                          "menuName": "页面查看",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 47,
                          "menuParentId": 8,
                          "menuName": "审核",
                          "selected": 2,
                          "subMenu": ""
                        }
                      ]
                    },
                    {
                      "menuId": 9,
                      "menuParentId": 5,
                      "menuName": "已售商品",
                      "selected": 2,
                      "subMenu": [
                        {
                          "menuId": 0,
                          "menuParentId": 9,
                          "menuName": "页面查看",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 48,
                          "menuParentId": 9,
                          "menuName": "导出",
                          "selected": 2,
                          "subMenu": ""
                        }
                      ]
                    }
                  ]
                },
                {
                  "menuId": 11,
                  "menuParentId": 0,
                  "menuName": "我的钱包",
                  "selected": 2,
                  "subMenu": [
                    {
                      "menuId": 12,
                      "menuParentId": 11,
                      "menuName": "收支查询",
                      "selected": 2,
                      "subMenu": [
                        {
                          "menuId": 0,
                          "menuParentId": 12,
                          "menuName": "页面查看",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 49,
                          "menuParentId": 12,
                          "menuName": "导出",
                          "selected": 2,
                          "subMenu": ""
                        }
                      ]
                    },
                    {
                      "menuId": 13,
                      "menuParentId": 11,
                      "menuName": "账户余额",
                      "selected": 2,
                      "subMenu": [
                        {
                          "menuId": 0,
                          "menuParentId": 13,
                          "menuName": "页面查看",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 50,
                          "menuParentId": 13,
                          "menuName": "提现",
                          "selected": 2,
                          "subMenu": ""
                        }
                      ]
                    },
                    {
                      "menuId": 21,
                      "menuParentId": 11,
                      "menuName": "机构扣点",
                      "selected": 2,
                      "subMenu": [
                        {
                          "menuId": 0,
                          "menuParentId": 21,
                          "menuName": "页面查看",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 51,
                          "menuParentId": 21,
                          "menuName": "导出",
                          "selected": 2,
                          "subMenu": ""
                        }
                      ]
                    }
                  ]
                },
                {
                  "menuId": 14,
                  "menuParentId": 0,
                  "menuName": "数据报表",
                  "selected": 2,
                  "subMenu": [
                    {
                      "menuId": 15,
                      "menuParentId": 14,
                      "menuName": "订单数据",
                      "selected": 2,
                      "subMenu": [
                        {
                          "menuId": 0,
                          "menuParentId": 15,
                          "menuName": "页面查看",
                          "selected": 2,
                          "subMenu": ""
                        }
                      ]
                    },
                    {
                      "menuId": 16,
                      "menuParentId": 14,
                      "menuName": "商品数据",
                      "selected": 2,
                      "subMenu": [
                        {
                          "menuId": 0,
                          "menuParentId": 16,
                          "menuName": "页面查看",
                          "selected": 2,
                          "subMenu": ""
                        }
                      ]
                    }
                  ]
                },
                {
                  "menuId": 17,
                  "menuParentId": 0,
                  "menuName": "我的云彩",
                  "selected": 2,
                  "subMenu": [
                    {
                      "menuId": 18,
                      "menuParentId": 17,
                      "menuName": "主体信息",
                      "selected": 2,
                      "subMenu": [
                        {
                          "menuId": 0,
                          "menuParentId": 18,
                          "menuName": "页面查看",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 52,
                          "menuParentId": 18,
                          "menuName": "编辑",
                          "selected": 2,
                          "subMenu": ""
                        }
                      ]
                    },
                    {
                      "menuId": 19,
                      "menuParentId": 17,
                      "menuName": "账号安全",
                      "selected": 2,
                      "subMenu": [
                        {
                          "menuId": 0,
                          "menuParentId": 19,
                          "menuName": "页面查看",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 53,
                          "menuParentId": 19,
                          "menuName": "修改密码",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 54,
                          "menuParentId": 19,
                          "menuName": "修改手机号",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 55,
                          "menuParentId": 19,
                          "menuName": "修改邮箱",
                          "selected": 2,
                          "subMenu": ""
                        }
                      ]
                    },
                    {
                      "menuId": 20,
                      "menuParentId": 17,
                      "menuName": "子账号",
                      "selected": 2,
                      "subMenu": [
                        {
                          "menuId": 0,
                          "menuParentId": 20,
                          "menuName": "页面查看",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 56,
                          "menuParentId": 20,
                          "menuName": "新增账号",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 57,
                          "menuParentId": 20,
                          "menuName": "权限设置",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 58,
                          "menuParentId": 20,
                          "menuName": "开启/关闭",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 59,
                          "menuParentId": 20,
                          "menuName": "重置密码",
                          "selected": 2,
                          "subMenu": ""
                        },
                        {
                          "menuId": 60,
                          "menuParentId": 20,
                          "menuName": "删除",
                          "selected": 2,
                          "subMenu": ""
                        }
                      ]
                    }
                  ]
                }
              ]
          }))
    })

export default {
  api: '/fe/api',
  router: router
}
