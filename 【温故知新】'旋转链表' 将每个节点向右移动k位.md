### 题目描述
给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。

示例 1:

输入: 1->2->3->4->5->NULL, k = 2
输出: 4->5->1->2->3->NULL
解释:
向右旋转 1 步: 5->1->2->3->4->NULL
向右旋转 2 步: 4->5->1->2->3->NULL
示例 2:

输入: 0->1->2->NULL, k = 4
输出: 2->0->1->NULL
解释:
向右旋转 1 步: 2->0->1->NULL
向右旋转 2 步: 1->2->0->NULL
向右旋转 3 步: 0->1->2->NULL
向右旋转 4 步: 2->0->1->NULL

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/rotate-list



### 解题思路

#### 1、移动尾结点：
* 计算向右移动位数num;
* 将尾节点作为移动点。每次循环将当前尾节点移动到链表head;
* 循环条件为num>0;

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
* 示例传参为[1,2,3,4]和1；
* param:head 为指向链表头结点val==1的指针索引；
* param:k 为向右移动k位；
* 计算所得当前链表的长度size=4；向右移动的位数为1%4=1;
* 通过遍历条件（vnode.next&&vnode.next.next）获取得到倒数第二个节点；
* 得到尾节点lastNode=vnode.next;
* 通过vnode.next=null解除尾节点；
* let val=lastNode.val,newNode=new ListNode(val);作为新节点；
* newNode.next=curHead;指向原链表头结点成为新链表头节点；
* 一次遍历结束；
### 代码

```

  /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    /**
     * @param {ListNode} head
     * @param {number} k
     * @return {ListNode}
     */
    var rotateRight = function(head, k) {
        if(!head||!head.next){
            return head;
        }
        // 计算链表的长度；
        let size=1,current=head;
        while(current.next){
           current=current.next;
           size++;
        }
        //计算右移位数；当k大于长度size的时候，取余即可；
        let num=k%size;
        // 思路1：将末尾节点作为移动点，移动num次后形成的链表即为所有节点右移num位的链表；
        let curHead=head;
        while(num>0){
            let vnode=curHead;
            // 获取倒数第二个节点；
            while(vnode.next&&vnode.next.next){
                vnode=vnode.next;
            }
            //解除最后一个节点；
            let lastNode=vnode.next;
            let val=lastNode.val;
            vnode.next=null;
            // 将最后一个节点作为新的头节点；
            let newNode=new ListNode(val);
            newNode.next=curHead;

            curHead=newNode;
            num--;
        }
        return curHead;

    };

```

#### 2、将链表形成一个闭环，寻找环形链表的断开（即新的链表的尾节点）：
* 当前头节点指针向右移动size-num-1位，即为尾节点
#### 详解：
* 示例传参为[1,2,3,4]和1；
* param:head 为指向链表头结点val==1的指针索引；
* param:k 为向右移动k位；
* 计算所得当前链表的长度size=4；向右移动的位数为1%4=1;
* 当所有节点移动1位的时候，结果为[4,1,2,3]；即当前尾节点为3；
* 当index=1;指向原头节点1，向右移动4-1-1位就是移动后的尾结点；此时index=3;

         /**
         * Definition for singly-linked list.
         * function ListNode(val) {
         *     this.val = val;
         *     this.next = null;
         * }
         */
        /**
         * @param {ListNode} head
         * @param {number} k
         * @return {ListNode}
         */
        var rotateRight = function(head, k) {
            if(!head||!head.next){
                return head;
            }
            // 计算链表的长度；
            let size=1,current=head;
            while(current.next){
               current=current.next;
               size++;
            }
            //计算右移位数；当k大于长度size的时候，取余即可；
            let num=k%size;
            // 思路2：将链表形成一个闭环；寻找环形链表的断开点（即新的链表的尾节点），；
            // -1是当前index下标从1开始；
               // 形成环形链表；
              current.next=head;
              let tHead=head;
              let index=1;
              // 获取移动num位后的尾节点；
              while(index<=size-num-1){
                tHead=tHead.next;
                index++;
              }
              // 获取新的头节点；
              let curHead=tHead.next;
              // 断开链表；
              tHead.next=null;
              // 返回当前头节点； 
            return curHead;

        };
