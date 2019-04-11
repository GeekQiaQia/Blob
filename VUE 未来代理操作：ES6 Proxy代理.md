ES6 新特性：Proxy


 **功能**：类似于设计模式中的代理模式，Proxy 对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。；

 **机制**：当访问目标代理对象的时候，Proxy可以对外界的访问进行拦截过滤或者进行一些非核心逻辑处理；

  **优点**：由代理对象的Handle,来处理非核心逻辑；example:get某些属性之前，进行操作记录日志，或者set代理对象的属性之前，进行某种规则的校验，或者访问权限控制等逻辑处理；

         
> 可以让对象只需关注于核心逻辑，达到关注点分离，降低对象复杂度等目的。

  let p=new Proxy(target,handler);
   
  参数：

		target： 用Proxy 包装的被代理对象,ps:可以为任何类型的对象；包括函数、原生数组，或者另外一个对象；

   	    handler： 是一个对象，声明了代理target的一些操作，属性是当执行一个操作时，定义代理的行为的逻辑函数；包含陷阱（traps）的占位符对象。
         
		traps：提供属性访问的方法。这类似于操作系统中陷阱的概念。

	p 是代理后的对象，当外界每次对P进行操作时，就会执行handle 对象上的方法；  	


hangdler：代理方法：

    handler.apply()
    handler.construct()
    handler.defineProperty()
    handler.deleteProperty()
    handler.enumerate()
    handler.get()
    handler.getOwnPropertyDescriptor()
    handler.getPrototypeOf()
    handler.has()
    handler.isExtensible()
    handler.ownKeys()
    handler.preventExtensions()
    handler.set()
    handler.setPrototypeOf()


举例:在进行代理对象的属性set 之前，进行校验规则处理：

    let validator = {
	      set: function(obj, prop, value) {
	    if (prop === 'age') {
	      if (!Number.isInteger(value)) {
	    throw new TypeError('The age is not an integer');
	      }
	      if (value > 200) {
	    throw new RangeError('The age seems invalid');
	      }
	    }
	    
	    // The default behavior to store the value
	    obj[prop] = value;
	      }
    };
    
    let person = new Proxy({}, validator);
    
    person.age = 100;
    
    console.log(person.age); 
    // 100
    
    person.age = 'young'; 
    // 抛出异常: Uncaught TypeError: The age is not an integer
    
    person.age = 300; 
    // 抛出异常: Uncaught RangeError: The age seems invalid


[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy "MDN Proxy")

