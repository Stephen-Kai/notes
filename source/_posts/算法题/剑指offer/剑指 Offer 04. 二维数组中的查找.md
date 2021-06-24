# 剑指 Offer 04. 二维数组中的查找

## 描述

在一个 n \* m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

示例:

现有矩阵 matrix 如下：

[
[1, 4, 7, 11, 15],
[2, 5, 8, 12, 19],
[3, 6, 9, 16, 22],
[10, 13, 14, 17, 24],
[18, 21, 23, 26, 30]
]
给定 target = 5，返回  true。

给定  target = 20，返回  false。

## 实现

### 利用右上角 || 左下角

```js
var findNumberIn2DArray = function (matrix, target) {
  // 利用从左到右递增 & 从上到下递增的特性
  // 右上角开始: 它左边的值比它小, 下边的值比它大
  // or 左下角开始: 它上边的值比它小, 右边的值比它大

  if (matrix === null || matrix.length === 0 || matrix[0].length === 0) {
    return false;
  }

  const rows = matrix.length;
  const cols = matrix[0].length;

  let cRow = 0;
  let cCol = cols - 1;

  while (cRow < rows && cCol >= 0) {
    const num = matrix[cRow][cCol];
    if (num === target) {
      return true;
    } else if (num > target) {
      cCol--;
    } else {
      cRow++;
    }
  }

  return false;
};
```

## leetcode

[剑指 Offer 04. 二维数组中的查找](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/)
