 ES6:

### 字符串的其他方法：
	1.includes:判断字符串中是否包含某一个字符，如果有包含，则返回true,否则返回false;

     let str='hello';
     str.includes('h'); // true;

    2.repeat(); 获取字符串重复n次；

	let s='ha';
    let newStr=s.repeat(3); // 'hahaha'

### Set 数据结构：
	在es6方法中，Set()本身是一个构造函数，用来生成set 数据结构，它类似于数组，但是成员是唯一的；

	const set=new Set([1,2,3,4,4]);
    console.log([...set]); // [1,2,3,4]

Set 数据结构可以接收一个数组[]作为参数，用来初始化；
    let items =new Set([2,3,3,4,5,6,6]);
    let arrItem=Array.from(items);
    console.log(arrItem); // [2,3,4,5]
    items.size  // 5   


### 现象级人物：“Promise” 
 	Promise 是异步编程的解决方案，比传统的解决方案：回调函数和事件；更加合理，强大。
    
-   Promise 可以理解为一个容器，里面保存着未来才会结束的事件的结果。
-   语法层面来讲，Promise对象是一个构造函数；通过 new Promise();创建一个实例对象，从它可以获取一个异步操作的消息；Promise 提供统一的API,各种异步操作都可以使用同样的方法进行处理；
-   Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
-   Promise 新建后就会立即执行。

    let promise = new Promise(function(resolve, reject) {
      console.log('Promise');
      resolve();
    });
    
    promise.then(function() {
      console.log('resolved.');
    });
    
    console.log('Hi!');
    
    // Promise
    // Hi!
    // resolved


 上述代码中Promise 新建后，立即执行，所以首先输入Promise,then 方法指定的回调函数，将在当前脚本所有的同步任务执行完以后才会执行；所以resolved 最后输出；


**Promise.all();**

    Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
    
    const p = Promise.all([p1, p2, p3]);
    上面代码中，Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。（Promise.all方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。）
    
    p的状态由p1、p2、p3决定，分成两种情况。
    
    （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
    
    （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
    【面试套路1】

手写一个promise

	    var promise=new Promise((resolve,reject)=>{
    		if(err){
				reject();
				}
				resolve();
	
    	});
		promise
			.then((val)=>{
		
		})
    		.catch((err)=>{
		
		})


**Issue:**jQuery的 ajax 返回的是promise 对象吗？

  答： ajax 返回的是deferred 对象，通过promise的resolve()方法，将其转换为promise 对象；
  var  jsPromise=Promise.resolve($.ajax(''));

**Issue:**promise只有2个状态，成功和失败，怎么让一个函数无论成功还是失败都能被调用？
    使用promise.all()
    
    Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。
    
    Promise.all方法接受一个数组作为参数，数组里的元素都是Promise对象的实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为Promise实例，再进一步处理。（Promise.all方法的参数可以不是数组，但必须具有Iterator接口，且返回的每个成员都是Promise实例。）
    
    示例：
    var p =Promise.all([p1,p2,p3]);
    p的状态由p1、p2、p3决定，分为两种情况。
    当该数组里的所有Promise实例都进入Fulfilled状态：Promise.all**返回的实例才会变成Fulfilled状态。并将Promise实例数组的所有返回值组成一个数组，传递给Promise.all返回实例的回调函数**。
    
    当该数组里的某个Promise实例都进入Rejected状态：Promise.all返回的实例会立即变成Rejected状态。并将第一个rejected的实例返回值传递给Promise.all返回实例的回调函数。


**Issue: **分析下列程序代码，得出运行结果，解释其原因

    Promise.resolve(1)
      .then((res) => {
    console.log(res)
    return 2
      })
      .catch((err) => {
    return 3
      })
      .then((res) => {
    console.log(res)
      })

    结果：
    1,2;
    
    分析:promise 可以使用链式调用，promise每次调用.then()/.catch() 都会返回一个新的promise,从而实现链式调用；


**Issue:**分析下列程序代码，得出运行结果，解释其原因

    process.nextTick(() => {
      console.log('nextTick')
    })
    Promise.resolve()
      .then(() => {
    console.log('then')
      })
    setImmediate(() => {
      console.log('setImmediate')
    })
    console.log('end')
 
   

    运行结果：
    	end 
    nextTick
    	then
    	setImmediate;
    
    process.nexTick()
    pormise.then() 都属于microtask;
    setImmediate() 属于macrotask,在事件循环的check 阶段执行；
    事件循环的每一个阶段macrosoft之间都会执行microsoft;事件循环的开始，先执行一次microtask;






