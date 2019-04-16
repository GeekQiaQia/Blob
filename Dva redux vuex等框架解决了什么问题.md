答：在我看来：
- 以上应用框架都是Flux思想的实现；
- 以上框架都解决了数据流向的问题；

下面我们来看一下Dva的数据流向：

![](https://user-gold-cdn.xitu.io/2019/4/16/16a269a4e99d1e2a?w=875&h=260&f=png&s=57079)

- 数据的改变发生：通常是通过用户交互行为或者浏览器行为（如路由跳转等）触发的，
- 当此类行为会改变数据的时候可以通过 dispatch 发起一个 action
- 如果是同步行为会直接通过 Reducers 改变 State 
- 如果是异步行为（副作用）会先触发 Effects 然后流向 Reducers 最终改变 State；
- **所以在 dva 中：** 数据流向非常清晰简明，并且思路基本跟开源社区保持一致（也是来自于开源社区）。


[参考Dva官网](https://dvajs.com/guide/concepts.html#%E6%95%B0%E6%8D%AE%E6%B5%81%E5%90%91)