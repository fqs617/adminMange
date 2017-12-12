import {post, get} from 'http'
export default class MerchantService {
  /** 商户列表
   * getMerchantList
   * get
   * @param {any} parameter 按条件筛选（非必填）
   * @param {any} startTime 开通开始时间（非必填）
   * @param {any} endTime 开通结束时间（非必填）
   * @param {any} status 状态（非必填）
   * @param {any} industryId 行业（非必填）
   * @param {any} type 商户类型（非必填）
   * @param {any} provinceId 省id（非必填）
   * @param {any} cityId 市id（非必填）
   * @param {any} districtId 区县id（非必填）
   * @memberOf MerchantService
   */
  getMerchantList(params) {
    return get('business/management/list', params)
  }

  /** 商户列表操作接口
   * postControl
   * post
   * @param {any} storeId 商户Id（必填）
   * @param {any} status 状态（必填）
   * @memberOf MerchantService
   */
  postControl(params) {
    return post('business/management/control', params)
  }

  /** 新增商户五步
   * AddMerchant
   * post
   * 第一步 one
   * @param {any} userName 用户名（非必填）
   * @param {any} phone 手机号（必填）
   * @param {any} password 密码（必填）
   * @param {any} email 邮箱（非必填）
   * @param {any} provinceId 省id（必填）
   * @param {any} cityId 市id（必填）
   * @param {any} districtId 区县id（必填）
   * @param {any} countyId 乡镇id（非必填）
   *
   * 第二步 two
   * @param {any} storeId 店铺Id（非必填）
   * @param {any} storeName 商户名称（必填）
   * @param {any} type 商户类型：1买家 2卖家 3买家加卖家（必填）
   * @param {any} industryId 行业id（必填）
   * @param {any} provinceId 省id（必填）
   * @param {any} cityId 市id（必填）
   * @param {any} districtId 区县id（必填）
   * @param {any} countyId 乡镇id（非必填）
   * @param {any} address 详细地址（必填）
   * @param {any} contact 联系人（必填）
   * @param {any} contactMobile 联系电话（必填）
   * @param {any} referrerPhone 推荐人手机号（非必填）
   * @param {any} isTest 1是测试账户，2不是测试账户（必填）
   *
   * 第三步 three
   * @param {any} storeId 店铺Id（非必填）
   * @param {any} storeType 商户类型：1企业，2个体工商户（必填）
   * @param {any} companyName 企业名称（必填）
   * @param {any} legalPerson 企业法人（必填）
   * @param {any} taxNumber 营业执行注册号（必填）
   * @param {any} address 注册地址（必填）
   * @param {any} expiryDate 注册地址有效期（yyyy-MM-dd-yyyy-MM-dd），如果是时间传入所选时间，如果是长期传入longTime（必填）
   * @param {any} certificates 营业执照（必填）
   * @param {any} owner 真实姓名（必填）
   * @param {any} legalPersonPasscode 法人身份证号（必填）
   * @param {any} identityCardFrontImgUrl 身份证正面照（必填）
   * @param {any} identityCardBehindImgUrl 身份证反面照（必填）
   * @param {any} identityCardInHandImgUrl 手持身份证照片（必填）
   * @param {any} certificateTypeId 证件类型id（必填）
   * @param {any} certificateNumber 许可证编号（必填）
   * @param {any} certificateAddress 许可证地址（必填）
   * @param {any} certificateExpiryDate 许可证有效期（yyyy-MM-dd-yyyy-MM-dd），如果是时间传入所选时间，如果是长期传入longTime（必填）
   * @param {any} certificatePhoto 许可证资质（必填）
   *
   * 第四步
   * @param {any} storeId 店铺Id（非必填）
   * @param {any} accountType 账户类型（0,对公 1,对私）（必填）
   * @param {any} bankNumber 银行卡号（必填）
   * @param {any} bank 所属银行（必填）
   * @param {any} bankCity 开户城市id-id（必填）
   * @param {any} branch 支行（必填）
   * @param {any} approvalNumber 对公开户许可证核准号（必填）
   * @param {any} accountOpeningPermit 资质照片（必填）
   *
   * 第五步
   * @param {any} storeId 店铺Id（非必填）
   * @param {any} cooperationType 合作方式：1 现结 2 账期（必填）
   * @param {any} payType 支付方式：1 余额 2 货到付款（必填）
   * @param {any} baseAmount 是否设置最低起订金额（-1表示开启  0表示关闭）（必填）
   * @param {any} minMoney  最低起订金额（非必填）
   * @param {any} cateTagCount 允许新增分类标签的数量（必填）
   * @param {any} cateTagGoodsCount 允许分类标签中添加商品的数量（必填）
   * @param {any} allowRegion 允许供货的区域（非必填）
   * @param {any} disAllowRegion 不允许供货的区域传入id和name格式id是id-id,id-id（非必填）
   * @param {any} allowBuyer 允许的买家id,id（非必填）
   * @param {any} disAllowBuyer 不允许的买家id,id（非必填）
   *
   * step的值为：one、two、three、four、five
   *
   * @memberOf MerchantService
   */
  AddMerchant(params, step) {
    return post('business/management/new/merchant/' + step + '/strep', params)
  }

  /** 获取行业列表
   * getBnsTypeList
   * get
   * @param {any} 不用传参数
   * @memberOf MerchantService
   */
  getBnsTypeList(params) {
    return get('utils/get/business/type/list', params)
  }

  /** 获取证件列表
   * getCtfTypeList
   * get
   * @param {any} 不用传参数
   * @memberOf MerchantService
   */
  getCtfTypeList(params) {
    return get('api/utils/get/certificate/type/list', params)
  }

  /** 返回选择买家
   * getSelectBuyer
   * get
   * @param {any} type 1供货，2不供货（必填）
   * @param {any} parameter 商户名称或商户id（非必填）
   * @param {any} provinceId 省id（非必填）
   * @param {any} cityId 市id（非必填）
   * @param {any} districtId 区县id（非必填）
   * @param {any} industryId 行业（非必填）
   * @param {any} storeId 店铺id（必填）
   * @memberOf MerchantService
   */
  getSelectBuyer(params) {
    return get('utils/select/buyer', params)
  }

  /** 选择买家后缓存接口
   * postBuyerRedisSave
   * post
   * @param {any} type 1供货，2不供货（必填）
   * @param {any} storeId 店铺id（必填）
   * @param {any} storeIdStr 逗号分隔 选择的商户id（非必填）
   * @memberOf MerchantService
   */
  postBuyerRedisSave(params) {
    return post('utils/select/buyer/redis/save', params)
  }

  /** 获取选择买家后缓存接口
   * getBuyerRedisGet
   * get
   * @param {any} type 1供货，2不供货（必填）
   * @param {any} storeId 店铺id（必填）
   * @memberOf MerchantService
   */
  getBuyerRedisGet(params) {
    return get('utils/select/buyer/redis/get', params)
  }

  /** 对公对私返回信息
   * getInfomation
   * get
   * @param {storeId} 店铺id（非必填）
   * @param {accountType} 账户类型（0,对公 1,对私）（必填）
   * @memberOf MerchantService
   */
  getInfomation(params) {
    return get('business/management/new/merchant/get/infomation', params)
  }

  /** 获取编辑信息
   * getMerchantDetail
   * get
   * @param {storeId} 店铺id（必填）
   * @memberOf MerchantService
   */
  getMerchantDetail(params) {
    return get('business/management/detail', params)
  }

  /** 商户基本信息编辑
   * getStoreInfoEdit
   * get
   * @param {storeId} 店铺id（必填）
   * @memberOf MerchantService
   */
  getStoreInfoEdit(params) {
    return get('business/management/store/info/edit', params)
  }

  /** 商户基本信息编辑保存
   * storeInfoSubmit
   * post
   * @param {any} storeId 店铺Id（非必填）
   * @param {any} storeName 商户名称（必填）
   * @param {any} type 商户类型：1买家 2卖家 3买家加卖家（必填）
   * @param {any} industryId 行业id（必填）
   * @param {any} provinceId 省id（必填）
   * @param {any} cityId 市id（必填）
   * @param {any} districtId 区县id（必填）
   * @param {any} countyId 乡镇id（非必填）
   * @param {any} address 详细地址（必填）
   * @param {any} contact 联系人（必填）
   * @param {any} contactMobile 联系电话（必填）
   * @param {any} referrerPhone 推荐人手机号（非必填）
   * @param {any} isTest 1是测试账户，2不是测试账户（必填）
   * @memberOf MerchantService
   */
  storeInfoSubmit(params) {
    return post('business/management/store/info/edit/submit', params)
  }

  /** 商户资质信息编辑
   * getQualificationEdit
   * get
   * @param {storeId} 店铺id（必填）
   * @memberOf MerchantService
   */
  getQualificationEdit(params) {
    return get('business/management/qualification/info/edit', params)
  }

  /** 商户资质信息编辑提交
   * qualificationSubmit
   * post
   * @param {any} storeId 店铺Id（非必填）
   * @param {any} storeType 商户类型：1企业，2个体工商户（必填）
   * @param {any} companyName 企业名称（必填）
   * @param {any} legalPerson 企业法人（必填）
   * @param {any} taxNumber 营业执行注册号（必填）
   * @param {any} address 注册地址（必填）
   * @param {any} expiryDate 注册地址有效期（yyyy-MM-dd-yyyy-MM-dd），如果是时间传入所选时间，如果是长期传入longTime（必填）
   * @param {any} certificates 营业执照（必填）
   * @param {any} owner 真实姓名（必填）
   * @param {any} legalPersonPasscode 法人身份证号（必填）
   * @param {any} identityCardFrontImgUrl 身份证正面照（必填）
   * @param {any} identityCardBehindImgUrl 身份证反面照（必填）
   * @param {any} identityCardInHandImgUrl 手持身份证照片（必填）
   * @param {any} certificateTypeId 证件类型id（必填）
   * @param {any} certificateNumber 许可证编号（必填）
   * @param {any} certificateAddress 许可证地址（必填）
   * @param {any} certificateExpiryDate 许可证有效期（yyyy-MM-dd-yyyy-MM-dd），如果是时间传入所选时间，如果是长期传入longTime（必填）
   * @param {any} certificatePhoto 许可证资质（必填）
   * @memberOf MerchantService
   */
  qualificationSubmit(params) {
    return post('business/management/qualification/info/edit/submit', params)
  }

  /** 财务结算信息编辑
   * getQualificationEdit
   * get
   * @param {storeId} 店铺id（必填）
   * @memberOf MerchantService
   */
  getFinancialEdit(params) {
    return get('business/management/financial/settlement/info/edit', params)
  }

  /** 财务结算信息编辑提交
   * qualificationSubmit
   * post
   * @param {any} storeId 店铺Id（非必填）
   * @param {any} accountType 账户类型（0,对公 1,对私）（必填）
   * @param {any} bankNumber 银行卡号（必填）
   * @param {any} bank 所属银行（必填）
   * @param {any} bankCity 开户城市id-id（必填）
   * @param {any} branch 支行（必填）
   * @param {any} approvalNumber 对公开户许可证核准号（必填）
   * @param {any} accountOpeningPermit 资质照片（必填）
   * @memberOf MerchantService
   */
  financialSubmit(params) {
    return post('business/management/financial/settlement/info/edit/submit', params)
  }
}
