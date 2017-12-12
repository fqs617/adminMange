<template>
  <el-row class="yc-header">
    <el-col :span="12">
      <h1>云采后台管理系统</h1>
    </el-col>
    <el-col class="yc-header__topmenu" :span="12">
      <div class="yc-header__topmenu__content">
        <img src="../assets/img/header/login.png"/>
        <a href="javascript:void(0);" class="user">
          {{ user }}
        </a>
        <!-- <a href="javascript:void(0);">
          <i class="yc-icon-setting"></i>
        </a> -->
        <a href="javascript:void(0);" @click="logout">
          <i class="yc-icon-exit"></i>
        </a>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import cookie from 'arale-cookie'
import UserService from '@/services/user.service'

export default {
  name: 'yc-header',
  data() {
    return {
      user: '用户名'
    }
  },
  created() {
    this.user = cookie.get('userName')
    this.UserService = new UserService()
  },
  methods: {
    async logout() {
      await this.UserService.logout({})
      this.$router.replace('/login')
      let arr = ['operatorId', 'token', 'userName']
      arr.forEach(key => {
        this.$cookie.set(key, null, {
          path: '/',
          expires: new Date(0)
        })
      })
      window.location.reload()
    }
  }
}
</script>
<style lang="scss">
  @import 'scss/variables.scss';
  @import 'scss/mixin.scss';
  .yc-header {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    display: block;
    width: 100%;
    height: $header-height;
    padding:0 30px;
    border-bottom: 1px solid $primary-light;
    .el-col {
      height: $header-height;
      line-height: $header-height;
      h1 {
        font-size: 18px;
        color: #333333;
      }
    }
    // 顶部菜单
    &__topmenu {
      &__content {
        width: 420px;
        height: 100%;
        line-height: 100%;
        float: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        img {
          width: 32px;
          height: 32px;
          border-radius: 32px;
        }
        a {
          display: inline-block;
          font-size: 14px;
          color: #666666;
          letter-spacing: 0.53px;
          width: 80px;
          text-align: center;
          height: 20px;
          line-height: 20px;
          border-right: 1px solid #e1e1e1;
          &:last-child {
            border-right: 0;
          }
        }
        // 用户名
        a.user {
          width: auto;
          max-width: 120px;
          @include text-overflow-1;
          padding: 0 28px 0 16px;
        }
      }
    }
  }
</style>
