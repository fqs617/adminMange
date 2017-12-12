<template>
  <yc-page class="yc-account-set">
    <el-card class="yc-account__dialogcard">
      <add-nav sel="set"></add-nav>
      <div class="yc-account-set-info">
        <span>用户名：{{baseInfo.userName}}</span><span>手机号：{{baseInfo.phone}}</span><span>归属地：{{baseInfo.homeLocation}}</span>
      </div>
      <p class="yc-account-set-cue">请选择为该账户开通服务</p>
      <div class="yc-account-set-operate">
        <p class="yc-account-set__ophead">
          <el-checkbox v-model="serveInfo.isMerchant"></el-checkbox><span class="htxt">云采商户</span><span class="destxt">(若勾选云采商户，则仅能选择一个对应的云采商户)</span>
        </p>
        <el-form class="yc-form" :inline="true" label-width="110px">
          <el-form-item label="选择商户：" class="yc-form-item yc-account-set__leftformitem">
            <el-button  class="yc-account-set__selbtn" @click="merchantService.showSelMerchant = true">选择商户</el-button>
          </el-form-item>
          <el-form-item label="已选择的商户：" class="yc-form-item">
           <el-button v-show="merchantService.merchantInfoId" class="yc-account-set__selbtn"  type="text" @click="merchantService.showSeeMerchant = true">查看商户</el-button>
           <span v-show="!merchantService.merchantInfoId" class="yc-account-set__nosel">暂未选择</span>
          </el-form-item>
        </el-form>
        <el-form class="yc-form" :inline="true" label-width="110px">
          <el-form-item label="操作权限：" class="yc-form-item yc-account-set__leftformitem">
            <el-button  class="yc-account-set__selbtn" @click="merchantService.showSetAuthority = true">权限设置</el-button>
          </el-form-item>
          <el-form-item label="已选择的权限：" class="yc-form-item">
            <el-button v-show="merchantService.roleIds" 
              class="yc-account-set__selbtn"  
              type="text" @click="merchantService.showSeeAuthority = true">查看权限</el-button>
            <span v-show="!merchantService.roleIds" class="yc-account-set__nosel">暂未选择</span>
          </el-form-item>
        </el-form>
      </div>
      <hr class="yc-account-set-parting"/>
      <div class="yc-account-set-operate">
        <p class="yc-account-set__ophead">
          <el-checkbox v-model="serveInfo.isManager"></el-checkbox><span class="htxt">云采运营管理员</span>
        </p>
        <el-form class="yc-form" :inline="true" label-width="110px">
          <el-form-item label="操作权限：" class="yc-form-item yc-account-set__leftformitem">
            <el-button  class="yc-account-set__selbtn" @click="managerService.showSetAuthority = true">权限设置</el-button>
          </el-form-item>
          <el-form-item label="已选择的权限：" class="yc-form-item">
            <el-button v-show="managerService.roleIds" 
              class="yc-account-set__selbtn"  
              type="text" @click="managerService.showSeeAuthority = true">查看权限</el-button>
            <span v-show="!managerService.roleIds" class="yc-account-set__nosel">暂未选择</span>
          </el-form-item>
        </el-form>
        <el-form class="yc-form" :inline="true" label-width="110px">
          <el-form-item label="数据权限：" class="yc-form-item yc-account-set__leftformitem">
            <el-button  class="yc-account-set__selbtn" @click="managerService.showSetDataAuthority = true">权限设置</el-button>
          </el-form-item>
          <el-form-item label="已选择的权限：" class="yc-form-item">
            <el-button v-show="ishaveDataAuthority" 
              class="yc-account-set__selbtn"  
              type="text" @click="managerService.showSeeDataAuthority = true">查看权限</el-button>
            <span v-show="!ishaveDataAuthority" class="yc-account-set__nosel">暂未选择</span>
          </el-form-item>
        </el-form>
      </div>
      <yc-card-footer class="yc-account-set-footer">
        <el-button size="large" @click="$router.push('/account/list')">取消</el-button>
        <el-button type="info" size="large" @click="saveEvent">确认并保存</el-button>
      </yc-card-footer> 
    </el-card>
    <!--选择商户BEGIN-->
    <sel-merchant v-model="merchantService.showSelMerchant" 
      :selMerchantId="merchantService.merchantInfoId"
      @selMerchant="selMerchantEvent"></sel-merchant>
    <!--选择商户END-->
    <!--查看商户BEGIN-->
    <el-dialog title="查看商户" class="yc-account-set__notoppadding" :visible.sync="merchantService.showSeeMerchant" :modal-append-to-body="false" size="large">
      <el-card class="yc-account__dialogcard">
        <merchant :selMerchantId="merchantService.merchantInfoId"></merchant>
        <yc-card-footer class="yc-account__cardfoot">
          <el-button size="large" @click="merchantService.showSeeMerchant = false">关闭</el-button>
        </yc-card-footer>
      </el-card>
    </el-dialog>
    <!--查看商户END-->

    <!--云采商户权限设置Begin-->
    <set-authority v-model="merchantService.showSetAuthority"
      :type="'merchant'"
      :roleIds="merchantService.roleIds"
      @selRole="selRoleEvent"></set-authority>
    <!--云采商户权限设置End-->
    <!--云采商户权限查看Begin-->
    <el-dialog title="云采商户权限查看"
      class="yc-account-set__notoppadding"
      :visible.sync="merchantService.showSeeAuthority"
      :modal-append-to-body="false" size="large">
      <el-card class="yc-account__dialogcard">
        <see-authority :type="'merchant'" :roleIds="merchantService.roleIds"></see-authority>
        <yc-card-footer class="yc-account__cardfoot">
          <el-button size="large" @click="merchantService.showSeeAuthority = false">关闭</el-button>
        </yc-card-footer>
      </el-card>
    </el-dialog>
    <!--云采商户权限查看End-->
    

    <!--后台角色权限设置Begin-->
    <set-authority v-model="managerService.showSetAuthority"
      :type="'manager'"
      :roleIds="managerService.roleIds"
      @selRole="selManagerRoleEvent"></set-authority>
    <!--后台角色权限设置End-->
    <!--后台角色权限查看Begin-->
    <el-dialog title="云采运营管理员操作权限查看"
      class="yc-account-set__notoppadding"
      :visible.sync="managerService.showSeeAuthority"
      :modal-append-to-body="false" size="large">
      <el-card class="yc-account__dialogcard">
        <see-authority :type="'manager'" :roleIds="managerService.roleIds"></see-authority>
        <yc-card-footer class="yc-account__cardfoot">
          <el-button size="large" @click="managerService.showSeeAuthority = false">关闭</el-button>
        </yc-card-footer>
      </el-card>
    </el-dialog>
    <!--后台角色权限查看End-->

    <!--后台数据权限信息设置Begin-->
    <set-data-authority v-model="managerService.showSetDataAuthority"
      :dataAuthority="managerService.dataAuthority"
      @selDataAuthority="selDataAuthorityEvent"></set-data-authority>
    <!--后台数据权限信息设置End-->
    <!--后台数据权限信息查看Begin-->
    <el-dialog title="云采运营管理员数据权限查看"
      class="yc-account-set__notoppadding"
      :visible.sync="managerService.showSeeDataAuthority"
      :modal-append-to-body="false" size="large">
      <el-card class="yc-account__dialogcard">
         <data-authority :dataAuthority="managerService.dataAuthority"></data-authority>
        <yc-card-footer class="yc-account__cardfoot">
          <el-button size="large" @click="managerService.showSeeDataAuthority = false">关闭</el-button>
        </yc-card-footer>
      </el-card>
    </el-dialog>
    <!--后台数据权限信息查看End-->
  </yc-page>
</template>
<script>
import addNav from './add.nav.vue'
import selMerchant from './sel.merchant.vue'
import setDataAuthority from './set.data.authority.vue'
import setAuthority from './set.authority.vue'
import seeAuthority from './see.authority.vue'
import merchant from './merchant.vue'
import dataAuthority from './data.authority.vue'
import AccountService from '@/services/account.service.js'
export default {
  data() {
    return {
      // 需要设置的账户信息
      accountId: -1,
      // 头部的基本信息
      baseInfo: {},
      // 服务数据
      serveInfo: {
        isMerchant: false, // 是否属于商户
        isManager: false  //  是否是管理员
      },
      // 商户类型数据
      merchantService: {
        showSelMerchant: false, // 是否弹出选择商户窗体
        showSeeMerchant: false, // 是否弹出查看窗体数据
        showSetAuthority: false, // 是否弹出权限设置窗体
        showSeeAuthority: false, // 是否弹出查看权限窗体
        merchantInfoId: '', // 选择的商户信息
        roleIds: '' // 商户类型角色信息
      },
      // 运营管理员数据
      managerService: {
        showSetAuthority: false, // 是否弹出权限设置窗体
        showSeeAuthority: false, // 是否弹出查看窗体数据
        showSetDataAuthority: false, // 是否弹出数据权限窗体
        showSeeDataAuthority: false, // 是否弹出数据权限查看窗体
        roleIds: '', // 选中的后台运营角色信息
        dataAuthority: null // 数据权限信息
      }
    }
  },
  computed: {
    ishaveDataAuthority() {
      if (!this.managerService.dataAuthority) {
        return false
      }
      if (!this.managerService.dataAuthority.area.ids &&
        !this.managerService.dataAuthority.store.ids && !this.managerService.dataAuthority.classify.ids && !this.managerService.dataAuthority.industry.ids) {
        return false
      }
      return true
    }
  },
  mounted() {
    this.AccountService = new AccountService()
    this.accountId = this.$route.params.id
    this.getInfo()
  },
  methods: {
    // 获取初始信息
    async getInfo() {
      let res = await this.AccountService.getAccountService(this.accountId)
      this.baseInfo = res
      this.serveInfo.isMerchant = !!res.cloudStoreService
      this.serveInfo.isManager = !!res.cloudBackendService
    },
    // 选中商户后触发的事件
    selMerchantEvent(val) {
      this.merchantService.merchantInfoId = val
    },
    // 选中角色信息触发事件
    selRoleEvent(val) {
      this.merchantService.roleIds = val
    },
    // 后台管理选中角色信息触发事件
    selManagerRoleEvent(val) {
      this.managerService.roleIds = val
    },
    selDataAuthorityEvent(val) {
      this.managerService.dataAuthority = val
    },
    // 保存用户信息
    async saveEvent() {
      if (!this.saveValidate()) {
        return false
      }
      // TODO: 进行调用接口保存
      let params = this.createSaveDate()
      let res = await this.AccountService.settingSave(params)
      if (res === 'success') {
        this.$message({message: '服务设置成功', type: 'success'})
        this.$router.push('/account/list')
      }
    },
    // 保存前的信息验证
    saveValidate() {
      if (!this.serveInfo.isMerchant && !this.serveInfo.isManager) {
        this.$message.error('请至少选择一个要开通的服务!')
        return false
      }
      if (this.serveInfo.isMerchant) {
        if (!this.merchantService.merchantInfoId) {
          this.$message.error('请至少选择一个云采商户!')
          return false
        }
        if (!this.merchantService.roleIds) {
          this.$message.error('未设置操作权限，请设置权限后再保存!')
          return false
        }
      }
      if (this.serveInfo.isManager) {
        if (!this.managerService.roleIds) {
          this.$message.error('请选择云采运营管理员的操作权限后再保存!')
          return false
        }
        if (!this.managerService.dataAuthority) {
          this.$message.error('请选择云采运营管理员的数据权限后再保存!')
          return false
        }
        if (!this.managerService.dataAuthority.area.ids &&
          !this.managerService.dataAuthority.store.ids && !this.managerService.dataAuthority.classify.ids && !this.managerService.dataAuthority.industry.ids) {
          this.$message.error('请选择云采运营管理员的数据权限后再保存!')
          return false
        }
      }
      return true
    },
    // 生成保存数据
    createSaveDate() {
      let param = {}
      param.userId = this.baseInfo.userId
      param.serviceType = this.serveInfo.isMerchant && this.serveInfo.isManager ? 3 : this.serveInfo.isMerchant ? 1 : 2
      if (this.serveInfo.isMerchant) {
        param.storeId = this.merchantService.merchantInfoId
        param.cloudSellerRoleIds = this.merchantService.roleIds
      }
      if (this.serveInfo.isManager) {
        param.cloudBackendRoleIds = this.managerService.roleIds
        if (this.managerService.dataAuthority) {
          param.regionAuthIds = this.managerService.dataAuthority.area.ids
          param.regionAuthNameStr = this.managerService.dataAuthority.area.txt
          param.storeIds = this.managerService.dataAuthority.store.ids
          param.storeAuthNameStr = this.managerService.dataAuthority.store.txt
          param.cateAuthIds = this.managerService.dataAuthority.classify.ids
          param.cateAuthNameStr = this.managerService.dataAuthority.classify.txt
          param.industryIds = this.managerService.dataAuthority.industry.ids
          param.industryAuthNameStr = this.managerService.dataAuthority.industry.txt
        }
      }
      return param
    }
  },
  components: {
    addNav,
    selMerchant,
    setDataAuthority,
    setAuthority,
    seeAuthority,
    merchant,
    dataAuthority
  }
}
</script>
<style lang="scss">
  @import 'scss/variables.scss';
  .yc-account-set {
    &-info {
      display: flex;
      justify-content: center;
      height: 60px;
      background-color: #fff;
      line-height: 60px; 
      margin: 40px 15% 0px 15%;
      span {
        width: 33%;
        text-align: center;
        font-size: 14px;
      }
    }
    &-cue {
      margin-top: 36px;
      margin-left: 23%;
      font-size: 14px;
      color: #666;
    }
    &-operate {
      // border: 1px solid red;
      margin-left: 25%;
      margin-top: 34px;
      
    }
    &__leftformitem.el-form-item {
      margin-right: 35px;
    }
    &__selbtn {
      &.el-button--default {
        width: 110px;
        height: 40px;
        > span {
          font-size: 16px;
        }
      }
      &.el-button--text {
        > span {
          font-size: 14px;
          position: relative;
          top: -2px;
        }
        
      }
    }
    &__nosel {
      font-size: 14px;
      position: relative;
      top: -2px;
    }
    &__ophead {
      margin-bottom: 30px;
      > span {
        position: relative;
        bottom: -2px;
      }
      .htxt {
        font-size: 16px;
        margin-left: 8px;
        margin-right: 22px;
      }
      .destxt {
        font-size: 14px;
        color: #999;
        bottom: -1px
      }

    }
    &-footer {
      background-color: initial;
      width: initial;
      margin-left: 30px;
      margin-right: 30px;
    }
    &-parting {
      border: 1px dashed #ccc;
      margin: 40px 10% 0px 10%;
    }
    &__notoppadding {
      .el-dialog__body {
        padding-top: 0px;
      }
    }
  }  
</style>
