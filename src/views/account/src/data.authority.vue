<template>
  <el-tabs type="border-card">
    <el-tab-pane label="区域数据">
      <el-form class="yc-form " label-width="100px">
        <el-form-item label="已选地区">
          <el-tag v-for="(item, index) in selAreaArray" 
            :key="index"
            class="yc-tag-default">{{item.txt}}</el-tag>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="商户数据">
      <el-table :data="selStor" border stripe>
        <el-table-column prop="storeId" label="商户ID" align="center" width="80"></el-table-column>
        <el-table-column prop="storeName" label="商户名称" align="center"></el-table-column>
        <el-table-column prop="homeLocation" label="商户归属地" align="center"></el-table-column>
        <el-table-column prop="industryName" label="所属行业" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template scope="scope">
            <span v-if="scope.row.status*1 === 0">开启</span>
            <span v-if="scope.row.status*1 === 1">关闭</span>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="分类数据">
      <el-form class="yc-form " label-width="100px">
        <el-form-item label="已选分类">
          <el-tag v-for="(item, index) in selCateArray" 
            :key="index"
            class="yc-tag-default">{{item.txt}}</el-tag>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="行业数据">
      <el-form class="yc-form " label-width="100px">
        <el-form-item label="已选行业">
          <el-tag v-for="(item, index) in selIndustryArray" 
            :key="index"
            class="yc-tag-default">{{item.txt}}</el-tag>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import AccountService from '@/services/account.service.js'
export default {
  data() {
    return {
      selAreaArray: [],
      selStor: [],
      selCateArray: [],
      selIndustryArray: []
    }
  },
  props: {
    dataAuthority: {}
  },
  mounted() {
    this.AccountService = new AccountService()
    this.pageInit(this.dataAuthority)
  },
  methods: {
    pageInit(dataAuthority) {
      if (!dataAuthority) {
        this.selAreaArray = []
        this.selCateArray = []
        this.selIndustryArray = []
        return false
      }
      if (dataAuthority.area.ids) {
        this.selAreaArray = this.createPageData(dataAuthority.area.ids, dataAuthority.area.txt)
      }
      if (dataAuthority.classify.ids) {
        this.selCateArray = this.createPageData(dataAuthority.classify.ids, dataAuthority.classify.txt)
      }
      if (dataAuthority.industry.ids) {
        this.selIndustryArray = this.createPageData(dataAuthority.industry.ids, dataAuthority.industry.txt)
      }
      this.selStor = []
      let storeIdArry = dataAuthority.store.ids.split(',')
      storeIdArry.forEach(item => {
        this.getSelMerchantList(item)
      })
    },
    // 根据传值生成选中数据
    createPageData(ids, txt) {
      let idsArray = ids.split(',')
      let txtArray = txt.split(',')
      let selArray = []
      idsArray.forEach((item, index) => {
        selArray.push({ids: idsArray[index], txt: txtArray[index]})
      })
      return selArray
    },
    // getSelMerchantList
    async getSelMerchantList(storeId) {
      let res = await this.AccountService.getMerchantDetail(storeId)
      this.selStor.push(res)
    }
  },
  watch: {
    dataAuthority(val) {
      this.pageInit(val)
    }
  }
}
</script>
<style lang="scss">
</style>
