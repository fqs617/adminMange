<template>
  <el-table :data="dataArray" border stripe>
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
</template>
<script>
import AccountService from '@/services/account.service.js'
export default {
  data() {
    return {
      dataArray: []
    }
  },
  props: {
    selMerchantId: {}
  },
  mounted() {
    this.AccountService = new AccountService()
    this.getMerchantDetail()
  },
  methods: {
    async getMerchantDetail() {
      let res = await this.AccountService.getMerchantDetail(this.selMerchantId)
      this.dataArray.push(res)
    }
  },
  watch: {
    selMerchantId() {
      this.getMerchantDetail()
    }
  }
}
</script>
