import {
  UPDATE_TEMPLATE_TABS,
  ADD_TEMPATE_TAB,
  UPDATE_TEMPLATE_TAB,
  DELETE_TEMPLATE_TAB,
  UPDATE_TEMPLATE_TABS_SELECTED,
  MOVE_TEMPLATE_TABS} from '../mutation.types'
const state = {
  tabs: [],
  // 选中的区块
  selected: {
    // 下标
    index: 0
  }
}
const DEFAULT_TAB_OPT = {
  title: '',
  // 商品数据
  extendList: []
}
const mutations = {
  [UPDATE_TEMPLATE_TABS](state, value) {
    state.tabs = value
  },
  [ADD_TEMPATE_TAB](state, value) {
    let nVal = {...DEFAULT_TAB_OPT, ...value}
    state.tabs.push(nVal)
  },
  [UPDATE_TEMPLATE_TAB](state, value) {
    let index = value.index
    let oldModule = state.tabs[index]
    let val = {...oldModule, ...value.data}
    state.tabs[index] = val
  },
  [DELETE_TEMPLATE_TAB](state, value) {
    state.tabs.splice(value, 1)
  },
  [UPDATE_TEMPLATE_TABS_SELECTED](state, value) {
    let selected = state.selected
    let val = {...selected, ...value}
    state.selected = val
  },
  [MOVE_TEMPLATE_TABS](state, value) {
    let tabs = state.tabs
    tabs[value.from] = tabs.splice(value.to, 1, tabs[value.from])[0]
  }
}

export default {
  state,
  mutations
}
