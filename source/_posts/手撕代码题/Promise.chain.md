# Promise.chain

## 基本实现

一条一条执行

实现思路:

1. for of 配合 async await
2. 数组的 reduce 方法(进行转换, 转换成 promise1.then(() => {return promise2}) 的形式)

```js
// 题目
function promiseCreator1() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

function promiseCreator2() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

const promiseCreatorList = [promiseCreator1, promiseCreator2];

// 第一种实现
async function main() {
  async function forOfLoop() {
    for (const promiseInstance of promiseCreatorList) {
      await promiseInstance();
    }
  }
  await forOfLoop();
}
main();

// 第二种实现
const promiseChain = promiseCreatorList.reduce((prev, cur) => {
  // 是否是一个 Promise 实例
  if (typeof prev.then === "function") {
    return prev.then(cur);
  }
  // 说明还不是一个 Promise 实例, 说明还在第一次调用嘛, 那这个时候可以调用一下
  return prev().then(cur);
});

// reduce 可以接收第二个参数, 其实我们可以给它一个空的 Promise 实例, 那这样在迭代过程中就可以保证都是 Promise 实例
const promiseChain = promiseCreatorList.reduce((prev, cur) => {
  // .then 本身就接收到一个函数, return 一个 Promise
  return prev.then(cur);
}, Promise.resolve());

// 最后一次返回的值肯定也是一个 Promise 实例
promiseChain.then(() => {
  console.log("end");
});
```

## 变种形式

### 加上域值问题, 比如列表里面有很多 Promise 在执行, 我希望同时执行 2 个这样的 Promise 的函数

#### 如果执行完了不继续填充

#### 如果执行完了进行填充
