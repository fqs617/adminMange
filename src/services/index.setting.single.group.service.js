import {get, post} from 'http'
export default class IndexSettingSingleGroupService {
  /**
   * 单栏/组合专区列表 （type为’single‘表示是单栏专区配置的，type为’group‘表示是组合专区配置的）
   * @param {String} salt 加密校验 [必须]
   * @param {String} operatorId 当前用户id [必须]
   * @param {String} parameter 查询条件(编号/单栏名称) [非必须]
   * @param {String} createStartTime 创建开始时间 [非必须]
   * @param {String} createEndTime 创建结束时间 [非必须]
   * @param {String} showStartTime 显示开始时间 [非必须]
   * @param {String} showEndTime 显示结束时间 [非必须]
   * @param {String} isShow 显示状态, 默认为-1 [非必须]
   * @param {String} provinceId 所属省id, 默认为-1 [非必须]
   * @param {String} cityId 所属市id, 默认为-1 [非必须]
   * @param {String} industry 所属行业,默认为-1 [非必须]
   * @param {String} page 当前页号 [必须]
   * @param {String} size 每页显示条数 [非必须]
   * @return
   * type值为： group、single
   */
  getProgramList(params = {}, type) {
    return get('homeconfig/program/' + type + '/list', params)
  }

  /**
   * 单栏/组合专区编辑 （type为’single‘表示是单栏专区配置的，type为’group‘表示是组合专区配置的）
   * @param {String} salt 加密校验 [必须]
   * @param {String} operatorId 当前用户id [必须]
   * @param {String} programId  当前操作专栏id [必须]
   * @return
   * type值为： group、single
   */
  getProgramEdit(params = {}, type) {
    return get('homeconfig/program/' + type + '/edit', params)
  }

  /**
   * 新增/编辑保存 （type为’single‘表示是单栏专区配置的，type为’group‘表示是组合专区配置的）
   * @param {String} salt 加密校验 [必须]
   * @param {String} operatorId 当前用户id [必须]
   * @param {String} programId  当前操作专栏id [编辑保存必须传，新增保存不传]
   * @param {String} provinceId 所属省id [必须]
   * @param {String} cityId 所属市id [必须]
   * @param {String} region 所属省市组合 [必须]
   * @param {String} industryId 所属行业id [必须]
   * @param {String} industryName 所属行业名称 [必须]
   * @param {String} programName 专栏名称 [必须]
   * @param {Integer} backgroundType 专区背景类型 1:背景颜色;2:背景图 [必须]
   * @param {String} backgroundValue 专区背景颜色(图) [必须]
   * @param {String} programPic 单栏图片路径 [必须]
   * @param {String} mainTitleName 主标题名称 [必须]
   * @param {String} mainTitleColor 主标题字体颜色 [必须]
   * @param {String} subTitleName 副标题字体名称 [必须]
   * @param {String} subTitleColor 副标题字体颜色 [必须]
   * @param {Integer} linkType 链接类型 1:专题页面;2:分类页面;3:sku详情页面;4:自定义链接 [必须]
   * @param {String} linkValue 链接地址 [必须]
   * @param {String} linkDesc 链接描述 [必须]
   * @param {String} sortValue 排序值 [必须]
   * @param {Integer} isShow 显示状态 1: 显示; 0:不显示 [必须]
   * @param {String} showStartTime 显示开始时间 [必须]
   * @param {String} showEndTime 显示结束时间 [必须]
   * @return
   * type值为： group、single
   */
  addProgramEdit(params = {}, type) {
    return post('homeconfig/program/' + type + '/add', params)
  }

  /**
   * 专区关闭/开启（type为’single‘表示是单栏专区配置的，type为’group‘表示是组合专区配置的）
   * @param {String} salt 加密校验 [必须]
   * @param {String} operatorId 当前用户id [必须]
   * @param {String} programId  当前操作专栏id [必须]
   * @param {String} operatorType  操作类型 0:关闭;1:开启 [必须]
   * @return
   * type值为： group、single
   */
  programClose(params = {}, type) {
    return post('homeconfig/program/' + type + '/close', params)
  }

  /**
   * 专区删除 （type为’single‘表示是单栏专区配置的，type为’group‘表示是组合专区配置的）
   * @param {String} salt 加密校验 [必须]
   * @param {String} operatorId 当前用户id [必须]
   * @param {String} programId  当前操作专栏id [必须]
   * @return
   * type值为： group、single
   */
  programDelete(params = {}, type) {
    return post('homeconfig/program/' + type + '/delete', params)
  }

}
