<template>
  <div class="yc-template-config yc-t-c-double-ad">
    <vaild-msg :msgs="currentModule.rules.message"></vaild-msg>
    <el-form ref="form" label-position="top">
      <div
        v-for="(item, index) in detailList"
        :key="'ycTcDItem' + index">
        <el-form-item label="图片设置">
          <img-placeholder :title="texts[index]" :src="item.imgUrl" @img="onImgSelect(index)"></img-placeholder>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="暂未选择链接" :value="item.linkDesc" readonly>
            <el-button slot="append" @click="onLinkSelect(index)" >选择链接</el-button>
          </el-input>
        </el-form-item>
      </div>
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
        texts: ['横排两列广告位(左侧)', '横排两列广告位(右侧)'],
        imgDialogVisible: false,
        currentItem: 0,
        linkVisible: false,
        tag: 4,
        selectData: {}
      }
    },
    methods: {
      onImgSelect(index) {
        this.currentItem = index
        this.imgDialogVisible = true
      },
      onLinkSelect(index) {
        this.selectData.linkType = this.detailList[index].linkType
        this.selectData.linkValue = this.detailList[index].linkValue
        this.selectData.linkDesc = this.detailList[index].linkDesc
        this.currentItem = index
        this.linkVisible = true
      },
      onLinkConfirm (val) {
        let list = this.$bqUtils.copy(this.detailList)
        list[this.currentItem].linkValue = val.linkValue
        list[this.currentItem].linkType = val.linkType
        list[this.currentItem].linkDesc = val.linkDesc
        this.updateDetail(list)
      },
      onImgConfirm(val) {
        let list = this.$bqUtils.copy(this.detailList)
        list[this.currentItem].imgUrl = val
        this.updateDetail(list)
      }
    }
  }
</script>
<style lang="scss">
  .yc-t-c-double-ad {
    &__config {
      display: flex;
      &-item {
        width: 48%;
        &:first-child {
          margin-right: 4%;
        }
      }
    }
  }
</style>
