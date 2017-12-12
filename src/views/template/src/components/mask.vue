<!-- 组件选中状态 -->
<template>
  <div class="yc-module-mask"
    @click="onClick">
      <i class="choose tl"></i>
      <i class="choose tr"></i>
      <i class="choose bl"></i>
      <i class="choose br"></i>
      <div class="buttons" v-if="type !== 'Header' && type !== 'Banner'">
        <el-button type="text" icon="arrow-up" @click="onOpt($event, 'up')"></el-button>
        <el-button type="text" icon="delete" @click="onOpt($event, 'del')"></el-button>
        <el-button type="text" icon="arrow-down" @click="onOpt($event, 'down')"></el-button>
      </div>
  </div>
</template>
<script>
// import Clickoutside from 'element-ui/src/utils/clickoutside'
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'yc-module-mask',
  data() {
    return {
      active: false,
      elIndex: -1
    }
  },
  props: {
    type: String
  },
  mounted() {
    this.elIndex = $(this.$el).parent().data('index')
  },
  computed: {
    ...mapGetters({
      getTemplateInfo: 'getTemplateInfo'
    })
  },
  methods: {
    ...mapMutations({
      del: 'DELETE_TEMPLATE_MODULE',
      select: 'UPDATE_TEMPLATE_SELECTED',
      move: 'MOVE_TEMPLATE_MODLES',
      updateTabs: 'UPDATE_TEMPLATE_TABS'
    }),
    onMove(from, to) {
      // 因为是做 交换 所以去的地方 还是当前模块所以模块是当前
      let currentModule = this.getTemplateInfo.modules[from]
      this.move({
        to: to,
        from: from
      })
      let params = {}
      params.type = currentModule.type
      params.index = to
      this.select(params)
    },
    onClick() {
      let params = {}
      params.type = this.type
      params.index = this.elIndex
      console.log('MASK SELECT onClick', params)
      this.select(params)
    },
    onOpt(e, type) {
      e.preventDefault()
      switch (type) {
        case 'up':
          this.onMove(this.elIndex, Math.max(this.elIndex - 1, 0))
          break
        case 'del':
          this.onDel()
          break
        case 'down':
          this.onMove(this.elIndex, Math.min(this.elIndex + 1, this.getTemplateInfo.modules.length - 1))
          break
      }
      e.stopPropagation()
    },
    onDel() {
      this.$confirm('此操作将永久删除该模块, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let lastIndex = Math.max(this.elIndex - 1, -1)
        let lastModule = this.getTemplateInfo.modules[lastIndex]
        let params = {}
        params.type = lastIndex === -1 ? 'Header' : lastModule.type
        params.index = lastIndex
        this.del(this.elIndex)
        // 如果去区块 清楚时 需清楚 template.tab 中记录的数据
        if (this.type === '3') {
          this.updateTabs([])
        }
        this.select(params)
      })
    }
  }
}
</script>

<style lang="scss">
  $component-select: #EE6723;
  $theme: #2788EA;
  // 通用点击状态
  .yc-module-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: -1.5px;
    bottom: 0;
    right: 0;
    z-index: 20;
    &.active {
      display: block;
      border: 1px solid $component-select;
      i.choose {
        display: block;
      }

      .buttons {
        display: flex;
      }
    }
    &.is-error {
      width: calc(100% + 15px);
      left: -10px;
      border: 3px solid #FF0000;
      i.choose {
        display: none;
      }
    }

    i.choose {
      display: none;
      position: absolute;
      width: 5px;
      height: 5px;
      background: #FFF;
      border: 1px solid $component-select;
      border-radius: 50%;
      overflow: hidden;
      &.tl {
        top: -3px;
        left: -3px;
      }
      &.tr {
        top: -3px;
        right: -3px;
      }
      &.bl {
        bottom: -3px;
        left: -3px;
      }
      &.br {
        bottom: -3px;
        right: -3px;
      }
    }

    .buttons {
      cursor: default;
      display: none;
      position: absolute;
      top: 50%;
      // bottom: 4px;
      right: -41px;
      width: 40px;
      height: 100px;
      transform: translateY(-50%);
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: #778390;
      .el-button + .el-button {
        margin: 0;
      }
      .el-button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        &--text {
          color: #ffffff;
          opacity: 0.8;
          i {
            font-size: 16px;
          }
        }
        &:hover {
          opacity: 0.5;
        }
      }
    }
  }
</style>
