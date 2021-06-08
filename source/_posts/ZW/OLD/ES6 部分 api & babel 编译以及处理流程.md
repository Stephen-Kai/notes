# ES6 部分 api & babel 编译以及处理流程

## ES6 常见 Api

1. let const 定义块级作用域变量, 存在暂时性死区的概念, 那如果用到了, 在 babel 编译中也会是包裹一个 LIFE.
2. 解构, 极大地降低了我们开发的心智负担, 可以对数组进行解构, 或者收集, 举个例子`const a = list[0];rest = list.slice(1)`, 现在呢, `const [a, ...rest] = list`
3. 一个常见的场景呢, 就是可能我们需要同时发多个请求, 那之前的话可能会使用 promise.all, 但是 promise.all 有一个失败了就会进入 reject, 那就需要在每个 promise 都加个 catch, 那现在新增了一个 Promise.allSettled, 那就不用在每个 Promise 加 catch 了, 会在所有 Promise 的实例都执行完了就会进入到 .then 中, 而且可以在结果中拿到每个 Promise 的状态, 这就可以保证每个 Promise 都执行了.
4. for of 接口, 实现原理
5. async await 其实是 generator 的一个语法糖(换了种形式去写 generator), 那编译处理来说呢最后还是以 generator 来实现的, 只是以一种更简便, 直观的形式, 让异步流程能够以同步的方式去编码
6. iterator 接口, 它其实表示的是一类数组结构, 像我们 ES6 新增的 Set, Map 啊, 它们都是表示一类数据结构, 像之前遍历可能不同的数据结构会有自己的遍历方式, 整体来说呢就不够统一, 所以 es6 也出了 iterator 接口, 来统一遍历过程, 一个数据结构只要部署了 Symbol.iterator 属性就能使用 for…of 遍历 与 展开运算符(...) 操作, 中文翻译过来就是遍历器, 为不同的数据结构了提供统一的访问方式, 通过 iterator 接口呢可以对数据结构进行一定次序的访问, 内部的话就是对每一个元素通过指针来进行传递, 通过指针来指向下一个元素, 就是一个链表的结构, 最典型的话就是使用 for of 遍历数组
7. 对不同的数据结构只要实现对应的 iterator 接口, 就可以进行统一的调用
8. 代理跟反射, proxy 就是换了个形式对对象进行拦截跟劫持, 之前要修改对象的属性, 使用的是 Object.defineProperty, 那现在引用了 Reflect, 使用 Reflect 来进行一个替代

```js
const obj = {
  name: "yuyu",
};

const handle = {
  get: function (target, key) {
    return Reflect.get(target, key);
  },
  set: function (target, key, value) {
    Reflect.set(target, key, value);
  },
};

const objProxy = new Proxy(obj, handle);
```

proxy 和 defineProperty, 首先它们都是可以对对象进行拦截操作
proxy 和 defineProperty 的区别:

- defineProperty 只能监听对象的某个属性, 而 proxy 可以进行全对象的监听, 不用设置具体属性, 没有特定 key 的要求
- defineProperty 是修改原对象的属性, 而 proxy 是对原对象进行代理, 会返回一个代理对象, 而且也有配套的 Reflect, 来进行更加语义化的编程
- defineProperty 只能监听已存在的属性，对于新增删除属性就无能为力了，同时无法监听数组的变化, 像 vue 中是重写了数组的几个方法, 然后 vue3 中就用 proxy 重写, proxy 的话就不存在以上的问题, 新增属性可以监听到, 也可以监听到数组的变化
- proxy 的性能会比 defineProperty 更好, 像如果使用 defineProperty 的话可能需要遍历对象的每一个属性，对于性能会有一定的影响

为什么有 Reflect 呢?
Reflect 主要是和 Proxy 配对使用，提供对象语义的默认行为, Reflect 统一来做就行，未来规范的变化或者有什么新增的，也不需要用户额外的做兼容

9. decorator 其实就是跟类进行配套使用, 可以对类进行修饰, 或者像使用 mobx 等一些库, 来对数据进行一些响应, 让代码写起来看起来比较直观

### 经典的面试题

1. for 循环, 我希望在每个元素点击的时候或者调用的时候, 打印当前的下标.

因为 for 循环是同步的, 等调用的时候已经执行完了, 当前的值会是 10, 那常见的解决方案是匿名函数包裹闭包, es6 出现之后就可以使用 let, 这是因为在每一次循环的时候里面的元素都是我们块级作用域的元素, 那就限制在了当前作用域里面 i 的结果, 而不是全局 i 的结果.

```js
var arr = [];

for (var i = 0; i < 10; i++) {
  arr[i] = function () {
    console.log(i);
  };
}

arr[3](); // 10

for (var i = 0; i < 10; i++) {
  (function (i) {
    arr[i] = function () {
      console.log(i);
    };
  })(i);
}

arr[3](); // 3

for (let i = 0; i < 10; i++) {
  arr[i] = function () {
    console.log(i);
  };
}

arr[3](); // 3
```

2. for in 的遍历和 for of 的遍历有什么区别呢？

for in 遍历的是 key, for of 遍历的是 value, 那 for of 还有个特性, 它还可以搭配 async await 来实现数组中 Promise 的执行顺序, 注意, 对象原生没有 iterator, 不能用 for of 遍历, 否则抛错 `TypeError: obj is not iterable`, 可以自己实现一个

通过 next 函数把每次遍历的值返回出来, 通过闭包形式记录了当前指针 index, 然后就可以返回一个对象, 有两部分内容, 一个是当前遍历的结果, 还有一个 done 的标记位标记是否还有下一次结果, 可以通过调用 生成器函数 返回的 迭代器 的 next 方法, 来获得每次迭代的值, 那 for of 其实也是去调用生成器函数, 获得一个迭代器, 不断调用迭代器的 next 方法来实现的

```js
Object.prototype[Symbol.iterator] = function () {
  const values = Object.values(this);
  let index = 0;
  return {
    next: function () {
      if (index < values.length) {
        return { value: values[index++], done: false };
      }
      return { value: void 0, done: true };
    },
  };
};

// 如果使用 generator 函数实现的话
Object.prototype[Symbol.iterator] = function* () {
  const keys = Object.keys(this);

  for (let i = 0; i < keys.length; i++) {
    yield this[keys[i]];
  }
};
```

3.

## ES6 总结

1. 如何判断是否可迭代, 如果是 iterator, 那就写个 for of 了, 然后使用 try catch 包裹一下
2. 对于 let const, 块级作用域, 暂时性死区
3. 对于解构语法呢, 主要是要跟 ES6 里面 import, export 进行一个区分, 同时了解常见的写法
4. promise 新增 allSettled 的方法, 可以减少代码里面冗余部分
5. for of 跟 for in 进行区分
6. iterator 接口, 主要是通过统一接口的形式, 让不同的数据结构达到统一遍历的目的, 就像这里使用 next 指针的形式对数据进行一定次序的遍历, 那像对象这样原生没有实现 iterator 接口的, 我们也可以实现一个 Symbol.iterator 函数, 让它能够通过 for of 进行遍历
7. 那像 proxy 和 Reflect 这块呢, 语言层面上更加语义化一些, 可以使用他们进行代理和反射的操作, 然后 proxy 比 defineProperty 具有一些优势
8. 那像 decorator 呢,

## babel(重点内容)

### 过程

主要是会编译成 AST (Abstract Syntax Tree)

三个步骤(字符串到字符串的过程): 解析 -> 转换 -> 生成

### 



## 参考

[阮一峰老师 ES6 入门](https://es6.ruanyifeng.com/)
[babel](https://babeljs.io/repl)
