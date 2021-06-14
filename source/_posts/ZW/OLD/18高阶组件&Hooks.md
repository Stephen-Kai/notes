# 高阶组件

## 介绍

复用组件逻辑, 其实就是一个函数, 输入一个组件, 输出一个组件.

## 作用

1. 渲染劫持
2. state 的抽象和更改
3. props 更改
4. 代码复用, 逻辑抽象

## 实现方法

1. 属性代理
2. 反向代理

## 注意

1. 不要修改原来组件的逻辑

## 命名

1. withXXX

# Hook

## 介绍

有状态组件: class 组件
无状态组件: 函数式组件, 接收 props, 进行展示, 比较简洁

让开发者可以在不写 class 组件的情况下也能够使用 react 新特性, 使函数式组件也能够拥有状态

1. 代码量会比写 class 组件更少
2. 避免地狱式嵌套, 可读性更好(复用组件逻辑, 组件套组件, 用 hook 提取组件可复用逻辑)
3. 使函数式组件也能够拥有状态
4. 解决高阶组件和 render props 的缺点(高阶嵌套, 还有不知道数据来源, 不知道是哪里传进来的)

## 使用

1. useState 会直接替代原先的值(类组件中的 setState 是与原先的状态合并)
2. useEffect(代替 componentDidMount & componentDidUpdate 钩子)
3. useReducer(用 useState 使用对象的话, 容易丢值)
4. useContext(共享数据, 解决 props 层层传递)
5. useRef(获取 dom 元素, 跟 React.createRef 是一样的)
6. useCallback(缓存函数, 应用场景: 把父组件的方法传给子组件, 函数不变, 保持引用不变, 子组件可以做一些优化, 减少不必要的渲染)
7. useMemo(缓存值, 有点像 Vue 的 computed 计算属性, 当依赖值变化才会变化, 对于一些计算量比较大的具有优化效果)
8. React.memo(相当于 shouldComponentUpdate, 和 pureComponent), 将当前的 props 跟之前的 props 进行浅比较, 如果没有变化, 就不会更新
9.

## 自定义 Hook 实现

去把 `ahooks` 给实现一遍.

### 定时器

```js

```

## Hook 原理

### useState 简单实现

将所有的 hooks 都保存在一个全局数组变量中, 每次更新都改变对应下标的数组内容, 这也是为什么 hooks 不能在条件语句中使用, 需要保证更新前后 hooks 的执行顺序不变. (如果有 hooks 在更新时候与之前的执行顺序发生变化, 会导致后面的 hooks 的执行顺序都发生错误, 然后整个都乱了.)

```js
const hooks = []; // 全局的存储hook的变量
let currentIndex = 0; // 全局的, hook 执行下标
function useState(initVal) {
  hooks[currentIndex] = hooks[currentIndex] || initVal; // 判断一下是否需要初始化
  const _currentIndex = currentIndex; // currentIndex 是全局可变的, 需要保存本次执行顺序的下标
  const setState = (newState) => {
    hooks[_currentIndex] = newState; // 赋值, 更新数据
  };
  return [hooks[currentIndex++], setState]; // 为了多次调用hook, 每次执行 currentIndex + 1
}
```

### useEffect 简单实现

```js
const hooks = []; // 存储 hook 变量
const currentIndex = 0; // 全局 hook 下标
// 接收两个参数, callback 回调, depArray 依赖数组
function useEffect(callback, depArray) {
  const hasNoDeps = !depArray; // 判断是否有依赖数组, 如果没有每次都要更新, 即 hasNoDeps 为true, 每次都更新
  const hook = hooks[currentIndex] || {}; // hooks 是 {}
  const deps = hooks && hooks.deps; // undefined
  const hasChangeDeps = deps
    ? !depArray.every((el, i) => el === deps[i])
    : true; // 初始执行一遍
  // 如果依赖数组发生改变或者没有依赖数组
  if (hasChangeDeps || hasNoDeps) {
    callback && callback();
    // 更新 deps
    hooks[currentIndex].deps = depArray;
  }
  currentIndex++;
}
```

## Suspense 异步加载

场景: 比如有的页面, 可能用户根本就没有看, 这个页面还是加载了 或者我们看一个网页, 一个网页可能很长, 有很多资源, 那用户没有浏览到的地方也加载了, 那其实是没有必要的, 那这就有很大的优化空间.

### 解决加载问题

1. webpack 提供了 code spliting 配置去做代码分割
2. import, `import('./app.js').then()`, 动态引入, 返回一个 promise, 那 webpack 就可以做一个动态加载
3. react 提供了 `lazy` api, react 封装了这个行为, 也就是用到了这个组件, 再去加载这个组件.
4. 结合 `Suspense` 在组件未加载回来之前提供 loading 占位等.

```js
const OtherComponent = React.lazy(() => import("./OtherComponent"));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

```js
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";
const Home = lazy(() => import("./routes/Home"));
const UserManage = lazy(() => import("./routes/UserManage"));
const AssetManage = lazy(() => import("./routes/AssetManage"));
const AttendanceManage = lazy(() => import("./routes/AttendanceManage"));
const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/userManage" component={UserManage} />
        <Route path="/assetManage" component={AssetManage} />
        <Route path="/attendanceManage" component={AttendanceManage} />
      </Switch>
    </Suspense>
  </Router>
);
```

## ErrorBoundary 错误边界

### componentDidCatch

有可能 React 中会发生一些错误, 或者像刚刚的异步加载也有可能发生错误, 那就要利用 React 的一个生命周期方法, componentDidCatch, 来捕获错误.

浏览器中有一个自带的工具, 右键 block url, 可以测试如果未加载会怎么样.

要注意: lazy 和 suspense 是一起用的, 如果要测试生产环境的话, 要把 process.env.NODE_ENV 改为 production, 否则在开发环境呢, 直接页面就是奔溃的

```js
state = {
  isError: false,
};

componentDidCatch() {
  this.setState({
    isError: true
  })
}
```

### 静态方法 getDerivedStateFromError

```js
static getDerivedStateFromError(error) {
  return {
    isError: true
  }
}
```

# 文章推荐

[React Hooks 原理](https://zhuanlan.zhihu.com/p/88135310?utm_source=qq&utm_medium=social&utm_oi=998881530932043776)
[Lazy-Suspense](https://www.yuque.com/u1867998/kb/ezt9q1)
