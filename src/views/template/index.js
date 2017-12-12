const Template = () => import('./src/template.vue')
export default function (router) {
  router.push({
    path: '/template',
    name: 'template',
    component: Template,
    meta: {
      isMenu: true,
      title: '云采专题页配置'
    }
  })

  router.push({
    path: '/template/:topicId',
    name: 'editTemplate',
    component: Template,
    meta: {
      isMenu: true,
      title: '编辑云采专题页配置'
    }
  })

}
