# Vue 中合理应用计算属性computed和侦听器watch;

### 什么是计算属性：

	计算属性可以理解为：可以用来写一些逻辑的属性；
### 作用:
  
	1.通常用来减少模板中计算逻辑；
	2.帮助我们做一些数据的缓存；当我们的依赖数据没有变化的时候，不会执行逻辑代码；当逻辑计算的比较复杂的时候，可以帮助我们提供性能；因为它只会在依赖数据变化的时候才会计算；
	3.依赖固定的数据类型（响应式数据类型）

**引用唐老师的示例代码：**
通过断点代码，理解计算属性computed:

在以下computed.vue 中；在data中初始化message;通过点击button,执行this.$forceUpdate()，强制刷新；我们可以发现：

在计算属性reversedMessage1中逻辑代码的log;并咩有更新；reversedMessage2 中逻辑代码的log 一直有打印；这就是通过computed 属性的优点；
    
    <template>
      <div>
    <p>Reversed message1: "{{ reversedMessage1 }}"</p>
    <p>Reversed message2: "{{ reversedMessage2() }}"</p>
    <p>{{ now }}</p>
    <button @click="() => $forceUpdate()">forceUpdate</button>
    <br />
    <input v-model="message" />
      </div>
    </template>
    <script>
    export default {
      data() {
    return {
      message: "hello vue"
    };
      },
      computed: {
    // 计算属性的 getter
    reversedMessage1: function() {
      console.log("执行reversedMessage1");
      return this.message
    .split("")
    .reverse()
    .join("");
    },
    now: function() {
      return Date.now();
    }
      },
      methods: {
    reversedMessage2: function() {
      console.log("执行reversedMessage2");
      return this.message
    .split("")
    .reverse()
    .join("");
    }
      }
    };
    </script>
    

### 什么是侦听器watch：

	**侦听器**：可以去监听任何数据；当数据变化的时候，去执行一些逻辑代码；
	在watch中可以执行任何代码逻辑，如函数节流、ajax异步获取数据；甚至操作Dom;


### 侦听器的作用：更加灵活，通用；
**引用唐老师的代码示例**：
通过代码理解侦听器：

在watch.vue代码示例中，


1. 在{{}}模板中通过$data 引用data中的所有数据；
2. 通过button 来改变a的值；
3. 在watch中，通过监听多层嵌套数据，当a发生变化的时候，执行对应逻辑代码；
4. 在e 中，执行深度监听，deep:true;当e:中的任何数据发生改变的时候，不论是f 还是g 发生改变，都将执行e的handler 函数；

    <template>
      <div>
    {{ $data }}
    <br />
    <button @click="() => (a += 1)">a+1</button>
      </div>
    </template>
    <script>
    export default {
      data: function() {
    return {
      a: 1,
      b: { c: 2, d: 3 },
      e: {
    f: {
      g: 4
    }
      },
      h: []
    };
      },
      watch: {
    a: function(val, oldVal) {
      this.b.c += 1;
      console.log("new: %s, old: %s", val, oldVal);
    },
    "b.c": function(val, oldVal) {
      this.b.d += 1;
      console.log("new: %s, old: %s", val, oldVal);
    },
    "b.d": function(val, oldVal) {
      this.e.f.g += 1;
      console.log("new: %s, old: %s", val, oldVal);
    },
    e: {
      handler: function(val, oldVal) {
    this.h.push("😄");
    console.log("new: %s, old: %s", val, oldVal);
      },
      deep: true
    },
    h(val, oldVal) {
      console.log("new: %s, old: %s", val, oldVal);
    }
      }
    };
    </script>

## 计算属性computed VS 侦听器watch;

**计算属性computed 能够做的，watch 都可以做，反之不行；
能用computed做的事情，尽量使用computed；**

通过代码理解两者：

computedFullName.vue中;通过计算属性fullName;只需要一段逻辑代码，便可以完成Fullname的监听；

    <template>
      <div>
    {{ fullName }}
    
    <div>firstName: <input v-model="firstName" /></div>
    <div>lastName: <input v-model="lastName" /></div>
      </div>
    </template>
    <script>
    export default {
      data: function() {
    return {
      firstName: "Foo",
      lastName: "Bar"
    };
      },
      computed: {
    fullName: function() {
      return this.firstName + " " + this.lastName;
    }
      },
      watch: {
    fullName: function(val, oldVal) {
      console.log("new: %s, old: %s", val, oldVal);
    }
      }
    };
    </script>

watchFullName.vue 中;显示fullName的改变需要；同时监听firstName 和lastName;分别执行两段逻辑代码；

    <template>
      <div>
    {{ fullName }}
    
    <div>firstName: <input v-model="firstName" /></div>
    <div>lastName: <input v-model="lastName" /></div>
      </div>
    </template>
    <script>
    export default {
      data: function() {
    return {
      firstName: "Foo",
      lastName: "Bar",
      fullName: "Foo Bar"
    };
      },
      watch: {
    firstName: function(val) {
      this.fullName = val + " " + this.lastName;
    },
    lastName: function(val) {
      this.fullName = this.firstName + " " + val;
    }
      }
    };
    </script>

在这种情况下，代码量上来讲，通过computed 计算属性更加简洁；computed 可以做的通过watch属性也可以进行实现；

**扩展：**对以上watchFullName.vue 进行防抖改造，当用户输入超过500毫秒后，才进行更新fullname;

**分析：**通过代码分析可以看出，防抖策略:
	
就是通过 clearTimeout(timer);let timer=setTimeout(()=>{});
当用户一直输入新的数据的时候，清除当前定时器，如果500ms内，监听的依赖数据没有新的数据更新，
在执行setTimeout(()=>{})的回调函数；

    <template>
      <div>
    {{ fullName }}
    
    <div>firstName: <input v-model="firstName" /></div>
    <div>lastName: <input v-model="lastName" /></div>
      </div>
    </template>
    <script>
    export default {
      data: function() {
    return {
      firstName: "Foo",
      lastName: "Bar",
      fullName: "Foo Bar"
    };
      }, 
      watch: {
    firstName: function(val) {
      clearTimeout(this.firstTimeout);
      this.firstTimeout = setTimeout(() => {
    this.fullName = val + " " + this.lastName;
      }, 500);
    },
    lastName: function(val) {
      clearTimeout(this.lastTimeout);
      this.lastTimeout = setTimeout(() => {
    this.fullName = this.firstName + " " + val;
      }, 500);
    }
      }
    };
    </script>













