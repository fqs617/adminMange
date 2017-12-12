<template>
  <div class="yc-form-item__content">
      <div class="yc-form-item__content_c">
        <slot></slot>
      </div>
      <p class="yc-form-item__content-tip">{{ tip }}</p>
  </div>
</template>
<script>
export default {
  name: 'yc-form-item-content',
  props: {
    tip: {
      type: String
    }
  }
}
</script>
<style lang="scss">
  .yc-form-item {
    &__content {
      display: flex;
      align-items: center;
      &-tip {
        padding-left: 20px;
        width: auto;
        font-size: 14px;
        color: #999999;
      }
    }
  }
</style>
