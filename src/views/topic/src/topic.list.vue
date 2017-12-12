
<template>
  <yc-page class="yc-topic-list">
    <template slot="buttons">
      <el-button type="info" @click="onAdd">新增专题</el-button>
    </template>
    <yc-page-header>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="按条件筛选：" class="parameter">
          <el-input v-model="search.parameter" placeholder="输入专题ID／专题名称"></el-input>
        </el-form-item>
        <el-form-item label="所属地区：" class="region-model">
          <yc-regions :account="regionAccount" :getRegions="{'provinceId': this.search.provinceId, 'cityId': this.search.cityId}" @getCurRegion="getCurRegion"></yc-regions>
        </el-form-item>
      <el-form-item label="所属行业：" class="region-model">
        <yc-industry v-model="search.industryId"></yc-industry>
      </el-form-item>
        <el-form-item label="创建时间：" class="sel-time">
          <el-date-picker type="date" placeholder="开始时间" v-model="search.createStartTime" :editable="false"></el-date-picker>
          <el-date-picker type="date" placeholder="结束时间" v-model="search.createEndTime" :editable="false"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchList">搜索</el-button>
        </el-form-item>
      </el-form>
    </yc-page-header>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="topicId" label="专题ID" align="center" width="100"></el-table-column>
      <el-table-column prop="topicName" label="专题名称" align="center" min-width="200"></el-table-column>
      <el-table-column prop="region" label="所属地区" align="center" width="120"></el-table-column>
      <el-table-column prop="industryName" label="所属行业" align="center" width="100"></el-table-column>
      <el-table-column prop="blockSkuTotal" label="区块数 / SKU数" align="center" width="150"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" width="150"></el-table-column>
      <el-table-column label="操作" align="center" width="250" fixed="right">
        <template scope="scope">
          <el-button type="text" size="small" @click="onEdit(scope.row.topicId)">编辑</el-button>
          <el-button type="text" size="small" @click="$router.push(`/topic/look/` + scope.row.topicId)">查看商品</el-button>
          <el-button class="yc-copy-link" type="text" size="small" @click="copyLink(scope.row.topicId)">
            复制链接
          </el-button>
          <el-button type="text" size="small" @click="TopicDel(scope.row.topicId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <yc-pagination v-model="page" @handleCurrentChange="handleCurrentChange" :pageSize="size" :total="total"></yc-pagination>
    <el-dialog
      custom-class="yc-d"
      title="提示"
      :visible.sync="linkDialogVisible"
      size="tiny"
      :modal-append-to-body = "false"
      :before-close="handleClose">
      <span>{{ warnInfo }}</span>
      <yc-card-footer slot="footer" class="dialog-footer">
        <el-button size="large" @click="linkDialogVisible = false">取消</el-button>
        <el-button type="info" size="large" @click="postSure()">确定</el-button>
      </yc-card-footer>
    </el-dialog>
  </yc-page>
</template>
<script>
import TopicService from '@/services/topic.service'
import Clipboard from 'clipboard'
export default {
  data() {
    return {
      search: {
        provinceId: '',
        cityId: '',
        parameter: '',
        industryId: '',
        createStartTime: '',
        createEndTime: '',
        page: 1,
        size: 20
      },
      tableData: [],
      total: 0,
      page: 1,
      size: 20,
      regionAccount: 2,
      linkDialogVisible: false,
      warnInfo: '',
      banId: ''
    }
  },
  created() {
    this.TopicService = new TopicService()
    this.init()
  },
  watch: {
    '$route'(to) {
      if (to.path.substr(0, 6) !== '/topic') {
        this.search = {
          provinceId: null,
          cityId: '',
          parameter: '',
          industryId: '',
          createStartTime: '',
          createEndTime: '',
          page: 1,
          size: 20
        }
      }
      if (to.path.substr(0, 11) === '/topic/look') {
        return
      }
      this.init()
    }
  },
  methods: {
    async init() {
      let params = this.search
      if (params.createStartTime) {
        params.createStartTime = this.$bqUtils.dateFormat(new Date(params.createStartTime), 'yyyy-MM-dd')
      }
      if (params.createEndTime) {
        params.createEndTime = this.$bqUtils.dateFormat(new Date(params.createEndTime), 'yyyy-MM-dd')
      }
      params.page = this.page
      let res = await this.TopicService.getTopicList(params)
      res.list.map(function(item) {
        item.blockSkuTotal = item.blockCount + ' / ' + item.skuTotalCount
        return item
      })
      this.tableData = res.list
      this.total = res.total
    },
    handleCurrentChange(page) {
      this.page = page
      this.init()
    },
    onAdd() {
      $('a').attr('href', '/template').attr('target', '_blank')[0].click()
    },
    onEdit(topicId) {
      $('a').attr('href', '/template/' + topicId).attr('target', '_blank')[0].click()
    },
    getCurRegion(val) {
      this.search.provinceId = val.provinceId
      this.search.cityId = val.cityId
    },
    searchList() {
      this.search.page = 1
      this.init()
    },
    copyLink(topidId) {
      let clipboard = new Clipboard('.yc-copy-link', {
        text: () => {
          return 'http://m.yuncai.bqmart.cn/template/' + topidId
        }
      })
      clipboard.on('success', () => {
        this.$message('复制成功')
      })
    },
    TopicDel(topicId) {
      this.banId = topicId
      this.linkDialogVisible = true
      this.warnInfo = '你确定要删除该专题吗？一旦删除，该专题在买家端将不会被访问到，并且不会再恢复。'
    },
    async postSure() {
      this.linkDialogVisible = false
      let params = {
        topicId: this.banId
      }
      await this.TopicService.delTopic(params)
      this.init()
    },
    handleClose() {
      this.linkDialogVisible = false
    }
  }
}
</script>
<style lang="scss">
.yc-topic-list {
  .el-form-item__label {
    padding-right: 0;
  }
  .parameter {
    .el-input__inner {
      width: 224px;
    }
  }
  .region-model {
    .el-input__inner {
      width: 110px;
    }
  }
  .sel-time {
    .el-input {
      width: 120px;
    }
    .el-input__inner {
      width: 120px;
    }
  }
  .el-dialog {
    &__body {
      span {
        font-size: 14px;
        height: 14px;
        line-height: 24px;
        margin-bottom: 20px;
        color: #333;
      }
    }
  }
}
</style>
