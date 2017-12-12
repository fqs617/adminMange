import { SET_TEMPLATE_BASE_INFO,
  UPDATE_TEMPLATE_MODULES,
  UPDATE_TEMPLATE_MODULE,
  DELETE_TEMPLATE_MODULE,
  UPDATE_TEMPLATE_VALID_RULES,
  UPDATE_TEMPLATE_SELECTED,
  MOVE_TEMPLATE_MODLES,
  UPDATE_TEMPLATE_MODULE_DETAIL,
  UPDATE_TEMPLATE_BANNER } from '../mutation.types'

const RULES = {
  // 是否通过验证 false 是未通过
  validateState: true,
  // 未通过的消息提示
  message: []
}

const state = {
  // 页面信息
  page: {
    // basic
    // 专题id
    topicId: '',
    // 行业id
    industryId: '',
    // 省id
    provinceId: '',
    // 市id
    cityId: '',
    // 专题名称
    topicName: '',
    // 专题背景类型 0：颜色，1：图片
    backgroundType: 0,
    // 专题背景展示方式,专题背景类型为图片时有值,0:首屏固定 1：横向纵向平铺
    backgroundShowType: 0,
    // 专题背景值 根据类型 可以是颜色以可以是背景
    backgroundValue: '#ffffff',
    // 缓存的默认背景色
    cacheBgColor: '#ffffff',
    cacheBgImg: '',

    // 微信分享标题
    wechatShareTitle: '',
    // 微信分享简介
    wechatShareProfile: '',
    // 微信分享图片
    wechatSharePic: '',
    // 备注
    remark: '',

    // TABS
    // 专题顶部导航状态 0：显示，1：不显示
    navbarStatus: 0,
    // 专题顶部导航类型 0：颜色，1：图片
    navbarType: 0,
    // 专题顶部导航默认背景 根据类型可以是图片 以可以是颜色
    navbarDefaultBackground: '#F8FBFF',
    // 专题顶部导航选中后背景
    navbarFocusBackground: '#FFFFFF',
    // 专题顶部导航默认字体颜色
    navbarDefaultFontColor: '#333333',
    // 专题顶部导航选中后字体颜色
    navbarFocusFontColor: '#333333',

    // 缓存顶部banner
    cacheDefaultBgColor: '#F8FBFF',
    cacheDefaultBgImg: '',
    cacheFocusBgColor: '#F8FBFF',
    cacheFocusBgImg: '',

    // Other
    desc: '页面基本信息设置',
    rules: RULES
  },
  banner: {
    // banner 主题
    bannerImgUrl: '',
    desc: '主图 Banner',
    rules: RULES
  },
  // 模板信息
  modules: [],
  // 选中信息
  selected: {
    // 选中的组件
    type: 'Header',
    // 下标
    index: -1
  }
}

const mutations = {
  [SET_TEMPLATE_BASE_INFO](state, value) {
    let page = state.page
    let val = {...page, ...value}
    state.page = val
  },
  [UPDATE_TEMPLATE_BANNER](state, value) {
    let banner = state.banner
    let val = {...banner, ...value}
    state.banner = val
  },
  [UPDATE_TEMPLATE_MODULES](state, value) {
    state.modules = value
  },
  [UPDATE_TEMPLATE_MODULE](state, value) {
    let index = value.index
    let oldModule = state.modules[index].data
    let val = {...oldModule, ...value.data}
    state.modules[index].data = val
  },
  [UPDATE_TEMPLATE_VALID_RULES](state, value) {
    let index = value.index
    let oldRules = state.modules[index].rules
    let val = {...oldRules, ...value.rules}
    state.modules[index].rules = val
  },
  [UPDATE_TEMPLATE_MODULE_DETAIL](state, value) {
    let index = value.index
    state.modules[index].data.modulesDetailList = value.data
  },
  [DELETE_TEMPLATE_MODULE](state, value) {
    state.modules.splice(value, 1)
  },
  [UPDATE_TEMPLATE_SELECTED](state, value) {
    let selected = state.selected
    let val = {...selected, ...value}
    state.selected = val
  },
  [MOVE_TEMPLATE_MODLES](state, value) {
    let modules = state.modules
    modules[value.from] = modules.splice(value.to, 1, modules[value.from])[0]
  }
}

export default {
  state,
  mutations
}
