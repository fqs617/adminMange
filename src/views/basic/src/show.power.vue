<template>
  <yc-page class="yc-page-showpower">
    <el-row v-if="!isAdd" class="role-info" >
      <el-col :span="7">云采{{seller?'卖家':'后台'}}角色ID：123 </el-col>
      <el-col :span="7">云采{{seller?'卖家':'后台'}}角色名称：账务</el-col>
      <el-col :span="10">创建时间：2017-01-01 00:00:00</el-col>
    </el-row>
    <el-form  label-width="200px">
      <el-form-item v-if="isAdd" :label="seller?'云采卖家角色名称：':'云采后台角色名称:'" required prop="rolename">
        <yc-form-item-content tip="不得超过10个字，名称不得与已有角色名称重复">
          <el-input v-model="ruleForm.rolename" placeholder="输入角色名称"></el-input>
        </yc-form-item-content>
      </el-form-item>
      <el-form-item :label="isAdd ? '选择操作权限:' : '角色权限明细:'" required class="group-wrap">
        <div class="group-item">
          <auth-list :auth_list="authority" v-if="authListShow" v-on:changeAuth="changeAuth"></auth-list>
        </div>
      </el-form-item>
      <yc-card-footer class="btn-bar" v-if="isAdd">
        <el-button size="large" @click="cancel()">取消</el-button>
        <el-button size="large" type="info" @click="onSubmit()">保存</el-button>
      </yc-card-footer>
    </el-form>
  </yc-page>
</template>
<script>
import ShowService from '@/services/show.power.service'
export default {
  data() {
    return {
      seller: false,
      isAdd: null,
      authority: [],
      authListShow: false,
      ruleForm: {
        rolename: ''
      }
    }
  },
  mounted() {
    let {add, type} = this.$route.params
    this.isAdd = add === 'true'
    this.seller = type === '0'
  },
  created() {
    this.ShowService = new ShowService()
    this.init()
  },
  methods: {
    async init() {
      let self = this
      let param = {}
      console.log(this.$route.params.type)
      if (this.$route.params.type === '0') {
        param.pro = 'yuncai'
      } else {
        param.pro = 'yuncaihoutai'
      }
      let res = await self.ShowService.getAuth(param)
      self.info = res
      let _authority = res.authority
      for (let i = 0; i < _authority.length; i++) {
        let _allselect = 1
        for (let j = 0; j < _authority[i].subMenu.length; j++) {
          for (let k = 0; k < _authority[i].subMenu[j].subMenu.length; k++) {
            if (_authority[i].subMenu[j].subMenu[k].selected === 2) {
              _authority[i].subMenu[j].selected = 2
            }
          }
          if (_authority[i].subMenu[j].selected === 2) {
            _allselect = 2
          }
        }
        _authority[i].selectall = _allselect
      }
      self.authority = _authority
      self.authListShow = true
    },
    changeAuth(auth) {
      this.authority = auth
    },
    async onSubmit() {
      let reg = /^[\u4e00-\u9fa5]{1,10}$/
      if (!this.ruleForm.rolename) {
        this.$message({
          showClose: true,
          message: '请输入角色名称',
          type: 'warning'
        })
        return
      }
      if (!reg.test(this.ruleForm.rolename)) {
        this.$message({
          showClose: true,
          message: '请输入正确的角色名称',
          type: 'warning'
        })
        return
      }
      let params = {
        roleName: this.ruleForm.rolenam
      }
      let _auth = this.machParams()
      params.authority = JSON.stringify(_auth)
      // let res = await this.ShowService.SaveSellerAuth(params)
      if (this.$route.params.type === '0') {
        this.$router.push('/basic/list/' + this.$route.params.type)
      } else {
        this.$router.push('/basic/list')
      }
      // console.log(res)
    },
    machParams () {
      let self = this
      let _authlist = self.authority
      let _auth = {}
      for (let i = 0; i < _authlist.length; i++) {
        let _selected = 2
        for (let j = 0; j < _authlist[i].subMenu.length; j++) {
          _authlist[i].subMenu[j].selected = 2
          let testArr = []
          let x = 0
          for (let k = 0; k < _authlist[i].subMenu[j].subMenu.length; k++) {
            delete _authlist[i].subMenu[j].subMenu[k].menuName
            if (_authlist[i].subMenu[j].subMenu[k].selected === 1) {
              _authlist[i].subMenu[j].selected = 1
            }
            if (k !== 0) {
              testArr[x] = _authlist[i].subMenu[j].subMenu[k]
              x++
            }
          }
          if (_authlist[i].subMenu[j].subMenu[0]) {
            _authlist[i].subMenu[j].subMenu = testArr
          }
          _selected = 1
        }
        _authlist[i].selected = _selected
        delete _authlist[i].selectall
        delete _authlist[i].menuName
      }
      _auth.authority = _authlist
      return _auth
    },
    cancel(formName) {
      this.$refs[formName].resetFields()
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">
.yc-page-showpower {
  color: #333;
  .role-info {
    background: #F2F2F2;
    font-size: 14px;
    line-height: 30px;
    padding: 20px 0;
  }
  .el-form {
    padding: 28px 0;
  }
  .el-form-item__label {
    color: #000;
    font-size: 16px;
    line-height: 16px;
  }
  .group {
    &-item {;
      padding: 19px 0 12px 36px;
      margin: 0 20px;
      border-bottom: 1px dashed #ccc;
      .el-checkbox {
        line-height: 30px;
        margin: 0;
        padding-right: 30px;
        &__label {
          line-height: 14px;
          font-size: 14px;
          color: #666;
        }
      }
      .el-form-item__label {
        font-size: 14px;
        line-height: 14px;
        letter-spacing: 0.53px;
        color: #333;
      }
    }
    &-wrap {
      margin-bottom: 0;
      .el-form-item__content {
        margin-left: 0!important;
        padding-top: 30px;
      }
      .group-item__label {
        display: inline-block;
        width: 142px;
        text-align: right;
        padding-right: 20px;
        box-sizing: border-box;
      }
      .group-item {
        .el-checkbox-group {
          padding-left: 144px;
        }
      }
      .el-form-item__error {
        margin-left: 200px;
      }
    }
  }
  .btn-bar {
    background: transparent;
    border-top: none;
    margin-top: 0;
  }
}
</style>
