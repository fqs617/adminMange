<template>
  <div class="yc-t-modules-tabs" >
    <div class="yc-t-modules-tabs__header" v-if="navbar.navbarStatus === 0" :style="topNavStyle">
      <ul>
        <li v-if="tabs.modulesDetailList.length === 0">
          待添加区块
        </li>
        <li
          v-else
          :style="index === 0 ? activeStyle : {}"
          v-for="(item, index) in tabs.modulesDetailList"
          :key="'navbar' + index">
          {{ item.title }}
        </li>
      </ul>
    </div>
    <div class="yc-t-modules-tabs__content">
      <div class="yc-t-modules-tabs__content-item" v-for="(item, index) in tabs.modulesDetailList"
        :key="'tabsItem' + index">
        <div class="nav" :style="tabStyle">{{ item.title }}</div>
        <ul class="goods">
          <li class="goods-item"
          v-for="(good, index) in goodsList(item.extendList || [])"
          :key="'good' + index" >
            <div class="goods-item-content">
              <div class="goods-item-content__img">
                <img :src="good.defaultImage || defaultImg">
              </div>
              <div class="goods-item-content__desc">
                <h1>{{ good.goodsName }}</h1>
                <p class="content-desc-span">规格：{{ good.spec }}</p>
                <p>单位：{{ good.unit }}</p>
              </div>
            </div>
            <div class="goods-item-footer">
              <div class="goods-item-footer__desc">
                <p><span class="price">¥<strong>8.00</strong></span> <span>订货单位: {{ good.unit }}</span></p>
                <p class="mai">卖家:XXXXXX</p>
              </div>
              <div class="goods-item-footer__btns">
                <span>订</span>
              </div>
            </div>
          </li>
          <li v-if="item.extendList.length >= 5" class="goods-more-tip">更多商品已经隐藏 请配置完在手机端查看完整效果</li>
        </ul>
      </div>
      <img v-if="tabs.modulesDetailList.length === 0" src="~assets/img/template/modules/module_3.png" />
    </div>
  </div>
</template>
<script>
// 区块
import ModuleMixin from './module.mixin'
export default {
  mixins: [ ModuleMixin ],
  computed: {
    navbar() {
      return this.getTemplateInfo.page
    },
    tabs() {
      let dM = {modulesDetailList: []}
      if (this.elIndex === -2) {
        return dM
      }
      let module = this.getTemplateInfo.modules[this.elIndex] || {}
      return module.data || dM
    },
    topNavStyle() {
      let style = {
        color: this.navbar.navbarDefaultFontColor
      }
      style.background = this.navbar.navbarType === 1 ? `url(${this.navbar.cacheDefaultBgImg}) repeat` : this.navbar.cacheDefaultBgColor
      return style
    },
    activeStyle() {
      let style = {
        color: this.navbar.navbarFocusFontColor
      }
      let bg = this.navbar.cacheFocusBgColor
      style.background = this.navbar.navbarType === 1 ? `url(${this.navbar.cacheFocusBgImg}) repeat` : bg
      return style
    },
    tabStyle() {
      let style = {
        color: this.tabs.moduleTitleFontColor
      }
      style.background = this.tabs.moduleBackgroundType === 1 ? `url(${this.tabs.cacheBgImg}) repeat` : this.tabs.cacheBgColor
      return style
    }
  },
  methods: {
    goodsList(list) {
      // 由于商品显示太多右边不太利于展示所以默认右边 单个区块 最多只显示5个商品
      return list.filter((item, index) => index <= 4)
    }
  }
}
</script>
<style lang="scss" scoped>
  .yc-t-modules-tabs {
    &__header {
      background: #F8FBFF;
      width: 100%;
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      color: #505050;
      ul {
        width: 100%;
        display: flex;
        overflow: hidden;
        li {
          text-align: center;
          padding: 0 5px;
          float: left;
          flex: 0 0 20%;
          display: block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    &__content {
      margin-top: 5px;
      width: 100%;
      &-item {
        margin-top: 5px;
        min-height: 44px;
        .nav {
          background-color: #EAF1FD;
          width: 100%;
          height: 44px;
          line-height: 44px;
          text-align: center;
          font-size: 16px;
          color: #333333;
        }
      }
    }
  }

  .goods {
    background: #EBEBEB;
    &-item {
      width: 100%;
      // height: 140px;
      background-color: #ffffff;
      margin-bottom: 10px;
      &-content {
        display: flex;
        align-items: center;
        // height: 80px;
        padding: 10px 15px;
        &__img {
          text-align: center;
          width: 60px;
          height: 60px;
          background-color: #F8FBFF;
          img {
            width: 100%;
            height: 100%;
          }
        }

        &__desc {
          width:220px;
          padding-left: 10px;
          h1 {
            font-size: 16px;
            color: #505050;
          }
          p {
            margin-top: 10px;
            font-size: 14px;
            color: #666666;
          }
          .content-desc-span{
            display: inline-block;
            width: 228px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      &-footer {
        height: 60px;
        background: #F9F9F9;
        padding: 0 15px;
        display: flex;
        align-items: center;
        &__desc {
          flex: 1;
          .price {
            color: #FF8113;
            strong {
              font-size: 20px;
            }
          }
          span + span {
            color: #505050;
            font-size: 14px;
            margin-left: 30px;
          }
          .mai {
            margin-top: 8px;
            font-size: 14px;
            color: #505050;
          }
        }
        &__btns {
          width: 50px;
          height: 24px;
          span {
            display: inline-block;
            width: 50px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            background-color: #FF8113;
            font-size: 14px;
            color: #FFFFFF;
          }
        }
      }
    }
  }

  // 商品过多文案提示
  .goods-more-tip {
    background-color: #FF8113;
    color: #ffffff;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
</style>
