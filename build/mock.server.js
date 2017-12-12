import ora from 'ora'
// https://github.com/shelljs/shelljs
import 'shelljs/global'
import express from 'express'
import Config from '../config/index'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import mock from '../mock'

let spinner = ora('mock 服务开始启动...')
spinner.start()

const app = express()

// 跨域 @see https://github.com/expressjs/cors
app.use(cors({
  origin: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-My-Custom-Header', 'X-Another-Custom-Header'],
  credentials: true
}))

// body 解析 create application/json parser
app.use(bodyParser.json())

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/static', express.static(path.resolve(__dirname, '../static/')))

mock(app)

//端口号
let port = process.env.PORT || Config.mock.port
let uri = 'mock 接口地址: http://localhost:' + port

export default app.listen(port, err => {
  if (err) {
    console.log(err)
    return
  }
  console.log(uri)
  spinner.stop();
})
