<template>
  <yc-page class="yc-template">
    <template slot="buttons">
      <el-button @click="cancel()">&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;</el-button>
      <el-button type="info" @click="onSave">保存页面</el-button>
    </template>
    <div class="yc-template-sidebar">
      <div class="yc-template-sidebar__inner">
        <div class="yc-template-sidebar__body">
          <draggable :list="list"
            class="yc-template-components"
            :element="'ul'"
            :clone="onClone"
            :move="onMove"
            :options="componentsDrag">
              <li v-for="(element, index) in list"
                class="yc-template-components__item"
                :data-type="element.type"
                :data-id="index"
                :key="index">
                <span> {{element.desc}}</span>
                <div>
                  <img v-if="element.type === '1'" src="~assets/img/template/modules/module_1.png" />
                  <img v-if="element.type === '2'" src="~assets/img/template/modules/module_2.png" />
                  <img v-if="element.type === '3'" src="~assets/img/template/modules/module_3.png" />
                </div>
              </li>
          </draggable>
        </div>
      </div>
    </div>
    <main class="yc-template-main">
      <!-- 手机显示部分  -->
      <div class="yc-template-left">
        <!-- header -->
        <div class="yc-template-phone" :style="pageStyle"
        :class="{ 'bg-norepeat': template.page.backgroundShowType === 0, 'bg-repeat': template.page.backgroundShowType === 1}">
          <header class="yc-template-phone__header" :data-index="-1" >
            <img class="status-bar" src="~assets/img/template/ios-statusbar.png">
            <i class="yc-icon-back"></i>
            <h1>{{ template.page.topicName }}</h1>
            <!-- <el-button size="small" type="primary">页面设置</el-button> -->
            <yc-module-mask
              type="Header"
              :class="[
                selected.index === -1 ? 'active' : '',
                template.page.rules.validateState ? '' : 'is-error']">
            </yc-module-mask>
          </header>
          <yc-module-banner :bannerImg="template.banner.bannerImgUrl">
            <yc-module-mask
              type="Banner"
              :class="[
                selected.index === -2 ? 'active' : '',
                template.banner.rules.validateState ? '' : 'is-error']">
            </yc-module-mask>
          </yc-module-banner>
          <!-- 组件显示  -->
          <draggable v-model="modules"
            class="yc-template-phone__modules"
            :element="'ul'"
            @change="onChange"
            @end="onEnd"
            :options="phoneDrag">
              <yc-module-item v-for="(element, index) in modules"
                :id="'ycTempPhoneItem' + index"
                :data-index="index"
                :data-type="element.type"
                :type="element.type"
                :key="'ycTempModuleP' + index">
                  <yc-module-mask :type="element.type"
                    :class="[
                      selected.index === index ? 'active' : '',
                      element.rules.validateState ? '' : 'is-error']">
                  </yc-module-mask>
              </yc-module-item>
          </draggable>
        </div>
      </div>
      <!-- 模块配置部分 -->
      <yc-module-config></yc-module-config>
    </main>
  </yc-page>
</template>
<script>
import TemplateMixin from './template.mixin'
import Mask from './components/mask.vue'
import ModuleItem from './components/module.item.vue'
import ModuleConfig from './components/module.config.vue'
import Banner from './components/banner.vue'
import Components from './components.json'
import {mapGetters, mapMutations} from 'vuex'
let uid = 1
let msgOpt = {
  duration: 0,
  onClick: () => {
    this.isMsg = false
  },
  onClose: () => {
    this.isMsg = false
  }
}
export default {
  mixins: [TemplateMixin],
  data() {
    return {
      list: Components,
      isMsg: false
    }
  },
  beforeDestroy() {
    this.isMsg = false
  },
  computed: {
    ...mapGetters({
      template: 'getTemplateInfo',
      selected: 'getTemplateSelected',
      modules: 'getTempateModules'
    }),
    pageStyle() {
      let page = this.template.page
      return {
        background: page.backgroundType === 0 ? page.cacheBgColor : `url(${page.cacheBgImg})`
      }
    },
    modules: {
      get() {
        return this.template.modules
      },
      set(value) {
        this.updateModules(value)
      }
    }
  },
  methods: {
    ...mapMutations({
      updateModules: 'UPDATE_TEMPLATE_MODULES',
      select: 'UPDATE_TEMPLATE_SELECTED'
    }),
    onMove(evt) {
      let $dragged = $(evt.dragged)
      let type = $dragged.data('type')
      if ((type === 1 || type === 2) && this.modules.filter(item => item.type === '1' || item.type === '2').length >= 6) {
        !this.isMsg && this.$notify.error('每个专题最多允许添加6个广告位', msgOpt)
        this.isMsg = true
        return false
      }
      let len = this.modules.filter(item => item.type === type.toString()).length
      if (type === 3 && len >= 1) {
        !this.isMsg && this.$notify.error('一个专题最多只能添加一个区块', msgOpt)
        this.isMsg = true
        return false
      }
    },
    onChange(evt) {
      // 只处理add
      let data = evt.added
      if (data) {
        // 选中配置
        let params = {type: data.element.type, index: data.newIndex}
        this.select(params)
      }
    },
    onClone(original) {
      // 引用传递的问题 导致更改的内容在同一位置 复制时 复制了 上一份更改的内容
      let item = this.$bqUtils.copy(original)
      item.id = uid
      uid++
      return item
    },
    onEnd(evt) {
      let index = evt.newIndex
      let params = {type: this.modules[index].type, index: index}
      this.select(params)
    }
  },
  components: {
    ycModuleMask: Mask,
    ycModuleItem: ModuleItem,
    ycModuleConfig: ModuleConfig,
    ycModuleBanner: Banner
  }
}
</script>
<style lang="scss">
  @import './template.scss';
</style>
