<template>
  <div>
    <ul class="yc-img-select__list">
      <li class="active" v-for="index in 8" :key="index">
        <label v-if="list[index-1] && currentSelected === list[index-1]" class="yc-img-select__list-status-label">
          <i class="el-icon-check"></i>
        </label>
        <img @click="onSelected(list[index-1])" v-if="list[index-1]" :src="list[index-1].imgUrl">
      </li>
    </ul>
    <yc-pagination @handleCurrentChange="handleCurrentChange" :pageSize="params.size" :total="total"></yc-pagination>
  </div>
</template>
<script>
import SelectLinkService from '@/services/select.link.service'

export default {
  data() {
    return {
      list: [],
      // 当前选中
      currentSelected: -1,
      params: {
        type: 1,
        page: 1,
        size: 8
      },
      total: 0
    }
  },
  props: {
    value: {},
    type: null,
    activeName: ''
  },
  mounted() {
    this.SelectLinkService = new SelectLinkService()
  },
  watch: {
    'activeName'(val) {
      if (val === 'list') {
        this.getImageList()
      }
    }
  },
  methods: {
    handleCurrentChange(page) {
      this.params.page = page
      this.getImageList()
    },
    async getImageList() {
      this.params.type = this.type
      let res = await this.SelectLinkService.getImageList(this.params)
      this.list = res.list
      this.total = res.total
    },
    onSelected(item) {
      this.currentSelected = item
      this.$emit('input', item.imgUrl)
    }
  }
}
</script>
<style lang="scss">
  $border-color: #e2e2e2;
  .yc-img-select {
    &__list {
      border-right: 1px solid $border-color;
      border-bottom: 1px solid $border-color;
      height: 300px;
      overflow-y: auto;
      li {
        float: left;
        border: 1px solid $border-color;
        border-right: 0;
        border-bottom: 0;
        width: 25%;
        height: 150px;
        padding: 20px 10px;
        position: relative;
        box-sizing: border-box;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          background-color: #F2F2F2;
          cursor: pointer;
        }
      }

      &-status-label {
        position: absolute;
        right: -17px;
        top: -7px;
        width: 46px;
        height: 26px;
        text-align: center;
        transform: rotate(45deg);
        box-shadow: rgb(204, 204, 204) 0px 1px 1px;
        background: rgb(19, 206, 102);
        i {
          font-size: 12px;
          margin-top: 12px;
          transform: rotate(-45deg) scale(0.8);
          color: #fff;
        }
      }

    }
  }
</style>
