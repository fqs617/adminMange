import {post, get} from 'http'
// import {post, get} from 'http'
export default class BrandService {
  /**
 *
 * 获取品牌分类列表信息
 * @param {any} params.operatorId 操作人[必填]
 * @param {any} params.parameter 搜索条件[选填]
 * @param {any} params.provinceId 省[选填]
 * @param {any} params.cityId 市[选填]
 * @param {any} params.industryId 行业[选填]
 * @param {any} params.status 品牌分类状态 0:开启 1:关闭 -1:全部 [选填]
 * @param {any} params.createStartTime 开始时间[选填]
 * @param {any} params.createEndTime 结束时间[选填]
 * @param {any} params.page 页码[选填]
 * @param {any} params.size 每页记录个数，默认15个[选填]
 * @returns
 * @memberof BrandService
 */
  brandList(params) {
    return get('api/brand/category/list', params)
  }
  /**
  *
  * 品牌分类删除
  * @param {any} params.operatorId 操作人[必填]
  * @param {any} params.brandId 品牌分类id[必填]
  * @returns
  * @memberof BrandService
  */
  deleteBrand(params) {
    return post('api/brand/category/delete', params)
  }
  /**
  *
  * 关闭/开启 品牌分类
  * @param {any} params.operatorId 操作人[必填]
  * @param {any} params.brandId 品牌分类id[必填]
  * @param {any} params.status 品牌分类状态 0:开启 1:关闭
  * @returns
  * @memberof BrandService
  */
  updateStatus(params) {
    return post('api/brand/category/change/status', params)
  }

}
