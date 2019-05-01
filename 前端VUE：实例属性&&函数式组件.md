## 实例属性：


vm.$slots
类型：{ [name: string]: ?Array<VNode> }

只读

详细：

用来访问被插槽分发的内容。每个具名插槽 有其相应的属性 (例如：v-slot:foo 中的内容将会在 vm.$slots.foo 中被找到)。default 属性包括了所有没有被包含在具名插槽中的节点，或 v-slot:default 的内容。

Note: v-slot:foo is supported in v2.6+. For older versions, you can use the deprecated syntax.

在使用渲染函数书写一个组件时，访问 vm.$slots 最有帮助。
	
	<blog-post>
	  <template v-slot:header>
	    <h1>About Me</h1>
	  </template>
	
	  <p>Here's some page content, which will be included in vm.$slots.default, because it's not inside a named slot.</p>
	
	  <template v-slot:footer>
	    <p>Copyright 2016 Evan You</p>
	  </template>
	
	  <p>If I have some content down here, it will also be included in vm.$slots.default.</p>.
	</blog-post>



	Vue.component('blog-post', {
	  render: function (createElement) {
	    var header = this.$slots.header
	    var body   = this.$slots.default
	    var footer = this.$slots.footer
	    return createElement('div', [
	      createElement('header', header),
	      createElement('main', body),
	      createElement('footer', footer)
	    ])
	  }
	})
