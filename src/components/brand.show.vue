<template>
  <div class="yc-brand-show">
    <ul>
      <li v-for="item,index in info" :key="index">
        <p :style="{color: item.detailList.fontColor}">{{ item.detailList.name || '名称名称' }}</p>
        <img :src="item.detailList.imgUrl || defaultImg" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
import defaultImg from 'assets/img/l.gif'
export default {
  data() {
    return {
      defaultImg: defaultImg
    }
  },
  name: 'yc-brand-show',
  props: ['info'],
  methods: {
  }
}
</script>
<style lang="scss">
@import 'scss/variables.scss';
@import 'scss/mixin.scss';

.yc-brand-show {
  ul {
    width: 375px;
    border: 1px solid #F2F2F2;
    margin: 20px 20px 0 0;
    overflow: hidden;
    li {
      width: 125px;
      height: 125px;
      float: left;
      background: #fff;
      text-align: center;
      p {
        font-size: 14px;
        color: #333333;
        padding: 17px 0 11px 0;
      }
      img {
        width: 75px;
        height: 75px;
        background: #D8D8D8;
      }
    }
    li:nth-of-type(even){
      background: #FAFAFA;
    }
  }
}
</style>
