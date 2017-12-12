<template>
  <yc-page class="yc-recommendadd">
    <el-card>
      <el-form  class="yc-form yc-recommendadd-content" ref="search" :rules="rules" :model="search" label-width="100px" :inline="true" >
        <el-form-item  label="所在地区:" class="yc-form-item" required v-if="isAllConfig==='1' || isAllConfig==='2'" prop="cityId">
          <yc-form-item-content tip="必须选择到具体的市" class="regions-model">
            <yc-regions :account="regionAccount" :getRegions="regionList" @getCurRegion="getCurRegion"></yc-regions>
          </yc-form-item-content>
        </el-form-item>
        <el-form-item label="所属行业:" required class="industry" v-if="isAllConfig==='1' || isAllConfig==='2'" prop="industryId">
          <yc-form-item-content tip="必填项，必须选择一个行业">
            <yc-industry @selectIndustry="selectIndustry" v-model="search.industryId" class="recommend-Indust"></yc-industry>
          </yc-form-item-content>
        </el-form-item>
        <el-form-item label="选择SKU:" required class="sku" prop="sku">
          <yc-form-item-content>
            <el-button class="bigbtn" @click="showSel">选择SKU</el-button>
          </yc-form-item-content>
        </el-form-item>
        <el-form-item label="已选择SKU:">
        </el-form-item>
      </el-form>
      <div class="yc-recommendadd-tabel">
        <ul class="table-ul-common">
          <li id="header">
            <span>SKU图片</span>
            <span>SKU条码</span>
            <span>SKU名称</span>
            <span>规格</span>
            <span>单位</span>
            <span>总销售数量</span>
            <span>操作</span>
          </li>
          <li v-for="(item, index) in getAllData" :key="'recommend' + index">
            <span>
              <img :src="item.defaultImage || 'http://ogd5wcvme.bkt.clouddn.com/no-img.png'" onerror="javascript:this.src='http://ogd5wcvme.bkt.clouddn.com/no-img.png' "/>
            </span>
            <span>{{ item.sku }}</span>
            <span>{{ item.goodsName }}</span>
            <span>{{ item.spec || '无' }}</span>
            <span>{{ item.unit || '无' }}</span>
            <span>{{ item.salesCount }}</span>
            <span class="operation" >
              <a @click="deleteRow(index)">删除</a>
              <a v-show="index !== 0" @click="tabRow(index, item, 'up')">上移</a>
              <a v-show="(index + 1) !== len" @click="tabRow(index, item, 'down')">下移</a>
            </span>
          </li>
        </ul>
      </div>
      <yc-card-footer>
        <el-button size="large" @click="$router.go(-1)">取消</el-button>
        <el-button type="info" size="large" @click="submit">保存</el-button>
      </yc-card-footer>
    </el-card>
    <yc-sku-select v-model="showSelSku" @select="getBackData" :select="getAllData" :firstTag="firstTag" :selectNumber="100"></yc-sku-select>
  </yc-page>
</template>
<script>
import RecommendService from '@/services/recommend.service.js'
export default {
  data() {
    let validateFn = {
      skuValue: (rule, value, callback) => {
        if (!this.getAllData || (this.getAllData && this.getAllData.length < 1)) {
          callback(new Error('请选择sku'))
          return
        }
        if (this.getAllData && this.getAllData.length > 100) {
          callback(new Error('最多允许选择100个SKU，当前你已选择了：' + this.getAllData.length + '个'))
          return
        }
        callback()
      }
    }
    return {
      showSelSku: false,
      isAllConfig: this.$route.params.flagId,
      search: {
        configId: '',
        provinceId: '',
        region: '',
        cityId: '',
        industryId: '',
        industryName: ''
      },
      rules: {
        cityId: [
          {type: 'number', min: 0, required: true, message: '请选择市', trigger: 'change'}
        ],
        industryId: [
          {type: 'number', min: 0, required: true, message: '请选择一个行业', trigger: 'change'}
        ],
        sku: [
          {validator: validateFn.skuValue, trigger: 'change'}
        ]
      },
      getAllData: [],
      getAllData1: [],
      baseInfo: {},
      noimg: 'http://ogd5wcvme.bkt.clouddn.com/no-img.png',
      regionAccount: 2,
      regionList: {
        provinceId: '',
        cityId: ''
      },
      configId: this.$route.params.configId,
      firstTag: false
    }
  },
  mounted() {
    this.RecommendService = new RecommendService()
    if (this.isAllConfig === '0') {
      // 全局默认配置
      this.getDefaultinit()
    } else if (this.isAllConfig === '1') {
      // 新增推荐商品配置
    } else if (this.isAllConfig === '2') {
      // 编辑推荐商品
      this.getEditInfo()
    }
  },
  computed: {
    len() {
      return this.getAllData.length
    }
  },
  methods: {
    showSel () {
      this.getAllData1 = this.getAllData
      this.showSelSku = true
      this.firstTag = true
    },
    deleteRow(index) {
      this.getAllData.splice(index, 1)
    },
    tabRow(index, data, type) {
      if (type === 'up') {
        // 在上一项插入该项
        this.getAllData.splice(index - 1, 0, (this.getAllData[index]))
        // 删除后一项标号
        this.getAllData.splice(index + 1, 1)
      } else if (type === 'down') {
        // 在下一项插入该项
        this.getAllData.splice(index + 2, 0, (this.getAllData[index]))
        // 删除前一项
        this.getAllData.splice(index, 1)
      }
    },
    selectIndustry(val) {
      if (val.industryName) {
        this.search.industryName = val.industryName
        this.search.industryId = val.industryId
      }
    },
    getCurRegion(val) {
      this.search.provinceId = val.provinceId
      this.search.cityId = val.cityId
      this.search.region = val.provinceName + '-' + val.cityName
    },
    // 获取编辑推荐商品
    async getEditInfo() {
      let param = {
        configId: this.$route.params.configId
      }
      let res = await this.RecommendService.editRecommendList(param)
      this.search.industryId = res.industryId
      this.search.industryName = res.industryName
      this.getAllData = res.goodsList
      this.regionList.provinceId = res.provinceId
      this.regionList.cityId = res.cityId
    },
    async getDefaultinit() {
      let res = await this.RecommendService.getDefaultRecommend({})
      this.getAllData = res
    },
    getBackData(val) {
      this.getAllData = val
    },
    async submit() {
      this.$refs.search.validate(async (valid) => {
        if (valid) {
          let params = this.search
          if (this.getAllData) {
            this.getAllData.map(function (item, index) {
              delete item.checked
              delete item.specUnit
              item.sortValue = index
              return item
            })
          }
          if (this.configId) {
            params.configId = this.configId
          }
          params.goodsList = this.getAllData
          await this.RecommendService.save(params, this.isAllConfig)
          this.$router.push('/recommend/list')
        } else {
          return false
        }
      })
    },
    closeCurrentSku() {
      this.showSelSku = false
    }
  }
}
</script>
<style lang="scss">
  .yc-recommendadd {
    .industry{
      display: block;
      .recommend-Indust{
        display: inline-block;
        width: 300px;
        .el-select{
          width: 300px;
        }
      }
    }
    .regions-model {
      .el-select{
        width: 145px;
      }
    }
    .sku{
      display: block;
      button {
        width: 110px;
        height: 40px;
        border: 1px solid #2788EA;
        span {
          font-size: 16px;
          color: #2788EA;
        }
      }
      .el-form-item__content {
        width: 270px;
      }
    }
    .table-ul-common {
    	width: 100%;
    	display: block;
    	text-align: center;
      border: 1px solid #E5E5E5;
      li#header {
        height: 40px;
        line-height: 20px;
        background: #F2F2F2;
      }
    	li {
    		display: block;
    		width: 100%;
    		line-height: 20px;
    		line-height: 20px;
    		display: table;
    		background: #fff;
    		span {
    			vertical-align: middle;
        	display: table-cell;
    			word-break: break-all;
    			padding: 0 8px;
          border-left: 1px solid #F2F2F2;
    		}
    	}
      span:nth-child(1) {
        width: 15%;
        img{
          width: 90px;
          height: 90px;
        }
        padding: 10px;
        border-left: 0;
      }
      span:nth-child(2) {
        width: 15%;
      }
      span:nth-child(3) {
        width: 20%;
      }
      span:nth-child(4) {
        width: 8%;
      }
      span:nth-child(5) {
        width: 8%;
      }
      span:nth-child(6) {
        width: 12%;
      }
      span:nth-child(7) {
        width: 19%;
        a {
          cursor: pointer;
  				color: #2788EA;
  				margin: 0 10px;
  			}
      }
      li:nth-child(odd) {
        background: #F1F6FE;
      }
    }
  }
</style>
