<template>
  <div class="yc-t-banner" :data-index="-2">
    <div class="yc-t-banner__content" :class="[
      !bannerImg ? 'd-bg' : '']"  >
      <span v-if="!bannerImg">主图 Bnnaer</span>
      <img v-if="bannerImg" :src="bannerImg" class="yc-t-banner__img" >
    </div>
    <slot></slot>
  </div>
</template>
<script>
// 主图 Banner
export default {
  props: {
    bannerImg: {
      type: String
    }
  }
}
</script>
<style lang="scss">
  .yc-t-banner {
    position: relative;
    &__content {
      min-height: 160px;
      &.d-bg {
        background: #E8EFFF;
      }
      &.padding {
        padding: 10px;
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
