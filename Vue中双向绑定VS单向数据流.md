# Vue 中双向绑定Vs 单向数据流；

**Vue中数据时单向数据流、而不是双向绑定；，Vue 的双向绑定不过是语法糖；**
Object.defineProperty是用来做响应式数据更新的，而不是双向绑定；

属性传递、事件回调的方式做数据更新；VS v-model数据双向绑定；

事实上V-model 在编译后的形式，就是通过父组件的属性传递以及事件回调的方式做的数据更新；

当一个组件需要多个属性的双向绑定的时候：
通过 .sync 的方式对其他属性，做双向数据绑定；

**引用唐老师的示例代码**

index.vue 中如下所示;
  引入子组件 PersonalInfo ；
 在data 数据中，定义了一个对象phoneInfo{}; zipCode:"";

 1.在template 中第一个PersonalInfo 通过v-model 和 .sync 分别对两个属性进行了双向数据绑定；

 2.在第二个PersonalInfo 通过传递属性和事件回调的方式实现数据的响应式更新；

    <template>
      <div>
    <PersonalInfo v-model="phoneInfo" :zip-code.sync="zipCode" />
    
    <PersonalInfo
      :phone-info="phoneInfo"
      :zip-code="zipCode"
      @change="val => (phoneInfo = val)"
      @update:zipCode="val => (zipCode = val)"
    />
    
    phoneInfo： {{ phoneInfo }}
    <br />
    zipCode： {{ zipCode }}
      </div>
    </template>
    <script>
    import PersonalInfo from "./PersonalInfo";
    export default {
      components: {
    PersonalInfo
      },
      data() {
    return {
      phoneInfo: {
    areaCode: "+86",
    phone: ""
      },
      zipCode: ""
    };
      }
    };
    </script>
    


在子组件PersonInfo.vue 中；

在model 中声明 绑定属性 model: {
prop: "phoneInfo", // 默认 value
event: "change" // 默认 input
  },
通过父组件属性传值、子组件事件回调实现数据更新；

<template>
  <div>
    <select
      :value="phoneInfo.areaCode"
      placeholder="区号"
      @change="handleAreaCodeChange"
    >
      <option value="+86">+86</option>
      <option value="+60">+60</option>
    </select>
    <input
      :value="phoneInfo.phone"
      type="number"
      placeholder="手机号"
      @input="handlePhoneChange"
    />
    <input
      :value="zipCode"
      type="number"
      placeholder="邮编"
      @input="handleZipCodeChange"
    />
  </div>
</template>
<script>
export default {
  name: "PersonalInfo",
  model: {
    prop: "phoneInfo", // 默认 value
    event: "change" // 默认 input
  },
  props: {
    phoneInfo: Object,
    zipCode: String
  },
  methods: {
    handleAreaCodeChange(e) {
      this.$emit("change", {
        ...this.phoneInfo,
        areaCode: e.target.value
      });
    },
    handlePhoneChange(e) {
      this.$emit("change", {
        ...this.phoneInfo,
        phone: e.target.value
      });
    },
    handleZipCodeChange(e) {
      this.$emit("update:zipCode", e.target.value);
    }
  }
};
</script>

    <template>
      <div>
    <select
      :value="phoneInfo.areaCode"
      placeholder="区号"
      @change="handleAreaCodeChange"
    >
      <option value="+86">+86</option>
      <option value="+60">+60</option>
    </select>
    <input
      :value="phoneInfo.phone"
      type="number"
      placeholder="手机号"
      @input="handlePhoneChange"
    />
    <input
      :value="zipCode"
      type="number"
      placeholder="邮编"
      @input="handleZipCodeChange"
    />
      </div>
    </template>
    <script>
    export default {
      name: "PersonalInfo",
      model: {
    prop: "phoneInfo", // 默认 value
    event: "change" // 默认 input
      },
      props: {
    phoneInfo: Object,
    zipCode: String
      },
      methods: {
    handleAreaCodeChange(e) {
      this.$emit("change", {
    ...this.phoneInfo,
    areaCode: e.target.value
      });
    },
    handlePhoneChange(e) {
      this.$emit("change", {
    ...this.phoneInfo,
    phone: e.target.value
      });
    },
    handleZipCodeChange(e) {
      this.$emit("update:zipCode", e.target.value);
    }
      }
    };
    </script>

改写以上代码，使之实现校验，手机号码校验，只需要传递对应校验规则，提示属性即可；如下：

父组件Index.vue 传递属性：:valide;message:

    <template>
      <div>
    <PersonalInfo
      v-model="phoneInfo"
      required
      :validate="validate"
      message="手机号为空或不合法"
      :zip-code.sync="zipCode"
    />
    
    phoneInfo： {{ phoneInfo }}
    <br />
    zipCode： {{ zipCode }}
      </div>
    </template>
    <script>
    import PersonalInfo from "./PersonalInfo";
    export default {
      components: {
    PersonalInfo
      },
      data() {
    return {
      phoneInfo: {
    areaCode: "+86",
    phone: ""
      },
      zipCode: ""
    };
      },
      methods: {
    validate(phone = "") {
      return phone && /^1[0-9]{10}$/.test(phone);
    }
      }
    };
    </script>
  
    
子组件personal.VUE ；通过watch  phoneInfo.phone; 触发回调函数；触发父组件传递的函数校验规则，通过v-if 来显示校验提示信息；

    <template>
      <div>
    <select
      :value="phoneInfo.areaCode"
      placeholder="区号"
      @change="handleAreaCodeChange"
    >
      <option value="+86">+86</option>
      <option value="+60">+60</option>
    </select>
    <input
      :value="phoneInfo.phone"
      type="number"
      placeholder="手机号"
      @input="handlePhoneChange"
    />
    <input
      :value="zipCode"
      type="number"
      placeholder="邮编"
      @input="handleZipCodeChange"
    />
    <br />
    <span v-if="showMessage" style="color: red;">{{ message }}</span>
      </div>
    </template>
    <script>
    export default {
      name: "PersonalInfo",
      model: {
    prop: "phoneInfo", // 默认 value
    event: "change" // 默认 input
      },
      props: {
    phoneInfo: Object,
    zipCode: String,
    required: Boolean,
    message: String,
    validate: Function
      },
      data() {
    return {
      showMessage: false
    };
      },
      watch: {
    "phoneInfo.phone": function(val) {
      this.handleValidate(val);
    }
      },
      methods: {
    handleAreaCodeChange(e) {
      this.$emit("change", {
    ...this.phoneInfo,
    areaCode: e.target.value
      });
    },
    handlePhoneChange(e) {
      this.$emit("change", {
    ...this.phoneInfo,
    phone: e.target.value
      });
    },
    handleZipCodeChange(e) {
      this.$emit("update:zipCode", e.target.value);
    },
    handleValidate(val) {
      const res = this.validate(val);
      this.showMessage = !res;
    }
      }
    };
    </script>
