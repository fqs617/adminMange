<template>
  <li class="yc-template-phone__modules-item" >
    <components :is="getComponent"></components>
    <slot></slot>
  </li>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      selected: 'getTemplateSelected'
    }),
    getComponent() {
      return `ycModules${this.type}`
    }
  },
  props: {
    type: String
  },
  components: {
    'ycModules1': () => import('./modules/single.column.vue'),
    'ycModules2': () => import('./modules/double.column.vue'),
    'ycModules3': () => import('./modules/tabs.vue')
  }
}
</script>
<style lang="scss">
  .yc-template-phone__modules-item {
    cursor: move;
  }
  .yc-template-phone__modules {
    .component-sortable-ghost.yc-template-components__item {
      img {
        width: 100%;
        height: 80px;
      }
      span {
        display: none;
      }
    }
  }
</style>
