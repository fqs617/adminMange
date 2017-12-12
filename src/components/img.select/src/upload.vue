<template>
  <div>
    <yc-form-item-content class="yc-img-select__upload" tip="支持jpg、png、jpeg，大小不得超过2M">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :auto-upload="false"
        :on-change="onBeforeUpload">
        <el-button type="info" size="small">选择图片</el-button>
      </el-upload>
    </yc-form-item-content>
    <img class="yc-img-select__privew" :src="this.uploadCurrentUrl" />
  </div>
</template>
<script>
import defaultImg from 'assets/img/l.gif'
import { isTrueUpload } from '@/utils/utils.js'
import SelectLinkService from '@/services/select.link.service'

export default {
  data() {
    return {
      uploadCurrentUrl: defaultImg
    }
  },
  props: {
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
        imgFile: file.raw
      })
      this.uploadCurrentUrl = res.url
      this.$emit('input', this.uploadCurrentUrl)
    },
    beforeAvatarUpload (file) {
      let isTrueType = isTrueUpload(file.raw.type)
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
  .yc-img-select {
    &__upload {
      padding: 30px 0;
      .yc-form-item__content-tip {
        color: #666;
        font-size: 12px;
      }
    }
    &__privew {
      // width: 375px;
      height: 113px;
      background-color: #F2F2F2;
    }
  }
</style>
