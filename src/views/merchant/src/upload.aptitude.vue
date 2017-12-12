<template>
  <div class="add-step add-three">
    <el-form ref="form" :rules="rules" :model="form" label-width="240px">
      <p class="special" v-if="pathname !== 'detail'">
        <span>特别说明：</span>
        如果商户开通云采产品服务类型为卖家商户资质全部为必填项，如果为买家则全部为选填项
      </p>
      <el-form-item>
        <h1 class="first-h">商户主体信息</h1>
      </el-form-item>
      <el-form-item label="商户主体类型:" required prop="storeType">
        <el-radio class="radio" v-model="form.storeType" label="1">企业</el-radio>
        <el-radio class="radio" v-model="form.storeType" label="2">个体工商户</el-radio>
      </el-form-item>
      <el-form-item label="企业名称:" required prop="companyName">
        <el-input v-model="form.companyName" placeholder="请输入企业名称"></el-input>
        <i>必填项，请与营业执照上的企业名称保持一致</i>
      </el-form-item>
      <el-form-item label="企业法人:" required prop="legalPerson">
        <el-input v-model="form.legalPerson" placeholder="请输入企业法人"></el-input>
        <i>必填项，请与营业执照上的企业法人保持一致</i>
      </el-form-item>
      <el-form-item label="营业执照注册号:" required prop="taxNumber">
        <el-input v-model="form.taxNumber" placeholder="请输入营业执照注册号"></el-input>
        <i>必填项，请与营业执照上的注册号保持一致</i>
      </el-form-item>
      <el-form-item label="注册地址:" required prop="address">
        <el-input v-model="form.address" placeholder="请输入营业执照注册地址"></el-input>
        <i>必填项，请与营业执照上的注册地址保持一致</i>
      </el-form-item>
      <el-form-item label="有效期:" required prop="expiryDateTime">
        <el-date-picker type="daterange" placeholder="请选择时间" v-model="form.expiryDateTime" :disabled="expiryDate"></el-date-picker>
        <i>
          <el-checkbox v-model="expiryDate">长期</el-checkbox>
        </i>
      </el-form-item>
      <el-form-item label="资质照片:" required>
        <yc-upload-paper :label="aptitude" v-model="form.certificates"></yc-upload-paper>
      </el-form-item>
      <el-form-item>
        <h1>法人身份证</h1>
      </el-form-item>
      <el-form-item label="真实姓名:" required prop="owner">
        <el-input v-model="form.owner" placeholder="请输入真实姓名"></el-input>
        <i>必填项，请与身份证上的姓名保持一致</i>
      </el-form-item>
      <el-form-item label="身份证件号码:" required prop="legalPersonPasscode">
        <el-input v-model="form.legalPersonPasscode" placeholder="请输入身份证号码"></el-input>
        <i>必填项，请与身份证上的身份证号码保持一致</i>
      </el-form-item>
      <el-form-item label="身份证照片:" required class="aptitude">
        <yc-upload-paper :label="identity.front" v-model="form.identityCardFrontImgUrl"></yc-upload-paper>
        <yc-upload-paper :label="identity.back" v-model="form.identityCardBehindImgUrl"></yc-upload-paper>
        <yc-upload-paper :label="identity.handFont" v-model="form.identityCardInHandImgUrl"></yc-upload-paper>
      </el-form-item>
      <el-form-item>
        <h1>行业资质</h1>
      </el-form-item>
      <el-form-item label="证件类型:" required prop="certificateTypeId">
        <el-select v-model="form.certificateTypeId" placeholder="全部">
          <el-option v-for="item in credentialsList" :label="item.certificateTypeName" :value="item.certificateTypeId" :key="item.certificateTypeId"></el-option>
        </el-select>
        <i>必填项，请与证件上的类型保持一致</i>
      </el-form-item>
      <el-form-item label="许可证编号:" required prop="certificateNumber">
        <el-input v-model="form.certificateNumber" placeholder="请输入许可证编号"></el-input>
        <i>必填项，请与证件上的许可证编号保持一致</i>
      </el-form-item>
      <el-form-item label="许可证地址:" required prop="certificateAddress">
        <el-input v-model="form.certificateAddress" placeholder="请输入证件上的地址"></el-input>
        <i>必填项，请与许可证上的地址保持一致</i>
      </el-form-item>
      <el-form-item label="有效期:" required prop="certificateExpiryDateTime">
        <el-date-picker type="daterange" placeholder="请选择时间" v-model="form.certificateExpiryDateTime" :disabled="certificateExpiryDate"></el-date-picker>
        <i>
          <el-checkbox v-model="certificateExpiryDate">长期</el-checkbox>
        </i>
      </el-form-item>
      <el-form-item label="资质照片:" required>
        <yc-upload-paper :label="aptitude" v-model="form.certificatePhoto"></yc-upload-paper>
      </el-form-item>
    </el-form>
    <yc-card-footer>
      <el-button size="large" @click="cancel">取消</el-button>
      <el-button v-if="pathname !== 'detail'" type="info" size="large" @click="nextStep">保存并下一步</el-button>
      <el-button v-if="pathname === 'detail'" type="info" size="large" @click="nextStep">保存</el-button>
    </yc-card-footer>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import MerchantService from '@/services/merchant.service'
import ValidatorBase from '@/base/validator.base'

export default {
  data() {
    return {
      form: {
        storeId: '',
        storeType: '',
        companyName: '',
        legalPerson: '',
        taxNumber: '',
        address: '',
        expiryDate: '',
        certificates: '',
        owner: '',
        legalPersonPasscode: '',
        identityCardFrontImgUrl: '',
        identityCardBehindImgUrl: '',
        identityCardInHandImgUrl: '',
        certificateTypeId: '',
        certificateNumber: '',
        certificateAddress: '',
        certificateExpiryDate: '',
        certificatePhoto: '',
        expiryDateTime: {},
        certificateExpiryDateTime: {}
      },
      // 长期
      expiryDate: false,
      certificateExpiryDate: false,
      aptitude: '资质照片',
      identity: {
        front: '正面照',
        back: '反面照',
        handFont: '手持正面照'
      },
      pathname: '',
      credentialsList: [],
      rules: {
        storeType: {required: true, message: '请选择商户主体类型', trigger: 'change'},
        companyName: [
          {required: true, message: '请输入企业名称', trigger: 'blur'},
          {max: 100, message: '企业名称的长度不得超过100个字', trigger: 'blur'}
        ],
        legalPerson: [
          {required: true, message: '请输入企业法人', trigger: 'blur'},
          {max: 20, message: '企业法人的长度不得超过20个字', trigger: 'blur'}
        ],
        taxNumber: [
          {required: true, message: '请输入营业执照注册号', trigger: 'blur'},
          {max: 100, message: '营业执照注册号的长度不得超过100个字', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '请输入注册地址', trigger: 'blur'},
          {max: 200, message: '注册地址的长度不得超过200个字', trigger: 'blur'}
        ],
        expiryDateTime: {
          validator: (rule, value, callback) => {
            if (!this.expiryDate && !value) {
              callback('请选择有效期')
              return
            }
            callback()
          },
          trigger: 'change'},
        owner: [
          {required: true, message: '请输入真实姓名', trigger: 'blur'},
          {max: 20, message: '真实姓名的长度不得超过20个字', trigger: 'blur'}
        ],
        legalPersonPasscode: [
          {required: true, message: '请输入身份证号码', trigger: 'blur'},
          {message: '身份证号码是长度为18位的数字或数字＋字母', pattern: ValidatorBase.pattern.enIdentityCard, trigger: 'blur'}
        ],
        certificateTypeId: {type: 'number', required: true, message: '请选择证件类型', trigger: 'change'},
        certificateNumber: [
          {required: true, message: '请输入许可证编号', trigger: 'blur'},
          {max: 100, message: '许可证编号的长度不得超过100个字', trigger: 'blur'}
        ],
        certificateAddress: [
          {required: true, message: '请输入许可证地址', trigger: 'blur'},
          {max: 200, message: '许可证地址的长度不得超过200个字', trigger: 'blur'}
        ],
        certificateExpiryDateTime: {
          validator: (rule, value, callback) => {
            if (!this.certificateExpiryDate && !value) {
              callback('请选择许可证有效期')
              return
            }
            callback()
          },
          trigger: 'change'}
      }
    }
  },
  computed: {
    ...mapState({
      baseInfo: state => state.merchant.baseInfo
    })
  },
  mounted() {
    this.MerchantService = new MerchantService()
    this.getCtfTypeList()
    this.pathname = this.$route.params.page
    if (this.pathname === 'detail') {
      this.getQualificationEdit()
    }
  },
  methods: {
    async getCtfTypeList() {
      let res = await this.MerchantService.getCtfTypeList({})
      this.credentialsList = res
    },
    async getQualificationEdit() {
      let params = {
        storeId: this.$route.params.storeId
      }
      let res = await this.MerchantService.getQualificationEdit(params)
      this.form = res
      if (this.form.expiryDate === 'longTime') {
        this.expiryDate = true
      } else {
        this.form.expiryDateTime = this.form.expiryDate.split(',')
      }
      if (this.form.certificateExpiryDate === 'longTime') {
        this.certificateExpiryDate = true
      } else {
        this.form.certificateExpiryDateTime = this.form.certificateExpiryDate.split(',')
      }
    },
    cancel() {
      if (this.pathname === 'detail') {
        this.$emit('cancelDialog')
      } else {
        this.$router.push('/merchant/list')
      }
    },
    async nextStep() {
      this.form.expiryDate = this.form.expiryDateTime
      this.form.certificateExpiryDate = this.form.certificateExpiryDateTime
      let test = true
      if (this.baseInfo.type === 2 || this.baseInfo.type === 3) {
        test = false
        this.$refs.form.validate((valid) => {
          if (valid) {
            test = true
          } else {
            return false
          }
        })
      }
      if (!test) {
        return
      }
      if (this.expiryDate === true) {
        this.form.expiryDate = 'longTime'
      }
      if (this.form.expiryDate !== 'longTime' && this.form.expiryDate) {
        for (let i = 0; i < this.form.expiryDate.length; i++) {
          this.form.expiryDate[i] = this.$bqUtils.dateFormat(this.form.expiryDate[i], 'yyyy-MM-dd')
        }
        this.form.expiryDate = this.form.expiryDate[0] + ',' + this.form.expiryDate[1]
      }
      if (this.certificateExpiryDate === true) {
        this.form.certificateExpiryDate = 'longTime'
      }
      if (this.form.certificateExpiryDate !== 'longTime' && this.form.certificateExpiryDate) {
        for (let i = 0; i < this.form.certificateExpiryDate.length; i++) {
          this.form.certificateExpiryDate[i] = this.$bqUtils.dateFormat(this.form.certificateExpiryDate[i], 'yyyy-MM-dd')
        }
        this.form.certificateExpiryDate = this.form.certificateExpiryDate[0] + ',' + this.form.certificateExpiryDate[1]
      }
      if (this.pathname === 'detail') {
        let params = this.$bqUtils.copy(this.form)
        delete params.expiryDateTime
        delete params.certificateExpiryDateTime
        await this.MerchantService.qualificationSubmit(params)
        this.$emit('cancelDialog')
      } else {
        let params = this.$bqUtils.copy(this.form)
        delete params.expiryDateTime
        delete params.certificateExpiryDateTime
        await this.MerchantService.AddMerchant(params, 'three')
        this.$emit('changeCurrent', 4)
      }
    }
  }
}
</script>
<style lang="scss">
@import "./add.scss";

.add-three {
  .el-form {
    margin-left: 70px;
    h1 {
      margin-top: 20px;
    }
    .el-form-item {
      width: 100%;
      margin: 20px auto;
    }
    .address .el-input__inner {
      width: 96px;
      margin-right: 3px;
    }
    .phone {
      margin: 0 auto;
      margin-left: 48px;
      .el-checkbox-group {
        display: inline-block;
      }
    }
    .aptitude {
      .el-form-item__content{
        width: 610px;
      }
    }
  }
}
</style>
