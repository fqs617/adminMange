<template>
  <div class="yc-page-search">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'yc-page-header'
}
</script>
<style lang="scss">
  $input-height: 26px;
  $input-font-size: 12px;
  .yc-page-search {
    padding-top: 10px;
    width: 100%;
    height: auto;
    min-height: $input-height;
    .el-form {
      .el-button {
        font-size: 12px;
        padding: 6px 15px;
        &--default {
          color: #2788EA;
        }
      }
      // 输入框 label
      &-item {
        &__label {
          color: #333;
          font-size: $input-font-size;
          padding: 6px 12px 8px 0;
        }
        &__content {
          line-height: $input-height;
          font-size: $input-font-size;
        }
      }

      .el-input {
        font-size: $input-font-size;
        .el-icon-caret-top {
          font-size: 6px;
          line-height: 6px;
          color: #999;
          font-weight: normal;
        }
        &__inner {
          border: 1px solid #E5E5E5;
          height: $input-height;
        }
      }
    }
  }
</style>
