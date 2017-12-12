<template>
  <div class="yc-region-select" v-if="this.districtList.length > 0">
    <div class="btn-li">
      <el-button class="yc-region-btn" @click="chooseAll(true)">全选</el-button>
      <el-button class="yc-region-btn" @click="chooseAll(false)">全不选</el-button>
      <el-button class="yc-region-btn" @click="chooseReverse()">反选</el-button>
    </div>
    <ul class="region-ul">
      <li v-for="item,index in districtList" :key="'province' + index">
        <ul class="select-ul">
          <li class="select-li">
            <i @click="chooseProvince(index)" :class="{'active': item.flag}"></i><span @click="chooseProvince(index)">{{ item.provinceName }}</span>
          </li>
          <li class="select-li sel-li" v-for="cItem,cIndex in item.cityList" :key="'city' + cIndex">
            <i @click="chooseCity(index, cIndex)" :class="{'active': cItem.flag}"></i><span @click="chooseCity(index, cIndex)" >{{ cItem.cityName }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import BannerService from '@/services/banner.service'
export default {
  name: 'yc-region-select',
  data () {
    return {
      info: {
        provinceId: null,
        provinceName: '',
        cityId: null,
        cityName: ''
      },
      regionList: [],
      districtList: []
    }
  },
  props: ['regionInfo'],
  watch: {
    regionInfo() {
      this.displayData()
    }
  },
  created() {
    this.BannerService = new BannerService()
  },
  mounted() {
  },
  methods: {
    // 获取数据
    async getBannerCitysList(industryId) {
      let res = await this.BannerService.getBannerCitys({industryId: industryId})
      res.provinceList.map(item => {
        item.flag = false
        item.cityList.map(cItem => {
          cItem.flag = false
        })
      })
      this.districtList = res.provinceList
      this.displayData()
    },
    // 回显数据
    displayData() {
      let self = this
      if (!this.regionInfo || this.regionInfo.length === 0) {
        return
      }
      self.regionInfo.map(item => {
        item.cityList.map(cItem => {
          self.districtList.map(dpItem => {
            dpItem.cityList.map(dcItem => {
              if (cItem.cityId === dcItem.cityId) {
                dcItem.flag = true
                self.pushRegion(dpItem, dcItem)
              }
            })
          })
        })
      })
      self.districtList.map(dpItem => {
        dpItem.flag = true
        dpItem.cityList.map(dcItem => {
          if (!dcItem.flag) {
            dpItem.flag = false
          }
        })
      })
      this.$emit('getRegions', self.regionList)
    },
    // 判断重复的数据
    checkRegion(item, list) {
      let tag = false
      list.map(reg => {
        if (reg.cityId === item.cityId) {
          tag = true
        }
      })
      return tag
    },
    // 删除取消选择的
    spliceRegion(item) {
      this.regionList.map((reg, index) => {
        reg.cityList.map((regItem, regindex) => {
          if (item.cityId === regItem.cityId) {
            reg.cityList.splice(regindex, 1)
          }
        })
        if (reg.cityList.length === 0) {
          this.regionList.splice(index, 1)
        }
      })
    },
    // 插入选择数据
    pushRegion(pitem, cItem) {
      let tag = true
      this.regionList.map(item => {
        if (item.provinceId === pitem.provinceId) {
          tag = false
          if (this.checkRegion(cItem, item.cityList)) {
            return
          }
          item.cityList.push({
            cityId: cItem.cityId,
            cityName: cItem.cityName
          })
        }
      })
      if (tag) {
        this.regionList.push({
          provinceId: pitem.provinceId,
          provinceName: pitem.provinceName,
          cityList: [{
            cityId: cItem.cityId,
            cityName: cItem.cityName
          }]
        })
      }
    },
    // 全选、全不选
    chooseAll(sel) {
      let self = this
      if (this.districtList.length === 0) {
        return
      }
      this.districtList.map(item => {
        item.flag = sel
        item.cityList.map(cItem => {
          cItem.flag = sel
          if (cItem.flag) {
            self.pushRegion(item, cItem)
          }
        })
      })
      if (!sel) {
        self.regionList = []
      }
      this.$emit('getRegions', self.regionList)
    },
    // 反选
    chooseReverse() {
      let self = this
      if (this.districtList.length === 0) {
        return
      }
      this.regionList = []
      this.districtList.map((item, index) => {
        item.cityList.map((cItem, cIndex) => {
          self.chooseCity(index, cIndex)
        })
      })
    },
    // 选择省
    chooseProvince(index) {
      let self = this
      this.districtList[index].flag = !this.districtList[index].flag
      this.districtList[index].cityList.map(item => {
        item.flag = this.districtList[index].flag
        if (item.flag) {
          self.pushRegion(self.districtList[index], item)
        }
        if (!item.flag) {
          self.spliceRegion(item)
        }
      })
      this.$emit('getRegions', self.regionList)
    },
    // 选择市
    chooseCity(index, cIndex) {
      this.districtList[index].cityList[cIndex].flag = !this.districtList[index].cityList[cIndex].flag
      this.districtList[index].flag = true
      this.districtList[index].cityList.map(item => {
        if (!item.flag) {
          this.districtList[index].flag = false
          this.spliceRegion(item)
        }
        if (item.flag) {
          this.pushRegion(this.districtList[index], item)
        }
      })
      this.$emit('getRegions', this.regionList)
    }
  }
}
</script>
<style lang="scss">
@import 'scss/variables.scss';
@import 'scss/mixin.scss';
.yc-region-select {
  width: 600px;
  background: #FFFFFF;
  border: 1px solid #CCCCCC;
  .btn-li {
    height: 39px;
    border-bottom: 1px solid #CCCCCC;
    padding-left: 20px;
    .yc-region-btn {
      width: 60px;
      height: 24px;
      border-color: #2788EA;
      padding: 0;
      color: #2788EA;
    }
  }
  .region-ul {
    max-height: 159px;
    overflow: scroll;
    padding: 9px 0px 14px 30px;
    .select-ul {
      line-height: 34px;
    }
    .select-li {
      height: 34px;
      position: relative;
      display: inline-block;
      margin-right: 20px;
      i {
        cursor: pointer;
        position: absolute;
        width: 15px;
        height: 15px;
        background: url(../assets/img/my-noselect.png) no-repeat;
        background-size: 15px;
        top: 10px;
        left: 0;
      }
      i.active {
        position: absolute;
        padding: 1px;
        width: 13px;
        height: 13px;
        background: url(../assets/img/my-select.png) no-repeat;
        background-size: 13px;
        background-position: center;
        top: 10px;
        left: 0;
      }
      span {
        cursor: pointer;
        width: 50px;
        display: inline;
        padding-left: 20px;
        font-size: 14px;
        color: #333;
      }
    }
    .sel-li {
      span {
        color: #666;
      }
    }
  }
}
</style>
