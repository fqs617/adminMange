<template>
  <div>
    <div class="yc-t-config-tabs__item-add">
      <el-button type="info" class="btn-add-sku" @click="onAddSku()">添加SKU</el-button>
      <span>&nbsp;&nbsp;拖动进行商品排序</span>
    </div>
    <draggable
      v-model="currentValue"
      class="yc-t-config-tabs__goods"
      :element="'ul'"
      :options="draggableOpt">
      <li v-for="(item, index) in currentValue" :key="'goods' + index">
        <i class="del" @click="onDel(index)">
          <i class="el-icon-close"></i>
        </i>
        <div class="yc-t-config-tabs__goods__img">
          <img :src="item.defaultImage || $$loadingImgSrc">
        </div>
        <div class="yc-t-config-tabs__goods__desc">
          <h5>{{ item.goodsName }}</h5>
          <p class="content-desc-span">{{ item.spec }}  / {{ item.unit }}</p>
          <p>销量：{{ item.salesCount }}</p>
        </div>
      </li>
    </draggable>
    <yc-sku-select v-model="isSelectSku" @select="selectSku" :select="select" :firstTag="firstTag" :selectNumber="20">
    </yc-sku-select>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
const draggable = () => import('vuedraggable')
const DRAGGABLE_OPT = {
  scroll: true,
  // 距离多远开始滚动
  scrollSensitivity: 30,
  scrollSpeed: 10
}
export default {
  data() {
    return {
      firstTag: false,
      isSelectSku: false,
      draggableOpt: DRAGGABLE_OPT,
      // vuex 不允许直接修改
      currentValue: JSON.parse(JSON.stringify(this.list)),
      select: []
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    index: Number
  },
  watch: {
    list(val) {
      this.currentValue = this.$bqUtils.copy(val)
    },
    currentValue(val) {
      this.update({
        index: this.index,
        data: {extendList: val}
      })
    }
  },
  computed: {
    len() {
      return this.currentValue.length
    }
  },
  methods: {
    ...mapMutations({
      update: 'UPDATE_TEMPLATE_TAB'
    }),
    onAddSku() {
      if (this.len >= 20) {
        this.$notify.error('一个区块最多允许添加20个商品')
        return
      }
      this.select = this.currentValue
      this.firstTag = true
      this.isSelectSku = true
    },
    async onDel(index) {
      await this.$confirm('删除该商品后无法恢复, 是否继续?', '提示', {
        type: 'warning'
      })
      this.currentValue.splice(index, 1)
    },
    selectSku(val) {
      if (val.length > 20) {
        this.$notify.error('一个区块最多允许添加20个商品')
        return
      }
      this.currentValue = val
    }
  },
  components: {
    draggable
  }
}
</script>
