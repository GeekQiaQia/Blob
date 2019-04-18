1. 利用splice(index,howmany,item...);
 ** 定义和用法**
    - splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。

    - 注释：该方法会改变原始数组。

    
    语法
        arrayObject.splice(index,howmany,item1,.....,itemX)


          参数	描述
        index	必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
        howmany	必需。要删除的项目数量。如果设置为 0，则不会删除项目。
        item1, ..., itemX	可选。向数组添加的新项目。
        
        返回值
        类型	描述
        Array	包含被删除项目的新数组，如果有的话。
        说明
        splice() 方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。
        
        如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。
        
        let arrObj=[1,2,3,4,5,6],
            len=arrObj.length;
        
        let newArrObj=arrObj.splice(0,len); 
        console.log(newArrObj);// [1,2,3,4,5,6]
        console.log(arrObj): //[]
   
2. 给数组长度赋值为0;

        let arrObj=[1,2.3,4,5,6];
        arrObj.length=0;
        console.log(arrObj);//[]
        
3. 给数组变量重新赋值-相当Array 属于引用类型数据，于重定向到空数组；
        
        let arrObj=[1,2,3,4,5,6];
        arrObj=[];
        console.log(arrObj);