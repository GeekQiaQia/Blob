## 前言：

在WEB1.0时代，数据改变与页面刷新的机制比较简单粗暴：“后端改变state,前端整个页面view刷新”；


web2.0时代，我们希望：
> “改变state，view自动更新”

## 虚拟DOM
> 浏览器里的DOM tree克隆一份完整的镜像到内存，也就是所谓的“virtual DOM”，
> 
当页面的state发生变化以后，根据最新的state重新生成一份virtual DOM（相当于在内存里“刷新”整个页面），将它和之前的virtual DOM做比对（diff），然后在浏览器里只渲染被改变的那部分内容，这样浏览器的性能损耗和用户体验不就都不成问题了吗？


**在绝大多数的WEB开发中：**js引擎的性能和内存完全没有被充分利用，我们正好可以火力全开，利用js的这部分性能红利，实现内存中virtual DOM的diff工作，完美！

## ReactJS:


- react非常具有表达力的jsx语法和完善的模块化结构，

- view的组件化和模块化非常有利于分工协作、代码的积累复用以及单元测试，

伴随着reactJS 前端框架的崛起，**redux**这些专注于管理state的轻量级框架横空出世；

*由于React的“state-view”模式可以让开发者的大脑得到一种“单向流”的舒适体验。那为什么单向流的思维状态更加舒适呢？

这是因为在**单向流**状态下，要解决的问题如同一个函数映射，已知什么（比如state）是固定不变的，要得到什么（比如view）是定义明确，而人的思维非常习惯于这种定义明确的、没有“分叉”和“环路”的函数式问题。

页面呈现的state可以通过模块属性（props）从父模块传递到子模块。这种"树状"分流机制，有点像植物将养分（state）从根部不断运输到细枝末叶的过程*


**Flux思想:**


- flux 与 react 是完全独立的概念，咩有直接的关系；
- flux 不是JS库，而是一种前端代码的组织思想;=>**redux 库可以认为是flux 思想的实现；**
- flux 的核心思想和代码实现虽然很简单，但是在model(view)-view 开发模式中，起着非常重要的作用；

  
* mvc设计思想：
MVC开发模式, 主要讲的是在开发交互应用时，怎样将不同功能的代码拆分到不同文件或区块，以便降低代码的耦合度，提高代码的可读性和健壮性。
**简单理解就是**：要将 Model-View-Controller 这三部分代码拆分到不同文件。当开发小型的web应用的时候，mvc可以应付；但是当中大型应用的时候，多model,多view的时候，model-view的‘单向流’被破坏带来的混乱，带来难以接受的局面；这种设计模式的model-view关系；facebook团队总结说：MVC模式难以scale up

![](https://user-gold-cdn.xitu.io/2019/4/12/16a0fae4e9ff5d6e?w=651&h=412&f=png&s=129338)

**flux设计模式就是解决以上model-view混乱**=> 
## flux 设计思想的诞生

现在我们又可以从服务器端的MVC模式中获得灵感了！

因为我们注意到，服务器端的controller通常也需要对很多Model产生修改，但在代码结构中却集中在一起，没有散落一地。原因很简单：

* 由于server和client是远程通信的关系，因此为了尽量减少通信耦合，client每个操作的全部信息都以http请求的形式被概括成了精简的“作用量”（action）。
* 请求的url路径约定了用户的操作意图（当然RESTful概念中，请求的method也可以反映操作意图），request参数表征了该“意图”的具体内容。正是基于这个action的抽象，client端的交互操作才可以被集中转移到server端的controller中做统一响应。

对比之下，我们立刻发现上述代码片断中前端MVC模式的“痛点”所在：不是MVC模式错了，而是我们压根缺少了一个和用户交互行为有关的action抽象！因此，对model的具体操作才没法从各个view组件中被剥离出来，放到一处。

参考http请求，我们将要定义的action，需要一个typeName用来表示对model操作的意图（类似于http请求的url路径），还可能需要其他字段，用来描述怎样具体操作model（类似于http请求的参数）。

也就是说，当用户在view上的交互行为（例如点击提交按钮）应当引起Model发生变化时，我们不直接修改model，而是简单地**dispatch一个action**（其实跟常见的event机制没有什么区别）以表达修改model的意图，这些action将被集中转移给数据端（models），然后数据端会根据这些action做出需要的自我更新。同时，我们考虑到react中view组件的树状分流结构，所以有如下图所示：
![](https://user-gold-cdn.xitu.io/2019/4/12/16a0fb9a82fd01f8?w=720&h=356&f=png&s=111753)
图中A表示Action，V表示View组件，Models部分的结构会进一步讨论。

**稍微总结一下**：从代码层面而言，flux无非就是一个常见的event dispatcher，其目的是要将以往MVC中各个View组件内的controller代码片断提取出来放到更加恰当的地方进行集中化管理，并从开发体验上实现了舒适清爽、容易驾驭的“单向流”模式。 所以我觉得，Flux与其说是对前端MVC模式的颠覆，倒不如说是对前端MVC思想的补充和优化。

但为了区分于以往的MVC模式，并向facebook的贡献表达敬意，后面我们将把这种优化后的 Model-View-Controller 开发模式在React背景下正式称为Flux模式


**问题：**

```
React的可以通过View Component把页面呈现进行“原子化”拆分（即上图中兰色区域的树状分流结构）；

Flux打通了State-View的任督二脉（绿色区域），并通过action抽象把用户交互行为
进行了“原子化”拆分；

```
**那么联系上面的图示，我们自然要问数据端（紫色区域）的处理，可否同样被“原子化”拆分？**

## redux登场 （数据端的“原子化”）

redux 中的reduce机制，将state端的数据处理进行‘原子化’拆分。redux是来自函数式编程（Functional Programming）的一朵奇葩，据说很有背景（[参考链接](Prior Art | Redux) ）
reducer，从代码上说，其实就是一个函数，具有如下形式：


```
(previousState, action) => newState
```

reducer作为一个函数，可以根据web应用之前的状态（previousState）和交互行为（通过flux中提到的action来表征），决定web应用的下一状态（newState），从而实现state端的数据更新处理。这个函数行为和大名鼎鼎的“Map-Reduce”概念中的Reduce操作非常类似，因而称这个函数为“Reducer”。

"shut up and show me the code"

[https://redux.js.org/basics/example]()

这里不打算详细讲解Redux的具体使用，而只想通过一个Redux对state数据进行操作的代码片断，管窥一下reducer机制对数据进行拆分和组装的简洁过程。代码片断如下

![](https://user-gold-cdn.xitu.io/2019/4/12/16a0fcdf3c4ea6a7?w=568&h=613&f=png&s=338584)
其中的todos是和任务列表数据相关的reducer，todo是和单条任务数据有关的reducer。注意：在todos的函数体内调用了todo，并将action作为参数原样传递给了todo，这种干净利落地通过函数调用将action由 “parent reducer” 传递给 “child reducer”，是redux实现数据处理拆分的普遍方式。

回味一下，我们应该可以体会到，这种数据处理“原子化”拆分的方式和react中view组件的拆分有异曲同工之妙，二者都会形成一种“树状”分流结构（在react的view hierarchy中，数据通过props的直接赋值实现单向流；在redux的reducer hierarchy中，数据通过action的函数传参实现单向流）。
 

visibilityFilter是和列表显示状态相关的另一个reducer；combineReducers将visibilityFilter和todos合并为整个应用的reducer，也就是todoApp。这个过程，从感觉上也和react中view组件的合并过程非常相像。

createStore是一个工厂函数。通过它，todoApp（相当于一个数据处理的引擎）被装配到整个应用的state容器，也就是store中。可以通过store的getState方法获取整个应用的state；同时，store也是一个event dispatcher，可以通过其dispatch和subscribe方法，分别实现触发action事件和注册对action事件的响应函数。总言之，从概念上来说 Redux ＝ Reducer ＋ Flux



## 总结:
全体亮相

现在React开发模式中的几个核心概念已经全部出场亮相。我们俯瞰一下整个开发流程：首先，react框架为我们理顺了 store --> view 的“单向”工作流（store是state的容器）；然后，redux框架为我们理顺了 view --> store 的**“单向”**工作流。并且，react和redux都以组件化的形式可以将各自负责的功能进行灵活地组装或拆分，最大程度上确保我们“一次只需要专注于一个局部问题”。具体来说，分为以下步骤：


1.单例store的数据在react中可以通过view组件的属性（props）不断由父模块**“单向”**传递给子模块，形成一个树状分流结构。如果我们把redux比作整个应用的“心肺” （redux的flux功能像心脏，reducer功能像肺部毛细血管），那么这个过程可以比作心脏（store）将氧分子（数据）通过动脉毛细血管（props）送到各个器官组织（view组件）

2.末端的view组件，又可以通过flux机制，将携带交互意图信息的action反馈给store。这个过程有点像将携带代谢产物的“红细胞”（action）通过静脉毛细血管又泵回心脏（store）

3.action流回到store以后，action以参数的形式又被分流到各个具体的reducer组件中，这些reducer同样构成一个树状的hierarchy。这个过程像静脉血中的红细胞（action）被运输到肺部毛细血管（reducer组件）

4.接收到action后，各个child reducer以返回值的形式，将最新的state返回给parent reducer，最终确保整个单例store的所有数据是最新的。这个过程可以比作肺部毛细血管的血液充氧后，又被重新泵回了心脏

5.回到步骤1


**用图示的方式表达：**

![](https://user-gold-cdn.xitu.io/2019/4/12/16a0fcbc30498f09?w=746&h=347&f=png&s=145217)


* 图中A表示Action，V表示View组件，R表示Reducer。


* 为了确保我们比较容易理解程序的全局行为，或者说提高程序行为的确定性（predictable），我们一般期望具有类似职能的代码片断被“平铺”着摆放在一。


* 因此图示中相同颜色区域的代码通常会被放到同一个文件夹／文件中。


* 另外，同样出于提高程序的确定性，redux所遵循的函数式编程鼓励我们使用pure function和immutable。

参考：
[https://www.cnblogs.com/dreamingbaobei/p/8476984.htm]()

