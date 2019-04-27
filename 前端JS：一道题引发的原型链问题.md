javascript语言 是基于原型实现继承的，说起原型链，每个人都有一定程度的认识和理解；可每一个具体的问题，都值得以原型链的方式思考和分析才能得到正确的结果：

**实例对象=>构造函数=>原型对象**

请输出一下打印结果：

    function fun(){
            this.a=0;
            this.b=function(){
                console.log(this.a);
            }
        }
        fun.prototype={
            b:function(){
                
                this.a=20;
                console.log(this.a);
            },
            c:function(){
                
                this.a=30;
                console.log(this.a);
            }
        }
        var myFun=new fun();
        myFun.b();
        myFun.c();
## 分析
 - 当执行**实例对象**的b()的时候，实例对象查找自身是否有b()函数；由于实例对象myFun，继承了**构造函数fun()** 的属性和方法；所以执行myFun.b();输出结果为0；
 - 当执行**实例对象**的c()的时候，实例对象同样先查找自身是否有c()函数，显然没有，此时实例对象通过原型链向上一层查找即：构造函数的原型对象，在原型对象中包含方法：c();此时，原型对象中方法c()的this对象指向实例对象即fun(){a:0,b:f}，
 **（函数中的this对象，谁调用该函数指向谁)** 在c()函数中，对实例对象的a:0重新赋值为a:30;
所以执行myFun.c();输出结果为30；
    
![](https://user-gold-cdn.xitu.io/2019/4/27/16a5de3794523e5d?w=484&h=515&f=png&s=34304)
注意：当使用console.log();debug结果的时候，看到的结果是异步的哦；
![](https://user-gold-cdn.xitu.io/2019/4/27/16a5e072e072f233?w=495&h=577&f=png&s=41337)