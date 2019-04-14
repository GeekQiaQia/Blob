#vue-router中路由的模式以及底层原理

路由类型：

	Hash模式：吃藕，#/...;无法使用锚点定位；
    History模式:需要后端配合，IE9不支持（可使用强制刷新处理）
    
底层原理通过**唐老师**的一张图理解：

![](https://user-gold-cdn.xitu.io/2019/4/14/16a1b5ad46fdb4de?w=1327&h=428&f=png&s=115957)

在vue-router模块中：仍然是利用Object.defineProperty()API，将路由做响应式处理；
当路由跳转的时候，执行updateRoute()函数；在Vue.util.defineReactive_route()中将路由响应式处理；在router-view 中判断当前路由，并向<router-view>显示对应组件；


