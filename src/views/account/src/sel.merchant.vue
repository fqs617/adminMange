<template>
  <el-dialog title="选择商户"
    class="yc-account-set__notoppadding"
    :visible.sync="dialogShow"
    :modal-append-to-body="false"
    @open="openEvent" size="large">
    <el-card class="yc-account__dialogcard yc-yc-account__selmerchant">
      <yc-page-header>
        <el-form :inline="true" :model="search" label-width="100px">
          <el-form-item label="按条件筛选：" >
            <el-input class="yc-long-ipt" v-model="search.condition" placeholder="输入用户ID／用户名／手机／邮箱号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="search.provice"  placeholder="选择省" class="yc-short-ipt">
              <el-option key="all" label="全部" value="-1">
              </el-option>
            </el-select>
            <el-select v-model="search.city"  placeholder="选择省" class="yc-short-ipt">
              <el-option key="all" label="全部" value="-1">
              </el-option>
            </el-select>
            <el-select v-model="search.district"  placeholder="选择省" class="yc-short-ipt">
              <el-option key="all" label="全部" value="-1">
              </el-option>
            </el-select>
            <el-select v-model="search.industry"  placeholder="选择行业" class="yc-short-ipt">
              <el-option v-for="(item, index) in industryDownData" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="searchEvent">搜索</el-button>
          </el-form-item>
        </el-form>
      </yc-page-header>
      <el-table :data="merchantList" border stripe>
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
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button v-if="selId*1 !== scope.row.storeId *1" type="text" size="small" @click="selMerchantEvent(scope.row)">选择</el-button>
            <span v-if="selId*1 === scope.row.storeId *1" class="isSel">已选择</span>
          </template>
        </el-table-column>
      </el-table>
      <yc-pagination v-model="status.page" 
        :total="status.total" 
        :pageSize="status.pageSize"
        @handleCurrentChange="handleCurrentChange"
        layout="prev, pager, next"></yc-pagination> 
      <yc-card-footer class="yc-account__cardfoot">
        <el-button size="large" @click="dialogShow = false">取消</el-button>
        <el-button type="info" size="large" @click="saveEvent">确定</el-button>
      </yc-card-footer> 
    </el-card>
  </el-dialog>
</template>
<script>
import AccountService from '@/services/account.service.js'
export default {
  data() {
    return {
      dialogShow: this.value || false, // 弹出框显示状态
      // 搜索字段
      search: {
        condition: '', // 条件筛选
        provice: -1,  // 省市区联动  TODO： 暂时未抽取出来
        city: -1,
        district: -1,
        industry: -1 // 行业
      },
      industryDownData: [], // 行业信息下拉框信息
      // 数据分页信息
      status: {
        page: 1,
        pageSize: 10,
        total: 120
      },
      merchantList: [], // 列表数据信息
      selId: this.selMerchantId || ''
    }
  },
  props: {
    value: {},
    selMerchantId: {}
  },
  mounted() {
    this.AccountService = new AccountService()
    // 调用获取 行业数据信息
    this.getIndustry()
  },
  methods: {
    // 弹出框打开的初始化操作
    openEvent() {
      this.search.condition = ''
      this.search.industry = -1
      this.search.provice = -1
      this.search.city = -1
      this.search.district = -1
      this.status.page = 1
      this.selId = this.selMerchantId || ''
      this.getMerchantList()
    },
    // 获取行业数据信息
    getIndustry() {
      // TODO: 合并代码后从接口获取数据
      this.industryDownData.push({label: '全部', value: -1})
      this.industryDownData.push({label: '商超百货', value: 1})
      this.industryDownData.push({label: '母婴用品', value: 2})
      this.industryDownData.push({label: '手机数码', value: 3})
      this.industryDownData.push({label: '服饰鞋帽', value: 4})
      this.industryDownData.push({label: '餐饮连锁', value: 5})
      this.industryDownData.push({label: '化妆洗护', value: 6})
      this.industryDownData.push({label: '生鲜农贸', value: 7})
      this.industryDownData.push({label: '医药保健', value: 8})
      this.industryDownData.push({label: '酒水饮料', value: 9})
      this.industryDownData.push({label: '汽修汽配', value: 10})
      this.industryDownData.push({label: '钟表珠宝', value: 11})
    },
    // 获取列表数据
    async getMerchantList() {
      let params = this.getSearchParams()
      let res = await this.AccountService.getMerchantList(params)
      this.status.total = res.total * 1
      this.merchantList = res.list
    },
    // 获取搜索数据
    getSearchParams() {
      let params = {}
      params.page = this.status.page
      params.pageSize = this.status.pageSize
      params.param = this.search.condition
      params.provinceId = this.search.provice
      params.cityId = this.search.city
      params.districtId = this.search.district
      params.industryId = this.search.industry
      return params
    },
    // 列表数据搜索
    searchEvent() {
      this.status.page = 1
      this.getMerchantList()
    },
    // 分页页数变化出发事件
    handleCurrentChange(val) {
      this.status.page = (val * 1)
      this.getMerchantList()
    },
    // 选中用户时调用
    selMerchantEvent(merchantItem) {
      this.selId = merchantItem.storeId
      // TODO: 触发选中时间
    },
    // 点击确定执行事件
    saveEvent() {
      if (!this.selId) {
        this.$message.error('您尚未选择商户，请选择一个商户后再保存！')
      } else {
        this.$emit('selMerchant', this.selId)
        this.dialogShow = false
      }
    }
  },
  watch: {
    value(val) {
      this.dialogShow = val
    },
    dialogShow(val) {
      this.$emit('input', val)
    },
    selMerchantId(val) {
      this.selId = val
    }
  }
}
</script>
<style lang="scss">
  .yc-account__selmerchant {
    .isSel {
      color: #999999;
    }
  }
</style>
