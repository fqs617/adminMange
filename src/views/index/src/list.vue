<template>
  <yc-page class="yc-page-index-single">
    <template slot="buttons">
      <el-button type="info" @click="goAddAreaPage">新增{{single?'单栏':'组合'}}专区</el-button>
    </template>
    <yc-page-header>
      <el-form :inline="true" :moddel="singleSearch">
        <template v-if="single === true">
          <el-form-item label="按条件筛选：">
            <el-input v-model="singleSearch.parameter" placeholder="输入单栏专区编号／单栏专区名称" key="single-search-parameter"></el-input>
          </el-form-item>
          <el-form-item label="创建时间：">
            <el-date-picker type="date" placeholder="开始时间" v-model="singleSearch.createStartTime" key="single-search-createStartTime" :editable="false"></el-date-picker>
            <el-date-picker type="date" placeholder="结束时间" v-model="singleSearch.createEndTime" key="single-search-createEndTime" :editable="false"></el-date-picker>
          </el-form-item>
          <el-form-item label="显示时间：">
            <el-date-picker type="date" placeholder="开始时间" v-model="singleSearch.showStartTime" key="single-search-showStartTime" :editable="false"></el-date-picker>
            <el-date-picker type="date" placeholder="结束时间" v-model="singleSearch.showEndTime" key="single-search-showEndTime" :editable="false"></el-date-picker>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="singleSearch.isShow" placeholder="全部" key="single-search-isShow">
              <el-option v-for="statu in status" :key="statu" :label="statu.label" :value="statu.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属行业：">
            <yc-industry v-model="singleSearch.industryId"></yc-industry>
          </el-form-item>
          <el-form-item label="所属地区：" class="el-form-area">
            <yc-regions :account="regionAccount" :getRegions="{'provinceId': this.singleSearch.provinceId, 'cityId': this.singleSearch.cityId}" @getCurRegion="getCurRegion"></yc-regions>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="按条件筛选：">
            <el-input v-model="search.parameter" placeholder="输入用户ID／用户名／手机号／邮箱号" key="search-parameter"></el-input>
          </el-form-item>
          <el-form-item label="创建时间：">
            <el-date-picker type="date" placeholder="开始时间" v-model="search.createStartTime" key="search-createStartTime"></el-date-picker>
            <el-date-picker type="date" placeholder="结束时间" v-model="search.createEndTime" key="search-createEndTime"></el-date-picker>
          </el-form-item>
          <el-form-item label="显示时间：">
            <el-date-picker type="date" placeholder="开始时间" v-model="search.showStartTime" key="search-showStartTime"></el-date-picker>
            <el-date-picker type="date" placeholder="结束时间" v-model="search.showEndTime" key="search-showEndTime"></el-date-picker>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="search.isShow" placeholder="全部" key="search-isShow">
              <el-option v-for="statu in status" :key="statu" :label="statu.label" :value="statu.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属行业：">
            <yc-industry v-model="search.industryId"></yc-industry>
          </el-form-item>
          <el-form-item label="所属地区：" class="el-form-area">
            <yc-regions :account="regionAccount" :getRegions="{'provinceId': this.search.provinceId, 'cityId': this.search.cityId}" @getCurRegion="getCurRegion"></yc-regions>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
      <ul class="list-wrap">
        <li class="item" v-for="(item, index) in list" :key="'singel' + index">
          <div class="img">
            <bq-area-display
            :single="single"
            :listInfo="item">
            </bq-area-display>
          </div>
          <span>编号：{{item.programId}}</span>
          <span>所属地区：{{item.region}} <i @click="openCitys(item.regionObj.provinceList)" v-if="item.regionObj && item.regionObj.provinceList.length > 1">> 点击查看所示城市</i> </span>
          <span>所属行业：{{item.industryName}}</span>
          <span>排序值：{{item.sortValue}}</span>
          <span>状态：{{item.isShow == 1 ? '开启' :'关闭'}}中</span><br/>
          <span>名称：{{item.programName}}</span>
          <span :linkValue="item.linkValue">链接地址：{{item.linkDesc}}</span><br/>
          <span>创建时间：{{item.createTime}}</span>
          <span>显示时间：{{item.showStartTime}}  至  {{item.showEndTime}}</span>
          <div class="btn-bar">
            <el-button @click="goAddAreaPage(0, item.programId)">编辑</el-button>
            <el-button v-if="item.isShow == 1"  @click="linkVisible(0, item.programId)">关闭</el-button>
            <el-button v-if="item.isShow == 0" @click="linkVisible(1, item.programId)">开启</el-button>
            <el-button @click="linkVisible(2, item.programId)">删除</el-button>
          </div>
        </li>
      </ul>
      <yc-pagination v-model="page" @handleCurrentChange="handleCurrentChange" :pageSize="size" :total="total"></yc-pagination>
    </yc-page-header>
    <yc-show-city v-model="showCity" :info="regionInfo"></yc-show-city>
    <el-dialog
      custom-class="yc-d"
      title="操作提示"
      :visible.sync="linkCloseVisible"
      size="tiny"
      :modal-append-to-body = "false"
      :before-close="handleClose">
      <p>你确定要{{code==0?'关闭':code==1?'开启':code==2?'删除':''}}该{{single?'单栏':'组合'}}专区坑位吗？</p>
      <p v-if="code==0">一旦关闭，该{{single?'单栏':'组合'}}专区坑位即使在显示时间范围内也不会再显示。</p>
      <p v-if="code==1">一旦开启，该{{single?'单栏':'组合'}}坑位将会按照显示时间进行显示。</p>
      <p v-if="code==2">一旦删除，该{{single?'单栏':'组合'}}专区坑位将不会再显示，并且不会再恢复。</p>
      <yc-card-footer slot="footer" class="dialog-footer">
        <el-button size="large" @click="linkCloseVisible = false">取消</el-button>
        <el-button type="info" size="large" @click="save">确定</el-button>
      </yc-card-footer>
    </el-dialog>
  </yc-page>
</template>
<script>
import AreaDisplay from './area.display.vue'
import IndexSettingSingleGroupService from '@/services/index.setting.single.group.service'
export default {
  components: {
    'bq-area-display': AreaDisplay
  },
  created() {
    this.initPage()
  },
  data() {
    return {
      linkCloseVisible: false,
      code: 0, // 0 关闭  1 开启  2 删除
      programId: '', // 当前专栏Id
      search: {
        parameter: '',
        createStartTime: '',
        createEndTime: '',
        showStartTime: '',
        showEndTime: '',
        industryId: '',
        isShow: '',
        provinceId: '',
        cityId: '',
        page: 1,
        size: 20
      },
      singleSearch: {
        parameter: '',
        createStartTime: '',
        createEndTime: '',
        showStartTime: '',
        showEndTime: '',
        industryId: '',
        isShow: '',
        provinceId: '',
        cityId: '',
        page: 1,
        size: 20
      },
      list: [],
      status: [
        { label: '全部', value: -1 },
        { label: '开启中', value: 1 },
        { label: '关闭中', value: 0 }
      ],
      page: 1,
      size: 20,
      total: 0,
      regionAccount: 2,
      single: true,
      programType: 'group', // group表示组合专区，single表示单栏专区
      showCity: false,
      regionInfo: []
    }
  },
  methods: {
    openCitys(list) {
      this.showCity = true
      this.regionInfo = list
    },
    getCurRegion(val) {
      this.singleSearch.provinceId = val.provinceId
      this.singleSearch.cityId = val.cityId
    },
    onSubmit() {
      if (this.page !== 1) {
        this.page = 1
      } else {
        this.getList()
      }
    },
    handleCurrentChange(page) {
      this.page = page
      this.getList()
    },
    async getList() {
      let params = this.single === true ? this.singleSearch : this.search
      params.page = this.page
      if (params.createStartTime) {
        params.createStartTime = this.$bqUtils.dateFormat(new Date(params.createStartTime), 'yyyy-MM-dd hh:mm:ss')
      }
      if (params.createEndTime) {
        params.createEndTime = this.$bqUtils.dateFormat(new Date(params.createEndTime), 'yyyy-MM-dd hh:mm:ss')
      }
      if (params.showStartTime) {
        params.showStartTime = this.$bqUtils.dateFormat(new Date(params.showStartTime), 'yyyy-MM-dd hh:mm:ss')
      }
      if (params.showEndTime) {
        params.showEndTime = this.$bqUtils.dateFormat(new Date(params.showEndTime), 'yyyy-MM-dd hh:mm:ss')
      }
      let res = await this.IndexSettingSingleGroupService.getProgramList(params, this.programType)
      this.list = res.list
      this.total = res.total
    },
    // 跳转 新增或者编辑
    goAddAreaPage(code, programId) {
      let url = '/index/'
      if (code === 0) {
        url += 'editarea/' + programId
      } else {
        url += 'addarea'
      }
      if (this.$route.params.type) {
        url += '/' + this.$route.params.type
      }
      this.$router.push(url)
    },
    linkVisible(code, programId) {
      this.code = code
      this.programId = programId
      this.linkCloseVisible = true
    },
    handleClose() {
      this.linkCloseVisible = false
    },
    async save() {
      this.linkCloseVisible = false
      if (this.code === 2) { // 0 关闭  1 开启  2 删除
        await this.IndexSettingSingleGroupService.programDelete({programId: this.programId}, this.programType)
      } else {
        let params = {
          programId: this.programId,
          operatorType: this.code
        }
        await this.IndexSettingSingleGroupService.programClose(params, this.programType)
      }
      this.getList()
    },
    initPage () {
      this.single = this.$route.params.type === '0'
      if (this.single) {
        this.programType = 'single'
      }
      this.IndexSettingSingleGroupService = new IndexSettingSingleGroupService()
      let page
      if (this.single === true) {
        page = this.singleSearch.page
      } else {
        page = this.search.page
      }
      if (this.page !== page) {
        this.page = page
      } else {
        this.getList()
      }
    }
  },
  watch: {
    '$route'(to) {
      if (to.path.substr(0, 6) !== '/index') {
        this.singleSearch = {
          parameter: '',
          createStartTime: '',
          createEndTime: '',
          showStartTime: '',
          showEndTime: '',
          industryId: '',
          isShow: '',
          provinceId: null,
          cityId: '',
          page: 1,
          size: 20
        }
      }
      if (to.path.substr(0, 15) === '/index/editarea' || to.path.substr(0, 14) === '/index/addarea') {
        return
      }
      this.initPage()
    }
  }
}
</script>
<style lang="scss">
@import 'scss/variables.scss';
.yc-page-index-single {
  .el-form {
    .el-form-item__label {
      padding-right: 0;
    }
    .el-input {
      width: 224px;
    }
    .el-date-editor {
      width: 116px;
    }
    .el-select {
      .el-input {
        width: 110px;
      }
    }
    .el-form-area {
      .el-input {
        width: 110px;
      }
    }
  }
  .list-wrap {
    line-height: 15px;
    margin: 10px 0 50px;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.10);
    .item {
      background: #fff;
      padding: 20px 0 11px 425px;
      border-bottom: 1px solid #f2f2f2;
      position: relative;
      .img {
        position: absolute;
        top: 20px;
        left: 19px;
        width: 375px;
        height: 120px;
      }
      & > span {
        font-size: 14px;
        line-height: 14px;
        color: #333;
        margin-bottom: 15px;
        margin-right: 50px;
        display: inline-block;
        word-break: break-all;
        i {
          cursor: pointer;
          font-size: 14px;
        }
      }
    }
  }
  .btn-bar {
    padding: 9px 30px 10px;
    text-align: right;
    border-top: 1px dashed #f2f2f2;
    .el-button {
      padding: 8px 25px;
      border-color: $primary;
      span {
        font-size: 14px;
        line-height: 14px;
        color: $primary
      }
    }
  }
  .el-dialog {
    &__body {
      p {
        padding-left: 30px;
        font-size: 14px;
        height: 14px;
        margin-bottom: 20px;
        color: #333;
      }
    }
  }
}
</style>
