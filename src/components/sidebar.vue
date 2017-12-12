<template>
  <div class="yc-sidebar">
    <el-menu :default-active="selected" :unique-opened="true" @select="select">
      <el-submenu v-if="item.child"  :index="'m' + index" v-for="(item, index) in menus" :key="'menu' + index">
        <template slot="title"><i class="yc-sidebar-icon" v-if="item.icon" :class="[item.icon]"></i>{{ item.text }}</template>
        <el-menu-item  v-for="(child, cIndex) in item.child"
          :index="child.url || 'child' + index + '-' + cIndex"
          :key="'ycCMenu' + index + '-' + cIndex">
           <span>{{ child.text }}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="item.url || 'm' + index">
        <i class="yc-sidebar-icon" v-if="item.icon" :class="[item.icon]"></i>{{ item.text }}
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import menu from '@/data/menu.json'
export default {
  name: 'yc-sidebar',
  data() {
    return {
      menus: menu,
      selected: 'm0'
    }
  },
  created() {
    this.initSelected(this.$route)
  },
  methods: {
    select(index) {
      console.log('SELECT', index)
      if (index.indexOf('template') !== -1) {
        $('a').attr('href', index).attr('target', '_blank')[0].click()
        return
      }
      this.selected = index
      this.$router.push(index)
    },
    // 初始化选中状态
    initSelected(to) {
      let {meta, path} = to
      if (meta && meta.isMenu) {
        this.selected = path
      }
    }
  },
  watch: {
    $route(to) {
      this.initSelected(to)
    }
  }
}
</script>
<style lang="scss">
  @import  'scss/variables.scss';
  @import  'scss/mixin.scss';
  $bj: #fff;
  %icon{
    i.yc-sidebar-icon {
      color: $primary;
    }
  }
  .yc-sidebar {
    position: fixed;
    left: 0;
    top: $header-height;
    width: $side-bar-width;
    bottom: 0;
    background-color:  $bj;
    z-index: 102;
    overflow-x: hidden;
    .el-menu {
      background-color:  $bj;
      // 默认状态菜单栏修改
      &-item, .el-submenu__title {
        color: #505050;
        padding-left: 30px;
        height: 40px;
        line-height: 40px;
        i.yc-sidebar-icon {
          padding-left: 15px;
          padding-right: 10px;
          font-size: 12px;
          color: #BDBDBD;
        }
        // 因为财务管理 比较小点 对这两个图标的 字体大小 在做设置
        i.yc-icon-caiwu {
          padding-left: 13px;
          font-size: 15px;
        }
        // 选中状态
        &.is-active {
          background: #E5EFFC;
          color: $primary;
          position: relative;
          @extend %icon;
          &:after {
            content: "";
            height: 100%;
            width: 4px;
            position: absolute;
            top: 0;
            left: 0;
            background-color: $primary;
          }
        }
      }
      .el-submenu {
        // 打开子菜单
        &.is-active {
          .el-submenu__title {
            color: $primary;
          }
          @extend %icon;
        }
        // 右边的箭头
        // .el-submenu__icon-arrow {
        //   display: none;
        // }
        > .el-menu {
          li.el-menu-item {
            font-size: 12px;
            span {
              padding-left: 17px;
            }
          }
        }
      }
    }
  }
</style>
