
<template>
  <yc-page class="yc-page-seller">
    <template slot="buttons">
      <el-button type="info" @click="toAddPage" >新增云采{{seller?'卖家':'后台'}}角色</el-button>
    </template>
    <yc-page-header>
      <el-form :inline="true" :model="search">
        <el-form-item label="按条件筛选:" class="search-user">
          <el-input v-model="search.user" placeholder="输入角色ID/角色名称"></el-input>
        </el-form-item>
        <el-form-item label="创建时间:">
          <el-col :span="11" class="col-startdate">
            <el-date-picker type="date" placeholder="开始时间" v-model="search.startDate"></el-date-picker>
          </el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="结束时间" v-model="search.endDate"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </yc-page-header>
    <el-table
    :data="tableData"
    border
    stripe
    style="width: 100%"
    >
    <el-table-column
      prop="rid"
      :label="seller? '云采卖家角色ID':'云采后台角色ID'"
      align="center"
      width="200"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      :label="seller?'云采卖家角色名称':'云采后台角色名称'"
      align="center"
      width="200"
    >
    </el-table-column>
    <el-table-column
      prop="createDate"
      label="创建时间"
      align="center"
    >
    </el-table-column>
    <el-table-column
      label="操作"
      align="center"
    >
    <template scope="scope">
      <el-button type="text" size="small" @click="edit(scope.$index, scope.row)">编辑</el-button>
      <el-button type="text" size="small" @click="showPower(scope.$index, scope.row)">查看权限</el-button>
    </template>
    </el-table-column>
    </el-table>
    <yc-pagination v-model="page1"></yc-pagination>
  </yc-page>
</template>
<script>
export default {
  data() {
    return {
      seller: false,
      page1: 1,
      search: {
        user: null,
        startDate: null
      },
      tableData: [{
        rid: '103',
        name: '角色名称',
        createDate: '2017-02-01'
      }, {
        rid: '104',
        name: '角色名称2',
        createDate: '2017-03-01'
      }, {
        rid: '105',
        name: '角色名称3',
        createDate: '2017-04-01'
      }]
    }
  },
  methods: {
    search() {

    },
    edit(index, row) {
      console.log(index, row)
      let url = '/basic/edit/true' + '/' + row.rid
      if (this.seller) {
        url += '/' + this.$route.params.type
      }
      this.$router.push(url)
    },
    showPower(index, row) {
      console.log(index, row)
      this.$router.push('/basic/show/' + row.rid + '/' + this.$route.params.type)
    },
    toAddPage() {
      let url = '/basic/add/true'
      if (this.seller) {
        url += '/' + this.$route.params.type
      }
      this.$router.push(url)
    },
    initPage() {
      this.seller = this.$route.params.type === '0'
    }
  },
  mounted() {
    this.initPage()
  },
  watch: {
    '$route': 'initPage'
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
      width: 110px;
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
