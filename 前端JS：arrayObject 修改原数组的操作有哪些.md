#数组元素的操作：

## 修改原数组操作：


### 数组开头增加/删除元素：

- unshift()  在数组的第一项前面添加一个或多个元素，返回新数组的长度

 语法：

	arrayObj.unshift(item1,item2...); //item1 必输


 code:

    <script type="text/javascript">
    
    var arr = new Array()
    arr[0] = "George"
    arr[1] = "John"
    arr[2] = "Thomas"
    
    document.write(arr + "<br />")
    document.write(arr.unshift("William") + "<br />")
    document.write(arr)
    
    </script>
    输出：
	George,John,Thomas
	4
	William,George,John,Thomas

- shift()  ：用于把数组的第一个元素从其中删除，并返回原来数组的第一个元素。

语法：

    arrayObj.shift();

**tips:**如果数组是空的，那么 shift() 方法将不进行任何操作，返回 undefined 值


code:

    <script type="text/javascript">
    
    var arr = new Array(3)
    arr[0] = "George"
    arr[1] = "John"
    arr[2] = "Thomas"
    
    document.write(arr + "<br />")
    document.write(arr.shift() + "<br />")
    document.write(arr)
    
    </script>

	输出：
	George,John,Thomas
	George
	John,Thomas

###数组末尾增加删除元素：

- push()   在数组的末尾添加一个或多个元素 返回数组新长度

语法:

	arrayObj.push(item1,item2....); // item1 必需；

code:

	<script type="text/javascript">
	
	var arr = new Array(3)
	arr[0] = "George"
	arr[1] = "John"
	arr[2] = "Thomas"
	
	document.write(arr + "<br />")
	document.write(arr.push("James") + "<br />")
	document.write(arr)
	
	</script>
	输出：
	George,John,Thomas
	4
	George,John,Thomas,James

- pop()  删除并返回数组的最后一个元素。

**语法：**
	
	arrayObj.pop();

**tips:** 如果数组已经为空，则 pop() 不改变数组，并返回 undefined 值。

code:

	<script type="text/javascript">
	
	var arr = new Array(3)
	arr[0] = "George"
	arr[1] = "John"
	arr[2] = "Thomas"
	
	document.write(arr)
	
	document.write("<br />")
	
	document.write(arr.pop())
	
	document.write("<br />")
	
	document.write(arr)

	</script>
	输出：
	George,John,Thomas
	Thomas
	George,John

### 数组中间元素或者任意位置的增加删除操作：
语法：

    arrayObject.splice(index,howmany,items....);返回删除数组元素；

code:

	<script type="text/javascript">
	
	var arr = new Array(6)
	arr[0] = "George"
	arr[1] = "John"
	arr[2] = "Thomas"
	arr[3] = "James"
	arr[4] = "Adrew"
	arr[5] = "Martin"
	
	document.write(arr + "<br />")
	arr.splice(2,0,"William")
	document.write(arr + "<br />")
	
	</script>
	输出：
	George,John,Thomas,James,Adrew,Martin
	George,John,William,Thomas,James,Adrew,Martin



code2:在本例中我们将删除从 index 2 ("Thomas") 开始的三个元素，并添加一个新元素 ("William") 来替代被删除的元素：

	<script type="text/javascript">
	
	var arr = new Array(6)
	arr[0] = "George"
	arr[1] = "John"
	arr[2] = "Thomas"
	arr[3] = "James"
	arr[4] = "Adrew"
	arr[5] = "Martin"
	
	document.write(arr + "<br />")
	arr.splice(2,3,"William")
	document.write(arr)
	
	</script>

    输出：
	George,John,Thomas,James,Adrew,Martin
	George,John,William,Martin


##数组增加删除元素总结：

- 数组的增加元素的操作unshift(item...),push(item)都将返回新数组的长度；
- 数组的删除元素的操作shift()，pop(),splice(index,howmany,item...)都将返回删除的元素；
- unshift()/shift() vs  push()/pop()分别对应着对数组首尾元素的操作；
- splice(index,howmany,item...),对任意位置的数组元素进行增删操作；


##易混淆操作：splice(); substr(); substring();

- slice(start,end)

    	arrayObject.slice(start,end) 返回切到的新子数组；

	**tips:**该方法并不会修改数组，而是返回一个子数组。
code:

    <script type="text/javascript">
    
    var arr = new Array(3)
    arr[0] = "George"
    arr[1] = "John"
    arr[2] = "Thomas"
    
    document.write(arr + "<br />")
    document.write(arr.slice(1) + "<br />")
    document.write(arr)
    
    </script>
	George,John,Thomas
	John,Thomas
	George,John,Thomas

- substring(start,end)

    	stringObj.substring(start,end);用于提取介于两个下标之间的字符；返回一个新的字符串；

	**tips:**如果参数 start 与 stop 相等，那么该方法返回的就是一个空串（即长度为 0 的字符串）

code:

	<script type="text/javascript">
	
	var str="Hello world!"
	document.write(str.substring(3))
	
	</script>
    输出：
	lo world!


- substr(start,len);

	stringObj.substr(start,len);抽取从 start 下标开始的指定数目的字符。

	start:必需。要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。


code:

	<script type="text/javascript">
	
	var str="Hello world!"
	document.write(str.substr(3,7))
	
	</script>
    输出：
	lo worl


[参考](W3C：http://www.w3school.com.cn/jsref/jsref_splice.asp)
