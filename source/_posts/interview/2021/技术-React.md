# 技术-React 面

## 快手

1: react16 新增了哪些生命周期、有什么作用，为什么去掉某些 15 的生命周期

2: fiber 怎样的，如何实现异步渲染（链表/可中断）

3: redux 和 redux-saga 的区别和原理

4: useEffect 的实现原理

5: react diff 如何实现? react 旧版的 diff 用深度优先还是广度优先? 为什么用深度优先，广度优先能实现吗? 异步渲染和旧版的 diff 的区别? diff 的时间复杂度？

6: babel 实现转码的过程（词法/语法分析）

7:

8: 小程序底层实现原理了解多少（说了下双线程模型/预加载 webview）

9: 项目 nodeJs 应用异常退出如何处理(pm2/uncaughtException 事件等)、日志上报怎么做（输出重定向到文件，elk 服务传传到 kibana）

10: 有哪些技术驱动业务的案例（说了下这个插件的思路和 webpack 一些优化）

## 拼多多

11: redux 的理念(说了下 action dispatch state 啥的，单向数据流)

12: react-redux 中 connect 怎么实现(高阶组件、context 注入 store、subscribe 订阅 store 数据变化)

13: mixin hoc 继承的区别，优缺点

14: react-router 实现原理(hash/html5 history)

15: 客户端路由 hash/history 实现的区别、原理

16: react mixing hoc 继承 hook 之间的区别/优缺点

17: redux compose 函数做什么的，中间件呢

18: redux-saga 是什么，和 redux-thunk 有什么区别

19: dva 有了解吗

20: umi.js 有用过吗

## 字节

21: 为啥选择了 redux-saga 作为解决方案(解决异步优雅/提供很多工具函数)。redux 的异步中间件方案有哪些，对比。saga 对比 dva？

## 虾皮

22: react 性能优化【描述】【举例】

```
scu生命周期、memo；usememo & usecallback记住一些值不用重新计算；虚拟列表；immutable+scu/memo；原生js；（这块聊了很久了）
```

23: 长列表优化，多种方案及对比【举例】

```
虚拟列表、intersectionobserver、监听滚动长列表+raf（经验之谈，聊了很久）
```

24: diff 算法、key 作用，不要 key 会怎样【描述】

```
树diff、组件diff、元素diff；key可以原地复用，没有key无脑会更新（此时你可以发现，index做key其实会形同虚设）
```

25: react 的 usememo 原理【描述】

```
闭包、缓存、memorize
```

26: 编程题：对象扁平化【编程】(30min)

```
{ a: b: c: { d: 1 }, aa: 2, c: [1, 2] } => { 'a.b.c.d': 1, aa: 2, 'c[0]': 1, 'c[1]': 2 }
我一听到30分钟，心里暗暗的想，给30分钟是不是觉得我很菜啊。不管他，先撸为敬。reduce递归+ ...，写+debug总共4分钟就秒杀了，面试官说你怎么不写了，我说已经ok了。他看了一下，嗯，ok
```

27: react diff 和 vue diff 的差别

28: 运营商劫持怎么处理

29: 设计模式

30: 跨页面通信手段

31: 防抖和节流，防抖手写

32: 
