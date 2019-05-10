**每天学习一个vue知识点呀**

## 前言

涉及到知识点：
  - 自定义指令v-xxx
  - 插件式注册自定义指令 vue.use()
  - 回顾自定义指令的钩子函数

## 自定义指令钩子函数
一个**指令定义对象**可以提供如下几个钩子函数 (均为可选)：

- bind:只调用一次，指令第一次绑定到元素时候调用。在这个钩子函数中可以进行一次性的初始化设置；
- inserted:该钩子函数在被绑定元素插入父节点时候调用；
- update:所在组件的VNode更新时候调用，（可能发生在其子VNode更新之前，指令的值可能发生了改变，也可能没有改变）
- componentUpdated:指令所在组件的VNode及其子VNode全部更新以后调用
- unbind:只调用一次，指令与元素解绑时调用

## 自定义指令钩子函数参数

  （el,binding,vnode,oldVnode）

- el：指令所绑定的元素，可以用来直接操作 DOM 。
- binding：一个对象，包含以下属性：
    - name：指令名，不包括 v- 前缀。
    - value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
   -  oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
    - expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
    - arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
    - modifiers：一个**包含修饰符的对象**。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
- vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
- oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用



## directives/auth.js
    import { check } from "../utils/auth";
    // 开发插件的方式；定义指令；第一个参数是Vue 构造器，第二个参数是可选的选项对象
    function install(Vue, options = {}) {
    
      Vue.directive(options.name || "auth", {
        // 指令定义对象的钩子函数inserted
        inserted(el, binding) {
          if (!check(binding.value)) {
            el.parentNode && el.parentNode.removeChild(el);
          }
        }
      });
    }
    
    export default { install };
    
## utils/auth.js

    const currentAuth = ["admin"];
    export { currentAuth };
    
    export function getCurrentAuthority() {
        return currentAuth;
    }
    
    export function check(authority) {
        const current = getCurrentAuthority();
        return current.some(item => authority.includes(item));
    }
    
    export function isLogin() {
        const current = getCurrentAuthority();
        return current && current[0] !== "guest";
    }

## 注册自定义指令
    //main.js
    //通过全局方法 Vue.use() 使用插件。它需要在你调用 new Vue() 启动应用之前完成：
    import Auth from "./directives/auth";
    Vue.use(Auth);

## 权限指令的使用

      <a-icon
                v-auth="['admin']"
                class="trigger"
                :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                @click="collapsed = !collapsed"
              ></a-icon>

[参考官网](https://cn.vuejs.org/v2/guide/custom-directive.html)