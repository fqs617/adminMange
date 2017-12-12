<template>
  <yc-page class="demo-form">
    <el-card>
      <el-form class="yc-form" ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item prop="iphone" label="手机:" required>
          <el-input v-model="form.iphone" placeholder="请选择一个行业"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="汉字:" required>
          <el-input v-model="form.name" placeholder="汉字"></el-input>
        </el-form-item>
        <el-form-item prop="uname" label="姓名:" required>
          <el-input v-model="form.uname" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item prop="date" label="日期:" required>
          <yc-form-item-content tip="结束时间时间小于开始时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date.date1" ></el-date-picker>至
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date.date2" ></el-date-picker>
          </yc-form-item-content>
        </el-form-item>
        <el-form-item prop="email" label="email:" >
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="yuan" label="远程验证:" >
          <el-input v-model="form.yuan" placeholder="输入哈哈"></el-input>
        </el-form-item>
        <el-form-item prop="array" label="array:" >
          <el-cascader :options="options" v-model="form.array" placeholder="验证别的数据类型"></el-cascader>
        </el-form-item>
        <el-form-item prop="array1" label="array1:" >
          <el-cascader change-on-select :options="options" v-model="form.array1" placeholder="验证别的长度"></el-cascader>
        </el-form-item>
        <el-form-item prop="enum" label="enum:" >
          <el-input v-model="form.enum" placeholder="必须输入 [1,2,3,4] 其中的任意一项"></el-input>
        </el-form-item>
        <el-form-item prop="array2" label="自定义 array:" >
          <el-input v-model="form.array2" placeholder="请输入逗号分隔的"></el-input>
        </el-form-item>
      </el-form>
      <yc-card-footer>
        <el-button size="large">取消</el-button>
        <el-button type="info" @click="onSumbit" size="large">保存</el-button>
      </yc-card-footer>
    </el-card>
    {{ form.array2 }}
  </yc-page>
</template>
<script>
import ValidatorBase from '@/base/validator.base'
import TestService from '@/services/test.service'
export default {
  data() {
    return {
      options: [
        {
          value: 1,
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则'
          }]
        },
        {
          value: 'zhinan1',
          label: '指南1',
          children: [{
            value: 'shejiyuanze1',
            label: '设计原则1'
          }]
        }
      ],
      form: {
        iphone: '',
        name: '',
        date: {
          date1: '',
          date2: ''
        },
        email: '',
        yuan: '',
        array: [],
        array1: [],
        array2: ''
      },
      rules: {
        iphone: [
          {required: true, message: '手机号必填1', trigger: 'blur'},
          {message: '手机号必须是11位', pattern: ValidatorBase.pattern.isPhone, trigger: 'blur'}
        ],
        uname: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {message: '姓名正确的规则', pattern: ValidatorBase.pattern.enAndZn, trigger: 'blur'}
        ],
        name: {required: true, message: '必须输入汉字', pattern: ValidatorBase.pattern.isChinese, trigger: 'blur'},
        date: [
          {
            type: 'object',
            fields: {
              date1: [
                {type: 'date', required: true, message: '请输入第一个日期', trigger: 'change'}
              ],
              date2: [
                {type: 'date', required: true, message: '请选择第二个日期', trigger: 'change'},
                {
                  validator: (rule, value, callback) => {
                    if (value.getTime() <= this.form.date.date1.getTime()) {
                      callback('第二个日期必须大于第一个日期')
                      return
                    }
                    callback()
                  },
                  trigger: 'change'}
              ]
            }
          }
        ],
        email: {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'},
        yuan: {
          trigger: 'blur',
          validator: async (rule, value, callback) => {
            if (value) {
              let {vaild} = await this.TestService.vaild({name: value})
              if (vaild) {
                callback(`${value} 已经存在咯`)
                return
              }
            }
            callback()
          }
        },
        array: {
          type: 'array',
          required: true,
          message: '请输入正确的数据'
        },
        array1: {
          type: 'array',
          message: '必须选择两个',
          len: 2,
          fields: {
            0: {type: 'number', message: 'value must is number'}
          }
        },
        enum: {type: 'enum', message: '必须输入 [1,2,3,4] 其中的任意一项', enum: ['1', '2', '3', '4']},
        array2: {
          type: 'array',
          message: '请输入正确的格式',
          transform: val => {
            return val.indexOf(',') !== -1 ? val.split(',') : [val]
          },
          min: 2,
          max: 5,
          trigger: 'blur'}
      }
    }
  },
  created() {
    this.TestService = new TestService()
  },
  methods: {
    onSumbit() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false
        }
        let params = this.$bqUtils.copy(this.form)
        params.startDate = this.$bqUtils.dateFormat(params.date.date1, 'yyyy-MM-dd')
        params.endDate = params.date.date2
        delete params.date
        console.log(params)
      })
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
