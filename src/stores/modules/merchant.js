import { GET_MERCHANT_ACCOUNTPHONE, GET_MERCHANT_BASEINFO } from '../mutation.types'
const state = {
  // 第一步的电话号
  phone: '',
  baseInfo: {}
}

const mutations = {
  [GET_MERCHANT_ACCOUNTPHONE] (state, value) {
    state.phone = value
  },
  [GET_MERCHANT_BASEINFO] (state, value) {
    state.baseInfo = value
  }
}

export default {
  state,
  mutations
}
