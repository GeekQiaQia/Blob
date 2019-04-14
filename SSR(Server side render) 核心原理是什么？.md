我们在webpack打包我们的代码的时候，提供了两个入口文件：

server entry; client entry;

分别供服务端和客户端使用：
* server entry :主要是为了返回我们服务端新创建的vue 实例；
* client entry ：主要是将我们的vue 实例挂载到我们的指定元素上；

![](https://user-gold-cdn.xitu.io/2019/4/14/16a1c6ca5fa80e16?w=473&h=321&f=png&s=41730)
通过webpack build 打包完成以后：

![](https://user-gold-cdn.xitu.io/2019/4/14/16a1c713b5aef4c2?w=267&h=242&f=png&s=26959)
会生成server bundle 和 client bundle 文件； 服务器会根据我们客户端的请求你，会渲染生成一个html文件；这时候的html文件是不具有交互性的，需要Hydrate 到client Bundle；由VUE 托管渲染使其具有交互性；

引用**唐老师**服务端SSR简图加深理解：
![](https://user-gold-cdn.xitu.io/2019/4/14/16a1c6371e16a1e0?w=555&h=291&f=png&s=50276)

[NuxtJS 流程图](https://zh.nuxtjs.org/guide#%E6%B5%81%E7%A8%8B%E5%9B%BE)
下图阐述了 Nuxt.js 应用一个完整的服务器请求到渲染（或用户通过 <nuxt-link> 切换路由渲染页面）的流程：
![](https://user-gold-cdn.xitu.io/2019/4/14/16a1c66e9c9c56f7?w=460&h=600&f=png&s=40067)