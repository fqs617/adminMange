import AreaDisplay from './area.display.vue'
import IndexSettingSingleGroupService from '@/services/index.setting.single.group.service'
export default {
  components: {
    'bq-area-display': AreaDisplay
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
  data() {
    let validateFn = {
      provinceList: (rule, data, callback) => {
        if (data.provinceList.length < 1) {
          callback(new Error('请选择地区'))
          return
        }
        callback()
      },
      backgroundValue: (rule, value, callback) => {
        if (value === null) {
          callback(new Error('请选择专区背景'))
          return
        }
        callback()
      },
      programName: (rule, data, callback) => {
        if (typeof (data) === 'string' && !data.replace(/(^\s*)|(\s*$)/g, '')) {
          callback(new Error('请输入单栏专区名称'))
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
      subTitle: (rule, value, callback) => {
        if (typeof (value) === 'string' && !value.replace(/(^\s*)|(\s*$)/g, '')) {
          callback(new Error('请输入主标题名称'))
          return
        }
        if (!this.$bqUtils.isColor(this.ruleForm.subTitleColor)) {
          callback(new Error('请输入/选择正确的颜色值'))
          return
        }
        callback()
      },
      mainTitle: (rule, value, callback) => {
        if (typeof (value) === 'string' && !value.replace(/(^\s*)|(\s*$)/g, '')) {
          callback(new Error('请输入副标题名称'))
          return
        }
        if (!this.$bqUtils.isColor(this.ruleForm.mainTitleColor)) {
          callback(new Error('请输入/选择正确的颜色值'))
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
        backgroundType: 1,
        backgroundValue: null,
        programPic: null,
        mainTitleName: null,
        mainTitleColor: '#000',
        subTitleName: null,
        subTitleColor: '#000',
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
      rules: {
        regionObj: [
          {validator: validateFn.provinceList, trigger: 'change'}
        ],
        industryId: [
          {type: 'number', min: 0, required: true, message: '请选择一个行业', trigger: 'change'}
        ],
        programName: [
          {required: true, message: '请输入单栏专区名称', trigger: 'blur'},
          {max: 100, message: '单栏专区名称不得超过100个字', trigger: 'blur'},
          {validator: validateFn.programName, trigger: 'blur'}
        ],
        backgroundValue: [
          {validator: validateFn.backgroundValue, trigger: 'change'}
        ],
        programPic: [
          {required: true, message: '请选择图片', trigger: 'blur'}
        ],
        mainTitleName: [
          {required: true, message: '请输入主标题名称', trigger: 'blur'},
          {max: 5, message: '主标题最多不得超过5个字', trigger: 'blur'},
          {validator: validateFn.mainTitle, trigger: 'blur'}
        ],
        subTitleName: [
          {required: true, message: '请输入副标题名称', trigger: 'blur'},
          {max: 8, message: '副标题名称不得超过7个字', trigger: 'blur'},
          {validator: validateFn.subTitle, trigger: 'blur'}
        ],
        linkDesc: [
          {required: true, message: '请选择链接', trigger: 'change'}
        ],
        sortValue: [
          {required: true, message: '请输入排序值', trigger: 'blur'},
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
      single: null,
      areaBgOptions: [
        {
          label: '颜色背景',
          value: 1
        }, {
          label: '图片背景',
          value: 2
        }
      ],
      add: false,
      tag: false, // 判断编辑第一次是背景图片的回显内容
      imgTag: 0,
      regionInfo: [],
      regionAccount: 2
    }
  },
  created() {
    this.IndexSettingSingleGroupService = new IndexSettingSingleGroupService()
    this.initPage()
  },
  methods: {
    getRegions(val) {
      this.ruleForm.regionObj.provinceList = val
    },
    selectIndustry(val) {
      if (val && val.industryName) {
        this.ruleForm.industryName = val.industryName
        this.ruleForm.regionObj.provinceList = []
        this.$refs.bannerCitys.getBannerCitysList(val.industryId)
      }
    },
    onLinkConfirm(val) {
      this.ruleForm.linkType = val.linkType
      this.ruleForm.linkValue = val.linkValue
      this.ruleForm.linkDesc = val.linkDesc
      this.selectData = val
    },
    onImgConfirm(val) {
      if (this.imgTag === 8) {
        this.ruleForm.backgroundValue = val
        return
      }
      if (this.imgTag === 7) {
        this.ruleForm.programPic = val
      }
    },
    showImgDialog(val) {
      this.imgTag = val
      this.imgVisible = true
    },
    deleteValue() {
      if (!this.tag) {
        this.ruleForm.backgroundValue = null
      }
      this.tag = false
    },
    async initPage() {
      this.single = this.$route.params.type === '0'
      this.add = this.$route.path.match('edit') === null
      let programId = this.$route.params.programId
      let res
      if (programId !== undefined) {
        if (this.single) {
          res = await this.IndexSettingSingleGroupService.getProgramEdit({programId}, 'single')
        } else {
          res = await this.IndexSettingSingleGroupService.getProgramEdit({programId}, 'group')
        }
        if (res.sortValue) {
          res.sortValue = res.sortValue.toString()
        }
        if (res.showStartTime) {
          res.showStartTime = new Date(res.showStartTime)
        }
        if (res.showEndTime) {
          res.showEndTime = new Date(res.showEndTime)
        }
        this.ruleForm = res
        this.selectData.linkType = this.ruleForm.linkType
        this.selectData.linkValue = this.ruleForm.linkValue
        this.selectData.linkDesc = this.ruleForm.linkDesc
        this.regionInfo = this.ruleForm.regionObj.provinceList
        this.$refs.bannerCitys.getBannerCitysList(this.ruleForm.industryId)
        if (this.ruleForm.backgroundType === 2) {
          this.tag = true
        }
      }
    },
    onSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let params = this.$bqUtils.copy(this.ruleForm)
          params.showStartTime = this.$bqUtils.dateFormat(params.showStartTime, 'yyyy-MM-dd hh:mm:ss')
          params.showEndTime = this.$bqUtils.dateFormat(params.showEndTime, 'yyyy-MM-dd hh:mm:ss')
          if (this.$route.params.programId) {
            params.programId = this.$route.params.programId
          }
          if (this.single) {
            await this.IndexSettingSingleGroupService.addProgramEdit(params, 'single')
            this.$router.push('/index/list/0')
          } else {
            await this.IndexSettingSingleGroupService.addProgramEdit(params, 'group')
            this.$router.push('/index/group/')
          }
        } else {
          return false
        }
      })
    }
  },
  watch: {
    '$route': 'initPage'
  }
}
