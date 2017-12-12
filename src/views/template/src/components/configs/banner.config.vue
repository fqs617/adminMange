<template>
  <div class="yc-template-config">
    <vaild-msg :msgs="banner.rules.message"></vaild-msg>
    <el-form ref="form" label-position="top" label-width="80px">
      <el-form-item label="图片" >
        <img-placeholder title="横排单列广告位图片" :src="bannerImgUrl" @img="onImgSelect"></img-placeholder>
      </el-form-item>
    </el-form>
    <yc-img-select v-model="imgDialogVisible" @confirm="onImgConfirm" :type="tag"></yc-img-select>
  </div>
</template>
<script>
import ConfigMixin from './config.mixin'
import {mapMutations} from 'vuex'
import {mapBanner} from './config.helper'
export default {
  mixins: [ ConfigMixin ],
  data() {
    return {
      tag: 1,
      imgDialogVisible: false
    }
  },
  computed: {
    banner() {
      return this.$store.state.template.banner || {}
    },
    ...mapBanner({
      'bannerImgUrl': 'bannerImgUrl'
    })
  },
  methods: {
    ...mapMutations({
      updateBanner: 'UPDATE_TEMPLATE_BANNER'
    }),
    onImgSelect() {
      this.imgDialogVisible = true
    },
    onImgConfirm (val) {
      this.bannerImgUrl = val
    }
  }
}
</script>
