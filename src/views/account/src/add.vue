<template>
  <yc-page class="yc-account-add">
    <el-card class="yc-account__dialogcard">
      <add-nav v-if="!isUp" sel="add"></add-nav>
      <el-form class="yc-form yc-account-add-form" ref="form" label-width="100px" :model="form" :rules="rules">
        <el-form-item label="用户名："  class="yc-form-item">
          <el-input v-if="!isUp" placeholder="请输入用户名" v-model='form.name'></el-input>
          <span class="expresstxt" v-if="isUp">{{form.name}}</span>
        </el-form-item>
        <el-form-item label="手机号：" class="yc-form-item" tip="adf" prop="phone"  required>
          <el-input v-if="!isUp" placeholder="请输入常用的手机号" v-model='form.phone'></el-input>
          <span class="expresstxt" v-if="isUp">{{form.phone}}</span>
        </el-form-item>
        <el-form-item label="邮箱号：" class="yc-form-item" prop="email">
          <el-input placeholder="请输入常用的邮箱名" v-model='form.email'></el-input>
        </el-form-item>
        <el-form-item label="归属地：" class="yc-form-item" prop="district" required>
          <yc-form-item-content tip="请最少选择到区">
            <el-select v-model="form.provice" placeholder="选择省" class="yc-ipt" short>
              <el-option label="区域一" value="0"></el-option>
              <el-option label="区域二" value="1"></el-option>
            </el-select>
            <el-select v-model="form.city" placeholder="选择市" class="yc-ipt" short>
              <el-option label="区域一" value="2"></el-option>
              <el-option label="区域二" value="3"></el-option>
            </el-select>
            <el-select v-model="form.district" placeholder="选择区" class="yc-ipt" short>
              <el-option label="区域一" value="4"></el-option>
              <el-option label="区域二" value="5"></el-option>
            </el-select>
          </yc-form-item-content>
        </el-form-item>
      </el-form>
      <yc-card-footer class="yc-account-add-footer">
        <el-button size="large" @click="$router.go(-1)">取消</el-button>
        <el-button v-if="!isUp" type="info" size="large" @click="saveInfoValidate">保存并下一步</el-button>
        <el-button v-if="isUp" type="info" size="large" @click="saveInfo">确认并保存</el-button>
      </yc-card-footer> 
    </el-card>
  </yc-page>
</template>
<script>
import AccountService from '@/services/account.service.js'
import addNav from './add.nav.vue'
export default {
  data() {
    return {
      form: {
        name: '',
        phone: '',
        email: '',
        provice: '',
        city: '',
        district: ''
      },
      isUp: false,
      rules: {
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {validator: (rule, data, callback) => {
            if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(data))) {
              callback(new Error('请输入正确的手机号'))
            } else {
              callback()
            }
          },
            trigger: 'blur'}],
        email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],
        district: [{validator: (rule, data, callback) => {
          if (!this.form.provice || !this.form.city || !this.form.district) {
            callback(new Error('请设置归属地，至少选择到区'))
          } else {
            callback()
          }
        },
          trigger: 'change'}]
      } // 省市区还未添加验证规则
    }
  },
  mounted() {
    this.AccountService = new AccountService()
    this.isUp = this.$route.name === 'accountUpdate'
  },
  methods: {
    // 用户信息验证
    saveInfoValidate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // TODO: 调用用户保存或修改接口跳入下一页
          if (this.isUp) {
            this.$router.go(-1)
          } else {
            this.saveInfo()
          }
        }
      })
    },
    // 用户信息添加
    async saveInfo() {
      let params = {
        userName: this.form.name,
        phone: this.form.phone,
        email: this.form.email,
        provinceId: this.form.provice * 1,
        cityId: this.form.city * 1,
        districtId: this.form.district * 1
      }
      let res = await this.AccountService.addAccount(params)
      if (res.userId) {
        this.$message({
          message: '账号新增成功',
          type: 'success'
        })
        this.$router.push(`/account/set/${res.userId}`)
      }
    },
    // 修改用户信息
    updateInfo() {
    }
  },
  components: {
    addNav
  }
}
</script>
<style lang="scss">
  @import 'scss/variables.scss';
  .yc-account-add {
    &-form {
      margin-top: 60px;
      margin-left: 25%;
    }
    &-footer {
      background-color: initial;
      width: initial;
      margin-left: 30px;
      margin-right: 30px;
    }
    .yc-ipt[short] {
      width: 98px;
    }
    .expresstxt {
      font-size: 14px;
      position: relative;
      top: -2px;
    }
    .yc-form .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-textarea__inner {
      border-color: #ff4949
    }
  }  
</style>
