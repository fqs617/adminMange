<template>
  <yc-page class="yc-page-add-area">
    <el-card class="yc-card-wrap">
      <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="200px">
        <el-form-item label="所属行业：" required prop="industryId">
          <yc-form-item-content tip="必须选择一个行业">
            <yc-industry @selectIndustry="selectIndustry" v-model="ruleForm.industryId" class="industry-input"></yc-industry>
          </yc-form-item-content>
        </el-form-item>
        <el-form-item label="所在地区:" required prop="regionObj" class="regionObj">
          <yc-form-item-content>
            <yc-region-select ref="bannerCitys" @getRegions="getRegions" :regionInfo="regionInfo"></yc-region-select>
          </yc-form-item-content>
        </el-form-item>
        <el-form-item label="单栏专区名称：" required prop="programName">
            <yc-form-item-content tip="">
              <el-input large v-model="ruleForm.programName" placeholder="必填项，不得超过100个字"></el-input>
            </yc-form-item-content>
        </el-form-item>
        <el-form-item label="专区背景选择：" required inline-block>
          <el-select normal v-model="ruleForm.backgroundType" placeholder="请选择专区背景" @change="deleteValue">
            <el-option v-for="bg in areaBgOptions" :key="bg" :label="bg.label" :value="bg.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="ruleForm.backgroundType == 1" label="选择颜色：" prop="backgroundValue" inline-block class="bg-color">
          <yc-color-select v-model="ruleForm.backgroundValue" :tag="'backgroundValue'"></yc-color-select>
        </el-form-item>
        <el-form-item v-if="ruleForm.backgroundType == 2" label="选择图片：" prop="backgroundValue">
          <yc-form-item-content tip="必填项，支持jpg、png、jpeg，大小不得超过2 M">
            <div class="img" @click="showImgDialog(8)" :style="{backgroundImage: 'url('+ruleForm.backgroundValue+')'}">{{ruleForm.backgroundValue == null?'选择图片':''}}</div>
          </yc-form-item-content>
        </el-form-item>
        <el-form-item label="图片：" required prop="programPic">
          <yc-form-item-content tip="必填项，支持jpg、png、jpeg，大小不得超过2 M">
            <div class="img" @click="showImgDialog(7)" :style="{backgroundImage: 'url('+ruleForm.programPic+')'}">{{ruleForm.programPic ==null?'选择图片':''}}</div>
          </yc-form-item-content>
        </el-form-item>
        <el-form-item label="主标题名称：" required class="group-item" prop="mainTitleName">
          <el-input v-model="ruleForm.mainTitleName" placeholder="必填项，不得超过5个字"></el-input>
          <yc-color-select v-model="ruleForm.mainTitleColor" :tag="'mainTitleColor'"></yc-color-select>
          <div class="display-wrap">
            <p>效果展示：</p>
            <bq-area-display
            :single="single"
            :listInfo="ruleForm">
            </bq-area-display>
          </div>
        </el-form-item>
        <el-form-item label="副标题名称：" required class="group-item" prop="subTitleName">
          <el-input v-model="ruleForm.subTitleName" placeholder="必填项，不得超过8个字"></el-input>
          <yc-color-select v-model="ruleForm.subTitleColor" :tag="'subTitleColor'"></yc-color-select>
        </el-form-item>
        <el-form-item label="链接：" required prop="linkDesc">
          <el-button class="blue" @click="linkVisible = true">选择链接</el-button>
          <span class="blue-text">已选择链接：{{ruleForm.linkDesc ||'暂未选择'}}</span>
        </el-form-item>
        <el-form-item label="排序值：" required prop="sortValue">
          <el-input large v-model="ruleForm.sortValue" placeholder="必填项，数字越小排序越靠前，数字越大越靠后"></el-input>
        </el-form-item>
        <el-form-item label="状态：" required>
          <el-radio class="radio" v-model="ruleForm.isShow" :label="1">开启</el-radio>
          <el-radio class="radio" v-model="ruleForm.isShow" :label="0">关闭</el-radio>
        </el-form-item>
        <el-form-item label="显示时间：" required prop="showStartTime" inline-block>
          <el-date-picker type="datetime" placeholder="选择开始时间" v-model="ruleForm.showStartTime" :picker-options="pickerOptionsStartDate" :editable="false"></el-date-picker>
          &nbsp;&nbsp;至&nbsp;&nbsp;
        </el-form-item>
        <el-form-item inline-block prop="showEndTime" class="datetime">
          <el-date-picker type="datetime" placeholder="选择结束时间" v-model="ruleForm.showEndTime" :picker-options="pickerOptionsEndDate" :editable="false"></el-date-picker>
        </el-form-item>
      </el-form>
      <yc-card-footer>
        <el-button size="large" @click="$router.go(-1)">取消</el-button>
        <el-button type="info" size="large" @click="onSubmit('ruleForm')">保存</el-button>
      </yc-card-footer>
    </el-card>
    <yc-img-select v-model="imgVisible" @confirm="onImgConfirm" :type="imgTag"></yc-img-select>
    <yc-link-select :selectData="selectData" v-model="linkVisible" @confirm="onLinkConfirm"></yc-link-select>
  </yc-page>
</template>
<script src="./add.area.js"></script>
<style lang="scss">
@import 'scss/variables.scss';
.yc-page-add-area {
  .el-card.yc-card-wrap {
    .el-select {
      margin-right: 8px;
      .el-input {
        width: 146px;
      }
      &[large] {
        .el-input {
          width: 300px;
        }
      }
      &[normal] {
        .el-input {
          width: 130px;
        }
      }
    }
    .el-input {
      width: 200px;
      input {
        height: 40px;
        line-height: 40px;
        border-radius: 0;
      }
      &[large] {
        width: 300px;
      }
    }
    .img {
      display: inline-block;
      width: 130px;
      height: 130px;
      line-height: 130px;
      background: #f2f2f2;
      background-position: center;
      background-size: 100% 100%;
      color: #666;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
    }
    .display-wrap {
      position: absolute;
      left: 390px;
      top: 0;
      background: #fff;
    }
    .group-item {
      .el-input {
        float: left;
        input {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border-right: none;
        }
      }
      .yc-color-select {
        .input-text {
          width: 100px;
          margin-left: -4px;
          padding-top: 11px;
          padding-bottom: 10px;
          border: 1px solid #2788EA;
          border-radius: 2px;
          border-top-left-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
    }
    .el-button {
      width: 110px;
      text-align: center;
      & + span {
        width: 254px;
        line-height: 12px;
        margin-bottom: -2px;
        line-height: 14px;
        display: inline-block;
        overflow: hidden;
        text-overflow:ellipsis;
        -o-text-overflow:ellipsis;
        -webkit-text-overflow:ellipsis;
        -moz-text-overflow:ellipsis;
        white-space:nowrap;
        margin-left: 20px;
        font-size: 14px;
        color: #666;
      }
      &.blue {
        color: $primary;
        border-color: $primary;
      }
      span {
        font-size: 14px;
      }
    }
    .regionObj {
      .el-button {
        width: 60px;
      }
    }
    .yc-card-footer {
      .el-button {
        width: 130px;
        margin-right: 30px;
        margin-left: 0;
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
    .label {
      display: inline-block;
      font-size: 14px;
      color: #48556a;
      padding-left: 20px;
      &-img {
        display: block;
      }
    }
    .el-radio + .el-radio {
      margin-left: 40px;
    }
    .el-form-item[inline-block] {
      display: inline-block;
      &.select, &.datetime {
        .el-form-item__content {
          margin-left: 0 !important;
        }
      }
      [tip] {
        font-size: 14px;
        color: #999;
        margin-left: 12px;
      }
    }
    .bg {
      &-color {
        .el-form-item__label {
          width: 100px !important;
          &:before {
            content:'';
          }
        }
        .el-form-item__content {
          margin-left: 100px !important;
        }
      }
    }
    .industry-input {
      .el-input {
        width: 300px;
      }
    }
    .region-model {
      .el-select{
        margin-right: 0;
      }
    }
  }
}
</style>
