前端面试题：

https://www.cnblogs.com/neusc/p/5765047.html

## javascript 实现继承的几种方式？

- 原型链继承：
- 构造继承：
- 实例继承：
- 拷贝继承：
- 组合继承：
- 寄生组合继承：

## call/apply 的作用与区别：
	
	call和apply 都是为了改变函数体内部this的指向，他们的第一个参数都是调用函数的对象；
 	- call()接收由若干个参数组成的参数列表；
	- apply()方法接收的是一个包含多个参数的数组；
    example:
	获取一组数字中的最大数；
		Math.max.call(null,4,6,7,8,9);
 	使用apply 获取一组数字中的最大值： 
		Math.max.apply(null,[4,6,7,8,9]);

## em 与remd的区别:
	rem：表示根节点（html标签）的字体大小的倍数；
	em: 作为font-size的单位的时候，表示相对于父元素的font-size值的倍数；
		作为其他属性的单位的时候，表示自身字体大小的倍数；

## localStorage && sessioinStorage的区别：
	- 使用localStorage 保存的数据，除非手动清除，否则会永久保存；
	- 使用sessionStorage 保存的数据，仅在当前的会话下有效，关闭页面或者浏览器将会被清除；

## javascript 中事件绑定的方式：
	DomObj.on('',function(){

	});

	DomObj.onclick=function(){
	
	}
	DomObj.addEventListener('click',function(){
	
	});
	
	DomObj.attachEvent('onclick',functin(){
	
	});

## 设计一个函数：判断一个数据的数据类型是不是数组；

	考察知识点：
-javascript 几种数据类型：
	
以下类型是按值访问的，可以操作保存在变量中的实际值；
	基本类型：string/number/boolean
    特殊类型：undefined/null
引用类型的值是保存在内存中的对象。
JavaScript不允许直接访问内存中的位置，即不能直接操作对象的内存空间。在操作对象时，实际上是在操作对象的引用而不是实际的对象。因此，引用类型的值是按引用访问的。    
    引用类型：

	
	function isArray(arr){
       
		if（arr instanceof Array）{
			do something;
		}
	}