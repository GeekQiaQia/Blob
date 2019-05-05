createElement("div",{},[])中数据对象:

**一个与模板中属性对应的数据对象{};**

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

## 事件 & 按键修饰符
对于 .passive、.capture 和 .once 这些事件修饰符；
Vue 提供了相应的前缀可以用于 on：

修饰符	前缀

    .passive	&
    .capture	!
    .once	~
    .capture.once 或
    .once.capture	~!
例如:
    
    on: {
      '!click': this.doThisInCapturingMode,
      '~keyup': this.doThisOnce,
      '~!mouseover': this.doThisOnceInCapturingMode
    }
对于所有其它的修饰符，私有前缀都不是必须的，因为你可以在事件处理函数中使用事件方法：

修饰符	处理函数中的等价操作

    .stop	event.stopPropagation()
    .prevent	event.preventDefault()
    .self	if (event.target !== event.currentTarget) return
    
按键：
.enter, .13	if (event.keyCode !== 13) return (对于别的按键修饰符来说，可将 13 改为另一个按键码)

修饰键：

    .ctrl, .alt, .shift, .meta	if (!event.ctrlKey) return (将 ctrlKey 分别修改为 altKey、shiftKey 或者 metaKey)
    
这里是一个使用所有修饰符的例子：
    
    on: {
      keyup: function (event) {
        // 如果触发事件的元素不是事件绑定的元素
        // 则返回
        if (event.target !== event.currentTarget) return
        // 如果按下去的不是 enter 键或者
        // 没有同时按下 shift 键
        // 则返回
        if (!event.shiftKey || event.keyCode !== 13) return
        // 阻止 事件冒泡
        event.stopPropagation()
        // 阻止该元素默认的 keyup 事件
        event.preventDefault()
        // ...
      }
    }
## 插槽
你可以通过 this.$slots 访问静态插槽的内容，每个插槽都是一个 VNode 数组：
    
    render: function (createElement) {
      // `<div><slot></slot></div>`
      return createElement('div', this.$slots.default)
    }
也可以通过 this.$scopedSlots 访问作用域插槽，每个作用域插槽都是一个返回若干 VNode 的函数：

    props: ['message'],
    render: function (createElement) {
      // `<div><slot :text="message"></slot></div>`
      return createElement('div', [
        this.$scopedSlots.default({
          text: this.message
        })
      ])
    }
    
如果要用渲染函数向子组件中传递作用域插槽，可以利用 VNode 数据对象中的 scopedSlots 字段：

    render: function (createElement) {
      return createElement('div', [
        createElement('child', {
          // 在数据对象中传递 `scopedSlots`
          // 格式为 { name: props => VNode | Array<VNode> }
          scopedSlots: {
            default: function (props) {
              return createElement('span', props.text)
            }
          }
        })
      ])
    }