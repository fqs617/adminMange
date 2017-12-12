<template>
  <div class="yc-t-config-tabs-block">
    <el-form class="yc-t-config-tabs__topnav "  label-position="top">
      <el-form-item label="区块标题背景和文字">
        <el-radio-group v-model="moduleBackgroundType">
          <el-radio-button :label="0">颜色背景</el-radio-button>
          <el-radio-button :label="1">图片背景</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="cacheBgColor">
        <el-row>
          <el-col :span="24" v-if="moduleBackgroundType === 0">
            <span class="tip">背景颜色</span>
            <yc-color-select v-model="cacheBgColor" :tag="'cacheBgColor'"></yc-color-select>
          </el-col>
          <el-col :span="12" v-if="moduleBackgroundType === 1">
            <img-placeholder title="默认背景" :src="cacheBgImg" @img="onImgSelect(index)"></img-placeholder>
          </el-col>
          <el-col :span="24">
            <span class="tip">字体颜色</span>
            <yc-color-select v-model="moduleTitleFontColor" :tag="'moduleTitleFontColor'"></yc-color-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="专题区块添加">
        <el-input v-model="title">
          <el-button slot="append" @click="onAddTab">添加</el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <el-collapse accordion v-model="selected" v-show="tabsLen">
      <el-collapse-item
        class="yc-t-config-tabs__item"
        :name="index"
        v-for="(item, index) in tabs"
        :key="'el' + index">
        <template slot="title">
          {{ item.title }}
          <div class="buttons">
            <el-button type="text" v-if="index !== 0" @click="onOpt($event, 'up', index)">上移</el-button>
            <el-button type="text" @click="onOpt($event, 'del', index)">删除</el-button>
            <el-button type="text" v-if="index !== mLen " @click="onOpt($event, 'down', index)">下移</el-button>
          </div>
        </template>
        <block-goods :list="item.extendList || []" :index="index"></block-goods>
      </el-collapse-item>
    </el-collapse>
    <div class="yc-t-config-tabs__footer-btns">
      <el-button size="large" type="success" @click="onSaveConfig">确定区块设置</el-button>
      &nbsp;&nbsp;
    </div>
    <yc-img-select v-model="imgDialogVisible" @confirm="onImgConfirm" :type="tag"></yc-img-select>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  import ConfigMixin from '../config.mixin'
  import {mapCurrentModule} from '../config.helper'
  import BlockGoods from './block.goods.vue'
  export default {
    mixins: [ ConfigMixin ],
    data() {
      return {
        title: '',
        selected: 0,
        imgDialogVisible: false,
        tag: 5
      }
    },
    props: {
      index: {
        type: Number
      }
    },
    computed: {
      ...mapCurrentModule({
        moduleBackgroundType: 'moduleBackgroundType',
        moduleTitleFontColor: 'moduleTitleFontColor',
        cacheBgColor: 'cacheBgColor',
        cacheBgImg: 'cacheBgImg'
      }),
      ...mapGetters({
        tabs: 'getTemplateTabs',
        tabsSelected: 'getTemplateTabsSelected'
      }),
      tabsLen() {
        return this.tabs.length
      },
      mLen() {
        return Math.max(this.tabs.length - 1, 0)
      }
    },
    methods: {
      ...mapMutations({
        updateTabsSelected: 'UPDATE_TEMPLATE_TABS_SELECTED',
        add: 'ADD_TEMPATE_TAB',
        del: 'DELETE_TEMPLATE_TAB',
        selectTab: 'UPDATE_TEMPLATE_TABS_SELECTED',
        move: 'MOVE_TEMPLATE_TABS'
      }),
      onOpt(e, type, index) {
        e.preventDefault()
        switch (type) {
          case 'up':
            this.onMove(index, Math.max(index - 1, 0))
            break
          case 'del':
            this.onDelete(index)
            break
          case 'down':
            this.onMove(index, Math.min(index + 1, this.tabsLen - 1))
            break
        }
        e.stopPropagation()
      },
      onDelete(index) {
        this.$confirm('此操作将永久删除该区块, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let lastIndex = Math.max(index - 1, 0)
          this.del(index)
          this.selectTab({index: lastIndex})
        })
      },
      onMove(from, to) {
        this.move({
          to: to,
          from: from
        })
        let params = {}
        params.index = to
        this.selectTab(params)
      },
      // 添加一个区块
      onAddTab() {
        if (this.tabsLen >= 5) {
          this.$notify.error('每个专题最多允许添加5个区块')
          return
        }
        let title = (this.title).replace(/(^\s*)|(\s*$)/g, '')
        let len = title.length
        if (len <= 0 || len > 6) {
          this.$notify.error('专题区块名称输入有误, 最多允许输入6个 最少输入一个字')
          return
        }
        this.add({title: title, extendList: []})
        this.title = ''
      },
      onImgSelect() {
        this.imgDialogVisible = true
      },
      onImgConfirm(val) {
        this.cacheBgImg = val
      },
      // 保存区别配置 到vuex 中
      onSaveConfig() {
        //  从vuex template.tabs  => template
        this.update({modulesDetailList: this.$bqUtils.copy(this.tabs)})
      }
    },
    components: {
      BlockGoods: BlockGoods
    }
  }
</script>
<style lang="scss">
  .yc-t-config-tabs__item {
    .el-collapse-item__content {
      max-height: 380px;
      overflow-x: hidden;
      overflow-y: scroll;
    }
  }
  .yc-t-config-tabs-block {
    .yc-t-config-tabs__item-add {
      margin-bottom: 15px;
    }
    .yc-color-select {
      .input-text {
        width: 90px;
        margin-left: 2px;;
        padding-top: 7px;
        padding-bottom: 7px;
        margin-top: 5px;
        border: 1px solid rgb(191, 201, 217);
        border-radius: 2px;
        border-top-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }
</style>
