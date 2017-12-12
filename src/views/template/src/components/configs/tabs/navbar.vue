<template>
  <!-- 顶部导航设置  -->
  <el-form ref="form" class="yc-t-config-tabs__topnav " label-position="top">
    <el-form-item label="是否显示" >
      <el-radio-group v-model="navbarStatus">
        <el-radio :label="0">显示</el-radio>
        <el-radio :label="1">不显示</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="背景类型" v-if="navbarStatus === 0">
      <el-radio-group v-model="navbarType">
        <el-radio-button :label="0">颜色背景</el-radio-button>
        <el-radio-button :label="1">图片背景</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="默认状态" v-if="navbarStatus === 0" prop="cacheDefaultBgColor">
      <el-row class="yc-t-config-tabs__topnav_bg">
        <el-col :span="24" v-if="navbarType === 0">
          <span class="tip">背景颜色：</span>
          <yc-color-select v-model="cacheDefaultBgColor" :tag="'cacheDefaultBgColor'"></yc-color-select>
        </el-col>
        <el-col :span="12" v-if="navbarType === 1">
          <img-placeholder title="默认导航背景" :src="cacheDefaultBgImg" @img="onImgSelect(0)"></img-placeholder>
        </el-col>
        <el-col :span="24">
          <span class="tip">文字颜色：</span>
          <yc-color-select v-model="navbarDefaultFontColor" :tag="'navbarDefaultFontColor'"></yc-color-select>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="选中状态" v-if="navbarStatus === 0" prop="cacheFocusBgColor">
      <el-row class="yc-t-config-tabs__topnav_bg">
        <el-col :span="24" v-if="navbarType === 0">
          <span class="tip">背景颜色：</span>
          <yc-color-select v-model="cacheFocusBgColor" :tag="'cacheFocusBgColor'"></yc-color-select>
        </el-col>
        <el-col :span="12" v-if="navbarType === 1">
          <img-placeholder title="选中后导航背景" :src="cacheFocusBgImg" @img="onImgSelect(1)"></img-placeholder>
        </el-col>
        <el-col :span="24">
          <span class="tip">文字颜色：</span>
          <yc-color-select v-model="navbarFocusFontColor" :tag="'navbarFocusFontColor'"></yc-color-select>
        </el-col>
      </el-row>
    </el-form-item>
    <yc-img-select v-model="imgDialogVisible" @confirm="onImgConfirm" :type="tag"></yc-img-select>
  </el-form>
</template>
<script>
import ConfigMixin from '../config.mixin'
import {mapSetInfo} from '../config.helper'
export default {
  mixins: [ ConfigMixin ],
  data() {
    return {
      imgDialogVisible: false,
      tag: 3,
      isDefault: 0
    }
  },
  computed: {
    ...mapSetInfo({
      navbarStatus: 'navbarStatus',
      navbarType: 'navbarType',
      navbarDefaultBackground: 'navbarDefaultBackground',
      navbarFocusBackground: 'navbarFocusBackground',
      navbarDefaultFontColor: 'navbarDefaultFontColor',
      navbarFocusFontColor: 'navbarFocusFontColor',

      cacheDefaultBgColor: 'cacheDefaultBgColor',
      cacheDefaultBgImg: 'cacheDefaultBgImg',
      cacheFocusBgColor: 'cacheFocusBgColor',
      cacheFocusBgImg: 'cacheFocusBgImg'
    })
  },
  methods: {
    onImgSelect(index) {
      this.isDefault = index
      this.imgDialogVisible = true
    },
    onImgConfirm(val) {
      if (this.isDefault === 0) {
        this.cacheDefaultBgImg = val
      }
      if (this.isDefault === 1) {
        this.cacheFocusBgImg = val
      }
    }
  }
}
</script>
<style lang="scss">
  .yc-t-config-tabs__topnav {
    &_bg {
      .el-col {
        display: flex;
        align-items: center;
        .yc-t-ad-content {
          width: 95%;
          .el-button {
            display: none;
          }
        }
      }
      .yc-color-select {
        .input-text {
          width: 90px;
          margin-left: -4px;
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
  }
</style>
