<template>
  <yc-page class="yc-banner">
    <template slot="buttons">
      <!-- <el-button >导出数据</el-button> -->
      <el-button type="info" @click="$router.push(`/banner/add`)">新增Banner</el-button>
    </template>
    <yc-page-header>
      <el-form :inline="true" :model="search">
        <el-form-item label="按条件筛选：" class="search-model">
          <el-input placeholder="输入编号/Banner名称" v-model="search.parameter"></el-input>
        </el-form-item>
        <el-form-item label="创建时间：" class="sel-model">
          <el-date-picker type="date" placeholder="开始日期" v-model="search.createStartTime" :editable="false"></el-date-picker>
          <el-date-picker type="date" placeholder="结束日期" v-model="search.createEndTime" :editable="false"></el-date-picker>
        </el-form-item>
        <el-form-item label="显示时间：" class="sel-model">
          <el-date-picker type="date" placeholder="开始日期" v-model="search.showStartTime" :editable="false"></el-date-picker>
          <el-date-picker type="date" placeholder="结束日期" v-model="search.showEndTime" :editable="false"></el-date-picker>
        </el-form-item>
        <el-form-item label="状态：" >
          <el-select v-model="search.isShow"  placeholder="全部" class="yc-short-ipt">
            <el-option v-for="item in status_list" :key="item.status" :label="item.name" :value="item.status"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属行业：" class="sel-model">
          <yc-industry v-model="search.industryId"></yc-industry>
        </el-form-item>
        <el-form-item label="所属地区：" class="sel-model">
          <yc-regions :account="regionAccount" :getRegions="{'provinceId': this.search.provinceId, 'cityId': this.search.cityId}" @getCurRegion="getCurRegion"></yc-regions>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchList()">搜索</el-button>
        </el-form-item>
      </el-form>
    </yc-page-header>
    <ul class="yc-banner-list">
      <li v-for="(item, index) in listData" :key="index">
        <div class="img">
          <img :src="item.programPic"/>
        </div>
        <div class="left">
          <div class="content">
            <span notop>编号：{{item.programId}}</span>
            <span notop>所属地区：{{item.region}} <i @click="openCitys(item.regionObj.provinceList)" v-if="item.regionObj && item.regionObj.provinceList.length > 1">> 点击查看所示城市</i> </span>
            <span notop>所属行业：{{item.industryName}}</span>
            <span notop>排序值：{{item.sortValue}}</span>
            <span notop>状态：{{ getStatus(item.isShow) }}</span>
            <br/>
            <span bigmargin>名称：{{item.programName}}</span>
            <span>链接地址：{{item.linkDesc}}</span>
            <br/>
            <span>创建时间：{{item.createTime}}</span>
            <span>显示时间： {{item.showStartTime}}  至  {{item.showEndTime}}</span>
          </div>
          <div class="footer">
            <el-button class="yc-blue-btn" @click="$router.push(`/banner/add/` + item.programId)">编辑</el-button>
            <el-button class="yc-blue-btn" v-if="item.isShow === 1" type="text" size="small" @click="operateBanner(2, item)">关闭</el-button>
            <el-button class="yc-blue-btn" v-if="item.isShow === 0" type="text" size="small" @click="operateBanner(2, item)">开启</el-button>
            <el-button class="yc-blue-btn" @click="operateBanner(3, item)">删除</el-button>
          </div>
        </div>
      </li>
    </ul>
    <yc-pagination v-model="page" @handleCurrentChange="handleCurrentChange" :pageSize="size" :total="total"></yc-pagination>
    <yc-show-city v-model="showCity" :info="regionInfo"></yc-show-city>
    <el-dialog
      custom-class="yc-d"
      title="操作提示"
      :visible.sync="linkDialogVisible"
      size="tiny"
      :modal-append-to-body = "false"
      :before-close="handleClose">
      <h1 class="dialog-title">{{ dialogTitle }}</h1>
      <p class="dialog-content">{{ dialogContent }}</p>
      <yc-card-footer slot="footer" class="dialog-footer">
        <el-button size="large" @click="handleClose">取消</el-button>
        <el-button type="info" size="large" @click="postSure">确定</el-button>
      </yc-card-footer>
    </el-dialog>
  </yc-page>
</template>
<script>
import BannerService from '@/services/banner.service'
export default {
  data() {
    return {
      search: {
        industryName: '',
        industryId: '',
        parameter: '',
        createStartTime: '',
        createEndTime: '',
        showStartTime: '',
        showEndTime: '',
        isShow: '',
        provinceId: '',
        cityId: '',
        page: 1,
        size: 20
      },
      dialogTitle: '',
      dialogContent: '',
      linkDialogVisible: false,
      statusTag: '',
      controlTag: '',
      getId: '',
      listData: [],
      status_list: [
        { name: '全部', status: -1 },
        { name: '开启中', status: 1 },
        { name: '关闭中', status: 0 }
      ],
      page: 1,
      size: 20,
      total: 0,
      regionAccount: 2,
      showCity: false,
      regionInfo: []
    }
  },
  created() {
    this.BannerService = new BannerService()
    this.init()
  },
  watch: {
    '$route'(to) {
      if (to.path.substr(0, 7) !== '/banner') {
        this.search = {
          industryName: '',
          industryId: '',
          parameter: '',
          createStartTime: '',
          createEndTime: '',
          showStartTime: '',
          showEndTime: '',
          isShow: '',
          provinceId: null,
          cityId: '',
          page: 1,
          size: 20
        }
      }
      if (to.path.substr(0, 11) === '/banner/add') {
        return
      }
      this.init()
    }
  },
  methods: {
    openCitys(list) {
      this.showCity = true
      this.regionInfo = list
    },
    getCurRegion(val) {
      this.search.provinceId = val.provinceId
      this.search.cityId = val.cityId
    },
    async init() {
      let params = this.search
      if (params.createStartTime) {
        params.createStartTime = this.$bqUtils.dateFormat(new Date(params.createStartTime), 'yyyy-MM-dd')
      }
      if (params.createEndTime) {
        params.createEndTime = this.$bqUtils.dateFormat(new Date(params.createEndTime), 'yyyy-MM-dd')
      }
      if (params.showStartTime) {
        params.showStartTime = this.$bqUtils.dateFormat(new Date(params.showStartTime), 'yyyy-MM-dd')
      }
      if (params.showEndTime) {
        params.showEndTime = this.$bqUtils.dateFormat(new Date(params.showEndTime), 'yyyy-MM-dd')
      }
      let res = await this.BannerService.getBannerList(params)
      this.listData = res.list
      this.total = res.total
    },
    getIntro(val) {
      this.search.industryId = val
      this.search.industryName = val
    },
    searchList() {
      this.search.page = 1
      this.init()
    },
    handleCurrentChange(page) {
      this.search.page = page
      this.init()
    },
    operateBanner(tag, item) {
      this.controlTag = tag
      this.linkDialogVisible = true
      if (tag === 1) {
        // 跳转编辑
      } else if (tag === 2) {
        this.getId = item.programId
        // 开启关闭操作
        if (item.isShow === 1) {
          this.statusTag = 0
          this.dialogTitle = '你确定要关闭该Banner吗？'
          this.dialogContent = '一旦关闭，该Banner即使在显示时间范围内也不会再显示。'
        }
        if (item.isShow === 0) {
          this.statusTag = 1
          this.dialogTitle = '你确定要开启该Banner吗？'
          this.dialogContent = '一旦开启，该Banner将会按照显示时间进行显示。'
        }
      } else if (tag === 3) {
        this.statusTag = item.programId
        this.dialogTitle = '你确定要删除该Banner吗？'
        this.dialogContent = '一旦删除，该Banner将不会再显示,并且不会再恢复。'
      }
    },
    handleClose() {
      this.linkDialogVisible = false
    },
    async postSure() {
      this.linkDialogVisible = false
      if (this.controlTag === 3) {
        // 删除操作
        await this.BannerService.deleteBanner({programId: this.statusTag})
      } else if (this.controlTag === 2) {
        // 更新开启关闭操作 操作类型 0:关闭;1:开启
        let params = {
          programId: this.getId,
          operatorType: this.statusTag
        }
        await this.BannerService.updateBannerStatus(params)
      }
      this.init()
    },
    getStatus(type) {
      switch (type) {
        case -1:
          return '全部'
        case 0:
          return '关闭中'
        case 1:
          return '开启中'
      }
    }
  }
}
</script>
<style lang="scss">
  .yc-banner {
    .search-model {
      .el-input__inner {
        width: 224px;
      }
    }
    .sel-model {
      .el-input {
        width: 120px;
      }
      .el-input__inner {
        width: 120px;
      }
    }
    .el-dialog {
      &__body {
        .dialog-title {
          padding-left: 30px;
          font-size: 14px;
          height: 14px;
          margin-bottom: 20px;
          color: #333;
        }
        p {
          padding-left: 30px;
          font-size: 14px;
          height: 14px;
          line-height: 24px;
          margin-bottom: 20px;
          color: #333;
        }
      }
    }
    .el-form-item__label {
      padding-right: 0;
    }
    &-list {
      background-color: #FFF;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
      li {
        border-bottom: 1px solid #F2F2F2;
        overflow: hidden;
        position: relative;
        padding: 20px 20px 11px 425px;
        &:last-child {
          border-bottom: 0px;
        }
        .img{
          position: absolute;
          top: 20px;
          left: 19px;
          width: 375px;
          height: 120px;
          img {
            display: block;
            width: 375px;
            height: 130px;
            display: inline-block;
            background-size:100%;
            background-color: #D8D8D8;
          }
        }
        .content {
          border-bottom: 1px dashed #F2F2F2;
          padding-bottom: 20px;
          > span {
            display: inline-block;
            font-size: 14px;
            margin-right: 50px;
            margin-top: 15px;
            word-break: break-all;
            &[notop] {
              margin-top: 10px;
            }
            &[bigmargin] {
              margin-right: 100px;
            }
            i {
              cursor: pointer;
              font-size: 14px;
            }
          }
        }
        .footer {
         text-align: right;
         margin-top: 10px;
        }
      }
    }
  }
</style>
