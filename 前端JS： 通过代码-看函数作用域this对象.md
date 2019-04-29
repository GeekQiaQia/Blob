**函数中的this对象，指向的是调用该函数的对象；谁调用它，它的作用域中的this就指向谁；**

每一个具体的问题，都值得思考这个细节点：
1.以下输出结果是：

    var obj={
         name:'test',
         output:function(){
             console.log("1");
         }
     }
     console.log(obj.output());
     var outputFunc=obj.output;
         outputFunc();
         
console:  1 1 

2.以下输出结果是：

        obj={
             name:'test',
             output:function(){
                return this.name;
             }
         }
         console.log(obj.output());
         var outputFunc=obj.output;
             outputFunc();
             
console: test, ""

![](https://user-gold-cdn.xitu.io/2019/4/27/16a5d1d24a02367a?w=477&h=300&f=png&s=22784)

3.以下输出结果是：

     obj={
            count:1,
            output:function(){ 
                console.log(this);
                return this.count;
            }
        }
        console.log(obj.output());
        var outputFunc=obj.output;
        outputFunc();


![](https://user-gold-cdn.xitu.io/2019/4/27/16a5d232eb2292e9?w=491&h=355&f=png&s=23778)
   
4.请判断以下打印输出结果是什么？

      function a(){
         function b(){
         console.log(this);
            }
         console.log(this);
             b();
        }
        a();
         console.log(a);
         console.log(b);
         
    分析：
    - 首先function 关键字申明定义一个函数a;在函数a中申明定义一个函数b();并且在函数a()；中执行b();
    - 还是牢记一点，对于函数中的this对象，谁调用该函数，函数中的this对象就指向谁；所以当在浏览器console中执行以上代码时，a()默认是window对象调用；即：可以理解为window.a();
    -根据以上，第五行中的console.log(this);打印结果应该是window对象；javascript语言是单线程执行；紧接着执行同步代码b();相当于是执行了a()函数作用域中的this.b();所以第三行中的console.log(this);打印结果应该也是window对象；
    - 第九行console.log(a);相当于执行了console.log(window.a); function 关键字申明定义了一个函数a;所以打印结果应该为一个函数对象：f a(){
         function b(){
         console.log(this);
            }
         console.log(this);
             b();
        }
     - 第十行：console.log(b);相当于执行了console.log(window.b);由于在window对象中没有申明定义b;所以应该打印结果为 b is not defined ;
     
  console结果如下：
     
![](https://user-gold-cdn.xitu.io/2019/4/29/16a6988cf77ad1f6?w=493&h=401&f=png&s=29803)
     
