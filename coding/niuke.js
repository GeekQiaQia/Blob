/**
 * 组成最大数
 * 标题：组成最大数 | 时间限制：1秒 | 内存限制：65536K | 语言限制：不限
 小组中每位都有一张卡片，卡片上是6位内的正整数，将卡片连起来可以组成多种数字，计算组成的最
大数字。
输入描述:
“,”号分割的多个正整数字符串，不需要考虑非数字异常情况，小组最多25个人
输出描述:
最大的数字字符串
示例1
输入
22,221
输出
22221
示例2
输入
4589,101,41425,9999
输出
9999458941425101
 * 
 * 
*/

//对数值数组进行原地排序

const input=readline();

function getMaxNum(input){
const nums=input.split(',').map(item=>Number(item).toString());
// 大于0则进行原地换序
function getLargeStr(a,b){
    return Number(b+a)-Number(a+b)
}
// array.sort()// compareFunction()

nums.sort(getLargeStr);
console.log(nums.join(""));
}

/**
 * 按身高和体重排队
标题：按身高和体重排队 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
 某学校举行运动会，学生们按编号(1、2、3…n)进行标识，现需要按照身高由低到高排列，对身高相同
的人，按体重由轻到重排列；对于身高体重都相同的人，维持原有的编号顺序关系。请输出排列后的学
生编号。
输入描述:
两个序列，每个序列由n个正整数组成（0 < n <= 100）。第一个序列中的数值代表身高，第二个序列中
的数值代表体重。
输出描述:
排列结果，每个数值都是原始序列中的学生编号，编号从1开始
示例1
输入
4
100 100 120 130
40 30 60 50
输出
2 1 3 4
说明
输出的第一个数字2表示此人原始编号为2，即身高为100，体重为30的这个人。由于他和编号为1的人身
高一样，但体重更轻，因此要排在1前面。
示例2
输入
3
90 110 90
45 60 45
输出
1 3 2
说明
1和3的身高体重都相同，需要按照原有位置关系让1排在3前面，而不是3 1 2
总分：100

100:
30: {2: 1}
40: {1: 1}
__proto__: Object
120:
60: {3: 1}
__proto__: Object
130:
50:
4: 1

100:
45: {3: 1}
__proto__: Object
110:
60: {2: 1}
__proto__: Object
120:
45: {1: 1}

 * 
*/

let len =readline();
// 分别获取到身高和体重；
let hs=readline().trim().split(' ');
let ws=readline().trim().split(' ');

function getSeqOrder(len,hs,ws){
let students={};

// 按序号遍历学生
for(let i=1;i<=len;i++){
    // student 记录学生身高；
    if(!students[hs[i-1]]){
        students[hs[i-1]]={}
    }

    //记录相同身高的体重
    if(!students[hs[i-1]][ws[i-1]]){
        students[hs[i-1]][ws[i-1]]={}
    }
    // 初始化记录当前身高体重的序列值1；
    students[hs[i-1]][ws[i-1]][i]=1;
}

let res="";
// 利用对象key值排列遍历序列值
for(let height in students){
    for(let weight in students[height]){
        for(let sid in students[height][weight]){
            res+=(sid+' ');
        }
    }
}
console.log(res);
return res
}


/**
 * 寻找身高相近的小朋友
    标题：寻找身高相近的小朋友 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
 * 
 * 小明今年升学到小学一年级，来到新班级后发现其他小朋友们身高参差不齐，然后就想基于各小朋友和
自己的身高差对他们进行排序，请帮他实现排序。
输入描述:
第一行为正整数H和N，0<H<200，为小明的身高，0<N<50，为新班级其他小朋友个数。
第二行为N个正整数H1-HN，分别是其他小朋友的身高，取值范围0<Hi<200（1<=i<=N），且N个正整
数各不相同。
输出描述:
输出排序结果，各正整数以空格分割。和小明身高差绝对值最小的小朋友排在前面，和小明身高差绝对
值最大的小朋友排在最后，如果两个小朋友和小明身高差一样，则个子较小的小朋友排在前面。
示例1
输入
100 10
95 96 97 98 99 101 102 103 104 105
输出
99 101 98 102 97 103 96 104 95 105
说明
小明身高100，班级学生10个，身高分别为95 96 97 98 99 101 102 103 104 105，按身高差排序后结果
为：99 101 98 102 97 103 96 104 95 105。
总分：100
*/

const h=readline().split(" ")[0];
const hList=readline().split(" ");
function getAbsOrder(h,hList){
    const resList=hList.sort((p,n)=>{
        const absP=Math.abs(h-p);
        const absN=Math.abs(h-n);
        if(absP!==absN){
            // 身高差小的排序
            return absP-absN
        }else{
            // 个子小的排序
            return p-n
        }
    });
    
    return resList 
}


/**
 * js大数相加
 * */


// 新建脚手架

// 数据金融 app 


import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  setCount(1)
  setCount(2)
  console.log(count);
  useEffect(() => {
    setCount(3)
    setCount(4)
    console.log(count);
    setTimeout(()=>{
        console.log(count);
    },0)
  },[]); // effect
}

export default Counter;

/**
 * 最大N个数与最小N个数的和
标题：最大N个数与最小N个数的和 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
给定一个数组，编写一个函数来计算它的最大N个数与最小N个数的和。你需要对数组进行去重。
说明：
        *数组中数字范围[0, 1000]
        *最大N个数与最小N个数不能有重叠，如有重叠，输入非法返回-1
 *输入非法返回-1
输入描述:
第一行输入M， M标识数组大小
第二行输入M个数，标识数组内容
第三行输入N，N表达需要计算的最大、最小N个数
输出描述:
输出最大N个数与最小N个数的和。
示例1
输入
5
95 88 83 64 100
2
输出
342
说明
最大2个数[100,95],最小2个数[83,64], 输出为342
示例2
输入
5
3 2 3 4 2
2
输出
-1
说明
最大2个数[4,3],最小2个数[3,2], 有重叠输出为-1

 * 
*/

while(m=readline()){
    // 获取数组；
    let arr=readline().trim().split(' ').splice(0,m);
    let n=parseInt(readline().trim());
    let result=0;
    //1、去重；2、排序；
    arr=[...new Set(arr)].sort((a,b)=>{
        return parseInt(a)-parseInt(b);
    });

    // 如有重叠返回-1；
    if(arr.length-n<=n-1){
        console.log(-1);
        // 代表有重叠；
    }else if(parseInt(arr[arr.length-1]>1000)||parseInt(arr[0])<0){
        console.log(-1);
    }else{
        // 否则计算出最大最小值，然后计算出结果；
        for(let i=0,arrLen=arr.length;i<arrLen;i++){
            if(i<n){
                result+=parseInt(arr[i])
                result+=parseInt(arr[arrLen-1-i])
            }
        }
        console.log(result);
    }


}

/**
 * 第k个排列
标题：第k个排列 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
给定参数n，从1到n会有n个整数：1,2,3,…,n，这n个数字共有 n! 种排列。
按大小顺序升序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：
 "123"
 "132"
 "213"
 "231"
 "312"
 "321"
给定 n 和 k，返回第 k 个排列。
输入描述:
输入两行，第一行为n，第二行为k，给定 n 的范围是 [1,9]，给定 k 的范围是[1,n!]。
输出描述:
输出排在第k位置的数字。
示例1
输入
3
3
输出
213
说明
3的排列有123 132 213...，那么第3位置的为213
示例2
输入
2
2
输出
21
说明
2的排列有12 21，那么第2位置的为21

 * 
*/

// 先求出全排列，压入数组，然后取出下标对应的元素；

while(n=readline()){
    let k=readline();
    let arr=[];
    for(let i=1;i<=n;i++){
        arr.push(i);
    }
    // 存储所有的1-n的所有元素；
    let res=[];
    let all=[];
    fun(arr,res)
    console.log(all[k-1]);
    function fun(arr,res){
        if(arr.length==0){
            let str=""
            for(let i=0;i<res.length;i++){
                str+=res[i]
            }
            all.push(str);
        }else{
            //第一次进入；
            for(let i=0;i<arr.length;i++){
                fn(arr.slice(0,i).concat(arr.slice(i+1)),res.concat(arr[i]))
            }
        }
    }    
}


/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var permute = function(nums) {
    const res = [], path = [];
  backtracking(nums, nums.length, []);
  return res;
  
  function backtracking(n, k, used) {
      if(path.length === k) {
          res.push(Array.from(path));
          return;
      }
      for (let i = 0; i < k; i++ ) {
          if(used[i]) continue;
          path.push(n[i]);
          used[i] = true; // 同支
          backtracking(n, k, used);
          path.pop();
          used[i] = false;
      }
  }
};

/**
 * 求解连续数列
  标题：求解连续数列 | 时间限制：1秒 | 内存限制：32768K | 语言限制：不限
已知连续正整数数列{K}=K1,K2,K3...Ki的各个数相加之和为S，i=N (0<S<100000, 0<N<100000), 求此数
列K。
输入描述:
输入包含两个参数，1）连续正整数数列和S，2）数列里数的个数N。
输出描述:
如果有解输出数列K，如果无解输出-1
示例1
输入
525 6
输出
85 86 87 88 89 90
示例2
输入
3 5
输出
-1
备注:

 * 
*/

while(line=readline()){
    let lines=line.split(' ');
    let s=parseInt(lines[0])
    let n=parseInt(lines[1])
    let temp=s-(n*(n-1)/2);
    let res=[];
    if(temp<=0){
        console.log(-1);
    }else{
        let start=0;
        if(temp%n==0){
            start=temp/n
        }else{
            console.log(-1);
        }
        for(let i=0;i<n;i++){
            res.push(start+i);
        }
        console.log(res.join(' '));
    }
}

while(line=readline()){
    const arr=line.split(' ').map(Number);
    s=arr[0]
    const i=arr[1]
    const start=(2*s+i-i*i)/(2*i)
    // 求起始数字
    if(start<=0||Math.floor(start)!==start){
        console.log(-1);
    }else{
        let str='';
        for(let z=0;z<i;z++){
            str+=start+z+' '
        }
        console.log(str);
    }
}

/**
 * 最长元音子串的长度
标题：最长元音子串的长度 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
 定义：当一个字符串只有元音字母（aeiouAEIOU）组成，称为元音字符串。
现给定一个字符串，请找出其中最长的元音字符子串，并返回其长度；如果找不到，则返回0。
 子串：字符串中任意个连续的字符组成的子序列称为该字符串的子串。
输入描述:
一个字符串，其长度范围：0 < length <= 65535。
字符串仅由字符a-z和A-Z组成。
输出描述:
一个整数，表示最长的元音字符子串的长度。
示例1
输入
asdbuiodevauufgh
输出
3
说明
样例1解释：最长元音子串为 “uio” 或 “auu”，其长度都为3，因此输出3
总分：100

 * 
 * 
*/


function findLen(str){
    let count=0,temp=0;
    let reg='aeiouAEIOU'
    let len=str.length;
    for(let i=0;i<len;i++){
        if(reg.includes(str.charAt(i))){
            temp++
            count=count>temp?count:temp;
        }else{
            temp=0;
        }
    }
    return count;
}

/**
 * 按索引范围翻转文章片段
标题：按索引范围翻转文章片段 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
输入一个英文文章片段，翻转指定区间的单词顺序，标点符号和普通字母一样处理。例如输入字符串"I
am a developer. "，区间[0,3]，则输出"developer. a am I"。
 String reverseWords(String s, int start, int end)
输入描述:
使用换行隔开三个参数，第一个参数为英文文章内容即英文字符串，第二个参数为翻转起始单词下标(下
标从0开始)，第三个参数为结束单词下标。
输出描述:
翻转后的英文文章片段所有单词之间以一个半角空格分隔进行输出
示例1
输入
I am a developer.
1
2
输出
I a am developer.
示例2
输入
  hello world!
0
1
输出
world! hello
说明
输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
示例3
输入
I am a   developer.
0
3
输出
developer. a am I
说明
如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
示例4
输入
Hello!
0
3
输出
EMPTY
说明
指定翻转区间只有一个单词或无有效单词，则统一输出"EMPTY"

 * 
*/

let arr=readline().split(' ').filter(v=>v);
let start=parseInt(readline());
if(start<0){
    start=0;
}
const end=parseInt(readline());
const len=arr.length;
if(start>=end||start>=len-1){
    console.log('EMPTY');
}else{
    let result=arr.slice(0,start).join(' ');
    if(result){
        result+=' ';
    }
    // 拼接 start 之前的字符串；
    result+=arr.slice(start,end+1).reverse().join(' ');
    // 拼接 start  end ;
    const val=arr.slice(end+1).join(' ');
    // 拼接 end+1 之后的字符串
    if(val){
        result+=' '+val
    }
    console.log(result);
}

/**
 * 一种字符串压缩表示的解压
标题：一种字符串压缩表示的解压 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
有一种简易压缩算法：针对全部由小写英文字母组成的字符串，将其中连续超过两个相同字母的部分压
缩为连续个数加该字母，其他部分保持原样不变。例如：字符串“aaabbccccd”经过压缩成为字符串
“3abb4cd”。 请您编写解压函数，根据输入的字符串，判断其是否为合法压缩过的字符串，若输入合法
则输出解压缩后的字符串，否则输出字符串“!error”来报告错误。
输入描述:
输入一行，为一个ASCII字符串，长度不会超过100字符，用例保证输出的字符串长度也不会超过100字
符
输出描述:
若判断输入为合法的经过压缩后的字符串，则输出压缩前的字符串；若输入不合法，则输出字符串
“!error”。
示例1
输入
4dff
输出
ddddff
说明
4d扩展为dddd，故解压后的字符串为ddddff
示例2
输入
2dff
输出
!error
说明
两个d不需要压缩，故输入不合法
示例3
输入
4d@A
输出
!error
说明
全部由小写英文字母组成的字符串压缩后不会出现特殊字符@和大写字母A，故输入不合法
总分：100
 * 
*/

function isLower(c){
    return c>='a'&&c<='z'
}

function isDigit(c){
    return c>='0'**c<='9'
}

function compress(str){
    const ERR="!error";
    let len=str.length;
    for(let i=0;i<len;i++){
        let char=str[i]
        if(!isDigit(char)&&!isLower(char)){
            console.log(ERR);
            return 0;
        }

    }
}

/**
 * 字符统计及重排
标题：字符统计及重排 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
给出一个仅包含字母的字符串，不包含空格，统计字符串中各个字母（区分大小写）出现的次数，并按
照字母出现次数从大到小的顺序输出各个字母及其出现次数。如果次数相同，按照自然顺序进行排序，
且小写字母在大写字母之前。
输入描述:
输入一行，为一个仅包含字母的字符串。
输出描述:
按照字母出现次数从大到小的顺序输出各个字母和字母次数，用英文分号分隔，注意末尾的分号；字母
和次数间用英文冒号分隔。
示例1
输入
xyxyXX
输出
x:2;y:2;X:2;
说明
每个字符出现的个数都是2，故x排在y之前，而小写字母x在X之前
示例2
输入
abababb
输出
b:4;a:3;
说明
b的出现个数比a多，故b排在a之前

 * 
*/

while(n=readline()){
    function find(str){
        let arr=str.split('');
        let obj={};
        // 遍历统计出现的次数
        arr.forEach((item,i) => {
            if(obj[item]){
                obj[item]++;
            }else{
                obj[item]=1;
            }
        });
        let keys=Object.keys(obj)
        keys.sort((a,b)=>{
            if(obj[a]!==obj[b]){
                // 从大到小排列
                return obj[b]-obj[a]
            }else{
                // 个数一样的情况
                // 如果a为小写字母&&b也为小写字母；
                if(a.charCodeAt()>=65&&a.charCodeAt()<=90&&b.charCodeAt()>=65&&b.charCodeAt()<=90){
                    return a.charCodeAt()-b.charCodeAt();
                }else if(a.charCodeAt()>=97&&a.charCodeAt()<=122&&b.charCodeAt()>=97&&b.charCodeAt()<=122){
                    return a.charCodeAt()-b.charCodeAt();
                }else{
                    // 以上按照字母顺序排序，以下按照
                    return b.charCodeAt()-a.charCodeAt();
                }
            }
        });
        // end of sort
        let str=''
        keys.forEach(item=>{
            str=str+item+":"+obj[item]+";"
        });

        return str;
        
    }
    console.log(find(n));
}

/**
 * 猴子爬山
标题：猴子爬山 | 时间限制：1秒 | 内存限制：65536K | 语言限制：不限
一天一只顽猴想去从山脚爬到山顶，途中经过一个有个N个台阶的阶梯，但是这猴子有一个习惯： 每一
次只能跳1步或跳3步，试问猴子通过这个阶梯有多少种不同的跳跃方式？
输入描述:
输入只有一个整数N（0<N<=50）此阶梯有多少个阶梯
输出描述:
输出有多少种跳跃方式（解决方案数）
示例1
输入
50
输出
122106097
示例2
输入
3
输出
2

 * 
*/

let  n=parseInt(readline())

function fi(N){
    let arr=[0,1,1,2]
    for(let i=4;i<=N;i++){
        arr[i]=arr[i-1]+arr[i-3]
    }
    return arr[N]
}
console.log(fi(n));


/**
 * 找朋友
标题：找朋友 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
 在学校中，N个小朋友站成一队， 第i个小朋友的身高为height[i]，
 第i个小朋友可以看到的第一个比自己身高更高的小朋友j，那么j是i的好朋友(要求j > i)。
 请重新生成一个列表，对应位置的输出是每个小朋友的好朋友位置，如果没有看到好朋友，请在该位置
用0代替。
 小朋友人数范围是 [0, 40000]。
输入描述:
第一行输入N，N表示有N个小朋友
第二行输入N个小朋友的身高height[i]，都是整数
输出描述:
输出N个小朋友的好朋友的位置
示例1
输入
2
100 95
输出
0 0
说明
第一个小朋友身高100，站在队尾位置，向队首看，没有比他身高高的小朋友，所以输出第一个值为0。
第二个小朋友站在队首，前面也没有比他身高高的小朋友，所以输出第二个值为0。
示例2
输入
8
123 124 125 121 119 122 126 123
输出
1 2 6 5 5 6 0 0
说明
123的好朋友是1位置上的124
124的好朋友是2位置上的125
125的好朋友是6位置上的126
以此类推
总分：100
*/

const n=parseInt(readline());
const arr=readline().split(' ');
const result=[];
for(let i=0;i<n-1;i++){
    for(let j=i+1;j<n;j++){
        // 外层循环表示前面的比较元素；
        if(+arr[i]<arr[j]){
            result[i]=j;
            break;// 跳出当前循环层；
        }
        if(j==n-1){
            result[i]=0;
        }
    }
}
console.log([...result,0].join(' '));

/**
 * 
 * 计算面积
标题：计算面积 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
 *  绘图机器的绘图笔初始位置在原点（0, 0），机器启动后其绘图笔按下面规则绘制直线：
 1）尝试沿着横向坐标轴正向绘制直线，直到给定的终点值E。
 2）期间可通过指令在纵坐标轴方向进行偏移，并同时绘制直线，偏移后按规则1 绘制直线；指令的格
式为X offsetY，表示在横坐标X 沿纵坐标方向偏移，offsetY为正数表示正向偏移，为负数表示负向偏
移。
 给定了横坐标终点值E、以及若干条绘制指令，请计算绘制的直线和横坐标轴、以及 X=E 的直线组成图
形的面积。
输入描述:
首行为两个整数 N E，表示有N条指令，机器运行的横坐标终点值E。
接下来N行，每行两个整数表示一条绘制指令X offsetY，用例保证横坐标X以递增排序方式出现，且不会
出现相同横坐标X。
取值范围：0 < N <= 10000, 0 <= X <= E <=20000, -10000 <= offsetY <= 10000。
输出描述:
一个整数，表示计算得到的面积，用例保证，结果范围在0~4294967295内
示例1
输入
4 10
1 1
2 1
3 1
4 -2
输出
12
说明
通过操作机器最后绘制了如下图形（蓝色为绘制笔绘制的直线）
计算图中阴影部分面积，其值为11+21+31+16=12
示例2
输入
2 4
0 1
2 -2
输出
4
说明
通过操作机器最后绘制了如下图形
计算图中阴影部分面积，其值为12+12=4
*/


/**
 * 字符串分割
标题：字符串分割 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
给定一个非空字符串S，其被N个‘-’分隔成N+1的子串，给定正整数K，要求除第一个子串外，其余的子串
每K个字符组成新的子串，并用‘-’分隔。对于新组成的每一个子串，如果它含有的小写字母比大写字母
多，则将这个子串的所有大写字母转换为小写字母；反之，如果它含有的大写字母比小写字母多，则将
这个子串的所有小写字母转换为大写字母；大小写字母的数量相等时，不做转换。
输入描述:
输入为两行，第一行为参数K，第二行为字符串S。
输出描述:
输出转换后的字符串。
示例1
输入
3
12abc-abCABc-4aB@
输出
12abc-abc-ABC-4aB-@
说明
子串为12abc、abCABc、4aB@，第一个子串保留，后面的子串每3个字符一组为abC、ABc、4aB、
@，abC中小写字母较多，转换为abc，ABc中大写字母较多，转换为ABC，4aB中大小写字母都为1个，
不做转换，@中没有字母，连起来即12abc-abc-ABC-4aB-@
示例2
输入
12
12abc-abCABc-4aB@
输出
12abc-abCABc4aB@
说明
子串为12abc、abCABc、4aB@，第一个子串保留，后面的子串每12个字符一组为abCABc4aB@，这个
子串中大小写字母都为4个，不做转换，连起来即12abc-abCABc4aB@

 * 
*/

let n=Number(readline());
while(n){
    const line=readline();
    const index=line.indexOf('-');
    const start=line.slice(0,index);
    const left=line.splice(index+1).replace(/-/g,'');
    const results=[start];
    for(let i=0,len=left.length;i<len;i=i+n){
        let sub=left.slice(i,i+n);
        // 统计子串
        const uppperCount=sub.split('').filter(item=>/[A-Z]/.test(item)).length;
        const lowerCount=sub.split('').filter(item=>/[a-z]/.test(item)).length;
        if(uppperCount>lowerCount){
            sub=sub.toUpperCase();

        }else if(uppperCount<lowerCount){
            sub=sub.toLowerCase()
        }
        results.push(sub);
    }//
    console.log(results.join('-'));
}

/**
 * 
 * 字符串加密
标题：字符串加密 | 时间限制：2秒 | 内存限制：65536K | 语言限制：不限
 给你一串未加密的字符串str，通过对字符串的每一个字母进行改变来实现加密，加密方式是在每一个
字母str[i]偏移特定数组元素a[i]的量，数组a前三位已经赋值：a[0]=1,a[1]=2,a[2]=4。当i>=3时，数组元
素a[i]=a[i-1]+a[i-2]+a[i-3]，
 例如：原文 abcde 加密后 bdgkr，其中偏移量分别是1,2,4,7,13。
输入描述:
第一行为一个整数n（1<=n<=1000），表示有n组测试数据，每组数据包含一行，原文str（只含有小写
字母，0<长度<=50）。
输出描述:
每组测试数据输出一行，表示字符串的密文
示例1
输入
1
xy
输出
ya
说明
第一个字符x偏移量是1，即为y，第二个字符y偏移量是2，即为a
示例2
输入
2
xy
abcde
输出
ya
bdgkr
说明
第二行输出字符偏移量分别为1、2、4、7、13
备注:
解答要求
时间限制：2000ms,内存限制：64MB
 * 
*/
// 行数；
const n=parseInt(readline());
// 定义字符串；
const reg='abcdefghijklmnopqrstuvwxyz'
for(let t=0;t<n;t++){
    let str=readline().split();
    for(let i=0;i<str.length;i++){
        if(i<3){
            arr=[1,2,4]
        }else{
            arr[i]=arr[i-1]+arr[i-2]+arr[i-3]
        }

         // 开始加密；
         let m=reg.indexOf(str[i])
         m=(m+arr[i])%26
         str[i]=reg[m]
    }// end of for
    str=str.join("");
    console.log(str);

}

/**
 * 整数对最小和
标题：整数对最小和 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
 给定两个整数数组array1、array2，数组元素按升序排列。假设从array1、array2中分别取出一个元素
可构成一对元素，现在需要取出k对元素，并对取出的所有元素求和，计算和的最小值
注意：两对元素如果对应于array1、array2中的两个下标均相同，则视为同一对元素。
输入描述:
输入两行数组array1、array2，每行首个数字为数组大小size(0 < size <= 100);
0 < array1[i] <= 1000
0 < array2[i] <= 1000
接下来一行为正整数k
0 < k <= array1.size() * array2.size()
输出描述:
满足要求的最小和
示例1
输入
3 1 1 2
3 1 2 3
2
输出
4
说明
用例中，需要取2对元素
取第一个数组第0个元素与第二个数组第0个元素组成1对元素[1,1];
取第一个数组第1个元素与第二个数组第0个元素组成1对元素[1,1];
求和为1+1+1+1=4，为满足要求的最小和

 * 
*/

const arr1=readline();
const arr2=readline();
const k=readline()*1;
arr1=arr1.split(' ').slice(1,k+1);
arr2=arr2.split(' ').slice(1,k+1);
let temp=[];
for(let i=0;i<arr1.length;i++){
    for(let j=0;j<arr2.length;j++){
        temp.push(arr1[i]*1+arr2[j]*1);
    }
}
// 从小到大排序
temp.sort((a,b)=>{return a-b});
temp=temp.slice(0,k)
console.log(temp.reduce((a,b)=>{a+b}));


/**
 * 报数游戏
标题：报数游戏 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
100个人围成一圈，每个人有一个编码，编号从1开始到100。他们从1开始依次报数，报到为M的人自动
退出圈圈，然后下一个人接着从1开始报数，直到剩余的人数小于M。请问最后剩余的人在原先的编号为
多少？
输入描述:
输入一个整数参数M
输出描述:
如果输入参数M小于等于1或者大于等于100，输出“ERROR!”；否则按照原先的编号从小到大的顺序，以
英文逗号分割输出编号字符串
示例1
输入
3
输出
58,91
说明
输入M为3，最后剩下两个人
示例2
输入
4
输出
34,45,97
说明
输入M为4，最后剩下三个人
总分：100

 * 
*/

let m=parseInt(readline());
let arr=[],delIndex=-1;
if(m<=1||m>100){
    console.log('ERROR!');
    [].slice()
}else{
    // 进行迭代遍历；
    for(let i=1;i<=100;i++){
        arr.push(i);
    }
    // 去掉m-1;
    while(arr.length>=m){
        arr=arr.slice(m).concat(arr.slice(0,m-1))
    }
    // 从小到大排序；
    console.log(arr.sort((a,b)=>{return a-b}));
}

/**
 * 最长子字符串的长度（一）
标题：最长子字符串的长度（一） | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
给你一个字符串 s，字符串s首尾相连成一个环形 ，请你在环中找出 'o' 字符出现了偶数次最长子字符串
的长度。
输入描述:
输入是一串小写字母组成的字符串
输出描述:
输出是一个整数
示例1
输入
alolobo
输出
6
说明
最长子字符串之一是 "alolob"，它包含'o' 2个。
示例2
输入
looxdolx
输出
7
说明
最长子字符串是 "oxdolxl"，
由于是首尾连接在一起的，所以最后一个
 'x' 和开头的 'l'是连接在一起的
，此字符串包含 2 个'o' 。
示例3
输入
bcbcbc
输出
6
说明
这个示例中，字符串 "bcbcbc" 本身就是最长的，因为  'o' 都出现了 0 次。
备注:
1 <= s.length <= 5 x 10^5
s 只包含小写英文字
 * 
*/

let str=readline().trim();
function maxSub(str){
    let slen=str.length;
let strs=str.split("o");
let len=strs.length;
if(len%2===1){
    console.log(slen);
}else{
    console.log(slen-1);
}
}

/**
 * 
 * 字符串统计
标题：字符串统计 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
给定两个字符集合，一个为全量字符集，一个为已占用字符集。已占用的字符集中的字符不能再使用，
要求输出剩余可用字符集。
输入描述:
1、输入为一个字符串，一定包含@符号。@前的为全量字符集，@后的字为已占用字符集。
2、已占用字符集中的字符一定是全量字符集中的字符。字符集中的字符跟字符之间使用英文逗号分隔。
3、每个字符都表示为字符加数字的形式，用英文冒号分隔，比如a:1，表示1个a字符。
4、字符只考虑英文字母，区分大小写，数字只考虑正整形，数量不超过100。
5、如果一个字符都没被占用，@标识仍然存在，例如a:3,b:5,c:2@
输出描述:
输出可用字符集，不同的输出字符集之间回车换行。
注意，输出的字符顺序要跟输入一致。不能输出b:3,a:2,c:2
如果某个字符已全被占用，不需要再输出。
示例1
输入
a:3,b:5,c:2@a:1,b:2
输出
a:2,b:3,c:2
说明
全量字符集为3个a，5个b，2个c。
已占用字符集为1个a，2个b。
由于已占用字符不能再使用，因此，剩余可用字符为2个a，3个b，2个c。
因此输出a:2,b:3,c:2
总分：100


 * 
*/

const line=readline();
let origin=line.split("@")[0];
let used=line.split("@")[1]
originStr=origin.split(",");
usedStr=used.split(",");
let list1=[];
let list2=[];
for(let i=0;i<originStr.length;i++){
    list1.push(originStr[i].split(":"));
}
for(let i=0;i<usedStr.length;i++){
    list2.push(usedStr[i].split(":"));
}

for(let ori of list1){
 for(let tar of list2){
   if(ori[0]===tar[0]){
    ori[1]=ori[1]-tar[1]
   }
 }
}// 
let strout=""
for(let val of list1){
    if(val[1]==0){
        continue
    }else{
        strout+=val[0]+':'+val[1]+","
    }
}
console.log(strout);

/**
 * 寻找相同子串
标题：寻找相同子串 | 时间限制：1秒 | 内存限制：65536K | 语言限制：不限
给你两个字符串 t 和 p ，要求从 t 中找到一个和 p 相同的连续子串，并输出该字串第一个字符的下标。
输入描述:
输入文件包括两行，分别表示字符串 t 和 p ，保证 t 的长度不小于 p ，且 t 的长度不超过1000000，p
的长度不超过10000。
输出描述:
如果能从 t 中找到一个和 p 相等的连续子串，则输出该子串第一个字符在t中的下标（下标从左到右依次
为1,2,3,…）；如果不能则输出”No”；如果含有多个这样的子串，则输出第一个字符下标最小的。
示例1
输入
AVERDXIVYERDIAN
RDXI
输出
4

* 
*/

let str1=readline();
let str2=readline();
let index=str1.indexOf(str2);
console.log(index>-1?index+1:'No');



// serverless 

// 两种不一样的盒模型；
//
// box-contaner
 // css 的预处理:
// less  sass stylus ；

// css in js 

// es 
// css module

// 弱类型 单线程  继承
// 定时器线程；  
// 词法作用域  

//  动态作用域；
// 函数访问变量a,定义的时候寻找a变量 执行的时候寻找a变量；

// 作用域的封装 
// 浏览器GC机制；

// react hooks 

// hooks的特点：关注点分离  

// http  
// tcp :可靠传输 三次握手   滑动窗口 流量控制； 1
// 
// 本地域名服务器dns: udp   

// 什么情况下发送options请求：自定义header 发送options 、跨域options

// options: get post put delete 

// 云主机  // 运短信

// 产品线-控制台  //  负载均衡 
 // 七牛云：7-8人 react技术栈 
 //    



 //any unknow nerver;

 // partial 

// vite 


// webpack 4.0

// code spliting 

// 组件拆分；
// a

// b

// c 
//  loader catch

// 安全性 、手写代码；

// 携程app  RN 

// 营销页面  reactjs / vuejs;








