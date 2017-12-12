# yc

> 云采后台管理系统

## 启动

```shell
#https://yarnpkg.com/zh-Hans/docs/install#mac-tab

npm install --global yarn
yarn install
yarn start
```


```shell
// sass 报错处理
npm rebuild node-sass
```

## eslint

### 取消一些验证规则

```js
/* eslint-disable */
alert('foo');// eslint-disable-line 当前行上禁用所有规则：
/* eslint-enable */
```

## 调试

> 移动端调试时  发现 热更新 在部分移动端浏览器会报错 所以 就提供了 yarn run dev:x5 不启动热更新的方式 用于在hot reload 报错的情况下使用


## 依赖引入

> 需使用 babel 插件 babel-plugin-syntax-dynamic-import

``` js
const draggable = () => import('vuedraggable')
```