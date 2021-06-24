# 剑指 Offer 10- I. 斐波那契数列(这题还需再看一下)

## 描述

写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项（即 F(N)）。斐波那契数列的定义如下：

F(0) = 0,   F(1) = 1
F(N) = F(N - 1) + F(N - 2), 其中 N > 1.

## 实现

### 递归方法(老说超出时间限制, 我很无奈啊, 这里应该有问题, 因为我直接使用的 fib 函数, 那岂不是 map 每次都会创建一下)

```js
var fib = function (n) {
  if (n < 2) {
    return n;
  }
  const map = new Map();
  if (map.has(n)) {
    return map.get(n);
  }
  const res = fib(n - 1) + fib(n - 2);
  map.set(res);
  return res;
};
```

### 非迭代(提示解答错误)

```js
var fib = function (n) {
  let first = 0;
  let second = 1;
  while (n-- > 0) {
    let tmp = first + second;
    first = second;
    second = tmp;
  }
  return first;
};
```

### 最原始(超出时间限制)

```js
var fib = function (n) {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
};
```

## leetcode

[剑指 Offer 10- I. 斐波那契数列](https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof)
