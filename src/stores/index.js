import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import createLogger from 'vuex/dist/logger'
import template from './modules/template'
import templateTabs from './modules/template.tabs'
import merchant from './modules/merchant'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const plugins = debug ? [createLogger()] : []

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    template,
    templateTabs,
    merchant
  },
  strict: debug,
  plugins: plugins
})
