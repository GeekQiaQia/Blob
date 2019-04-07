# Issue:'Vue 中为何不可以使用index作为key';

  前提分析：在vue  v-for 中，通常需要使用key，目的来提高更新DOM的性能问题；

  隐患问题：如果引入key不当，会带来状态bug问题；

  **引用唐老师的代码示例：**
  
  1.定义子组件ListInput.vue; 
在该组件中，data数据有phone；在template 模板中，input 标签绑定数据phone;slot 插槽标签作为占位；

    <template>
      <div class="border2">
    <input v-model="phone" type="number" />
    <slot></slot>
      </div>
    </template>
    <script>
    export default {
      data() {
    return {
      phone: ""
    };
      }
    };
    </script>

2.父组件phoneList.vue 中；

首先定义全局变量key=1; 引用子组件ListInput,在template 模板标签中，v-for：list-input子组件；并将index作为key值；

**添加**按钮：绑定事件函数 handleAdd(); 处理逻辑为：每次讲list[]中push进一个key++值；list-input 动态刷新；
**删除**按钮：绑定事件函数 handleDelete(key)；处理逻辑为：获取当前key 值，并删除改变原数组，重新执行 v-for 刷新；

    <template>
      <div class="border">
    <list-input v-for="(key, index) in list" :key="index">
      <button @click="() => handleDelete(key)">删除</button>
    </list-input>
    <button @click="handleAdd">添加</button>
      </div>
    </template>
    <script>
    import ListInput from "./ListInput";
    let key = 1;
    export default {
      components: {
    Children
      },
      data() {
    return {
      list: []
    };
      },
      methods: {
    handleAdd() {
      this.list.push(key++);
    },
    handleDelete(key) {
       console.log(key);
       // findIndex 遍历value 值；如果为true，则返回index;
      const index = this.list.findIndex(k => k === key);
      console.log(index);
      // arrayObject.splice(index,howmany,item); 返回被删除的项目，直接改变原始数组；
      this.list.splice(index, 1);
      console.log(this.list);
    }
      }
    };
</script>

如上代码，如果连续点击**添加**四次，list:[1,2,3,4];	此时，如果点击key为2的删除按钮；则实际上在页面中删除的是key位4的input输入框；
原因分析如下;

    (3) [1, 3, 4, __ob__: Observer]
    0: 1
    1: 3
    2: 4
    length: 3
    __ob__: Observer {value: Array(3), dep: Dep, vmCount: 0}
    __proto__: Array

此时再次执行v-for 循环,循环组件：key;由0 1 2 3  ；变为0 1 2 ；vue 将显示:key为0 1 2 的组件；这也是动态key 带来的bug;这不是我们想要期待的结果； 

**解决方案：** 使用静态key; 将以上phoneList.vue 改为如下： 使用静态key值;作为dom 的key;

    <template>
      <div class="border">
    <Children v-for="key in list" :key="key">
      <button @click="() => handleDelete(key)">删除</button>
    </Children>
    <button @click="handleAdd">添加</button>
      </div>
    </template>
    <script>
    import Children from "./Children";
    let key = 1;
    export default {
      components: {
    Children
      },
      data() {
    return {
      list: []
    };
      },
      methods: {
    handleAdd() {
      this.list.push(key++);
    },
    handleDelete(key) {
      const index = this.list.findIndex(k => k === key);
      this.list.splice(index, 1);
    }
      }
    };
    </script>

**总结：**如果使用原生组件div 或者 span ;因为它们内部没有一个类似listInput中的phone 这样的一个数据状态，不会出现这样的bug;因此最好的方式是使用静态key;作为Dom的key;
    


     
    

  