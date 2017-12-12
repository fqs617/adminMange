import {get, post} from 'http'
export default class AccountService {
  /**
   *
   * 获取用户列表信息
   * @param {object} params 查询参数
   * @returns
   * @memberof AccountService
   */
  getAccountList(params = {}) {
    return get('api/user/list', params)
  }
  /**
   *
   * 删除账户信息
   * @param {int} params 查询参数
   * @returns
   * @memberof AccountService
   */
  delAccount(userId) {
    return post('api/user/delete', {userId: userId})
  }
  /**
   *
   * 启用或禁用账户
   * @param {object} params 查询参数
   * @param {int} params.userId 账户ID
   * @param {int} params.status 用户当前状态
   * @returns
   * @memberof AccountService
   */
  switchAccount(params = {}) {
    return post('api/user/change/status', params)
  }
  /**
   *
   * 账号修改密码
   * @param {object} params 查询参数
   * @param {int} params.userId 账户ID
   * @param {int} params.newPassword 新的密码
   * @returns
   * @memberof AccountService
   */
  resetAccountPassword(params = {}) {
    return post('api/user/reset/password', params)
  }
  /**
   *
   * 新增账户信息
   * @param {object} params 查询参数
   * @param {string} params.userName 账户名称
   * @param {string} params.phone 手机号
   * @param {string} params.email 邮箱
   * @param {int} params.provinceId 省信息
   * @param {int} params.cityId 市信息
   * @param {int} params.districtId 区信息
   * @returns
   * @memberof AccountService
   */
  addAccount(params = {}) {
    return post('api/user/info/add', params)
  }
  /**
   *
   * 获取服务设置信息
   * @param {int} userId 账户ID
   * @returns
   * @memberof AccountService
   */
  getAccountService(userId) {
    return get('api/user/service/edit', {userId: userId})
  }
  /**
   *
   * 获取商户列表
   * @param {object} params 查询参数
   * @param {int} params.page 当前页
   * @param {int} params.pageSize 分页大小
   * @param {string} params.param 搜索条件
   * @param {int} params.provinceId 省份Id
   * @param {int} params.cityId 市Id
   * @param {int} params.districtId 区ID
   * @param {int} params.industryId 行业类型id
   * @returns
   * @memberof AccountService
   */
  getMerchantList(params = {}) {
    return get('/api/user/store/list', params)
  }
  /**
   *
   * 获取商户详情
   * @param {int} userId 账户ID
   * @returns
   * @memberof AccountService
   */
  getMerchantDetail(storeId) {
    return get('api/user/store/view', {storeId: storeId})
  }
  /**
   *
   * 获取角色权限信息
   * @param {int} type 权限类型 (1 云采商户 2 云采后台管理员)
   * @returns
   * @memberof AccountService
   */
  getAuth(type) {
    return get('api/user/auth/setting', {type: type})
  }
  /**
   *
   * 获取已选择的角色权限信息显示
   * @param {int} type 权限类型 (1 云采商户 2 云采后台管理员)
   * @param {string} roleIds 逗号分隔的角色id
   * @returns
   * @memberof AccountService
   */
  getAuthView(type, roleIds) {
    return get('api/user/auth/setting/view', {type: type, roleIds: roleIds})
  }
  /**
   *
   * 保存服务设置信息
   * @param {int} userId 用户id
   * @param {int} serviceType 服务类型
   * @param {int} storeId 商户ID
   * @param {string} cloudSellerRoleIds 云采商户权限设置
   * @param {string} cloudBackendRoleIds 云采后台权限设置
   * @param {string} regionAuthIds 区域数据权限
   * @param {string} storeIds 商户数据权限
   * @param {string} cateAuthIds 分类数据权限
   * @param {string} industryIds 行业数据权限
   * @param {string} regionAuthNameStr 区域名称
   * @param {string} storeAuthNameStr 商户名称
   * @param {string} cateAuthNameStr 分类名称
   * @param {string} industryAuthNameStr 行业权限名称
   * @returns
   * @memberof AccountService
   */
  settingSave(params = {}) {
    console.log(params)
    return post('api/user/service/setting/save', params)
  }
  /**
   *
   * 获取状态信息
   * @param {object} params 查询参数
   * @returns
   * @memberof AccountService
   */
  getState(params = {}) {
    console.log(params)
    // return get('/data/uslist.json', params, {isApiHost: false})
  }
}
