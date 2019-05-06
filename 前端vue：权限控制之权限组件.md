## 前言:
涉及到的知识点：
### arr.includes
    /**
      Return boolean
      If the computed index is less or equal than
      (-1 * array.length), the entire array will be searched.
      
      返回值为boolean 类型，如果查询字段在数组中存在，则返回true,
      如果查询字段在数组中不存在，则返回false;
      
      如果 fromIndex <=（-1 * array.length）,则从index=0;开始查询，如果存在则返回true;否则返回false;
      否则返回false;
    */
    
    arr.includes(valueToFind,[fromIndex]); 
    
## 函数式组件：
- 增加渲染性能；
- render(h, context)// params:createElement,context;

Authorized.vue

        <script>
    import { check } from "../utils/auth";  //校验权限
    export default {
      functional: true,
      props: {
        authority: {
          type: Array,
          required: true
        }
      },
      render(h, context) {
        const { props, scopedSlots } = context;
        // 如果校验通过，则返回子组件/插槽内容；否则返回null;
        return check(props.authority) ? scopedSlots.default() : null;
      }
    };
    </script>

## auth.js
    
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
    
        
            
            
## main.js

    // 全局注册组件；

    import Authorized from "./components/Authorized";
    
    Vue.component("Authorized", Authorized);
    
## 权限组件的使用：

      <Authorized :authority="['admin']">
          <SettingDrawer />
        </Authorized>