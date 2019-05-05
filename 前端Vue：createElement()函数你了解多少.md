**每天认真学习一个vue 知识点呀**

## createElement()参数
这里是 createElement 接受的参数：

    // @returns {VNode}
    createElement(
      // {String | Object | Function}
      // 一个 HTML 标签名、组件选项对象，或者
      // resolve 了上述任何一种的一个 async 函数。必填项。
      'div',
    
      // {Object}
      // 一个与模板中属性对应的数据对象。可选。
      {
        // (详情见下一节)
      },
    
      // {String | Array}
      // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
      // 也可以使用字符串来生成“文本虚拟节点”。可选。
      [
        '先写一些文字',
        createElement('h1', '一则头条'),
        createElement(MyComponent, {
          props: {
            someProp: 'foobar'
          }
        })
      ]
    )
    
## 深入数据对象

有一点要注意：
- 正如 v-bind:class 和 v-bind:style 在模板语法中会被特别对待一样，它们在 VNode 数据对象中也有对应的顶层字段。
- 该对象也允许你绑定普通的 HTML 特性，也允许绑定如 innerHTML 这样的 DOM 属性 (这会覆盖 v-html 指令)。


        {
          // 与 `v-bind:class` 的 API 相同，
          // 接受一个字符串、对象或字符串和对象组成的数组
          'class': {
            foo: true,
            bar: false
          },
          // 与 `v-bind:style` 的 API 相同，
          // 接受一个字符串、对象，或对象组成的数组
          style: {
            color: 'red',
            fontSize: '14px'
          },
          // 普通的 HTML 特性
          attrs: {
            id: 'foo'
          },
          // 组件 prop
          props: {
            myProp: 'bar'
          },
          // DOM 属性
          domProps: {
            innerHTML: 'baz'
          },
          // 事件监听器在 `on` 属性内，
          // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
          // 需要在处理函数中手动检查 keyCode。
          on: {
            click: this.clickHandler
          },
          // 仅用于组件，用于监听原生事件，而不是组件内部使用
          // `vm.$emit` 触发的事件。
          nativeOn: {
            click: this.nativeClickHandler
          },
          // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
          // 赋值，因为 Vue 已经自动为你进行了同步。
          directives: [
            {
              name: 'my-custom-directive',
              value: '2',
              expression: '1 + 1',
              arg: 'foo',
              modifiers: {
                bar: true
              }
            }
          ],
          // 作用域插槽的格式为
          // { name: props => VNode | Array<VNode> }
          scopedSlots: {
            default: props => createElement('span', props.text)
          },
          // 如果组件是其它组件的子组件，需为插槽指定名称
          slot: 'name-of-slot',
          // 其它特殊顶层属性
          key: 'myKey',
          ref: 'myRef',
          // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
          // 那么 `$refs.myRef` 会变成一个数组。
          refInFor: true
        }
        
## 完整示例
有了这些知识，我们现在可以完成我们最开始想实现的组件：

    var getChildrenTextContent = function (children) {
      return children.map(function (node) {
        return node.children
          ? getChildrenTextContent(node.children)
          : node.text
      }).join('')
    }
    
    Vue.component('anchored-heading', {
      render: function (createElement) {
        // 创建 kebab-case 风格的 ID
        var headingId = getChildrenTextContent(this.$slots.default)
          .toLowerCase()
          .replace(/\W+/g, '-')
          .replace(/(^-|-$)/g, '')
    
        return createElement(
          'h' + this.level,
          [
            createElement('a', {
              attrs: {
                name: headingId,
                href: '#' + headingId
              }
            }, this.$slots.default)
          ]
        )
      },
      props: {
        level: {
          type: Number,
          required: true
        }
      }
    })
## 约束
VNode 必须唯一
组件树中的所有 VNode 必须是唯一的。这意味着，下面的渲染函数是不合法的：

    render: function (createElement) {
      var myParagraphVNode = createElement('p', 'hi')
      return createElement('div', [
        // 错误 - 重复的 VNode
        myParagraphVNode, myParagraphVNode
      ])
    }   
如果你真的需要重复很多次的元素/组件，你可以使用工厂函数来实现。例如，下面这渲染函数用完全合法的方式渲染了 20 个相同的段落：

    render: function (createElement) {
      return createElement('div',
        Array.apply(null, { length: 20 }).map(function () {
          return createElement('p', 'hi')
        })
      )
    }
## 渲染函数应用实例--使用 JavaScript 代替模板功能

只要在原生的 JavaScript 中可以轻松完成的操作，Vue 的渲染函数就不会提供专有的替代方法。

比如：
###  v-if 和 v-for：
    
    <ul v-if="items.length">
      <li v-for="item in items">{{ item.name }}</li>
    </ul>
    <p v-else>No items found.</p>
    
这些都可以在渲染函数中用 JavaScript 的 if/else 和 map 来重写：

    props: ['items'],
    render: function (createElement) {
      if (this.items.length) {
        return createElement('ul', this.items.map(function (item) {
          return createElement('li', item.name)
        }))
      } else {
        return createElement('p', 'No items found.')
      }
    }
    
 ###  v-model
渲染函数中没有与 v-model 的直接对应——你必须自己实现相应的逻辑：

    props: ['value'],
    render: function (createElement) {
      var self = this
      return createElement('input', {
        domProps: {
          value: self.value
        },
        on: {
          input: function (event) {
            self.$emit('input', event.target.value)
          }
        }
      })
    }
这就是深入底层的代价，但与 v-model 相比，这可以让你更好地控制交互细节。

[参考官网](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0)