# call()/apply()改变调用函数的作用域中的this指向

**talk is cheap ,show me the code**:

	第一个参数为this,第二个参数为传输的值，例如

	var a ="windowA";
    var b = "windowB";
    var str = "world";
    var myObject = {a:"myA",b:"myB"};

    function hello(s){

        alert("a= "+this.a + ", b= "+this.b+" "+s);

    }

    //hello 中的this 指向window;
    hello.call(null,str);//a ="windowA" b = "windowB" world

    // hello 中的this.指向myObject；
    hello.call(myObject,str);//a="myA" b="myB" world


**如果第一个参数为null,则this指向window(在node环境中则指向global)**

hello.call(null)//this 指向window

hello.call(window)//this同样指向window

[参考:](https://www.cnblogs.com/lijinwen/p/5769410.html)