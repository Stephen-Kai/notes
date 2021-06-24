# 剑指 Offer 03. 数组中重复的数字

## 描述

找出数组中重复的数字。

在一个长度为 n 的数组 nums 里的所有数字都在 0 ～ n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

示例 1：

输入：
[2, 3, 1, 0, 2, 5, 3]
输出：2 或 3

## 实现

### 利用 Set 方法

```js
var findRepeatNumber = function (nums) {
  // 利用 Set
  const set = new Set();
  const i = 0;
  for (let i = 0, len = nums.length; i < len; i++) {
    if (set.has(nums[i])) {
      return nums[i];
    }
    set.add(nums[i]);
  }
  return -1;
};
```

### 利用排序后, 同样的值在一块

```js
var findRepeatNumber = function (nums) {
  // 先排序, 再判断 i 与 i - 1
  const arr = nums.sort();
  for (let i = 1, len = nums.length; i < len; i++) {
    if (nums[i] === nums[i - 1]) {
      return nums[i];
    }
  }
  return -1;
};
```

### 桶排序

```js
var findRepeatNumber = function (nums) {
  // 桶排序, 如果对应的位置有值就表明有重复的值了
  const arr = [];

  for (let i = 0, len = nums.length; i < len; i++) {
    if (arr[nums[i]]) {
      return nums[i];
    }

    arr[nums[i]] = "mark";
  }
  return -1;
};
```

### 参考桶排序, 但是不用额外空间

```js
var findRepeatNumber = function (nums) {
  // 桶排序升级, 不用额外空间, 自己空间内替换
  for (let i = 0, len = nums.length; i < len; i++) {
    // 如果是本身, 跳过
    if (i === nums[i]) continue;
    // 出现重复
    if (nums[i] === nums[nums[i]]) {
      return nums[i];
    }

    // 交换下位置, 同时 i 还要再过一下自身
    const tmp = nums[nums[i]];
    nums[nums[i]] = nums[i];
    nums[i] = tmp;
    i--;
  }

  return -1;
};
```

## leetcode

[剑指 Offer 03. 数组中重复的数字](https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/)
