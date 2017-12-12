<template>
  <yc-page class="demo">
    <img src="../../../assets/img/l.gif"/>
    <h1>demo beiquan </h1>
    <el-button @click="onAlert">默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="text">文字按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <div class="test">
    </div>
    <br>
    <br>
    <el-form :form="form">
      <el-form-item prop="sel">
        <el-row>
          <el-col :span="6">
            <el-select v-model="form.sel" @change="onSel">
              <el-option :value="1">111</el-option>
              <el-option :value="2">2</el-option>
              <el-option :value="3">3</el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-input v-if="form.sel == 1"></el-input>
            <el-radio-group v-if="form.sel == 2" v-model="form.radio2">
              <el-radio :label="3">备选项</el-radio>
              <el-radio :label="6">备选项</el-radio>
              <el-radio :label="9">备选项</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-dialog
      title="提示"
      :visible.sync="linkDialogVisible"
      size="tiny"
      :modal-append-to-body = "false">
      <span>这是一段信息</span>
      <yc-card-footer slot="footer" class="dialog-footer">
        <el-button size="large" @click="linkDialogVisible = false">取消</el-button>
        <el-button type="info" size="large" @click="linkDialogVisible = false">保存</el-button>
      </yc-card-footer>
    </el-dialog>
  </yc-page>
</template>
<script>
export default {
  data() {
    return {
      title: 'say hello',
      linkDialogVisible: false,
      form: {
        sel: ''
      }
    }
  },
  methods: {
    onSel(val) {
      console.log(val)
      if (val === 3) {
        this.linkDialogVisible = true
      }
    },
    onAlert() {
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import 'scss/variables.scss';
  .demo {
    font-family: $font-family-base;
    font-size: 14px;
    // .test{
    //   border: 1px solid red;
    //   width: 150px;
    //   height: 22px;
    //   display: inline-block;
    //   line-height: 22px;
    //   position: relative;
    // }
    // .test:after{
    //   content: "";
    //   position: absolute;
    //   width: 18px;
    //   height: 18px;
    //   background: url(../../../assets/img/my-select.png) no-repeat;
    //   background-size: 18px;
    //   top:3px;
    //   left: 3px;
    // }
  }
</style>
