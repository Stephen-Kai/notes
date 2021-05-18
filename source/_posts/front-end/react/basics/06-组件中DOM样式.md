---
title: 06-组件中DOM样式
tag: react
catogory:
  - front-end
  - react
---

# 组件中 DOM 样式

- 行内样式

想给虚拟 dom 添加行内样式，需要使用表达式传入样式对象的方式来实现：

```jsx
// 注意这里的两个括号，第一个表示我们在要JSX里插入JS了，第二个是对象的括号
<p style={{ color: "red", fontSize: "14px" }}>Hello world</p>
```

行内样式需要写入一个样式对象，而这个样式对象的位置可以放在很多地方，例如`render`函数里、组件原型上、外链 js 文件中

- 使用`class`

React 推荐我们使用行内样式，因为 React 觉得每一个组件都是一个独立的整体

其实我们大多数情况下还是大量的在为元素添加类名，但是需要注意的是，`class`需要写成`className`（因为毕竟是在写类 js 代码，会收到 js 规则的现在，而`class`是关键字）

```jsx
<p className="hello" style={this.style}>
  Hello world
</p>
```

- 不同的条件添加不同的样式

有时候需要根据不同的条件添加不同的样式，比如：完成状态，完成是绿色，未完成是红色。那么这种情况下，我们推荐使用[classnames](https://www.npmjs.com/package/classnames)这个包：

- css-in-js

`styled-components`是针对 React 写的一套 css-in-js 框架，简单来讲就是在 js 中写 css。[npm 链接](https://www.npmjs.com/package/styled-components)
