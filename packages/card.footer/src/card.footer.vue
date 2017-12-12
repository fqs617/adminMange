<template>
  <div class="yc-card-footer">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'yc-card-footer'
}
</script>
<style lang="scss">
  .yc-card-footer {
    border-top: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 110px;
    width: 100%;
    background-color: #fff;
    padding-top: 10px;
    .el-button {
      width: 130px;
    }
  }

  // dialog 和 card 通用 所以 此处 对 在card 中单独处理
  .el-card {
    .yc-card-footer {
      margin-top: 50px;
    }
  }

  // dialog 微调
  .el-dialog {
    &__footer {
      .yc-card-footer {
        height: 65px;
        .el-button + .el-button {
            margin-left: 20px;
        }
      }
    }
  }
</style>
