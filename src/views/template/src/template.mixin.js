import AsyncValidator from 'async-validator'
const draggable = () => import('vuedraggable')
import {mapGetters, mapMutations} from 'vuex'
import TopicService from '@/services/topic.service'
import * as rules from './template.rules'
import {PAGE_INFO} from './model'
// 元组件区域配置
const COMPONENT_DRAG = {
  sort: false,
  delay: 10,
  group: { name: 'modules', pull: 'clone', put: false, revertClone: true },
  dataIdAttr: 'data-component-id',
  chosenClass: 'component-sortable-chosen',
  dragClass: 'component-sortable-drag',
  ghostClass: 'component-sortable-ghost'
}

// 手机可视区拖拽
const PHONE_DRAG = {
  group: { name: 'modules', pull: false, put: true },
  animation: 150,
  dataIdAttr: 'data-phone-id',
  chosenClass: 'phone-sortable-chosen',
  dragClass: 'phone-sortable-drag',
  ghostClass: 'phone-sortable-ghost'
}

export default {
  data() {
    return {
      componentsDrag: COMPONENT_DRAG,
      phoneDrag: PHONE_DRAG
    }
  },
  mounted() {
    this.TopicService = new TopicService()
    // 如果有就是编辑
    this.topicId = this.$route.params.topicId
    if (this.topicId) {
      this.parseParams()
    }
    this.$win = $(window)
    // this.$win.on('beforeunload', this.onExit)
  },
  computed: {
    ...mapGetters({
      template: 'getTemplateInfo'
    }),
    page() {
      return this.template.page
    }
  },
  beforeDestroy() {
    // this.$win.off('beforeunload', this.onExit)
  },
  methods: {
    ...mapMutations({
      updateInfo: 'SET_TEMPLATE_BASE_INFO',
      updateBanner: 'UPDATE_TEMPLATE_BANNER',
      updateModuleRules: 'UPDATE_TEMPLATE_VALID_RULES',
      select: 'UPDATE_TEMPLATE_SELECTED',
      updateTabs: 'UPDATE_TEMPLATE_TABS'
    }),
    onExit() {
      let msg = '要记得保存！你确定要离开我吗？'
      return msg
    },
    // 取消操作
    cancel() {
      window.close()
    },
    // 专题保存
    async onSave() {
      if (!this.headerValid() || !this.bannerVaild() || !this.modulesVaild()) {
        this.$message.warning('处理完错误后 再次保存红色消失')
        return
      }
      let topic = this.$bqUtils.copy(this.template)
      delete topic.page.rules
      delete topic.page.desc
      delete topic.banner.rules
      delete topic.banner.desc
      let params = {...topic.page, ...topic.banner}
      // 背景相关
      params.backgroundValue = params.backgroundType === 0 ? params.cacheBgColor : params.cacheBgImg
      delete params.cacheBgColor
      delete params.cacheBgImg

      // 顶部navtop
      let type = params.navbarType
      let isBgColor = type === 0
      params.navbarDefaultBackground = isBgColor ? params.cacheDefaultBgColor : params.cacheDefaultBgImg
      delete params.cacheDefaultBgColor
      delete params.cacheDefaultBgImg
      params.navbarFocusBackground = isBgColor ? params.cacheFocusBgColor : params.cacheFocusBgImg
      delete params.cacheFocusBgColor
      delete params.cacheFocusBgImg
      params.modulesList = topic.modules.map((item, index) => {
        let module = item.data
        module.sort = index
        // 如果是区块 进行赋值处理
        if (module.moduleType === 0) {
          module.moduleBackgroundValue = module.moduleBackgroundType === 0 ? module.cacheBgColor : module.cacheBgImg
          delete module.cacheBgColor
          delete module.cacheBgImg
          module.modulesDetailList.map((detail, detailIndex) => {
            detail.sort = detailIndex
            detail.extendList = detail.extendList.map((extend, exIndex) => {
              return {
                extendedValue: extend.sku,
                sort: exIndex
              }
            })
            return detail
          })
        }
        return module
      })
      this.select({
        type: 'Header',
        index: -1
      })
      await this.TopicService.save(params)
      window.close()
      // this.$confirm('专题保存成功是否需要前往专题列表页?', '提示', {
      //   confirmButtonText: '前往专题列表页',
      //   cancelButtonText: '留下来'
      // }).then(() => {
      //   window.location.replace('/topic/list')
      // })
    },
    headerValid() {
      let msg = this.validate(this.page, rules.headerRules)
      let isError = msg.length > 0
      this.updateInfo({
        rules: {
          validateState: !isError,
          message: msg
        }
      })
      this.select({
        type: 'Header',
        index: -1
      })
      return !isError
    },
    bannerVaild() {
      let bannerRule = {
        bannerImgUrl: {required: true, message: '专题主图Banner还未选择图片'}
      }
      let msg = this.validate(this.template.banner, bannerRule)
      let isError = msg.length > 0
      this.updateBanner({
        rules: {
          validateState: !isError,
          message: msg
        }
      })
      this.select({
        type: 'Banner',
        index: -2
      })
      return !isError
    },
    modulesVaild() {
      let modules = this.template.modules
      let isError = modules.every((item, index) => {
        let name = item.rules.name
        let type = item.type
        // 如果是区块 因为后台数据接口的原因 所以需要验证模块之外的数据
        if (type === '3') {
          let otherMsg = this.validate(this.page, rules.tabsTopNavbarRules, {})
          let isVaild = otherMsg.length > 0
          this.moduleValid(isVaild, otherMsg, type, index)
          if (isVaild) {
            return !isVaild
          }
        }
        // 验证具体的模块
        let message = this.validate(item.data, rules[name], {})
        let isVaild = message.length > 0
        this.moduleValid(isVaild, message, type, index)
        return !isVaild
      })
      return isError
    },
    // 模块验证处理
    moduleValid(isVaild, message, type, index) {
      this.updateModuleRules({
        index: index,
        rules: {
          validateState: !isVaild,
          message: message
        }
      })
      // 如果有错误 选中具体的模块配置
      if (isVaild) {
        this.select({
          type: type,
          index: index
        })
      }
    },
    validate(model, rules, opts = {firstFields: true}) {
      let message = []
      let validator = new AsyncValidator(rules)
      validator.validate(model, opts, (errors) => {
        if (errors) {
          message = errors.map(item => item.message)
        }
      })
      return message
    },
    // 从后台返回的专题数据 需要parse 转成前端识别的数据
    async parseParams() {
      let res = await this.TopicService.getByTopicId(this.topicId)
      this.setPageInfo(res)
      this.setBannerInfo(res.bannerImgUrl)
      this.setModuleInfo(res.modulesList)
    },
    // 编辑赋值page 信息
    setPageInfo(res) {
      let page = {}
      PAGE_INFO.forEach(key => {
        let val = res[key]
        page[key] = val
      })
      // 处理顶部导航背景值
      let type = page.navbarType
      let isBgColor = type === 0
      let dBg = page.navbarDefaultBackground
      let fBg = page.navbarFocusBackground
      page.cacheDefaultBgColor = isBgColor ? dBg : '#F8FBFF'
      page.cacheDefaultBgImg = !isBgColor ? dBg : ''
      page.cacheFocusBgColor = isBgColor ? fBg : '#F8FBFF'
      page.cacheFocusBgImg = !isBgColor ? fBg : ''

      // 背景相关
      let bgType = page.backgroundType
      let bg = page.backgroundValue
      page.cacheBgColor = bgType === 0 ? bg : '#ffffff'
      page.cacheBgImg = bgType === 1 ? bg : ''
      this.updateInfo(page)
    },
    // 赋值banner 信息
    setBannerInfo(bannerImgUrl) {
      this.updateBanner({
        bannerImgUrl: bannerImgUrl
      })
    },
    setModuleInfo(modules = []) {
      let nModules = modules.map(module => {
        let type = module.moduleType
        let baseModule = this.$bqUtils.copy(this.list.filter(item => item.data.moduleType === type)[0])
        // 如果去区块 对value 值进行处理 module.cacheBgColor : module.cacheBgImg
        if (module.moduleType === 0) {
          let bg = module.moduleBackgroundValue
          let type = module.moduleBackgroundType
          module.cacheBgColor = type === 0 ? bg : '#E8EFFF'
          module.cacheBgImg = type === 1 ? bg : ''
        }
        baseModule.data = module
        // 如果是区块 需要设置tabs info
        if (type === 0) {
          this.setTabsInfo(module.modulesDetailList)
        }
        return baseModule
      })
      this.updateModules(this.$bqUtils.copy(nModules))
    },
    setTabsInfo(tabs) {
      this.updateTabs(tabs)
    }
  },
  components: {
    draggable
  }
}
