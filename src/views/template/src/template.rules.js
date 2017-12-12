
// 页面信息设置
export const headerRules = {
  topicName: {required: true, max: 30, message: '专题名称必填,长度不得超过30个字'},
  cacheBgColor: [
    {
      validator(rule, value, callback, source) {
        if (source.backgroundType === 0 && !value) {
          callback(new Error('专题背景的颜色值不能为空哦！'))
          return
        }
        if (source.backgroundType === 0 && !(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value))) {
          callback(new Error('专题背景的颜色值不对哦'))
          return
        }
        callback()
      },
      trigger: 'blur'
    }
  ],
  backgroundValue: [
    { required: true, message: '图片背景必须选择图片' }
  ],
  wechatShareTitle: { required: true, message: '微信分享标题必须填写' },
  wechatShareProfile: { required: true, message: '微信分享简介必须填写' },
  wechatSharePic: { required: true, message: '微信分享图片必须填写' }
}

// 区块 顶部导航数据验证
export const tabsTopNavbarRules = {
  cacheDefaultBgColor: {
    validator(rule, value, callback, source) {
      if (source.navbarStatus === 0 && source.navbarType === 0 && !value) {
        callback(new Error('区块顶部导航默认状态的背景颜色值不能为空哦！'))
        return
      }
      if (source.navbarStatus === 0 && source.navbarType === 0 && !(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value))) {
        callback(new Error('区块顶部导航默认状态的背景颜色值不对哦！'))
        return
      }
      callback()
    },
    trigger: 'blur'
  },
  navbarDefaultFontColor: {
    validator(rule, value, callback, source) {
      if (source.navbarStatus === 0 && !value) {
        callback(new Error('区块顶部导航默认状态的文字颜色值不能为空哦！'))
        return
      }
      if (source.navbarStatus === 0 && !(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value))) {
        callback(new Error('区块顶部导航默认状态的文字颜色值不对哦！'))
        return
      }
      callback()
    },
    trigger: 'blur'
  },
  cacheFocusBgColor: {
    validator(rule, value, callback, source) {
      if (source.navbarStatus === 0 && source.navbarType === 0 && !value) {
        callback(new Error('区块顶部导航选择状态的背景颜色值不能为空哦！'))
        return
      }
      if (source.navbarStatus === 0 && source.navbarType === 0 && !(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value))) {
        callback(new Error('区块顶部导航选择状态的背景颜色值不对哦！'))
        return
      }
      callback()
    },
    trigger: 'blur'
  },
  navbarFocusFontColor: {
    validator(rule, value, callback, source) {
      if (source.navbarStatus === 0 && !value) {
        callback(new Error('区块顶部导航选择状态的文字颜色值不能为空哦！'))
        return
      }
      if (source.navbarStatus === 0 && !(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value))) {
        callback(new Error('区块顶部导航选择状态的文字颜色值不对哦！'))
        return
      }
      callback()
    },
    trigger: 'blur'
  },
  navbarDefaultBackground: {required: true, message: '区块顶部导航默认背景必须填哦'},
  navbarFocusBackground: {required: true, message: '区块顶部导航选中背景必须填哦'}
}

// 横排单列大图广告位
export const singleRules = {
  modulesDetailList: {
    type: 'array',
    fields: {
      0: {
        type: 'object',
        fields: {
          imgUrl: {required: true, message: '横排单列广告位的图片未选择'},
          linkValue: {required: true, message: '横排单列广告位的连接未选择'}
        }
      }
    }
  }
}

// 横排单列大图广告位
export const doubleRules = {
  modulesDetailList: {
    type: 'array',
    fields: {
      0: {
        type: 'object',
        fields: {
          imgUrl: {required: true, message: '横排两列广告位左侧的图片未选择'},
          linkValue: {required: true, message: '横排两列广告位左侧的连接未选择'}
        }
      },
      1: {
        type: 'object',
        fields: {
          imgUrl: {required: true, message: '横排两列广告位右侧的图片未选择'},
          linkValue: {required: true, message: '横排两列广告位右侧的连接未选择'}
        }
      }
    }
  }
}

// 区块
export const tabsRules = {
  cacheBgColor: {
    validator(rule, value, callback, source) {
      if (source.moduleBackgroundType === 0 && !value) {
        callback(new Error('区块标题背景的颜色值不能为空哦！'))
        return
      }
      if (source.moduleBackgroundType === 0 && !(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value))) {
        callback(new Error('区块标题背景的颜色值不对哦！'))
        return
      }
      callback()
    },
    trigger: 'blur'
  },
  moduleTitleFontColor: {
    validator(rule, value, callback) {
      if (!value) {
        callback(new Error('区块标题文字的颜色值不能为空哦！'))
        return
      }
      if (!(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value))) {
        callback(new Error('区块标题文字的颜色值不对哦！'))
        return
      }
      callback()
    },
    trigger: 'blur'
  },
  moduleBackgroundValue: { required: true, message: '图片背景必须选择图片' },
  modulesDetailList: [
    {
      type: 'array',
      validator(rule, value, callback) {
        let len = value.length
        if (len <= 0 || len >= 6) {
          callback('一个专题区块组件最少需要添加一个最多允许添加5个区块')
          return
        }
        let errors = []
        value.forEach(item => {
          let title = item.title
          let titleLen = title.length
          if (titleLen <= 0 || titleLen > 6) {
            errors.push(`区块【${title}】名称长度必须在1-6个字符`)
          }
          // 商品数量判断
          let goodsLen = item.extendList.length
          if (goodsLen <= 0 || goodsLen > 20) {
            errors.push(`区块【${title}】商品sku 只能添加1到20个商品`)
          }
        })
        callback(errors)
      }
    }
  ]
}
