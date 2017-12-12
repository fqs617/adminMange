<template>
  <yc-page class="brand-add">
    <div class="brand-content">
      <div class="content">
        <div class="content-left">
          <el-form ref="form" :model="form">
            <el-form-item label="所属地区:" required class="address">
              <!-- <yc-region class="choose" @getChangeregion="changeRegion" v-model="region" :getRegion="newregion"></yc-region> -->
              <i>必选项，必须选择到具体的市</i>
            </el-form-item>
            <el-form-item label="所属行业:" required>
                <yc-industry @getChangeIntro="getIntro" v-model="form.industryName"></yc-industry>
              <i>必选项，必须选择一个行业</i>
            </el-form-item>
            <ul class="tableData ul1">
              <li id="header">
                <span>顺序</span>
                <span>名称</span>
                <span>图片</span>
                <span>链接</span>
              </li>
            </ul>
            <draggable v-model="tableData"
            class="tableData ul2"
            :element="'ul'"
            :options="{group:{ name:'people',  pull:'clone', put:false }}">
              <li v-for="item,index in tableData" :key="index">
                <span class="index">{{ index + 1 }}</span>
                {{item.detailList}}
                <span>
                  <input type="text" class="input-name" maxlength="4" placeholder="不得超过4个字" v-model="item.detailList.name">
                  <el-button class="text-color">
                    <!-- <i :style="{color: item.color}">字体颜色</i> -->
                    <i>字体颜色{{item.detailList.fontColor}}</i>
                    <el-color-picker v-model="item.detailList.fontColor"></el-color-picker>
                  </el-button>
                </span>
                <span>
                  <div class="img" @click="onImgSelect">
                    <span>选择图片</span>
                  </div>
                </span>
                <span>
                  <el-button class="sel-link" @click="onLink">选择链接</el-button>
                  <p class="tip">已选链接：暂未选择</p>
                  <!-- <p class="tip">专题页面：ID205</p> -->
                  <!-- <p class="tip">分类页面：分类名称>分类名称</p> -->
                  <!-- <p class="tip">SKU详情页－产品条码</p> -->
                  <!-- <p class="tip">自定义链接－URL地址</p> -->
                </span>
              </li>
            </draggable>
            <el-form-item label="状态:" required>
              <el-radio class="radio" v-model="form.name" label="1">开启</el-radio>
              <el-radio class="radio" v-model="form.name" label="2">关闭</el-radio>
            </el-form-item>
          </el-form>
        </div>
        <div class="content-right">
          <h1>特别说明：</h1>
          <p>名称：必填项，不得超过4个字；</p>
          <p>图片：必填项，支持jpg、png、jpeg、GIF；大小不得超过2M</p>
          <p>链接：必填项</p>
          <h1>效果展示：</h1>
          <yc-brand-show v-if="tableData.length > 0" :info="tableData"></yc-brand-show>
        </div>
      </div>
      <yc-card-footer>
        <el-button size="large">取消</el-button>
        <el-button type="info" size="large" @click="save">保存</el-button>
      </yc-card-footer>
    </div>
    <yc-img-select v-model="imgDialogVisible" @confirm="confirm"></yc-img-select>
    <yc-link-select v-model="linksDialogVisible" @confirm="confirm"></yc-link-select>
  </yc-page>
</template>
<script>
const draggable = () => import('vuedraggable')
export default {
  data() {
    return {
      form: {
        name: '',
        industryName: '',
        industryId: ''
      },
      imgDialogVisible: '',
      linksDialogVisible: false,
      name: '',
      tableData: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    getIntro(val) {
      this.form.industryId = val
      this.form.industryName = val
    },
    init() {
      let infoList =
        {
          brandId: '',
          createTime: '',
          region: '',
          industryName: '',
          status: '',
          detailList: {
            name: '',
            imgUrl: '',
            fontColor: '',
            linkType: '',
            linkDesc: ''
          }
        }
      this.tableData.push(infoList)
      console.log(infoList)
      for (let i = 0; i < 9; i++) {
        this.tableData.push(infoList)
      }
    },
    onLink() {
      this.linksDialogVisible = true
    },
    save() {
      // for (let i = 0; i < this.tableData.length; i++) {
      //   if (!this.tableData[i].name || !this.tableData[i].imgUrl || !this.tableData[i].linkUrl) {
      //   }
      // }
      this.$router.push('/brand/list')
    },
    onImgSelect() {
      this.imgDialogVisible = true
    },
    confirm(val) {
      console.log(val)
    }
  },
  components: {
    draggable
  }
}
</script>
<style lang="scss">
@import "brand.add.scss";
</style>
