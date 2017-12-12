export default {
  // 专题id
  basic: {
    // 专题id
    topicId: '',
    // 行业id
    industryId: '',
    // 省id
    provinceId: '',
    // 市id
    cityId: '',
    // 专题名称
    topicName: '',
    // 专题背景类型 0：颜色，1：图片
    backgroundType: 0,
    // 专题背景展示方式,专题背景类型为图片时有值,0:首屏固定 1：横向纵向平铺
    backgroundShowType: 0,
    // 专题背景值 根据类型 可以是颜色以可以是背景
    backgroundValue: '#ffffff',
    // 微信分享标题
    wechatShareTitle: '',
    // 微信分享简介
    wechatShareProfile: '',
    // 微信分享图片
    wechatSharePic: '',
    // 备注
    remark: ''
  },
  // 主题banner
  banner: {
    // banner 主题
    bannerImgUrl: ''
  },
  // 区块配置
  tabs: {
    // 专题顶部导航状态 0：显示，1：不显示
    navbarStatus: 0,
    // 专题顶部导航类型 0：颜色，1：图片
    navbarType: 0,
    // 专题顶部导航默认背景 根据类型可以是图片 以可以是颜色
    navbarDefaultBackground: '#F8FBFF',
    // 专题顶部导航选中后背景
    navbarFocusBackground: '#FFFFFF',
    // 专题顶部导航默认字体颜色
    navbarDefaultFontColor: '#333333',
    // 专题顶部导航选中后字体颜色
    navbarFocusFontColor: '#333333'
  },
  // 单图
  single: {
    moduleType: 1,
    modulesDetailList: [
      {
        position: 0,
        imgUrl: '',
        linkType: 1,
        // 连接内容
        linkValue: {},
        // 模块明细链接描述
        linkDesc: ''
      }
    ]
  },
  // 模块组件定义
  modules: {
    // 模块id 编辑的时候有
    moduleId: 1,
    // 模块类型 0:区块，1：横排单列，2：横排双列
    moduleType: '',
    // 模块标题
    moduleTitle: '',
    // 模块标题字体颜色
    moduleTitleFontColor: '',
    // 模块标题背景类型 0：颜色，1：图片
    moduleBackgroundType: '',
    // 模块标题背景值
    moduleBackgroundValue: '',
    //  排序值
    sort: 0,
    // 模块内容 的非必填
    modulesDetailList: [
      {
        // 模块明细id
        moduleDetailId: '',
        // 模块明细位置 0:居中，1：横排双列，左侧,2：横排双列:右侧
        position: 0,
        // 模块明细图片
        imgUrl: '',
        // 模块明细链接类型 1: 专题;2:sku详情;3:分类;4:自定义链接'
        linkType: 1,
        // 连接内容
        linkValue: {},
        // 模块明细链接描述
        linkDesc: '',
        // 模块明细标题
        title: '',
        // 模块明细排序值
        sort: '',
        extendList: [
          {
            // 模块明细扩展数据id
            extendId: '',
            // 模块明细扩展数据
            extendedValue: '',
            sort: 0
          }
        ]
      }
    ]
  },
  // 验证
  rules: {
    // 是否通过验证 false 是未通过
    validateState: true,
    // 未通过的消息提示
    message: []
  }
}
