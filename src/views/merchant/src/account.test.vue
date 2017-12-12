<template>
  <div class="add-step add-one">
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="用户名:">
        <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
        <i>非必填项，不填写系统将自动随机生成</i>
      </el-form-item>
      <el-form-item label="手机号:" required prop="phone">
        <el-input v-model="form.phone" placeholder="请输入常用的手机号"></el-input>
        <i>必填项，请输入一个未被注册且常用的手机号</i>
      </el-form-item>
      <el-form-item label="密码:" required prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        <i>必填项，请输入6位以上的数字与字母的组合</i>
      </el-form-item>
      <el-form-item label="确认密码:" required prop="rePassword">
        <el-input type="password" v-model="form.rePassword" placeholder="请输入确认密码"></el-input>
        <i>必填项，请输入6位以上的数字与字母的组合</i>
      </el-form-item>
      <el-form-item label="邮箱号:" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱号"></el-input>
        <i>非必填项，可以作为登录账号或者找回密码的备用号</i>
      </el-form-item>
      <el-form-item label="归属地:" required class="address" prop="address">
        <el-select v-model="form.provinceId" placeholder="选择省">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
        <el-select v-model="form.cityId" placeholder="选择市">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
        <el-select v-model="form.districtId" placeholder="选择区">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
        <i>必选项，请最少选择到区</i>
      </el-form-item>
      <yc-card-footer>
        <el-button size="large">取消</el-button>
        <el-button type="info" size="large" @click="nextStep()">下一步</el-button>
      </yc-card-footer>
    </el-form>
  </div>
</template>
<script>
import MerchantService from '@/services/merchant.service'
import ValidatorBase from '@/base/validator.base'

export default {
  data() {
    return {
      form: {
        userName: '',
        phone: '',
        password: '',
        rePassword: '',
        email: '',
        provinceId: '',
        cityId: '',
        districtId: '',
        countyId: ''
      },
      rules: {
        phone: {required: true, message: '请输入11位常用手机号', pattern: ValidatorBase.pattern.isPhone, trigger: 'blur'},
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {message: '密码必须是6位以上的数字与字母的组合', pattern: ValidatorBase.pattern.enAndZn, trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.rePassword && this.form.rePassword) {
                callback('两次密码输入不一致')
                return
              }
              callback()
            },
            trigger: 'blur'}
        ],
        rePassword: [
          {required: true, message: '请输入确认密码', trigger: 'blur'},
          {message: '密码必须是6位以上的数字与字母的组合', pattern: ValidatorBase.pattern.enAndZn, trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.password && this.form.password) {
                callback('两次密码输入不一致')
                return
              }
              callback()
            },
            trigger: 'blur'}
        ],
        email: {type: 'email', message: '请输入正确的邮箱号', trigger: 'blur'},
        address: {
          validator: (rule, value, callback) => {
            if (!this.form.provinceId || !this.form.cityId || !this.form.districtId) {
              callback('请选择归属地')
              return
            }
            callback()
          },
          trigger: 'blur'}
      }
    }
  },
  mounted () {
    this.MerchantService = new MerchantService()
  },
  methods: {
    nextStep () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let params = this.$bqUtils.copy(this.form)
          delete params.rePassword
          await this.MerchantService.AddMerchant(params, 'one')
          this.$store.commit('GET_MERCHANT_ACCOUNTPHONE', this.form.phone)
          this.$emit('changeCurrent', 2)
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import "./add.scss";

.add-one {
  .el-form {
    .el-form-item {
      width: 750px;
      margin: 20px auto;
    }
    .address .el-input .el-input__inner {
      width: 96px;
      margin-right: 3px;
    }
  }
}
</style>
