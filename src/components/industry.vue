<template>
  <el-select v-model="currentValue" placeholder="选择行业" @change="onChange">
    <el-option
      v-for="item in list"
      :key="item.industryId"
      :label="item.industryName"
      :value="item.industryId">
    </el-option>
  </el-select>
</template>
<script>
import CommonService from '@/services/common.service'
export default {
  name: 'yc-industry',
  data () {
    return {
      list: [],
      currentValue: this.value
    }
  },
  props: {
    value: {}
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
    currentValue(val) {
      this.$emit('input', val)
    }
  },
  created() {
    this.CommonService = new CommonService()
    this.init()
  },
  methods: {
    async init() {
      this.list = await this.CommonService.getIndustryList()
      if (this.list.length > 0) {
        this.list.unshift({industryId: -1, industryName: '选择行业'})
      }
    },
    onChange(val) {
      this.$emit('selectIndustry', this.list.filter(item => item.industryId === val)[0])
    }
  }
}
</script>
