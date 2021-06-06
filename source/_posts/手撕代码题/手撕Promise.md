# 手撕 Promise

## 简洁版本, 只实现了简单的 onFullfilled

在面试的过程中, 肯定是不可能实现一个完全符合 Promise/A+ 的 Promise, 所以不要去抠一些规范, 要先去实现一个宏观的简单的能够实现基本 Promise 功能的方法就足够了

先看使用, 基于使用来进行实现

注意事项呢:

1. resolve 的时机:

像 Promise 最简单的用法是直接 resolve, new Promise(resolve => resolve('hello word')).then(...), 如果直接在构造的时候执行 resolve, 这个时候 .then 还未注册, 也就没有办法去执行 .then 的方法, 所以就需要去进行一个提前注册, 延迟执行这样的一个过程

2.

```js
// 先看应用
class CustomPromise {}

const createPromise = (time) => {
  return new CustomPromise((resolve, reject) => {
    setTimeout(resolve, time);
  });
};

const promiseInstance = createPromise(1000);

promiseInstance()
  .then((res) => {
    // console.log("接收到响应啦", res); // undefined
    console.log("hello world");
  })
  .catch((err) => {
    console.log("error", err);
  });

// 实现
// 从最小的实现开始写, 比如先把 .then 走通了

class CustomPromise {
  // 构造函数接收个处理函数
  constructor(handleFunc) {
    // 保存下状态等
    this.status = "pending";
    this.value = undefined;

    // Promise/A+规范中写明可以注册多个 onFullfilled 函数, 所以用一个数组暂存
    this.fullfilledList = [];

    // 需要在注册的时候执行, Promise/A+ 规范中写明会绑定当前执行上下文
    handleFunc(this.triggerResolve.bind(this));
  }

  // 按道理来说, 如果在 Promise 中直接 resolve 了, 应该要立即执行, 但是这个时候 onFullfilled 函数还没有收集起来, 要在 .then 中收集, 所以使用 setTimeout 在下个任务执行
  triggerResolve(val) {
    setTimeout(() => {
      // 如果状态不为 pending, 说明已经被决议了, 状态不可更改
      if (this.status !== "pending") return;
      this.status = "fullfilled";
      this.value = val;
      // 执行 fullfilled 函数
      this.fullfilledList.forEach((item) => item(val));
      // 回归初始值
      this.fullfilledList = [];
    }, 0);
  }

  then(onFullfilled, onRejected) {
    // .then 中需要收集 onFullfilled 函数
    const { status, value } = this;

    // .then 中需要返回一个 Promise
    const promiseInstance = new CustomPromise(
      (onNextFullfilled, onNextRejected) => {
        // 实现链式调用
        function onFinalFullfilled(val) {
          // 需要判断 onFullfilled 是否为一个函数, 因为有可能传入的是一个常量等等, 那就得跳过, 并且下一个Promise 需要接收到相同的结果
          if (typeof onFullfilled !== "function") {
            onNextFullfilled(val);
          } else {
            // 拿到执行的结果, 给下一个 fullfilled 函数
            const res = onFullfilled(val);
            // 有可能拿到的是一个拥有 .then方法的对象
            if (res && typeof res.then === "function") {
              // res 是一个Promise
              res.then(onNextFullfilled);
            } else {
              onNextFullfilled(res);
            }
          }
        }

        switch (status) {
          case "pending": {
            this.fullfilledList.push(onFinalFullfilled);
            break;
          }
        }
      }
    );

    return promiseInstance;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static all(promiseList) {
    // 返回一个 Promise 实例, 全部完成 resolve, 有一个未完成 reject
    const promiseInstance = new CustomPromise((resolve, reject) => {
      if (!Array.isArray(promiseList)) {
        return reject(new Error("需要传入一个数组"));
      }
      // 保存结果, 结果按照入参时候的顺序返回
      const result = [];
      // 保存返回结果的数量, 无法通过 result 判断, 因为 result 中, 如果直接 result[4] = res, 前面的位置会填充 undefined
      const count = 0;
      const promiseLen = promiseList.length;
      // 也可以通过 for(const [i, promise] of promiseList.entries())
      for (let i = 0; i < promiseLen; i++) {
        // 全部转为 Promise
        Promise.resolve(promiseList[i])
          .then((res) => {
            result[i] = res;
            count++;
            if (count === promiseLen) {
              resolve(result);
            }
          })
          .catch((err) => {
            reject(err);
          });
      }
    });

    return promiseInstance;
  }

  static race() {}

  static resolve(val) {
    return new CustomPromise((resolve) => resolve(val));
  }
}
```

## 完整版本
