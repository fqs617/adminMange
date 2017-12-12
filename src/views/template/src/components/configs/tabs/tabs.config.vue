<template>
  <div class="yc-template-config yc-t-config-tabs">
    <vaild-msg :msgs="currentModule.rules.message"></vaild-msg>
    <el-tabs class="yc-template-config__tabs" type="border-card">
      <el-tab-pane label="顶部导航设置">
        <navbar></navbar>
      </el-tab-pane>
      <el-tab-pane label="区块配置">
         <block :index="index"></block>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Navbar from './navbar'
import Block from './block'
import VaildMsg from '../valid.msg.vue'
export default {
  props: {
    index: {
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      currentModule: 'getTemplateCurrentModule'
    })
  },
  components: {
    navbar: Navbar,
    block: Block,
    VaildMsg: VaildMsg
  }
}
</script>
<style lang="scss">
  @import 'scss/variables.scss';
  @import 'scss/mixin.scss';
  // 修改el tab 组件样式
  .yc-template-config__tabs {
    .el-tabs__item {
      color: #333333;
      font-size: 14px;
    }
  }
  .yc-t-config-tabs {
    .el-tabs__content {
      padding: 10px 5px;
    }
    .buttons {
      min-width: 50px;
      height: 44px;
      float: right;
      padding-right: 10px;
      display: flex;
      .el-button {
        width: 22px;
      }
    }
    &__goods {
      min-height: 100px;
      margin-left: -10px;
      li {
        width: calc(50% - 10px);
        height: 130px;
        background-color: #fff;
        box-shadow: 0 0 2px 0 rgba(0,0,0,0.10);
        float: left;
        margin-bottom: 10px;
        margin-left: 10px;
        padding-top: 8px;
        position: relative;
        .del {
          z-index: 22;
          position: absolute;
          right: -7px;
          top: -8px;
          width: 22px;
          height: 22px;
          line-height: 22px;
          border-radius: 100%;
          box-shadow: 0 0 1px 0 rgba(0,0,0,0.10);
          border: 1px solid #cccccc;
          background-color: #ffffff;
          text-align: center;
          cursor: pointer;
          .el-icon-close {
            color: #cccccc;
            font-size: 12px;
          }
        }
      }

      &__img {
        width: 100px;
        height: 60px;
        margin: 0 auto;
        background-color: #F8FBFF;
        img {
          width: 100%;
          height: 100%;
        }
      }

      &__desc {
        padding:4px 10px;
        h5 {
          font-size: 12px;
          line-height: 13px;
          color: #333333;
          @include ext-overflow(2);
        }
        p {
          font-size: 12px;
          line-height: 16px;
          // height: 16px;
          color: #333333;
        }
        .content-desc-span{
          display: inline-block;
          width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    &__item {
      .el-form-item {
        margin-bottom: 10px;
      }
    }

    &__footer-btns {
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }

</style>
<style lang="scss" scoped>
  .yc-template-config {
    padding: 10px 0;
  }
  .tip {
    float: left;
    display: inline-block;
    font-size: 12px;
    color: #666;
  }
  .yc-t-config-tabs__topnav {
    padding-left: 11px;
  }

  .btn-add-sku {
    margin-bottom: 10px;
  }

</style>
