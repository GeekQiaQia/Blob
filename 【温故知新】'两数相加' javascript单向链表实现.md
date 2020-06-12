### 题目描述
 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/add-two-numbers

### 解题思路
#### [参考：javascript单向链表实现](https://www.cnblogs.com/AhuntSun-blog/p/12433173.html)
#### 单向链表简介：
* 链表和数组一样，可以用于存储一系列的元素，但是链表和数组的实现机制完全不同。
* 链表的每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（有的语言称为指针或连接）组成。类似于火车头，一节车厢载着乘客（数据），通过节点连接另一节车厢。
* 
![image.png](https://pic.leetcode-cn.com/d9391289f0185cd70bfa39f62946471bfc65461f08f13376147de58ba3376796-image.png)
* head属性指向链表的第一个节点；链表中的最后一个节点指向null；
* 当链表中一个节点也没有的时候，head直接指向null；
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
* 示例传参为342 + 465 = 807；数是按照 逆序 的方式存储的
* function(l1, l2) 中param: l1 l2，分别为两个由链表节点连接的链表，list1、list2 如下所示;
    * ListNode {
        val: 2,
        next: ListNode { val: 4, next: ListNode { val: 3, next: null } }
    } 
    ListNode {
        val: 5,
        next: ListNode { val: 6, next: ListNode { val: 4, next: null } }
    }
* 定义一个val为head的链表首节点：new ListNode("head");
* 定义一个指针或者索引current指向首节点head;sum为每次按位相加的和；n为是否有进位1；
* 通过while循环，创建并按位相加得到的新的节点，通过current链接；
* n1+n2+n:每次循环按位相加并计算进位n(0/1);
* 新节点的val为sum%10(ex:(2+5)%10==7);
* current.next链接新的node节点；并将current指向最新的节点；current=current.next;
* 计算本次相加是否有进位1,n=parseInt(sum/10);
* 如果当前节点l1/l2存在，则指向下一个计算节点: l1.next：
    *  (ps: ListNode { val: 4, next: ListNode { val: 3, next: null })
* 最后结束for循环，高位运算如果有进位，则创建一个新节点new ListNode(n)，并通过current.next链接；
*  最后newNode:
    *     ListNode {
            val: 'head',
            next: ListNode { val: 7, next: ListNode { val: 0, next: ListNode{val:8,next:null} } }
        }
    * return newNode.next; 即为链表相加的逆序结果
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let newNode = new ListNode('head')
    let current = newNode , sum , n = 0
    while( l1 || l2 ){
        console.log(l1,l2);
        const n1 = l1 ? l1.val : 0
        const n2 = l2 ? l2.val : 0
        sum = n1 + n2 + n
        current.next = new ListNode( sum % 10 )
        current = current.next
        n = parseInt( sum / 10 )
        if(l1) l1 = l1.next
        if(l2) l2 = l2.next
    }
    if( n > 0 ) current.next = new ListNode(n)
    console.log(newNode);
    return newNode.next
};

```