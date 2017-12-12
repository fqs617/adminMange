<template>
  <yc-page class="topic">
  <div class="topic-con">
    <el-form class="yc-form" ref="form" :model="form" label-width="200px">
  <div class="topic-one">
      <el-form-item label="选择专题所属行业:" class="yc-form-item" required>
        <yc-form-item-content tip="非必选项，不选择表示适用于所有行业">
          <el-select v-model="form.region" placeholder="请选择行业">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </yc-form-item-content>
      </el-form-item>
        <el-form-item label="选择专题所属城市:" class="yc-form-item" required>
          <yc-form-item-content tip="非必选项，不选择表示适用于所有城市">
            <el-select v-model="form.region" placeholder="选择省">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select v-model="form.region1" placeholder="选择市">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </yc-form-item-content>
        </el-form-item>
        <el-form-item label="专题名称:" required>
          <yc-form-item-content tip="必填项，限30字内，该名称会展示在买家端专题页面的头部导航，请认真填写">
          <el-input v-model="form.name" placeholder="请选择行业"></el-input>
          </yc-form-item-content>
        </el-form-item>
  </div>
  <div class="topic-one">
    <el-form-item label="专题模版背景类型:" class="yc-form-item" required>
      <el-select v-model="bgValue" placeholder="颜色背景">
        <el-option label="颜色背景" value="1"></el-option>
        <el-option label="图片背景" value="2"></el-option>
      </el-select>
    </el-form-item>
    <div class="bg" v-if="bgValue === '1'">
      <el-form-item label="设置背景色:" class="yc-form-item">
        <el-color-picker v-model="color2"></el-color-picker>
      </el-form-item>
    </div>
    <div class="topic-pic"  v-if="bgValue === '2'">
      <span class="topic-title">设置背景图片：</span>
      <el-radio class="radio" v-model="radio" label="1">首屏固定</el-radio>
      <el-radio class="radio" v-model="radio" label="2">横向纵向平铺</el-radio>
      <div class="upload">
        <div class="topic-addpic">
          <img  alt="专题模版背景">
          <button type="button" name="button" class="upload-but" @click="onImgSelect">添加图片</button>
        </div>
      </div>
    </div>
  </div>
  <div class="topic-one">
    <div class="topic-pic">
      <span class="topic-title"><i class="promt">*</i>专题主图Banner：</span>
      <div class="upload">
        <div class="topic-addpic">
          <img  alt="专题主图Banner：">
          <button type="button" name="button" class="upload-but" @click="onImgSelect">添加图片</button>
        </div>
      </div>
    </div>
  </div>
  <div class="topic-one">
    <span class="topic-title topic-status">专题顶部导航设置：</span>
    <el-radio class="radio" v-model="radio" label="1">显示</el-radio>
    <el-radio class="radio" v-model="radio" label="2">不显示</el-radio>
    <div class="topic-pic">
      <el-form-item label="顶部导航背景和字体:" class="yc-form-item" required>
        <el-select v-model="NavValue" placeholder="颜色背景">
          <el-option label="颜色背景" value="1"></el-option>
          <el-option label="图片背景" value="2"></el-option>
        </el-select>
      </el-form-item>
      <div v-if="NavValue === '1'">
        <div class="block">
          <el-form-item label="默认背景色:" class="yc-form-item">
            <el-color-picker v-model="color2"></el-color-picker>
          </el-form-item>
          <el-form-item label="默认字体颜色:" class="yc-form-item">
            <el-color-picker v-model="color2"></el-color-picker>
          </el-form-item>
        </div>
        <div class="block">
          <el-form-item label="选中后背景色:" class="yc-form-item">
            <el-color-picker v-model="color2"></el-color-picker>
          </el-form-item>
          <el-form-item label="选中后字体颜色:" class="yc-form-item">
            <el-color-picker v-model="color2"></el-color-picker>
          </el-form-item>
        </div>
      </div>
      <div class="" v-if="NavValue === '2'">
        <div class="upload">
          <span class="topic-title">默认背景图：</span>
          <div class="topic-addpic">
            <img  alt="主图Banner广告位">
            <button type="button" name="button" class="upload-but" @click="onImgSelect">添加图片</button>
          </div>
          <span class="demonstration">默认字体颜色：</span>
          <el-color-picker v-model="color2"></el-color-picker>
        </div>
        <div class="upload">
          <span class="topic-title">选中后背景图：</span>
          <div class="topic-addpic">
            <img  alt="主图Banner广告位">
            <button type="button" name="button" class="upload-but" @click="onImgSelect">添加图片</button>
          </div>
          <span class="demonstration">选中后字体颜色：</span>
          <el-color-picker v-model="color2"></el-color-picker>
        </div>
      </div>
    </div>
  </div>
  <div class="topic-one">
    <el-form-item label="专题广告位添加:" class="yc-form-item" required>
      <el-select v-model="adValue" placeholder="请选择">
        <el-option label="横排单列广告位" value="1"></el-option>
        <el-option label="横排两列广告位" value="2"></el-option>
      </el-select>
        <el-button type="info" size="middle" @click="getAdd(adValue)">添加</el-button>
    </el-form-item>
    <div class="topic-pic">
      <div class="upload-ad">
        <span class="topic-title">已添加的广告位：</span>
        <ul class="topic-ad-pic">
          <li v-for="(item, index) in addList" :key="index">
            <div class="pic-li" :class="{'lone-pic':addVal==='1'}">
              <img alt="主图Banner广告位">
              <button type="button" name="button" class="upload-but" @click="onImgSelect">添加图片</button>
              <div class="select-link">
                <el-button>选择链接</el-button>
                <span class="select-text">暂未选择链接</span>
              </div>
            </div>
            <div class="pic-li" v-if="addVal==='2'">
              <img  alt="主图Banner广告位">
              <button type="button" name="button" class="upload-but" @click="onImgSelect">添加图片</button>
              <div class="select-link">
                <el-button>选择链接</el-button>
                <span class="select-text">暂未选择链接</span>
              </div>
            </div>
            <i></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="clear"></div>
  <div class="topic-one">
    <el-form-item label="专题区块添加:" class="yc-form-item" required>
        <el-input v-model="form.name" placeholder="输入区块名称" :maxlength="6"></el-input>
      <el-button type="info" size="middle" @click="linkDialogVisible = false">添加</el-button>
    </el-form-item>
    <hr style="height:1px;border:none;border-top:1px dashed #ccc;">
    <el-form-item label="区块标题背景和字体:" class="yc-form-item" required>
      <el-select v-model="titleValue" placeholder="请选择">
        <el-option label="颜色背景" value="1"></el-option>
        <el-option label="图片背景" value="2"></el-option>
      </el-select>
      <el-button type="info" size="middle" @click="linkDialogVisible = false">添加</el-button>
    </el-form-item>
    <div class="topic-pic border-bot">
      <div class="block" v-if="titleValue === '1'">
        <el-form-item label="区块标题背景色:" class="yc-form-item">
          <el-color-picker v-model="color2"></el-color-picker>
        </el-form-item>
        <el-form-item label="选中标题字体颜色:" class="yc-form-item">
          <el-color-picker v-model="color2"></el-color-picker>
        </el-form-item>
      </div>
      <div class="upload" v-if="titleValue === '2'">
        <span class="topic-title">默认背景图：</span>
        <div class="topic-addpic">
          <img  alt="专题魔板背景图片">
          <button type="button" name="button" class="upload-but" @click="onImgSelect">添加图片</button>
        </div>
        <span class="demonstration">区块字体颜色：</span>
        <el-color-picker v-model="color2"></el-color-picker>
      </div>
    </div>
    <div class="clear"></div>
    <div class="topic-pic topic-area">
      <span class="topic-title">区块名称1:</span>
      <el-button  @click="skuDialogVisible">添加SKU</el-button>
      <span class="promt">拖动SKU区块的位置可以调整排序</span>
      <div class="operation">
        <span @click="delArea()">删除区块</span>
        <span>下移</span>
        <span>展开</span>
      </div>
      <draggable v-model="info" class="list-ul"
      :element="'ul'"
      :options="{group:{ name:'people',  pull:'clone', put:false }}">
          <li v-for="(element, index) in info" :key="index">
            <div class="info">
              <div class="img">
                <img :src="element.img" alt="">
              </div>
              <div class="detail">
                <p>{{ element.goodsname }}</p>
                <p>条码：{{ element.sku }} </p>
                <p>{{ element.spec }}</p>
                <p>销量：{{ element.num }} </p>
              </div>
            </div>
            <i></i>
          </li>
    </draggable>
    </div>
    <div class="topic-pic">
      <span class="topic-title">区块名称2:</span>
      <el-button  @click="skuDialogVisible">添加SKU</el-button>
      <span class="promt">拖动SKU区块的位置可以调整排序</span>
      <div class="operation">
        <span>删除区块</span>
        <span>下移</span>
        <span>展开</span>
      </div>
      <draggable v-model="info" class="list-ul"
      :element="'ul'"
      :options="{group:{ name:'people',  pull:'clone', put:false }}">
          <li v-for="(element, index) in info" :key="index">
            <div class="info">
              <div class="img">
                <img :src="element.img" alt="">
              </div>
              <div class="detail">
                <p>{{ element.goodsname }}</p>
                <p>条码：{{ element.sku }} </p>
                <p>{{ element.spec }}</p>
                <p>销量：{{ element.num }} </p>
              </div>
            </div>
            <i></i>
          </li>
    </draggable>
    </div>
    <br>
    <hr style="height:1px;border:none;border-top:1px solid #ccc;">
    <br>
    <div class="">
        <el-form-item label="微信分享调用标题：" required>
          <el-input v-model="form.name" placeholder="请输入分享到微信好友或者朋友圈时显示的标题名称" :maxlength="16"></el-input>
        </el-form-item>
        <el-form-item label="微信分享调用简介:" required>
          <el-input v-model="form.name" placeholder="请输入分享到微信好友时显示的简介" :maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="微信分享调用图片：" required>
          <div class="wximg">
            <img src="" alt="" class="weixin-img">
            <button type="button" name="button" class="wxupload" @click="onImgSelect">添加图片</button>
          </div>
        </el-form-item>
    </div>
  </div>
  <br>
  <br>
  <el-form-item label="备注信息：">
   <el-input type="textarea" v-model="form.desc" placeholder="请输入该专题的备注信息"></el-input>
  </el-form-item>
  <yc-card-footer>
    <el-button size="large">取消</el-button>
    <el-button type="info" size="large">确认并保存</el-button>
  </yc-card-footer>
</el-form>
</div>
<el-dialog
  custom-class="yc-d"
  title="选择SKU"
  :visible.sync="linkDialogVisible"
  size="large"
  :modal-append-to-body = "false"
  :before-close="handleClose">
  <sku></sku>
  <yc-card-footer slot="footer" class="dialog-footer">
    <el-button size="large" @click="linkDialogVisible = false">取消</el-button>
    <el-button type="info" size="large" @click="linkDialogVisible = false">保存</el-button>
  </yc-card-footer>
</el-dialog>
<yc-img-select v-model="imgDialogVisible" @confirm="confirm"></yc-img-select>
</yc-page>
</template>
<script>
const draggable = () => import('vuedraggable')
export default {
  data() {
    return {
      addList: [],
      info: [
        {
          id: '1',
          img: 'https://imgsa.baidu.com/news/pic/item/4e4a20a4462309f76880a2f5780e0cf3d6cad66e.jpg',
          goodsname: '康师傅冰红茶冰红茶600ml1',
          sku: '1234567891',
          spec: '120ml/包',
          num: '1234'
        },
        {
          id: '2',
          img: 'https://imgsa.baidu.com/news/pic/item/4e4a20a4462309f76880a2f5780e0cf3d6cad66e.jpg',
          goodsname: '康师傅冰红茶冰红茶600ml2',
          sku: '1234567891',
          spec: '120ml/包',
          num: '1234'
        },
        {
          id: '3',
          img: 'https://imgsa.baidu.com/news/pic/item/4e4a20a4462309f76880a2f5780e0cf3d6cad66e.jpg',
          goodsname: '康师傅冰红茶冰红茶600ml3',
          sku: '1234567891',
          spec: '120ml/包',
          num: '1234'
        },
        {
          id: '4',
          img: 'https://imgsa.baidu.com/news/pic/item/4e4a20a4462309f76880a2f5780e0cf3d6cad66e.jpg',
          goodsname: '康师傅冰红茶冰红茶600ml4',
          sku: '1234567891',
          spec: '120ml/包',
          num: '1234'
        }
      ],
      options: [
        {
          value: '选项1',
          label: '北京'
        },
        {
          value: '选项2',
          label: '上海'
        }
      ],
      value: '',
      radio: '1',
      color2: '#ffffff',
      form: {
        region: '',
        region1: ''
      },
      bgValue: '1',
      NavValue: '1',
      titleValue: '1',
      adValue: '1',
      addVal: '',
      Value: '1',
      imgDialogVisible: false,
      linkDialogVisible: false
    }
  },
  mounted() {
  },
  methods: {
    getAdd(type) {
      let arr1 = []
      let arr2 = ['2', '数组2']
      if (type === '1') {
        this.addList.push(arr1)
        this.addVal = '1'
      } else if (type === '2') {
        this.addList.push(arr2)
        this.addVal = '2'
      }
      // if (this.addList.length > 7) {
      //   this.$alert('每个专题最多允许添加6个广告位')
      // }
      console.log(this.addList.length)
    },
    onSubmit() {
    },
    handleClose() {
      this.linkDialogVisible = false
    },
    skuDialogVisible() {
      this.linkDialogVisible = true
    },
    onImgSelect() {
      this.imgDialogVisible = true
    },
    confirm(val) {
      console.log(val)
    },
    delArea() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  components: {
    draggable: draggable
  }
}
</script>
<style lang="scss">
@import 'new.topic.scss';
@import './topic.common.scss';
</style>
