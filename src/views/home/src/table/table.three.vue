<template>
  <div class="yc-table">
    <p class="table-header">
      {{ title }}
    </p>
    <el-table
      id="table-three"
      :data="tableData"
      border
      stripe
      style="width: 100%"
      :summary-method="getSummaries"
      :show-summary="true">
      <el-table-column prop="date" label="城市ID" align="center"></el-table-column>
      <el-table-column prop="name" label="城市名称" align="center"></el-table-column>
      <el-table-column prop="address" label="商户数" align="center"></el-table-column>
      <el-table-column prop="name" label="买家数" align="center"></el-table-column>
      <el-table-column prop="name" label="卖家数" align="center"></el-table-column>
      <el-table-column prop="name" label="卖家+买家" align="center"></el-table-column>
      <el-table-column label="上上周" align="center">
        <el-table-column prop="name" label="买家数" align="center"></el-table-column>
        <el-table-column prop="name" label="卖家数" align="center"></el-table-column>
        <el-table-column prop="name" label="卖家+买家" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="上周" align="center">
        <el-table-column prop="name" label="买家数" align="center"></el-table-column>
        <el-table-column prop="name" label="卖家数" align="center"></el-table-column>
        <el-table-column prop="name" label="卖家+买家" align="center"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '云采平台商户数据',
      tableData: [{
        date: '2016-05-02',
        name: '33',
        address: '11111'
      }, {
        date: '2016-05-04',
        name: '33',
        address: '222'
      }, {
        date: '2016-05-01',
        name: '33',
        address: '2222'
      }, {
        date: '2016-05-03',
        name: '22',
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
          sums[index] = '总计'
          let td = document.getElementById('table-three').childNodes[3].childNodes[0].rows[0].cells
          if (td[0]) {
            td[0].colSpan = '2'
          }
          // return
        }
        // const values = data.map(item => Number(item[column.property]))
        // if (!values.every(value => isNaN(value))) {
        //   if (index === 1) {
        //     return
        //   }
        //   sums[index - 1] = values.reduce((prev, curr) => {
        //     const value = Number(curr)
        //     if (!isNaN(value)) {
        //       return prev + curr
        //     } else {
        //       return prev
        //     }
        //   }, 0)
        // } else {
        //   sums[index - 1] = 'N/A'
        // }
      })
      return sums
    }
  }
}
</script>
<style lang="scss">
@import "./table.scss";
</style>
