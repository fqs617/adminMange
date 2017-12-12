<template>
  <el-dialog
    custom-class="yc-img-select"
    title="选择图片"
    :visible.sync="currentVal"
    size="tiny"
    :modal-append-to-body = "false">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="本地上传" name="upload">
        <upload v-model="imgSelect"></upload>
      </el-tab-pane>
      <el-tab-pane label="图片库中选择" name="list">
        <list v-model="listSelect" :type="type" :activeName="activeName"></list>
      </el-tab-pane>
    </el-tabs>
    <yc-card-footer slot="footer" class="dialog-footer">
      <el-button size="large" @click="closeDialog">关闭</el-button>
      <el-button type="info" size="large" @click="onOk">保存</el-button>
    </yc-card-footer>
  </el-dialog>
</template>
<script>
import list from './list.vue'
import upload from './upload.vue'
import SelectLinkService from '@/services/select.link.service'

export default {
  name: 'yc-img-select',
  data() {
    return {
      currentVal: this.value || false,
      listSelect: '',
      imgSelect: '',
      activeName: 'upload'
    }
  },
  props: {
    value: {},
    type: null
  },
  mounted() {
    this.SelectLinkService = new SelectLinkService()
  },
  watch: {
    currentVal(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.currentVal = val
    }
  },
  methods: {
    async onOk() {
      if (this.activeName === 'upload' && this.imgSelect) {
        this.$emit('confirm', this.imgSelect)
        let param = {
          type: this.type,
          imageUrl: this.imgSelect
        }
        await this.SelectLinkService.postImageSave(param)
      } else if (this.activeName === 'list' && this.listSelect) {
        this.$emit('confirm', this.listSelect)
      }
      this.activeName = 'upload'
      this.currentVal = false
    },
    closeDialog () {
      this.activeName = 'upload'
      this.currentVal = false
    }
  },
  components: {
    list: list,
    upload: upload
  }
}
</script>
<style lang="scss">
  .yc-img-select {
    width: 1000px;
    .el-dialog__body {
      padding-bottom: 0;
    }
  }
</style>
