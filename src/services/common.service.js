import {get} from 'http'
// import {post, get} from 'http'
import {CancelToken} from 'axios'
export default class CommonService {
  constructor() {
    this.cancelSkuList = null
  }
  /**
   *
   * 获取行业列表
   * @param {any} params
   * @returns
   * @memberof CommonService
   */
  getIndustryList(params = {}) {
    return get('api/utils/get/store/industry/list', params, {hasUid: false})
  }
  /**
   *
   * 获取区域信息
   * @param {any} params
   * @param {any} params.parentId 区域父id[必填]
   * @returns
   * @memberof CommonService
   */
  getRegionList(params = {}) {
    return get('api/utils/get/regionList', params, {hasUid: false})
  }
  /**
   *
   * 选取sku
   * @param {any} params
   * @returns
   * @memberof CommonService
   */
  getSkuList(params = {}) {
    if (this.cancelSkuList) {
      this.cancelSkuList()
      this.cancelSkuList = null
    }
    // return get('api/utils/activity/sku/list', params)
    return get('api/utils/activity/sku/list', params, {
      cancelToken: new CancelToken(c => {
        this.cancelSkuList = c
      })
    })
  }
}
