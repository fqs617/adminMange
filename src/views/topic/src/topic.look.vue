<template>
  <yc-page>
    <div class="topic-look">
      <yc-page-header>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <p>专题ID：{{ titleData.topicId }}</p>
              <p>专题名称：{{ titleData.topicName }}</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <p>所属地区：{{ titleData.region }}</p>
              <p>创建时间：{{ titleData.createTime }}</p>
            </div></el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <p>所属行业：{{ titleData.industryName }}</p>
              <p>区块数 / SKU数：{{ titleData.blockCount }} / {{ titleData.skuTotalCount}}</p>
            </div>
          </el-col>
        </el-row>
      </yc-page-header>
      <div class="topic-nav">
        <ul class="list-ul">
          <li v-for="(item, one) in topicDataList" :key="one" class="topic-li">
            <h3>{{ item.blockName }} - SKU数（{{item.skuCount}}）</h3>
            <ul class="info">
              <li v-for="(element, two) in item.skuList" :key="two" class="sku-li">
                <div class="img">
                  <img :src="element.defaultImage || noimg" alt="">
                </div>
                <div class="detail">
                  <p>{{ element.goodsName }}</p>
                  <p>条码：{{ element.sku }} </p>
                  <p class="content-desc-span">{{element.spec}}/{{ element.unit }}</p>
                  <p>销量：{{ element.salesCount }} </p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </yc-page>
</template>
<script>
import TopicService from '@/services/topic.service.js'
export default {
  data() {
    return {
      topicDataList: [],
      titleData: {},
      noimg: 'http://ogd5wcvme.bkt.clouddn.com/no-img.png'
    }
  },
  created() {
    this.TopicService = new TopicService()
    this.init()
  },
  methods: {
    async init() {
      let param = {
        topicId: this.$route.params.id
      }
      let res = await this.TopicService.lookTopicList(param)
      this.topicDataList = res.blockList
      this.titleData = res
    }
  }
}
</script>
<style lang="scss">
@import  'scss/variables.scss';
@import  'scss/mixin.scss';
.topic-look{
  min-width: 1100px;
  overflow: scroll;
  .yc-page-search{
    width: 100%;
    .row-bg{
      background: #fff;
      margin: 20px 0px 20px 17px;
      padding: 20px;
      p{
        font-size: 14px;
        color: #666666;
        line-height: 28px;
      }
    }
  }
  .topic-nav{
    width: 100%;
    h3{
      height: 40px;
      background: #E5E5E5;
      line-height: 40px;
      font-size: 16px;
      color: #333333;
      padding-left: 20px;
    }
    .list-ul{
      padding: 0;
      min-height: 10px;
      height: auto;
      overflow: hidden;
      padding: 5px;
      .topic-li{
        width: 100%;
        float: left;
        min-height: 10px;
        height: auto;
        background: #F5F5F5;
        .info{
          .sku-li{
            width: 30%;
            float: left;
            margin-top: 1%;
            margin-right: 1%;
            background: #fff;
            margin-bottom: 1%;
            box-shadow: 0 0 2px 0 rgba(0,0,0,0.10);
            .img{
              width: 90px;
              height: 90px;
              margin: 15px 15px 15px 15px;
              img{
                display: inline-block;
                width: 100%;
                height: 100%;
                vertical-align: middle;
              }
              float: left;
            }
            .detail{
              height: 120px;
              p{
                line-height: 20px;
                font-size: 12px;
                color: #333333;
              }
              p:nth-child(1){
                padding-top: 15px;
                width:190px;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
              .content-desc-span{
                display: inline-block;
                width: 200px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }

        }
      }
    }
    .list-ul li:nth-child(3n){
      margin-right: 0;
    }
    .list-ul li:nth-child(n){
      margin-left: 1%;
    }
  }
}

</style>
