<template>
  <yc-page class="demo-card">
    <el-card>
      <el-form class="yc-form" ref="form" :model="form" label-width="100px">
        <el-form-item label="所在地区:" class="yc-form-item" required>
          <yc-regions :account="regionAccount" :getRegions="regionList" @getCurRegion="getCurRegion"></yc-regions>
        </el-form-item>
        <el-form-item label="所属行业:" required>
          <el-input v-model="form.name" placeholder="请选择一个行业"></el-input>
        </el-form-item>
        <el-form-item label="Banner名称:" required>
          <el-input v-model="form.name" placeholder="不得超过100个字"></el-input>
        </el-form-item>
        <el-form-item label="图片:" required>
          <yc-form-item-content tip="必填项，支持jpg、png、jpeg，大小不得超过2 M">
            <div class="img"></div>
          </yc-form-item-content>
        </el-form-item>
        <el-form-item label="链接:" required>
          <el-button @click="onLink">选择链接</el-button>
        </el-form-item>
        <el-form-item label="图片:" required>
          <el-button @click="onImgSelect">选择图片</el-button>
        </el-form-item>
        <el-form-item label="排序值:" required>
          <yc-form-item-content tip="结束时间时间小于开始时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" ></el-date-picker>至
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" ></el-date-picker>
          </yc-form-item-content>
        </el-form-item>
      </el-form>
      <yc-card-footer>
        <el-button size="large">取消</el-button>
        <el-button type="info" size="large">保存</el-button>
      </yc-card-footer>
      {{ name }}
    </el-card>
    <el-dialog
      custom-class="yc-d"
      title="提示"
      :visible.sync="linkDialogVisible"
      size="tiny"
      :modal-append-to-body = "false"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <yc-card-footer slot="footer" class="dialog-footer">
        <el-button size="large" @click="linkDialogVisible = false">取消</el-button>
        <el-button type="info" size="large" @click="linkDialogVisible = false">保存</el-button>
      </yc-card-footer>
    </el-dialog>
    <yc-img-select v-model="imgDialogVisible" @confirm="confirm"></yc-img-select>
    <yc-link-select v-model="linksDialogVisible" @confirm="confirm"></yc-link-select>
  </yc-page>
</template>
<script>
import TestService from '@/services/test.service'
export default {
  data() {
    return {
      linkDialogVisible: false,
      linksDialogVisible: false,
      imgDialogVisible: false,
      form: {
        region: '',
        region1: ''
      },
      name: '',
      regionList: {
        provinceId: '',
        cityId: '',
        districtId: '',
        countyId: ''
      },
      // 设置要显示的地区的级数
      regionAccount: 4
    }
  },
  async created() {
    this.TestService = new TestService()
    let res = await this.TestService.getHome()
    this.name = res.name
    this.regionList = {
      provinceId: 19,
      cityId: 32,
      districtId: 45
    }
  },
  activated() {
    this.name = new Date()
  },
  methods: {
    getCurRegion(val) {
      this.form.region = val
    },
    onSubmit() {
    },
    // onLink() {
    //   this.linkDialogVisible = true
    // },
    handleClose() {
      this.linkDialogVisible = false
    },
    onImgSelect() {
      this.imgDialogVisible = true
    },
    onLink() {
      this.linksDialogVisible = true
    },
    confirm(val) {
      console.log(val)
    }
  }
}
</script>
<style lang="scss">
  .demo-card {
    .img {
      width: 375px;
      height: 130px;
      background-color: #f2f2f2;
    }
    .yc-d {
      width: 500px;
    }
  }
</style>
