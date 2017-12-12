<template>
  <div class="yc-instrodust">
    <el-select v-model="info.provinceId" placeholder="选择省" class="address-qu" @change="visibleChangeOne">
      <el-option
        v-for="(item, index) in districtList"
        :label="item.regionName"
        :value="item.regionId"
        :key="index">
      </el-option>
    </el-select>
    <el-select v-if="account > 1" v-model="info.cityId" placeholder="选择市" @change="visibleChangeTwo" class="address-qu">
      <el-option
        v-for="(item, index) in districtList2"
        :label="item.regionName"
        :value="item.regionId"
        :key="index">
      </el-option>
    </el-select>
    <el-select v-if="account > 2" v-model="info.districtId" placeholder="选择区" @change="visibleChangeThree" class="address-qu">
      <el-option
        v-for="(item, index) in districtList3"
        :label="item.regionName"
        :value="item.regionId"
        :key="index">
      </el-option>
    </el-select>
    <el-select v-if="account > 3" v-model="info.countyId" placeholder="选择镇/乡" @change="visibleChangeFour" class="address-qu">
      <el-option
        v-for="(item, index) in districtList4"
        :label="item.regionName"
        :value="item.regionId"
        :key="index">
      </el-option>
    </el-select>
  </div>
</template>
<script>
import CommonService from '@/services/common.service'
export default {
  name: 'yc-regions',
  data () {
    return {
      info: { // 省、市、区、镇
        provinceId: null,
        provinceName: '',
        cityId: null,
        cityName: '',
        districtId: null,
        districtName: '',
        countyId: null,
        countyName: ''
      },
      districtList: [],
      districtList2: [],
      districtList3: [],
      districtList4: [],
      provinceTag: true,
      cityTag: true,
      districtTag: true,
      countyTag: true
    }
  },
  props: ['getRegions', 'account'],
  watch: {
    'getRegions.provinceId'(val) {
      if (this.provinceTag) {
        this.info.provinceId = val
        if (this.getRegions.cityId !== -1) {
          this.info.cityId = this.getRegions.cityId
        }
        if (this.getRegions.districtId !== -1) {
          this.info.districtId = this.getRegions.districtId
        }
        if (this.getRegions.countyId !== -1) {
          this.info.countyId = this.getRegions.countyId
        }
      }
    }
  },
  created() {
    if (this.getRegions && this.getRegions.provinceId) {
      this.provinceTag = false
      this.info.provinceId = this.getRegions.provinceId
      if (this.getRegions.cityId !== -1) {
        this.info.cityId = this.getRegions.cityId
      }
      if (this.getRegions.districtId !== -1) {
        this.info.districtId = this.getRegions.districtId
      }
      if (this.getRegions.countyId !== -1) {
        this.info.countyId = this.getRegions.countyId
      }
    }
    this.CommonService = new CommonService()
    this.initSelect()
  },
  mounted() {
  },
  methods: {
    async initSelect() {
      let res = await this.CommonService.getRegionList({regionId: 1})
      this.districtList = res
      if (this.districtList.length > 0) {
        this.districtList.unshift({regionId: -1, regionName: '请选择'})
      }
      this.changeCateName()
      if (this.info.provinceId && !this.provinceTag) {
        this.visibleChangeOne()
      }
    },
    async visibleChangeOne() {
      if (!this.info.provinceId) {
        return
      }
      if (this.getRegions && (!this.getRegions.provinceId || this.getRegions.provinceId === -1)) {
        this.cityTag = false
      }
      if (!this.getRegions || !this.cityTag) {
        this.info.cityId = null
        this.info.districtId = null
        this.info.countyId = null
      }
      this.changeCateName()
      let res = await this.CommonService.getRegionList({regionId: this.info.provinceId})
      this.districtList2 = res
      if (this.districtList2.length > 0) {
        this.districtList2.unshift({regionId: -1, regionName: '请选择'})
      }
      if (this.getRegions && this.getRegions.cityId && this.cityTag) {
        this.info.cityId = this.getRegions.cityId
        this.getRegions.cityId = null
        this.cityTag = false
        this.changeCateName()
      }
    },
    async visibleChangeTwo() {
      this.info.districtId = null
      this.info.countyId = null
      this.changeCateName()
      if (!this.info.cityId) {
        return
      }
      let res = await this.CommonService.getRegionList({regionId: this.info.cityId})
      this.districtList3 = res
      if (this.districtList3.length > 0) {
        this.districtList3.unshift({regionId: -1, regionName: '请选择'})
      }
      if (this.getRegions && this.getRegions.districtId && this.districtTag) {
        this.info.districtId = this.getRegions.districtId
        this.getRegions.districtId = null
        this.districtTag = false
        this.changeCateName()
      }
    },
    async visibleChangeThree() {
      this.info.countyId = null
      this.changeCateName()
      if (!this.info.districtId) {
        return
      }
      let res = await this.CommonService.getRegionList({regionId: this.info.districtId})
      this.districtList4 = res
      if (this.districtList4.length > 0) {
        this.districtList4.unshift({regionId: -1, regionName: '请选择'})
      }
      if (this.getRegions && this.getRegions.countyId && this.countyTag) {
        this.info.countyId = this.getRegions.countyId
        this.getRegions.countyId = null
        this.countyTag = false
        this.changeCateName()
      }
    },
    visibleChangeFour() {
      this.changeCateName()
    },
    changeCateName() {
      let province = this.districtList.find(item => item.regionId === this.info.provinceId)
      let city = this.districtList2.find(item => item.regionId === this.info.cityId)
      let district = this.districtList3.find(item => item.regionId === this.info.districtId)
      let county = this.districtList4.find(item => item.regionId === this.info.countyId)
      if (province) {
        this.info.provinceName = province.regionName
      }
      if (city) {
        this.info.cityName = city.regionName
      }
      if (district) {
        this.info.districtName = district.regionName
      }
      if (county) {
        this.info.countyName = county.regionName
      }
      this.$emit('getCurRegion', this.info)
    }
  }
}
</script>
<style lang="scss">
@import 'scss/variables.scss';
@import 'scss/mixin.scss';
.address-qu {
  float: left;
}
.address-qu:nth-child(2) {
  float: left;
  margin-left: 10px;
}
</style>
