<template>
  <common
    :seller="seller"
    :default-search="search"
    @updateSearch="updateSearch"></common>
</template>
<script>
import Common from './common.vue'
export default {
  components: {
    Common
  },
  data() {
    return {
      seller: true,
      search: {
        parameter: '',
        startTime: '',
        endTime: '',
        page: 1,
        size: 20
      }
    }
  },
  methods: {
    updateSearch(search) {
      this.search = search
    }
  }
}
</script>
