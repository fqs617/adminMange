import Vue from 'vue'
import Router from 'vue-router'
import AuthRouter from '@/utils/auth.router'
import App from '@/views/app.vue'
import demoRouter from '@/views/demo'
import homeRouter from '@/views/home'
// import merchantRouter from '@/views/merchant'
import LoginRouter from '@/views/login'
// import BasicRouter from '@/views/basic'
// import accountRouter from '@/views/account'
import topicRouter from '@/views/topic'
import homeConfigRouter from '@/views/home.config'
// import brandRouter from '@/views/brand'
import templateRouter from '@/views/template'

Vue.use(Router)

let routes = []

// 根路由
let rootRoutr = {
  path: '/',
  component: App,
  children: [],
  meta: {
    requiresAuth: false
    // title: '首页'
  }
}
// 重定向路由
let redirectRoute = {
  path: '*',
  redirect: '/'
}

demoRouter(rootRoutr.children)
homeRouter(rootRoutr.children)
// merchantRouter(rootRoutr.children)
LoginRouter(routes)
// BasicRouter(rootRoutr.children)
// accountRouter(rootRoutr.children)
homeConfigRouter(rootRoutr.children)
topicRouter(rootRoutr.children)
// brandRouter(rootRoutr.children)
templateRouter(routes)

let authRouter = new AuthRouter()
let authRouters = authRouter.init(routes.concat([rootRoutr, redirectRoute]))

// 暂时不做路由区分
let mode = 'history'
export default new Router({
  mode: mode,
  routes: authRouters
})
