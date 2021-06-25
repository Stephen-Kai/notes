# 剑指 Offer 11. 旋转数组的最小数字

## 描述

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。例如，数组  [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为 1。

示例 1：

输入：[3,4,5,1,2]
输出：1
示例 2：

输入：[2,2,2,0,1]
输出：0

## 实现

### 暴力法

```js
var minArray = function (numbers) {
  // 方案: 1. 暴力法 2. 排序后查找 3. 二分查找
  let min = numbers[0];
  for (let i = 0, len = numbers.length; i < len; i++) {
    if (min > numbers[i]) {
      min = numbers[i];
    }
  }
  return min;
};
```

### 排序后输出()

```js
var minArray = function (numbers) {
  numbers.sort((a, b) => a - b);
  return numbers[0];
};
```

## leetcode

[剑指 Offer 11. 旋转数组的最小数字](https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/)
