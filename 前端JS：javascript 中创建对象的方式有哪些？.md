javascript 是一种基于原型继承的语言：
欢迎留言补充；
- 通过字面量方式创建：

        var person = {
              isHuman: false,
              printIntroduction: function () {
                console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
              }
            };
            
            

    
- Object.create():

ES5:Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 

    const person = {
      isHuman: false,
      printIntroduction: function () {
        console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
      }
    };
    
    const me = Object.create(person);
    
    me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
    me.isHuman = true; // inherited properties can be overwritten
    
    me.printIntroduction();
    
- 通过构造函数创建一个对象：

         var obj = new 函数名(); 
         
    这与通过类创建对象有本质的区别。通过该方法创建对象时，会自动执行该函数;
   
   
		const Person = {
	      isHuman: false,
	      printIntroduction: function () {
	        console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
	      }
	    };
                        


    var person =new Person();
    person.printIntroduction();
    以上会打印两次；原因在于创建对象时，自动执行了函数；
    
- 通过Object 构造器new 一个对象；
    
        var obj=new Object();

- 通过类去创建一个对象：

         class Person{
             constructor(age,sex){
                 this.age=age;
                 this.sex=sex;
             }
             walk(){
                 console.log("walk out");
             }
         }
    
        var person=new Person(10,male);
    


