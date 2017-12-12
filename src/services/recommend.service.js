import {get, post} from 'http'
export default class RecommendService {
  /**
   *
   * 获取商品配置列表
   * @param {object} params 查询参数
   * @returns
   * @memberof RecommendService
   */
  getRecommendList(params = {}) {
    return get('homeconfig/program/clobal/configuration/list', params)
  }
  /**
   *
   * 获取默认推荐商品
   * @returns
   * @memberof RecommendService
   */
  getDefaultRecommend(params = {}) {
    return get('homeconfig/program/clobal/configuration', params)
  }
  /**
   *
   * 删除账户信息
   * @param {int} params 查询参数
   * @returns
   * @memberof RecommendService
   */
  delAccount(params) {
    return post('homeconfig/program/clobal/delete', params)
  }
  /**
   *
   * 关闭开启状态
   * @param {int} params 查询参数
   * @param {int} params.configId 推荐配置id
   * @param {int} params.operatorType 操作类型 0:关闭;1:开启
   * @returns
   * @memberof RecommendService
   */
  updateRecommendStatus(params) {
    return post('homeconfig/program/clobal/close', params)
  }
  /**
   *
   * 新增商品信息
   * @param {int} params 查询参数
   * @returns
   * @memberof RecommendService
   */
  addRecommendList(params) {
    return post('homeconfig/program/clobal/configuration/add', params)
  }
  /**
   *
   * 编辑商品信息
   * @param {int} params 查询参数
   * @param {int} params.configId 推荐配置id
   * @returns
   * @memberof RecommendService
   */
  editRecommendList(params) {
    return get('homeconfig/program/clobal/configuration/edit', params)
  }
  /**
   *
   * 推荐商品编辑保存
   * @returns
   * @memberof RecommendService
   */
  editSave(params) {
    return post('homeconfig/program/clobal/configuration/save', params)
  }
  /**
   *
   * 保存
   *
   * @param {any} params 参数
   * @param {number} [isAllConfig=0] 0 代表全局 1 代表新增 2代表编辑
   * @memberof RecommendService
   */
  async save(params, isAllConfig = 0) {
    if (isAllConfig === '0') {
      delete params.cityId
      delete params.industryId
      delete params.industryName
      delete params.provinceId
      delete params.configId
      delete params.region
      return await this.saveDefaultRecommendList(params)
    }
    if (isAllConfig === '1') {
      delete params.configId
      return await this.addRecommendList(params)
    }
    if (isAllConfig === '2') {
      return await this.editSave(params)
    }
  }

  /**
   *
   * 保存全局默认配置
   * @param {int} params 查询参数
   * @param {int} params.configId 推荐配置id
   * @returns
   * @memberof RecommendService
   */
  saveDefaultRecommendList(params) {
    return post('homeconfig/program/clobal/default/configuration/add', params)
  }
  /**
   *
   * 查看商品配置
   * @param {int} params 查询参数
   * @param {int} params.configId 推荐配置id
   * @returns
   * @memberof RecommendService
   */
  lookRecommendList(params) {
    return get('homeconfig/program/clobal/goods/list', params)
  }
}
