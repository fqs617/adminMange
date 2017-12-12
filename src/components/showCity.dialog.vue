<template>
  <el-dialog
    custom-class="yc-show-city"
    title="查看已选城市"
    :visible.sync="currentVal"
    size="tiny"
    :modal-append-to-body="false">
    <div class="show-city-content">
      <ul v-for="(item, index) in infoList" :key="'pro' + index">
        <li class="province">{{ item.provinceName }}</li>
        <div class="city-content">
          <li v-for="(cItem, cIndex) in item.cityList" :key="'city' + cIndex">{{ cItem.cityName }}</li>
        </div>
      </ul>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'yc-show-city',
  data() {
    return {
      currentVal: this.value || false
    }
  },
  props: {
    value: {},
    info: null
  },
  mounted() {
  },
  computed: {
    infoList() {
      return this.info
    }
  },
  watch: {
    currentVal(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.currentVal = val
    }
  },
  methods: {
    closeDialog () {
      this.currentVal = false
    }
  },
  components: {
  }
}
</script>
<style lang="scss">
  .yc-show-city {
    width: 800px;
    height: 500px;
    .show-city-content {
      height: 400px;
      padding: 10px 30px;
      overflow: scroll;
    }
    ul {
      border-bottom: 1px solid #E5E5E5;
      margin-bottom: 20px;
      padding-left: 30px;
      .city-content {
        width: 530px;
        display: inline-block;
      }
      li {
        display: inline-block;
        width: 88px;
        padding-bottom: 20px;
        font-size: 14px;
        color: #666;
      }
      .province {
        width: 108px;
        height: 100%;
        color: #333;
        float: left;
      }
    }
  }
</style>
