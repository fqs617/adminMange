<template>
  <div class="yc-table">
    <p class="table-header">
      {{ title }}
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
      <el-table-column label="2017-08-04" align="center">
        <el-table-column prop="name" label="订货金额" align="center"></el-table-column>
        <el-table-column prop="address" label="订货次数" align="center"></el-table-column>
        <el-table-column prop="name" label="平均客单价" align="center"></el-table-column>
        <el-table-column prop="name" label="订货买家数" align="center"></el-table-column>
        <el-table-column prop="name" label="周复购率" align="center"></el-table-column>
        <el-table-column prop="name" label="周留存率" align="center"></el-table-column>
        <el-table-column prop="name" label="周转化率" align="center"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '云采平台各城市上周交易数据',
      // title: '云采平台各城市上上周交易数据',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '11111'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '222'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '2222'
      }, {
        date: '2016-05-03',
        name: '王小虎',
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
  methods: {
    getSummaries(param) {
      const { columns } = param
      // const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '增长率'
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
