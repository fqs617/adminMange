<template>
  <yc-page class="yc-recommendadd">
    <el-card>
      <el-form class="yc-form yc-recommendadd-content" ref="form"  label-width="100px">
        <el-form-item label="所属地区:" class="txtitem">
          {{ skuDataList.region }}
        </el-form-item>
        <el-form-item label="所属行业:" class="txtitem">
          {{ skuDataList.industryName }}
        </el-form-item>
        <el-form-item label="已选择SKU:" class="txtitem">
          {{ skuDataList.skuCount }}
        </el-form-item>
      </el-form>
      <div>
        <el-table border :data="skuDataList.goodsList" stripe>
          <el-table-column prop="defaultImage" label="SKU图片" align="center" width="150">
            <template scope="scope">
              <img class="skuimg" :src="scope.row.defaultImage || noimg"/>
            </template>
          </el-table-column>
          <el-table-column prop="sku" label="SKU条码" align="center" width="180"></el-table-column>
          <el-table-column prop="goodsName" label="SKU名称" align="center" min-width="200"></el-table-column>
          <el-table-column prop="spec" label="规格" align="center" width="80"></el-table-column>
          <el-table-column prop="unit" label="单位" align="center" width="80"></el-table-column>
          <el-table-column prop="salesCount" label="总销售数量" align="center" width="130"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </yc-page>
</template>
<script>
import RecommendService from '@/services/recommend.service.js'
export default {
  data() {
    return {
      skuDataList: [],
      noimg: 'http://ogd5wcvme.bkt.clouddn.com/no-img.png'
    }
  },
  created() {
    this.RecommendService = new RecommendService()
    this.init()
  },
  methods: {
    async init() {
      let param = {
        configId: this.$route.params.id
      }
      let res = await this.RecommendService.lookRecommendList(param)
      this.skuDataList = res
    }
  }
}
</script>
<style lang="scss">
  .yc-recommendadd {
    &-content.el-form {
      .txtitem {
        .el-form-item__content {
          line-height: 38px;
        }
      }
    }
    .skuimg{
      display: block;
      margin: 5px auto;
      width: 90px;
      height: 90px;
      text-align: center;
      vertical-align: middle;
    }
  }
</style>
