import { get, post } from 'http'
export default class UserService {
  /**
 * 登录接口
 * @param {string} userName 用户名 [必须]
 * @param {string} password 密码 [必须]
 * @returns
 * @memberof UserService
 */
  login(param = {}) {
    return post('api/user/login', param, {hasUid: false})
  }

  /**
 * 退出登录接口
 * @param {string} operatorId 用户id [必须]
 * @returns
 * @memberof UserService
 */
  logout(param = {}) {
    return get('api/user/logout', param)
  }
}
