<template>
  <el-dialog title="设置云采运营管理员的数据权限"
    class="yc-account-set__notoppadding"
    :visible.sync="dialogShow"
    :modal-append-to-body="false" size="large"
    @open="openEvent">
    <el-card class="yc-account__dataauthority yc-account__dialogcard">
      <el-tabs type="border-card">
        <el-tab-pane label="区域数据">
          <el-form class="yc-form " label-width="100px">
            <el-form-item label="选择地区：">
              <el-select v-model="area.selProvince" class="yc-short-ipt" placeholder="选择省">
                <el-option v-for="(item, index) in area.provinceArray" :key="index"
                  :label="item.name"
                  :value="item">
                </el-option>
              </el-select>
              <el-select v-model="area.selCity" class="yc-short-ipt" placeholder="选择市">
                <el-option v-for="(item, index) in area.cityArray" :key="index"
                  :label="item.name"
                  :value="item">
                </el-option>
              </el-select>
              <el-select v-model="area.selArea" class="yc-short-ipt" placeholder="选择区">
                <el-option v-for="(item, index) in area.areaArray" :key="index"
                  :label="item.name"
                  :value="item">
                </el-option>
              </el-select>
              <el-button class="addbtn" @click="areaAddEvent">添加</el-button>
            </el-form-item>
            <el-form-item label="已选地区：">
              <el-tag v-for="(item, index) in area.selAreaArray" 
                :key="index" :closable="true"
                class="yc-tag-default"
                @close="areaCloseEvent(item)">{{item.txt}}</el-tag>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商户数据">
          <yc-page-header>
            <el-form  :inline="true" label-width="100px">
              <el-form-item label="按条件筛选：">
                <el-input class="yc-long-ipt" placeholder="输入用户ID／用户名／手机／邮箱号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="store.provinceId"  placeholder="选择省" class="yc-short-ipt">
                  <el-option  label="全部" value="-1">
                </el-option>
                </el-select>
                <el-select v-model="store.cityId"  placeholder="选择市" class="yc-short-ipt">
                  <el-option  label="全部" value="-1">
                  </el-option>
                </el-select>
                <el-select v-model="store.areaId"  placeholder="选择区" class="yc-short-ipt">
                  <el-option  label="全部" value="-1">
                  </el-option>
                </el-select>
                <el-select v-model="store.industry"  placeholder="选择行业" class="yc-short-ipt">
                  <el-option  label="全部" value="-1">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="searchEvent">搜索</el-button>
              </el-form-item>
            </el-form>
          </yc-page-header>
          <el-table :data="store.pageDate" border stripe
            @selection-change="handleSelectionChange" ref="storeTable">
            <el-table-column prop="storeId" label="商户ID" align="center" width="80"></el-table-column>
            <el-table-column prop="storeName" label="商户名称" align="center"></el-table-column>
            <el-table-column prop="homeLocation" label="商户归属地" align="center"></el-table-column>
            <el-table-column prop="industryName" label="所属行业" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" align="center">
              <template scope="scope">
                <span v-if="scope.row.status*1 === 0">开启</span>
                <span v-if="scope.row.status*1 === 1">关闭</span>
              </template>
            </el-table-column>
              <el-table-column type="selection">
              </el-table-column>
          </el-table>
          <yc-pagination v-model="store.page" 
            :total="store.total" 
            :pageSize="store.pageSize"
            @handleCurrentChange="handleCurrentChange"
            layout="prev, pager, next"></yc-pagination>
        </el-tab-pane>
        <el-tab-pane label="分类数据">
          <el-form class="yc-form " label-width="100px">
            <el-form-item label="选择分类：">
              <el-select v-model="classify.selOneCate" class="yc-ipt"  placeholder="一级分类">
                <el-option v-for="(item, index) in classify.oneFlArray" :key="index"
                  :label="item.cateName"
                  :value="item">
                </el-option>
              </el-select>
              <el-select v-model="classify.selTwoCate" class="yc-ipt" placeholder="二级分类">
                <el-option v-for="(item, index) in classify.twoFlArray" :key="index"
                  :label="item.cateName"
                  :value="item"></el-option>
              </el-select>
              <el-button class="addbtn" @click="classifyAddEvent">添加</el-button>
            </el-form-item>
            <el-form-item label="已选分类：">
              <el-tag v-for="(item, index) in classify.selCateArray" 
                :key="index" :closable="true"
                class="yc-tag-default"
                @close="cartCloseEvent(item)">{{item.txt}}</el-tag>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="行业数据">
          <el-form class="yc-form " label-width="100px">
            <el-form-item label="选择行业：">
              <el-select v-model="industry.selIndustry">
                <el-option v-for="(item, index) in industry.industryArray" :key="index"
                  :label="item.industryName"
                  :value="item"></el-option>
              </el-select>
              <el-button class="addbtn" @click="industryAddEvent">添加</el-button>
            </el-form-item>
            <el-form-item label="已选行业：">
              <el-tag v-for="(item, index) in industry.selIndustryArray" 
                :key="index" :closable="true"
                class="yc-tag-default"
                @close="industryCloseEvent(item)">{{item.txt}}</el-tag>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <yc-card-footer class="yc-account__cardfoot" nomargin>
        <el-button size="large" @click="dialogShow =  false">关闭</el-button>
        <el-button type="info" size="large" @click="saveEvent">保存</el-button>
      </yc-card-footer>
    </el-card>
  </el-dialog>
</template>
<script>
import AccountService from '@/services/account.service.js'
export default {
  data() {
    return {
      dialogShow: this.value || false, // 弹出框显示状态
      area: {
        selAreaArray: [], // 已选择的数据信息
        selProvince: {}, // 当前选择的省
        selCity: {}, // 当前选着的市
        selArea: {}, // 当前选着的区
        provinceArray: [{id: -1, name: '选择省'}, {id: 1, name: '河北'}, {id: 2, name: '河南'}],
        cityArray: [{id: -1, name: '选择市'}, {id: 3, name: '沧州'}, {id: 4, name: '保定'}],
        areaArray: [{id: -1, name: '选择区'}, {id: 5, name: '青县'}, {id: 6, name: '魏县'}]
      }, // 区域数据信息
      store: {
        selStor: [], // 说有选中的Ids
        page: 1, // 当前页码
        pageSize: 10, // 每页显示条数
        total: 120,
        provinceId: -1, //
        cityId: -1,
        areaId: -1,
        industry: -1,
        condition: '',
        pageDate: [],
        catchSelStor: [] // 缓存的选中Id
      }, // 商户信息处理
      classify: {
        // 该数据应为公共组件暂时先写死
        oneFlArray: [{cateId: -1, cateName: '一级分类'}, {cateId: 1, cateName: '电器'}, {cateId: 2, cateName: '饮品'}],
        twoFlArray: [{cateId: -1, cateName: '二级分类'}, {cateId: 3, cateName: '冰箱'}, {cateId: 4, cateName: '碳酸'}],
        selOneCate: {},
        selTwoCate: {},
        selCateArray: [] // 已选择的分类
      }, // 分类信息处理
      industry: {
        // 该数据应为公共组件暂时先写死
        industryArray: [{industryId: -1, industryName: '所属行业'}, {industryId: 1, industryName: '服务'}, {industryId: 2, industryName: '互联网'}],
        selIndustry: {},
        selIndustryArray: []
      }
    }
  },
  props: {
    value: {},
    dataAuthority: {}
  },
  mounted() {
    this.AccountService = new AccountService()
    this.getMerchantList()
  },
  methods: {
    openEvent() {
      if (!this.dataAuthority) {
        this.area.selAreaArray = []
        this.store.selStor = []
        this.classify.selCateArray = []
        this.industry.selIndustryArray = []
        return false
      }
      if (this.dataAuthority.area.ids) {
        this.area.selAreaArray = this.createPageData(this.dataAuthority.area.ids, this.dataAuthority.area.txt)
      }
      if (this.dataAuthority.store.ids) {
        this.store.catchSelStor = this.createPageData(this.dataAuthority.store.ids, this.dataAuthority.store.txt)
        this.store.selStor = this.$bqUtils.extendDeep(this.store.catchSelStor, [])
      }
      if (this.dataAuthority.classify.ids) {
        this.classify.selCateArray = this.createPageData(this.dataAuthority.classify.ids, this.dataAuthority.classify.txt)
      }
      if (this.dataAuthority.industry.ids) {
        this.industry.selIndustryArray = this.createPageData(this.dataAuthority.industry.ids, this.dataAuthority.industry.txt)
      }
      this.getMerchantList()
    },
    // 根据传值生成选中数据
    createPageData(ids, txt) {
      let idsArray = ids.split(',')
      let txtArray = txt.split(',')
      let selArray = []
      idsArray.forEach((item, index) => {
        selArray.push({ids: idsArray[index], txt: txtArray[index]})
      })
      return selArray
    },
    // 区域添加事件
    areaAddEvent() {
      // TODO: 由于省市级联不确定 该方法逻辑可能会被修改
      let provinceId = this.area.selProvince.id || -1
      let cityId = this.area.selCity.id || -1
      let selArea = this.area.selArea.id || -1
      if (provinceId === -1) {
        this.$message.error('请正确选择区域!')
        return false
      }
      if (selArea !== -1 && cityId === -1) {
        this.$message.error('请正确选择区域!')
        return false
      }
      if (cityId !== -1) {
        let ishaveBig = this.area.selAreaArray.some(item => {
          let itemArray = item.ids.split('-')
          if (itemArray.length === 1) {
            if (provinceId * 1 === itemArray[0] * 1) {
              return true
            }
          }
          return false
        })
        if (ishaveBig) {
          this.$message.error('已选地区中已存在包含当前所选地区，请选择其它地区!')
          return false
        }
      }
      if (selArea !== -1) {
        let ishaveBig = this.area.selAreaArray.some(item => {
          let itemArray = item.ids.split('-')
          if (itemArray.length === 2) {
            if (cityId * 1 === itemArray[1] * 1) {
              return true
            }
          }
          return false
        })
        if (ishaveBig) {
          this.$message.error('已选地区中已存在包含当前所选地区，请选择其它地区!')
          return false
        }
      }
      let selInfo = this.createArea()
      let ishave = this.area.selAreaArray.some(item => {
        if (selInfo.ids === item.ids) {
          return true
        }
        return false
      })
      if (ishave) {
        this.$message.error('已选地区中已存在包含当前所选地区，请选择其它地区!')
        return false
      }
      this.area.selAreaArray.push(selInfo)
    },
    // 生成选中区域数据
    createArea() {
      let provinceId = this.area.selProvince.id || -1
      let cityId = this.area.selCity.id || -1
      let selArea = this.area.selArea.id || -1
      let txt = []
      let val = []
      if (provinceId !== -1) {
        txt.push(this.area.selProvince.name)
        val.push(this.area.selProvince.id)
      }
      if (cityId !== -1) {
        txt.push(this.area.selCity.name)
        val.push(this.area.selCity.id)
      }
      if (selArea !== -1) {
        txt.push(this.area.selArea.name)
        val.push(this.area.selArea.id)
      }
      let txtStr = txt.join('-')
      let valStr = val.join('-')
      return {ids: valStr, txt: txtStr}
      // this.area.selAreaArray.push({ids: valStr, txt: txtStr})
    },
    // 区域内容删除事件
    areaCloseEvent(itm) {
      let delindex = -1
      this.area.selAreaArray.some((item, index) => {
        if (item.ids === itm.ids) {
          delindex = index
          return true
        }
        return false
      })
      if (delindex !== -1) {
        this.area.selAreaArray.splice(delindex, 1)
      }
    },
    // 获取列表数据
    async getMerchantList() {
      let params = this.getSearchParams()
      let res = await this.AccountService.getMerchantList(params)
      this.store.total = res.total * 1
      this.store.catchSelStor = this.$bqUtils.extendDeep(this.store.selStor, [])
      this.store.pageDate = res.list
      window.setTimeout(this.setSelStoreRow, 50)
    },
     // 获取搜索数据
    getSearchParams() {
      let params = {}
      params.page = this.store.page
      params.pageSize = this.store.pageSize
      params.param = this.store.condition
      params.provinceId = this.store.provinceId
      params.cityId = this.store.cityId
      params.districtId = this.store.areaId
      params.industryId = this.store.industry
      return params
    },
    // 分页页数变化出发事件
    handleCurrentChange(val) {
      this.store.page = (val * 1)
      this.getMerchantList()
    },
    // 搜索触发的事件
    searchEvent() {
      this.store.page = 1
      this.getMerchantList()
    },
    // 选中时触发的事件
    handleSelectionChange(val) {
      let newSelStor = []
      this.store.selStor.forEach(selitem => {
        let ishave = this.store.pageDate.some(item => {
          if (item.storeId * 1 === selitem.ids * 1) {
            return true
          }
          return false
        })
        if (!ishave) {
          newSelStor.push(selitem)
        }
      })
      val.forEach(item => {
        newSelStor.push({ids: item.storeId, txt: item.storeName})
      })
      this.store.selStor = newSelStor
    },
    // 设置选中行方法
    setSelStoreRow() {
      this.store.pageDate.forEach(item => {
        let ishave = this.store.catchSelStor.some(selItem => {
          if (item.storeId * 1 === selItem.ids * 1) {
            return true
          }
          return false
        })
        if (ishave) {
          this.$refs.storeTable.toggleRowSelection(item)
        }
      })
    },
    // 分类添加事件
    classifyAddEvent() {
      // TODO: 由于省市级联不确定 该方法逻辑可能会被修改
      let oneCate = this.classify.selOneCate.cateId || -1
      let twoCate = this.classify.selTwoCate.cateId || -1
      if (oneCate === -1) {
        this.$message.error('请正确选择分类!')
        return false
      }
      if (twoCate !== -1) {
        let ishaveBig = this.classify.selCateArray.some(item => {
          let itemArray = item.ids.split('-')
          if (itemArray.length === 1) {
            if (oneCate * 1 === itemArray[0] * 1) {
              return true
            }
          }
          return false
        })
        if (ishaveBig) {
          this.$message.error('已选分类中已存在包含当前所选分类，请选择其它分类!')
          return false
        }
      }
      let selInfo = this.createCate()
      let ishave = this.classify.selCateArray.some(item => {
        if (selInfo.ids === item.ids) {
          return true
        }
        return false
      })
      if (ishave) {
        this.$message.error('已选分类中已存在包含当前所选分类，请选择其它分类!')
        return false
      }
      this.classify.selCateArray.push(selInfo)
    },
    // 生成分类数据
    createCate() {
      let oneCate = this.classify.selOneCate.cateId || -1
      let twoCate = this.classify.selTwoCate.cateId || -1
      let txt = []
      let val = []
      if (oneCate !== -1) {
        txt.push(this.classify.selOneCate.cateName)
        val.push(this.classify.selOneCate.cateId)
      }
      if (twoCate !== -1) {
        txt.push(this.classify.selTwoCate.cateName)
        val.push(this.classify.selTwoCate.cateId)
      }
      let txtStr = txt.join('-')
      let valStr = val.join('-')
      return {ids: valStr, txt: txtStr}
      // this.area.selAreaArray.push({ids: valStr, txt: txtStr})
    },
    // 分类内容删除事件
    cartCloseEvent(itm) {
      let delindex = -1
      this.classify.selCateArray.some((item, index) => {
        if (item.ids === itm.ids) {
          delindex = index
          return true
        }
        return false
      })
      if (delindex !== -1) {
        this.classify.selCateArray.splice(delindex, 1)
      }
    },
    // 行业数据信息添加
    industryAddEvent() {
      // TODO: 由于公共组件不确定 逻辑后期可能需要修改
      let industryId = this.industry.selIndustry.industryId || -1
      if (industryId === -1) {
        this.$message.error('请正确选择行业!')
        return false
      }
      let selInfo = {ids: industryId, txt: this.industry.selIndustry.industryName}
      let ishave = this.industry.selIndustryArray.some(item => {
        if (selInfo.ids === item.ids) {
          return true
        }
        return false
      })
      if (ishave) {
        this.$message.error('该行业在已选行业中已存在，请选择其它行业!')
        return false
      }
      this.industry.selIndustryArray.push(selInfo)
    },
    // 行业数据删除
    industryCloseEvent(itm) {
      let delindex = -1
      this.industry.selIndustryArray.some((item, index) => {
        if (item.ids === itm.ids) {
          delindex = index
          return true
        }
        return false
      })
      if (delindex !== -1) {
        this.industry.selIndustryArray.splice(delindex, 1)
      }
    },
    // 数据信息保存
    saveEvent() {
      if (this.area.selAreaArray.length === 0 && this.store.selStor.length === 0 && this.classify.selCateArray.length === 0 && this.industry.selIndustryArray.length === 0) {
        this.$message.error('你尚未选择数据权限，请选择设置数据权限后再保存!')
        return false
      }
      let dataAuthority = {}
      let areaData = this.createSaveData(this.area.selAreaArray)
      dataAuthority.area = {
        ids: areaData.ids,
        txt: areaData.txt
      }
      let storeData = this.createSaveData(this.store.selStor)
      dataAuthority.store = {
        ids: storeData.ids,
        txt: storeData.txt
      }
      let classifyData = this.createSaveData(this.classify.selCateArray)
      dataAuthority.classify = {
        ids: classifyData.ids,
        txt: classifyData.txt
      }
      let industryData = this.createSaveData(this.industry.selIndustryArray)
      dataAuthority.industry = {
        ids: industryData.ids,
        txt: industryData.txt
      }
      this.dialogShow = false
      this.$emit('selDataAuthority', dataAuthority)
    },
    // 生成后台使用数据
    createSaveData(idsTxtArray) {
      let res = {}
      let ids = []
      let txt = []
      idsTxtArray.forEach(item => {
        ids.push(item.ids)
        txt.push(item.txt)
      })
      res.ids = ids.join(',')
      res.txt = txt.join(',')
      return res
    }
  },
  watch: {
    value(val) {
      this.dialogShow = val
    },
    dialogShow(val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="scss">
  @import 'scss/variables.scss';
  .yc-account__dataauthority {
    .addbtn {
      width: 80px;
      color: $primary;
      border: 1px solid $primary;
      > span {
        font-size: 16px;
      }
    }
  }
</style>
