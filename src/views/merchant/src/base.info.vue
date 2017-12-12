<template>
  <div class="add-step add-two">
    <el-form ref="form" :rules="rules" :model="form" label-width="240px">
      <el-form-item class="phone" label="商户绑定手机号:">
        {{ form.phone }}
      </el-form-item>
      <el-form-item class="phone" label="选择商户开通云采产品服务的类型:" required prop="sel">
        <el-checkbox-group v-model="form.sel">
          <el-checkbox v-for="mtype in merchants" :label="mtype.type" :key="mtype.type">{{ mtype.name }}</el-checkbox>
        </el-checkbox-group>
        <i>必填项，两者都选表示该商户即是卖家也是买家</i>
      </el-form-item>
      <el-form-item>
        <h1>商户基本信息填写</h1>
      </el-form-item>
      <el-form-item label="商户所属行业:" required prop="industryId">
        <el-select v-model="form.industryId" placeholder="选择行业">
          <el-option v-for="item in typeList" :key="item.industryId" :label="item.industryName" :value="item.industryId"></el-option>
        </el-select>
        <i>必选项，请选择一个主要的行业</i>
      </el-form-item>
      <el-form-item label="商户名称:" required prop="storeName">
        <el-input v-model="form.storeName" placeholder="请输入商户名称"></el-input>
        <i>必填项，可以输入商户的常用的简洁昵称：例如：红霞超市</i>
      </el-form-item>
      <el-form-item label="商户归属地:" required class="address" prop="districtId">
        <el-select v-model="form.provinceId" placeholder="选择省">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
        <el-select v-model="form.cityId" placeholder="选择市">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
        <el-select v-model="form.districtId" placeholder="选择区">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
        <el-select v-model="form.countyId" placeholder="四级地址">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
        <i>必选项，请最少选择到区</i>
      </el-form-item>
      <el-form-item label="详细地址:" required prop="address">
        <el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
        <i>必填项，此详细地会默认为收货地址，请认真填写</i>
      </el-form-item>
      <el-form-item label="联系人:" required prop="contact">
        <el-input v-model="form.contact" placeholder="请输入联系人"></el-input>
        <i>必填项，请填写该商户的常用联系人</i>
      </el-form-item>
      <el-form-item label="联系电话:" required prop="contactMobile">
        <el-input v-model="form.contactMobile" placeholder="请输入联系电话"></el-input>
        <i>必填项，请填写该商户的联系人常用的联系电话，仅限手机号</i>
      </el-form-item>
      <el-form-item label="商户推荐人的云采注册手机号:" prop="referrerPhone">
        <el-input v-model="form.referrerPhone" placeholder="请输入商户推荐人的注册手机号"></el-input>
        <i>非必填项，可若填写需要填写推荐人云采的注册手机号</i>
      </el-form-item>
      <el-form-item label="是否为测试商户:" required prop="isTest">
        <el-radio class="radio" v-model="form.isTest" label="1">是</el-radio>
        <el-radio class="radio" v-model="form.isTest" label="2">否</el-radio>
        <i>必选项，主要用于数据统计时会过滤掉测试商户的数据</i>
      </el-form-item>
    </el-form>
    <yc-card-footer>
      <el-button size="large" @click="cancel">取消</el-button>
      <el-button v-if="pathname !== 'detail' || (form.sel[0] == 1 && form.sel.length === 1)" type="info" size="large" @click="nextStep">保存并下一步</el-button>
      <el-button v-if="pathname === 'detail' && (form.sel[0] != 1 || form.sel.length === 2)" type="info" size="large" @click="nextStep">下一步</el-button>
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
        phone: '',
        storeId: '',
        type: '',
        sel: [],
        industryId: 0,
        storeName: '',
        provinceId: '',
        cityId: '',
        districtId: '',
        countyId: '',
        address: '',
        contact: '',
        contactMobile: '',
        referrerPhone: '',
        isTest: '2'
      },
      merchants: [
        {name: '买家', type: 1},
        {name: '卖家', type: 2}
      ],
      typeList: [],
      pathname: '',
      rules: {
        sel: {type: 'array', required: true, message: '请选择商户开通云采产品服务的类型', trigger: 'change'},
        industryId: {type: 'number', required: true, message: '请选择一个主要的行业', trigger: 'change'},
        storeName: {required: true, message: '请输入商户名称', trigger: 'blur'},
        districtId: {
          validator: (rule, value, callback) => {
            if (!this.form.provinceId || !this.form.cityId || !this.form.districtId) {
              callback('请选择归属地')
              return
            }
            callback()
          },
          trigger: 'blur'},
        address: [
          {required: true, message: '请输入详细地址', trigger: 'blur'},
          {max: 100, message: '详细地址的长度不得超过100个字', trigger: 'blur'}
        ],
        contact: [
          {required: true, message: '请输入联系人', trigger: 'blur'},
          {max: 20, message: '联系人的长度不得超过20个字', trigger: 'blur'}
        ],
        contactMobile: {required: true, message: '请输入11位联系手机号', pattern: ValidatorBase.pattern.isPhone, trigger: 'blur'},
        referrerPhone: {message: '请输入11位有效的云采注册手机号', pattern: ValidatorBase.pattern.isPhone, trigger: 'blur'}
      }
    }
  },
  computed: {
    ...mapState({
      phone: state => state.merchant.phone
    })
  },
  mounted() {
    this.MerchantService = new MerchantService()
    if (this.phone) {
      this.form.phone = this.phone
    }
    this.getBnsTypeList()
    this.pathname = this.$route.params.page
    // 编辑
    if (this.$route.params.storeId) {
      this.getStoreInfoEdit()
    }
  },
  methods: {
    // 获取行业列表
    async getBnsTypeList() {
      let res = await this.MerchantService.getBnsTypeList({})
      this.typeList = res
    },
    async getStoreInfoEdit() {
      let res = await this.MerchantService.getStoreInfoEdit({storeId: this.$route.params.storeId})
      this.form = res
      if (this.form.type === 3) {
        this.form.sel = [1, 2]
      } else {
        this.form.sel = [this.form.type]
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
      if (this.form.sel.length === 2) {
        this.form.type = 3
      } else {
        this.form.type = this.form.sel[0]
      }
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.pathname === 'detail') {
            let params = this.$bqUtils.copy(this.form)
            delete params.phone
            delete params.sel
            await this.MerchantService.storeInfoSubmit(params)
            let info = {
              storeId: this.$route.params.storeId,
              type: this.form.type
            }
            this.$store.commit('GET_MERCHANT_BASEINFO', info)
            this.$emit('cancelDialog', 2)
          } else {
            let params = this.$bqUtils.copy(this.form)
            delete params.phone
            delete params.sel
            let res = await this.MerchantService.AddMerchant(params, 'two')
            let info = {
              storeId: res.storeId,
              type: this.form.type
            }
            this.$store.commit('GET_MERCHANT_BASEINFO', info)
            this.$emit('changeCurrent', 3)
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

.add-two {
  .el-form {
    margin-left: 105px;
    .address .el-input .el-input__inner {
      width: 96px;
      margin-right: 3px;
    }
    .el-form-item {
      width: 100%;
      margin: 20px auto;
    }
    .phone {
      margin: 0 auto;
      margin-left: 48px;
      .el-checkbox-group {
        display: inline-block;
      }
    }
    .el-checkbox + .el-checkbox {
      margin-left: 40px;
      margin-right: 20px;
    }
  }
}
</style>
