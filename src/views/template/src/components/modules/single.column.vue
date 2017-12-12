<template>
  <div class="yc-t-modules-one__content" :class="[
     !img ? 'd-bg' : '']"  >
    <span v-if="!img">横排单列广告位</span>
    <img v-if="img" :src="img" class="yc-t-modules-one__img" >
  </div>
</template>
<script>
// 单列大图广告位
import ModuleMixin from './module.mixin'
export default {
  mixins: [ ModuleMixin ],
  computed: {
    img() {
      return this.module[0].imgUrl
    }
  }
}
</script>
<style lang="scss">
  .yc-t-modules-one {
    &__content {
      min-height: 80px;
      position: relative;
      &.d-bg {
        background: #E8EFFF;
      }
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 15px;
        color: #6F7888;
      }
    }
    &__img {
      width: 100%;
      height: 100%;
    }
  }
</style>
