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
      // 如果x是一个 promise 对象；调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
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

//*******************************手写一个浅克隆********************************************//
// 浅克隆，只拷贝数组或者对象的第一层内容；
// 判断是否是对象， array 或者 {}； 如果是对象则遍历对象属性；
const shallClone =(target)=>{
   if(typeof target==='object'&&target!==null){
      // 
      const cloneTarget=Array.isArray(target)?[]:{};
      for(let key in target){
         if(target.hasOwnProperty(key)){
            cloneTarget[key]=target[key]
         }
      }// end of for 
      return cloneTarget;
   }else{
      return target;
   }
}

//*******************************手写一个深克隆********************************************//
// 递归调用给每一个对象属性进行赋值； 只考虑array  {}
function deepClone(target){
   if(target==null){
      return null
   }
   if(typeof target !=='object'){
      return target
   }
   const deepTarget=Array.isArray(target)?[]:{}
   // 否则进行遍历深度递归；
   for(let key in target){
      if(target.hasOwnProperty(key)){
         deepTarget[key]=deepTarget(target[key])
      }
   }// end of for 
   return deepTarget;
}


//*******************************手写一个数组去重********************************************//



function debounce (fun,wait=500){
  let timer=null
  return function anonymous(...params){
    clearTimeout(timer);
    timer=setTimeout(()=>{
       timer=null;
       fun.call(this,...params);
    },wait);
  }
}


function throttle(fun,wait){
  let timer=null,preivous=0;
  return function anonymous(...params){
    let now=new Date();
    let remaining=wait-(now-preivous)  // 维护一个剩余执行时间；
    if(remaining<0){  // 则可以放行执行
      clearTimeout(timer);
      timer=null;
      preivous=new Date();
      fun.call(this,...params);

    }else if(!timer){ // 第一次触发；
      timer=setTimeout(()=>{
         // 执行完清除计时器；
         clearTimeout(timer);
         timer=null;
         preivous=new Date();
         fun.call(this,...params);
      },remaining);
    }
  }
}


// Object.create
Object.create=function create(prototype){
   if(prototype==null||typeof prototype !=='object'){
      throw new TypeError('object');
   } 
   // 空构造函数；让其原型属性指向传入的原型对象；
   function Temp(){}
   Temp.__proto__=prototype;
   return new Temp; 
}


function _new(Fun,...args){
   let obj=Object.create(Fun.prototype);
   let res=Fun.call(obj,...args);
    
   // 返回值判断；
   if(res!==null&&/^(object|function)$/.test(typeof res)){
      return res;
   }
   // 否则返回obj;
   return obj;

}


// es5 实现数组扁平化；
function myFlat(){
   _this=this;
   let newArr=[];
   let cycleArray=(arr)=>{
      for(let i=0;i<arr.length;i++){
         if(Array.isArray(arr[i])){
            cycleArray(arr[i])
            continue
         }else{
            newArr.push(arr[i]);
         }
      }// end of for 
   }
   cycleArray(_this);
   return newArr;
}


// es5实现扁平化；
const flat=(arr)=>{
   let newArr=[];
   let cycleArray=(arr)=>{
      for(let i=0;i<arr.length;i++){
         let item=arr[i]
         if(Array.isArray(item)){
            cycleArray(item);
            continue;
         }else{
            newArr.push(item);
         }
      }// end 
   }// 
   cycleArray(arr);
   return newArr;
}

// reduce 实现扁平化；
 const flatReduce=(arr)=>{
   return arr.reduce((pre,cur,index)=>{
      return pre.concat(Array.isArray(cur)?flatReduce(cur):cur);
   },[]);
 }

 // 原地去重；数组去重；
function arraySet(arr){
   let obj={};
   for(let i=0;i<arr.length;i++){
      let item=arr[i];
      if(obj[item]!=='undefined'){
         // 删除当前元素；
         arr[i]=arr[arr.length-1]
         arr.length--;
         i--
      }
      obj[item]=item;
   }
   obj=null;
}

// 基于generator 实现async await ;

function asyncFun(generator){
   const iterator=generator();
   const next=(data)=>{
      let {value,done}=iterator.next(data);
      if(done){
         return ;
      }
      value.then((data)=>{
         next(data);
      });

   }
   next();
}

asyncFun(function* (){
   let data= yield readfile();
   data=yield readfile2();
   return data;
})



// 基于promise 封装ajax；
function ajax(url,method){
  return new Promise((resolve,reject)=>{
   const  xhr=new XMLHttpRequest();
   xhr.open(url,method,true);
   xhr.onreadystatechange=function(){
      if(xhr.readyState===4){
         if(xhr.status===200){
            resolve(xhr.responseText);
         }else{
            reject();
         }
      }else{
         reject('req error');
      }
   }
   xhr.send(null);
  })
}


//手动实现jsonp跨域；

let script =document.createElement('script');
script.src="http://www.baidu.com?username=json**callback=callback"

document.appendChild(script);
function  callback(res){
   console.log(res);
}

// 手动实现sleep;
function sleep(wait){
   return new Promise((resolve,reject)=>{
      setTimeout(()=>{
         resolve();
      },wait);
   });
}

// es5实现reduce ;

[].reduce((pre,curr,index,arr)=>{},prev);


Array.prototype.myReduce=function(fn,prev){
   // 遍历当前array;
   for(let i=0;i<this.length;i++){
      if(typeof prev==='undefined'){
         prev=fn(this[i],this[i+1],i+1,this);
         i++
      }else{
         prev=fn(prev,this[i],i,this)
      }
   }// end of 
   return prev;
}

// 手动实现currying 函数；
function add(a,b,c,d){
   return a+b+c+d;
}
function currying(fn,...args){
   // 将函数的参数综合与当前传入的参数长度进行比较；
   if(fn.length===args.length){
      return fn(...args);
   }else{
      // 返回一个函数接受另外的参数；
      return function anonymous(...newArgs){
         let all=[...args,...newArgs]
         // 递归调用currying;
         return currying(fn,...all)
      }
   }
}


// es5实现一个继承；
// 寄生继承； 通过构造函数继承属性；通过原型链继承方法；


function Parent(name) {
   this.name = name;
   this.colors = ['red', 'blue', 'green'];
 }
 Parent.prototype.getName = function () {
   return this.name;
 }
 

function Child(name,age){
   Parent.call(this,name);
   this.age=age;
}

// 寄生组合继承；
Child.prototype=Object.create(Parent.prototype);
Child.prototype.constructor=Child;
Child.prototype.getAge=function(){
   return this.age;
}


// 手动实现发布订阅；
// 每次emit 都会触发on callback;
class EventEmitter{
   constructor(){
      this.events={};
   }
   on(eventName,callback){
      if(this.events[eventName]=='undefined'){
         this.events[eventName]=[callback]
      }else{
         this.events[eventName].push(callback);
      }
   }

   // 触发事件的方法；
   emit(eventName){
      this.events[eventName]&&this.events[eventName].forEach(cb=>cb());
   }
}

// 手动实现观察者模式；
// 观察者模式有观察者，有被观察者；
// 被观察者 
class Subject{
 constructor(name){
   this.state='happy';
   this.observers=[];// 存储所有的观察者；
 }
 attach(o){
   this.observers.push(o);
 }
 // 更新被观察者；
 setState(newState){
   this.state=newState; // 更新状态；
   this.observers.forEach(o=> o.update(this));
 }
}

class Observer{
   constructor(name){
      this.name=name;
   }
   update(student){
      console.log('',student);
   }
}

let student = new Subject('学生'); 

let parent = new Observer('父母'); 
let teacher = new Observer('老师'); 

// 被观察者存储观察者的前提，需要先接纳观察者
student. attach(parent); 
student. attach(teacher); 
student. setState('被欺负了');


// 手动实现Object.freeze;
// 冻结一个对象，让其不能再增删改其他属性；

function myFreeze(obj){
   if(obj instanceof Object){
      Object.seal(obj); // 封闭对象；
      for(let key in obj){
         if(obj.hasOwnProperty(key)){
            Object.defineProperty(obj,key,{
               writable:false
            });
            // 递归
            myFreeze(obj[key]);
         }
      }
   }
}

//手写 Promsie.all
// 有一个promise 任务失败就全失败；，返回一个promise;
 function isPromsie(val){
   return typeof val.then ==='function'
 }


 //promise.all([a,b,c,d]);

Promise.all=function(promises){
   return new Promise((resolve,reject)=>{
      let arr=[];//存放promise执行结果；
      let index=0;// 计数器，累计promise 执行次数；
      const processData=(key,data)=>{
         arr[key]=data;
         if(++index==promises.length){
            resolve(arr);
         }
      }
      // 遍历依次拿到执行结果；
      for(let i=0;i<promises.length;i++){
         let result=promises[i];
         if(isPromsie(result)){
            // 原数组顺序依次输出；
            result.then((data)=>{
               processData(i,data);
            },reject);
         }else{
            ProcessData(i,result);
         }
      }
   });
}

Promise.allSettled=function(promises){
   return new Promise((resolve,reject)=>{
      let arr=[]; // 存储每个结果的状态；
      let times=0; // 累加器；
      // 统计函数；
      const setData=(i,data)=>{
         arr[i]=data;
         if(++times===promises.length){
            resolve(arr);
         }
      }
      for(let i=0;i<promises.length;i++){
         let current=promises[i]
         if(isPromsie(current)){
            current.then((data)=>{
               setData(i,{status:'fulfilled',value:data});
            },err=>{
               setData(i,{status:'rejected',value:err});
            });
         }else{
            setData(i,{status:'fulfulled',value:current});
         }
      }

   });
}


// 手动实现promise.finally;
Promise.prototype.finally=function(callback){
   return this.then((data)=>{
      return Promise.resolve(callback()).then(()=>data);
   },err=>{
      return Promise.resolve(callback()).then(()=>{
         throw err;
      });
   })
}

https://juejin.cn/post/6870319532955828231#heading-42

//实现一个异步求和函数；
function asyncAdd(a,b,callback){
   setTimeout(()=>{  
      callback(null,a+b)
   },1000);
}
// 异步两数之和；
async function  sumT(a,b){
   return await new Promise((resolve,reject)=>{
      asyncAdd(a,b,(err,res)=>{
         if(!err){
            resolve(res);
         }
         reject(err);
      })
   })
}

// 多数之和呢

const arr=[1,2,3,4]
const reducer=(acc,cur)=>{
   return acc+cur
}
arr.reduce(reducer);


// 利用两数之和 ；
async function sum(...args){
   if(args.length===1){
      return args[0]
   }
   let result=[];
   for(let i=0;i<args.length;i=+2){
      result.push(sumT(args[0],args[1]));
   }
   // 判断是否是奇行；
   if(args.length&1){
      result.push(args.length-1):
   }//
   return sum(...await Promise.all(result));
}

// 手写一个Promise.prototype.finally();
// finally是一个callback回调函数无论前面的返回结果是什么，他都执行；且返回一个promise;

Promise.prototype.finally=function(callback){
   return this.then((res)=>{
      return Promise.resolve(callback()).then(()=>{
        return res; 
      });
   },(err)=>{
      return Promise.resolve(callback()).then(()=>{
         throw err;
      });
   })
};

// promsie.any
const promises = [
  Promise.reject('ERROR A'),
  Promise.reject('ERROR B'),
  Promise.resolve('result'),
]

Promise.any(promises).then((value) => {
  console.log('value: ', value)
}).catch((err) => {
  console.log('err: ', err)
})

const promises = [
  Promise.reject('ERROR A'),
  Promise.reject('ERROR B'),
  Promise.reject('ERROR C'),
]

Promise.any(promises).then((value) => {
  console.log('value：', value)
}).catch((err) => {
  console.log('err：', err)
  console.log(err.message)
  console.log(err.name)
  console.log(err.errors)
})

// 返回一个promise;手写promise.any 遍历promises ，只要一个resove则resolvr;
Promsie.prototype.any=function(promises){
   return new Promise((resolve,reject)=>{
      promises=Array.isArray(promises)?promises:[];
      let len=promises.length;
      let err=[];
      if(len==0){
         return reject(new AggregateError(''))
      }
      // 遍历；
      promises.forEach((promise)=>{
         promsie.then((val)=>{
            resolve(val);
         },(err)=>{
            len--;
            err.push(err);
            if(len==0){
               reject(new AggregateError(err));
            }
         });
      });
   })
}


// coding promsie.allSettled

Promise.prototype.allSettled=function(promises){
   return new Promise((resolve,reject)=>{
      let res=[];
      let times=0;
      let setData=(index,data)=>{
         res[index]=data;
         if(++times===promises.length){
            resolve(res);
         }
      }
      for(let i=0;i<promises.length;i++){
         let curr=promises[i]
         if(isPromsie(curr)){
            curr.then((res)=>{
               setData(i,{status:'fullfilled',value:res});
            },(err)=>{
               setData(i,{status:'rejected',value:err});
            }
         }else{
            setData(i,{status:'fullfilled',value:curr});
         }
      }
   });
}

// 监听一个对象；

function observer(obj){
   Object.keys(obj).forEach(key){
      defineReactive(obj,key,obj[key])
   } 
}
function defineReactive(obj,k,v){
   if(typeof v==='object'){
      observer(v);
   }
   Object.defineProperty(obj,k,{
      enumerable:true,
      configrable:true,
      get:function reactiveGetter(){
         return v;
      },
      set:function reactiveSetter(newV){
         if(v!=newV){
            v=newV;
         }
      }
   });
}

const arrayProto=Array.prototype;
export const arrayMethods=Object.create(arrayProto);
// 重写以下函数；
const methodsToPath=['push','pop','shift','unshift','splice',
'sort','reverse']

methodsToPath.forEach((method)=>{
   // 缓存原生函数；
   const original=arrayProto[method]
   // 重写函数；
   def(arrayMethods,method,function mutator(...args){
      // 调用原生函数获取结果；
      const result =original.apply(this,args)
      const ob=this.__ob__;
      let inserted;
      switch ((method)) {
         case 'push':
         case:'unshift':
            inserted=args
            break;
         case:'splice':
         inserted=args.slice(2)
            break;
         default:
            break;
      }
      if(inserted){
         ob.observerArray(inserted);
      }
      // 手动派发更新；
      ob.dep.notify();
      return result;
   })
});


// vm.$set();
export function set(target,key,val){
   // target 如果为数组；
   if(Array.isArray(target)&&isInvalidArrayIndex(key)){
      target.length=Math.max(target.length,key);
      target.splice(key,1,val);
      return val;
   }//
  
   if(key in target && !(key in target.prototype)){
      target[kye]=val
      return val;
   }

   // 判断是否响应式‘
   const ob=target.__ob__;
   if(!ob){  // target 不是响应式数据；
      target[key]=val;
      return val;
   }

   // 关键是手动调用，否则进行响应式处理；并通知；ob.dep.notify();
   defineReactive(ob.value,key,val);
   ob.dep.notify();
   return val;

};
// 手写一个reactive;

const toProxy= new WeekMap():
const toRaw= new WeekMap();
function reactive(target){
   // reactive
   createReactiveObject(target);
}
function createReactiveObject(target){
   if(!isObject(target)){
      return target
   }
   //
   let observed=toProxy.get(target);
   if(observed){
      return observed
   }
   if(toRao.has(target)){
      return target
   }
   const handler={
      get(target,key,receiver){
         let res=Reflect.get(target,key,receiver);
         track(target,'get',key);
         return res;
      },
      set(target,key,val,receiver){
         let oldV=target[key]
         let hadkey=target.hasOwnProperty(key);
         let res=Reflect.set(target,key,val,receiver);
         if(hadkey){
            track(target,'set',key);
         }else{
            track(target,'addd',key)
         }
         return res;
      }// 
   }// 
   let proxy=new Proxy(target,handler);
   toProxy.set(target,proxy);
   toRaw.set(proxy,target); 
};

function rgb2hex(rgb){
   rgb=rgb.match(/\d+/g);
   const hex=(n)=>{
      return ("0"+Number(n).toString(16)).slice(-2);
   }
   return rgb.reduce((acc,cur)=>{acc+hex},"#");
}
   
// 插入排序；
function insertionSort(arr){
   let n=arr.length;
   let prevIndex,current;
   for(let i=1;i<n;i++){
      current=arr[i];
      prevIndex=i-1;
      while(prevIndex>=0&&current<arr[prevIndex]){
         arr[prevIndex+1]=arr[prevIndex]
         prevIndex--
      }
      curr[prevIndex+1]=current
   }// end of for ;
   return arr;
}

// 闭包js基础题；
// 1、闭包收集参数 2、getValue进行求和操作；
var foo = function(...args) { // 要求实现函数体}
var f1 = foo(1,2,3); f1.getValue(); // 6 输出是参数的和
var f2 = foo(1)(2,3); f2.getValue(); // 6
var f3 = foo(1)(2)(3)(4); f3.getValue(); // 10

var foo=function(...args){
   let addArgs=[...args]
   function fn(...innerArgs){
      addArgs=[...innerArgs,...args]
      return fn;
   }
   fn.getValue=function(){
      return addArgs.reduce((acc,cur)=>{
         return acc+cur
      },0);
   }
}

var debounce=function (fn,wait=50){
   let timer,context,args;
  
   const later=setTimeout(()=>{
      fn.apply(context,args);
      context=null;
      args=null;
   },wait);
    // 使用闭包；
   return function (...params){
      
      if(!timer){
         timer=later();
         context=this;
         args=params;
      }else{
         clearTimeout(timer)
         timer=later();

      }
   }
}

// 柯里化curry
function curry(fn,...args){
    //将函数的参数综合与当前传入的参数长度进行比较；
   if(fn.length===args.lenght){
      return fn(...args)
   }
   return function anonymous(...otherArgs){
      let all=[...args,...otherArgs]
      return curry(fn,all);
   }
}
// instanceof 内部原理实现；
function instanceof(L,R){
   let prototype=R.prototype;
   let lProto=L.__proto__;
   while(true){
      if(L==null){
         return false;
      }
      if(lProto===prototype){
         return  true;
      }
      lProto=lProto.__proto__;
   }
}

//按照 instanceof 的逻辑，真正决定类型的是 prototype

function isFunction(value) {
  return Object.prototype.toString.call(value) === "[object Function]"
}
function isDate(value) {
  return Object.prototype.toString.call(value) === "[object Date]"
}
function isRegExp(value) {
  return Object.prototype.toString.call(value) === "[object RegExp]"
}

// indexOf / findIndex  //的第一个元素的索引
Array.prototype.indexOf();

//第 161 题：用最精炼的代码实现数组非零非负最小值index
例如：[10,21,0,-7,35,7,9,23,18] 输出5, 7最小

function getIndex(arr){
      let index=null;
      ...
      return index;
}

function getIndex(arr){
   let index=-1;
   let min=Infinity;
   for(let i=0;i<arr.length;i++){
      if(arr[i]>0&&arr[i]<min){
         min=arr[i]
         index=i;
      }
   }// end of for;
   return index;
}
// O(N) O(1)


// 第 160 题：输出以下代码运行结果，为什么？如果希望每隔 1s 输出一个结果，
//应该如何改造？注意不可改动 square 方法 #389

const list = [1, 2, 3]
const square = num => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num)
    }, 1000)
  })
}

function test() {
  list.forEach(async x=> {
    const res = await square(x)
    console.log(res)
  })
}
test()
// forEach 是否不能阻塞的，默认是请求并行发起，所以同时输出1,4,9；

// 串行输出；
async function tes(){
   for(let val of list){
      const res=await square(val);
      console.log(res);
   }
}
// promsie版本；
// 利用promise 本身的链式调用来实现串行；
let promsie=new Promise();
function test(i=0){
   if(i===list.length){
      return ;
   }
   promsie=promsie.then(()=>{
      square(list[i]);
   });
   test(i+1)
}

// 第 159 题：实现 Promise.retry，成功后 resolve 结果，
//失败后重试，尝试超过一定次数才真正的 reject #387
Promise.prototype.retry=function(promsieFn,times=3){
return new Promsie(async (resolve,reject)=>{
   while(times--){
      try{
         let res=await promsieFn();
         resolve(res);
         break;
      }catch(e){
         if(!times){
            reject(e);
         }
      }
   }
});
}

// 第 158 题：如何模拟实现 Array.prototype.splice
let splice=function(start,deleteCount,...addList){
   if(start<0){
      if(Math.abs(start)>this.length){
         start=0;
      }else{
         start+=this.length;
      }
   }// 获取下标；
   if(typeof deleteCount==='undefined'){
      deleteCount=this.length-start;
   }// 如果不传，则删除数量为start之后的所有；

   // splice 返回移除以后的数组；
   const removeList=this.slice(start,start+deleteCount);

   const right=this.slice(start+deleteCount);
   let addIndex=start;
   addList.concat(right).forEach((item)=>{
      this[addIndex]=item;
      addIndex++
   });
   this.length=addIndex;
   // 
   return removeList
}



// 第 156 题：求最终 left、right 的宽度（变形)
<div class="container">
    <div class="left"></div>
    <div class="right"></div>
</div>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .container {
    width: 600px;
    height: 300px;
    display: flex;
  }
  .left {
    flex: 1 2 300px;
    background: red;
  }
  .right {
    flex: 2 1 200px;
    background: blue;
  }
</style>

// flex-grow  flex-shrink flex-basic的计算；
// 多余100；宽度，应该扩大；
// 括大空间的占比 1/2

//https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Controlling_Ratios_of_Flex_Items_Along_the_Main_Ax


// 4. 求最终 left、right 的宽度 #5
<div class="container">
    <div class="left"></div>
    <div class="right"></div>
</div>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .container {
    width: 600px;
    height: 300px;
    display: flex;
  }
  .left {
    flex: 1 2 500px;
    background: red;
  }
  .right {
    flex: 2 1 400px;
    background: blue;
  }
</style>
// 计算flex-shrink  溢出则进行缩小；
//总权重： 2*500+1*400=1400；
300*2*500/1400
300*1*400/1400


// 第 153 题：实现一个批量请求函数 multiRequest(urls, maxNum) #378

// 要求如下：

// 要求最大并发数 maxNum
// 每当有一个请求返回，就留下一个空位，可以增加新的请求
// 所有请求完成后，结果按照 urls 里面的顺序依次打出
new Promise((resolve,reject)=>{

});

// 最大并发数请求的实现；
function multiRequest(urls,maxNum){
   let result=[];
   let i=0;
   let resolve;
   const promsie=new Promise((res,rej)=>{
      resolve=res;
   });
   const addTask=function(){
      if(i>=urls.length){
         resolve();
      }
      const task=request(urls[i++]).finally(()=>{
         addTask()
      })
      result.push(task);
   }
   // 先执行addTask;
   while(i<maxNum){
      addTask();
   }
   return promsie.then(()=>{
      Promise.all(result);
   });
}

//第 152 题：实现一个 normalize 函数，能将输入的特定的字符串转化为特定的结构化数据 #331
字符串仅由小写字母和 [] 组成，且字符串不会包含多余的空格。
示例一: 'abc' --> {value: 'abc'}
示例二：'[abc[bcd[def]]]' --> {value: 'abc', children: {value: 'bcd', children: {value: 'def'}}}

// ["abc", "bcd", "def"]

function normalize(s){
   let arr=s.match(/\w+/g);
   let result
   while(arr.length){
      let cur=arr.pop();
      let temp={value:cur}
      if(result){
         temp.children=result;
      }
      result=temp;
   }// 
   return result;
}

// 第 151 题：用最简洁代码实现indexOf方法 #321  slice(start,end);

function indexOf(str,item){
   let strLen=str.length;
   let itemLen=item.length;
   for(let i=0;i<=strLen-itemLen;i++){
      // 校验是否存在子串；
      if(str.slice(i,itemLen+i)===item){
         return i;
      }
   }
   return -1;
}

https://github.com/Advanced-Frontend/Daily-Interview-Question/issues?page=4&q=is%3Aissue+is%3Aopen






function debounce(fn,wait){
   let timer=null;
   let args=null;
   let context=null;
   let later=setTimeout(()=>{
      fn.apply(context,args);
      context=null;
      args=null;
   },wait)
   return function(...params){
      if(timer){
         clearTimeout(timer);
         timer=later();
      }else{
         timer=later();
         args=params;
         context=this;
      }
   }
}



2、 一维数组转换为定长的二维数组如[1,2,3,4,5,6,7,8,9,10]转换为[  [1,2,3] , [4,5,6] ,[ 7,8,9] ,[10] ]


function  arrSplit(arr,len){
   let result=[];
   for(let i=0;i<arr.length;){
      let temp=arr.slice(i,i+len);
      result.push(temp);
      i+=len
   }
   return result;
}


// 3、 将给定数组（ 如：[1,2,3,4,5] ）的每一项间隔1s打印。（最终期待的效果是：每间隔一秒打印出数组的一项）

async function printArr(arr,wait){
      const  print=(item,wait)=>{
         return new Promise((resolve,reject)=>{
            setTimeout(()=>{
              resolve(item);
            },wait)
         });
      }
      
      for  (variable of arr) {
            await  print(variable,wait).then((res)=>{
               console.log(res);
            })
       }
   
   }
   printArr([1,2,3,4],1000)
   
// 实现方法2；
   function sleep(interval){
      return new Promise((resolve,reject)=>{
         setTimeout(resolve, interval);
      })
   }
   async function stepPrint(n){
       for(let i=0;i<=n;i++){
            console.log(i);
           await  sleep(i*10000);
            }
   }



function debounce(fn,wait){
      let timer=null;
      let args=null;
      let context=null;
      let later=setTimeout(()=>{
         fn.apply(context,args);
         context=null;
         args=null;
      },wait)
      return function(...params){
         if(timer){
            clearTimeout(timer);
            timer=later();
         }else{
            timer=later();
            args=params;
            context=this;
         }
      }
   }
   
   function  arrSplit(arr,len){
      let result=[];
      for(let i=0;i<arr.length;){
         let temp=arr.slice(i,i+len);
           console.log(temp);
         result.push(temp);
         i+=len
      }
       console.log(result);
      return result;
   }
   
   
   async function printArr(arr,wait){
         const  print=(item,wait)=>{
            return new Promise((resolve,reject)=>{
               setTimeout(()=>{
                 resolve(item);
               },wait)
            });
         }
         for await (variable of arr) {
             console.log(await print(variable,wait).then((res)=>{
         console.log(res);
      }));
   
      }
   printArr([1,2,3,4],1000)
   
// mixin 生命周期和主应用的执行顺序；

var func=[];
var _loop=function (i){
   func[i]=function(){
      console.log(i)
   }
};
for(var i=0;i<10;i++){
  _loop(i)
}
func[0]();



// 手写发布订阅模式
class EventEmitter{
   constructor(){
      this.events={}
   }
   // 实现订阅
   on(type,callback){
      if(!this.events[type]){
         this.events[type]=[callback]
      }else{
         this.events[type].push(callback);
      }
   }// 
   // 删除订阅；
   off(type,callback){
      if(!this.events[type]){
         return ;
      }else{
         this.events[type]=this.events[type].filter((item)=>{
            return item!==callback
         });
      }  
   }
   // 只执行一次订阅事件；
   once(type,callback){
      function fn(){
      // 执行完毕则删除订阅；
         callback();
         this.off(type,fn);
      }
      this.on(type,fn)
   }
   // 触发事件；
   emit(type,...rest){
      this.events[type]&&this.events[type].forEach((fn)=>{
         fn.apply(this,rest);
      })
   }

}
// 手写防抖节流

function debounce(fn,delay=300){
   let timer;
   return function(){
      const args=arguments
      if(timer){
         clearTimeout(timer);
      }else{
         timer=setTimeout(()=>{
            fn.apply(this,args); // 改变this指向为调用debounce所指的对象
         },delay);
      }
   }
}

// 节流；
function throttle(fn,delay){
   let flag=true;
   return ()=>{
      if(!flag){
         return 
      }else{
         flag=false;
         timer=setTimeout(()=>{
            fn();
            flag=true;
         },delay)
      }

   }
}

// setTimeout 模拟setInterval alibaba
// 利用闭包原理；
function mySetInterval(fn,delay){
   let timer=null;
   let isClear=false;
   function interval(){
      if(isClear){
         isClear=false;
         clearTimeout(timer);
         return;
      }
      fn();
      timer=setTimeout(interval,delay);
   }
   timer=setTimeout(interval,delay);
   return ()=>{
      isClear=true;
   }
}
// 手写new 
function myNew(fn,...args){
  let obj=Object.create(fn.prototype);
  let res=fn.apply(fn,args);
  if(res&&typeof res==='object'|| typeof res== 'function'){
     return  res
  }
  return obj;
}


function isPromsie(fn){
 return typeof fn.then ==='function'?true:false
}
// promise.all /race();
promise.prototype.all=function(promises){
  
   return new Promise((resolve,reject)=>{
      let result=[];
      let count=0;
      function processData(i,val){
         result[i]=val
         if(++count===promises.length){
            resolve(result)
         }
      }

      for(let i=0;i<promises.length;i++){
         let curr=promises[i];
         if(isPromsie(curr)){
            curr.then((val)=>{
               processData(i,val);  
            })
         }else{
            precessData(i,curr);
         }
      }
   });
}
// race  //promise数组只要有任何一个promise 状态变更  就可以返回
promise.prototype.race=function(promises){
   return new Promise((resolve,reject)=>{
      for(let i=0;i<promises.length;i++){
         Promise.resolve(promises[i]).then((res)=>{
            resolve(res);
         },(err)=>{
            reject(err);
         });
      }
   })
}
}


//实现rightView 函数；
function TreeNode(val){
   this.val=val;
   this.left=null;
   this.right=null;

}

// 按要求实现rightView 函数；
function rightView(root){
  let queue=[root]
  let result=[];
  // 层序遍历；
  while(queue.length>0){
   let length=queue.length;
   let temp=null;
   for(let i=0;i<length;i++){
      const node=queue.shift();
      if(node.val){
         temp=node.val;
      }
      if(node.left){
         queue.push(node.left);
      }
      if(node.right){
         queue.push(node.right);
      }
   }// endof for 
   result.push(temp);
  }
  return result;
}

// [1,2,4,7,3]  =>  1,4,3

// 实现将52张牌随机均等的分给四个人，；
function randomEqualCard(cardArr,num){
   let len=cardArr.length;
   if(!cardArr||!(num>1)||!(len>num)||!(len%num)!==0){
      return ; //不符合要求；
   }
   let  cardRange=len;
   let  result=[];
   for(let i=0;i<num;i++){
      result[i]=[]; // 存储每个人的发牌；
   }
   // 
   while(cardRange>0){
      let random=Math.floor(cardRange*Math.random())
      // let temp=cards[cardRange-1]
      // cardArr[cardRange-1]=cardArr[random]
      // cardArr[random]=temp;
      [cardArr[random],cardArr[cardRange-1]]=[cardArr[cardRange-1],cardArr[random]]
      result[cardRange%num].push(cardArr[cardRange-1]);
      cardRange--;  // 缩小随机范围；
   }
   return result;
}

// 构建树；[{id:1,parendId:0},{id:2,parentId:1},{id:3,parentId:1}] 递归构建；

function getTree(data,root=0,idTxt='id',pidTxt='parentId',chTxt='children'){
   function getNode(id){
      let node=[];
      for(let i=0;i<data.length;i++){
         if(data[i][pidTxt]==id){
            data[i][chTxt]=getNode(data[i][idTxt])
            node.push(data[i]);
         }
      }
   }
   return getNode(root)
}

// 或者利用一个map映射；

// 算法 单链表实现队列；
// 定义队列节点；
function Node(data){
   this.data=data;
   this.next=null;
}
// 初始化队列；
function Queue(){
 this.front=null;  // 指向队列头结点； 
}

Queue.prototype={
   add(node){
      // 入队；
      let current=this.front;
      if(current){
         //迭代查找链表指针；
         while(current.next!==null){
            current=current.next;
         } 
         current.next=new Node(node);

      }else{
         this.front=new Node(node)
      }


   },
   // 出队；
   remove(){
      // 释放头指针，指向第一个节点；
      if(this.front){
         let current=this.front;
         let data=current.val;
         this.front=current.next;
         return data;
      }else{
         throw new Error('queue is empty');
      }
   },// 
   isEmpty(){ // 判断是否为空；
      return this.front ===null;
   },
   getFront(){
      // 读取头结点；
      return this.front.data;
   },
   printQueue(){
      // 输出队列；
      let temp=this.front;
      while(temp){
         console.log(temp.val);
         temp=temp.next;
      }
   }
}

// 算法； 统计一组整形数组的最大差值；

// 迭代；

// 算法 三数之和 随机整数数组中，调出数组内，三个随机整数和为100的所有数据；
//  排序+双指针；
// function threeNum(nums,target){
//    let res=[];
//    let len=nums.length;
//    if(nums==null||len<3){
//       return ;
//    }
//    // 排序 nums.sort((a,b)=>{return a-b});
//    nums.sort((a,b)=>{return a-b});
//    for(let i=0;i<len-2;i++){
//       //基准值去重；
//       if(nums[i]===nums[i-1]){
//          continue;
//       }
//       // 确定一个基准值进行比较；
//       let left=i+1;
//       let right=len-1;
//       // 迭代；left  right;
//       while(left<right){
//          let sum=nums[left]+nums[i]+nums[right]
//          if(sum==target){
//             res.push([nums[left++],nums[i],nums[right--]]);
//             while(nums[left]===nums[left-1]){
//                // 左指针去重；
//                left++
//             }
//          }else if(sum<target){
//             left++
//          }else{
//             right--
//          }
//       }// end of while
//    }// end of for ;

//    return res;
// }

function threeNum(nums,target){
   // 双指针+排序
   let len=nums.length;
   if(nums||len<3){
      return ;
   }
   // 
   let result=[];
   nums.sort((a,b)=>{
      return a-b;
   });
   for(let i=0;i<len-2;i++){
      // 基准值去重；
      if(nums[i]===nums[i-1]){
         continue;
      }
      // 定义指针； left  right; 
      let left=i+1;
      let right=len-1;
      let sum=nums[i]+nums[left]+nums[right]
      // 迭代查找；
      while(left<right){
         if(sum===target){
            result.push([nums[i],nums[left++],nums[right--]]);
            //左指针去重；
            while(nums[left]===nums[left-1]){
               left++
            }
         }else if(sum<target){
            left++
         }else{
            right--
         }
      }// end of while 
   }// end of for 
   return result;
}

// 算法 统计数组中指定元素出现的次数；  [1,1,2,3,3,3,3,3,4,6,6]  n； 时间复杂度O(n)

function counter(arr,n){
   let map=new Map();
   let len=arr.length;
   for(let i=0;i<len;i++){
      if(map.has(arr[i])){
         map.set(arr[i],map.get(arr[i])+1);
      }else{
         map.set(arr[i],1);
      }
   }// end of for;
   return map.get(n)||0;
}
// 
// 算法、 爬楼梯，每个人每次只能走一层或者俩层楼梯、走到第80层楼梯一共有多少种方法；
// 动态规划；dp[0]=
function climbStairs(n){
   if(n<=2){
      return n;
   }
   let dp=new Array(n+1).fill(0);
   dp[0]=0;dp[1]=1;dp[2]=2;
   for(let j=3;j<n;j++){
      dp[j]=dp[j-1]+dp[j-2]
   }
   // 
   return dp[n]
}// 

// 排序算法 ：快排序
function quickSort(nums){
   if(nums.length===0){
      return [];
   }
   let mediaIndex=Math.floor(nums.length/2);
   let curr=nums.splice(mediaIndex,1);
   let left=[];
   let right=[];
   for(let i=0;i<arr.length;i++){
      if(nums[i]<curr){
         left.push(nums[i]);
      }else{
         right.push(nums[i]);
      }
   }// end of for 
   return this.quickSort(left).concat(curr,this.quickSort(right))
}// 


// 实现一个函数，给定一个数组，输出任意两个值为0的下标；
// 两数之和  多个存在值；
function  findIndex(nums,target=0){
 let result=[];
 let map=new Map();
 
 for(let i=0;i<nums.length;i++){
   if(!map.has(nums[i])){//
      map.set(target-nums[i],i);
   }else{
      result.push([map.get(target-nums[i]),i]);
   }
 }// 
  return result;
}


// 算法 ：有效括号判断：判断字符串括号是否有效；
function isValid(arr){
   let stack=[];
   let map=new Map([['[',']'],['{','}','(',')']]);
   for(let i=0;i<arr.length;i++){

      if(map.has(arr[i])){
         stack.push(arr[i]);
      }else{
         let curr=stack.pop();
         if(map.get(curr)!==arr[i]){
               return false;
         }
      }
   }// end of for ;
   return stack.length===0;
}


// 算法 ：给定一个字符串'abca',返回第一个不重复的字母；

// map 统计；
function firstUniqueChar(str){
   let map=new Map();
   for(let i=0;i<str.length;i++){
      if(!map.has(str[i])){
         map.set(str[i],1);
      }else{
         map.set(str[i],map.get(str[i])+1);
      }
   }// end of for ;

   let result =-1;
   for(val of map.values()){
      if(map.get(val)===1){
         result=val
         return result;
      }
   }
   return result;
}

// 输入数字找到对应的字母；
function findLetterAccordingToNum(num){
   let str="";
   // 求余数决定最后一个字母；
   let remainder =num%26;

   let quatient =Math.floor(num/26); // 决定有多少个a；

   // 
   if(remainder===0){
      // 最后一位为z,quatient-1;remainder=26;
      remainder==26;
      quatient--;
   }
   while(quatient>=1){
      str+='a';
      quatient--;
   }//
   str+=String.fromCharCode(remainder+96) // z=>122  26+96    a=>97  1+26;
   return str;
}

// 算法   判断链表是否有环；

class Node{
   constructor(val,next){
      this.val=val;
      this.next=next;

   }

}

// 利用快慢指针，判断链表是否有环；
function hasLoop(node){
   if(!node||!node.next){
      return false;
   }
   let slow=node.next;
   let fast=node.next.next;
   while(slow!==fast){
      //快指针没有可以查询的节点，则说明没有环；
      if(!fast||!fast.next){
         return false;
      }
      slow=slow.next;
      fast=fast.next;
   }// end of while
   return true;
}

// 算法  冒泡排序、选择排序以及如何优化；
 function bubbleSort(arr){
   let len=arr.length;
   let low=0;
   let high=len-1;
   while(low<high){
      for(let i=low;i<high;i++){  // 选出最大值；
         if(arr[i]>arr[i+1]){
            temp=arr[i]
            arr[i]=arr[i+1]
            arr[i+1]=temp
         }
      }
      --high;
      for(let j=high;j>low;j--){  // 选出最小值；
         if(arr[i]<arr[i-1]){
            temp=arr[i];
            arr[i]=arr[i-1];
            arr[i-1]=tmp
         }
      }
      ++low;
   }
 }


 // 选择排序 ；每次遍历都进行选择一个最小值；
 function selectSort(arr){
   let len=arr.length;
   let minIndex;
   for(let i=0;i<len-1;i++){
      minIndex=i;
      for(let j=i+1;j<len;j++){
         if(arr[j]<arr[minIndex]){
            minIndex=j;
         }
      }//
      // 交换顺序；
      [arr[minIndex],arr[i]]=[arr[i],arr[minIndex]]
   }
   return arr;
 }

 // 给定一个整数数组nums,找到一个具有最大和的连续子数组；
 function maxSubArray(nums){
   let max=nums[0],len=nums.length;
   for(let i=1;i<len;i++){
      // 如果前一个数大于等于0；则相加一定大于当前数；
      if(nums[i-1]>=0){
         nums[i]+=nums[i-1]
      }
      if(nums[i]>max){
         max=nums[i]
      }//
   }
   return max;
 }


 // 算法  求二叉树的最大深度； dfs 递归计算二叉树深度；
 
 function maxDepth(root){
   if(!root){
      return 0;
   }
   const left =maxDepth(root.left);
   const right=maxDepth(root.right);
   return Math.max(left,right)+1;
 }


 // 算法； 求字符串中出现最多的字符；

 function maxChar(str){
   let map=new Map();
   for(let i=0;i<str.length;i++){
      if(map.has(str.charAt(i))){
         map.set(str.charAt(i),map.get(str.charAt(i))+1);
      }else{
         map.set(str.charAt(i),1);
      }
   }
 }  //  然后遍历map 统计次数；

 // 排序；
 function quickSort(arr){
   if(arr.length<=1){
      return arr;
   }
   let midIndex=Math.floor(arr.length/2);
   let midVal=arr.splice(midIndex,1);
   let left=[];
   let right=[];
   for(let i=0;i<arr.length;i++){
      if(arr[i]<midVal){
         left.push(arr[i]);
      }else{
         right.push(arr[i]);
      }
   }// end of 
   return [...quickSort(left),midVal,...quickSort(right)]
 } // 


 function bubbleSort(arr){
   let low=0;
   let high=arr.length;
   while(low<high){
      for(let i=low;i<high;++i){
         if(arr[i]>arr[i+1]){
            [arr[i],arr[i+1]]=[arr[i+1],arr[i]]
         }
      }// end of 
      --high;
      for(let j=high;j>low;++j){
         if(arr[j]<arr[j-1]){
            [arr[j-1],arr[j]]=[arr[j],arr[j-1]]
         }
      }
      ++low;

   }
 }

 // 算法 ； 找前k个最大元素；
 // 冒泡半排；

function findK(arr,k){
   //冒泡k；
   for(let i=0;i<k;i++){
      for(j=0;j<arr.length-1-i;j++){
         if(arr[i]>arr[i+1]){
            [arr[i+1],arr[i]]=[arr[i],arr[i+1]]
         }
      }
   }// k；
   return arr[arr.length-k]
}

// 算法 给定一个大小为n的数组、知道其中的众数；

function mostElement(arr){
   const map={};
   for(let val of arr){
      map[val]=(map[val]||0)+1
      if(map[val]>arr.length/2){
         return val;
      }
   }
}


// 10-100 之间的不重复数字；
function randomArr(n){
   let set=new Set();
   const getRandom=(first,end)=>{
      return Math.floor(Math.random()*(end-first+1)+first);
   }
   while(set.size()<n){
      set.add(getRandom(10,100));
   }
   let arr=[...set]
   arr.sort((a,b)=>{
      return a-b
   });
   return arr;
}

// n&(n-1) 一个数字n二进制中1的个数有多少
function hamingWeight(n){
   let count=0;
   while(n!==0){
      count++;
      n=n&(n-1)
   }// 
   return count
}

// 求两个数组的交集；
function intersection(a,b){
   let newA=new Set(a);
   let newB=new Set(b);
   return new Set([...newA].filter((x)=>{
      return newB.has(x);
   }))
}

// 差值排序；
function nearbySort(arr){
   arr.sort((a,b)=>{
      return Math.abs(a-n)-Math.abs(b-n);
   });
   
}


// 算法 最长不含重复字符的子字符串
function lengthOfLongestSubstring (s){
 let len=s.length,arr=[],max=0;
 for(let i=0;i<len;i++){
   let index=arr.indexOf(s[i]);
   if(index!==-1){ 
      // 删除重复字符字段；
      arr.splice(0,index+1);
   }
   arr.push(s[i]);
   max=Math.max(max,arr.length);
 }
  return max;
}


/**
 * 
写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项（即 F(N)）。斐波那契数列的定义如下：

F(0) = 0,   F(1) = 1
F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
 * 
 * 
*/

var fib = function(n) {
   let n1 = 0, n2 = 1, sum;
   for(let i = 0; i < n; i++){
       sum = (n1 + n2) % 1000000007;
       n1 = n2;
       n2 = sum;
   }
   return n1;
};


function fib(n){
   let dp=new Array(n+1).fill(0)
   dp[0]=0;dp[1]=1;
   for(let i=2;i<=n;i++){
      dp[i]=(dp[i-1]+dp[i-2]) % 1000000007
   }
   return dp[n]
}


// 合并两个有序数组为一维有序数组；归并排序思想；

function mergeSort(arr){
   // 
   let len=arr.length;
   if(len<=1){
      return arr[0];
   }
   let mid=Math.floor(len/2);
   //递归分割；合并为有序数组；
   let left=mergeSort(arr.slice(0,mid));
   let right=mergeSort(arr.slice(mid));
   // 将两个有序数组合并；
   let arr=mergeArr(left,right);
   return arr;
}
// 合并两个有序数组，归并排序；
function mergeArr(left,right){
   let i=0,j=0;
   let result=[];
   const len1=left.length;
   const len2=right.length;
   while(i<len1&&j<len2){
      if(left[i]<right[j]){
         result.push(left[i]);
         i++
      }else{
         result.push(right[j]);
         j++
      }
   }// end of while 
   if(i<len1){
      result.concat(left.slice(i));
   }else{
      result.concat(right.slice(j))
   }
   return result;
}



// n数之和；从给定无序、不重复的数组data中取出n个数字，使其和为sum;
function nSum(arr,n,sum,temp){
  // 动态规划实现,
}

// 从给定的无序、不重复的数组data中，取出n个数，使其相加和为sum.
function getResult(data,n,sum){
   if(n==0&&sum==0){
      return true;
   }
   if(n<0){
      return false;
   }
   if(n>0){
      for(let i=0;i<data.length;i++){
         let temp=data.slice(i+1,data,length);
         return getResult(temp,n-1,sum-data[i])||getResult(temp,n,sum);
      }
   }
}
//从给定的无序、不重复的数组data中，取出n个数，使其相加和为sum.
function find(arr,n,sum){
   let res=[];
   findGroup(arr,n,sum,[])
   function findGroup(arr,n,sum,oneRes){
      if(n>arr.length){
         return false;
      }
      if(n==0&&sum==0){
         res.push(oneRes);
         return true;
      }else if(n<0){
         return false;
      }
      if(n>0){
         let temp=arr.slice(1,arr.length);
         // 满足的情况下；
         findGroup(temp,n-1,sum-arr[0],[...oneRes,arr[0]])
         // 不满足的情况下：
         findGroup(temp,n,sum,[...oneRes]);
      }
   }
   return res;
}
// 数组中找出和为sum的n个数；
function find(arr, n, sum) {
   let res = []
   findGroup(arr, n, sum, [])
   function findGroup(arr, n, sum, oneRes) {
       if (n > arr.length) return false
       if (sum == 0 && n == 0) {
           res.push(oneRes)
           return true;
       } else if (n <= 0) {
           return false;
       }
       if (n > 0) {
           let temp = arr.slice(1, arr.length)
           // 满足条件
           findGroup(temp, n - 1, sum - arr[0], [...oneRes,arr[0]])
           // 不满足条件
           findGroup(temp, n, sum, [...oneRes])
       }
   }
   return res
}
// 

// 连续子数组和最大值；前一个数大于等于0，则相加一定大于等于当前数；
function maxSubArray(arr){
   let max=arr[0];
   for(let i=1;i<arr.length;i++){
      // 前一个数大于等于0，则相加一定大于等于当前数；
      if(nums[i-1]>=0){
         nums[i]+=nums[i-1]
      }
      if(nums[i]>max){
         max=nums[i]
      }
   }// end of for;
   return max;
}

// 求[[A,B],[a,b],[1,2]]的全排列；
/**
      [A,B]

  [a,b]  [1,2]
**/
function full(list){
   let res=[];
   let len=list.length;
   dfs(0,[]);
   return res;
   function dfs(index,arr){
      if(index===len){
         res.push(arr.join(''));
         return ;
      }
      for(let i=0;i<list[index].length;i++){
         arr.push(list[index][i]);
         dfs(index+1,arr)
         arr.pop();
      }
   }
}

// 如何判断获取相交链表的第一个相交点；

function List(x){
   this.val=x;
   this.next=null;
}
function findFirstCommonNode(headA,headB){
   let h1=headA;
   let h2=headB;
   while(h1!==h2){
      h1=h1===null?headB:h1=h1.next;// h1结束，接入对方链表；
      h2=h2===null?headA:h2=h2.next;// h2 结束，接入对方链表；
   }
   return h1;
}

// 算法 实现一个函数findLastIndex();返回指定数在有序数组中最后一次出现的位置的索引；

// 二分查找  有序数组中查找元素，一般使用二分查找；时间复杂度logn;
const findLastIndex=(nums,target)=>{
   const len=nums.length;
   if(len<1){
      return -1;
   }
   let left=0,right=len;
   while(left<rigth){
      const mid=(left+right)>>1;
      target<nums[mid]?(right=mid):(left=mid+1)
   }// end of while
   return  left-1;
}
//  时间复杂度O(logn)

// 时间复杂度O(n),从长度为n的数组中找出同时满足两个条件的所有元素；
// 钙元素比左边的所有元素都大，比右边素有元素都小；
function findPeak(arr){
   if(arr.length<1){
      return -1;
   }
   if(arr.length===1){
      return 0;
   }
   const max=[arr[0]]
   const min=[arr[arr.length-1]]
   // 找到比左边都大的；左右俩边第一个数据不满足条件；
   for(let i=1;i<arr.length-1;i++){
      if(arr[i]>max[max.length-1]){
         max.push(arr[i]);
      }
   }
   // 找出比arr[arr.length-1]小的；
   for(let i=arr.length-2;i>=0;i--){
      if(arr[i]<min[0]){
         min.unshift(arr[i]);
      }
   }

   //找交集；核心思路是找出比最左边元素大的元素，比最右边元素小的元素；然后找交集；
   const res=max.filter((i)=>{
      return min.includes(i)
   })
   if(res.length<1){
      return -1
   }
   return res;

}

//  算法 ； 构造字典序尽可能小的字符串；从 s的 头部或者尾部删除字符，比较两个字典序大小，
const get_T=(s)=>{
   let t="";
   const sa=[...s]
   const rsa=sa.splice().reverse();
   for(let i=0;i<s.length;i++){
      if(sa.join("")<=rsa.join("")){
         t+=sa.shift();
         rsa.pop();
         continue;
      }// end of if
      t+=rsa.shift();
      sa.pop();
   }// end of for;

   return t;

}

// 没有怎么理解；

// 算法；输入一个正整数的数组，求出一个子数组，子数组中的元素能够被俩俩整除；si%sj==0;
// 排序 a<b<c ;c%b==0 b%a==0  c%a==0;

function getBiggestChildrenArray(arr){
   if(arr.length===0||!arr){
      return ;

   }
   arr=arr.sort((a,b)=>{
      return a-b;
   });
   let dep=new Array(arr.length);
   let path=new Array(arr.length);
   let ret=[];
   for(let i=0;i<arr.length;i++){
      dep[i]=1;
      path[i]=-1;
   }
   let ml=1;
   let end=0;
   for(let i=1;i<arr.length;i++){
      for(let j=0;j<i;j++){
         if(arr[i]%arr[j]==0&&dep[i]<dep[j]+1){
            // 叠加子树长度；
            dep[i]=dep[j]+1
            path[i]=j;
         }
      }
   }
   // 取最大深度；
   if(dep[i]>ml){
      ml=dep[i];
      end=i;
   }
   // 
   for(let i=end;i!=-1;i=path[i]){
      ret.push(arr[i]);
   }
   return ret.reverse();
}


// node模块机制是怎样的

// 实现add(1)(2)(3)
// 1、利用闭包  利用a=a+b;
function add(a){
   var num=function(b){
      a=a+b;
      return num
   }
   num.valueOf=num.toString=function(){
      return a;
   }
   return num;
}
//当引用类型需要转换为字符串时，自动调用tostring;
// 当引用类型需要转换为数字时，自动调用valueOf;

// promise 再次实现；

const PENDING='pending'
const FULLFILLED='fullfilled'
const REJECTED='rejected'

class myPromise{
   constructor(executor){
          // 执行器立即执行；
      executor(this.resolve,this.reject)
   }
   value=null;
   reason=null;
   status=PENDING;
   onFullfilledCallback=[];
   onRejectedCallback=[];

   resolve=(value)=>{
      // 
      if(this.status==PENDING){
         this.status=FULLFILLED;
         this.value=value;
         while(this.onFullfilledCallback.length>0){
            this.onFullfilledCallback.shift()(value);
         }
      }

   }

   reject=(reason)=>{
      if(this.status==PENDING){
         this.status=REJECTED;
         this.value=reason;
         while(this.onRejectedCallback.length>0){
            this.onRejectedCallback.shift()(value);
         }
      }
   }

   then(onFullfilled,onRejected){
    if(this.status==FULLFILLED){
      // 链式调用then;为了链式调用返回new  promise;
      const nextPromise=new myPromise((resolve,reject)=>{
         let x=onFullfilled(this.value);
             // 判断x的值类型，如果是普通类型直接返回，如果是promise类型，则返回then;
            resolvePromise(x,resolve,reject);

      });
      return nextPromise;
    } else if(this.status==REJECTED){
       onRejected(this.reason);
    } else{
      this.onFullfilledCallback.push(onFullfilled);
      this.onRejectedCallback.push(onRejected);
    }
   }
}

function resolvePromise(x,resolve,reject){
   if(x instanceof myPromise){
          // 如果x是一个 promise 对象；调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
         x.then(resolve,reject)
   }else{
      resolve(x);
   }
};


// css 选择器有哪些 
//  id 选择器 class 选择器  标签选择器；
// 优先级顺序为：内联样式> 内部样式 > 外部样式 > 浏览器用户
// 自定义样式 > 浏览器默认样式

// !important id  class tag 


// javascript 三种事件模型；
/**
 * 
 * 1、原始事件模型：通过元素属性来绑定事件；
 * 2、DOM2事件模型：新增事件冒泡和事件捕获阶段；、
 * capture bubble;
 * 通过addEventListener(ename,callback,flag)
 * 3、IE事件模型：
 * 只支持冒泡，
 * 
 * 
 * **/

// 三次握手


// 判断链表是否有环；
// 可以使用快慢指针的方式；


function hasLoop(root){

   if(!root||!root.next){
      return false;
   }
   let slow=root.next;
   let fast=root.next.next;
   // 通过迭代的方式来判断是否相遇；
   while(slow!==fast){
      // 快指针没有可查询的节点，则表示没有环；
      if(!fast||!fast.next){
         return false;
      }
      slow=slow.next;
      fast=fast.next;
   }
   // 否则快慢指针相遇代表有环；
   return true;

}


// react 如何处理异常：
// 1、getDerivedStateFromError；componentDidCatch(error, errorInfo) 
// try catch 
// window.addEventListener("error") 
// BFC  以及作用
// 通常利用以下特性 清除浮动和俩栏布局
// 计算BFC 高度，浮动元素参与计算；
// BFC 不与float box 重叠

//  float  position  display overflow形成条件

// 二分查找
function  searchNum(target,nums){
   if(!nums.length){
      return -1;
   }
   let left=0;
   let right=nums.length-1;
   let mid;
   while(left<=right){
      // 进行二分查找；移位运算除以二
       mid =left+((right-left)>>1)

       if(target===nums[mid]){
         return mid
       }
       if(nums[mid]<target){
         left =mid+1;
       }
       if(nums[mid]>target){
         right=mid-1;
       }
   }// end of 
   return -1;
}

// 算法 ：二分法求平方根

/**
 * @param {number} x
 * @return {number}
 */
 var mySqrt = function(x) {
   if(x<2){
       return x
   }
   let left=1,mid,right=Math.floor(x/2)
   while(left<=right){
       mid=Math.floor(left+(right-left)/2)
      if(mid*mid==x){
          return mid
      }
      if(mid*mid<x){
          left=mid+1
      }else{
          right=mid-1
      }
   }// end 
   return right
 };

 // bind的实现；
 function myBind(context,...args){
    if(typeof this !=='function'){
      throw TypeError('');
    }
   context=context||window;
    let fn=this;
    return function(...otherArgs){
      fn.apply(this,[...otherArgs,...args]);
    }
 }

 // call 的实现；核心思想是this指向的替换；
 function myCall(context,...args){
   if(typeof this!=='function'){
      throw TypeError('');
   }
   context=context||window
   let fn=new Symbol();
   context[fn]=this;
   let result=context[fn](...args)
   delete context[fn]
   return result;
 }



 // 手动实现一个发布订阅；
 class EventEmitter{
    constructor(){
       this.events={};
    }
    on(eventName,callback){
      if(this.events[eventName]=='undefined'){
         this.events[eventName]=[callback]
      }else{
         this.events[eventName].push(callback);
      }
    }
    emit(eventName){
      this.events[eventName]&&this.events[eventName].forEach((cb)=>{cb()})
    }
 }

 // new  操作符做了什么
 function myNew(){
   const Con=[].shift.apply(arguments);
   const obj=Object.create(Con.prototype);
   const res=Con.apply(obj,arguments)
   return res instanceof obj?res:obj
 }


 // 实现一个trim 方法；   爬楼梯方法；动态规划；
 function trim(s){
   return s.replace(/^(\s*)||(\s*)$/g,'');
 }


 // 合并两个有序数组为一维有序数组；归并排序思想；

function mergeSort(arr){
   // 
   let len=arr.length;
   if(len<=1){
      return arr[0];
   }
   let mid=Math.floor(len/2);
   //递归分割；合并为有序数组；
   let left=mergeSort(arr.slice(0,mid));
   let right=mergeSort(arr.slice(mid));
   // 将两个有序数组合并；
   let arr=mergeArr(left,right);
   return arr;
}
// 合并两个有序数组，归并排序；
function mergeArr(left,right){
   let i=0,j=0;
   let result=[];
   const len1=left.length;
   const len2=right.length;
   while(i<len1&&j<len2){
      if(left[i]<right[j]){
         result.push(left[i]);
         i++
      }else{
         result.push(right[j]);
         j++
      }
   }// end of while 
   if(i<len1){
      result.concat(left.slice(i));
   }else{
      result.concat(right.slice(j))
   }
   return result;
}
