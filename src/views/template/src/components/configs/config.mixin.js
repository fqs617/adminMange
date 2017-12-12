import {mapGetters, mapMutations} from 'vuex'
import lGif from '@/assets/img/l.gif'
import ImgPlaceholder from './img.placeholder.vue'
import VaildMsg from './valid.msg.vue'
export default {
  data() {
    return {
      defaultImg: lGif
    }
  },
  props: {
    index: {
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      getTemplateInfo: 'getTemplateInfo',
      currentModule: 'getTemplateCurrentModule'
    }),
    page() {
      return this.getTemplateInfo.page
    },
    module() {
      return this.currentModule.data
    },
    detailList() {
      return this.currentModule.data.modulesDetailList
    }
  },
  methods: {
    ...mapMutations({
      updateModule: 'UPDATE_TEMPLATE_MODULE',
      setInfo: 'SET_TEMPLATE_BASE_INFO',
      updateModuleDetail: 'UPDATE_TEMPLATE_MODULE_DETAIL'
    }),
    // 根据下标更新 单个module
    update(params = {}) {
      let param = {
        index: this.index,
        data: params
      }
      this.updateModule(param)
    },
    // 根据下标更新单个module 下的detail list
    updateDetail(params) {
      let param = {
        index: this.index,
        data: params
      }
      this.updateModuleDetail(param)
    }
  },
  components: {
    ImgPlaceholder: ImgPlaceholder,
    VaildMsg: VaildMsg
  }
}
