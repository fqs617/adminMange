<template>
  <el-card class="yc-account__dialogcard yc-account__selmerchant">
    <yc-page-header>
      <el-form :inline="true" :model="search" label-width="100px">
        <el-form-item label="按条件筛选：" >
          <el-input class="yc-long-ipt" placeholder="输入专题ID／专题名称" v-model="search.parameter"></el-input>
        </el-form-item>
        <el-form-item>
          <yc-regions :account="regionAccount" @getCurRegion="getCurRegion" class="regions-model"></yc-regions>
        </el-form-item>
        <el-form-item>
          <yc-industry v-model="search.industryId" class="industry-model"></yc-industry>
        </el-form-item>
        <el-form-item>
          <el-button @click="getTopicList">搜索</el-button>
        </el-form-item>
      </el-form>
    </yc-page-header>
    <el-table :data="info.list" border stripe ref="multipleTable" height="250">
      <el-table-column align="center" width="100" label="选择">
        <template scope="scope">
          <el-radio v-if="scope.row.topicId != topicId" class="radio" v-model="topicId" :label="scope.row.topicId"><i class="radio-sel">选择</i></el-radio>
          <el-radio v-else class="radio" v-model="topicId" :label="scope.row.topicId"><i class="radio-sel">已选</i></el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="topicId" label="专题ID" align="center" width="80"></el-table-column>
      <el-table-column prop="topicName" label="专题名称" align="center"></el-table-column>
      <el-table-column prop="region" label="所属城市" align="center"></el-table-column>
      <el-table-column prop="industryName" label="所属行业" align="center"></el-table-column>
    </el-table>
    <yc-pagination layout="prev, pager, next" @handleCurrentChange="handleCurrentChange" :pageSize="search.size" :total="total"></yc-pagination>
  </el-card>
</template>
<script>
import SelectLinkService from '@/services/select.link.service'

export default {
  data() {
    return {
      search: {
        parameter: '',
        provinceId: '',
        cityId: '',
        industryId: '',
        page: 1,
        size: 10
      },
      topicId: '',
      info: {},
      total: 0,
      regionAccount: 2
    }
  },
  props: {
    selectData: {}
  },
  mounted() {
    this.SelectLinkService = new SelectLinkService()
    this.getTopicList()
    if (this.selectData && this.selectData.linkValue && this.selectData.linkType === 1) {
      let linkValue = JSON.parse(this.selectData.linkValue)
      this.topicId = linkValue.templateId
    }
  },
  methods: {
    getCurRegion (val) {
      this.search.provinceId = val.provinceId
      this.search.cityId = val.cityId
    },
    handleCurrentChange(page) {
      this.search.page = page
      this.getTopicList()
    },
    async getTopicList() {
      let param = this.search
      let res = await this.SelectLinkService.getTopicList(param)
      this.info = res
      this.total = this.info.total
      this.info.list.map(function(item) {
        item.topicId = item.topicId.toString()
      })
    }
  }
}
</script>
<style lang="scss">
  .yc-account__selmerchant {
    .el-card__body {
      padding: 0;
    }
    .isSel {
      color: #999999;
    }
    .regions-model{
      .el-input__inner {
        width: 100px;
      }
    }
    .industry-model{
      .el-input__inner {
        width: 110px;
      }
    }
    .radio-sel {
      color: #333;
      font-size: 12px;
    }
    .el-table__body-wrapper {
      overflow: scroll;
    }
  }
</style>
