<template>
  <div class="yc-t-ad-content" @click="onClick">
    <span v-if="!src">{{ title }}</span>
    <el-button class="add">添加图片</el-button>
    <img  :src="src || defaultImg">
  </div>
</template>
<script>
import lGif from '@/assets/img/l.gif'
export default {
  data() {
    return {
      defaultImg: lGif
    }
  },
  props: {
    src: String,
    title: {
      type: String,
      default: '选择上传图片'
    }
  },
  methods: {
    onClick() {
      this.$emit('img')
    }
  }
}
</script>
<style lang="scss">
  .yc-t-ad-content {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    min-height: 130px;
    .add {
      position: absolute;
      right: 0;
      bottom: 0;
      padding: 7px 9px;
      margin: 0;
      background: #757575;
      border-radius: 0;
      font-size: 11px;
      line-height: 11px;
      &:hover {
        border-color: #757575;
      }
      span {
        font-size: 11px;
        color: #FFFFFF;
        line-height: 11px;
        opacity: 0.8;
      }
    }
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
