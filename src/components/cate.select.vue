<template>
  <div class="cate">
    <el-select v-model="cate1" placeholder="选择一级分类" @change="cate1Select">
      <el-option v-for="item in cateList1" :key="item.cateId" :label="item.cateName" :value="item.cateId">
      </el-option>
      </el-option>
    </el-select>
    <el-select v-model="cate2"  placeholder="选择二级分类" @change="cate2Select">
      <el-option v-for="item in cateList2" :key="item.cateId" :label="item.cateName" :value="item.cateId">
      </el-option>
      </el-option>
    </el-select>
  </div>
</template>
<script>
import SelectLinkService from '@/services/select.link.service'
export default {
  name: 'yc-cate-select',
  data() {
    return {
      cate1: '',
      cate2: '',
      cateName1: '',
      cateName2: '',
      cateList1: [],
      cateList2: [],
      tag: 0
    }
  },
  props: ['cateInfo'],
  created () {
    this.SelectLinkService = new SelectLinkService()
    this.cateList()
  },
  watch: {
    'cateInfo.cate1' (val) {
      if (val) {
        this.cate1 = this.cateInfo.cate1
      }
    }
  },
  methods: {
    changeCateName() {
      let cateObject1 = this.cateList1.find(item => item.cateId === this.cate1)
      let cateObject2 = this.cateList2.find(item => item.cateId === this.cate2)
      if (cateObject1 && cateObject1.cateName) {
        this.cateName1 = cateObject1.cateName
      }
      if (cateObject2 && cateObject2.cateName) {
        this.cateName2 = cateObject2.cateName
      }
      this.$emit('cateSelectFun', this.cate1, this.cate2, this.cateName1, this.cateName2)
    },
    async cateList () {
      let res = await this.SelectLinkService.getCateList({parentId: 0})
      this.cateList1 = res
      if (this.cateList1.length > 0) {
        this.cateList1.unshift({cateId: -1, cateName: '一级分类'})
      }
      this.changeCateName()
    },
    async cate1Select () {
      let res = await this.SelectLinkService.getCateList({parentId: this.cate1})
      this.cateList2 = res
      if (this.cateList2.length > 0) {
        this.cateList2.unshift({cateId: -1, cateName: '二级分类'})
      }
      this.cate2 = ''
      this.cateName2 = ''
      if (this.cateInfo && this.cateInfo.cate2) {
        this.cate2 = this.cateInfo.cate2
        this.cateInfo.cate2 = ''
      }
      this.changeCateName()
    },
    cate2Select () {
      this.changeCateName()
    }
  }
}
</script>
<style lang="scss">
  .cate {
  }
</style>
