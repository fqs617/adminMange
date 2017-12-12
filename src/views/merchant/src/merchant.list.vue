<template>
  <yc-page class="merchant-list">
    <template slot="buttons">
      <!-- <el-button>导出数据</el-button> -->
      <el-button type="info" @click="$router.push(`/merchant/add`)">新增商户</el-button>
    </template>
    <yc-page-header>
      <el-form :inline="true" :model="search">
        <el-form-item label="按条件筛选:" class="choose">
          <el-input v-model="search.parameter" placeholder="输入用户ID／商户名称／管理员账号"></el-input>
        </el-form-item>
        <el-form-item label="开通时间:" class="choose-time">
          <el-date-picker type="date" placeholder="开始时间" v-model="search.startTime"></el-date-picker>
          <el-date-picker type="date" placeholder="结束时间" v-model="search.endTime" ></el-date-picker>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="search.status" placeholder="全部">
            <el-option v-for="item in statusList" :key="item.status" :label="item.name" :value="item.status"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属行业:">
          <el-select v-model="search.industryId" placeholder="全部">
            <el-option v-for="item in typeLists" :key="item.industryId" :label="item.industryName" :value="item.industryId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商户类型:">
          <el-select v-model="search.type" placeholder="全部">
            <el-option v-for="item in merList" :key="item.type" :label="item.name" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属地:">
          <el-select v-model="search.provinceId" placeholder="选择省">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
          <el-select v-model="search.cityId" placeholder="选择市">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
          <el-select v-model="search.districtId" placeholder="选择区">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getMerchantList">搜索</el-button>
        </el-form-item>
      </el-form>
    </yc-page-header>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="storeId" label="商户ID" align="center"></el-table-column>
      <el-table-column prop="storeName" label="商户名称" align="center"></el-table-column>
      <el-table-column prop="industryIdName" label="所属行业" align="center"></el-table-column>
      <el-table-column prop="typeName" label="商户类型" align="center"></el-table-column>
      <el-table-column prop="userName" label="管理员账号" align="center"></el-table-column>
      <el-table-column prop="regionName" label="商户归属地" align="center"></el-table-column>
      <el-table-column prop="createTimeFormat" label="开通时间" align="center"></el-table-column>
      <el-table-column prop="statusName" label="状态" align="center"></el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template scope="scope">
          <el-button v-if="tableData[scope.$index].status != 3" type="text" size="small" @click="checkDetail(tableData[scope.$index].storeId)">查看详情</el-button>
          <el-button v-if="tableData[scope.$index].status == 0" type="text" size="small" @click="operation(tableData[scope.$index])">关闭</el-button>
          <el-button v-if="tableData[scope.$index].status == 1" type="text" size="small" @click="operation(tableData[scope.$index])">开启</el-button>
          <el-button v-if="tableData[scope.$index].status == 3" type="text" size="small" @click="completeInfo(tableData[scope.$index].storeId)">完善信息</el-button>
          <el-button v-if="(tableData[scope.$index].type == 2 || tableData[scope.$index].type == 3) && tableData[scope.$index].status != 3" type="text" size="small" @click="sellerSet(tableData[scope.$index].storeId)">卖家设置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <yc-pagination v-model="page1"></yc-pagination>
    <el-dialog
      custom-class="yc-d"
      title="操作提示"
      :visible.sync="linkDialogVisible"
      size="tiny"
      :modal-append-to-body = "false"
      :before-close="handleClose">
      <h1 class="dialog-title">{{ dialogTitle }}</h1>
      <p class="dialog-content">{{ dialogContent }}</p>
      <yc-card-footer slot="footer" class="dialog-footer">
        <el-button size="large" @click="handleClose">取消</el-button>
        <el-button type="info" size="large" @click="postControl">确定</el-button>
      </yc-card-footer>
    </el-dialog>
  </yc-page>
</template>
<script>
import MerchantService from '@/services/merchant.service'

export default {
  data() {
    return {
      search: {
        parameter: '',
        startTime: '',
        endTime: '',
        status: -1,
        industryId: '',
        type: -1,
        provinceId: '',
        cityId: '',
        districtId: ''
      },
      dialogTitle: '',
      dialogContent: '',
      linkDialogVisible: false,
      page1: 1,
      tableData: [],
      controlTag: {},
      typeLists: [],
      statusList: [
        { name: '全部', status: -1 },
        { name: '开启中', status: 0 },
        { name: '关闭中', status: 1 },
        { name: '待完善信息', status: 3 }
      ],
      merList: [
        { name: '全部', type: -1 },
        { name: '买家', type: 1 },
        { name: '卖家', type: 2 },
        { name: '买家加卖家', type: 3 }
      ]
    }
  },
  mounted () {
    this.MerchantService = new MerchantService()
    this.getMerchantList()
    this.getBnsTypeList()
  },
  methods: {
    // 获取行业列表
    async getBnsTypeList() {
      let res = await this.MerchantService.getBnsTypeList({})
      this.typeLists = res
    },
    // 获取、搜索列表数据
    async getMerchantList() {
      let params = this.search
      if (params.startTime) {
        params.startTime = this.$bqUtils.dateFormat(this.search.startTime, 'yyyy-MM-dd')
      }
      if (params.endTime) {
        params.endTime = this.$bqUtils.dateFormat(this.search.endTime, 'yyyy-MM-dd')
      }
      let res = await this.MerchantService.getMerchantList(params)
      this.tableData = res.list
      for (let item of this.tableData) {
        for (let it of this.merList) {
          if (item.type === it.type) {
            item.typeName = it.name
          }
        }
        for (let st of this.statusList) {
          if (item.status === st.status) {
            item.statusName = st.name
          }
        }
      }
    },
    async postControl() {
      this.linkDialogVisible = false
      let params = {
        storeId: this.controlTag.storeId,
        status: this.controlTag.status
      }
      await this.MerchantService.postControl(params)
      this.getMerchantList()
    },
    checkDetail(storeId) {
      this.$router.push('/merchant/detail/' + storeId)
    },
    handleClose() {
      this.linkDialogVisible = false
    },
    operation(tag) {
      this.controlTag = tag
      this.linkDialogVisible = true
      if (tag.status === 0) {
        this.dialogTitle = '你确定要关闭该商户吗？'
        this.dialogContent = '一旦关闭，该商户的账户将无法继续登录。'
      }
      if (tag.status === 1) {
        this.dialogTitle = '你确定要开启该商户吗？'
        this.dialogContent = '一旦开启，该商户的账户将可以继续登录。'
      }
    },
    completeInfo(storeId) {
      this.$router.push('/merchant/add/step2/' + storeId)
    },
    sellerSet(storeId) {
      this.$router.push('/merchant/add/step5/' + storeId)
    }
  }
}
</script>
<style lang="scss">
  .merchant-list {
    .yc-page-search .el-form .el-input__inner {
      font-size: 12px;
      width: 80px;
      border-radius: 1px;
    }
    .el-input__icon + .el-input__inner {
      padding: 0;
      padding-left: 10px;
    }
    .yc-page-search .el-form .choose .el-input__inner {
      width: 222px;
      text-align: center;
    }
    .yc-page-search .el-form .choose-time .el-input__inner {
      width: 110px;
    }
    .el-date-editor.el-input {
      width: 110px;
    }
    .el-dialog--tiny {
      min-width: 380px;
    }
    .dialog-title {
      font-size: 14px;
      margin: 20px 0 20px 35px;
    }
    .dialog-content {
      font-size: 14px;
      margin: 0 0 20px 35px;
    }
  }
</style>
