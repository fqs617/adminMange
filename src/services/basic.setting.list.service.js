import { get } from 'http'
export default class BasicSettingListService {
  /**
   * 云采卖家角色列表
   * @param {*} operatorId [必须]
   * @param {*} salt [必须]
   * @param {*} roleType 角色  3 卖家   4 后台  [必须]
   * @param {*} parameter 角色id，角色名  [非必须]
   * @param {*} startTime 开始时间 [非必须]
   * @param {*} endTime 结束时间 [非必须]
   * @param {Number} page 当前页数 [必须]
   * @param {Number} size 页面大小 [必须]
   * @return
   */
  getRoleList(params = {}) {
    return get('basic/setting/new/seller/role/list', params)
  }
}
