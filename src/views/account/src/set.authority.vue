<template>
  <el-dialog :title="title"
    class="yc-account-set__notoppadding"
    :visible.sync="dialogShow"
    :modal-append-to-body="false" size="large"
    @open="openEvent">
    <el-card class="yc-account__dialogcard yc-account__setauthority">
      <p class="yc-account__head">选角色
        <span>（权限与角色关联，选择该账号的角色可完成权限设置）</span>
        <el-button v-if="this.showBaseBtn && type === 'merchant'">云采卖家角色与权限设置</el-button>
        <el-button v-if="this.showBaseBtn && type === 'manager'">云采后台角色与权限设置</el-button>
      </p>
      <el-checkbox-group class="yc-account__setauthority-role yc-account__checkbox-group" v-model="selRole" @change="roleCheckEvent">
        <el-checkbox v-for="(item, index) in baseRole" :key="index" :label="item">{{item.roleName}}</el-checkbox>
      </el-checkbox-group>
      <p class="yc-account__head" nobottom>权限明细</p>
      <authority :baseMenuList="baseMenuList" :selMenuIds="selMenuIds" ref="authority"></authority>
      <yc-card-footer class="yc-account__cardfoot" nomargin>
        <el-button size="large" @click="dialogShow =  false">关闭</el-button>
        <el-button type="info" size="large" @click="saveEvent">保存</el-button>
      </yc-card-footer>
    </el-card>
  </el-dialog>
</template>
<script>
import authority from './authority.vue'
import AccountService from '@/services/account.service.js'
export default {
  data() {
    return {
      dialogShow: this.value || false, // 弹出框显示状态
      baseRole: [], // 基础角色信息
      baseMenuList: [], // 基础权限信息设置
      selRole: [], // 已选择的Role信息
      selMenuIds: '', // 应该被勾选的菜单信息
      showBaseBtn: false // 是否显示基础设置跳转按钮
    }
  },
  props: {
    value: {},
    type: {}, // 权限设置的类型， 有两个可供选择 1.商户2.管理员
    roleIds: {} // 外部出入选中角色ID
  },
  computed: {
    title() {
      return this.type === 'merchant' ? '选择云采商户的操作权限设置' : '云采运营管理预案操作权限设置'
    }
  },
  mounted() {
    this.AccountService = new AccountService()
    this.getBaseInfo() // 获取基础信息
    this.isShowBaseBtn() // 调用判断是否显示跳入基础设置页面功能
  },
  methods: {
    // 获取基础信息
    async getBaseInfo() {
      let res = await this.AccountService.getAuth(this.type === 'merchant' ? 1 : 2)
      this.baseRole = res.roleList
      this.baseMenuList = res.menuList
    },
    // 设置选中的角色信息
    setSelRole() {
      this.selRole = []
      this.baseRole.forEach(item => {
        // TODO: 修改indexOf刚发存在的Bug隐患
        if (this.roleIds.indexOf(item.roleId) > -1) {
          this.selRole.push(item)
        }
      })
    },
    // 设置应该选中的菜单信息
    setSelMenuIds() {
      let menuIdArray = []
      this.selRole.forEach(item => {
        menuIdArray.push(item.menuIds)
      })
      this.selMenuIds = menuIdArray.join(',')
    },
    // 生成选中 角色的id字符串
    createSelRoleIds() {
      let idsArry = []
      this.selRole.forEach(item => {
        idsArry.push(item.roleId)
      })
      return idsArry.join(',')
    },
    // 窗体打开时事件
    openEvent() {
      this.setSelRole() // 设置选中的角色信息
      this.setSelMenuIds() // 设置拥有的权限存在重复  在权限界面处理重复数据
    },
    // 根据用户权限判断是否显示基础设置跳转按钮
    async isShowBaseBtn() {
      // TODO: 权限接口OK后再调整具体逻辑 暂时全部显示
      this.showBaseBtn = true
    },
    // 某个角色选项变更时出现调用的事件
    roleCheckEvent() {
      this.setSelMenuIds()
    },
    // 保存数据调用的事件
    async saveEvent() {
      if (this.selRole.length === 0) {
        this.$message.error('你尚未选择角色，请选择一个角色后再保存!')
      } else {
        this.dialogShow = false
        this.$emit('selRole', this.createSelRoleIds())
      }
    }
  },
  components: {
    authority
  },
  watch: {
    value(val) {
      this.dialogShow = val
    },
    dialogShow(val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="scss">
  .yc-account__setauthority {
    &-role {
      padding-left: 30px;
    }
  }
</style>
