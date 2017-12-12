import {template} from '@/base/router.base'
const TopicList = () => import('./src/topic.list.vue')
const TopicLook = () => import('./src/topic.look.vue')
const Template = () => import('../template/src/template.vue')
export default function (router) {
  const children = []
  router.push({
    path: '/topic',
    name: 'topic',
    component: template,
    children: children,
    meta: {
      isMenu: true,
      title: '专题配置'
    }
  })
  children.push({
    path: '/topic/new/template/:id',
    name: 'newtopic',
    component: Template,
    meta: {
      isMenu: true,
      title: '新增专题'
    }
  })
  children.push({
    path: '/topic/list',
    name: 'topiclist',
    component: TopicList,
    meta: {
      isMenu: true,
      title: '专题列表',
      keepAlive: true
    }
  })
  children.push({
    path: '/topic/look/:id',
    name: 'topiclook',
    component: TopicLook,
    meta: {
      isMenu: true,
      title: '查看商品'
    }
  })
}
