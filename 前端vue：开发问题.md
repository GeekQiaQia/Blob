# 1.vue 插件书写方式应该注意哪些问题？兼容IE浏览器？

    插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：

    添加全局方法或者属性。如: vue-custom-element

    添加全局资源：指令/过滤器/过渡等。如 vue-touch

    通过全局混入来添加一些组件选项。如 vue-router

    添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。

    一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 vue-router
    
   ## 开发插件
    
    
   Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：

    MyPlugin.install = function (Vue, options) {
      // 1. 添加全局方法或属性
      Vue.myGlobalMethod = function () {
        // 逻辑...
      }

      // 2. 添加全局资源
      Vue.directive('my-directive', {
        bind (el, binding, vnode, oldVnode) {
          // 逻辑...
        }
        ...
      })

      // 3. 注入组件选项
      Vue.mixin({
        created: function () {
          // 逻辑...
        }
        ...
      })

      // 4. 添加实例方法
      Vue.prototype.$myMethod = function (methodOptions) {
        // 逻辑...
      }
    }
    
    
    
混入mixin:
    在 Vuex 1.x 的混入策略里找到一个更高级的例子：

    const merge = Vue.config.optionMergeStrategies.computed
    Vue.config.optionMergeStrategies.vuex = function (toVal, fromVal) {
      if (!toVal) return fromVal
      if (!fromVal) return toVal
      return {
        getters: merge(toVal.getters, fromVal.getters),
        state: merge(toVal.state, fromVal.state),
        actions: merge(toVal.actions, fromVal.actions)
      }
    }

# 2.严格模式 use strict 使用场景及其意义?





#3.何时需要发送飞行前cors;preflight;同源策略



#4. table
       <el-button
                                                        v-show="scope.row.editFlag"
                                                        @click.native.prevent="deleteRow(scope.$index, createCusFormInfo.accountInfoTableData)"
                                                        type="text"
                                                        style="cursor: pointer;"
                                                        size="small">
                                                    <i class="el-icon-delete"></i>
                                                </el-button>
                                                
                                                
                                                
                
                
                 
