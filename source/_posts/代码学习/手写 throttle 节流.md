# 手写 throttle 节流

```js
// 第一次是立即执行的
function throttle(fn, delay) {
  // 记录上一次时间
  let last = 0;

  return function () {
    // 当前的时间
    const now = Date.now();

    if (now - last >= delay) {
      // 更新上一次时间
      last = now;

      // 防止遇到 this 指向的问题
      fn.apply(this, arguments);
    }
  };
}
```

你这种写法第一次是立即执行还是延迟执行？
第一次是立即执行的

```js
// 第一次也要延迟，不要立即执行的
function throttle(fn, delay) {
  let timer = null;

  return function () {
    // 注意，考虑是否会有 this 指向的问题
    const context = this;
    const args = arguments;

    if (!timer) {
      // 如果 setTimeout 里面使用的是箭头函数, 那就可以使用 this 了
      timer = setTimeout(function () {
        fn.apply(context, args);
        timer = null;
      }, delay);
    }
  };
}
```

你这种写法是不是最后一次也是延迟执行啊，万一用户退出了页面怎么办？
为了更加精确的执行，可以把时间戳和定时器结合, 这种即时是最后一次也还是会延迟执行, 但是加了距离上一次如果过了 delay 时间, 是可以立即执行的

```js
// 把时间戳和定时器结合, 更加准确
function throttle(fn, delay) {
  let startTime = Date.now(); // 上一次的时间
  let timer = null; // 记录 timer

  return function () {
    // 当前的时间
    const currentTime = Date.now();
    // 计算上一次执行到现在还剩余多久才能执行下一次函数
    const remainning = delay - (currentTime - startTime);
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    if (remainning <= 0) {
      fn.apply(context, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args);
        startTime = Date.now();
      }, remainning);
    }
  };
}
```

但是 setTimeout 也不是说特别精确执行的, 因为 setTimeout 是宏任务, 如果前面有其他的任务, 它还是得排队的, 那如果前面一直有微任务啊, 那还得等着, 所以它是至少 delay 时间后执行
