<template>
  <el-dialog
    custom-class="yc-link-select"
    title="跳转链接选择"
    :visible.sync="currentVal"
    size="tiny"
    :modal-append-to-body = "false">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="专题页面" name="topic">
        <topic ref="topicList" :selectData="linkValue"></topic>
      </el-tab-pane>
      <el-tab-pane label="分类页面" name="category">
        <category ref="categoryList" :selectData="linkValue"></category>
      </el-tab-pane>
      <el-tab-pane label="SKU详情页" name="sku">
        <sku ref="skuList" :selectData="linkValue"></sku>
      </el-tab-pane>
      <el-tab-pane label="自定义链接" name="selfdefined">
        <selfdefined ref="selfDefinedList" :selectData="linkValue"></selfdefined>
      </el-tab-pane>
    </el-tabs>
    <yc-card-footer slot="footer" class="dialog-footer">
      <el-button size="large" @click="currentVal = false">关闭</el-button>
      <el-button type="info" size="large" @click="onOk">保存</el-button>
    </yc-card-footer>
  </el-dialog>
</template>
<script>
import topic from './topic.vue'
import sku from './sku.vue'
import category from './category.vue'
import selfDefined from './self.defined.vue'

export default {
  name: 'yc-link-select',
  data() {
    return {
      currentVal: this.value || false,
      activeName: 'topic',
      topicList: '',
      categoryList: {},
      skuList: '',
      selfDefinedList: '',
      linkValue: {}
    }
  },
  props: {
    value: {},
    selectData: {}
  },
  watch: {
    currentVal(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.currentVal = val
      if (this.selectData && this.selectData.linkType) {
        switch (this.selectData.linkType) {
          case 1:
            this.activeName = 'topic'
            break
          case 2:
            this.activeName = 'category'
            break
          case 3:
            this.activeName = 'sku'
            break
          case 4:
            this.activeName = 'selfdefined'
            break
        }
        this.linkValue = this.selectData
      }
    }
  },
  methods: {
    onOk() {
      let param = {
        linkType: null,
        linkValue: '',
        linkDesc: ''
      }
      let testCate = ''
      let tag = false
      // switch 获取当前页面的数据
      switch (this.activeName) {
        case 'topic':
          param.linkType = 1
          if (this.$refs.topicList.topicId) {
            tag = true
          }
          param.linkValue = {
            type: 1,
            templateId: this.$refs.topicList.topicId
          }
          param.linkDesc = '专题页面-' + this.$refs.topicList.topicId
          break
        case 'category':
          param.linkType = 2
          param.linkValue = {
            type: 2,
            cate1: this.$refs.categoryList.categaryVal.cate1.cateId
          }
          if (param.linkValue.cate1) {
            tag = true
          }
          if (this.$refs.categoryList.categaryVal.cate2.cateId) {
            param.linkValue.cate2 = this.$refs.categoryList.categaryVal.cate2.cateId
            testCate = '-' + this.$refs.categoryList.categaryVal.cate2.cateName
          }
          param.linkDesc = '分类页面-' + this.$refs.categoryList.categaryVal.cate1.cateName + testCate
          break
        case 'sku':
          param.linkType = 3
          param.linkValue = {
            type: 3,
            sku: this.$refs.skuList.sku
          }
          if (param.linkValue.sku) {
            tag = true
          }
          param.linkDesc = 'SKU详情页-' + this.$refs.skuList.sku
          break
        case 'selfdefined':
          param.linkType = 4
          if (this.$refs.selfDefinedList.url.substr(0, 7) !== 'http://' && this.$refs.selfDefinedList.url.substr(0, 8) !== 'https://') {
            this.$refs.selfDefinedList.url = 'http://' + this.$refs.selfDefinedList.url
          }
          param.linkValue = {
            type: 4,
            url: this.$refs.selfDefinedList.url
          }
          if (param.linkValue.url) {
            tag = true
          }
          param.linkDesc = '自定义链接-' + this.$refs.selfDefinedList.url
          break
      }
      if (param.linkType === 4 && this.$bqUtils.characterLen(param.linkValue.url) > 200) {
        this.$message('自定义链接长度不得超过200个字符！')
        return
      }
      param.linkValue = JSON.stringify(param.linkValue)
      if (tag) {
        this.$emit('confirm', param)
        this.currentVal = false
        return
      }
      this.$message('请选择跳转链接！')
    }
  },
  components: {
    sku: sku,
    category: category,
    selfdefined: selfDefined,
    topic: topic
  }
}
</script>
<style lang="scss">
  .yc-link-select {
    width: 1000px;
    .el-tabs--border-card > .el-tabs__header .el-tabs__item {
      padding: 0 47px;
    }
    .el-table__body-wrapper {
      overflow: hidden;
    }
    .el-dialog__body {
      padding-bottom: 0;
      padding-left: 43px;
      padding-right: 37px;
    }
    .el-tabs__content {
      padding-left: 0;
      padding-right: 0;
    }
    .el-dialog__footer {
      padding-left: 43px;
      padding-right: 37px;
    }
  }
</style>
