import { API_HOST } from '@/config/global.config'
import fetch from '@/config/axios.config'
// import encrypt from '@/lib/crypto/encrypt.js'
// import qs from 'qs'
import cookie from 'arale-cookie'

const DEFAULT_CONFIG = {
  isAutoMsg: true,
  // 自动loading
  isLoading: true,
  hasUid: true,
  // isApiHost  是否添加前缀 默认是true
  isApiHost: true
}

// const TOKEN = '6qvlkh6khz'

const POST_HEADER = {
  headers: {
    'content-type': 'application/json'
  }
}

/**
 * get 提交
 * @param {String} url 请求的url
 * @param {any} params  请求的参数
 * @param {Boolean} isApiHost  是否添加前缀 默认是true
 * @param {Obejct} config  请求配置
 * @returns Promise
 */
export function get(url, params = {}, config = {}) {
  let opts = {...DEFAULT_CONFIG, ...config}
  let operatorId = cookie.get('operatorId')
  if (operatorId && opts.hasUid) {
    params.operatorId = operatorId
  }
  if (opts.hasUid && !params.operatorId) {
    window.location.href = '/login'
    return
  }
  // opts.params = encrypt.sign(params, token)
  opts.params = params
  return fetch.get(getUrl(url, opts.isApiHost), opts)
}

/**
 *
 * post 提交
 * @param {String} url 请求的url
 * @param {any} [params={}] 请求的参数
 * @param {Boolean} isApiHost 是否添加前缀 默认是true
 * @param {any} isApiHost 请求配置
 * @returns Promise
 *
 * @memberOf HttpBase
 */
export function post(url, params = {}, config = {}) {
  let opts = {...DEFAULT_CONFIG, ...POST_HEADER, ...config}
  let operatorId = cookie.get('operatorId')
  if (operatorId && opts.hasUid) {
    params.operatorId = operatorId
  }
  if (opts.hasUid && !params.operatorId) {
    window.location.href = '/login'
    return
  }
  // params = encrypt.sign(params, token)
  return fetch.post(getUrl(url, opts.isApiHost), params, opts)
}

/**
 *
 * 上传
 * @export
 * @param {any} url 请求的url
 * @param {any} [params={}] 请求的参数
 * @param {any} [config={}] 配置
 * @returns Promise
 */
export function upload(url, params = {}, config = {}) {
  let opts = {...DEFAULT_CONFIG, ...POST_HEADER, ...config}
  // params = encrypt.sign(params, TOKEN)
  let form = new FormData()
  Object.keys(params).forEach(key => {
    form.append(key, params[key])
  })
  return fetch.post(getUrl(url, opts.isApiHost), form, opts)
}

/**
 *
 * url 处理如果 isApiHost 为true 则添加 API_HOST
 * @param {any} url
 * @param {any} isApiHost
 * @returns
 *
 */
function getUrl(url, isApiHost) {
  if (!isApiHost) {
    return url
  }
  let arr = [API_HOST]
  arr.push(url)
  return arr.join('')
}
