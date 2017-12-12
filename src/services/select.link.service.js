import {post, get, upload} from 'http'
import {CancelToken} from 'axios'

export default class SelectLinkService {
  constructor() {
    this.cancelTopicList = null
  }
  /** 获取可查看专题列表
   * getTopicList
   * get
   * @param {any} salt 加密校验 [必须]
   * @param {any} operatorId 当前用户id [必须]
   * @param {any} parameter 按条件筛选（非必填）
   * @param {any} provinceId 省id（非必填）
   * @param {any} cityId 市id（非必填）
   * @param {any} industryId 行业id（非必填）
   * @param {any} page 页码（必填）
   * @param {any} size 每页显示记录数（必填）
   * @memberOf SelectLinkService
   */
  getTopicList(params = {}) {
    if (this.cancelTopicList) {
      this.cancelTopicList()
      this.cancelTopicList = null
    }
    return get('api/utils/activity/special/topic/list', params, {
      cancelToken: new CancelToken(c => {
        this.cancelTopicList = c
      })
    })
  }
  /** 获取可查看的sku列表
   * getSkuList
   * get
   * @param {any} salt 加密校验 [必须]
   * @param {any} operatorId 当前用户id [必须]
   * @param {any} parameter 搜索条件（非必填）
   * @param {any} cateId1 一级分类id（非必填）
   * @param {any} cateId2 二级分类id（非必填）
   * @param {any} page 页码（必填）
   * @param {any} size 每页显示记录数（必填）
   * @memberOf SelectLinkService
   */
  getSkuList(params = {}) {
    return get('api/utils/activity/sku/list', params)
  }
  /** 获取商品分类数据
   * getCateList
   * get
   * @param {int} parentId 分类父id 0 查一级的（必填）
   * @memberOf SelectLinkService
   */
  getCateList(params = {}) {
    return get('api/utils/get/category/list', params, {hasUid: false})
  }
  /** 保存上传图片
   * postImageSave
   * post
   * @param {any} salt 加密校验 [必须]
   * @param {any} operatorId 当前用户id [必须]
   * @param {any} type 图片数据类型 1:专题主banner图片 2:专题模版背景图片 3:专题顶部导航背景图片 4:专题广告位图片 5:专题区块图片 6:专题微信分享图片 7:单栏专区图片 8:新增banner中banner图片（必填）
   * @param {any} imageUrl 图片地址（必填）
   * @memberOf SelectLinkService
   */
  postImageSave(params = {}) {
    return post('api/utils/image/url/save', params)
  }
  /** 获取图片列表
   * getImageList
   * get
   * @param {any} salt 加密校验 [必须]
   * @param {any} operatorId 当前用户id [必须]
   * @param {any} type 图片数据类型 1:专题主banner图片 2:专题模版背景图片 3:专题顶部导航背景图片 4:专题广告位图片 5:专题区块图片 6:专题微信分享图片 7:单栏专区图片 8:新增banner中banner图片（必填）
   * @param {any} page 页码（必填）
   * @param {any} size 每页显示记录数（必填）
   * @memberOf SelectLinkService
   */
  getImageList(params = {}) {
    return get('api/utils/get/local/image/url/list', params)
  }
  /** 上传图片
   * uploadImage
   * post
   * @param {any} imgFile file标签名称 [必须]
   * @memberOf SelectLinkService
   */
  uploadImage(parmas = {}) {
    return upload('api/utils/qiniuyun/img/upload', parmas, {hasUid: false})
  }
}
