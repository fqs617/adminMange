<template>
  <div class="yc-template-config">
    <vaild-msg :msgs="currentModule.rules.message"></vaild-msg>
    <el-form ref="form" label-position="top" label-width="80px">
      <el-form-item label="图片" >
        <img-placeholder title="横排单列广告位图片" :src="detailList[0].imgUrl" @img="onImgSelect"></img-placeholder>
      </el-form-item>
      <el-form-item label="链接" >
        <el-input placeholder="暂未选择链接" :value="link" readonly>
          <el-button slot="append" @click="onLinkSelect">选择链接</el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <yc-img-select v-model="imgDialogVisible" @confirm="onImgConfirm" :type="tag"></yc-img-select>
    <yc-link-select v-model="linkVisible" @confirm="onLinkConfirm" :selectData="selectData"></yc-link-select>
  </div>
</template>
<script>
  import ConfigMixin from './config.mixin'
  export default {
    mixins: [ ConfigMixin ],
    data() {
      return {
        imgDialogVisible: false,
        linkVisible: false,
        tag: 4,
        selectData: {}
      }
    },
    computed: {
      link() {
        return this.detailList[0].linkDesc || '暂未选择链接'
      }
    },
    methods: {
      onImgSelect() {
        this.imgDialogVisible = true
      },
      onLinkSelect() {
        this.selectData.linkType = this.detailList[0].linkType
        this.selectData.linkValue = this.detailList[0].linkValue
        this.selectData.linkDesc = this.detailList[0].linkDesc
        this.linkVisible = true
      },
      onLinkConfirm (val) {
        let current = this.$bqUtils.copy(this.detailList)
        current[0].linkValue = val.linkValue
        current[0].linkType = val.linkType
        current[0].linkDesc = val.linkDesc
        this.updateDetail(current)
      },
      onImgConfirm(val) {
        let current = this.$bqUtils.copy(this.detailList)
        current[0].imgUrl = val
        this.updateDetail(current)
      }
    }
  }
</script>
