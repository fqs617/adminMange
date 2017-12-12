<template>
  <yc-page class="add-merchant">
    <div class="content">
      <ul class="title">
        <li v-for="item in titleList" :key="item.step" :class="{active: step == item.step}">{{ item.name }}</li>
      </ul>
      <component :is="currentView" transition="fade" transition-mode="out-in" @changeCurrent="changeTags"></component>
    </div>
  </yc-page>
</template>
<script>
import AccountTest from './account.test.vue'
import BaseInfo from './base.info.vue'
import UploadAptitude from './upload.aptitude.vue'
import FinanceSettlement from './finance.settlement.vue'
import SellerSet from './seller.set.vue'
export default {
  data() {
    return {
      titleList: [
        {name: '1.账号信息校验', step: '1'},
        {name: '2.商户基本信息填写', step: '2'},
        {name: '3.资质信息上传', step: '3'},
        {name: '4.财务结算信息填写', step: '4'},
        {name: '5.卖家设置', step: '5'}
      ],
      currentView: 'add-1',
      step: '1'
    }
  },
  watch: {
  },
  mounted() {
    if (this.$route.params.step) {
      if (this.$route.params.step === 'step2') {
        this.step = '2'
        this.currentView = 'add-2'
      } else if (this.$route.params.step === 'step5') {
        this.step = '5'
        this.currentView = 'add-5'
      } else {
        this.$router.push('/home')
      }
    }
  },
  methods: {
    changeTags(tag) {
      this.step = tag
      this.currentView = 'add-' + tag
    }
  },
  beforeDestroy () {
    this.$store.commit('GET_MERCHANT_ACCOUNTPHONE', '')
    this.$store.commit('GET_MERCHANT_BASEINFO', '')
  },
  components: {
    'add-1': AccountTest,
    'add-2': BaseInfo,
    'add-3': UploadAptitude,
    'add-4': FinanceSettlement,
    'add-5': SellerSet
  }
}
</script>
<style lang="scss">
  .add-merchant {
    min-width: 880px;
    .content {
      margin: 0 42px;
      .title {
        background-color: #fff;
        border: 1px solid #E5E5E5;
        margin: 35px 0px;
        margin-bottom: 50px;
        li {
          width: 19.9%;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          color: #666666;
          text-align: center;
          border-right: 1px solid #E5E5E5;
          display: inline-block;
        }
        li:last-child {
          border: none;
        }
        li.active {
          background: #64B7F6;
          color: #fff;
        }
      }
    }
  }
</style>
