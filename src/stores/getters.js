export const getTemplateInfo = state => state.template
export const getTemplatePage = state => state.template.page
export const getTemplateSelected = state => state.template.selected
// 获取当前选中的模块
export const getTemplateCurrentModule = state => {
  let current = state.template.selected
  if (current.index === -1) {
    return state.template.page
  }
  if (current.index === -2) {
    return state.template.banner
  }
  return state.template.modules[current.index]
}

export const getTempateModules = state => state.template.modules

// 获取当前存储的区块配置
export const getTemplateTabs = state => state.templateTabs.tabs
export const getTemplateTabsSelected = state => state.templateTabs.selected
export const getTemplateCurrentTab = state => {
  let current = state.templateTabs.selected
  return state.templateTabs.tabs[current.index]
}
