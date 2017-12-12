<template>
<!--稍后抽出权限设置部分-->
  <yc-page class="yc-account-detail set-authority">
    <el-card>
      <h1 class="yc-account-detail-title">用户基本信息 <el-button type="info" class="upbtn">编辑</el-button></h1>
      <div class="yc-account-detail-info">
        <p><span>用户ID：101</span><span>用户名：12345678</span><span>手机号：13728408605</span></p>
        <p><span>状态：开启中</span><span>归属地：山东－济南－厉下区</span><span>邮箱号：无</span></p>
        <p>注册时间：2017-01-01 12:34:56</p>
      </div>
      <h1 class="yc-account-detail-title">已开通的服务 <el-button type="info" class="upbtn">编辑</el-button></h1>
      <div class="yc-account-detail-serve">
        <p><el-checkbox class="check">云彩商户</el-checkbox></p>
        <merchant class="yc-account-detail__tb"></merchant>
        <p class="yc-account-detail__selpower">已选择的权限</p>
        <p class="yc-account-detail-type"><span class="extrude"></span>角色：</p>
        <div class="yc-account-detail-role">
          <span>admin</span><span>admin</span><span>admin</span><span>admin</span><span>admin</span><span>admin</span><span>admin</span><span>admin</span><span>admin</span><span>admin</span><span>admin</span><span>admin</span><span>admin</span><span>admin</span><span>admin</span><span>admin</span><span>admin</span><span>admin</span><span>admin</span><span>admin</span><span>admin</span>
        </div>
        <p class="yc-account-detail-type"><span class="extrude"></span>权限明细：</p>
        <authority></authority>
      </div>
      <div class="yc-account-detail-serve" noborder>
        <p><el-checkbox class="check">云彩运营管理预案</el-checkbox></p>
        <p class="yc-account-detail-type" margin><span class="extrude"></span>角色：</p>
        <div class="yc-account-detail-role">
          <span>运营管理</span><span>admin</span><span>admin</span>
        </div>
        <p class="yc-account-detail-type" margin><span class="extrude"></span>操作权限明细：</p>
        <p class="yc-account-detail-type" margin ><span class="extrude"></span>数据权限：</p>
        <data-authority class="yc-account-detail-tabs"></data-authority>
      </div>
      <yc-card-footer>
        <el-button size="large">取消</el-button>
        <el-button type="info" size="large" @click="$router.push(`/account/set`)">保存并下一步</el-button>
      </yc-card-footer> 
    </el-card>
  </yc-page>
</template>
<script>
import merchant from './merchant.vue'
import authority from './authority.vue'
import dataAuthority from './data.authority.vue'
export default {
  data() {
    return {
      tesDt: [
        {
          id: '123',
          name: '商户名称',
          addr: '银河系－地球－中国',
          trade: '商超百货',
          state: '开启中'
        }
      ]
    }
  },
  components: {
    merchant,
    authority,
    dataAuthority
  }
}
</script>
<style lang="scss">
  @import 'scss/variables.scss';
  .yc-account-detail {
    &-title {
      height: 40px;
      background-color: #E5E5E5;
      padding: 0px 20px;
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #333333;
      > .upbtn {
        margin-left: 30px;
        padding: 6px 18px;
      }
    }
    &-info {
      padding: 33px 50px;
      > p,p > span{
        font-size: 14px;
      }
      > p {
        margin-top: 15px;
      }
      > p > span {
        display: inline-block;
        width: 33%;
      }
    }
    &-serve {
      padding: 33px 50px;
      border-bottom: 1px solid #CCCCCC;
      &[noborder] {
        border-bottom: 0px;
      }
    }
    &-type {
      font-size: 16px;
      color: #333333;
      &[margin] {
        margin-top: 20px;
      }
      .extrude {
        position: relative;
        display: inline-block;
        margin-right: 10px;
        width: 5px;
        height: 16px;
        bottom: -2px;
        background-color: $primary-light;
      }
    }
    &-role {
      padding-left: 30px;
      padding-bottom: 20px;
      span {
        font-size: 14px;
        display: inline-block;
        margin-top: 10px;
        margin-right: 30px;
      }
    }
    &-tabs {
      margin-top: 20px;
      margin-left: 30px;
    }
    &__tb {
      margin-top: 20px;
      margin-bottom: 30px;
    }
    &__selpower {
      margin-bottom: 26px;
      font-size: 14px;
    }
  } 
</style>
