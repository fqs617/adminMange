<template>
  <main class="yc-main">
    <yc-header></yc-header>
    <yc-body></yc-body>
  </main>
</template>
<style lang="scss">
  @import  'scss/variables.scss';
  @import  'scss/mixin.scss';
  %content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  html, body {
    @extend %content;
    #app {
      @extend %content;
    }
  }
  .yc-main {
    width: 100%;
    @extend %content;
  }
</style>
