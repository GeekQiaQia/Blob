# #vue中this.$emit();返回值是什么
 
### vue中的三大属性:属性 、事件、插槽，---事件
在事件中有

1. 普通事件：@click/@input/@change/@xxx...事件；
2. 修饰符事件：@input.trim,@click.stop,@submit.prevent...一般用于原生html元素；

 	**答：在vue中this.$emit(); 返回值是this;**

代码示例：

在子组件中：Event.vue:接收通过父组件传递过来的props:{name:String} 属性；
在input 标签中：
    

1. value=name; 绑定name属性； 
2. 通过@change="handleChange" 普通事件;监听输入框输入值；
    
  
在script 标签中：

1. 通过 this.$emit("Echange", e.target.value, val => {
    console.log(val);
      });
通过回调，传递值到父组件；自定义事件“Echange”;


  <template>
  <div>
    name: {{ name || "--" }}
    <br />
    <input :value="name" @change="handleChange" />
    <br />
    <br />
    <div @click="handleDivClick">
      <button @click="handleClick">重置成功</button>&nbsp;&nbsp;&nbsp;
      <button @click.stop="handleClick">重置失败</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventDemo",
  props: {
    name: String
  },
  methods: {
    handleChange(e) {
      const res = this.$emit("Echange", e.target.value, val => {
        console.log(val);
      });
      console.log(res, res === this);
    },
    handleDivClick() {
      this.$emit("change", "");
    },
    handleClick(e) {
      // 都会失败
      e.stopPropagation();
    }
  }
};
</script>


     <template>
      <div>
    name: {{ name || "--" }}
    <br />
    <input :value="name" @change="handleChange" />
    <br />
    <br />
    <div @click="handleDivClick">
      <button @click="handleClick">重置成功</button>&nbsp;&nbsp;&nbsp;
      <button @click.stop="handleClick">重置失败</button>
    </div>
      </div>
    </template>
    
    <script>
    export default {
      name: "EventDemo",
      props: {
    name: String
      },
      methods: {
    handleChange(e) {
      const res = this.$emit("Echange", e.target.value, val => {
    console.log(val);
      });
      console.log(res, res === this);
    },
    handleDivClick() {
      this.$emit("change", "");
    },
    handleClick(e) {
      // 都会失败
      e.stopPropagation();
    }
      }
    };
    </script>


在父组件中通过监听子组件事件，对回调做出响应；
1. 父组件可以通过回调函数，callback()向子组件传递一个值；


    <template>
    
      <Event :name="name" @Echange="handleEventChange" />
    
    </template>
    
    <script>
    import Event from "./Event";
    
    export default {
      components: {
    Event,
      
      },
      data: () => {
    return {
      name: "",
     
    };
      },
      mounted() {
    
      },
      methods: {
      
    handleEventChange(val, callback) {
      this.name = val;
      callback("hello");
      return "hello";
    }
      }
    };
    </script>

    
    
    
    
    