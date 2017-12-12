<template>
  <yc-page class="brand-list">
    <template slot="buttons">
      <el-button type="info" @click="$router.push(`/brand/add`)">新增品牌分类专区</el-button>
    </template>
    <yc-page-header>
      <el-form :inline="true" :model="search">
        <el-form-item label="按条件筛选:">
          <el-input v-model="params.parameter" placeholder="输入品牌分类名称" class="choose"></el-input>
        </el-form-item>
        <el-form-item label="创建时间:" class="choose-time">
          <el-date-picker type="date" placeholder="开始时间" v-model="params.createStartTime"></el-date-picker>
          <el-date-picker type="date" placeholder="结束时间" v-model="params.createEndTime" ></el-date-picker>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="params.status" placeholder="全部">
            <el-option v-for="item in status_list" :key="item.type" :label="item.status" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属行业:">
          <yc-industry @getChangeIntro="getIntro" v-model="search.industryName"></yc-industry>
        </el-form-item>
        <el-form-item label="所属地区:">
          <!-- <yc-region class="choose" @getChangeregion="changeRegion" v-model="region" :getRegion="newregion"></yc-region> -->
        </el-form-item>
        <el-form-item>
          <el-button @click="onSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </yc-page-header>
    <div class="content">
      <div class="item" v-for="item in dataList">
        <yc-brand-show :info="dataList"></yc-brand-show>
        <div class="text">
          <span>所属地区：{{ item.region }}</span>
          <span>所属行业：{{ item.industryName }}</span>
          <span>创建时间：{{ item.createTime }}</span>
          <span>状态：{{ item.status }}</span>
        </div>
        <el-button @click="edit(1)">编辑</el-button>
        <el-button @click="operation(item.brandId, 1)">关闭</el-button>
        <el-button @click="operation(item.brandId, 3)">删除</el-button>
      </div>
    </div>
    <yc-pagination v-model="page1"></yc-pagination>
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
        <el-button type="info" size="large" @click="sure(flagTag)">确定</el-button>
      </yc-card-footer>
    </el-dialog>
  </yc-page>
</template>
<script>
import BrandService from '@/services/brand.services'
export default {
  data() {
    return {
      search: {
        industryId: '',
        industryName: ''
      },
      dataList: [],
      flagTag: '',
      brandsId: '',
      page1: 2,
      linkDialogVisible: false,
      dialogTitle: '',
      dialogContent: '',
      statusList: [{
        status: '全部',
        type: -1
      }, {
        status: '开启中',
        type: 0
      }, {
        status: '关闭中',
        type: 1
      }],
      region: '',
      newregion: [],
      params: {
        page: 1,
        size: 15,
        parameter: '',
        provinceId: '',
        cityId: '',
        industryId: '',
        status: '',
        createStartTime: '',
        createEndTime: ''
      }
    }
  },
  created() {
    this.BrandService = new BrandService()
    this.init()
    this.getIntro()
    this.changeRegion()
  },
  methods: {
    getIntro(val) {
      this.search.industryId = val
      this.search.industryName = val
    },
    changeRegion(val) {
      console.log(val)
      this.region = val
    },
    async init() {
      let self = this
      let param = {}
      let res = await self.BrandService.brandList(param)
      self.dataList = res
    },
    async onSearch() {
      let self = this
      if (self.search.industryId) {
        self.params.industryId = self.search.industryId
      }
      await self.BrandService.brandList(self.params)
    },
    edit(brandId) {
      this.$router.push('/brand/add/' + brandId)
    },
    handleClose() {
      this.linkDialogVisible = false
    },
    async sure(flagTag) {
      let self = this
      self.linkDialogVisible = false
      if (flagTag === 1 || flagTag === 2) {
        let param = {
          brandId: self.brandsId,
          status: flagTag
        }
        await self.BrandService.updateStatus(param)
      }
      if (flagTag === 3) {
        await self.BrandService.deleteBrand({brandId: self.brandsId})
      }
    },
    operation(id, tag) {
      this.brandsId = id
      this.linkDialogVisible = true
      if (tag === 1) {
        this.flagTag = 1
        this.dialogTitle = '你确定要关闭该品牌分类专区吗？'
        this.dialogContent = '一旦关闭，该品牌分类专区即使在显示时间范围内也不会再显示。'
      }
      if (tag === 2) {
        this.flagTag = 0
        this.dialogTitle = '你确定要开启该品牌分类专区吗？'
        this.dialogContent = '一旦开启，该品牌分类专区将会按照显示时间进行显示。'
      }
      if (tag === 3) {
        this.flagTag = 3
        this.dialogTitle = '你确定要删除该品牌分类专区吗？'
        this.dialogContent = '一旦删除，该品牌分类专区将不会再显示，并且不会再恢复。'
      }
    }
  }
}
</script>
<style lang="scss">
  .brand-list {
    .yc-page-search .el-form .el-input__inner {
      font-size: 12px;
      width: 80px;
      border-radius: 1px;
    }
    .el-input__icon + .el-input__inner {
      padding: 0;
      padding-left: 10px;
    }
    .yc-page-search .el-form .choose .el-input__inner {
      width: 200px;
      text-align: center;
      line-height: 26px;
    }
    .yc-page-search .el-form .choose-time .el-input__inner {
      width: 110px;
    }
    .el-date-editor.el-input {
      width: 110px;
    }
    .el-cascader__label{
      line-height: 26px;
    }
    .content {
      text-align: center;
      .item {
        background: #fff;
        display: inline-block;
        text-align: center;
        margin: 35px;
        box-shadow: 0 0 4px 0 rgba(0,0,0,0.10);
        .text {
          width: 417px;
          background: #F2F2F2;
          text-align: left;
          padding: 15px 0 6px 0;
          span {
            padding-left: 20px;
            padding-bottom: 10px;
            display: inline-block;
          }
          span:nth-of-type(odd){
            width: 180px;
          }
        }
        .el-button--default {
          border-color: #2788EA;
          padding: 9px 26px;
          margin: 20px 5px;
          span {
            font-size: 14px;
            color: #2788EA;
          }
        }
      }
      .yc-brand-show ul {
        margin-left: 20px;
      }
    }
    .el-dialog--tiny {
      min-width: 455px;
    }
    .dialog-title {
      font-size: 14px;
      margin: 20px 0 20px 5px;
    }
    .dialog-content {
      font-size: 14px;
      margin: 0 0 20px 5px;
    }
  }
</style>
