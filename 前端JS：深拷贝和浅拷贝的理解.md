#追根溯源

## javascript 数据类型：

- 值类型（基本数据类型）：String,Number,Boolean,Null,Undefined,Symbol
- 引用数据类型数据
- Object,Array,Function
	
   **重点声明**：Undefined 和 Null的区别；

- Undefined 表示变量不含有值；
- null：可以通过将变量的值设置为null来清空变量；
	
		{
			var person,
				car="moto";
			 console.log(person);//undefined;
			 console.log(car); // moto;
  			   car=null;
			 console.log(car); // null		
		}

## 堆stack 和  栈heap 

什么是堆内存&&什么是栈内存？

- stack：为自动分配的内存空间，它由系统自动释放；
- heap：为动态分配的内存空间，它大小不一定，也不会自动释放；

## 值 && 引用

- 值数据类型的**变量和值**都存放在栈内存中，在变量申明之后，会动态分配一块内存区域，基本数据类型之间的赋值：是直接把栈内存中存的值，传值给变量；（传值）
- 引用类型的变量存在栈内存中，但是值存在堆内存中；实际上栈存放的是，指向堆中的地址，即“引用”。引用类型直接的赋值，实质上是把“引用”赋值给一个变量(传址)，所以其指向的堆内存中的值是一样的；

## 深拷贝和浅拷贝

- 使用场景：
	- 深拷贝：在复杂对象里，对象的属性也是对象的时候；	
	- 浅拷贝：只复制一层对象，当对象的属性是引用类型时，实质上复制的是其引用，当引用指向的值发生变化的时候，原对象属性值也跟着变化；
	
### 浅拷贝
将原对象/原数组的引用,直接赋给新对象/新数组，新对象／数组只是原对象的一个引用,
	**Just show the code :**
		

		举例1：
			let obj={a:1,arr:[2,3]};	

			let shallowObj=shallowCopy(obj);
			
			function shallowCopy(srcObj){
				var dest={};
				for(let prop in srcObj){
						console.log(prop);
					if(srcObj.hasOwnProperty(prop)){
						dest[prop]=srcObj[prop]
						

						}
	
					}// end of loop
					
					return dest;
				} 
			
	// 1.举例： 当一个对象属性的引用值改变时，会导致另一个也改变；
		
		shallowObj.arr[1]=5;
		console.log(obj.arr[1]); // 5
		
    // 2.举例：console：

		let obj2=obj;
			
			obj2
			{a: 1, arr: Array(2)}
			obj2.arr
			(2) [2, 3]
			obj2.arr[1]=4
			4
			obj2.arr
			(2) [2, 4]
			obj.arr
			(2) [2, 4]


		
### 深拷贝:
是指,建一个新的对象和数组，将原对象的各项属性的“值”（数组的所有元素）拷贝过来，是“值”而不是“引用”
**我们希望在改变新的数组（对象）的时候，不改变原数组（对象）**

### 1.只对第一层级深拷贝

**1.直接遍历：**

	var array = [1, 2, 3, 4];
	function copy (array) {
	   let newArray = []
	   for(let item of array) {
	      newArray.push(item);
	   }
	   return  newArray;
	}
	var copyArray = copy(array);
	copyArray[0] = 100;
	console.log(array); // [1, 2, 3, 4]
	console.log(copyArray); // [100, 2, 3, 4]

**2.slice();
arrObj.slice(start,end);**

slice() 方法返回一个从已有的数组中截取一部分元素片段组成的新数组
	
	var array = [1, 2, 3, 4];
	var copyArray = array.slice();
	copyArray[0] = 100;
	console.log(array); // [1, 2, 3, 4]
	console.log(copyArray); // [100, 2, 3, 4]


**3.concat();arrObj.concat(arr1,arr2...);**

	var array = [1, 2, 3, 4];
	var copyArray = array.concat();
	copyArray[0] = 100;
	console.log(array); // [1, 2, 3, 4]

因为我们上面调用concat的时候没有带上参数，所以var copyArray = array.concat();实际上相当于var copyArray = array.concat([]);

也即把返回数组和一个空数组合并后返回

**4.ES6的Object.assign();**

Object.assign：用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target），并返回合并后的target
 Object.assign(target, source1, source2)；

		var obj = {
		  name: '彭湖湾',
		  job: '学生'
		}
		var copyObj = Object.assign({}, obj);
		copyObj.name = '我才不叫彭湖湾呢！ 哼  (。・`ω´・)';
		console.log(obj);   // {name: "彭湖湾", job: "学生"}
		console.log(copyObj);  // {name: "我才不叫彭湖湾呢！ 哼  (。・`ω´・)", job: "学生"}
 		
所以copyObj=Object.asssign({},obj);是将代码中obj的一级属性,拷贝到{}中，然后将其返回给copyObj;

**5 ES6扩展运算符：**

扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中	
		var copyObj=[...arr]
		function copy(obj){
			if(typeof obj !==="object"){
					return ;
			}

			let newObj= obj.constructor===Array?[]:{};

			if(newObj instanceof Array){
				 newObj=[...obj];
				return	newObj;
			}else if(newObj instanceof Object){
				newObj={...obj};	
				return newObj;
			} 

			}

### 多次级深拷贝；

**1.递归方式实现深拷贝**
     
		function deepCopy(obj){
	
			if(obj instanceof Array){
			let n=[];
			for(let i=0;i<obj.length;i++){
			
				n[i]=deepCopy(obj[i]);
				
				}// end of for
				return n;
			}// end of if ;
			if(obj instanceof Object){
			let n={};
				for(let i in obj){
			      n[i]=deepCopy(obj[i]);
				
				}// end of for
			 return n;	
			} else { //// end of if 
			
			 return obj;
		
			}
		}

**2.JSON.parse(JSON.stringify(strObj));**
		
		var arrObj=[
			{num:1},
			{num:2},
			{num:3}
		];
		var copyArray=JSON.parse(JSON.stringify(arrObj));
		
		copyArray[2].num=4;

        console.log(arrObj); // [{num:1},{num:2},{num:3}];
		console.log(copyArray); // [{num:1},{num:2{num:4}];

**3.递归2：**
	
		function copy(obj){
			let newObj=obj.constructor===Array?[]:{};
			if(type of obj !="object"){
				return;
			}
            for(let i in obj){
			newObj[i]= typeof obj[i]==="object"?copy(obj[i]):obj[i]
			
			}
			return newObj;
		}


