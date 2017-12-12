import {
  Pagination,
  Button,
  ButtonGroup,
  Loading,
  MessageBox,
  Notification,
  Message,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  DatePicker,
  TimePicker,
  TimeSelect,
  Table,
  TableColumn,
  Card,
  Tabs,
  TabPane,
  Tag,
  ColorPicker,
  Dialog,
  Autocomplete,
  Cascader,
  Upload,
  Collapse,
  CollapseItem
}
from 'element-ui'
import CollapseTransition from 'element-ui/src/transitions/collapse-transition'
import FromItemInput from './form.item'
import CardFooter from './card.footer'

const VERSION = '0.0.1'

const components = [
  Pagination,
  Button,
  ButtonGroup,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  DatePicker,
  TimePicker,
  TimeSelect,
  Table,
  TableColumn,
  Card,
  Tabs,
  TabPane,
  Tag,
  ColorPicker,
  Dialog,
  Autocomplete,
  Cascader,
  FromItemInput,
  CardFooter,
  Upload,
  Collapse,
  CollapseItem,
  CollapseTransition
]

const install = function(Vue, _opts = {}) {
  if (install.installed) return
  Vue.use(Loading.directive)

  components.map(component => {
    Vue.component(component.name, component)
  })

  Vue.$loading = Vue.prototype.$loading = Loading.service
  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
  Vue.$notify = Vue.prototype.$notify = Notification
  Vue.prototype.$message = Message

}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: VERSION,
  install
}
