### vue中为什么使用vuex?应用场景有哪些？
 
 view --- actions --- state
 
![](https://user-gold-cdn.xitu.io/2019/4/8/169fd899b2121b14?w=492&h=317&f=png&s=37578)

view 通过中间层actions 修改state;

当项目庞大的时候：

1. 需要动态的注册响应式数据；
2. 需要命名空间namespace 来管理组织我们的数据；
3. 希望通过插件，来更改记录；方便调试；
以上这些需要和希望，都是我们vuex 需要做的一些事情；

在vuex 中；完成actions mutations state 动作；
view 通过dispatch 的方式，触发actions 中的动作，在actions 中，可以完成与后端的backend的异步操作；

通过commit 的方式，触发mutations的动作；在mutations 中；同步的方式完成state数据的修改；之所以以同步的方式修改数据，是因为需要再devtools中记录更改前后的数据状态，方便调试debug;

**问题**：vuex 是通过什么样的方式提供响应式数据的？
    
    