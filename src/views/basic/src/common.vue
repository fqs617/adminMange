<template>
  <yc-page class="yc-page-seller">
    <template slot="buttons">
      <el-button type="info" @click="transPage(0)" >新增云采{{seller?'卖家':'后台'}}角色</el-button>
    </template>
    <yc-page-header>
      <el-form :inline="true">
        <el-form-item label="按条件筛选:" class="search-user">
          <el-input v-model="search.parameter" placeholder="输入角色ID/角色名称"></el-input>
        </el-form-item>
        <el-form-item label="创建时间:">
          <el-col :span="11" class="col-startdate">
            <el-date-picker type="date" placeholder="开始时间" v-model="search.startTime"></el-date-picker>
          </el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="结束时间" v-model="search.endTime"></el-date-picker>
          </el-col>
        </el-form-item>
      <el-form-item>
        <el-button @click="onSearch">搜索</el-button>
      </el-form-item>
      </el-form>
    </yc-page-header>
    <el-table
    :data="roleList"
    border
    stripe
    style="width: 100%"
    >
    <el-table-column
      prop="roleId"
      :label="seller? '云采卖家角色ID':'云采后台角色ID'"
      align="center"
      width="200"
    >
    </el-table-column>
    <el-table-column
      prop="roleName"
      :label="seller?'云采卖家角色名称':'云采后台角色名称'"
      align="center"
      width="200"
    >
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
      align="center"
    >
    </el-table-column>
    <el-table-column
      label="操作"
      align="center"
    >
    <template scope="scope">
      <el-button type="text" size="small" @click="transPage(1, scope.row)">编辑</el-button>
      <el-button type="text" size="small" @click="transPage(2, scope.row)">查看权限</el-button>
    </template>
    </el-table-column>
    </el-table>
    <yc-pagination v-model="page" @handleCurrentChange="handleCurrentChange"></yc-pagination>
  </yc-page>
</template>
<script>
import BasicSettingListService from '@/services/basic.setting.list.service'
export default {
  name: 'common',
  props: {
    seller: {
      type: Boolean,
      default: true
    },
    defaultSearch: {}
  },
  data() {
    return {
      roleList: [],
      search: {},
      total: null,
      page: 1
    }
  },
  methods: {
    handleCurrentChange(page) {
      this.page = page
      this.getRoleList()
    },
    transPage(code, row) {
      let url
      if (code === 0) { // 新增
        url = '/basic/add/true'
      } else if (code === 1) { // edit
        url = '/basic/edit/true/' + row.roleId
      } else if (code === 2) {
        this.$router.push('/basic/show/' + row.roleId + '/' + 0)
      }
      if (code === 0 || code === 1) {
        url += (this.seller === true) ? '/0' : ''
      }
      this.$router.push(url)
    },
    initPage() {
      this.BasicSettingListService = new BasicSettingListService()
      let page = this.search.page
      if (this.page !== page) {
        this.page = page
      } else {
        this.getRoleList()
      }
    },
    onSearch() {
      if (this.page !== 1) {
        this.page = 1
      } else {
        this.getRoleList()
      }
      this.search.page = this.page
    },
    async getRoleList() {
      let params = this.search
      let roleType = this.seller === true ? 3 : 4
      params.roleType = roleType
      params.page = this.page
      if (params.startTime) {
        params.startTime = this.$bqUtils.dateFormat(new Date(params.startTime), 'yyyy-MM-dd hh:mm:ss')
      }
      if (params.endTime) {
        params.endTime = this.$bqUtils.dateFormat(new Date(params.endTime), 'yyyy-MM-dd hh:mm:ss')
      }
      this.$emit('updateSearch', params)
      let res = await this.BasicSettingListService.getRoleList(params)
      this.roleList = res.roleList
      this.total = res.total
    },
    initParams() {
      this.search = this.defaultSearch
    }
  },
  activated() {
    this.initPage()
  },
  mounted() {
    this.initParams()
  }
}
</script>
<style lang="scss">
@import 'scss/variables.scss';
.yc-page-seller {
  font-size: 12px;
  line-height: 12px;
  .el-form  {
    .el-date-editor.el-input {
      width: 125px;
    }
    .col-startdate {
      margin-right: 20px;
    }
    input {
      text-align: center;
      font-size: 12px;
      height: 26px;
      line-height: 26px;
    }
  }
  .search-user {
    .el-form-item__content {
      width: 224px;
    }
  }
  .el-form-item {
    margin-right: 30px;
    margin-bottom: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
