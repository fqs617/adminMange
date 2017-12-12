
// 接口地址 mock 地址 /fe/
// export let API_HOST = process.env.TYPE === 'test' ? 'http://test.azeroth.bqmart.cn/azeroth/'
// : process.env.TYPE === 'mock' ? 'http://test.azeroth.bqmart.cn/azeroth/' : 'http://api.bqmart.cn:8080/'

export let API_HOST = bq.isProductionAPI ? 'http://yuncai.backend.bqmart.cn/azeroth/' : 'http://test.azeroth.bqmart.cn/azeroth/'

// export let API_HOST = 'http://192.168.0.90:8084/azeroth/'
// 版本
export let VERSION = bq.version || '1.0'
