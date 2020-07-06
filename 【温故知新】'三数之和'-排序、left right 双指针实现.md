![QQ图片20200706105749.png](https://pic.leetcode-cn.com/01ba785fd2a17256c211bc85b543d3be13c6ccc565a48c2d8b4898ecc859fb76-QQ%E5%9B%BE%E7%89%8720200706105749.png)

### 题目描述

    给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

    注意：答案中不可以包含重复的三元组。
    
    示例：

    给定数组 nums = [-1, 0, 1, 2, -1, -4]，

    满足要求的三元组集合为：
    [
      [-1, 0, 1],
      [-1, -1, 2]
    ]

    来源：力扣（LeetCode）
    链接：https://leetcode-cn.com/problems/3sum
    著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
### 解题思路
#### 排序、双指针并去重；
##### 思路详解
 * 首先对当前数组进行排序，[-4,-1,-1,0,1,2]有序性有助于左右指针滑动是判断去重；
 	* 定义基点i（三数中数值最小，位置最左，单次循环内不滑动）；
 	* 定义左指针left(三数中间位置数值)
 	* 定义右指针right(三数最右位置)；
 * 单轮循环中固定一个基点 i；
 * 如果基点值大于0，则直接返回结果数组；（在有序数组中，如果当前基点值大于0，则后面的两数的任意组合必大于0）
 * 防止基点重复；if(nums[i]===nums[i+1])则进入下一轮循环；
 * 定义left=i+1;right=len-1;
 * 固定基点，遍历寻找剩余两数的循环条件为（left<right）
 *  如果sum===0;则防止left指针重复，条件为(left<right&&nums[left]===nums[left+1]); left++;
 	* 同理判断防止right指针重复；
 * 如果sum>0;则right--;
 * 如果sum<0;则left++;
 * 最后返回结果res数组;

### 代码

```javascript
/**
 * *             双指针left  right ;
 * @description: 1、进行数组元素排序
 *               2、判断特殊情况：* 
 * @param {number[]} nums
 * @return {number[][]}
 */

var threeSum = function(nums) {
 let res=[],len=nums.length;
//  if(len<3){
//      return []
//  }
 nums.sort((a,b)=>{ return a-b});
 // 双指针

 for(let i=0;i<len;i++){
     // 如果基点值大于0 ，则后面的组合一定都大于零；
     if(nums[i]>0){
         return res;
     }
     // 防止基点出现重复；
     if(nums[i]===nums[i-1]){
         continue;
     }
     let left=i+1;
     let right=len-1;
     
     //每个不重复基点值进行遍历组合；
     while(left<right){
         let sum=nums[i]+nums[left]+nums[right];
         if(sum==0){

             // 防止left指针重复；
             while(left<right&&nums[left]===nums[left+1]){
                 left++;
             }
             //防止right指针重复；
             while(left<right&&nums[right]===nums[right-1]){
                 right--;
             }
             // 当前组合加入结果数组；
             res.push([nums[i],nums[left],nums[right]]);
             left++;
             right--;
         }else if(sum<0){
             left++;
         }else if(sum>0){
             right--;
         }
     }
 }
 return res;
 
};
```