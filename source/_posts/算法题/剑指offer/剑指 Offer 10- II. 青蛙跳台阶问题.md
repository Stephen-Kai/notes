# 剑指 Offer 10- II. 青蛙跳台阶问题(涉及到这种斐波那契数列的, 总是出错, 报超时之类的)

## 该类问题 tips: 青蛙跳台阶的求法 fn = fn-1 + fn-2 + fn-3 + ... + fn-m; m 为限制

## 描述

一只青蛙一次可以跳上 1 级台阶，也可以跳上 2 级台阶。求该青蛙跳上一个 n  级的台阶总共有多少种跳法。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

## 实现

### 类似斐波那契数列

```js
var numWays = function (n) {
  if (n === 0) {
    return 1;
  }
  // 先说规律: 青蛙跳台阶的求法 fn = fn-1 + fn-2 + fn-3 + ... + fn-m; m 为限制
  const f = (n) => {
    if (n < 3) {
      return n;
    }
    return f(n - 1) + f(n - 2);
  };
  return f(n);
};
```

### 加上缓存

```js
/**
 * @param {number} n
 * @return {number}
 */
var numWays = function (n) {
  // 先说规律: 青蛙跳台阶的求法 fn = fn-1 + fn-2 + fn-3 + ... + fn-m; m 为限制
  if (n === 0) {
    return 1;
  }
  const map = new Map();
  if (map.has(n)) {
    return map.get(n);
  }
  const f = (n) => {
    if (n < 3) {
      return n;
    }
    const res = f(n - 1) + f(n - 2);
    map.set(n, res);
    return res;
  };
  return f(n);
};
```

## leetcode

[剑指 Offer 10- II. 青蛙跳台阶问题](https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/)
