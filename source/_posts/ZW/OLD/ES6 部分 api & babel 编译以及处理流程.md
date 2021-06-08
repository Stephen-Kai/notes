# ES6 部分 api & babel 编译以及处理流程

## ES6 常见 Api

1. let const 定义块级作用域变量, 存在暂时性死区的概念, 那如果用到了, 在 babel 编译中也会是包裹一个 LIFE.
2. 解构, 极大地降低了我们开发的心智负担, 可以对数组进行解构, 或者收集, 举个例子`const a = list[0];rest = list.slice(1)`, 现在呢, `const [a, ...rest] = list`
3. 一个常见的场景呢, 就是可能我们需要同时发多个请求, 那之前的话可能会使用 promise.all, 但是 promise.all 有一个失败了就会进入 reject, 那就需要在每个 promise 都加个 catch, 那现在新增了一个 Promise.allSettled, 那就不用在每个 Promise 加 catch 了, 会在所有 Promise 的实例都执行完了就会进入到 .then 中, 而且可以在结果中拿到每个 Promise 的状态, 这就可以保证每个 Promise 都执行了.
4. for of 接口, 实现原理
5. async await 其实是 generator 的一个语法糖(换了种形式去写 generator), 那编译处理来说呢最后还是以 generator 来实现的, 只是以一种更简便, 直观的形式, 让异步流程能够以同步的方式去编码
6. iterator 接口, 它其实表示的是一类数组结构, 像我们 ES6 新增的 Set, Map 啊, 它们都是表示一类数据结构, 像之前遍历可能不同的数据结构会有自己的遍历方式, 整体来说呢就不够统一, 所以 es6 也出了 iterator 接口, 来统一遍历过程, 一个数据结构只要部署了 Symbol.iterator 属性就能使用 for…of 遍历 与 展开运算符(...) 操作, 中文翻译过来就是遍历器, 为不同的数据结构了提供统一的访问方式, 通过 iterator 接口呢可以对数据结构进行一定次序的访问, 内部的话就是对每一个元素通过指针来进行传递, 通过指针来指向下一个元素, 就是一个链表的结构, 最典型的话就是使用 for of 遍历数组
7. 对不同的数据结构只要实现对应的 iterator 接口, 就可以进行统一的调用
8. 

### 经典的面试题

1. for 循环, 我希望在每个元素点击的时候或者调用的时候, 打印当前的下标.

因为 for 循环是同步的, 等调用的时候已经执行完了, 当前的值会是 10, 那常见的解决方案是匿名函数包裹闭包, es6 出现之后就可以使用 let, 这是因为在每一次循环的时候里面的元素都是我们块级作用域的元素, 那就限制在了当前作用域里面 i 的结果, 而不是全局 i 的结果.

```
var arr = [];

for(var i = 0; i < 10; i ++) {
    arr[i] = function() {
        console.log(i);
    }
}

arr[3](); // 10

for(var i = 0; i < 10; i ++) {
    (function(i) {
        arr[i] = function() {
            console.log(i);
        }
    })(i);
}

arr[3](); // 3

for(let i = 0; i < 10; i ++) {
    arr[i] = function() {
        console.log(i);
    }
}

arr[3](); // 3

```

2. for in 的遍历和 for of 的遍历有什么区别呢？

for in 遍历的是 key, for of 遍历的是 value, 那 for of 还有个特性, 它还可以搭配 async await 来实现数组中 Promise 的执行顺序, 注意, 对象原生没有 iterator, 不能用 for of 遍历, 否则抛错 `TypeError: obj is not iterable`, 可以自己实现一个

通过 next 函数把每次遍历的值返回出来, 通过闭包形式记录了当前指针 index, 然后就可以返回一个对象, 有两部分内容, 一个是当前遍历的结果, 还有一个 done 的标记位标记是否还有下一次结果, 可以通过调用 生成器函数 返回的 迭代器 的 next 方法, 来获得每次迭代的值, 那 for of 其实也是去调用生成器函数, 获得一个迭代器, 不断调用迭代器的 next 方法来实现的

```
Object.prototype[Symbol.iterator] = function () {
    const values = Object.values(this);
    let index = 0;
    return {
        next: function() {
            if(index < values.length) {
                return {value: values[index ++], done: false};
            }
            return {value: void 0, done: true}
        }
    }
}

// 如果使用 generator 函数实现的话
Object.prototype[Symbol.iterator] = function * () {
    const keys = Object.keys(this);

    for(let i = 0; i < keys.length; i ++) {
        yield this[keys[i]]
    }

}
```

3. 

## babel 重点

主要是会编译成 AST (Abstract Syntax Tree)

## 参考

[阮一峰老师 ES6 入门](https://es6.ruanyifeng.com/)
[babel](https://babeljs.io/repl)
