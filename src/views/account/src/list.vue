<template>
  <yc-page class="yc-account-list">
    <template slot="buttons">
      <el-button >导出数据</el-button>
      <el-button type="info" @click="$router.push(`/account/add`)">新增用户</el-button>
    </template>
     <yc-page-header> 
      <el-form :inline="true">
        <el-form-item label="按条件筛选：">
          <el-input class="yc-ipt" v-model="search.condition" placeholder="输入用户ID／用户名／手机号／邮箱号" long noradius></el-input>
        </el-form-item>
        <el-form-item label="注册时间：">
          <el-date-picker type="date" v-model="search.begindt" placeholder="开始日期" class="yc-ipt" short noradius noicon></el-date-picker>
          <el-date-picker type="date" v-model="search.enddt" placeholder="结束日期" class="yc-ipt" short noradius noicon></el-date-picker>
        </el-form-item>
         <el-form-item label="状态：" >
          <el-select v-model="search.state"  placeholder="请选择" class="yc-ipt" short noradius>
            <el-option v-for="(item, index) in dropDownData.state" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="已开通的服务：" >
          <el-select v-model="search.serve"  placeholder="请选择" class="yc-ipt" short noradius>
            <el-option v-for="(item, index) in dropDownData.service" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号类型：" >
          <el-select v-model="search.type"  placeholder="请选择" class="yc-ipt" short noradius>
            <el-option v-for="(item, index) in dropDownData.type" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属地：" >
          <el-select v-model="search.province"  placeholder="选择省" class="yc-ipt" short noradius>
            <el-option  label="全部" value="-1">
            </el-option>
          </el-select>
          <el-select v-model="search.city"  placeholder="选择市" class="yc-ipt" short noradius>
            <el-option  label="全部" value="-1">
            </el-option>
          </el-select>
          <el-select v-model="search.area"  placeholder="请选区" class="yc-ipt" short noradius>
            <el-option  label="全部" value="-1">
            </el-option>
          </el-select>
        </el-form-item> 
        <el-form-item>
          <el-button @click="serchEvent">搜索</el-button>
        </el-form-item>
      </el-form>
     </yc-page-header> 
     <el-table :data="accountList" border stripe>
      <el-table-column prop="userId" label="商户ID" align="center" width="80"></el-table-column>
      <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱号" align="center"></el-table-column>
      <el-table-column label="归属地" align="center">
        <template scope="scope">
          {{scope.row.province}}-{{scope.row.city}}-{{scope.row.district}}
        </template>
      </el-table-column>
      <el-table-column prop="createTimeStr" label="注册时间" align="center"></el-table-column>
      <el-table-column label="已开通的服务" align="center" width="220">
         <template scope="scope">
          <div class="yc-account-list__serve">
            <span v-if="scope.row.type*1 === 0">-</span>
            <span v-if="scope.row.type*1 === 2">云采商户：卖家
              <label class="account-tp" :atype="scope.row.isParentType">{{scope.row.isParentType*1 === 1 ? '主账号' : '子账号'}}</label>
            </span>
            <span v-if="scope.row.type*1 === 3">云采商户：买家＋卖家
              <label class="account-tp" :atype="scope.row.isParentType">{{scope.row.isParentType*1 === 1 ? '主账号' : '子账号'}}</label>
            </span>
            <span v-if="scope.row.type*1 === 4">云采运营后台
              <label class="account-tp" :atype="scope.row.isParentType">{{scope.row.isParentType*1 === 1 ? '主账号' : '子账号'}}</label>
            </span>
            <span v-if="scope.row.type*1 === 7">云采商户：买家＋卖家
              <label class="account-tp" :atype="scope.row.isParentType">{{scope.row.isParentType*1 === 1 ? '主账号' : '子账号'}}</label>
            </span>
            <span v-if="scope.row.type*1 === 7">云采运营后台
            </span>
          </div> 
        </template> 
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template scope="scope">
          <span>{{getStatusStr(scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="操作" align="center" width="180">
        <template scope="scope">
          <el-button  type="text" size="small" @click="$router.push(`/account/detail/${scope.row.userId}`)">查看</el-button>
          <el-button type="text" size="small" @click="delAccount(scope.row)">删除</el-button>
          <el-button v-if="(scope.row.status*1) !==2 && (scope.row.status*1) ===0" type="text" size="small" @click="switchAccount(scope.row)">禁用</el-button>
          <el-button v-if="(scope.row.status*1) !==2 && (scope.row.status*1) ===1" type="text" size="small" @click="switchAccount(scope.row)">启用</el-button>
          <el-button type="text" size="small" @click="$router.push(`/account/setup/1`)">服务设置</el-button>
          <el-button type="text" size="small" @click="upPassword(scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <yc-pagination v-model="status.page" :total="status.total" :pageSize="status.pageSize" 
      layout="prev, pager, next"
      @handleCurrentChange="handleCurrentChange"></yc-pagination> 
    <!--重置密码弹框BEGIN-->
    <reset-password v-model="showResetPassword" :accountInfo="selAccount"></reset-password>
    <!--重置密码弹框END-->
  </yc-page>
</template>
<script>
import resetPassword from './reset.password.vue'
import AccountService from '@/services/account.service.js'
export default {
  data() {
    return {
      search: {
        condition: '',
        begindt: '',
        enddt: '',
        state: -1,
        serve: -1,
        type: -1,
        province: -1,
        city: -1,
        area: -1
      },
      status: {
        page: 1,
        pageSize: 20,
        total: 120
      },
      accountList: [],
      dropDownData: {
        state: [],
        service: [],
        type: []
      },
      showResetPassword: false,
      selAccount: {}
    }
  },
  mounted() {
    this.AccountService = new AccountService()
    this.getStateData() // 获取状态信息数据
    this.getServiceData() // 获取服务信息数据
    this.getTypeData() // 获取类型信息数据
    this.getListData() // 获取列表数据信息
  },
  methods: {
    // 获取账号列表信息
    async getListData() {
      let params = this.getSearchItem()
      let res = await this.AccountService.getAccountList(params)
      this.accountList = res.list
      this.status.total = res.total
    },
    // 获取页面搜索条件
    getSearchItem() {
      // TODO: 由于空值必须传入-1 或 '' 所以每次都传值
      let params = {}
      params.page = this.status.page
      params.pageSize = this.status.pageSize
      params.searchParam = this.search.condition
      params.startTime = this.search.begindt ? this.$bqUtils.dateFormat(this.search.begindt, 'yyyy-MM-dd') : ''
      params.endTime = this.search.begindt ? this.$bqUtils.dateFormat(this.search.enddt, 'yyyy-MM-dd') : ''
      params.status = this.search.state * 1
      params.type = this.search.serve * 1
      params.isParentType = this.search.type * 1
      params.provinceId = this.search.province * 1
      params.cityId = this.search.city * 1
      params.districtId = this.search.area * 1
      return params
    },
    // 获取状态信息
    async getStateData() {
      // TODO: 获取状态选项数据
      this.dropDownData.state = [
        {value: -1, label: '全部'},
        {value: 0, label: '开启中'},
        {value: 1, label: '禁用中'},
        {value: 2, label: '未开通服务'}]
    },
    // 获取服务数据
    async getServiceData() {
      this.dropDownData.service = [
        {value: -1, label: '全部'},
        {value: 2, label: '卖家'},
        {value: 3, label: '买家'},
        {value: 4, label: '云采运营后台'}]
    },
    // 获取账户类型数据
    async getTypeData() {
      this.dropDownData.type = [
        {value: -1, label: '全部'},
        {value: 1, label: '仅显示主账号'},
        {value: 2, label: '仅显示子账号'}]
    },
    // 当前页变化响应
    handleCurrentChange(val) {
      this.status.page = (val * 1)
      this.getListData()
    },
    // 页面搜索事件
    serchEvent() {
      this.status.page = 1
      this.getListData()
    },
    // 删除账户信息
    async delAccount(accountItem) {
      const h = this.$createElement
      let msgRsp = await this.$msgbox({
        title: '操作提示',
        message: h('div', null, [
          h('p', {style: 'font-size: 14px;'}, '你确定要删除该用户吗?'),
          h('p', {style: 'font-size: 14px;'}, '一旦删除将不可恢复')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
      if (msgRsp === 'confirm') {
        let res = await this.AccountService.delAccount(accountItem.userId)
        if (res === 'success') {
          this.getListData()
          this.$message({
            message: '账号删除成功',
            type: 'success'
          })
        }
      }
    },
    // 禁用或启用用户
    async switchAccount(accountItem) {
      const h = this.$createElement
      let msgRsp = null
      if ((accountItem.status * 1) === 0) {
        msgRsp = await this.$msgbox({
          title: '操作提示',
          message: h('div', null, [
            h('p', {style: 'font-size: 14px;'}, '你确定要禁用该用户吗?'),
            h('p', {style: 'font-size: 14px;'}, '一旦禁用该用户将不可以登录任何已开通服务')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
      } else {
        msgRsp = await this.$msgbox({
          title: '操作提示',
          message: h('div', null, [
            h('p', {style: 'font-size: 14px;'}, '你确定要启用该用户吗?'),
            h('p', {style: 'font-size: 14px;'}, '一旦启用该用户将可以登录任何已开通服务')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
      }
      if (msgRsp === 'confirm') {
        let params = {
          userId: accountItem.userId * 1,
          status: accountItem.status * 1
        }
        let res = await this.AccountService.switchAccount(params)
        this.$message({
          message: res.status === 0 ? '开启成功' : '禁用陈功',
          type: 'success'
        })
        accountItem.status = res.status
      }
    },
    // getStatusStr
    getStatusStr(statusid) {
      let str = '开启'
      let statusNumber = statusid * 1
      switch (statusNumber) {
        case 0:
          str = '开启'
          break
        case 1:
          str = '禁用'
          break
        case 2:
          str = '未开通服务'
          break
      }
      return str
    },
    // 修改密码弹窗
    upPassword(accountItem) {
      this.selAccount = accountItem
      this.showResetPassword = true
    }
  },
  components: {
    resetPassword
  }
}
</script>
<style lang="scss">
  .yc-account-list {
    &__serve {
      text-align: left;
      > span {
        display: block;
      }
    }
    .account-tp{
      padding: 3px;
      border-radius: 2px;
      background-color: #FF4F4F;
      &[atype='1'] {
        background-color: #FF4F4F;
      }
      &[atype='2'] {
        background-color: #64B7F6;
      }
    }
  }
</style>
