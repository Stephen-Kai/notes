# 手写 debounce 防抖

防抖没什么可以考察的点

```js
function debounce(fn, delay) {
  let timer = null;

  return function () {
    clearTimeout(timer);

    // 由于这里使用的是箭头函数, 所以不用再用一个变量来存放 this
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}
```
