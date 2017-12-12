<template>
  <div class="yc-content">
    <div class="yc-content-body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'yc-content'
}
</script>
<style lang="scss">
  @import  'scss/variables.scss';
  @import  'scss/mixin.scss';
  .yc-content {
    width: auto;
    position: absolute;
    top: 0;
    left: $side-bar-width;
    bottom: 0;
    right: 0;
    overflow: hidden;
    &-body {
      position: absolute;
      width: auto;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      overflow: hidden;
      overflow: auto;
      transition: all 0.2s ease;
      display: block;
      will-change: scroll-position;
      backface-visibility: hidden;
      // perspective: 1000;
      -webkit-overflow-scrolling: touch;
      padding: 20px;
    }
    &[no-padding] {
      .yc-content-body {
        padding: 0;
      }
    }
  }
</style>
