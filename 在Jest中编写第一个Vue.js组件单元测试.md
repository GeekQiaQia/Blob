## vue-test-utils
[vue-test-utils](https://github.com/vuejs/vue-test-utils)基于[avoriaz](https://github.com/eddyerburgh/avoriaz)的官方VueJS测试库.[EddYerburgh](https://twitter.com/EddYerburgh)在avoriaz做的很棒。它提供了所有必须的工具使得在vueJS 应用中很简单的写单元测试

另一方面，[Jest](https://jestjs.io/)是由Facebook开发的测试框架，它让测试变的轻而易举且有极好的特性，例如：
* 默认情况几乎无需配置
* 非常cool的交互模式
* 可以并行运行测试
* 监听、存根和mock
* 内建代码覆盖率
* Snapshop 快照测试
* Module 模块模拟工具

也许你已经使用karma+mocha+chai+sinon...工具写测试,但是你将会发现使用jest有多简单。

## 创建一个简单的vue-test 项目

让我们使用 vite 创建一个新项目:
```js
npm install create-vite-app -g // 全局安装vite
npx create-vite-app project-name // 创建项目

```
创建完成：
```
    Done. Now run:

    cd vue-test
    npm install (or `yarn`)
    npm run dev (or `yarn dev`)
```
安装相关依赖:
```js
# Install dependencies
npm i -D jest vue-jest jest-vue-preprocessor  babel-jest 

```
[jest-vue-preprocessor](https://github.com/vire/jest-vue-preprocessor)用来使jest能够识别`.vue`文件,[babel-jest](https://github.com/babel/babel-jest)为了能够与Babel集成；

让我们在`package.json`中添加如下Jest 配置：
```js
 "jest": {
    "moduleNameMapper": {
      "^vue$": "vue/dist/vue.common.js"
    },
    "moduleFileExtensions": [
      "js",
      "vue"
    ],
    "transform": {
      "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
      ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
    }
  }
```
`moduleFileExtensions`将告诉Jest要查找哪些扩展名，并`转换`文件扩展名使用哪个预处理器。

最后，在 `package.json` 添加一个 `test` 脚本:
```js
{
  "scripts": {
    "test": "jest",
    ...
  },
  ...
}

```
## 测试一个组件 Component
我将使用一个单文件组件，首先在`src/components`创建一个`MessageList.vue`组件:
```js
<template>
    <ul>
        <li v-for="message in messages">
            {{ message }}
        </li>
    </ul>
</template>

<script>
export default {
  name: 'list',
  props: ['messages']
}
</script>
```