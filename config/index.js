import path from 'path';
import {version} from '../package.json';
const IS_SENTRY = process.env.NODE_TYPE === 'sentry';
const TYPE = process.env.NODE_TYPE
const DIST = path.resolve(__dirname, '../.dist');
const BUILD_DIST = path.resolve(__dirname, '../dist');
const MOCK_PORT = 3000

export default {
  dev: {
    // 生成的目录
    assetsRoot: DIST,
    assetsSubPath: 'static',
    assetsPublicPath: '/',
    port: 8087,
    sourceMap: true,
    LOCAL_ENV: { NODE_ENV: '"development"', VERSION: `'${version}'`, TYPE: `'${TYPE}'` },
    // 本地mock 的时候 使用这个代理请求
    proxyTable: TYPE === 'mock' ? {
      '/fe': {
        target: `http://127.0.0.1:${MOCK_PORT}`,
      }
    } : {},
    // 是否总是打开浏览器
    isOpenBrowser: false
  },
  build: {
    assetsRoot: BUILD_DIST,
    assetsSubDirectory: 'static',
    // assetsPublicPath: 'http://img.bqmart.cn/',
    assetsPublicPath: '/',
    sourceMap: IS_SENTRY,
    LOCAL_ENV: { NODE_ENV: '"production"', VERSION: `'${version}'`, TYPE: `'${TYPE}'` },
    bundleAnalyzerReport: false
  },
  mock: {
    port: MOCK_PORT
  }
};
