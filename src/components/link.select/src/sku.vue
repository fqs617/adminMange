<template>
  <el-card class="yc-account__dialogcard yc-sku">
  <div v-loading="loadingTable">
    <yc-page-header>
      <el-form :inline="true" :model="search" label-width="100px">
        <el-form-item label="按条件筛选：">
          <el-input class="yc-long-ipt" placeholder="请输入SKU码/产品名称" long noradius v-model="search.parameter"></el-input>
        </el-form-item>
        <el-form-item class="cate-model">
          <yc-cate-select @cateSelectFun="cateSelectFun"></yc-cate-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getSkuList">搜索</el-button>
        </el-form-item>
      </el-form>
    </yc-page-header>
      <el-table border stripe :data="info.list" ref="multipleTable" height="250" width="100%">
        <el-table-column align="center" width="100" label="选择">
          <template scope="scope">
            <el-radio v-if="info.list[scope.$index].sku != sku" class="radio" v-model="sku" :label="info.list[scope.$index].sku"><i class="radio-sel">选择</i></el-radio>
            <el-radio v-else class="radio" v-model="sku" :label="info.list[scope.$index].sku"><i class="radio-sel">已选</i></el-radio>
          </template>
        </el-table-column>
        <el-table-column label="产品图片" align="center" width="146">
          <template scope="scope">
            <img class="skuimg" :src="info.list[scope.$index].defaultImage || noimg"/>
          </template>
        </el-table-column>
        <el-table-column prop="goodsName" label="产品名称" align="center" width="300"></el-table-column>
        <el-table-column prop="sku" label="产品条码" align="center" width="200"></el-table-column>
        <el-table-column prop="specunit" label="规格 / 单位" align="center" width="150"></el-table-column>
      </el-table>
      <yc-pagination layout="prev, pager, next" @handleCurrentChange="handleCurrentChange" :pageSize="search.size" :total="total"></yc-pagination>
    </div>
  </el-card>
</template>
<script>
import CommonService from '@/services/common.service'

export default {
  name: 'sku',
  data() {
    return {
      search: {
        parameter: '',
        cateId1: '',
        cateId2: '',
        page: 1,
        size: 10
      },
      sku: '',
      total: 0,
      info: {},
      noimg: 'http://ogd5wcvme.bkt.clouddn.com/no-img.png',
      loadingTable: false
    }
  },
  props: {
    selectData: {}
  },
  mounted() {
    this.CommonService = new CommonService()
    this.getSkuList()
  },
  methods: {
    handleCurrentChange(page) {
      this.search.page = page
      this.getSkuList()
    },
    async getSkuList() {
      this.loadingTable = true
      let param = this.search
      try {
        let res = await this.CommonService.getSkuList(param)
        this.info = res
        this.total = this.info.total
        this.info.list.map(function(item) {
          item.sku = item.sku.toString()
          item.specunit = item.spec + ' / ' + item.unit
        })
        if (this.selectData && this.selectData.linkValue && this.selectData.linkType === 3) {
          let linkValue = JSON.parse(this.selectData.linkValue)
          this.sku = linkValue.sku
        }
      } finally {
        this.loadingTable = false
      }
    },
    cateSelectFun(cate1, cate2) {
      this.search.cateId1 = cate1
      this.search.cateId2 = cate2
    }
  }
}
</script>
<style lang="scss">
  .yc-sku {
    .el-card__body {
      padding: 0;
    }
    .skuimg {
      margin-top: 10px;
      width: 90px;
      height: 90px;
    }
    .radio-sel {
      color: #333;
      font-size: 12px;
    }
    .el-table__body-wrapper {
      overflow: scroll;
    }
    .cate-model{
      .el-input__inner {
        width: 120px;
      }
    }
  }
</style>
