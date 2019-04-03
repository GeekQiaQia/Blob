# 1、vue 子组件为何不可以修改父组件传递的值？
	因为vue设计是单向数据流，数据的流动方向只能是自上往下的方向；

# 2、如果修改了，vue 是如何监控到属性并给出警告的？
在vue 底层，做了一个类似全局标记Flag;它的实现原理，还是Object.defineProperty()API;引用在**极客时间唐老师**的一段代码,以下是老师做的粗略精简代码模块：

  proxy.js 

    const sharedPropertyDefinition = {
      enumerable: true,
      configurable: true
    };

    export default function proxy(target, temp, key) {
      sharedPropertyDefinition.get = function proxyGetter() {
    return temp[key];
      };

      sharedPropertyDefinition.set = function proxySetter(val) {
    temp[key] = val;
    if (!window.isUpdatingChildComponent) {
      console.error(`不可以直接更改: ${key}`);
    }

    window.isUpdatingChildComponent = false;
      };

    Object.defineProperty(target, key, sharedPropertyDefinition);


 window.isUpdatingChildComponent = false;
相当于一个Flag;只有当在父组件中修改传递给子组件的Prop值的时候，才会被赋值为True;
在子组件Proxy.vue 中代理父组件传递的Prop值； 使用  this.$forceUpdate(); 强制更新；
这时候，触发代理中的setter；提示不可以在子组件中直接修改父组件传递的Prop值的警告；

Proxy.vue

<template>
  <div>
    info: {{ info }}
    <input :value="info.name" @input="handleChange" />
  </div>
</template>

<script>
import proxy from "./proxy";
export default {
  props: {
    info: Object
  },
  created() {
    this.temp = { name: "" };
    Object.keys(this.temp).forEach(key => {
      proxy(this.info, this.temp, key);
    });
  },
  methods: {
    handleChange(e) {
      this.info.name = e.target.value;
      this.$forceUpdate();
      //this.$emit("change", e.target.value);
    }
  }
};
</script>

    <template>
      <div>
    info: {{ info }}
    <input :value="info.name" @input="handleChange" />
      </div>
    </template>
    
    <script>
    import proxy from "./proxy";
    export default {
      props: {
    info: Object
      },
      created() {
    this.temp = { name: "" };
    Object.keys(this.temp).forEach(key => {
      proxy(this.info, this.temp, key);
    });
      },
      methods: {
    handleChange(e) {
      this.info.name = e.target.value;
      this.$forceUpdate();
      //this.$emit("change", e.target.value);
    }
      }
    };
    </script>
    

