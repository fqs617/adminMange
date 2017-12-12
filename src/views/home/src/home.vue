<template>
  <div>
    <!-- <yc-table-one></yc-table-one>
    <yc-table-two></yc-table-two>
    <yc-table-three></yc-table-three>
    <yc-table-four></yc-table-four> -->
    欢迎登录云采运营管理后台!
  </div>
</template>
<script>
import TableOne from './table/table.one.vue'
import TableTwo from './table/table.two.vue'
import TableThree from './table/table.three.vue'
import TableFour from './table/table.four.vue'

export default {
  data() {
    return {
      title: 'say hello'
    }
  },
  methods: {},
  components: {
    ycTableOne: TableOne,
    ycTableTwo: TableTwo,
    ycTableThree: TableThree,
    ycTableFour: TableFour
  }
}

</script>
