<template>
  <yc-page class="yc-banneradd">
    <el-card>
      <el-form class="yc-form yc-banneradd-content" ref="ruleForm" :rules="rules" :model="ruleForm" label-width="100px">
        <el-form-item label="所属行业:" class="industry" prop="industryId" required >
          <yc-form-item-content tip="必填项，必须选择一个行业">
            <yc-industry v-model="ruleForm.industryId" class="industry" @selectIndustry="selectIndustry"></yc-industry>
          </yc-form-item-content>
        </el-form-item>
        <el-form-item label="所在地区:" required prop="regionObj">
          <yc-form-item-content>
            <yc-region-select ref="bannerCitys" @getRegions="getRegions" :regionInfo="regionInfo"></yc-region-select>
          </yc-form-item-content>
        </el-form-item>
        <el-form-item label="Banner名称:" required prop="programName">
          <yc-form-item-content tip="必填项，不得超过100个字">
            <el-input  placeholder="请输入banner名称" v-model="ruleForm.programName" class="big-width"></el-input>
          </yc-form-item-content>
        </el-form-item>
        <el-form-item label="图片：" required prop="programPic">
          <yc-form-item-content tip="必填项，支持jpg、png、jpeg，大小不得超过2 M，建议图片大小尺寸为1125*390像素">
            <div class="img" @click="showImgDialog" :style="{backgroundImage: 'url('+ruleForm.programPic +')'}">{{ruleForm.programPic ==null?'选择图片':''}}</div>
          </yc-form-item-content>
        </el-form-item>
        <el-form-item label="链接：" required prop="linkDesc" class="sel-link">
          <el-button @click="showLinkDialog">选择链接</el-button>
          <span>已选择链接：{{ruleForm.linkDesc ||'暂未选择'}}</span>
        </el-form-item>
        <el-form-item label="排序值:" required prop="sortValue">
          <yc-form-item-content tip="必填项，数字越小排序越靠前，数据越大越靠后">
            <el-input large placeholder="请输入排序值" class="big-width" v-model="ruleForm.sortValue"></el-input>
          </yc-form-item-content>
        </el-form-item>
        <el-form-item label="状态：" required>
          <el-radio class="radio" v-model="ruleForm.isShow" :label="1">开启</el-radio>
          <el-radio class="radio" v-model="ruleForm.isShow" :label="0">关闭</el-radio>
        </el-form-item>
        <el-form-item label="显示时间：" required prop="showStartTime" inline-block>
          <el-date-picker type="datetime" placeholder="选择开始时间" v-model="ruleForm.showStartTime" :picker-options="pickerOptionsStartDate" :editable="false"></el-date-picker>
          <span class="big-size">至</span>&nbsp;&nbsp;
        </el-form-item>
        <el-form-item  prop="showEndTime" class="datetime" inline-block>
          <el-date-picker type="datetime" placeholder="选择结束时间" v-model="ruleForm.showEndTime" :picker-options="pickerOptionsEndDate" :editable="false" ></el-date-picker>
          <span tip>必填项，开始时间不能大于结束时间</span>
        </el-form-item>
      </el-form>
      <yc-card-footer>
        <el-button size="large" @click="cancel('ruleForm')">取消</el-button>
        <el-button type="info" size="large" @click="onSubmit('ruleForm')">保存</el-button>
      </yc-card-footer>
    </el-card>
    <yc-img-select v-model="imgVisible" @confirm="onImgConfirm" :type="type"></yc-img-select>
    <yc-link-select :selectData="selectData" v-model="linkVisible" @confirm="onLinkConfirm"></yc-link-select>
  </yc-page>
</template>
<script>
import BannerService from '@/services/banner.service'
export default {
  data() {
    let validateFn = {
      provinceList: (rule, data, callback) => {
        if (data.provinceList.length < 1) {
          console.log(11)
          callback(new Error('请选择地区'))
          return
        }
        callback()
      },
      programName: (rule, data, callback) => {
        if (typeof (data) === 'string' && !data.replace(/(^\s*)|(\s*$)/g, '')) {
          callback(new Error('请输入Banner名称'))
          return
        }
        callback()
      },
      programPic: (rule, value, callback) => {
        if (value === null) {
          callback(new Error('请选择图片'))
          return
        }
        callback()
      },
      sortValue: (rule, data, callback) => {
        let value = Number.parseInt(data)
        if (!this.$bqUtils.isInteger(data)) {
          callback(new Error('排序值仅限输入正整数'))
          return
        }
        if (value > 100) {
          callback(new Error('排序值仅限输入不超过100的正整数'))
          return
        }
        callback()
      },
      showStartTime: (rule, value, callback) => {
        if (this.ruleForm.showEndTime && value > this.ruleForm.showEndTime) {
          callback(new Error('结束时间不能小于开始时间'))
        } else {
          callback()
        }
      },
      showEndTime: (rule, value, callback) => {
        if (this.ruleForm.showStartTime && value < this.ruleForm.showStartTime) {
          callback(new Error('开始时间不能大于结束时间'))
        } else {
          callback()
        }
      }
    }
    return {
      ruleForm: {
        regionObj: {
          provinceList: []
        },
        region: null,
        industryId: null,
        industryName: null,
        programName: null,
        programPic: null,
        linkType: null,
        linkValue: null,
        linkDesc: null,
        sortValue: null,
        isShow: 1, // 状态默认开启
        showStartTime: null,
        showEndTime: null
      },
      selectData: {},
      imgVisible: false,
      linkVisible: false,
      regionAccount: 2,
      rules: {
        regionObj: [
          {validator: validateFn.provinceList, trigger: 'change'}
        ],
        industryId: [
          {type: 'number', min: 0, required: true, message: '请选择行业', trigger: 'change'}
        ],
        programPic: [
          {validator: validateFn.programPic, trigger: 'change'}
        ],
        programName: [
          {required: true, message: '请输入Banner名称', trigger: 'blur'},
          {max: 100, message: 'Banner名称不得超过100个字', trigger: 'blur'},
          {validator: validateFn.programName, trigger: 'blur'}
        ],
        linkDesc: [
          {required: true, message: '请选择链接', trigger: 'change'}
        ],
        sortValue: [
          {type: 'string', required: true, message: '请输入排序值', trigger: 'blur'},
          {validator: validateFn.sortValue, trigger: 'blur'}
        ],
        showStartTime: [
          {required: true, type: 'date', message: '请选择开始时间', trigger: 'change'},
          {validator: validateFn.showStartTime, trigger: 'change'}
        ],
        showEndTime: [
          {required: true, type: 'date', message: '请选择结束时间', trigger: 'change'},
          {validator: validateFn.showEndTime, trigger: 'change'}
        ]
      },
      dialogTitle: '',
      dialogContent: '',
      linkDialogVisible: false,
      page1: 1,
      listData: [],
      status_list: [
        { name: '全部', status: -1 },
        { name: '开启中', status: 1 },
        { name: '关闭中', status: 0 }
      ],
      programId: this.$route.params.id,
      type: 9,
      regionInfo: []
    }
  },
  computed: {
    pickerOptionsStartDate() {
      return {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    },
    pickerOptionsEndDate() {
      return {
        disabledDate: (time) => {
          return this.ruleForm.showStartTime > time
        }
      }
    }
  },
  created() {
    this.BannerService = new BannerService()
  },
  mounted() {
    if (this.programId) {
      this.editInit()
    }
  },
  methods: {
    async editInit() {
      // 编辑获取数据
      let params = {
        programId: this.programId
      }
      let res = await this.BannerService.editInit(params)
      this.ruleForm = res
      this.ruleForm.showStartTime = new Date(res.showStartTime)
      this.ruleForm.showEndTime = new Date(res.showEndTime)
      this.ruleForm.sortValue = (res.sortValue).toString()
      this.selectData.linkType = this.ruleForm.linkType
      this.selectData.linkValue = this.ruleForm.linkValue
      this.selectData.linkDesc = this.ruleForm.linkDesc
      this.regionInfo = this.ruleForm.regionObj.provinceList
      this.$refs.bannerCitys.getBannerCitysList(this.ruleForm.industryId)
    },
    selectIndustry(val) {
      if (val && val.industryName) {
        this.ruleForm.industryName = val.industryName
        this.ruleForm.regionObj.provinceList = []
        this.$refs.bannerCitys.getBannerCitysList(val.industryId)
      }
    },
    getRegions(val) {
      this.ruleForm.regionObj.provinceList = val
    },
    showImgDialog() {
      this.imgVisible = true
    },
    onLinkConfirm(val) {
      this.ruleForm.linkType = val.linkType
      this.ruleForm.linkValue = val.linkValue
      this.ruleForm.linkDesc = val.linkDesc
      this.selectData = val
    },
    onImgConfirm(val) {
      this.ruleForm.programPic = val
    },
    showLinkDialog() {
      this.linkVisible = true
    },
    cancel(formName) {
      this.$refs[formName].resetFields()
      this.$router.go(-1)
    },
    onSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let params = this.$bqUtils.copy(this.ruleForm)
          params.showStartTime = this.$bqUtils.dateFormat(params.showStartTime, 'yyyy-MM-dd hh:mm:ss')
          params.showEndTime = this.$bqUtils.dateFormat(params.showEndTime, 'yyyy-MM-dd hh:mm:ss')
          if (this.programId) {
            params.programId = this.programId
          }
          await this.BannerService.addBanner(params)
          this.$router.push('/banner/list')
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .yc-banneradd {
    .industry{
      display: block;
      .el-select{
        width: 300px;
      }
    }
    &-content {
      margin-left: 10%;
      .big-size {
        font-size: 14px;
      }
      .big-width {
        width: 300px;
      }
    }
    .img {
      display: flex;
      width: 375px;
      height: 130px;
      justify-content: center;
       line-height: 130px;
       background: #f2f2f2;
       background-position: center;
       background-size: 100% 100%;
       color: #666;
       font-size: 14px;
       text-align: center;
       cursor: pointer;
      .bigfont {
        > span {
          font-size: 14px;
        }
      }
    }
    .el-radio + .el-radio {
      margin-left: 40px;
    }
    .el-form-item[inline-block] {
      display: inline-block;
      &.select, &.datetime {
        .el-form-item__content {
          margin-left: -5px !important;
        }
      }
      [tip] {
        font-size: 14px;
        color: #999;
        margin-left: 12px;
      }
    }
    .region-model {
      .el-input{
        width: 145px;
      }
    }
    .sel-link {
      span {
        font-size: 14px;
      }
      button {
        width: 110px;
        margin-right: 20px;
        border: 1px solid #2788EA;
        span {
          color: #2788EA;
        }
      }
    }
  }
</style>
