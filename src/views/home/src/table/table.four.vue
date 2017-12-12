<template>
  <div class="yc-table">
    <p class="table-header">
      {{ label.title }}
    </p>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
      :summary-method="getSummaries"
      show-summary>
      <el-table-column label="日期" align="center">
        <el-table-column prop="date" label="城市" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="上上周" align="center">
        <el-table-column prop="name" :label="label.goodscount" align="center"></el-table-column>
        <el-table-column prop="name" v-if="label.orderscount" :label="label.orderscount" align="center"></el-table-column>
        <el-table-column prop="name" :label="label.probability" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="上周" align="center">
        <el-table-column prop="name" :label="label.goodscount" align="center"></el-table-column>
        <el-table-column prop="name" v-if="label.orderscount" :label="label.orderscount" align="center"></el-table-column>
        <el-table-column prop="name" :label="label.probability" align="center"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      label: {},
      tableData: [{
        date: '2016-05-02',
        name: '10%',
        address: '11111'
      }, {
        date: '2016-05-04',
        name: '10%',
        address: '222'
      }, {
        date: '2016-05-01',
        name: '10%',
        address: '2222'
      }, {
        date: '2016-05-03',
        name: '10%',
        address: '2222'
      }]
    }
  },
  name: 'yc-table',
  props: {
    isHeader: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.label = {
        title: '云采平台各城市近2周订单差异商品数据',
        goodscount: '差异商品数量',
        orderscount: '订货数量',
        probability: '差异商品率'
      }
      // this.label = {
      //   title: '云采平台各城市近2周差异订单数据',
      //   goodscount: '差异订单数量',
      //   probability: '差异订单率'
      // }
      // this.label = {
      //   title: '云采平台各城市近2周订单关闭数据',
      //   goodscount: '差异关闭数量',
      //   orderscount: '订货总量',
      //   probability: '订单失败率'
      // }
    },
    getSummaries(param) {
      const { columns } = param
      // const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          // return
        }
        // const values = data.map(item => Number(item[column.property]))
        // console.log(values)
      })
      return sums
    }
  }
}
</script>
<style lang="scss">
@import "./table.scss"
</style>
