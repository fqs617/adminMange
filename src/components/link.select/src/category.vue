<template>
  <el-card class="yc-account__dialogcard yc-account__selmerchant">
    <yc-page-header>
      <el-form class="classify" :inline="true" label-width="100px">
        <el-form-item label="选择分类：" >
          <yc-cate-select @cateSelectFun="cateSelectFun" :cateInfo="cateInfo" class="select-model"></yc-cate-select>
        </el-form-item>
        <br>
        <el-form-item label="已选分类：" >
          {{ categaryVal.cate1.cateName }}<i v-if="categaryVal.cate2.cateName">-</i>{{ categaryVal.cate2.cateName }}
        </el-form-item>
      </el-form>
    </yc-page-header>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      cateInfo: {
        cate1: '',
        cate2: ''
      },
      categaryVal: {
        cate1: {},
        cate2: {}
      }
    }
  },
  props: {
    selectData: {}
  },
  mounted() {
    if (this.selectData && this.selectData.linkValue && this.selectData.linkType === 2) {
      let linkValue = JSON.parse(this.selectData.linkValue)
      this.cateInfo.cate1 = linkValue.cate1
      this.cateInfo.cate2 = linkValue.cate2
    }
  },
  methods: {
    cateSelectFun(cate1, cate2, cateName1, cateName2) {
      if (cate1 !== -1) {
        this.categaryVal.cate1 = {
          cateId: cate1,
          cateName: cateName1
        }
      } else {
        this.categaryVal.cate1 = {
          cateId: '',
          cateName: ''
        }
      }
      if (cate2 !== -1) {
        this.categaryVal.cate2 = {
          cateId: cate2,
          cateName: cateName2
        }
      } else {
        this.categaryVal.cate2 = {
          cateId: '',
          cateName: ''
        }
      }
    }
  }
}
</script>
<style lang="scss">
  .yc-account__selmerchant {
    .isSel {
      color: #999999;
    }
    .classify {
      margin-left: 40px;
      margin-top: 40px;
      margin-bottom: 40px;
      height: 100px;
      .el-form-item__content {
        font-size: 14px;
        color: #333;
      }
      .el-form-item__label {
        color: #333;
        font-size: 14px;
        padding: 6px 12px 8px 0;
      }
      .el-form-item {
        margin-bottom: 35px;
      }
      .select-model {
        .el-input {
          width: 140px;
          height: 40px;
          margin-right: 20px;
          margin-top: -10px;
        }
        .el-input__inner {
          width: 140px;
          height: 40px;
          padding-right: 20px;
          border-radius: 0;
          font-size: 14px;
        }
      }
    }
  }
</style>
