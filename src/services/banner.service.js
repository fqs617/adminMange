import {get, post} from 'http'
export default class BannerService {
  /**
   *
   * 获取banner列表
   * @param {object} params 查询参数
   * @returns
   * @memberof BannerService
   */
  getBannerList(params = {}) {
    return get('homeconfig/program/banner/list', params)
  }
  /**
   *
   * 新增banner
   * @param {object} params 查询参数
   * @param {object} params.operatorId 当前用户id
   * @param {object} params.provinceId 所属省id
   * @param {object} params.cityId 所属市id
   * @param {object} params.region 所属地区文字描述, 省-市
   * @param {object} params.industryId 所属行业id
   * @param {object} params.industryName 所属行业描述, 母婴
   * @param {object} params.bannerName banner名称
   * @param {object} params.bannerPic banner图片
   * @param {object} params.linkType 接类型 1:专题页面;2:分类页面;3:sku详情页面;4:自定义链接
   * @param {object} params.linkValue 链接地址
   * @param {object} params.linkDesc 链接描述
   * @param {object} params.sortValue 排序值
   * @param {object} params.isShow 显示状态
   * @param {object} params.showStartTime 显示开始时间
   * @param {object} params.showEndTime 显示结束时间
   * @returns
   * @memberof BannerService
   */
  addBanner(params = {}) {
    return post('homeconfig/program/banner/add', params)
  }
  /**
   *
   * 编辑banner
   * @param {object} params 查询参数
   * @param {object} params.operatorId 当前用户id
   * @param {object} params.bannerId 当前操作bannerid
   * @returns
   * @memberof BannerService
   */
  editInit(params = {}) {
    return get('homeconfig/program/banner/edit', params)
  }
  /**
   *
   * 获取城市列表
   * @param {object} params 查询参数
   * @param {object} params.operatorId 当前用户id
   * @param {object} params.industryId 所属行业id
   * @returns
   * @memberof BannerService
   */
  getBannerCitys(params = {}) {
    return get('homeconfig/program/banner/citys', params)
  }
  /**
   *
   * 关闭banner区配置
   * @param {object} params 查询参数
   * @param {object} params.operatorId 当前用户id
   * @param {object} params.bannerId 当前操作bannerid
   * @param {object} params.operatorType 操作类型 0:关闭;1:开启
   * @returns
   * @memberof BannerService
   */
  updateBannerStatus(params = {}) {
    return post('homeconfig/program/single/close', params)
  }
  /**
   *
   * 删除banner配置
   * @param {object} params 查询参数
   * @param {object} params.operatorId 当前用户id
   * @param {object} params.bannerId 当前操作bannerid
   * @returns
   * @memberof BannerService
   */
  deleteBanner(params = {}) {
    return post('homeconfig/program/single/delete', params)
  }
}
