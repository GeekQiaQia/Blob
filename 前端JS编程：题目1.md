请编写一段代码，实现如下需求:输入参数为数字n；输出为这个数字的所有各个位数加起来的和m,如果m不是个位数，继续对m的各个位数进行相加，直到最后为个位数；
比如input：38； 3+8=11; 1+1=2;output:2;

个人解法：
    
    function turnSingle(num){
        let tempNum=num+"",
            len=tempNum.length;
         if(num<10){
    
             return num;
         }
    
        let count=0;
        for(let i=0;i<len;i++){
    
          count+=parseInt(tempNum[i])
    
        }//得到一次相加的结果；
        if(count<10){
    
            return count
    
        }
    
        turnSingle(count)
    }
    
    欢迎奉献上你们的代码；