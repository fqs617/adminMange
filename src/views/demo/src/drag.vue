<template>
  <yc-page class="demo-drag">
    <h2>Draggable</h2>
    <draggable v-model="list"
    :element="'ul'"
    :options="{group:{ name:'people',  pull:'clone', put:false }}">
      <li v-for="(element, index) in list" :key="index"> {{element.name}}</li>
    </draggable>
    <h2>selected</h2>
    {{ list }}
  </yc-page>
</template>
<script>
const draggable = () => import('vuedraggable')
const list = [
  {name: '11'},
  {name: '22'},
  {name: '33'},
  {name: '44'},
  {name: '55'},
  {name: '66'},
  {name: '77'}
]
export default {
  data() {
    return {
      list: list
    }
  },
  components: {
    draggable
  }
}
</script>
<style lang="scss">
  .demo-drag {
    ul {
     li {
       height: 44px;
       line-height: 44px;
       border: 1px solid red;
       background-color: cadetblue;
       margin-top: 10px;
       cursor: move;
     }
    }

  }
</style>
