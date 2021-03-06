# 手写一个 Promise.all

你了解 Promise 吗, 平时用的多吗？(ps: Promise 在现在前端开发环境中是比较常见的, 肯定是用的多的, 所以如果说用的不多, 可能会被认为是落伍的, 需要时间去填平)

Promise.all 你知道有什么特性吗?(ps: 通常不会让手写一个 Promise A+规范的, 因为写这么大代码量的耗费时间会比较长, 通常每个面试官留的时候也就是一个小时)

它接收一个数组, 数组里面是 Promise 或者是常量, 返回一个 Promise, 它会使用 Promise.resolve 对数组元素包裹一层, 把非 Promise 元素也转变为 Promise, 当数组中所有的 Promise 执行完了, 就会 resolve 掉, 当有一个 Promise 报错了, 就会 reject 掉

当一个 Promise 报错后, 其他 Promise 会执行吗？
会的, Promise 在实例化的时候就执行完了, .then 只是为了拿到结果

```js
function PromiseAll(promiseArray) {
  // 首先肯定是返回一个 promise
  return new Promise((resolve, reject) => {
    // 判断一下是否是数组
    if (!Array.isArray(promiseArray)) {
      return reject(new Error("传入的参数需要是一个数组"));
    }
    let resArr = [];
    let count = 0; // 记录执行返回的结果数量, 因为 resArr[i], 可能会出现 undefined, 可以举例子说明, 比如数组一开始为空, 如果 resArr[10] = 1, 这个时候的 resArr.length = 11, js 会把空间留出来
    const promiseLen = promiseArray.length;
    // ps: 自己百度的, 如果是数组这种采用下标访问的, 使用 for, 效率已经够高了, 如果是链表结构的, 可以使用 forEach
    for (let i = 0; i < promiseLen; i++) {
      // Promise.resolve 包裹一层可以把一些常量也转为 promise
      Promise.resolve(promiseArray[i])
        .then((res) => {
          // 这种方式不对, 忽略了 Promise.all 的特性, Promise.all 接收的数组元素是什么顺序, 返回的结果也是什么顺序, 但是使用 push 有可能某一个 promise 执行得更快, 走在了前面 push
          // resArr.push(res);
          resArr[i] = res;
          count++;
          // 千万记住不能放在 .then 外面, 因为放外面是同步执行的
          if (count === promiseLen) {
            resolve(resArr);
          }
        })
        .catch((err) => reject(err));
    }
  });
}
```

穿插的知识点:

1. 如果是基础库等, 一定要划清界限, 一定要把入口和出口把控好了, 要做校验, 否则出错别人会认为是你的问题, 你的代码没写好.
2. 如果是业务代码, 在做 if(num) {} 这种时候一定要写清楚, 如 if(num === 1) {}, 因为业务代码最重要的是要别人能够看懂, 如果是库, 可能还会考虑性能等.
3. 判断是否为 Promise 的方法, 只是如果这样, 根据 isPromise, 如果是就 .then 来 push, 如果不是就直接 push, 这样就得写两遍

```js
const isPromise =
  Object.prototype.toString.call(promiseArray[i]) === "[object Promise]";
```

4. 但是利用 Promise.resolve 的特性就只要写一遍就好了
5. Promise.all 的特性, Promise.all 接收的数组元素是什么顺序, 返回的结果也是什么顺序(考察点一)
6. 返回 Promise(考察点二)
7. Promise.resolve 转 Promise (考察点三)
8. 判断一下是否是数组 (考察点四)
9. 面试官的优势, 他出一道题都已经出了若干遍了, 他看过很多候选人, 知道很多候选人的写法, 也许他一开始未曾察觉哪个地方会有问题, 但他通过候选人的写法, 或者出错的地方就能够发觉哪里会有问题, 需要注意, 然后去考察下一个候选人
10. 虽然可能面试官也不知道 leetcode 上所有的算法题, 但是面算法的时候, 面试官肯定是很熟了, 这个算法他知道所有的解法, 他来考你, 这个解法会吗? 另一种解法会吗?
