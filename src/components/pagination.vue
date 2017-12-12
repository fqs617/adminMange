<template>
  <div class="yc-pagination">
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="curPage"
      :page-sizes="pageSizes"
      :page-size="curSize"
      :layout="layout"
      :total="total">
    </el-pagination>
    <p>每页显示{{ curSize }}条  共计{{ total }}条记录</p>
  </div>
</template>
<script>
export default {
  name: 'yc-pagination',
  data() {
    return {
      curPage: this.value,
      curSize: this.pageSize
    }
  },
  props: {
    layout: {
      type: String,
      default: 'prev, pager, next'
    },
    total: {
      type: Number,
      default: 1000
    },
    pageSize: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default: () => [20, 50, 100, 200]
    },
    value: {}
  },
  watch: {
    value(val) {
      this.curPage = val
    },
    curPage(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    handleSizeChange(val) {
      this.curSize = val
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>
<style lang="scss">
  @import 'scss/variables.scss';
  @import 'scss/mixin.scss';
  %border {
    border: 1px solid #EBEBEB;
    border-radius: 4px;
  }
  .yc-pagination {
    width: 100%;
    min-height: 28px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .el-pagination {
      width: auto;
      margin-bottom: 10px;
      .btn-prev {
        margin-right: 12px;
        @extend %border;
        color: #64D9F2;
      }
      .el-pager {
        li {
          margin-right: 6px;
          @extend %border;
          &.active {
            background-color: $primary-light;
            border: 1px solid $primary-light;
          }
        }
      }
      .btn-next {
        margin-left: 6px;
        @extend %border;
        color: #64D9F2;
      }

      &__sizes {
        .el-input__inner {
          @extend %border;
        }
      }
    }
    p {
      width: auto;
      height: 20px;
      line-height: 20px;
      margin: 0 auto;
      text-align: center;
      font-size: 12px;
      color: #999999;
      letter-spacing: 0;
    }
  }
</style>
