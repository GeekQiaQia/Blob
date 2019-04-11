**vuex 底层原理：**

vuex 推荐map的方式代替原生操作：
![](https://user-gold-cdn.xitu.io/2019/4/9/16a02c28fec18a99?w=646&h=225&f=png&s=34237)
**VUE核心概念**
- state:提供一个响应式数据；
- Getter:借助Vue的计算属性computed来实现缓存；
- Mutation；更改state方法；
- Action:触发mutation 方法；
- Module:Vue.set 动态添加state 到响应式数据中；

	1. vuex 中核心原理：通过vue 实例，将state数据赋值给data(){return { $$state:state}}
	2. commit 实际上就是执行mutations 中的某个方法；
	3. 每次访问State的时候，实际上是访问了重写的get 方法；访问实例中的数据属性；
	4. ....
	5. 
	
精简核心代码如下,当下仅实现commit：


    import Vue from 'vue'

    const Store =function Store(options={}){
    const {state={},mutations={}}=options;
    this._vm=new Vue({
		data:{
		$$state:state
		}
	});

    this._mutations=mutations;
    }
    
	Store.prototype.commit=function(type,payload){
	// 如果mutations[type]这个方法存在；则执行这个方法；		
	if(this._mutations[type]){
		this._mutations[type](this.state,payload);
		}
	}

	// 向原型上定义属性；
	Object.defineProperties(Store.prototype,{
	state:{
		get:function(){
			return this._vm._data.$$state;
		}
	}
	});	

	export default {Store}

	
**问题：**这里为什么使用this._vm._data 来获取vue 实例中的响应式数据；



    
