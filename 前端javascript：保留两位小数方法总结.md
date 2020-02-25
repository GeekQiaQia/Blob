## js保留两位小数方法总结
* 非四舍五入

    ### 使用[math.floor](https://www.w3school.com.cn/jsref/jsref_floor.asp)
        
![](https://user-gold-cdn.xitu.io/2020/2/22/1706d02cfff8e210?w=1696&h=1024&f=png&s=128158)
        
        输入
        Math.floor(3.1465926 * 100) / 100 
        
        输出
        3.14


    
* 四舍五入
    
    ### 使用[NumberObject.toFixed(num)](https://www.w3school.com.cn/jsref/jsref_tofixed.asp)
    
![](https://user-gold-cdn.xitu.io/2020/2/22/1706cfcd99e7adcb?w=1684&h=1318&f=png&s=254686)
        
        输入
        let num=3.1465926
        num = num.toFixed(2); 
        
        输出
        3.15
### 使用[math.round](https://www.w3school.com.cn/jsref/jsref_round.asp)
    
![](https://user-gold-cdn.xitu.io/2020/2/22/1706d1ba922e8284?w=1690&h=1174&f=png&s=134146)

     function returnFloat(value){
     // 先转换成浮点数然后*100，round()取整，最后除以100保留小数位；
         var value=Math.round(parseFloat(value)*100)/100;
         var xsd=value.toString().split(".");
         if(xsd.length==1){
         value=value.toString()+".00";
         return value;
         }
         if(xsd.length>1){
         if(xsd[1].length<2){
         value=value.toString()+"0";
         }
         return value;
         }
    }
 
         输入
        returnFloat(3.1455926);
        returnFloat(2);
        输出
            3.15
            2.00

    