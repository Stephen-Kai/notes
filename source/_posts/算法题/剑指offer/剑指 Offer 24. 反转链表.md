# 剑指 Offer 24. 反转链表

## 描述

定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL

## 实现

### 迭代法

```js
var reverseList = function (head) {
  // 迭代法(利用三个指针反转): pre, head, next
  // 把 head 的 next 指向 pre
  // 移动 pre, head, next 的位置
  let pre = null;
  let next = null;
  while (head !== null) {
    next = head.next;
    head.next = pre;
    pre = head;
    head = next;
  }
  return pre;
};
```

### 递归法

```js
var reverseList = function (head) {
  // 递归法
  // 理解: n1 -> n2 -> ... -> nk -> nk+1 -> ... -> nm;
  // 假设 nk 后面的部分都已经反转了, 目前要把 nk 下一个指针指向它, 即 nk.next.next = nk & nk.next = null
  // 终止条件, 末尾节点, 并且该节点为头节点
  if (head === null || head.next === null) {
    return head;
  }

  // 在这个过程中也会递归到所有节点
  const newHead = reverseList(head.next);

  head.next.next = head;
  head.next = null;

  return newHead;
};
```

## leetcode

[剑指 Offer 24. 反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)
