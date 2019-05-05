**每天认真学习一个vue 知识点呀！**
## 节点
在深入渲染函数render()之前，了解一些浏览器的工作原理是很重要的。以下面这段 HTML 为例：
	
	<div>
	  <h1>My title</h1>
	  Some text content
	  <!-- TODO: Add tagline -->
	</div>

当浏览器读到这些代码时，它会建立一个“DOM 节点”树来保持追踪所有内容，如同你会画一张家谱树来追踪家庭成员的发展一样。

上述代码对应节点如下：

![](https://user-gold-cdn.xitu.io/2019/5/5/16a885361291dc46?w=598&h=381&f=png&s=25393)

每个元素都是一个节点。每段文字也是一个节点。甚至注释也都是节点。一个节点就是页面的一个部分。就像家谱树一样，每个节点都可以有孩子节点 (也就是说每个部分可以包含其它的一些部分)。

高效地更新所有这些节点会是比较困难的，不过所幸你不必手动完成这个工作。你只需要告诉 Vue 你希望页面上的 HTML 是什么，这可以是在一个模板里：

    <h1>{{ blogTitle }}</h1>
    
    
或者一个渲染函数里：

    render: function (createElement) {
      return createElement('h1', this.blogTitle)
    }
    
在这两种情况下，Vue 都会自动保持页面的更新，即便 blogTitle 发生了改变。
 ## VNode 树
Vue 通过建立一个虚拟 DOM 来追踪自己要如何改变真实 DOM。请仔细看这行代码：

    return createElement('h1', this.blogTitle)

- createElement 到底会返回什么呢？

其实不是一个实际的 DOM 元素。它更准确的名字可能是 **createNodeDescription**，因为它所包含的信息会告诉 Vue， 页面上需要渲染什么样的节点，包括及其子节点的描述信息。我们把这样的节点描述为“虚拟节点 (virtual node)”，也常简写它为“VNode”。“虚拟 DOM”是我们对由 **Vue 组件树**建立起来的整个 **VNode 树**的称呼。

[参考](https://cn.vuejs.org/v2/guide/render-function.html)