## 前言
涉及到知识点：
  - 自定义指令v-xxx
  - 插件式注册自定义指令 vue.use()
  

## directives/auth.js
    import { check } from "../utils/auth";
    
    function install(Vue, options = {}) {
      Vue.directive(options.name || "auth", {
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
    
    import Auth from "./directives/auth";
    Vue.use(Auth);

## 权限指令的使用

      <a-icon
                v-auth="['admin']"
                class="trigger"
                :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                @click="collapsed = !collapsed"
              ></a-icon>

