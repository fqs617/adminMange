<template>
  <div class="yc-t-modules-two__content">
    <div class="yc-t-modules-two__content-item" 
      v-for="(item, index) in module"
      :key="index">
      <span v-if="!item.imgUrl">{{ text[index] }}</span>
      <img :src="item.imgUrl || defaultImg">
    </div>
  </div>
</template>
<script>
// 双栏广告位
import ModuleMixin from './module.mixin'
export default {
  mixins: [ ModuleMixin ],
  data() {
    return {
      text: ['横排两列广告位(左侧)', '横排两列广告位(右侧)']
    }
  }
}
</script>
<style lang="scss">
  $height: 88px;
  .yc-t-modules-two {
    &__content {
      display: flex;
      height: $height;
      padding: 10px 5px;
      margin: 0 5px;
      margin-top: 0;
      &.padding {
        padding: 10px;
      }
      &-item {
        width: calc(50% - 3px);
        text-align: center;
        line-height: $height;
        flex: 1;
        background-color: #E8EFFF;
        color: #6F7888;
        &:first-child {
          margin-right: 6px;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
