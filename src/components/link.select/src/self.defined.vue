<template>
  <el-card class="yc-account__dialogcard yc-account__selmerchant">
    <yc-page-header>
      <el-form :inline="true" label-width="150px">
        <el-form-item label="URL链接地址：" class="url-adress">
          <el-input class="yc-long-ipt" placeholder="http://" v-model="url"></el-input>
          <p class="tip">温馨提示：链接地址最好不要配置云采买家内部页面链接!</p>
        </el-form-item>
      </el-form>
    </yc-page-header>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      url: ''
    }
  },
  props: {
    selectData: {}
  },
  mounted() {
    if (this.selectData && this.selectData.linkValue && this.selectData.linkType === 4) {
      let linkValue = JSON.parse(this.selectData.linkValue)
      this.url = linkValue.url
    }
  }
}
</script>
<style lang="scss">
  .yc-account__selmerchant {
    .isSel {
      color: #999999;
    }
    .url-adress {
      margin-top: 40px;
      height: 100px;
      .el-form-item__label {
        font-size: 14px;
        line-height: 28px;
      }
      .el-input {
        width: 400px;
        font-size: 14px;
      }
      .el-input__inner {
        height: 40px;
        border-radius: 0;
      }
      .tip {
        font-size: 14px;
        color: red;
        margin-top: 15px;
      }
    }
  }
</style>
