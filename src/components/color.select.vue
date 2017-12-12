<template>
  <div class="yc-color-select">
    <input :id="tag" class="input-text" :style="{color: currentVal}" type="text" placeholder="请选择颜色" v-model="currentVal">
    <el-color-picker @click.native="getFocus" @change="getColor" v-model="colorVal" class="area-color"></el-color-picker>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentVal: '',
      colorVal: ''
    }
  },
  name: 'yc-color-select',
  props: {
    value: {},
    tag: ''
  },
  mounted() {
    this.currentVal = this.value
  },
  watch: {
    currentVal(val) {
      this.colorVal = val
      if (!this.$bqUtils.isColor(val)) {
        this.colorVal = '#e5e5e5'
      }
      this.$emit('input', val)
    },
    value(val) {
      this.currentVal = val
    }
  },
  methods: {
    getFocus() {
      document.getElementById(this.tag).focus()
    },
    getColor(val) {
      this.currentVal = val
    }
  }
}
</script>
<style lang="scss">
  @import  'scss/variables.scss';
  @import  'scss/mixin.scss';
  .yc-color-select {
    position: relative;
    display: inline-block;
    .input-text {
      width: 110px;
      font-size: 14px;
      padding: 10px 0;
      text-align: center;
    }
    input:focus{
      color: #000!important;
    }
    .el-color-picker {
      vertical-align: middle;
      height: 100%;
      position: absolute;
      top: 0;
      left: 200px;
      width: 100%;
      z-index: 1;
      opacity: 0;
      cursor: pointer;
      &.area-color {
        left: 0;
      }
      &__trigger {
        width: 100%;
        height: 100%;
        border-radius: 0;
        padding: 8px;
        margin-top: -1px;
      }
    }
  }
</style>
