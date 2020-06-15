### 题目描述
给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

示例：

给定一个链表: 1->2->3->4->5, 和 n = 2.

当删除了倒数第二个节点后，链表变为 1->2->3->5.
说明：

给定的 n 保证是有效的。

进阶：

你能尝试使用一趟扫描实现吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list


### 解题思路
#### [参考：简洁双指针图解](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/solution/chao-jian-ji-shuang-zhi-zhen-fu-tu-jie-by-newpp/)
#### 快慢双指针：
* 建立快指针p和慢指针q,且记n为初始值即要删除的倒数第n个数。
* 快指针p先走，同时变量n自减；
* 当n=0时，此时快指针p已经比慢指针q多走了n步；此后两指针开始同步移动，（ps例如:当n==-1时，q=q.next;p=p.next）;
* 当p指针指向null时，停止遍历，循环体不再继续执行。此时快指针p刚好比慢指针q多走了n+1步;
* 删除节点即为慢指针的后一个节点q.next;（即：q.next=q.next.next）
* 特殊情况：需要删除头节点的时候，（即链表有5个节点，删除倒数第5个节点的情况），此时快指针p只比慢指针q多走了n步，慢指针q并未移动，此时n==0,p==null;返回头节点的下一个节点即可；return head.next(q.next);

![image.png](https://pic.leetcode-cn.com/e38e6c5eef802750309a9441248339c9080b027093ed446bd5e6f37b9f30d5a7-image.png)

#### 题解中：节点类的定义
    /***
    * Definition for singly-linked list.
    * 链表节点定义；
    */
    function ListNode(val){
        this.val=val;
        this.next=null;
    }
#### 详解：
* 示例传参为[1,2,3,4,5]和2；
* param:head 为指向链表头结点val==1的指针索引；
* param:n 为倒数第n个要删除的节点；
* 特殊情况示例：[1]和1；或者[1,2,3,4,5]和5；此时删除节点即为头结点；
### 代码

```javascript

    /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    /**
     * @param {ListNode} head
     * @param {number} n
     * @return {ListNode}
     */
    var removeNthFromEnd = function(head, n) {
    // 建立快慢指针；
      let p=head,q=head;
      // p指向null为终止条件；

      while(p){
          if(n<0){
              q=q.next;
          }
          n--;
          p=p.next;
      }
       if(n==0){
          return head.next;
      }
      q.next=q.next.next;
      return head;
    };

```