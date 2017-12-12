
<template>
  <yc-page class="yc-recommend">
    <template slot="buttons">
      <el-button @click="$router.push(`/recommend/default/0`)">全局默认配置</el-button>
      <el-button type="info" @click="$router.push(`/recommend/add/1`)">新增推荐商品配置</el-button>
    </template>
    <yc-page-header>
      <el-form :inline="true" :model="search">
          <el-form-item label="所属地区:" class="region-model">
            <yc-regions :account="regionAccount" :getRegions="{'provinceId': this.search.provinceId, 'cityId': this.search.cityId}" @getCurRegion="getCurRegion"></yc-regions>
          </el-form-item>
        <el-form-item label="所属行业:" class="region-model">
          <yc-industry v-model="search.industryId"></yc-industry>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="search.isShow"  placeholder="全部">
              <el-option v-for="item in status_list" :key="item.status" :label="item.name" :value="item.status"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间:">
          <el-date-picker  type="date" placeholder="开始日期" v-model="search.createStartTime" :editable="false"></el-date-picker>
          <el-date-picker  type="date" placeholder="结束日期" v-model="search.createEndTime" :editable="false"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchList()">搜索</el-button>
        </el-form-item>
      </el-form>
    </yc-page-header>
    <el-table :data="listData" border stripe style="width: 100%">
      <el-table-column prop="region" label="所属地区" align="center" min-width="150"></el-table-column>
      <el-table-column prop="industryName" label="所属行业" align="center" width="150"></el-table-column>
      <el-table-column prop="skuCount" label="推荐SKU数量" align="center" width="150"></el-table-column>
      <el-table-column prop="isShowName" label="状态" align="center" width="100"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" width="200"></el-table-column>
      <el-table-column prop="configId" label="操作" align="center" min-width="200" fixed="right">
        <template scope="scope">
          <el-button type="text" size="small" @click="$router.push('/recommend/add/2/' + scope.row.configId)">编辑</el-button>
          <el-button type="text" size="small" @click="$router.push(`/recommend/detail/` + scope.row.configId)">查看商品</el-button>
          <el-button v-if="scope.row.status == 0" type="text" size="small" @click="operation(scope.row, 1)">关闭</el-button>
          <el-button v-if="scope.row.status == 1" type="text" size="small" @click="operation(scope.row, 1)">开启</el-button>
          <el-button type="text" size="small" @click="operation(scope.row, 2)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <yc-pagination v-model="page" @handleCurrentChange="handleCurrentChange" :pageSize="size" :total="total"></yc-pagination>
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
        <el-button type="info" size="large" @click="postSure">确定</el-button>
      </yc-card-footer>
    </el-dialog>
  </yc-page>
</template>
<script>
import RecommendService from '@/services/recommend.service'
export default {
  data() {
    return {
      search: {
        provinceId: '',
        cityId: '',
        industryId: '',
        isShow: '',
        createStartTime: '',
        createEndTime: '',
        page: 1,
        size: 20
      },
      dialogTitle: '',
      dialogContent: '',
      linkDialogVisible: false,
      statusTag: '',
      controlTag: '',
      page1: 1,
      listData: [],
      status_list: [
        { name: '全部', status: -1 },
        { name: '开启中', status: 0 },
        { name: '关闭中', status: 1 }
      ],
      page: 1,
      size: 20,
      total: 0,
      regionAccount: 2
    }
  },
  created() {
    this.RecommendService = new RecommendService()
    this.init()
  },
  watch: {
    '$route'(to) {
      if (to.path.substr(0, 10) !== '/recommend') {
        this.search = {
          provinceId: null,
          cityId: '',
          industryId: '',
          isShow: '',
          createStartTime: '',
          createEndTime: '',
          page: 1,
          size: 20
        }
      }
      if (to.path.substr(0, 17) === '/recommend/detail' || to.path.substr(0, 14) === '/recommend/add') {
        return
      }
      this.init()
    }
  },
  methods: {
    getCurRegion(val) {
      this.search.provinceId = val.provinceId
      this.search.cityId = val.cityId
    },
    searchList() {
      this.search.page = 1
      this.init(this.search)
    },
    async init() {
      let params = this.search
      params.page = this.page
      if (params.createStartTime) {
        params.createStartTime = this.$bqUtils.dateFormat(new Date(params.createStartTime), 'yyyy-MM-dd')
      }
      if (params.createEndTime) {
        params.createEndTime = this.$bqUtils.dateFormat(new Date(params.createEndTime), 'yyyy-MM-dd')
      }
      let res = await this.RecommendService.getRecommendList(params)
      this.listData = res.list
      this.total = res.total
      for (let item of this.listData) {
        item.isShowName = this.getStatus(item.status)
      }
    },
    getStatus(type) {
      switch (type) {
        case -1:
          return '全部'
        case 1:
          return '关闭中'
        case 0:
          return '开启中'
      }
    },
    operation (tag, flag) {
      this.controlTag = tag
      this.linkDialogVisible = true
      if (flag === 1) {
        if (tag.status === 0) {
          this.statusTag = 1
          this.dialogTitle = '你确定要关闭该推荐商品配置吗？'
          this.dialogContent = '一旦关闭，该地区行业的买家将不会再显示该配置文件中的SKU'
        }
        if (tag.status === 1) {
          this.statusTag = 0
          this.dialogTitle = '你确定要开启该推荐商品配置吗？'
          this.dialogContent = '一旦开启，该地区行业的买家将再显示该配置文件中的SKU。'
        }
      } else if (flag === 2) {
        this.statusTag = 3
        this.dialogTitle = '你确定要删除该推荐商品配置吗？'
        this.dialogContent = '一旦删除，该地区行业的买家将不会再显示该配置文件中的SKU,并且不会再恢复。'
      }
    },
    handleClose() {
      this.linkDialogVisible = false
    },
    handleCurrentChange(page) {
      this.page = page
      this.init()
    },
    async postSure() {
      this.linkDialogVisible = false
      if (this.statusTag === 3) {
        //  删除操作
        await this.RecommendService.delAccount({configId: this.controlTag.configId})
      } else {
        let params = {
          configId: this.controlTag.configId,
          operatorType: this.statusTag
        }
        await this.RecommendService.updateRecommendStatus(params)
      }
      this.init()
    }
  }
}
</script>
<style lang="scss">
.yc-recommend {
  .el-form-item__label {
    padding-right: 8px;
  }
  .el-dialog {
    &__body {
      .dialog-title {
        padding-left: 30px;
        font-size: 14px;
        height: 14px;
        margin-bottom: 20px;
        color: #333;
      }
      p {
        padding-left: 30px;
        font-size: 14px;
        height: 14px;
        line-height: 24px;
        margin-bottom: 20px;
        color: #333;
      }
    }
  }
  .region-model {
    .el-input {
      width: 110px;
    }
  }
  .el-form-item__content{
    .el-input{
      width: 120px;
    }
  }
}
</style>
