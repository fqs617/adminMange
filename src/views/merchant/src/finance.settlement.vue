<template>
  <div class="add-step add-four">
    <el-form ref="form" :rules="rules" :model="form" label-width="240px">
      <p class="special">
        <span>特别说明：</span>
        如果商户开通云采产品服务类型为卖家，则商户财务结算收款账号必须绑定对公的银行账户；买家若无法提供对公账号的可以提供个人银行账户
      </p>
      <el-form-item>
        <h1 class="first-h">财务结算银行账户信息</h1>
      </el-form-item>
      <el-form-item label="账户类型:" required prop="accountType">
        <el-radio class="radio" v-model="form.accountType" label="0">对公</el-radio>
        <el-radio class="radio" v-model="form.accountType" label="1">对私</el-radio>
      </el-form-item>
      <el-form-item label="银行卡号:" required prop="bankNumber">
        <el-input v-model="form.bankNumber" placeholder="请输入银行卡号"></el-input>
      </el-form-item>
      <el-form-item label="所属银行:" required prop="bank">
        <el-input v-model="form.bank" placeholder="请输入银行名称"></el-input>
      </el-form-item>
      <el-form-item label="开户城市:" required class="address" prop="bankCity">
        <el-select v-model="form.bankCity" placeholder="选择省">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
        <el-select v-model="form.bankCity" placeholder="选择市">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开户支行:" required prop="branch">
        <el-input v-model="form.branch" placeholder="请输入开户的支行名称"></el-input>
      </el-form-item>
      <el-form-item label="对公开户许可证核准号:" required prop="approvalNumber">
        <el-input v-model="form.approvalNumber" placeholder="请输入对公开户许可证上的核准号"></el-input>
      </el-form-item>
      <el-form-item label="资质照片:" required class="uploader-item">
        <yc-upload-paper :label="aptitude" v-model="form.accountOpeningPermit"></yc-upload-paper>
      </el-form-item>
      <div class="info" v-if="form.accountType == 0">
        <p class="header-info">请绑定与企业认证信息匹配的银行卡</p>
        <div>
          <p><span>主体信息：</span>{{ infomation.qualifications }}</p>
          <p><span>企业名称：</span>{{ infomation.companyName }}</p>
          <p><span>注册号：</span>{{ infomation.businessLicenseNumber }}</p>
          <p><span>开户名称：</span>{{ infomation.bankAccount }}</p>
        </div>
      </div>
      <div class="info" v-if="form.accountType == 1">
        <p class="header-info">请绑定开户人本人的银行卡</p>
        <div>
          <p><span>开户人：</span>{{ infomation.legalPerson }}</p>
          <p><span>证件类型：</span>{{ infomation.certificateTypeName }}</p>
          <p><span>证件号码：</span>{{ infomation.certificateNumber }}</p>
        </div>
      </div>
    </el-form>
    <yc-card-footer>
      <el-button size="large" @click="cancel">取消</el-button>
      <el-button v-if="pathname !== 'detail' && baseInfo.type != 1" type="info" size="large" @click="nextStep">保存并下一步</el-button>
      <el-button v-if="pathname === 'detail'" type="info" size="large" @click="nextStep">保存</el-button>
      <el-button v-if="pathname !== 'detail' && baseInfo.type == 1" type="info" size="large" @click="nextStep">确认并保存</el-button>
    </yc-card-footer>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import MerchantService from '@/services/merchant.service'
export default {
  data() {
    return {
      form: {
        accountType: '0',
        bankNumber: '',
        bank: '',
        bankCity: '', // id-id
        branch: '',
        approvalNumber: '',
        accountOpeningPermit: ''
      },
      aptitude: '资质照片',
      pathname: '',
      infomation: {},
      rules: {
        bankNumber: [
          {required: true, message: '请输入银行卡号', trigger: 'blur'},
          {max: 100, message: '银行卡号的长度不得超过100个字', trigger: 'blur'}
        ],
        bank: [
          {required: true, message: '请输入所属银行', trigger: 'blur'},
          {max: 100, message: '所属银行的长度不得超过100个字', trigger: 'blur'}
        ],
        bankCity: {required: true, message: '开户城市必须要选择到具体的城市', trigger: 'blur'},
        branch: [
          {required: true, message: '请输入开户支行', trigger: 'blur'},
          {max: 200, message: '开户支行的长度不得超过200个字', trigger: 'blur'}
        ],
        approvalNumber: [
          {required: true, message: '请输入对公开户许可证核准号', trigger: 'blur'},
          {max: 100, message: '对公开户许可证核准号的长度不得超过100个字', trigger: 'blur'}
        ]
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
    this.pathname = this.$route.params.page
    this.getInfomation(this.form.accountType)
    if (this.pathname === 'detail') {
      this.getFinancialEdit()
    }
  },
  watch: {
    'form.accountType' (val) {
      this.getInfomation(val)
    }
  },
  methods: {
    async getInfomation(val) {
      let params = {
        storeId: this.baseInfo.storeId,
        accountType: val
      }
      let res = await this.MerchantService.getInfomation(params)
      this.infomation = res
    },
    async getFinancialEdit() {
      let params = {
        storeId: this.$route.params.storeId
      }
      let res = await this.MerchantService.getFinancialEdit(params)
      this.form = res
    },
    cancel() {
      if (this.pathname === 'detail') {
        this.$emit('cancelDialog')
      } else {
        this.$router.push('/merchant/list')
      }
    },
    async nextStep() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.pathname === 'detail') {
            let params = this.form
            await this.MerchantService.financialSubmit(params)
            this.$emit('cancelDialog')
          } else {
            let params = this.form
            await this.MerchantService.AddMerchant(params, 'four')
            if (this.baseInfo.type === 1) {
              this.$router.push('/merchant/list')
              return
            }
            this.$emit('changeCurrent', 5)
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
@import "./add.scss";
.add-four {
  .el-form {
    margin-left: 45px;
    position: relative;
    h1 {
      margin-top: 20px;
    }
    .el-form-item {
      width: 100%;
      margin: 20px auto;
    }
    .address .el-input__inner {
      width: 146px;
      margin-right: 3px;
    }
    .info {
      position: absolute;
      left: 635px;
      top: 170px;
      .header-info {
        color: #FF0000;
        font-size: 14px;
        padding-bottom: 20px;
      }
      div {
        width: 297px;
        background: #E5E5E5;
        border: 1px solid #999999;
        padding: 15px 0px 30px 23px;
        p {
          font-size: 14px;
          color: #333333;
          padding-top: 15px;
          span {
            width: 70px;
            color: #333333;
            font-size: 14px;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
