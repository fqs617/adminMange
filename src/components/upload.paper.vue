<template>
  <div class="yc-upload-paper">
    <p class="title-text">{{ label }}</p>
    <div class="upload-box">
      <div class="upload-bg">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onBeforeUpload">
          <img :class="{active: tag}" :src="this.uploadCurrentUrl" />
          <p class="icon-text">点击上传</p>
        </el-upload>
      </div>
    </div>
    <span class="tip">证件需要清晰可辨认，不得使用复印件！</span>
    <div class="upload-img">
      <img src="" alt="">
      <span class="shili">示例</span>
    </div>
  </div>
</template>
<script>
import defaultImg from 'assets/img/l.gif'
import { isTrueUpload } from '@/utils/utils.js'
import SelectLinkService from '@/services/select.link.service'

export default {
  data() {
    return {
      uploadCurrentUrl: defaultImg,
      tag: false
    }
  },
  name: 'yc-upload-paper',
  props: {
    label: '',
    value: {}
  },
  async created() {
    this.SelectLinkService = new SelectLinkService()
  },
  methods: {
    async onBeforeUpload(file) {
      if (this.beforeAvatarUpload(file) === false) {
        return
      }
      let res = await this.SelectLinkService.uploadImage({
        imageUrl: file.raw
      })
      this.uploadCurrentUrl = res.url
      this.$emit('input', this.uploadCurrentUrl)
    },
    beforeAvatarUpload (file) {
      let isTrueType = isTrueUpload(file.type)
      let isTrueSize = true
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isTrueType) {
        this.$message.error('上传文件格式不正确!')
        return isTrueType
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
        isTrueSize = false
        return isTrueSize
      }
    }
  }
}
</script>
<style lang="scss">
  @import  'scss/variables.scss';
  @import  'scss/mixin.scss';
  .yc-upload-paper {
    width: 600px;
    height: 100px;
    line-height: 100px;
    background: #fff;
    border: 1px solid #E5E5E5;
    display: inline-block;
    position: relative;
    .title-text {
      width: 100px;
      height: 100px;
      color: #666;
      font-size: 14px;
      text-align: center;
      background: #E5E5E5;
      float: left;
    }
    .upload-box {
      float: left;
      margin-right: 18px;
      .upload-bg {
        width: 100px;
        height: 76px;
        background: #E5E5E5;
        border: 1px solid #E5E5E5;
        border-radius: 4px;
        text-align: center;
        display: inline-block;
        position: relative;
        top: 12px;
        left: 16px;
        .icon-text {
          font-size: 12px;
          color: #999;
          position: absolute;
          left: 26px;
          top: 5px;
        }
        img {
          width: 100px;
          height: 76px;
          border-radius: 4px;
          position: absolute;
          left: 0px;
          top: 0px;
          z-index: -1;
        }
        .active {
          z-index: 2;
        }
      }
      .upload-bg:before {
        content: '';
        width: 34px;
        height: 25px;
        background: url('../assets/img/upload.png') no-repeat;
        position: absolute;
        left: 33px;
        top: 18px;
      }
    }
    .tip {
      color: #999;
      margin-left: 10px;
    }
    .upload-img {
      width: 100px;
      height: 76px;
      background: #E5E5E5;
      display: inline-block;
      position: absolute;
      top: 12px;
      right: 14px;
      .shili {
        width: 34px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        color: #fff;
        display: inline-block;
        background: rgba(0,0,0,0.50);
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }
</style>
