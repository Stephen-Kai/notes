# 剑指 Offer 09. 用两个栈实现队列

## 描述

用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead  操作返回 -1 )

## 实现

### 方法

```js
var CQueue = function () {
  // 一个 push 栈, 一个 pop 栈, 栈是先进后出(push & pop)
  // appendTail 时, 加入到 push 栈中, 当 deleteHead 时, 从 pop 栈 弹出, 如果 pop 栈为空, 则把 push 栈倒入
  this.pushStack = [];
  this.popStack = [];
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  this.pushStack.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  if (this.popStack.length === 0) {
    while (this.pushStack.length !== 0) {
      this.popStack.push(this.pushStack.pop());
    }
  }
  return this.popStack.length !== 0 ? this.popStack.pop() : -1;
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
```

## leetcode

[剑指 Offer 09. 用两个栈实现队列](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)
