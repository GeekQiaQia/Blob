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
   


