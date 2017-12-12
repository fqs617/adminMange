<template>
  <div>
    <!-- 背景颜色 -->
    <div v-if="listInfo.backgroundType == 1" class="yc-area-display-effect" :single="single" :style="{backgroundColor: listInfo.backgroundValue}">
      <img :src="listInfo.programPic" alt=""/>
      <h1 :style="{color: listInfo.mainTitleColor}" :color="listInfo.mainTitleColor">{{listInfo.mainTitleName || '每周半价日'}}</h1>
      <span :style="{color: listInfo.subTitleColor, borderColor: listInfo.subTitleColor}">{{listInfo.subTitleName || '疯狂仅一天'}}</span>
    </div>
    <!-- 背影图 -->
    <div v-if="listInfo.backgroundType == 2" class="yc-area-display-effect" :single="single" :style="{backgroundImage:'url('+listInfo.backgroundValue+')'}">
      <img :src="listInfo.programPic" alt=""/>
      <h1 :style="{color: listInfo.mainTitleColor}" :color="listInfo.mainTitleColor">{{listInfo.mainTitleName || '每周半价日'}}</h1>
      <span :style="{color: listInfo.subTitleColor, borderColor: listInfo.subTitleColor}">{{listInfo.subTitleName || '疯狂仅一天'}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    single: {
      type: Boolean,
      default: true
    },
    listInfo: {}
  }
}
</script>
<style lang="scss">
.yc-area-display-effect {
  position: relative;
  width: 375px;
  height: 120px;
  background: #e5e5e5;
  padding: 38px;
  padding-left: 173px;
  box-sizing: border-box;
  text-align: center;
  img {
    position: absolute;
    top: 10px;
    left: 73px;
    width: 100px;
    height: 100px;
    background: #fff;
  }
  h1 {
    color: #000;
    font-size: 20px;
    line-height: 20px;
    margin-bottom: 10px;
  }
  span {
    color: #999;
    font-size: 14px;
    line-height: 14px;
  }
  &[single] {
    img {
      left: 78px;
    }
    h1 {
      color: #333;
      margin-bottom: 8px;
    }
    span {
      color: #333;
      padding: 3px 1px;
      border-top: 1px solid #666;
      border-bottom: 1px solid #666;
    }
  }
}
</style>
