<template>
  <div class="loginPage">
    <h1>云采运营管理后台</h1>
    <el-form :model="login" :rules="rules" ref="login" label-width="0px" class="loginForm">
      <h2>登录</h2>
      <el-form-item prop="userName">
        <el-input v-model="login.userName" placeholder="请输入用户名" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="login.password" placeholder="请输入密码" auto-complete="off"></el-input>
      </el-form-item>
      <el-button type="info" class="login-btn" @click="doLogin('login')">登录</el-button>
      <el-checkbox label="记住账号" v-model="saveLogin" class="login-cbx"></el-checkbox>
    </el-form>
  </div>
</template>
<script>
import UserService from '@/services/user.service'

export default {
  created() {
    this.UserService = new UserService()
    let username = this.$cookie.get('uName')
    let password = this.$cookie.get('password')
    if (username && password) {
      this.login = {
        userName: username,
        password: password
      }
      this.saveLogin = true
    }
  },
  data() {
    return {
      login: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      saveLogin: false
    }
  },
  methods: {
    doLogin(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await this.UserService.login(this.login)
          for (let key in res) {
            // 设置了一周的过期时间
            this.$cookie.set(key, res[key], {
              path: '/',
              expires: 7
            })
          }
          this.$router.push('/')
          if (this.saveLogin) {
            let keys = ['uName', 'password']
            keys.forEach(key => {
              let keyLogin = ''
              if (key === 'uName') {
                keyLogin = 'userName'
              } else {
                keyLogin = key
              }
              this.$cookie.set(key, this.login[keyLogin], {
                path: '/',
                expires: 90
              })
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import 'scss/variables.scss';
.loginPage {
  color: #333;
  width: 400px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  h1 {
    font-size: 30px;
    line-height: 30px;
    padding-bottom: 50px;
  }
  h2 {
    font-size: 20px;
    line-height: 28px;
    padding-bottom: 20px;
  }
  h1, h2{
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
  .loginForm {
    background: $bg-color;
    width: 100%;
    padding: 40px 50px;
    box-sizing: border-box;
  }
  .el-form-item {
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 14px;
    input {
      padding: 13px 20px;
    }
  }
  .login {
    &-btn {
      width: 100%;
      margin: 10px 0 11px;
    }
    &-cbx {
      color: #666;
    }
  }
}
</style>
