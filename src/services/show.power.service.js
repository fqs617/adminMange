import { get, post } from 'http'
export default class ShowService {
  /**
 *
 * 获取云采卖家或者后台的权限列表
 * @param {any} params.project 所属项目（yuncai：云采卖家,yuncaihoutai：云采后台） [必须]
 * @param {any} params.operatorId 用户id [必须]
 * @returns
 * @memberof ShowService
 */
  getAuth() {
    return get('api/util/yuncai/seller/authority/get', {})
  }
  /**
 *
 * 云采卖家保存权限列表（新增卖家角色）
 * @param {any} params.roleName 所属项目（yuncai：云采卖家,yuncaihoutai：云采后台） [必须]
 * @param {any} params.operatorId 用户id [必须]
 * @param {any} params.authority 权限列表[必填]
 * @returns
 * @memberof ShowService
 */
  SaveSellerAuth() {
    return post('api/basic/setting/new/selller/role', {})
  }
}
