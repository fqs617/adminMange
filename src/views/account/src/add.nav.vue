<template>
  <nav class="yc-account-add-header">
    <span :sel="sel=='add'">1.账号信息校验</span><span :sel="sel=='set'">2.服务设置</span>
  </nav>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  props: ['sel']
}
</script>
<style lang="scss">
  @import 'scss/variables.scss';
  .yc-account-add {
    &-header {
      font-family: $font-family-base;
      display: flex;
      justify-content: center;
      height: 40px;
      margin: 20px 2% 0px 2%;
      text-align: center;
      line-height: 40px;
      span {
        width: 50%;
        font-size: 16px;
        display: inline-block;
        background-color: #fff;
        &:first-child {
          margin-right: 3px;
        }
        &[sel=true] {
          background-color: $primary-light;
          color: #fff;
        }
      }
    }
  }
</style>
