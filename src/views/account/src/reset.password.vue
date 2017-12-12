<template>
  <el-dialog title="重置密码" :visible.sync="currentVal" :modal-append-to-body="false" @open="openEvent">
    <el-card class="yc-account__dialogcard account-uppassword">
      <p class="account-uppassword-info"><span>用户名：{{accountInfo.userName}}</span><span class="phone">手机号：{{accountInfo.phone}}</span></p>
      <el-form class="yc-form" label-width="100px" :model="form" ref="form" :rules="formrules">
        <el-form-item label="新密码：" class="yc-form-item" required prop="password">
          <el-input placeholder="请输入新密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" class="yc-form-item" required prop="repeatPassword">
          <el-input placeholder="请输入新密码" v-model="form.repeatPassword"></el-input>
        </el-form-item>
      </el-form>
      <yc-card-footer class="yc-account__cardfoot">
        <el-button size="large" @click="closeDialog">取消</el-button>
        <el-button type="info" size="large" @click="modifyPassw">确定</el-button>
      </yc-card-footer> 
    </el-card>
  </el-dialog>
</template>
<script>
import AccountService from '@/services/account.service.js'
export default {
  data() {
    return {
      currentVal: this.value || false,
      form: {
        password: '',
        repeatPassword: ''
      },
      formrules: {
        password: [{validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'))
          } else {
            if (this.form.repeatPassword !== '') {
              this.$refs.form.validateField('repeatPassword')
            }
            callback()
          }
        },
          trigger: 'blur'}],
        repeatPassword: [
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.form.password) {
              callback(new Error('两次输入密码不一致'))
            } else {
              callback()
            }
          },
            trigger: 'blur'}]
      }
    }
  },
  props: {
    value: {},
    accountInfo: {}
    // TODO: 具体接口调用是否在该组件
  },
  mounted() {
    this.AccountService = new AccountService()
  },
  methods: {
    closeDialog() {
      this.currentVal = false
    },
    openEvent() {
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    modifyPassw() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.modifyPasswSave()
        }
      })
    },
    // 修改密码
    async modifyPasswSave() {
      let params = {
        userId: this.accountInfo.userId,
        newPassword: this.form.password
      }
      let res = await this.AccountService.resetAccountPassword(params)
      if (res === 'success') {
        this.currentVal = false
        this.$message({
          message: '密码修改成功',
          type: 'success'
        })
      }
    }
  },
  watch: {
    value(val) {
      this.currentVal = val
    },
    currentVal(val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="scss">
  .account-uppassword {
    &-info {
      margin-top: 20px;
      margin-bottom: 40px;
      > span {
        font-size: 14px;
      }
      .phone {
        margin-left: 50px;
      }
    }
    .yc-form .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-textarea__inner {
      border-color: #ff4949
    }
  }
</style>
