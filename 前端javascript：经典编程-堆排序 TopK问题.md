    输入整数数组 arr ，找出其中最小的 k 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。

     示例 1：

    输入：arr = [3,2,1], k = 2
    输出：[1,2] 或者 [2,1]
    示例 2：

    输入：arr = [0,1,2,1], k = 1
    输出：[0]
    限制：

    0 <= k <= arr.length <= 10000
    0 <= arr[i] <= 10000

解题思路1：数组排序，取前k个数；

	let getLeastNumbers=function(arr,k){
    	return arr.sort((a,b)=>{return a-b}).slice(0,k);
    }
时间复杂度：O(nlogn)
空间复杂度：O(logn)

解题思路2：构建大顶堆求Top k的问题; 

- 从数组中取前k个元素，（0到k-1位），构造一个大顶堆；
- 从k位开始遍历数组，每个数组元素都和大顶堆元素进行比较，如果大于大顶堆元素，则不做任何处理，继续遍历下一个元素，如何小于大顶堆元素，则将这个元素替换掉大顶堆元素，然后再堆化成一个新的大顶堆。
- 遍历完成后，堆中的数据，就是前k小的数据；

              8 

          6        7 

        4    5   1    2
     
      0


       /**
     * @param {number[]} arr
     * @param {number} k
     * @return {number[]}
     */
    var getLeastNumbers = function(arr, k) {
     // maxheapp[0]元素占位元素；方便后面的数组的index下标计算；此时最后一个非叶子节点的下标为Math.floor(n/2);
     let maxheap=[,],i=0,len=arr.length;
      // 取前k个元素，并建立最大堆；
      while(i<k){
          maxheap.push(arr[i++]);
      }
      // 建立前k个元素的大顶堆；
      buildHeap(maxheap,k);
      //从k+1个元素开始遍历；
       for(let i=k;i<len;i++){
           // 如果当前元素小于堆顶元素，则进行置换，并重新堆化；
           if(arr[i]<maxheap[1]){  // 如果取最大k个元素，则>
               maxheap[1]=arr[i];
               buildHeap(maxheap,k);
           }
       }// end of for loop 
        // 移除maxheap的占位符；
        maxheap.shift();
        return maxheap;
    };

    let buildHeap=(maxheap,k)=>{
        if(k==1){ return}
        // 从最后一个非叶子节点开始，一直到堆顶maxHeap[1]进行堆化；
        for(let i=Math.floor(k/2);i>=1;i--){
             heapify(maxheap,k,i);
        }
    }
    // 建立最小堆元素；
    let heapify=(maxheap,k,i)=>{

        while(true){

            let maxIndex=i;
            // 先比较左儿子， i 在每次循环的时候，都代表最大元素的下标；
             if(2*i<=k&&maxheap[2*i]>maxheap[maxIndex]){
                maxIndex=2*i;
            }
            // 然后将当前最大元素与右儿子比较
            if(2*i+1<=k&&maxheap[2*i+1]>maxheap[maxIndex]){
                maxIndex=2*i+1;
            }
            if(maxIndex!==i){
                swap(maxheap,i,maxIndex);
                i=maxIndex;
            }else{
                //建立最小堆元素完成，则跳出当前循环，进入下个小堆元素建立；
                break;
            } 
        }

    }

    let  swap=(arr,i,j)=>{
    let temp=arr[i];
      arr[i]=arr[j];
      arr[j]=temp;
    }
    
   [参考](https://github.com/sisterAn/JavaScript-Algorithms/issues/59)

作者：xi-ge-yang-yang
链接：https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/solution/da-ding-dui-qiu-top-kwen-ti-by-xi-ge-yang-yang/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。