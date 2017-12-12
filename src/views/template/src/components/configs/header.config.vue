<template>
  <div class="yc-template-config">
    <vaild-msg :msgs="page.rules.message"></vaild-msg>
    <el-form ref="form" label-position="top" :model="page">
      <el-form-item prop="topicName" label="专题名称"
      :rules="[{ required: true, message: '专题名称不能为空/限30字内'}]" >
        <el-input v-model="topicName" placeholder="请输入专题名称"></el-input>
      </el-form-item>
      <el-form-item label="背景类型">
        <el-radio-group v-model="backgroundType">
          <el-radio-button :label="0">颜色背景</el-radio-button>
          <el-radio-button :label="1">图片背景</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="cacheBgColor" label="背景色" v-if="backgroundType === 0">
        <yc-color-select v-model="cacheBgColor" :tag="'cacheBgColor'"></yc-color-select>
      </el-form-item>
      <el-form-item label="背景图片" v-if="backgroundType === 1" >
        <el-radio-group v-model="backgroundShowType">
          <el-radio :label="0">首屏固定</el-radio>
          <el-radio :label="1">横向纵向平铺</el-radio>
        </el-radio-group>
        <el-card class="w-150">
          <img-placeholder title="专题背景图片" :src="cacheBgImg || defaultImg" @img="onImgSelect(2)"></img-placeholder>
        </el-card>
      </el-form-item>
      <el-form-item label="所属行业">
        <yc-industry v-model="industryId"></yc-industry>
      </el-form-item>
      <el-form-item label="所属城市">
        <yc-regions :account="regionAccount" :getRegions="{provinceId: provinceId, cityId: cityId}" @getCurRegion="getCurRegion"></yc-regions>
      </el-form-item>
      <el-form-item prop="wechatShareTitle" label="微信分享标题" :rules="[{ required: true, message: '微信分享标题不能为空'}]">
        <el-input v-model="wechatShareTitle" placeholder="请输入分享到微信好友或者朋友圈时显示的标题名称" :maxlength="16"></el-input>
      </el-form-item>
      <el-form-item prop="wechatShareProfile" label="微信分享简介" :rules="[{ required: true, message: '微信分享简介不能为空'}]">
        <el-input v-model="wechatShareProfile" placeholder="请输入分享到微信好友时显示的简介" :maxlength="30"></el-input>
      </el-form-item>
      <el-form-item prop="wechatSharePic" label="微信分享图片" :rules="[{ required: true, message: '微信分享图片不能为空'}]">
        <el-card class="w-150">
          <img-placeholder title="微信分享图片" :src="currentModule.wechatSharePic" @img="onImgSelect(6)"></img-placeholder>
        </el-card>
      </el-form-item>
      <el-form-item label="备注信息" class="w-150">
        <el-input type="textarea" v-model="remark" placeholder="请输入该专题的备注信息"></el-input>
      </el-form-item>
    </el-form>
    <yc-img-select v-model="imgDialogVisible" @confirm="onImgConfirm" :type="tag"></yc-img-select>
  </div>
</template>
<script>
import ConfigMixin from './config.mixin'
import {mapSetInfo} from './config.helper'
export default {
  mixins: [ ConfigMixin ],
  data() {
    return {
      imgDialogVisible: false,
      regionAccount: 2,
      tag: 0
    }
  },
  computed: {
    ...mapSetInfo({
      topicName: 'topicName',
      backgroundType: 'backgroundType',
      backgroundShowType: 'backgroundShowType',
      cacheBgColor: 'cacheBgColor',
      cacheBgImg: 'cacheBgImg',
      industryId: 'industryId',
      provinceId: 'provinceId',
      cityId: 'cityId',
      wechatShareTitle: 'wechatShareTitle',
      wechatSharePic: 'wechatSharePic',
      wechatShareProfile: 'wechatShareProfile',
      remark: 'remark'
    })
  },
  methods: {
    getCurRegion(val) {
      this.provinceId = val.provinceId
      this.cityId = val.cityId
    },
    // tag = 2 专题模版背景图片; tag = 6 专题微信分享图片
    onImgSelect(index) {
      if (index === 2) {
        this.tag = 2
      } else if (index === 6) {
        this.tag = 6
      }
      this.imgDialogVisible = true
    },
    onImgConfirm(val) {
      if (this.tag === 2) {
        this.cacheBgImg = val
      } else {
        this.wechatSharePic = val
      }
    }
  }
}
</script>
<style lang="scss">
  .yc-template-config {
      .yc-color-select {
        .input-text {
          width: 110px;
          margin-left: -4px;
          padding: 7px;
          border: 1px solid rgb(191, 201, 217);
          border-radius: 2px;
        }
      }
    }
</style>
