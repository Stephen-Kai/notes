# 个人必问面试题 React

## 1. 如何设计 React Hook & React Hook 的好处 & 解决了什么问题 & 常用的 react hook 以及他 的使用场景?

#### 常用的 react hook 以及他 的使用场景?

https://segmentfault.com/a/1190000038878068

1. useState

用于管理页面中的状态，返回当前状态和改变当前状态的方法, 如果需要使用之前的状态, 可以传入一个函数, 可以接受到之前的状态进行处理

2. useReducer

用于保存页面中复杂结构的状态，返回当前状态和改变当前状态的方法 dispath，提供类似 Redux 的功能，当组件中 useState 很多时，可以考虑 useReducer 进行优化, 之前无意中有看到一个文件, 光使用 useState 管理状态就有几十行了, 看到其实是有一点奔溃的

3. useContext

如果页面层级较深，并且需要子组件触发 state 变化，可以考虑 useReducer+useContext 实现，思路就是把 useReducer 返回的 dispatch 函数作为 Context 中的 value 共享到 Context 包裹的所有子组件。

useContext 是以 Hook 的方式使用 React.Context，对它所包含的组件树提供全局共享数据

使用场景的话:

- 提供全局共享方案, 比如我有开发一个需求就是提供全局的应用设置数据, 像 empty 图片等等, 在运营端进行设置, 商家端每一个使用 empty 图片的地方都使用设置的, 那我就是使用了一个 applicationSettingContext, 登录的时候调用接口, 保存在 context 中, 需要使用的地方进行读取
- 开发公共组件时经常是一个组件是由几个小组件拼凑起来的, 使用 context, 解决 props 层层传递的问题

4. useEffect

useEffect(callback,deps)

当 deps 中的内容变化,执行 callback。

给函数式组件提供了像 class 组件中 componentDidMount 和 componentDidUpdate 生命钩子, 常用于 网络请求, 监听事件比如滚动事件等, 同时可以 return 一个函数, 提供清除副作用的能力, 防止内存泄漏, 同时这种方式可以把订阅和清除订阅的逻辑集中在一起

其实像 useEffect 清除副作用的能力是可以来做一些事情的, 比如防抖, 比如说 useEffect 中依赖一个请求函数, 当请求函数(useCallback 包裹)变化时, 调用该函数

```
  // 使用 useEffect 消除副作用的能力来实现防抖(原因: 当useEffect依赖的props和useState值发生变化，都会触发组件重新渲染，那么 useEffect 又会重新执行一遍，生成一个新的防抖后的函数)
  useEffect(() => {
    setLoading(true);
    const timerId = setTimeout(() => {
      getList();
    }, 500);
    return () => clearTimeout(timerId);
  }, [getList]);
```

5. useMemo

useMemo(callback,deps)

当 deps 中的内容变化，执行 callback 并返回结果。
可以缓存结果，一般用于性能优化

6. useCallback

useCallback(callback,deps)

当 deps 中的内容变化，返回 callback 函数。
可以缓存函数，一般用于性能优化

使用场景: https://segmentfault.com/a/1190000020108840

适用场景:

- 需要保存一个函数闭包结果，比如传递给子组件的函数, 需要函数的引用保持不变的场景
- 函数定义时需要进行大量运算, 比较少见

但是 useCallback 并不是提高性能的银弹，错误的使用反而会适得其反，会踩坑的, 比如你使用 useCallback 包裹一个请求函数, 把请求参数都放在了依赖数组中, 但是少写了一项, 那由于闭包那个参数使用的一直是初始值等

7. useRef

{current: initialValue} = useRef(initialValue)

ref 对象在整个生命周期内保持不变，可以通过修改 ref 的 current 属性来进行修改

适用场景:

1. 把 ref 属性绑定到组件上获得组件的引用, 这个是最常见的
2. 还有的话就是像需要在 useEffect 中获取最新值, 但是又不想把它作为依赖项的场景, 我之前就遇到一个, 就是在 useEffect 中调用了一个请求函数, 那个函数中使用到了一个参数, 需要是外部传入的最新的, 但是又不能把这个参数放在 useEffect 中以免重新发出请求, 那就可以使用 useRef

以上是比较常用的 Hook

再给自己加一个没那么常用的

8. useLayoutEffect

使用方法跟 useEffect 一致, 主要是执行时机的区别, 像 useEffect 是在渲染之后执行的, 但是 useLayoutEffect 是在布局完成, 浏览器开始绘制之前执行的, 也就是说这个 Hook 中执行的逻辑其实会阻塞渲染的, 使用场景的话是需要去改变 UI 布局的操作, 可以使用它来读取 DOM 布局并同步触发重渲染, 以免放在 useEffect 中执行会发生闪屏的情况, 但是尽可能使用标准的 useEffect 以避免阻塞视觉更新

#### 解决了什么问题？以及它的好处?

解析: https://juejin.cn/post/6844903985338400782

1. 解决组件间复用状态逻辑的问题

之前: 将可复用性行为“附加”到组件方案: render props 和 高阶组件

问题点: 需要重新组织组件结构, 那如果有很多抽象层组成的组件会形成“嵌套地狱”, 但这说明了一个更深层次的问题：React 需要为共享状态逻辑提供更好的原生途径

解决: 使用 hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用, 平铺的形式, 组件树层级变浅

2. 解决复杂组件变得难以理解的问题

之前: 开发一些组件, 起初很简单, 但是逐渐加功能会被状态逻辑和副作用充斥, 像 componentDidMount 钩子中可能会包含请求数据, 事件监听等逻辑, 之后需在 componentWillUnmount 中清除

问题点: 完全不相关的代码却在同一个方法中组合在一起, 订阅和取消订阅的逻辑不集中, 如此很容易产生 bug

解决: Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据），而并非强制按照生命周期划分, 事件监听可以在 useEffect 中, 同时可以 return 一个函数来清除副作用, 方便统一管理

3. 使函数式组件也可以拥有状态, 使开发者在非 class 的情况下可以使用更多的 React 特性

4. Hook(React 16.8) 和现有代码可以同时工作，你可以渐进式地使用他们

5. 不用考虑像 class 组件中 this 指向的问题

6. 开发者也不用去记那么多名字很长的生命周期函数

7. 而且允许开发者 自定义 Hook, 将组件逻辑提取到可重用的函数中

#### 自定义 Hook 设计规则 ?

使用 hook eslint 插件, https://www.npmjs.com/package/eslint-plugin-react-hooks 确保上面 2 条规则

通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。

###### 首先先讲一个 Hook 规则吧:

1. 只在最顶层使用 Hook

因为 React 判断哪个 state 对应哪个 useState, 靠的是 Hook 调用的顺序, 如果把 Hook 放在像 if 条件中这样, 那假设第一次满足条件为 true, 这个 Hook 执行, 第二次不满足条件会跳过, 后面的 Hook 调用都被提前执行，导致 bug 的产生

解决: 如果我们想要有条件地执行一个 effect，可以将判断放到 Hook 的内部

2. 只在 React 函数中调用 Hook, 不要在普通的 JavaScript 函数中调用 Hook(why 呢?)

在 React 的函数组件中调用 Hook

在自定义 Hook 中调用其他 Hook

###### 自定义 Hook 设计:

1.  自定义 Hook 是一个函数，其名称必须以 “use” 开头，这样 React 自动检查你的 Hook 是否违反了 Hook 规则

## 3. 有了解 React Fiber 吗?

## 4. 你是如何理解 React 的?
