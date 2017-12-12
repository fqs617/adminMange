<template>
  <ul class="yc-template-config__valid">
    <li v-for="(item, index) in msgs" :key="'msg' + index">
      <i class="el-icon-information"></i> {{ item }}
    </li>
  </ul>
</template>
<script>
  export default {
    props: {
      msgs: {
        type: Array,
        default: () => []
      }
    }
  }
</script>
