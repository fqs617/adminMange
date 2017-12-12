import {template, Random} from '../mock.base'
import express from 'express'
let router = express.Router()

router.get('/management/list', (req, res) => {
  res.json(template({
    'list|20': [
      {
        'storeId|+1': 1,
        storeName: '@cname',
        industryIdName: '@cname',
        "type|1-3": 1,
        regionName: Random.city(),
        userName: '@cname',
        "status|0-3": 1,
        createTimeFormat: '@now("yyyy-MM-dd HH:mm:ss")'
      }
    ]
  }))
})
router.post('/management/control', (req, res) => {
  res.json(req.body)
})
router.post('/management/new/merchant/one/strep', (req, res) => {
  res.json(req.body)
})
router.post('/management/new/merchant/two/strep', (req, res) => {
  res.json(req.body)
})
router.post('/management/new/merchant/three/strep', (req, res) => {
  res.json(req.body)
})
router.post('/management/new/merchant/four/strep', (req, res) => {
  res.json(req.body)
})
router.post('/management/new/merchant/five/strep', (req, res) => {
  res.json(req.body)
})
router.get('/management/new/merchant/get/infomation', (req, res) => {
  res.json(template({
    'qualifications': '主体资质',
    'companyName': '公司名称',
    'businessLicenseNumber': '注册号',
    'bankAccount': '开户名称',
    'legalPerson': '开户人',
    'certificateTypeName': '证件类型',
    'certificateNumber': '证件编号'
  }))
})
router.get('/management/detail', (req, res) => {
  res.json(template({
    'userId': 11,
    'userName': "zhangsan",
    'phone': 18999999999,
    'type': 3,
    'industryName': '洗衣',
    'storeId': 11,
    'storeName': '张思',
    'regionName': '北京-东城区',
    'address': '详细地址',
    'contact': '联系人',
    'contactMobile': '联系电话',
    'referrerPhone': '推荐人手机号',
    'isTest': 1,
    'storeType': 1,
    'companyName': '企业名称',
    'legalPerson': '法人',
    'taxNumber': '营业执行注册号',
    'address': '注册地址',
    'expiryDate': '2017-12-10',
    'certificates': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502776736883&di=231e05a55e8ce78132d410b7c1f94ee2&imgtype=0',
    'owner': '真是姓名',
    'legalPersonPasscode': '法人身份证号',
    'identityCardFrontImgUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502776736883&di=231e05a55e8ce78132d410b7c1f94ee2&imgtype=0',
    'identityCardBehindImgUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502776736883&di=231e05a55e8ce78132d410b7c1f94ee2&imgtype=0',
    'identityCardInHandImgUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502776736883&di=231e05a55e8ce78132d410b7c1f94ee2&imgtype=0',
    'certificateTypeName': '证件类型',
    'certificateNumber': '许可证编号',
    'certificateAddress': '许可证地址',
    'certificateExpiryDate': '许可证有效期',
    'certificateExpiryPhoto': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502776736883&di=231e05a55e8ce78132d410b7c1f94ee2&imgtype=0',
    'accountType': 0,
    'bankNumber': '银行卡号',
    'bank': '所属银行',
    'bankCity': '开户城市',
    'branch': '支行',
    'approvalNumber': '对公开户许可证核准号',
    'accountOpeningPermit': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502776736883&di=231e05a55e8ce78132d410b7c1f94ee2&imgtype=0'
  }))
})
router.get('/management/store/info/edit', (req, res) => {
  res.json(template({
    'phone': 18999999999,
    'storeId': 11,
    'type': 2,
    'industryId': '100',
    'storeName': '张思',
    'provinceId': '1',
    'cityId': '2',
    'districtId': '3',
    'countyId': '4',
    'address': '详细地址',
    'contact': '联系人',
    'contactMobile': '13800138989',
    'referrerPhone': '13800138989',
    'isTest': '1'
  }))
})
router.get('/management/qualification/info/edit', (req, res) => {
  res.json(template({
    'storeType': '1',
    'companyName': '企业名称',
    'legalPerson': '法人',
    'taxNumber': '营业执行注册号',
    'address': '注册地址',
    'expiryDate': '2017-12-10,2017-12-20',
    'certificates': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502776736883&di=231e05a55e8ce78132d410b7c1f94ee2&imgtype=0',
    'owner': '真是姓名',
    'legalPersonPasscode': '法人身份证号',
    'identityCardFrontImgUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502776736883&di=231e05a55e8ce78132d410b7c1f94ee2&imgtype=0',
    'identityCardBehindImgUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502776736883&di=231e05a55e8ce78132d410b7c1f94ee2&imgtype=0',
    'identityCardInHandImgUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502776736883&di=231e05a55e8ce78132d410b7c1f94ee2&imgtype=0',
    // 'certificateTypeName': '证件类型',
    'certificateTypeId': 1000,
    'certificateNumber': '许可证编号',
    'certificateAddress': '许可证地址',
    'certificateExpiryDate': 'longTime',
    'certificateExpiryPhoto': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502776736883&di=231e05a55e8ce78132d410b7c1f94ee2&imgtype=0'
  }))
})
router.get('/management/financial/settlement/info/edit', (req, res) => {
  res.json(template({
    'accountType': '1',
    'bankNumber': '银行卡号',
    'bank': '所属银行',
    'bankCity': '开户城市',
    'branch': '支行',
    'approvalNumber': '对公开户许可证核准号',
    'accountOpeningPermit': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502776736883&di=231e05a55e8ce78132d410b7c1f94ee2&imgtype=0'
  }))
})
router.post('/management/store/info/edit/submit', (req, res) => {
  res.json(req.body)
})
router.post('/management/qualification/info/edit/submit', (req, res) => {
  res.json(req.body)
})
router.post('/management/financial/settlement/info/edit/submit', (req, res) => {
  res.json(req.body)
})
export default {
  api: '/fe/business',
  router: router
}
