# vue3:ref-Sugar 体验
[体验项目-传送门](https://github.com/GeekQiaQia/vue-next/tree/dev/packages/vue/examples/vite-app/viteApp)

个人感觉`ref-Sugar` 这颗糖很甜，简化了`.value`的这种书写方式；可通过`debug`调试的方式，看到`语法糖`被`编译结果`；

[github:ref-Sugar-rfc](https://github.com/vuejs/rfcs/blob/ref-sugar/active-rfcs/0000-ref-sugar.md)
## 升级最新编译器
如图所示：我们的项目为vite-app,当前package.json中vue版本以及compiler-sfc版本均为^3.0.4；
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33abb3795d1b449596b7787275672f3e~tplv-k3u1fbpfcp-watermark.image)
## ^3.0.4仍然为试验提议阶段
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee626b7768544ae5afce894e7b12731d~tplv-k3u1fbpfcp-watermark.image)
### 执行版本更新命令
```
npm i vue@next -S 

npm i @vue/compiler-sfc -D

```
当前最新版本即为 ^3.0.4
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f9e7052414e4915a1022aa4da85942e~tplv-k3u1fbpfcp-watermark.image)
#### 新建RefSugar.vue组件；如下所示：
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2eea47a036574233b57b8bd7d5199f66~tplv-k3u1fbpfcp-watermark.image)
<details>
<summary>RefSugar.vue</summary>

```vue
<template>
    <div>
    <span>refSugar </span>    
    <button @click="inc">{{ count }}</button>
    <div>the computed variable pulsOne: {{pulsOne}}</div>
    </div>
</template>

<script setup>
import {watch,computed} from 'vue'
// declaring a variable that compiles to a ref
ref: count = 1
ref:pulsOne=computed(()=>count+1);

function inc() {
  // the variable can be used like a plain value
  count++
}


// access the raw ref object by prefixing with $
console.log($count.value)

watch($count,()=>{
    console.log(count);
})
</script>

<style scoped>

</style>
```
</details>
<p></p>

####  在app.vue引入组件

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3baeaac9d329446bae6bc9afa4d42a3d~tplv-k3u1fbpfcp-watermark.image)
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3df50e1638904414a146f0c4ba36c09d~tplv-k3u1fbpfcp-watermark.image)

#### ref-Sugar被编译结果
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8571c9620e74197b1e0fa15b8d6ce5d~tplv-k3u1fbpfcp-watermark.image)

## Vue RFCs 
[Vue RFCs ](https://github.com/vuejs/rfcs/pulls)

### 新提议语法糖

[vuejs:ref-sugar](https://github.com/vuejs/rfcs/blob/ref-sugar/active-rfcs/0000-ref-sugar.md)

**官方举例，简单易懂**
 
介绍一个在 `<script setup>` 内使用 refs 无需 `.value` 的基于编译器的语法糖；

#### 简单示例

```html
<script setup>
// declaring a variable that compiles to a ref
ref: count = 1

function inc() {
  // the variable can be used like a plain value
  count++
}

// access the raw ref object by prefixing with $
console.log($count.value)
</script>

<template>
  <button @click="inc">{{ count }}</button>
</template>
```

<details>
<summary>编译后的输出结果</summary>

```html
<script setup>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(1)

    function inc() {
      count.value++
    }

    console.log(count.value)

    return {
      count,
      inc
    }
  }
}
</script>

<template>
  <button @click="inc">{{ count }}</button>
</template>
```
</details>



**注意** 所有的 composition API 都可以再 `<script setup>` 中使用；

#### 与Non-Literals互动

`ref:` 将使用 `ref()`来包裹一个赋值的变量。如果这个变量已经是一个ref 变量，则它将返回 `as-is`。这意味着我们可以使用 `ref:` 来声明任何一个函数返回的 `ref` 变量；举例：
`computed`:
 ```js
import { computed } from 'vue'

ref: count = 0
ref: plusOne = computed(() => count + 1)
console.log(plusOne) // 1
```

<details>
<summary>编译后的输出结果</summary>

```js
import { computed, ref } from 'vue'

const count = ref(0)
// `ref()` around `computed()` is a no-op here since return value
// from `computed()` is already a ref.
// computed()返回的将是一个 ref 引用型变量
const plusOne = ref(computed(() => count.value + 1))
```
</details>
<p></p>

或者，任何返回ref 引用型变量的自定义的composition 函数：

```js
import { useMyRef } from './composables'

ref: myRef = useMyRef()
console.log(myRef) // no need for .value
```

<details>
<summary>编译后的输出结果</summary>

```js
import { useMyRef } from './composables'
import { ref } from 'vue'

// if useMyRef() returns a ref, it will be untouched
// otherwise it's wrapped into a ref
const myRef = ref(useMyRef())
console.log(myRef.value)
```
</details>
<p></p>

**Note:** 如果使用typescript ,这个语法糖行为将会产生一个类型匹配的问题，将会在[TypeScript Integration](#typescript-integration) 讨论；

#### 解构

composition 函数通常返回refs对象。要声明多个具有解构的ref绑定，可以使用[解构赋值](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment):

```js
ref: ({ x, y } = useMouse())
```

<details>
<summary>编译后的输出结果</summary>

```js
import { ref } from 'vue'

const { x: __x, y: __y } = useMouse()
const x = ref(__x)
const y = ref(__y)
```
</details>
<p></p>

#### 解构编译结果示例：
<details>
<summary>RefSugar-destruction.vue</summary>

```vue
<template>
    <div>
    <span>refSugar </span>    
    <button @click="inc">{{ count }}</button>
    <div>the computed variable pulsOne: {{pulsOne}}</div>
    <div> ref destruction {{counter}} {{twiceTheCounter}} </div>
    </div>
</template>

<script setup>
 import useCounter from './useCounter';
import {watch,computed} from 'vue'
// declaring a variable that compiles to a ref
ref: count = 1;
ref:pulsOne=computed((()=>count+1));

ref:({counter,twiceTheCounter}=useCounter());
function inc() {
  // the variable can be used like a plain value
  count++
}


// access the raw ref object by prefixing with $
console.log($count.value)

watch($count,()=>{
    console.log(count);
})
</script>

<style scoped>

</style>
```
</details>
<p></p>

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff33d5adde7d46998c8df8f56e1eed8c~tplv-k3u1fbpfcp-watermark.image)

**Note:** 对象解构必须封装在圆括号中——这是JavaScript自己的语法要求，以避免在块语句中产生歧义。

更多ref：语法糖特性及讨论：
详见：[ref-sugar](https://github.com/vuejs/rfcs/blob/ref-sugar/active-rfcs/0000-ref-sugar.md)



