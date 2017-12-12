<template>
  <div class="yc-account__seeauthority">
    <p class="yc-account__head">角色</p>
    <div class="yc-account__seeauthority-roleinfo">
      <span v-for="(item,index) in selRoles" :key="index">{{item.roleName}}</span>
    </div>
    <p class="yc-account__head" nobottom>权限明细</p>
    <authority :baseMenuList="baseMenuList" :selMenuIds="selMenuIds" :ref="authority"></authority>
  </div>
</template>
<script>
import authority from './authority.vue'
import AccountService from '@/services/account.service.js'
export default {
  data() {
    return {
      baseMenuList: [], // 基础权限信息设置
      selRoles: [], // 选中的角色
      selMenuIds: '' // 应该被勾选的菜单信息
    }
  },
  props: {
    type: {}, // 权限查看 有两个可供选择 1.商户2.管理员
    roleIds: {} // 外部传入的选中角色项目
  },
  mounted() {
    this.AccountService = new AccountService()
    this.getViewInfo(this.roleIds)
  },
  methods: {
    // 获取基本信息
    async getViewInfo(roleIds) {
      let res = await this.AccountService.getAuthView(this.type === 'merchant' ? 1 : 2, roleIds)
      this.baseMenuList = res.menuList
      this.selRoles = res.roleList
      this.createSelMenuIds(res.roleList)
    },
    // 生成选中的菜单信息
    createSelMenuIds(selRole) {
      let menuIdArray = []
      selRole.forEach(item => {
        menuIdArray.push(item.menuIds)
      })
      this.selMenuIds = menuIdArray.join(',')
    }
  },
  watch: {
    roleIds(val) {
      this.getViewInfo(val)
    }
  },
  components: {
    authority
  }
}
</script>
<style lang="scss">
  .yc-account__seeauthority {
    &-roleinfo {
      padding-left: 30px;
      span {
        font-size: 14px;
        color: #333333;
        margin-right: 30px;
        margin-top: 15px;
        display: inline-block;
      }
    }
  }
</style>
