/**
 * @description  原理分析：
 * * 
 * */
 
 
 /**
  * @description  数据代理：将data属性绑定到vm实例中；
  * */
  function proxyData(vm){
	  Object.keys(vm.$data).forEach(key=>{
		 Object.defineProperty(vm,key,{
			 get(){
				 return vm.$data[key]
			 },
			 set(newVal){
				 vm.$data[key]=newVal;
			 }
			 
		 })
	  })
	  
  }
 /**
  * @description  使得所有对象属性都被响应式处理；
  * */
 function observe(data){
	 if(typeof data !==='object'||data==null){
		 return 
	 }
	 //
	 new Observe(data);
 }
 
 function defineReactive(obj,key,val){
	 //如果val值为object,则进行递归处理；
	 observe(val);
	 let dep=new Dep();
	 Object.defineProperty(obj,key,{
		 get(){
			 // 依赖收集: 把watcher和dep关联
			 // 希望Watcher实例化时，访问一下对应key，同时把这个实例设置到Dep.target上面
			 Dep.target && dep.addDep(Dep.target)
			return val; 
		 },
		 set(newVal){
			 if(newVal!==val){
				 obj[key]=newVal;
				 dep.notify()
			 }else{
				 
			 }
		 }
	 })
 }
 /**
  * @description  定义一个类vue，进行vue实例化
  * * 在创建一个vue实例的过程中，首先对传参对象中data属性进行响应式处理；
  *  * 该响应式处理主要vue2.0主要使用Object.defineProperty();
  * * 同时对template模板进行编译，这个过程就是找到其中使用到的data属性，并根据属性值对模板视图进行初始化；  
  * 
  * */
  
  class  Mvue(){
		constructor(options){
			// 保存传参对象；
			this.$options=options;
			this.$data=options.data;
			
			// 响应式处理；定义一个类observe,对所有data属性进行响应式处理；
			observe(this.$data);
			
			// data属性代理；
			proxyData(this);
			
			//模板编译：定义一个类compile,对template模板进行编译并初始化；
			this.$compile=new Compiler(this.$options.el,this)
		}
  }
  /**
   * @description  对数据进行响应式处理；
   * */
  class Observe(){
	  constructor(data){
		  this.data=data;
		  walk(data);
	  }
	  walk(data){
		  // 响应式defineReactive（）
		  
		  Object.keys(data).forEach(key=>{
			  
			  defineReactive(data,key,data[key]);
		  })
	  }
		  
  }
  
  /**
   * @description  对template模板进行编译，找到对应使用到的data属性，并初始化；
   *   * 解析模板；
   *   * 找到依赖
   *
   * */ 
   class Compiler(){
	   // 获取dom元素，并进行遍历查找；
	   constructor(el,vm){
		   this.$el=document.querySelector(el);
		   this.$vm=vm;
		   // 同时在构造函数中执行编译；
		   this.compile(this.$el);
	   }
	   compile(el){
		   // 遍历当前节点的所有子节点
		   let childNodes=el.childNodes;
		   let reg=/\{\{(.*)\}\}/;
		   
		   Array.from(childNodes).forEach(node=>{
				// 是否node类型是dom元素，则编译元素对其中属性进行判断；v- @
				let text=node.textContent;
			   if(this.isElementNode(node)){
				   this.compileElement(node);
				   //1、文本节点且{{}}花括号
			   }else if(this.isTextNode(node)&&Reg.test(text)){
				   // compileText;
				   this.compileText(node,RegExp.$1);
			   }
			   
			   if(node.childNodes&&node.childNodes.length){
				   this.compile(node);
			   }
		   })
	   }
	   /**
		* @description  编译dom节点属性；
		* */
		compileElement(node){
			let attrs=node.attributes;
			Array.from(attrs).forEach(attr=>{
				let attrName=attr.name;
				let attrVal=attr.value;
				// 判断属性类型，并作出对应的操作；v- 
				if(this.isDirective(attrName)){
					//text model html,分别处理；
					let dir=attrName.substring(2);
					this[dir]&&this[dir](node,this.$vm,attrVal);
				
				// 如果是事件，则执行对应事件处理哈数；
				}else if(this.isEvent(attrName)){
					let dir=attrName.substring(1)
					this.eventHandler(node,this.$vm,attrVal,dir);
				}
			});
		}
		/**
		 * @description  编译text节点属性；
		 * 通v-text;
		 * */
		  compileText(node,key){
			  
				this.text(node,this.$vm,key,'text');
		  }
		
		
		/**
		 * @description  对所有指令的统一更新函数；,在编译的update阶段，完成dom与data属性的依赖收集
		 * @param {node} node node节点； 
		 * @param {vue} vm 当前vue实例； 
		 * @param {string} key 实例中的data属性； 
		 * @param {string} dir 指令类型 text model html； 
		 * */
		 update(node,vm,key,dir){
			 let updateFn=this[dir+'Updater'];
			 updateFn&&updateFn(node,vm[key])
			 
			 // 添加监听器；
			 new Watcher(vm,key,function(newVal){
				 // 当数据修改的时候，执行updateFn;
				 updateFn&&updateFn(node,newVal)
			 })
		 }
		 /**
		  * @description 监听事件
		  *   判断实例methods中是否存在事件对应的函数exp:@click="onClick",并在函数作用域中传入当前this作为函数上下文;
		  * 
		  * */
		 	eventHandler(node,vm,value,dir){
		 		
		 		let fn=vm.$options.methods[value];
		 		
		 		if(fn){
		 			//	第三个参数是个布尔值。默认是false（冒泡阶段执行）true(捕获阶段产生)
		 			node.addEventListener(dir,fn.bind(this),false);
		 		}
		 	}
		 /**
		  * @description  modelUpdater； 
		  * */
		 modelUpdater(node,value){
		 	 node.value=value;
		 }
		 /**
		  * @description  v-model作出相应处理； 
		  * 数据的渲染与绑定；
		  * 
		  * */
		  
		  model(node,vm,key){
		 	 this.update(node,vm,key,'model')
			 //监听事件监听应；
			 node.addEventListener('input',e=>{
				 let newVal=e.target.value;
				 vm[key]=newVal;
			 });
			 
		  }
		  
		 /**
		  * @description  textUpdater； 
		  * */
		 htmlUpdater(node,value){
		 	 node.innerHtml=value;
		 }
		 
		 /**
		  * @description  v-html作出相应处理； 
		  * */
		  html(node,vm,key){
		 	 this.update(node,vm,key,'html')
		  }
		 
		 /**
		  * @description  textUpdater； 
		  * */
		 textUpdater(node,value){
			 node.textContent=value;
		 }
		
		/**
		 * @description  v-text作出相应处理； 
		 * */
		 text(node,vm,key){
			 this.update(node,vm,key,'text')
		 }
		
		/**
		 * @description 判断是否是@开头的事件；
		 * */
		isEvent(attrName){
			return attrName.indexOf('@')===0;
		}
		/**
		 * @description 判断是否是v-开头的指令；
		 * */
		 isDirective(attrName){
			 return attrName.indexOf('v-')===0;
		 }
	   /**
	    * @description  判断是否是dom元素节点；
	    * */
	    isElementNode(node){
	   	   return node.nodeType==1;
	    }
		/**
		 * @description  判断是否是text节点；
		 * */
		isTextNode(node){
			return node.nodeType==3;
		}
	   
   }
 
  /**
   * @description 在编译模板的时候，添加监听器；
   * */
  class Watcher(){
	  constructor(vm,key,callback){
		  this.vm=vm;
		  this.key=key;
		  this.callback=callback;
		  this.value=this.get();
	  }
	  get(){
		  
		  // 读一下当前key，触发依赖收集
		  Dep.target = this
		  vm[key]
		  Dep.target = null
		  
		  let newVal=this.vm[this.key];
		  return newVal;
	  }
	  // 未来dep调用；
	  update(){
		  this.value=this.get();
		  this.callback.call(this.vm,this.value);
	  }
  }
  
  /**
   * @description  Dep 保存每一个key值的对应的所有watcher实例，
   * 	当某个key值发生改变的时候，通知对应的所有watcher实例进行更新；
   *    * 依赖收集器；所谓依赖，data数据与dom模板之间存在关系；
   * **/
   class Dep={
	   constructor(){
		   this.deps=[];
	   }
	   // 添加依赖实例；
	   addDep(watcher){
		   this.deps.push(watcher);
	   }
	    //当数据修改的以后，通知view层去更新数据；
	   notify(){
		   this.deps.forEach(dep=>{
			   dep.update();
		   })
	   }
   }