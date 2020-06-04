    /**
     * 堆排序：
    */
    
     function heapSort(arrItems){
       //  构建大顶堆；
       let len=arrItems.length-1;
       let heapSize=len;
	  
       buildHeap(arrItems,len);
       //for loop； 堆顶元素与最后一个元素进行替换；
       for(let i=len;i>1;i--){
        // 交换堆顶元素；
         swap(arrItems,1,i);
         heapSize--;
         buildHeap(arrItems,heapSize);
       }
   
       arrItems.shift()
       return arrItems;
     }
	 
       let buildHeap=(maxheap,k)=>{
             if(k==1){ return}
             // 从最后一个非叶子节点开始，一直到堆顶maxHeap[1]进行堆化；
             for(let i=Math.floor(k/2);i>=1;i--){
                  heapify(maxheap,k,i);
             }
         }
     
       let heapify=(maxheap,k,i)=>{
		   while(true){
			   let maxIndex=i;
			   // 先比较左儿子，i在每次循环的时候都代表当前最大元素的下标;
			   if(2*i<=k&&maxheap[2*i]>maxheap[maxIndex]){
				   maxIndex=2*i;
			   }
			   // 再比较右儿子；
			   if(2*i+1<=k&&maxheap[2*i+1]>maxheap[maxIndex]){
				   maxIndex=2*i+1;
			   }
			   if(maxIndex!==i){
				   swap(maxheap,i,maxIndex);
			       i=maxIndex
			   }else{
				   // 建立最小堆元素完成，进入下一个最小堆元素的的建立；
				   break;
			   }
		   }
	   } 
	
       let  swap=(arr,i,j)=>{
         let temp=arr[i];
           arr[i]=arr[j];
           arr[j]=temp;
         }

let arr=[,9,8,3,1,5,6,7,]
let result=heapSort(arr);
console.log(result); // [ 1, 3, 5, 6, 7, 8, 9 ]