<template>
  <el-dialog custom-class="yc-sku-select" :title="'选择sku--最多允许选择'+ selectNumber +'个' + '【已选中'+ len +'个商品】'" :visible.sync="currentVal" :modal-append-to-body="false" size="large" >
<div  v-loading="loadingTable">
    <yc-page-header>
      <el-form :inline="true" label-width="100px" :model="searchForm">
        <el-form-item label="按条件筛选：" class="parameter">
          <el-input class="yc－ipt" placeholder="请输入SKU码/产品名称" long noradius v-model="searchForm.parameter"></el-input>
        </el-form-item>
        <el-form-item class="cate-list">
          <yc-cate-select @cateSelectFun="cateSelectFun"></yc-cate-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </yc-page-header>
     <el-table
      border
      stripe
      :data="list"
      ref="table"
      height="300"
      @select="onSelect"
      @select-all="onSelectAll">
      <column type="selection"
        :selected="initSelected"
        label="选择"
        width="55">
      </column>
      <el-table-column prop="defaultImage" label="SKU图片" align="center" width="120">
        <template scope="scope">
          <img class="yc-sku-select__img" :src="scope.row.defaultImage || 'http://ogd5wcvme.bkt.clouddn.com/no-img.png'"/>
        </template>
      </el-table-column>
      <el-table-column prop="goodsName" label="SKU名称" align="center"></el-table-column>
      <el-table-column prop="sku" label="SKU条码" align="center" width="150"></el-table-column>
      <el-table-column prop="specUnit" label="规格 / 单位" align="center" width="130"></el-table-column>
      <el-table-column prop="salesCount" label="总销售数量" align="center" width="130"></el-table-column>
    </el-table>
    <yc-pagination v-model="searchForm.page" layout="prev, pager, next" @handleCurrentChange="handleCurrentChange" :pageSize="searchForm.size" :total="page.total">
    </yc-pagination>
    <yc-card-footer slot="footer" class="dialog-footer">
      <el-button size="large" @click="currentVal = false">关闭</el-button>
      <el-button type="info" size="large" @click="onSave" :disabled="len <= 0 || len > selectNumber">保存</el-button>
    </yc-card-footer>
  </div>
  </el-dialog>
</template>
<script>
  import CommonService from '@/services/common.service'
  import Column from './table.column'
  import Select from './select'
  export default {
    name: 'yc-sku-select',
    mixins: [ Select ],

    data() {
      return {
        currentVal: false || this.value,
        loadingTable: false,
        searchForm: {
          parameter: '',
          cateId1: '',
          cateId2: '',
          page: 1,
          size: 10
        },
        page: {
          total: 0
        },
        list: []
      }
    },

    created() {
      this.CommonService = new CommonService()
      this.init()
    },

    watch: {
      firstTag(val) {
        if (val) {
          this.init()
        }
      },
      currentVal(val) {
        this.$emit('input', val)
      },
      value(val) {
        this.currentVal = val
      }
    },

    props: {
      value: {},
      firstTag: {}
    },

    methods: {
      async init() {
        if (!this.firstTag) {
          return
        }
        this.loadingTable = true
        try {
          let {list, total} = await this.CommonService.getSkuList(this.searchForm)
          this.list = list.map(item => {
            item.$$ycPage = this.searchForm.page
            item.specUnit = item.spec + ' / ' + item.unit
            return item
          })
          this.page.total = total
          this.$nextTick(() => {
            this.toggleSelection()
          })
        } finally {
          this.loadingTable = false
        }
      },
      cateSelectFun(cate1, cate2) {
        this.searchForm.cateId1 = cate1
        this.searchForm.cateId2 = cate2
      },
      handleCurrentChange(page) {
        this.searchForm.page = page
        this.init()
      },
      // 搜索
      onSearch() {
        this.searchForm.page = 1
        this.init()
      },
      onSave() {
        let arr = [...this.selection].map(item => item[1])
        let list = this.$bqUtils.copy(arr)
        list = list.map(item => {
          delete item.specUnit
          return item
        })
        this.$emit('select', list)
        this.currentVal = false
      }
    },

    components: {
      Column: Column
    }
  }
</script>
<style lang="scss">
  .yc-sku-select {
    width: 1000px;
    max-height: 684px;
    .el-dialog__body {
      padding: 20px 40px;
    }
    &__img {
      width: 50px;
      height: 50px;
      margin-top: 10px;
    }
    .parameter {
      .el-input__inner {
        width: 224px;
      }
    }
    .cate-list {
      .el-input {
        width: 120px !important;
      }
      .el-input__inner {
        width: 120px;
      }
    }
  }
</style>
