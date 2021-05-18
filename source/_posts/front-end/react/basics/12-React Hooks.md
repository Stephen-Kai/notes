---
title: 12-React Hooks
tag: react
catogory:
  - front-end
  - react
---

# React Hooks

React Hooks 是 React `16.7.0-alpha` 版本推出的新特性, 有了 React Hooks，在 react 函数组件中，也可以使用类组件（classes components）的 state 和 组件生命周期。通过下面几个例子来学习 React Hooks。

- State Hook

```jsx
// useState是react包提供的一个方法
import React, { useState } from "react";
import ReactDOM from "react-dom";

const Counter = () => {
  // useState 这个方法可以为我们的函数组件拥有自己的state，它接收一个用于初始 state 的值，返回一对变量。这里我们把计数器的初始值设置为0, 方法都是以set开始
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>你点击了{count}次</p>
      <button onClick={() => setCount(count + 1)}>点击</button>
    </div>
  );
};

const rootElement = document.getElementById("root");

ReactDOM.render(<Counter />, rootElement);
```

- Effect Hook

```jsx
// useState是react包提供的一个方法
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Counter = () => {
  // useState 这个方法可以为我们的函数组件拥有自己的state，它接收一个用于初始 state 的值，返回一对变量。这里我们把计数器的初始值设置为0, 方法都是以set开始
  const [count, setCount] = useState(0);
  // 类似于componentDidMount或者componentDidUpdate:
  useEffect(() => {
    // 更改网页的标题，还可以做其它的监听
    document.title = `你点击了${count}次`;
  });
  return (
    <div>
      <p>你点击了{count}次</p>
      <button onClick={() => setCount(count + 1)}>点击</button>
    </div>
  );
};

const rootElement = document.getElementById("root");

ReactDOM.render(<Counter />, rootElement);
```

- React Hooks 的规则
  - 只能在**顶层**调用 Hooks。不要在循环，条件或嵌套函数中调用 Hook。
  - 不要从常规 JavaScript 函数中调用 Hook。只在 React 函数式组件调用 Hooks。
- 自定义 hooks 可以选择讲解
- react 内置 hooks api
  - [Basic Hooks](https://reactjs.org/docs/hooks-reference.html#basic-hooks)
    - [`useState`](https://reactjs.org/docs/hooks-reference.html#usestate)
    - [`useEffect`](https://reactjs.org/docs/hooks-reference.html#useeffect)
    - [`useContext`](https://reactjs.org/docs/hooks-reference.html#usecontext)
  - [Additional Hooks](https://reactjs.org/docs/hooks-reference.html#additional-hooks)
    - [`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer)
    - [`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback)
    - [`useMemo`](https://reactjs.org/docs/hooks-reference.html#usememo)
    - [`useRef`](https://reactjs.org/docs/hooks-reference.html#useref)
    - [`useImperativeHandle`](https://reactjs.org/docs/hooks-reference.html#useimperativehandle)
    - [`useLayoutEffect`](https://reactjs.org/docs/hooks-reference.html#uselayouteffect)
    - [`useDebugValue`](https://reactjs.org/docs/hooks-reference.html#usedebugvalue)
