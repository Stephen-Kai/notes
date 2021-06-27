# 剑指 Offer 05. 替换空格

## 描述

请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

示例 1：

输入：s = "We are happy."
输出："We%20are%20happy."

## 实现

### 方法

```js
var replaceSpace = function (s) {
  // 一: 正则
  // return s.replace(/\s/g, '%20');
  // 二: 遍历
  // let str = '';
  // for(let i = 0, len = s.length; i < len; i ++) {
  //     if(s[i] === ' ') {
  //         str += '%20'
  //     }else {
  //         str += s[i];
  //     }
  // }
  // return str;
  // 三: 转数组
  return s.split("").reduce((memo, cur) => {
    const str = cur === " " ? "%20" : cur;
    return (memo += str);
  }, "");
};
```

## leetcode

[ 剑指 Offer 05. 替换空格](https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/)
