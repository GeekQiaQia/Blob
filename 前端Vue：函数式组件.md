**每天学习一个vue知识点呀**

## 函数式组件特点：
- 没有管理任何状态
- 没有监听任何传递给它的状态
- 没有生命周期方法
- 它只是接收一些prop的函

我们将这样的组件标记为functional：
- 无状态 **==** 无响应式数据
- 无实例 **==** 无this上下文

## 函数式组件的优点：
- 渲染开销低，因为函数式组件只是函数；
## 函数式组件基本写法：

     {
      functional: true,
      // Props 是可选的
      props: {
        // ...
      },
      // 为了弥补缺少的实例
      // 提供第二个参数作为上下文
      render: function (createElement, context) {
        // ...
      }
    }

组件需要的一切都是通过 context 参数传递，它是一个包含如下字段的对象：
- props: 提供所有prop的对象
- children:VNode 子节点的数组
- slots: 一个函数，返回了包含所有插槽的对象
- scoptedSlots:(2.6.0) 一个暴露传入的作用域插槽的对象，也以函数形式暴露普通插槽
- data:传递个组件的整个**数据对象**，作为createElement的第二个参数传入组件
- parent:对父组件的引用
- listeners:(2.3.0+) 一个包含了：所有父组件为当前组件祖册的事件监听器对象，是data.on的一个别名
- injections:(2.3.0+) 如果使用了inject选项，则改对象包含了：应当被注入的属性；


## 使用场景1：包装组件

- 程序化地在多个组件中选择一个来代为渲染；
- 在将 children、props、data 传递给子组件之前操作它们；
下面是一个 smart-list 组件的例子，它能根据传入 prop 的值来代为渲染更具体的组件：

        var EmptyList = { /* ... */ }
        
        var TableList = { /* ... */ }
        
        var OrderedList = { /* ... */ }
        
        var UnorderedList = { /* ... */ }
    
        Vue.component('smart-list', {
          functional: true,
          props: {
            items: {
              type: Array,
              required: true
            },
            isOrdered: Boolean
          },
          render: function (createElement, context) {
            function appropriateListComponent () {
              var items = context.props.items
        
              if (items.length === 0)           return EmptyList
              if (typeof items[0] === 'object') return TableList
              if (context.props.isOrdered)      return OrderedList
        
              return UnorderedList
            }
        
            return createElement(
              appropriateListComponent(),
              context.data,
              context.children
            )
          }
        })

## slots() 和children的对比
    
![](https://user-gold-cdn.xitu.io/2019/5/7/16a91a8967ba8d19?w=636&h=405&f=png&s=51405)

**分析：**

从字面意思显而易见：

1. children,可以获取当前组件节点的所有的子节点；
2. slots()函数返回了所有的插槽对象；
举例：
    
        <my-functional-component>
          <p v-slot:foo>
            first
          </p>
          <p>second</p>
        </my-functional-component>

对于以上示例组件：
- children 会给你两个段落标签；
- slots().default 只会传递第二个匿名段落标签
- slots().foo 会传递第一个具名段落标签

**总结：**
- 你可以选择使用slots()让组件感知某个插槽机制，也可以简单地通过传递 children，移交给其它组件去处理


[参考官网](https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6)




