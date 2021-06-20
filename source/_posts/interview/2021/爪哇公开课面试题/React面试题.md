# React 面试题

## react fiber

是否有足够的求知欲, 对新知识的敏感度, 对 react 原理的了解.

### 为什么要设计 react fiber 这个架构呢?

为了使 react 渲染的过程中可以被中断, 可以将控制权交还给浏览器, 可以让位给高优先级的任务, 浏览器空闲后再恢复计算.
(比如之前一段计算量比较大的 js 代码, 可能要全部执行完了才会执行下一个任务, 那长时间不渲染, 可能浏览器会有点卡顿, 那 fiber 就可以把任务分块, 放在每帧中)

#### 假设

```js
const tasks = []; // 那整整阻塞 100s, 只考虑同步的

function run() {
  let task;
  while ((task = tasks.shift())) {
    execute(task); // 10s
  }
}
```

#### generator 中断 & 恢复

es6 中提供了 generator, 可以中断 & 恢复

yeild 中断
next 恢复

```js
const tasks = []; // 那整整阻塞 100s, 只考虑同步的

function* run() {
  let task;
  while ((task = tasks.shift())) {
    if (hasHighPriorityTask()) {
      // 是否有高优先级的任务, 有, 暂停
      yeild;
    }
    execute(task); // 10s
  }
}
```

#### 为什么不直接使用 generator 来实现中断暂停呢?

首先所有的功能都是在之前的基础上叠加的.

react issues

1. 要把涉及到的所有代码都包装成 generator 的形式, 非常麻烦, 工作量非常大
2. generator 内部是有状态的

```js
function* doWork(a, b, c) {
  const x = yeild doWorkA();
  const y = yeild doWorkB();
  const c = yeild doWorkC(x, y);
}
```

如果已经执行了 a, b, 还未执行 c,而 b 被更新了, 那在新的时间分片里, 我们只能使用原来的 x, y 结果

#### 如何判断是否有高优先级任务

1. 当前 js 环境没办法判断是否有高优先级任务
2. 只能约定一个合理的时间, 当超过了这个时间, 如果这个任务还没有执行完, 中断当前任务, 将控制权交还给浏览器.

每秒 60 帧, 每帧大约 16 ms

requestIdleCallback 让浏览器在有空的时候执行回调, 这个回调会传入参数, 表示浏览器有多少时间供我们执行任务

#### 那浏览器什么时候有空呢?

浏览器每帧的时间做完了本职工作后, 剩余的时间就是空闲时间

那比如浏览器要处理以下内容:

处理用户输入
js 的执行事件
requestAnimation 调用
布局 layout
绘制 paint

16ms - 10ms

6ms -> requestIdleCallback

16ms - 16ms

0ms -> requestIdleCallback

#### 那浏览器很忙怎么办?

requestIdleCallback timeout 参数, 100ms, 如果超过这个 timeout 参数, 回调还没有执行, 那么会在下一帧强制执行回调.

16ms
16ms
...
16ms (超过 100ms)
强制执行回调

#### 兼容性

requestIdleCallback 的兼容性很差, 通过 messageChannel 模拟实现 requestIdleCallback 的功能.

#### timeout 超时后一定要被执行吗?

不是的.

react 预订了 5 个优先级的等级

- Immediate 最高优先级, 这个优先级应该马上执行, 不应该被中断
- UserBlocking 这些通常是用户交互的结果, 比如点击一个按钮, 需要及时得到反馈
- Normal 比如网络请求, 它不是那么急, 不是用户立即感受到的变化, 但是需要执行
- Low 这些任务可以延后, 但是最终也需要执行
- Idle 可以被无限期延后

如果优先级相同, 一定会有一个推入队列的先后顺序的

## 平时用过高阶组件吗? 什么是高阶组件? 高阶组件用来干什么?

高阶组件简称 HOC(High Order Component)

1. 一个函数
2. 入参是一个原来的 react 组件
3. 返回值是一个新的 react 组件
4. 是一个纯函数, 不应该有任何的副作用(如果出现副作用, 后面有什么问题更难排查)

### 例子

```js
function helloWorld() {
  const name = sessionStorage.getItem("name");
  console.log(`hello, ${name}`);
}
function byeWorld() {
  const name = sessionStorage.getItem("name");
  console.log(`bye, ${name}`);
}
```

```js
function helloWorld(name) {
  console.log(`hello, ${name}`);
}
function byeWorld(name) {
  console.log(`bye, ${name}`);
}
function Wrapper(func) {
  const tmpFun = () => {
    const name = sessionStorage.getItem("name");
    func(name);
  };
  return tmpFun;
}

const wHelloWorld = Wrapper(helloWorld);
const wByeWorld = Wrapper(byeWorld);

wHelloWorld();
wByeWorld();
```

### 怎么写一个高阶组件?

1. 普通方式
2. 装饰器(接收原有的函数, 在装饰器中做一些劫持或者增强之类的东西, 再返回一个函数)
3. 多个高阶组件组合

### 高阶组件能用来干什么呢?

不是类的话用不了装饰器

1. 属性代理
   1.1 操作 props
   1.2 操作组件实例, 一个高阶组件获取 ref, 就可以取得对应 ref 的状态等等
2. 渲染劫持(继承/劫持), 用的场景主要是要对比如需要对组件的某一个方法去做一些处理, 比如已经封装了一层公共组件, 不太好改公共组件, 那就自己写一个高阶组件

## 什么是 react hooks, react hooks 有什么优势?

可以在不写 class 组件的情况下, 也能使用 state 和 其他 react 特性(推函数式组件)

### 为什么不写 class 而转向了 hooks 的写法?

#### class 的缺点:

1. 组件间的状态逻辑很难复用

组件间如果有 state 的逻辑是相似的, class 模式下基本上是使用高阶组件来解决的, 虽然也能解决问题, 但是我们需要在组件外层再包一层元素, 会导致层级非常冗余.

2. 复杂业务的有状态组件会越来越复杂

3. 监听和定时器的操作, 会分散在多个区域

比如 didMount 的时候去监听

unMount 的时候要去销毁

就相当于一段逻辑分散在了多个区域, 不够耦合, 如果是我们自己写的可能记得, 那如果后面由别人来维护, 就可能别人不太清楚对应的逻辑, 出现冗余代码啊 bug 啊或者等等

4. this 的指向问题

在 constructor 中 bind this
定义函数时使用箭头函数(定义时确定了 this)

```js
// render 里bind每次都会返回一个新函数, 造成 ChildComponent 每次都会重新渲染
onClick={this.handleClick.bind(this)}
```

#### hooks 的优点

1. 逻辑封装在一个函数中, 可以在需要复用的地方调用
2. 状态逻辑如果很复杂, 可以写在多个 hook 里面, 不用修改组件 dom 结构
3. 事件监听和事件销毁聚合在一个代码块内, 不用在各个生命周期里面书写, 代码耦合性更强,
4. 利于业务逻辑的封装和拆分, 可以非常自由的组合各种自定义 hooks(自己封装 react hook 的逻辑)

#### react hook 的使用注意事项

1. 只能在函数内部的最外层调用 hook, 不要在循环, 条件判断或者子函数中调用
2. 只能在 React 的函数组件调用, 不能在其他 js 函数中调用

#### 为什么 hooks 不能在循环, 条件判断或者子函数中调用?

#### 为什么 useEffect 的第二个参数为 [], 就相当于 componentDidMount 只执行一次?

#### 自定义 hook 是怎么操作组件的?

#### 手写 useState

#### 手写 useEffect

## 安利

1. 三餐免费
2. 公司附近范围内房租免费
3. 头条, 广告, 抖音, 文档等等涉猎比较广
4. 机会比较多
5. 字节有可能会取消大小周
6. B 端微前端, C 端可能性能方面的东西了
7. 每面都有算法, 不要抱有侥幸
8. Node 如果简历没写, 可能是 Webpack 的东西了
9. 算法要记得刷啊

## 交谈

1. 拒了 offer 可以去吗?

可以去吗?

可以, 但是, 肯定不是说入职前几天说不去, 然后又去之类的

2. tcp

3. 前期肯定要涉及广度, 3 + 以上你就一定是要在某一个领域比较有见解

4. 算法

5. 整个面试才 25 分钟

我觉得常规的时间是 40 - 1 个小时, 如果只有 25 分钟, 那可能够呛
