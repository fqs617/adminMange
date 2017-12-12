<template>
  <div class="yc-account-authority">
    <div class="yc-account__block" v-for="(item,index) in menuList" :key="index">
      <div class="title">{{item.menuName}}</div>
      <div>
        <div class="yc-account__checkbox-group" v-for="(childitem,childindex) in item.subMenuList" :key="childindex">
          <el-checkbox v-model="childitem.checked" :checked="childitem.checked" :disabled="true">{{childitem.menuName}}</el-checkbox>
          <el-checkbox v-for="(pageitem,pageindex) in childitem.subMenuList" :key="pageindex" :disabled="true" v-model="pageitem.checked" :checked="pageitem.checked">{{pageitem.menuName}}</el-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuList: [] // 菜单信息数组
    }
  },
  computed: {
  },
  props: {
    baseMenuList: {}, // 基础菜单数据
    selMenuIds: {} // 选中的菜单id集合
  },
  mounted() {
    this.createShowMenuList(this.selMenuIds)
  },
  methods: {
    // 获取无重复数据
    getNoEcho(ids) {
      if (!ids) {
        return []
      }
      let newArray = []
      let idsArray = ids.split(',')
      idsArray.forEach(item => {
        let ishave = newArray.some(newItem => {
          if (newItem === item) {
            return true
          }
          return false
        })
        if (!ishave) {
          newArray.push(item)
        }
      })
      return newArray
    },
    // 生成显示数组
    createShowMenuList(ids) {
      let selIdsArry = this.getNoEcho(ids)
      this.menuList = this.baseMenuList.map(item => {

        if (this.getIsHaveSelMenu(selIdsArry, item.menuId)) {
          item.checked = true
        } else {
          item.checked = false
        }
        if (item.subMenuList) {
          item.subMenuList = this.selMenuList(item.subMenuList, selIdsArry)
        }
        return item
      })
    },
    // 递归获取菜单选中
    selMenuList(menuList, selIds) {
      let dt = menuList.map(item => {
        if (this.getIsHaveSelMenu(selIds, item.menuId)) {
          item.checked = true
        } else {
          item.checked = false
        }
        if (item.subMenuList) {
          item.subMenuList = this.selMenuList(item.subMenuList, selIds)
        }
        return item
      })
      return dt
    },
    // 获取是否拥有该选中节点
    getIsHaveSelMenu(selArray, id) {
      let ishave = selArray.some(item => {
        if (id * 1 === item * 1) {
          return true
        }
        return false
      })
      return ishave
    }
  },
  watch: {
    selMenuIds(val) {
      this.createShowMenuList(val)
    }
  }
}
</script>
<style lang="scss">
  .yc-account-authority {
    .yc-account__block {
      padding-left: 30px;
      display: flex;
      border-bottom: 1px dashed #CCCCCC;
      padding-bottom: 30px;
      padding-top: 30px;
      &:last-child {
        border-bottom: 0px;
      }
      .title {
        min-width: 60px;
        font-size: 14px;
        color: #333333;
        margin-right: 30px;
        padding-top: 15px;
      }
    }
    .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
      background-color: #2788EA;
      border-color: rgb(1, 125, 249);
    }
    .el-checkbox__input.is-disabled + .el-checkbox__label {
      color: #999;
    }
    .smiltxt {
      .el-checkbox__label {
        font-size: 12px;
      }
    }
  }
</style>
