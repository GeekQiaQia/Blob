# 快速起步 vue-next
## [vue3中文文档](https://v3.cn.vuejs.org/)
## [vue3英文文档](https://v3.vuejs.org/)


[vue-next-dev](https://github.com/GeekQiaQia/vue-next/tree/dev)
## 安装和使用
### CDN
```
<script src="https://unpkg.com/vue@next"></script>

```
对于生产环境，我们推荐链接到一个明确的版本号和构建文件，以避免新版本造成的不可预期的破坏

### npm 安装
```
# 最新稳定版
$ npm install vue@next

```
### 命令行工具（CLI）

对于 Vue 3，你应该使用 npm 上可用的 Vue CLI v4.5 作为 @vue/cli
```
yarn global add @vue/cli
# OR
npm install -g @vue/cli

#升级最新版本

vue upgrade --next

```

### Vite 构建工具
[Vite](https://github.com/vitejs/vite)是一个 web 开发构建工具，由于其原生 ES 模块导入方式，可以实现闪电般的冷服务器启动。

```
npm init vite-app <project-name>
cd <project-name>
npm install
npm run dev

```
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a3184180dd54fd38aa8fa1d56cecbbb~tplv-k3u1fbpfcp-watermark.image)

npm run dev

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c711914de3a4f989ff7689fb6a9e82c~tplv-k3u1fbpfcp-watermark.image)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fdb0770c689b44d4bc9ef42b1e50d8e3~tplv-k3u1fbpfcp-watermark.image)

## vue-next 新特性
### Composition API 
[Composition API 英文官方介绍](https://v3.vuejs.org/guide/composition-api-introduction.html) 

[Composition API 中文官方介绍](https://v3.cn.vuejs.org/guide/composition-api-introduction.html#%E4%BB%80%E4%B9%88%E6%98%AF%E7%BB%84%E5%90%88%E5%BC%8F-api)

一个大型组件的示例，其中逻辑关注点是按颜色分组。
这种碎片化使得理解和维护复杂组件变得困难

![Vue 选项 API: 按选项类型分组的代码](https://user-images.githubusercontent.com/499550/62783021-7ce24400-ba89-11e9-9dd3-36f4f6b1fae2.png)

如果我们能够将与同一个逻辑关注点相关的代码配置在一起会更好。而这正是组合式 API 使我们能够做到的


#### setup 选项
 vue3中我们在setup()选项中使用组合式API.

新的 setup 组件选项在创建组件之前执行，一旦 props 被解析，并充当合成 API 的入口点。

:::warning
由于在执行 `setup` 时尚未创建组件实例，因此在 `setup` 选项中没有 `this`。这意味着，除了 `props` 之外，你将无法访问组件中声明的任何属性——**本地状态**、**计算属性**或**方法**。
:::


##### setup()函数接受两个参数：
 * props 属性对象；Proxy对象；
    * 不能使用es6解构它，否则将失去响应式；
    * 如需解构：可通过toRefs，在setup内部解构；
        * const {msg} =toRefs(props);
 * context 组件上下文普通对象;暴露3个组件的property
    * ctx.attrs:(ps非响应式对象) 访问组件所有特性
    * ctx.slots:(ps非响应式对象) 访问插槽内容，插槽在vue3中函数化；
        * 即ctx.slots.xxx();的方式来访问插槽内容；
    * ctx.emit:(ps触发事件方法) 向外部派发自定义事件；    

##### setup()函数中的this指向：
 * setup中的`this`就是它执行时的上下文；
    * 如果是esm方式打包的，this为undefined;
    * 如果是单文件的方式运行的，this为window;
    * 源码中，setup()在解析其他组件选项之前被调用；this不再指向当前活跃实例的引用；
 * **结论**：forget about `this`;vue3的setup中无需考虑`this`即可;
 #### setup()中，四种方式实现数据响应式：
  * ref() 返回响应式对象；
  * reactive();将一个对象响应化；
  * toRefs(); 将一个响应式对象ref处理；
  * toRef(); 将一个对象的某个属性ref处理
```
<script>
  import { ref } from 'vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
   // 当setup中定义的响应式数据和data()选项中定义的重复时，vue3优先获取data中的数据；
  setup(props,ctx){
    
    const counter = ref(0)  // ref 返回响应式对象 {value:0}
    
    console.log(counter.value);  // 0 
    
    return {counter }
  },
  data() {
    return {
      counter: 1
    }
  }
}
</script>

```
#### 使用ref响应式变量（创建一个响应式引用）

```
console.log(counter) // { value: 0 }

```
##### 如上：为什么使用包装器对象，来包裹一个基本数据类型值？

答：`
因为
1、在 JavaScript 中，Number 或 String 等基本类型是通过值传递的，而不是通过引用传递的：
在任何值周围都有一个包装器对象，这样我们就可以在整个应用程序中安全地传递它，而不必担心在某个地方失去它的响应性。
`
![按引用传递与按值传递](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9e2b473d9c342ce845d9bc56700e2b2~tplv-k3u1fbpfcp-zoom-1.image)


#### 生命周期钩子注册内部setup
 * composition API生命周期钩子名称为： option API 名称前缀加 `on`

* 你可以通过在生命周期钩子前面加上 “on” 来访问组件的生命周期钩子。

下表包含如何在 [setup ()](composition-api-setup.html) 内部调用生命周期钩子：

|    选项 API       | Hook inside `setup` |
| ----------------- | -------------------------- |
| `beforeCreate`    | Not needed\*               |
| `created`         | Not needed\*               |
| `beforeMount`     | `onBeforeMount`            |
| `mounted`         | `onMounted`                |
| `beforeUpdate`    | `onBeforeUpdate`           |
| `updated`         | `onUpdated`                |
| `beforeUnmount`   | `onBeforeUnmount`          |
| `unmounted`       | `onUnmounted`              |
| `errorCaptured`   | `onErrorCaptured`          |
| `renderTracked`   | `onRenderTracked`          |
| `renderTriggered` | `onRenderTriggered`        |


```

<script>
  import { getCurrentInstance, onMounted, ref,watch,computed  } from 'vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
   // 当setup中定义的响应式数据和data()选项中定义的重复时，vue3优先获取data中的数据；
  setup(props,ctx){
    
    const instance= getCurrentInstance();  // 获组件实例

    const counter = ref(0)  // ref 返回响应式对象 {value:0}
    const twiceTheCounter = computed(() => counter.value * 2)
    console.log(counter.value);  // 0 

     onMounted(()=>{
       // 在组件挂载的时候，通过组件实例的上下文获取setup外部属性；
        console.log(instance.ctx.counter);  // 1;
     });
    console.log(twiceTheCounter);
    watch(()=>{return counter.value}, (newValue, oldValue) => {
        console.log('The new counter value is: ' + counter.value)
      })
    return {counter,twiceTheCounter }
  },
  data() {
    return {
      counter2: 1
    }
  }
}
</script>

```
setup()执行时间很早，甚至早于created; 因此在setup()中访问外部属性，需要在`onMounted`钩子中进行访问才有效；

#### wantch && computed 响应式更改；
watch()函数侦听器，接受3个参数
* 一个`响应式引用`或我们想要侦听的 getter 函数 ()=>{}
* 一个回调
* 可选的配置选项


[项目示例地址](https://github.com/GeekQiaQia/vue-next/tree/dev/packages/vue/examples/vite-app/viteApp)
```


<script>
  import { getCurrentInstance, onMounted, ref,watch,computed  } from 'vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
   // 当setup中定义的响应式数据和data()选项中定义的重复时，vue3优先获取data中的数据；
   //  在源码中先从setupState中取值，再从data中取值；
  setup(props,ctx){
    
    const instance= getCurrentInstance();  // 获组件实例

    const counter = ref(0)  // ref 返回响应式对象 {value:0}
    const twiceTheCounter = computed(() => counter.value * 2)  // 输出只读属性的响应式引用；
    console.log(counter.value);  // 0 

     onMounted(()=>{
       // 在组件挂载的时候，通过组件实例的上下文获取setup外部属性；
        console.log(instance.ctx.counter);  // 1;
     });
    console.log(twiceTheCounter);
    watch(()=>{return counter.value}, (newValue, oldValue) => {
        console.log('The new counter value is: ' + counter.value)
      })
    return {counter,twiceTheCounter }
  },
  data() {
    return {
        // 与setup中变量相同时；counter从data中取值；
      counter2: 1
    }
  }
}
</script>


```

#### Provide/Inject

* `只能` 在当前活动实例的 `setup()` 期间调用
 [用法和vue2类似](https://v3.cn.vuejs.org/guide/composition-api-provide-inject.html#%E8%AE%BE%E6%83%B3%E5%9C%BA%E6%99%AF)
#### use 组合式函数；

 使用组合函数组织代码； useCounter();

```
<script>
  import { getCurrentInstance, onMounted, ref,watch,computed  } from 'vue'
  // 也可单独封装到一个js文件中；
  function useCounter(){
     const counter = ref(0)  // ref 返回响应式对象 {value:0}
     const twiceTheCounter = computed(() => counter.value * 2)
     console.log(counter.value);  // 0 

     watch(()=>{return counter.value}, (newValue, oldValue) => {
        console.log('The new counter value is: ' + counter.value)
      })

      return {
         counter,twiceTheCounter
      }
  }

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
   // 当setup中定义的响应式数据和data()选项中定义的重复时，vue3优先获取data中的数据；
   //  在源码中先从setupState中取值，再从data中取值；
  setup(props,ctx){
      const { counter,twiceTheCounter }=useCounter();
      const instance= getCurrentInstance();  // 获组件实例

    // const counter = ref(0)  // ref 返回响应式对象 {value:0}
    // const twiceTheCounter = computed(() => counter.value * 2)
    // console.log(counter.value);  // 0 
    
    // console.log(twiceTheCounter);
    // watch(()=>{return counter.value}, (newValue, oldValue) => {
    //     console.log('The new counter value is: ' + counter.value)
    //   })

       onMounted(()=>{
       // 在组件挂载的时候，通过组件实例的上下文获取setup外部属性；
        console.log(instance.ctx.counter);  // 1;
     });

    return {counter,twiceTheCounter }
  },
  data() {
    return {
        // 与setup中变量相同时；counter从data中取值；
      counter2: 1
    }
  }
};

</script>

```

### Teleport
 [Teleport 英文官方文档](https://v3.vuejs.org/guide/teleport.html)

 [Teleport 中文官方文档](https://v3.cn.vuejs.org/guide/teleport.html)

 Teleport 提供了一种干净的方法，允许我们控制在 DOM 中哪个父节点下呈现 HTML，而不必求助于全局状态或将其拆分为两个组件。

 #### 官方例子，简单易懂：
 ```
app.component('modal-button', {
  template: `
    <button @click="modalOpen = true">
        Open full screen modal! (With teleport!)
    </button>

    <teleport to="body">
      <div v-if="modalOpen" class="modal">
        <div>
          I'm a teleported modal! 
          (My parent is "body")
          <button @click="modalOpen = false">
            Close
          </button>
        </div>
      </div>
    </teleport>
  `,
  data() {
    return { 
      modalOpen: false
    }
  }
})

 ```
 #### 同一个节点挂载多个teleport
 ```
 <teleport to="#modals">
  <div>A</div>
</teleport>
<teleport to="#modals">
  <div>B</div>
</teleport>

<!-- result-->
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
 ```
### Fragments
[Fragments 英文官方文档](https://v3.vuejs.org/guide/migration/fragments.html)

[Fragments 中文官方文档](https://v3.cn.vuejs.org/guide/migration/fragments.html)

Vue 3 现在正式支持了多根节点的组件

在 3.x 中，组件可以包含多个根节点！但是，这要求开发者显式定义 attribute 应该分布在哪里。
```
<!-- Layout.vue -->
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>

```
有关 attribute 继承如何工作的详细信息
[组件属性继承](https://v3.cn.vuejs.org/guide/component-attrs.html)

### Emits Componnet Option 

[组件自定义事件-英文官方文档](https://v3.vuejs.org/guide/component-custom-events.html)

[组件自定义事件-中文官方文档](https://v3.cn.vuejs.org/guide/component-custom-events.html)

触发的事件名需要完全匹配监听这个事件所用的名称。
即：如果用户自定义事件名为驼峰命名，则监听事件名必须为驼峰命名；kebab-case 命名同理；

官方举例，简单易懂：
```
this.$emit('myEvent')

<!-- 没有效果 -->
<my-component @my-event="doSomething"></my-component>

```
`v-on` 事件监听器在 DOM 模板中会被自动转换为`全小写` (因为 HTML 是大小写不敏感的)，所以` @myEvent `将会变成 `@myevent`——导致 myEvent 不可能被监听到。

**总结**：官方推荐使用：`kebab-case `的事件名。


### v-model参数

默认情况下，
* 组件上的 v-model 使用 modelValue 作为 prop 和 update:modelValue 作为事件。
* 我们可以通过向 v-model 传递参数来修改这些名称：


官方举例，简单易懂：
```
<my-component v-model:title="bookTitle"></my-component>

```
子组件将需要一个 title prop 并抛出事件 update:title ：

```
app.component('my-component', {
  props: {
    title: String
  },
  emits: ['update:title'],
  template: `
    <input 
      type="text"
      :value="title"
      @input="$emit('update:title', $event.target.value)">
  `
})
```





## [vue3迁移指南](https://v3.cn.vuejs.org/guide/migration/fragments.html)
### 自定义组件使用v-model
 
当用在组件上时，`v-model` 则会这样：

```html
<custom-input
  :model-value="searchText"
  @update:model-value="searchText = $event"
></custom-input>
```
::: warning
请注意，我们在这里使用的是 `model-value` ，因为我们使用的是 DOM 模板中的 kebab-case。你可以在 [DOM Template Parsing Caveats](#dom-template-parsing-caveats) 部分找到关于 kebab cased 和 camelCased 属性的详细说明
:::

为了让它正常工作，这个组件内的 `<input>` 必须：

- 将其 `value` attribute 绑定到一个名叫 `modelValue` 的 prop 上
- 在其 `input` 事件被触发时，将新的值通过自定义的 `update:modelValue` 事件抛出

写成代码之后是这样的：

```js
app.component('custom-input', {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: `
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  `
})
```

现在 `v-model` 就应该可以在这个组件上完美地工作起来了：

```html
<custom-input v-model="searchText"></custom-input>
```

#### Template Refs
[template Refs](https://v3.vuejs.org/guide/composition-api-template-refs.html#template-refs)

* reference:当使用组合API时，响应引用和模板引用的概念是统一的。 

* 为了获得对模板内元素或组件实例的引用，我们可以像往常一样声明一个ref，并从setup()中返回它:

这里，我们在渲染上下文上暴露 root，并通过ref="root"将其绑定到div上，作为div的ref。在虚拟DOM patch 算法,如果VNode ref的key和 render context 中的ref 变量完全相同,VNode的相应元素或组件实例的值将分配给那个ref。这是虚拟DOM挂载/补丁过程中执行,所以tempalte ref 只会分配值初始render()。

#### template v-for
 template v-for  和非 - v-for 节点上 key 用法已更改
- Vue 2.x 建议在 v-if/v-else/v-else-if 的分支中使用 key
- Vue 3.x 中仍能正常工作，但不再建议，因为没有为条件分支提供 key 时，也会自动生成唯一的 key。

- 在 Vue 2.x 中 标签`<template> `不能拥有 key，在 Vue 3.x 中 key 则应该被设置在` <template> `标签上。

更多详见[指南](https://v3.cn.vuejs.org/guide/migration/fragments.html)
## 源码分析
  
  ### 响应式数据类型
vue3 只能对 `Object`、`Array`、`Map`、`Set`、`WeakMap`、`WeakSet` 几种数据类型的target实现数据的响应式；

源码为证：
```
// http://172.25.154.30:5000/packages/reactivity/src/reactive.ts

function targetTypeMap(rawType: string) {
  switch (rawType) {
    case 'Object':
    case 'Array':
      return TargetType.COMMON
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return TargetType.COLLECTION   // 返回集合类型；
    default:
      return TargetType.INVALID   // 否则返回 无效类型；
  }
}

```

## vue3 对常用类型的封装


 // packages/shared/src/index.ts

 ```
 const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (
  val: object,
  key: string | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key)

export const isArray = Array.isArray
export const isMap = (val: unknown): val is Map<any, any> =>
  toTypeString(val) === '[object Map]'
export const isSet = (val: unknown): val is Set<any> =>
  toTypeString(val) === '[object Set]'

export const isDate = (val: unknown): val is Date => val instanceof Date
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

 ```
 

 ## [vue初始化源码分析思维导图](https://github.com/GeekQiaQia/vue-next/blob/dev/packages/vue/examples/composition/init%20vue3%20createApp.xmind)

结合思维导图，具体源码后续拆开分析

[思维导图地址](https://github.com/GeekQiaQia/vue-next/blob/dev/packages/vue/examples/composition/init%20vue3%20createApp.xmind)
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d5d083ff5604bd3af9ef9e60bcfadeb~tplv-k3u1fbpfcp-watermark.image)


## 如何给vue-next提issue
[vue-next: repro-new-issue](https://new-issue.vuejs.org/?repo=vuejs/vue-next)
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/436ca8446da54f7cb083b22a0eef2bd6~tplv-k3u1fbpfcp-watermark.image)

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

**Note:** 对象解构必须封装在圆括号中——这是JavaScript自己的语法要求，以避免在块语句中产生歧义。

更多ref：语法糖特性及讨论：
详见：[ref-sugar](https://github.com/vuejs/rfcs/blob/ref-sugar/active-rfcs/0000-ref-sugar.md)


