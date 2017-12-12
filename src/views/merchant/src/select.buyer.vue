<template>
  <div class="select-buyer">
    <el-form :inline="true" :model="search">
      <el-form-item label="按条件筛选:" class="choose">
        <el-input v-model="search.parameter" placeholder="请输入商户名称／商户ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="search.provinceId" placeholder="选择省">
          <el-option label="qq" value="shanghai"></el-option>
        </el-select>
        <el-select v-model="search.cityId" placeholder="选择市">
          <el-option label="qq1" value="shanghai"></el-option>
        </el-select>
        <el-select v-model="search.districtId" placeholder="选择区">
          <el-option label="qq2" value="shanghai"></el-option>
        </el-select>
        <el-select v-model="search.industryId" placeholder="全部行业">
          <el-option label="qq3" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border stripe ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column prop="storeId" label="商户ID" align="center"></el-table-column>
      <el-table-column prop="storeName" label="商户名称" align="center"></el-table-column>
      <el-table-column prop="type" label="商户类型" align="center"></el-table-column>
      <el-table-column prop="regionName" label="商户归属地" align="center"></el-table-column>
      <el-table-column prop="industryName" label="所属行业" align="center"></el-table-column>
      <el-table-column prop="statusDesc" label="状态" align="center"></el-table-column>
      <el-table-column type="selection" width="55"></el-table-column>
    </el-table>
    <yc-pagination v-model="page1"></yc-pagination>
    <yc-card-footer slot="footer" class="dialog-footer">
      <el-button size="large" @click="cancelBuyerList">取消</el-button>
      <el-button type="info" size="large" @click="saveBuyerList">保存</el-button>
    </yc-card-footer>
  </div>
</template>
<script>
import MerchantService from '@/services/merchant.service'
export default {
  data() {
    return {
      search: {
        parameter: '',
        provinceId: '',
        cityId: '',
        districtId: '',
        industryId: ''
      },
      page1: 2,
      tableData: [],
      multipleSelection: []
    }
  },
  watch: {
    'tableData' (nval) {
      if (nval && this.selectBuyerList) {
        this.toggleSelection(this.selectBuyerList)
      }
    }
  },
  props: ['selectBuyerList', 'type'],
  mounted() {
    this.MerchantService = new MerchantService()
    this.getBuyerRedisGet()
    this.toggleSelection(this.selectBuyerList)
  },
  methods: {
    async getBuyerRedisGet() {
      let params = {
        type: this.type
      }
      let res = await this.MerchantService.getBuyerRedisGet(params)
      if (res.length > 0) {
        this.tableData = res
        setTimeout(this.toggleSelection, 50)
      } else {
        this.getSelectBuyer()
      }
    },
    async getSelectBuyer() {
      let params = this.search
      let res = await this.MerchantService.getSelectBuyer(params)
      this.tableData = res
    },
    onSearch() {
      this.getSelectBuyer()
    },
    // 被选上后的操作
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 初始化选择列表
    toggleSelection() {
      let self = this
      if (this.tableData) {
        this.tableData.forEach(row => {
          if (row.isSelect) {
            self.$refs.multipleTable.toggleRowSelection(row)
          }
        })
      } else {
        self.$refs.multipleTable.clearSelection()
      }
    },
    changeArray (list) {
      if (list.length > 0) {
        let buyerType = ''
        for (let i = 0; i < list.length; i++) {
          if (buyerType) {
            buyerType = buyerType + ',' + list[i].storeId
          } else {
            buyerType = list[i].storeId
          }
        }
        return buyerType
      }
    },
    async saveBuyerList() {
      let params = {
        type: this.type,
        storeId: this.changeArray(this.multipleSelection)
      }
      await this.MerchantService.postBuyerRedisSave(params)
      this.$emit('saveBuyerList', this.multipleSelection)
    },
    cancelBuyerList() {
      this.$emit('cancelBuyerList')
    }
  }
}
</script>
<style lang="scss">
  .select-buyer {
    margin-bottom: -20px;
    .el-form {
      .el-input__inner {
        font-size: 12px;
        width: 80px;
        height: 26px;
        border-radius: 1px;
      }
      .el-input__icon + .el-input__inner {
        padding: 0;
        padding-left: 10px;
      }
      .choose .el-input__inner {
        width: 224px;
        text-align: center;
        margin-right: 20px;
      }
      .el-form--inline .el-form-item__label {
        font-size: 12px;
        line-height: 17px;
      }
      .el-form-item__label {
        color: #333;
      }
      .el-button {
        height: 26px;
        margin-top: 6px;
        padding: 5px 18px;
        span {
          color: #2788EA;
        }
      }
    }
    .el-table__body-wrapper {
      overflow: hidden;
    }
    .yc-card-footer {
      margin-top: 30px;
    }
  }
</style>
