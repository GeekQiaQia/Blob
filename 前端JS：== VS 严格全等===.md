
1.==   用于比较、判断两者相等，比较时可自动换数据类型
 
2.===  用于（严格）比较、判断两者（严格）相等，不会进行自动转换，要求进行比较的操作数必须类型一致，不一致时返回flase。
在项目中遇到写js校验规则函数validator:

    let value=0;
    function checkValid(value){
        console.log(value==""); // true;
        if(value==""||value==null){ // true;
        console.log("into the if false");
            return false;
        }
        console.log("the value :true");
        return true;
    }

此时应该写为全等===；

    function checkValid(value){
        console.log(value===""||value===null); // false;
        if(value===""||value===null){ // false;
        console.log("into the if false");
            return false;
        }
        console.log("the value :true");
        return true;
    }

总结：
如果项目中使用typescript那就verygood啦:

#写代码还是得严格一点啊,不然就是写bug#;