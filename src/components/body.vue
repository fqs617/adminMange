<template>
  <div class="yc-body">
     <yc-sidebar></yc-sidebar>
     <yc-content>
       <router-view></router-view>
     </yc-content>
  </div>
</template>
<script>
export default {
  name: 'yc-body'
}
</script>
<style lang="scss">
  @import  'scss/variables.scss';
  @import  'scss/mixin.scss';
  .yc-body {
    position: absolute;
    width: 100%;
    top: $header-height;
    bottom: 0;
    background-color: $bg-color;
    z-index: 100;
  }
</style>
