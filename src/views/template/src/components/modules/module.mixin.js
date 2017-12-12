import {mapGetters} from 'vuex'
import lGif from '@/assets/img/l.gif'
export default {
  data() {
    return {
      elIndex: -2,
      defaultImg: lGif
    }
  },
  mounted() {
    this.elIndex = $(this.$el).parent('li').data('index')
  },
  computed: {
    ...mapGetters({
      getTemplateInfo: 'getTemplateInfo'
    }),
    module() {
      if (this.elIndex === -2) {
        return [{imgUrl: ''}]
      }
      // #TODO 兼容取不到时的 容错信息
      let module = this.getTemplateInfo.modules[this.elIndex]
      if (module) {
        return module.data.modulesDetailList
      }
      return [{imgUrl: ''}]
    }
  },
  props: {
    index: {
      type: Number
    }
  }
}
