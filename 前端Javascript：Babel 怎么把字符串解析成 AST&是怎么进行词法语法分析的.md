## 什么是Babel
* 什么是Babel?


    * Babel 是我们知道的将 ES6、ES7等代码转译为 ES5 代码且能安全稳定运行最好的工具
    * 同时它允许开发者开发插件，   能够在编译时期转换 JavaScript 的结构。
   ###  Babel概述：
* 我们需要知道3个Babel处理流程中的重要工具；
    * 解析
        * [Babylon](https://github.com/babel/babylon)是一个解析器，它可以将javascript字符串，转化为更加友好的表现形式，称之为抽象语法树；
        * 在解析过程中有两个阶段：**词法分析**和**语法分析**，
            * 词法分析阶段：字符串形式的代码转换为令牌（tokens）流,令牌类似于AST中的节点；
            * 语法分析阶段：把一个令牌流转化为AST的形式，同时这个阶段会把令牌中的信息转化为AST的表述结构
    * 转换
        * [babel-traverse](https://www.npmjs.com/package/babel-generator) 模块允许你浏览、分析和修改抽象语法树（AST Abstract Syntax Tree）
            * Babel接收解析得到的AST并通过babel-traverse对其进行深度优先遍历，在此过程中对节点进行添加、更新及移除操作。
    * 生成
        * [babel-generator](https://www.npmjs.com/package/babel-generator) 模块用来将转换后的抽象语法树（AST Abstract Syntax Tree）转化为Javascript 字符串
            * 将经过转换的AST通过babel-generator再转换为js代码，过程及时深度遍历整个AST,然后构建转换后的代码字符串。
    
### Babel 中重要的对象Vistor
    babel在处理一个节点时，是以访问者的形式获取节点的信息，并进行相关的操作，这种操作是通过visitor对象实现的。
    
#### 在visitor中定义了处理不同节点的函数。


        visitor: {
            Program: {
                enter(path, state) {
                    console.log('start processing this module...');
                },
                exit(path, state) {
                    console.log('end processing this module!');
                }
            },
            ImportDeclaration:{
                enter(path, state) {
                    console.log('start processing ImportDeclaration...');
                    // do something
                },
                exit(path, state) {
                    console.log('end processing ImportDeclaration!');
                    // do something
                }
            }
        }


## 什么是AST

* 什么是AST?

    * AST (Abstract Syntax Tree)是抽象语法树英文的缩写，AST语法树每一层都拥有相同的结构，这样的每一层结构也被叫做节点（Node）。
    * AST 是源代码的抽象语法结构树状表现形式，Webpack、ESLint、JSX、TypeScript 的编译和模块化规则之间的转化都是通过 AST 来实现对代码的检查、分析以及编译等操作。
    * 一个 AST 可以由单一的节点或是成百上千个节点构成。 它们组合在一起可以描述用于静态分析的程序语法。
    
* Javascript 语法的AST（抽象语法树）
    * javascript 语句要想知道抽象语法树之后的代码是什么，里面的字段都代表什么含义以及遍历的规则，可以通过[javascript语法转换AST工具](https://esprima.org/demo/parse.html#)来实现javascript语法的在线转换；
    例如：

![](https://user-gold-cdn.xitu.io/2019/11/12/16e5e3a0bfe78f2b?w=917&h=685&f=png&s=59842)

* esprima、estraverse 和 escodegen 模块是操作 AST 的三个重要模块，也是实现 babel 的核心依赖。
* 例如：语法转换插件需要借助 babel-core 和 babel-types 两个模块,就是依赖 esprima、estraverse 和 escodegen

* ### 转换的抽象语法树：
    每一个含有type属性的对象，我们称之为节点，修改是指获取对应的类型并修改改节点的属性即可；

         {
        "type": "Program",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "answer"
                        },
                        "init": {
                            "type": "BinaryExpression",
                            "operator": "*",
                            "left": {
                                "type": "Literal",
                                "value": 6,
                                "raw": "6"
                            },
                            "right": {
                                "type": "Literal",
                                "value": 7,
                                "raw": "7"
                            }
                        }
                    }
                ],
                "kind": "var"
            }
        ],
        "sourceType": "script"
}

* ### estraverse 遍历和修改AST 
    * 查看遍历过程：
![](https://user-gold-cdn.xitu.io/2019/11/12/16e5e749f8ee25d7?w=976&h=496&f=png&s=40734)
    
            const esprima = require("esprima");
            const estraverse = require("estraverse");
            
            let code = "var answer=6 * 7";
            
            // 遍历语法树
            estraverse.traverse(esprima.parseScript(code), {
                enter(node) {
                    console.log("enter", node.type);
                },
                leave(node) {
                    console.log("leave", node.type);
                }
            });
    * 打印结果如下：
    
![](https://user-gold-cdn.xitu.io/2019/11/12/16e5e699ad9011af?w=839&h=463&f=png&s=35365)

    
* 以上代码通过estraverse模块的traverse方法，将esprima模块装换的AST进行了遍历。
* 通过打印type属性，可以知道深度遍历AST就是遍历每一层的type属性，所以遍历会分为两个阶段，进入阶段和离开阶段，在traverse方法中分别用参数enter和leave两个函数监听；

* ### escodegen 将 AST 转换成 JS

![](https://user-gold-cdn.xitu.io/2019/11/12/16e5e7ce70c05887?w=968&h=845&f=png&s=71706)

    const esprima = require("esprima");
    const estraverse = require("estraverse");
    const escodegen= require("escodegen");
    
    let code = "var answer=6 * 7";
    
    let tree=esprima.parseScript(code); // 生成语法树
    // 遍历语法树
    estraverse.traverse(tree, {
        enter(node) {
            console.log("enter", node.type);
            // 修改变量名
            if(node.type==='VariableDeclarator'){
                    node.id.name='result';
            }
        },
        leave(node) {
            console.log("leave", node.type);
        }
    });
    
    // 编译修改后的语法树；
    let compileTreeJS=escodegen.generate(tree);
    console.log(compileTreeJS);
    
* 打印结果如下 ：
* var result=6*7
![](https://user-gold-cdn.xitu.io/2019/11/12/16e5e7edeb0ab64e?w=773&h=443&f=png&s=31888)

通过工具了解抽象语法树在 JavaScript 中的体现以及在 NodeJS 中用于生成、遍历和修改 AST 抽象语法树的核心依赖；让我们有了更加深刻地认识；
    
