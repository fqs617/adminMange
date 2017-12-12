<template>
  <yc-page class="merchant-detail">
    <div class="content">
      <h1>{{ titleList.accout }}</h1>
      <div class="info1">
        <span>用户ID：{{ info.userId }}</span>
        <span>用户名：{{ info.userName }}</span>
        <span>手机号：{{ info.phone }}</span>
      </div>
      <h1>
        {{ titleList.base }}
        <el-button type="primary" @click="edit(titleList.base, 1)">编辑</el-button>
      </h1>
      <div class="info2">
        <span>商户开通云采产品服务的类型：{{ info.industryName }}</span>
        <span>商户所属行业：{{ info.industryId }}</span>
        <span>商户名称：{{ info.storeName }}</span>
        <span>商户归属地：{{ info.regionName }}</span>
        <span>详细地址：{{ info.address }}</span>
        <span>联系人：{{ info.contact }}</span>
        <span>联系电话：{{ info.contactMobile }}</span>
        <span>商户推荐人的云采注册手机号：{{ info.referrerPhone }}</span>
        <span>是否为测试商户：{{ info.isTest }}</span>
      </div>
      <h1>
        {{ titleList.aptitude }}
      </h1>
      <div class="info3">
        <h2>商户主体信息</h2>
        <div class="info2">
          <span>商户主体类型：{{ info.storeType }}</span>
          <span>企业名称：{{ info.companyName }}</span>
          <span>企业法人：{{ info.legalPerson }}</span>
          <span>营业执照注册号：{{ info.taxNumber }}</span>
          <span>注册地址：{{ info.address }}</span>
          <span>有效期：{{ info.expiryDate }}</span>
          <span>资质照片：点击图片查看原图</span>
            <div class="info2">
              <div class="img-info">
                <img :src="info.certificates" @click="lookImg(info.certificates)">
              </div>
            </div>
        </div>
        <h2>法人身份证信息</h2>
        <div class="info2">
          <span>真实姓名：{{ info.owner }}</span>
          <span>身份证号码：{{ info.legalPersonPasscode }}</span>
          <span>身份证照片：点击图片查看原图</span>
            <div class="info2">
              <div class="img-info">
                <img :src="info.identityCardFrontImgUrl" @click="lookImg(info.identityCardFrontImgUrl)">
                <p>正面照</p>
              </div>
              <div class="img-info">
                <img :src="info.identityCardBehindImgUrl" @click="lookImg(info.identityCardBehindImgUrl)">
                <p>反面照</p>
              </div>
              <div class="img-info">
                <img :src="info.identityCardInHandImgUrl" @click="lookImg(info.identityCardInHandImgUrl)">
                <p>手持正面照</p>
              </div>
            </div>
        </div>
        <h2>行业资质</h2>
        <div class="info2">
          <span>证件类型：{{ info.certificateTypeName }}</span>
          <span>许可证编号：{{ info.certificateNumber }}</span>
          <span>许可证地址：{{ info.certificateAddress }}</span>
          <span>有效期：{{ info.certificateExpiryDate }}</span>
          <span>资质照片：点击图片查看原图</span>
            <div class="info2">
              <div class="img-info last-img">
                <img :src="info.certificateExpiryPhoto" @click="lookImg(info.certificateExpiryPhoto)">
              </div>
            </div>
        </div>
      </div>
      <h1>
        {{ titleList.finance }}
        <el-button type="primary" @click="edit(titleList.finance, 3)">编辑</el-button>
      </h1>
      <div class="info2">
        <span>账户类型：{{ info.accountType }}</span>
        <span>银行卡号：{{ info.bankNumber }}</span>
        <span>所属银行：{{ info.bank }}</span>
        <span>开户城市：{{ info.bankCity }}</span>
        <span>开户支行：{{ info.branch }}</span>
        <span>对公开户许可证核准号：{{ info.approvalNumber }}</span>
        <span>资质照片：点击图片查看原图</span>
          <div class="info2">
            <div class="img-info">
              <img :src="info.accountOpeningPermit" @click="lookImg(info.accountOpeningPermit)">
            </div>
          </div>
      </div>
    </div>
    <el-dialog
      custom-class="yc-d"
      :title="dialogTitle"
      :visible.sync="linkDialogVisible"
      size="large"
      :modal-append-to-body = "false"
      :before-close="handleClose">
      <component :is="currentView" transition="fade" transition-mode="out-in" @cancelDialog="handleClose"></component>
    </el-dialog>
    <el-dialog
      custom-class="yc-d"
      title="查看原图"
      class="img-dialog"
      :visible.sync="imgDialogVisible"
      :modal-append-to-body = "false"
      :before-close="handleClose">
      <img :src="imgDialogUrl" alt="">
    </el-dialog>
  </yc-page>
</template>
<script>
import BaseInfo from './base.info.vue'
import UploadAptitude from './upload.aptitude.vue'
import FinanceSettlement from './finance.settlement.vue'
import MerchantService from '@/services/merchant.service'

export default {
  data() {
    return {
      titleList: {
        accout: '商户账号信息',
        base: '商户基本信息',
        aptitude: '商户资质信息',
        finance: '财务结算信息'
      },
      info: {},
      currentView: 'baseInfo',
      dialogTitle: '商户基本信息编辑',
      linkDialogVisible: false,
      imgDialogVisible: false,
      imgDialogUrl: '',
      tag: 1
    }
  },
  mounted () {
    this.MerchantService = new MerchantService()
    this.getMerchantDetail()
  },
  methods: {
    async getMerchantDetail() {
      let params = {
        storeId: this.$route.params.storeId
      }
      let res = await this.MerchantService.getMerchantDetail(params)
      this.info = res
    },
    edit(title, index) {
      this.linkDialogVisible = true
      this.dialogTitle = title + '编辑'
      if (index === 1) {
        this.currentView = 'baseInfo'
      }
      if (index === 2) {
        this.currentView = 'uploadAptitude'
      }
      if (index === 3) {
        this.currentView = 'financeSettlement'
      }
      this.tag = index
    },
    lookImg(url) {
      this.imgDialogVisible = true
      this.imgDialogUrl = url
    },
    handleClose(tag) {
      if (tag === 2) {
        this.edit('商户资质信息', 2)
        return
      }
      this.linkDialogVisible = false
      this.imgDialogVisible = false
      this.getMerchantDetail()
    }
  },
  components: {
    baseInfo: BaseInfo,
    uploadAptitude: UploadAptitude,
    financeSettlement: FinanceSettlement
  }
}
</script>
<style lang="scss">
  .merchant-detail {
    min-width: 880px;
    .content {
      padding: 0 70px 0 50px;
      h1 {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #333333;
        padding: 0 20px;
        margin-top: 40px;
        background: #E5E5E5;
      }
      span {
        font-size: 14px;
        padding-top: 20px;
        display: inline-block;
      }
      .info1 {
        padding-left: 50px;
        span {
          width: 30%;
        }
      }
      .info2 {
        padding-left: 50px;
        span {
          width: 49%;
        }
        .img-info {
          display: inline-block;
          text-align: center;
          margin-right: 50px;
          margin-bottom: 30px;
          img {
            margin: 20px 0 0 10px;
            width: 200px;
            height: 200px;
            background: #E5E5E5;
            display: inline-block;
          }
          p {
            font-size: 14px;
            color: #666666;
            margin-top: 15px;
          }
        }
      }
      .info3 {
        padding-left: 50px;
        h2 {
          font-size: 20px;
          color: #333333;
          padding-top: 40px;
          padding-bottom: 10px;
          margin-left: -50px;
          padding-left: 50px;
          border-top: 1px dashed #CCCCCC;
        }
        h2:first-child {
          border: none;
        }
        span {
          width: 49%;
        }
        .last-img {
          margin-bottom: 0;
        }
      }
      .el-button {
        padding: 7px 18px;
        margin-left: 30px;
        span {
          font-size: 12px;
          padding: 0;
        }
      }
    }
    .yc-card-footer {
      margin-top: 50px;
      background: none;
    }
    .el-dialog--large {
      min-width: 1050px;
    }
    .img-dialog {
      .yc-d {
        width: auto;
        .dialog-img {
          width: auto;
          height: auto;
        }
      }
    }
  }
</style>
