let reg2=/^http(s)?:\/\/w+\.qq\.com[^.]*$/
// ^ :	匹配输入字符串的开始位置
// ?:匹配前面的子表达式零次或一次
// \:转义字符
// +:匹配前面的子表达式一次或多次
// [^xyz]:负值字符集合。匹配未包含的任意字符
//* 匹配前面的子表达式零次或多次


//*****************************new 核心原理实现**********************************************//

/**
 * new 核心原理实现
 * 1、new 返回一个新的对象；
 * 2、通过原型链继承构造函数的原型对象；
 * 3、通过apply绑定this,访问父构造函数实现继承；
 * 返回新的对象；
 * 
*/

 function create(){
//   console.log(arguments);// argument是一个类数组；
   // [Arguments] { '0': [Function: Car], '1': 'black' }
   var obj=Object.create({});
   // 获取构造函数；
   const Con=[].shift.call(arguments);
   // 通过原型链继承构造函数的原型对象；
   obj.__proto__=Con.prototype;
   // 通过apply 绑定this,访问构造函数中的属性；
   Con.apply(obj,arguments);

   return obj;
 }


 function Car(color){
    this.color=color;
    this.name="baixiyang"
    return {
      name:this.name
    }
 }

var car =create(Car,'black');


//  new 模拟实现的优化； 
// 构造函数有如下三种情况： 返回新的对象 return {}； 2、没有return,即返回undefined,3、返回undefined以外的数据类型
function  updateCreate(){
   // 获取构造函数
   let Con =[].shift.call(arguments); 
   // 创建一个继承自构造函数原型的对象；
   let obj=Object.create(Con.prototype);
   // 绑定新建this对象,使其可访问构造函数中的属性
   let ret=Con.apply(obj,arguments)
   // 构造函数返回对象，则优先返回对象；
   return ret instanceof Object?ret:obj
}

//***************************************************************************//

//*****************************EventLoop**********************************************//
/**
 *  js是单线程的，为了防止一个函数执行时间过程阻塞后面的代码，会将同步任务压入执行栈；
 * 依次执行；
 *  将异步任务推入异步队列，异步队列氛围宏任务和微任务，
 *  宏任务队列的执行时间较长，因此微任务队列优先于宏任务队列；
 *  微任务队列代表：promise.then, MutationObserver
 *  宏任务代表：setImmediate setTimeout  setInterval;
 * 
*/

//***************************************************************************//


//***************************************原生ajax************************************//
/**
   ajax 异步通信方式,用从服务端获取数据达到局部刷新；
   * 1、创建XMLHttpRequest对象；
     2、调用open();  传入三个参数、 get/post 、url、同步异步true/false
     3、监听onreadyStateChange事件，当readyState===4时，返回responseText;
     4、调用send方法传递参数；
 * 
 * 
 * 
*/

//*******************************************************************************************//

//*******************************思考题 手写累加器********************************************//
/**
 * 问题：用 JS 实现一个无限累加的函数 add，示例如下：

      add(1); // 1
      add(1)(2);  // 3
      add(1)(2)(3)； // 6
      add(1)(2)(3)(4)； // 10 
 * 
*/

/**
 * 解题思路：
 * * console.log(functionName); 会自动调用functionName.toString();方法；
 * * 我们使用闭包 sum(b) 对a进行累加；
 * * 重写sum的toString方法；
 * 
*/
function add (a=0){

   function sum(b){ // 使用闭包
      a+=b;
      return sum;
   }
   sum.toString=function (){
      return a;
   }
   return sum;
}


//*********************************手写call apply bind******************************************//

Function.prototype.myCall=function(context,...args){
  if(typeof this !=='function'){
    throw new TypeError('not function');
  }
  if(!context){
     context=window
  }
  let fn=Symbol();
  context[fn]=this;
  let result =context[fn](...args)
  delete context[fn]
  return result;
}


Function.prototype.myApply=function(context,args=[]){
   if(typeof this!=='function'){
      throw new TypeError('not function')
   }
   if(!context){
      context=window
   }
   let fn=Symbol()
   context[fn]=this;
   let result=context[fn](...args)
   delete context[fn]
   return result;
}

Function.prototype.myBind=function(context,...args){
   if(typeof this !=='function'){
      throw new TypeError('not function')
   }
   if(!context){
      context=window;
   }
   let fn=this;
   return function(...otherArgs){
      return fn.apply(context,[...args,...otherArgs])
   }
}


//***************************************************************************//


function Product(name, price) {
   this.name = name;
   this.price = price;
 }
 
 function Food(name, price) {
   Product.call(this, name, price);
   this.category = 'food';
 }
 
 function Toy(name, price) {
   Product.call(this, name, price);
   this.category = 'toy';
 }
 
 var cheese = new Food('feta', 5);
//  var fun = new Toy('robot', 40);


//************************************手写 Promise***************************************//

// 调用原生Promise 

const promise = new Promise((resolve, reject) => {
   resolve('success')
   reject('err')
})

promise.then(value => {
  console.log('resolve', value)
}, reason => {
  console.log('reject', reason)
})

/**
 * @description 
 * Promsise 类是一个，在new 一个对象的时候，传入一个执行器且这个执行器立即执行；
 * 
 * Promsie 有三种状态 pending resolved    rejected 
 * 
 * Promsie 内部由resolve  reject 来改变promise 状态且不可逆
 * 
 * **/

// 定义三个常量；
const PENDING='pending'
const FULLFILLED='fullfilled'
const REJECTED='rejected'

// 1、完成状态和结果管理；
 class myPromise{
    constructor(executor){
       // 执行器立即执行；
      executor(this.resolve,this.reject);

    }
    // 成功后返回的值；
    value=null;
    // 拒绝后返回的值；
    reason=null;

   //暂存resolevd回调函数
   onFullfilledCallback=[];
   
   //暂存rejected回调函数； 
   onRejectedCallback=[];
    // promise 状态；
    status=PENDING

    resolve=(value)=>{
       // 只有状态是pending ,才执行修改，结果不可逆；
     if(this.status==PENDING){
        this.status=FULLFILLED;
        this.value=value
        // 迭代处理callback调用
        while(this.onFullfilledCallback.length>0){
       
           this.onFullfilledCallback.shift()(value)

        }
     }
    }

    reject=(reason)=>{
      if(this.status===PENDING){
         this.status=REJECTED;
         this.reason=reason;
         //迭代处理callback回调
         while(this.onRejectedCallback.length>0){
            this.onRejectedCallback.shift()(reason);
         }
         
      }
    }

   // 2、then 的简单实现； then 方法传入两个回调函数；
   then(onFullfilled,onRejected){
      if(this.status==FULLFILLED){
         // 4、链式调用then;为了链式调用then，直接返回一个新的Promise;
         const nextPromise=new myPromise((resolve,reject)=>{
        
            const x= onFullfilled(this.value)
            // 判断x的值类型，如果是普通类型直接返回，如果是promise类型，则返回then;
            resolvePromise(x,resolve,reject);
            
         })
         return nextPromise
         
      }else if(this.status==REJECTED){
         onRejected(this.reason);
      }else{
         // 3、通过暂存callback函数，实现异步逻辑处理调用resolve()
         // 3.1 then方法多次调用,利用数组存储callback回调；
         //暂存callback函数；
         this.onFullfilledCallback.push(onFullfilled);
         this.onRejectedCallback.push(onRejected);
      }
   }

 }
 function resolvePromise(x,resolve,reject){
   if(x instanceof myPromise){
      // 如果x是一个promise 对象；调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
      x.then(resolve,reject)
   }else{
      resolve(x);
   }
}

 // 对外暴露myPromise
 module.exports = myPromise;


 // for test

 const mypromise = new myPromise((resolve, reject) => {
   resolve('success')
   reject('err')
})

mypromise.then(value => {
  console.log('resolve', value)
}, reason => {
  console.log('reject', reason)
})


// for test async 

const asyncPromise = new myPromise((resolve, reject) => {
  setTimeout(()=>{
   resolve('async success')
  },3000);
})

asyncPromise.then(value => {
  console.log('resolve async ', value)
}, reason => {
  console.log('reject async ', reason)
})


// for test multi then
const multiPromise = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 2000); 
})

multiPromise.then(value => {
  console.log(1)
  console.log('resolve', value)
})
 
multiPromise.then(value => {
  console.log(2)
  console.log('resolve', value)
})

multiPromise.then(value => {
  console.log(3)
  console.log('resolve', value)
})

// for test 链式调用then;
// then 方法链式调用，那么就需要返回一个promise 对象；且里面return 一个返回值，作为下一个then方法的参数，如果return一个参数，则需要判断他的状态；


const thenPromise = new myPromise((resolve, reject) => {
   // 目前这里只处理同步的问题
   resolve('success thenPromise')
 })
 
 function other () {
   return new myPromise((resolve, reject) =>{
     resolve('other thenPromise')
   })
 }
 thenPromise.then(value => {
   console.log(1,'thenPromise')
   console.log('resolve', value)
   return other()
 }).then(value => {
   console.log(2)
   console.log('resolve', value)
 })


//***************************************************************************//




