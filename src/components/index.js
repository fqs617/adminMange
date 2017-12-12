import Base from './base.vue'
import Header from './header.vue'
import Content from './content.vue'
import Sidebar from './sidebar.vue'
import Body from './body.vue'
import Page from './page.vue'
import PageHeader from './page.header.vue'
import Pagination from './pagination.vue'
import UploadPaper from './upload.paper.vue'
import BrandShow from './brand.show.vue'
import ImgSelect from './img.select'
import LinkSelect from './link.select'
import SkuSelect from './sku.select'
import Sku from './link.select/src/sku'
import AuthList from './authlist.vue'
import Regions from './regions.vue'
import Industry from './industry.vue'
import CateSelect from './cate.select'
import ColorSelect from './color.select'
import RegionSelect from './regions.select'
import ShowCityDialog from './showCity.dialog'

const components = [
  Base,
  Header,
  Content,
  Sidebar,
  Body,
  Page,
  PageHeader,
  Pagination,
  UploadPaper,
  BrandShow,
  ImgSelect,
  LinkSelect,
  SkuSelect,
  Sku,
  AuthList,
  Industry,
  CateSelect,
  Regions,
  ColorSelect,
  RegionSelect,
  ShowCityDialog
]
const install = (Vue) => {
  if (install.installed) {
    return
  }
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.$$loadingImgSrc = Vue.prototype.$$loadingImgSrc = 'http://static.js.bqmart.cn/static/img/l.gif'

}
export default {
  install
}
