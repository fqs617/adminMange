<template>
  <yc-page>
    <template slot="buttons">
      <el-button >导出数据</el-button>
      <el-button type="info">新增商户</el-button>
    </template>
    <yc-page-header>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="按条件筛选：">
          <el-input v-model="search.user" placeholder="输入用户ID／用户名／手机号／邮箱号"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="search.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="search.date1"></el-date-picker>
          <el-date-picker type="date" placeholder="选择日期" v-model="search.date2" ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </yc-page-header>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <br>
    <br>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="200">
        <template scope="scope">
          <el-button type="text" size="small">查看详情</el-button>
          <el-button type="text" size="small">关闭</el-button>
          <el-button type="text" size="small">卖家设置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <yc-pagination v-model="page2" layout="sizes, prev, pager, next" @handleCurrentChange="handleCurrentChange"></yc-pagination>
    <br>
    <br>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template scope="scope">
          <el-button type="text" size="small">查看详情</el-button>
          <el-button type="text" size="small">关闭</el-button>
          <el-button type="text" size="small">卖家设置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <yc-pagination v-model="page1"></yc-pagination>
    <el-cascader
      style="width: 300px"
      v-model="val"
      :options="cityOptions"
      @active-item-change="handleItemChange"
      :props="props"
    ></el-cascader>
    <h1>
      {{ page1 }}
    </h1>
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="onBeforeUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button @click="page2 = 3">Update Page Size</el-button>
  </yc-page>
</template>
<script>
import TestService from '@/services/test.service'
export default {
  data() {
    return {
      cityOptions: [],
      props: {
        value: 'id',
        label: 'name'
      },
      val: [],
      search: {
        region: '',
        date1: '',
        date2: ''
      },
      page1: 2,
      page2: 2,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      imageUrl: ''
    }
  },
  async created() {
    this.TestService = new TestService()
    this.TestService.getHome()
    let citys = await this.initSelect()
    this.dval = [5, 30, 45]
    this.cityOptions = citys
    this.initCity(this.cityOptions, this.dval)
  },
  methods: {
    onSubmit() {
    },
    async initSelect(regionId = 1) {
      let res = await this.TestService.getCity({regionId: regionId})
      return res.regionList.map(item => {
        if (item.flag) {
          item.children = []
        }
        return item
      })
    },
    async handleItemChange(ids) {
      console.log('11')
      let len = ids.length
      let id = ids[len - 1]
      let citys = this.getCity(this.cityOptions, ids)
      if (citys.children.length <= 0) {
        citys.children = await this.initSelect(id)
      }
    },
    async initCity(arr, ids, index = 0) {
      if (ids.length - 1 === index) {
        this.val = [5, 30, 45]
        return
      }
      let id = ids[index]
      // 查到当前层
      let item = arr.filter(item => item.id === id)[0]
      if (item) {
        let children = await this.initSelect(id)
        if (children.length > 0) {
          item.children = children
          this.initCity(item.children, ids, index + 1, item)
        }
      }
    },
    getCity(arr, ids, index = 0, child = {}) {
      let id = ids[index]
      if (index === ids.length) {
        return child
      }
      let item = arr.filter(item => item.id === id)[0]
      return this.getCity(item.children, ids, index + 1, item)
    },
    async onBeforeUpload(file) {
      let res = await this.TestService.upload1({
        file: file.raw,
        user: 123
      })
      this.imageUrl = res.url
      console.log('UPLOAD', res)
    },
    handleCurrentChange(val) {
      console.log('CurrentChange', val)
    }
  }
}
</script>
