<template>
  <div class="add-five">
    <div class="add-five-content">
      <h1>
        <span>1.卖家信息设置</span>
      </h1>
      <el-form ref="form" :rules="rules" :model="form" label-width="240px">
        <el-form-item label="选择卖家的合作方式:" prop="cooperationType" required>
          <el-radio class="radio" v-model="form.cooperationType" label="1">现结</el-radio>
          <el-radio class="radio" v-model="form.cooperationType" label="2">账期</el-radio>
        </el-form-item>
        <el-form-item label="选择卖家支持的支付方式:" class="pay" prop="payType" required>
          <el-button v-if="form.payType == 1" :class="{active: form.payType == 1}" @click="selectPay('2', '1')">余额支付</el-button>
          <el-button v-if="form.payType == 2" :class="{active: form.payType == 2}" @click="selectPay('1', '2')">货到付款</el-button>
          <i>(说明：选择账期后不可以选择货到付款)</i>
        </el-form-item>
        <el-form-item label="是否设置最低订货金额:" prop="baseAmount" required>
          <el-radio class="radio" v-model="form.baseAmount" label="-1">开启</el-radio>
          <el-radio class="radio" v-model="form.baseAmount" label="0">关闭</el-radio>
        </el-form-item>
        <el-form-item v-if="form.baseAmount == -1" prop="minMoney">
          <el-input v-model="form.minMoney" placeholder="请输入最小起订金额"></el-input>
          <i>(说明：开启最小起订金额选项后必须设置最低起订金额)</i>
        </el-form-item>
        <el-form-item label="允许新增分类标签的数量:" prop="cateTagCount" required>
          <el-input v-model="form.cateTagCount" placeholder="请输入正整数"></el-input>
        </el-form-item>
        <el-form-item label="允许分类标签中添加的商品数量:" prop="cateTagGoodsCount" required>
          <el-input v-model="form.cateTagGoodsCount" placeholder="请输入正整数"></el-input>
        </el-form-item>
      </el-form>
      <h1>
        <span>2.按供货区域设置供货范围</span>
      </h1>
      <el-form ref="form1" :model="form" label-width="240px">
        <el-form-item label="请选择添加允许其供货的区域:" class="address">
          <el-select v-model="form.name" placeholder="请选择区域">
            <el-option label="区域一" value="typeId"></el-option>
          </el-select>
          <el-button class="add">添加</el-button>
        </el-form-item>
        <el-form-item label="已添加其允许的供货区域:" class="select-count count" v-if="allowRegionList.length > 0">
          <ul>
            <li class="select-item" v-for="item,index in allowRegionList" :key="index">
              {{ item.name }}
              <i @click="deleteItem(allowRegionList, item.typeId)"></i>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="请选择添加不允许其供货的区域:" class="address">
          <el-select v-model="form.name" placeholder="请选择区域">
            <el-option label="区域一" value="typeId"></el-option>
          </el-select>
          <el-button class="add">添加</el-button>
        </el-form-item>
        <el-form-item label="已添加其不允许的供货区域:" class="select-count no-count" v-if="disAllowRegionList.length > 0">
          <ul>
            <li class="select-item" v-for="item,index in disAllowRegionList" :key="index">
              {{ item.name }}
              <i @click="deleteItem(disAllowRegionList, item.typeId)"></i>
            </li>
          </ul>
        </el-form-item>
      </el-form>
      <h1>
        <span>3.按供货买家设置供货范围</span>
      </h1>
      <el-form ref="form2" :model="form" label-width="240px">
        <el-form-item label="请选择添加允许其供货的买家:" class="address">
          <el-button @click="selectBuyer">选择买家</el-button>
        </el-form-item>
        <el-form-item label="已添加允许其供货的买家:" class="select-count count" v-if="allowBuyerList.length > 0">
          <ul>
            <li class="select-item" v-for="item,index in allowBuyerList" :key="index">
              {{ item.storeName }}
              <i @click="deleteItem(allowBuyerList, item.typeId)"></i>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="请选择添加不允许其供货的买家:" class="address">
          <el-button @click="selectNoBuyer">选择买家</el-button>
        </el-form-item>
        <el-form-item label="已添加不允许其供货的买家:" class="select-count no-count" v-if="disAllowBuyerList.length > 0">
          <ul>
            <li class="select-item" v-for="item,index in disAllowBuyerList" :key="index">
              {{ item.storeName }}
              <i @click="deleteItem(disAllowBuyerList, item.typeId)"></i>
            </li>
          </ul>
        </el-form-item>
      </el-form>
      <yc-card-footer>
        <el-button size="large" @click="cancel">取消</el-button>
        <el-button type="info" size="large" @click="save">确认并保存</el-button>
      </yc-card-footer>
    </div>
    <el-dialog
      custom-class="yc-d"
      title="选择买家"
      :visible.sync="linkDialogVisible"
      size="large"
      :modal-append-to-body = "false"
      :before-close="handleClose">
      <select-buyer v-if="linkDialogVisible" :type="tag" :selectBuyerList="selectBuyerList" @cancelBuyerList="cancelBuyerList" @saveBuyerList="saveBuyerList"></select-buyer>
    </el-dialog>
  </div>
</template>
<script>
import SelectBuyer from './select.buyer.vue'
import MerchantService from '@/services/merchant.service'

export default {
  data() {
    return {
      linkDialogVisible: false,
      form: {
        cooperationType: '1',
        payType: '2',
        baseAmount: '-1',
        minMoney: '',
        cateTagCount: '',
        cateTagGoodsCount: '',
        allowRegion: '',
        disAllowRegion: '',
        allowBuyer: '',
        disAllowBuyer: ''
      },
      allowRegionList: [],
      disAllowRegionList: [],
      allowBuyerList: [],
      disAllowBuyerList: [],
      aptitude: '资质照片',
      selectBuyerList: [],
      tag: 1,
      rules: {
        cooperationType: {required: true, message: '请选择卖家合作方式', trigger: 'change'},
        payType: {required: true, message: '请选择卖家支持的支付方式', trigger: 'change'},
        minMoney: [
          {required: true, message: '请设置最低起订金额', trigger: 'blur'},
          {type: 'number', min: 0, transform: val => { return Number(val) }, message: '最低起订金额必须是输入一个大于0的数字', trigger: 'blur'}
        ],
        cateTagCount: [
          {required: true, message: '请设置允许新增分类标签的数量', trigger: 'blur'},
          {type: 'number', min: 0, max: 10, transform: val => { return Number(val) }, message: '允许新增分类标签的数量仅限输入0-10的整数', trigger: 'blur'}
        ],
        cateTagGoodsCount: [
          {required: true, message: '请设置允许分类标签中添加的商品数量', trigger: 'blur'},
          {type: 'number', min: 1, max: 1000, transform: val => { return Number(val) }, message: '允许分类标签中添加的商品数量仅限输入1-1000的整数', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    this.MerchantService = new MerchantService()
  },
  watch: {
    'form.cooperationType' (nVal) {
      let type = ''
      if (nVal === '1') {
        type = '2'
      } else {
        type = '1'
      }
      this.selectPay(nVal, type)
    }
  },
  methods: {
    selectBuyer() {
      this.tag = 1
      this.linkDialogVisible = true
      this.selectBuyerList = this.allowBuyerList
    },
    selectNoBuyer() {
      this.tag = 2
      this.linkDialogVisible = true
      this.selectBuyerList = this.disAllowBuyerList
    },
    saveBuyerList(list) {
      this.linkDialogVisible = false
      if (this.tag === 1) {
        this.allowBuyerList = list
      } else {
        this.disAllowBuyerList = list
      }
    },
    cancelBuyerList() {
      this.linkDialogVisible = false
    },
    deleteItem(list, itemId) {
      list.map(function (item, index) {
        if (item.typeId === itemId) {
          list.splice(index, 1)
        }
      })
    },
    changeArray (list) {
      if (list.length > 0) {
        let buyerType = ''
        for (let i = 0; i < list.length; i++) {
          if (buyerType) {
            buyerType = buyerType + ',' + list[i].storeId
          } else {
            buyerType = list[i].storeId
          }
        }
        return buyerType
      }
    },
    handleClose() {
      this.linkDialogVisible = false
    },
    save() {
      this.form.allowBuyer = this.changeArray(this.allowBuyerList)
      this.form.disAllowBuyer = this.changeArray(this.disAllowBuyerList)
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let params = this.form
          await this.MerchantService.AddMerchant(params, 'five')
          this.$router.push('/merchant/list')
        } else {
          return false
        }
      })
    },
    cancel() {
      this.$router.push('/merchant/list')
    },
    selectPay(pay, type) {
      this.form.cooperationType = pay
      this.form.payType = type
    }
  },
  components: {
    selectBuyer: SelectBuyer
  }
}
</script>
<style lang="scss">
.add-five {
  .add-five-content {
    h1 {
      padding-bottom: 11px;
      border-bottom: 1px solid #CCCCCC;
      span {
        font-size: 20px;
        padding-bottom: 6px;
        border-bottom: 4px solid #64B7F6;
      }
    }
    .el-form {
      margin-left: 45px;
      .el-form-item {
        width: 100%;
        margin: 20px auto;
        i {
          display: inline-block;
          margin-left: 15px;
          font-size: 14px;
          color: #999;
        }
      }
      .el-form-item__label {
        color: #333;
      }
      .el-input{
        width: auto;
        .el-input__inner {
          font-size: 14px;
          width: 300px;
          height: 40px;
          border-radius: 1px;
          border: 1px solid #E5E5E5;
        }
      }
      .address .el-input__inner {
        width: 150px;
      }
      .select-count {
        .select-item {
          height: 24px;
          line-height: 24px;
          background: #FFFFFF;
          padding: 0 10px;
          padding-right: 22px;
          display: inline-block;
          border: 1px solid #E5E5E5;
          margin-right: 8px;
          position: relative;
          i {
            width: 11px;
            height: 11px;
            position: absolute;
            right: 4px;
            top: 7.5px;
            background: url('../../../assets/img/delete.png') no-repeat;
          }
        }
        .select-item:hover {
          cursor: pointer;
        }
      }
      .count {
        padding-bottom: 30px;
        margin-bottom: 30px;
        border-bottom: 1px dashed #CCCCCC;
      }
      .no-count {
        margin-bottom: 30px;
      }
      .el-button {
        padding: 8px 24px;
        span {
          font-size: 14px;
        }
      }
      .address .el-button {
        padding: 12px 24px;
        border-color: #2788EA;
        span {
          color: #2788EA;
        }
      }
      .active {
        border-color: #49C34D;
        border-width: 2px;
        span {
          color: #49C34D;
        }
      }
      .add {
        margin-left: 20px;
      }
    }
    .yc-card-footer {
      background: none;
      margin-left: -40px;
      padding-right: 40px;
    }
  }
}
</style>
