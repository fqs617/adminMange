<template>
  <div class="yc-page">
    <div class="yc-page-header" v-if="isHeader">
      <el-button class="go-back" type="text" size="small" @click="$router.go(-1)">
        返回
      </el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in $route.matched"
          v-if="item.meta.title"
          :key="'breadcumbRouter' + item.name">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="yc-page-header__buttons">
        <slot name="buttons"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'yc-page',
  props: {
    isHeader: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss">
  .yc-page {
    &-header {
      height: 28px;
      line-height: 28px;
      display: flex;
      align-items: center;
      .go-back {
        margin-right: 15px;
      }
      &__buttons {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        .el-button {
          padding: 8px 15px;
          font-size: 12px;
          border-radius: 2px;
          &--default {
            border: none;
          }
        }
      }
    }
  }
</style>
