import {template} from '@/base/router.base'
import Demo from './src/demo.vue'
import Table from './src/table.vue'
import Card from './src/card.vue'
const Drag = () => import ('./src/drag.vue')
const Form = () => import ('./src/form.vue')
export default function(router) {
  const children = []
  router.push({
    path: '/demo',
    name: 'demo',
    component: template,
    children: children,
    meta: {
      isMenu: true,
      title: 'ui库'
    }
  })

  children.push({
    path: '/demo/button',
    name: 'button',
    component: Demo,
    meta: {
      isMenu: true,
      title: 'button'
    }
  })

  children.push({
    path: '/demo/table',
    name: 'table',
    component: Table,
    meta: {
      isMenu: true,
      title: 'table'
    }
  })

  children.push({
    path: '/demo/card',
    name: 'card',
    component: Card,
    meta: {
      isMenu: true,
      title: 'card',
      keepAlive: true
    }
  })

  children.push({
    path: '/demo/drag',
    name: 'drag',
    component: Drag,
    meta: {
      isMenu: true,
      title: '拖拽'
    }
  })

  children.push({
    path: '/demo/form',
    name: 'form',
    component: Form,
    meta: {
      isMenu: true,
      title: '表单'
    }
  })
}
