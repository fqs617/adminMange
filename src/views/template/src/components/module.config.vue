<template>
  <!-- 模块配置部分 -->
  <div class="yc-template-modules">
    <h2>{{ module.desc }}</h2>
    <components :is="getComponent" :index="this.selected.index"></components>
  </div>
</template>
<script>
import Header from './configs/header.config'
import BannerConfig from './configs/banner.config'
import SingleColumnConfig from './configs/single.column.config'
import DoubleColumnConfig from './configs/double.column.config'
import TabsConfig from './configs/tabs/tabs.config'
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      type: 'Header'
    }
  },
  computed: {
    ...mapGetters({
      selected: 'getTemplateSelected',
      module: 'getTemplateCurrentModule'
    }),
    getComponent() {
      return `ycTempConfig${this.selected.type}`
    }
  },
  components: {
    ycTempConfigHeader: Header,
    ycTempConfigBanner: BannerConfig,
    ycTempConfig1: SingleColumnConfig,
    ycTempConfig2: DoubleColumnConfig,
    ycTempConfig3: TabsConfig
  }
}
</script>
<style lang="scss">
  @import './configs/config.scss'
</style>
