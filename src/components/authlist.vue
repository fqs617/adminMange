<template>
  <div class="auth-list">
    <ul>
      <li v-for="item,index in auth">
        <h4>{{ item.menuName }}</h4>
        <div class="li" >
          <div class="select-auth">
            <span class="all-sel" :class="{ showmyprov: item.selectall === 1 }" @click="allSelect(index, item)">
              全选
            </span>
          </div>
          <div class="select-auth" v-for="indones,num in item.subMenu">
            <span class="all-sel" :class="{ showmyprov: indones.selected === 1 }" @click="partAllSelect(index, item, num, indones)">
              {{ indones.menuName }}
            </span>
            <span v-for="dones,num1 in indones.subMenu" :class="{ showmyprov: dones.selected === 1 }" @click="isSelect(index, num, indones, num1, dones)">
              {{dones.menuName}}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'auth-list',
  data () {
    return {
      info: {},
      auth: [],
      ssMenu: []
    }
  },
  props: ['auth_list'],
  mounted () {
    this.init()
  },
  computed: {
  },
  methods: {
    init () {
      this.auth = this.auth_list
    },
    allSelect (index, item) {
      let self = this
      if (item.selectall === 1) {
        self.auth[index].selectall = 2
        for (let i = 0; i < self.auth[index].subMenu.length; i++) {
          self.auth[index].subMenu[i].selected = 2
          for (let j = 0; j < self.auth[index].subMenu[i].subMenu.length; j++) {
            self.auth[index].subMenu[i].subMenu[j].selected = self.auth[index].subMenu[i].selected
          }
        }
      } else {
        self.auth[index].selectall = 1
        for (let j = 0; j < self.auth[index].subMenu.length; j++) {
          self.auth[index].subMenu[j].selected = 1
          for (let i = 0; i < self.auth[index].subMenu[j].subMenu.length; i++) {
            self.auth[index].subMenu[j].subMenu[i].selected = self.auth[index].subMenu[j].selected
          }
        }
      }
    },
    partAllSelect (index, item, num, indones) {
      let self = this
      if (indones.selected === 1) {
        self.auth[index].subMenu[num].selected = 2
        self.auth[index].selectall = 2
        for (let i = 0; i < self.auth[index].subMenu[num].subMenu.length; i++) {
          self.auth[index].subMenu[num].subMenu[i].selected = self.auth[index].subMenu[num].selected
        }
      } else {
        self.auth[index].subMenu[num].selected = 1
        for (let i = 0; i < self.auth[index].subMenu[num].subMenu.length; i++) {
          self.auth[index].subMenu[num].subMenu[i].selected = self.auth[index].subMenu[num].selected
        }
        let _allselect = 1
        for (let i = 0; i < self.auth[index].subMenu.length; i++) {
          if (self.auth[index].subMenu[i].selected === 2) {
            _allselect = 2
            return
          }
        }
        self.auth[index].selectall = _allselect
      }
    },
    isSelect (index, num, indones, num1, dones) {
      let self = this
      if (dones.selected === 1) {
        self.auth[index].subMenu[num].subMenu[num1].selected = 2
        self.auth[index].subMenu[num].selected = 2
        self.auth[index].selectall = 2
        // 页面查看不选，其他都不能选择
        if (self.auth[index].subMenu[num].subMenu[0].selected === 2) {
          for (let i = 0; i < self.auth[index].subMenu[num].subMenu.length; i++) {
            self.auth[index].subMenu[num].subMenu[i].selected = 2
          }
        }
      } else {
        self.auth[index].subMenu[num].subMenu[num1].selected = 1
        self.auth[index].subMenu[num].subMenu[0].selected = 1
        let _partallselect = 1
        // 判断三级权限是否全部选择
        for (let i = 0; i < self.auth[index].subMenu[num].subMenu.length; i++) {
          if (self.auth[index].subMenu[num].subMenu[i].selected === 2) {
            _partallselect = 2
            return
          }
        }
        self.auth[index].subMenu[num].selected = _partallselect
        let _allselect = 1
        // 判断二级权限是否全部选择
        for (let i = 0; i < self.auth[index].subMenu.length; i++) {
          if (self.auth[index].subMenu[i].selected === 2) {
            _allselect = 2
            return
          }
        }
        self.auth[index].selectall = _allselect
      }
    }
  },
  components: {
  },
  updated () {
    this.$emit('changeAuth', this.auth)
  }
}
</script>
<style lang="scss">
@import 'scss/variables.scss';
.auth-list{
  padding: 0 20px;
  font-size: 12px;
  // background: #fff;
  ul{
    display: block;
    width: 100%;
    li{
      width: 100%;
      border-bottom: 1px dashed #eaeaea;
      padding: 18px 0 0 40px;
      overflow: hidden;
      h4{
        font-size: 16px;
        letter-spacing: 0.52px;
        line-height: 16px;
        position: relative;
        text-align: right;
        color: #555;
        float: left;
        margin-right: 38px;
      }
      .li{
        overflow: hidden;
        position: relative;
        font-size: 14px;
        color: #666;
        // float: left;
        text-align: left;
        .select-auth{
          span{
            // width: 150px;
            margin-right: 30px;
            left: 0px;
            display: inline-block;
            height: 22px;
            line-height: 22px;
            padding-left: 20px;
            text-align: left;
            cursor: pointer;
            position: relative;
            margin-bottom: 15px;
          }
          .all-sel {
            color: #555;
            font-size: 15px;
          }
          span:after{
            content: "";
            position: absolute;
            width: 18px;
            height: 18px;
            background: url(../assets/img/my-noselect.png) no-repeat;
            background-size: 18px;
            top:2px;
            left: 0;
          }
          span.showmyprov:after{
            background: url(../assets/img/my-select.png) no-repeat;
            background-size: 18px;
          }
        }
      }
    }
  }
}
</style>
