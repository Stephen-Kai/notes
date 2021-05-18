---
title: 16-React Router
tag: react
catogory:
  - front-end
  - react
---

# React Router

React Router 现在的版本是 5, 于 2019 年 3 月 21 日搞笑的发布，[搞笑的官网链接](https://reacttraining.com/blog/react-router-v5/)， 本来是要发布 4.4 的版本的，结果成了 5。从 4 开始，使用方式相对于之前版本的思想有所不同。之前版本的思想是传统的思想：**路由应该统一在一处渲染**， Router 4 之后是这样的思想：**一切皆组件**

React Router 包含了四个包:

| 包名                                                                                                            | Description                                                                                         |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [`react-router`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router)               | React Router 核心 api                                                                               |
| [`react-router-dom`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom)       | React Router 的 DOM 绑定，在浏览器中运行不需要额外安装`react-router`                                |
| [`react-router-native`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-native) | [React Native](https://facebook.github.io/react-native/) 中使用，而实际的应用中，其实不会使用这个。 |
| [`react-router-config`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-config) | 静态路由的配置                                                                                      |

主要使用`react-router-dom`

## 使用方式

正常情况下，直接按照[官网](https://reacttraining.com/react-router/web/guides/quick-start)的 demo 就理解 路由的使用方式，有几个点需要特别的强调：

- Route 组件的 exact 属性

`exact`属性标识是否为严格匹配， 为`true`是表示严格匹配，为`false`时为正常匹配。

- Route 组件的 render 属性而不是 component 属性

怎么在渲染组件的时候，对组件传递属性呢？使用`component`的方式是不能直接在组件上添加属性的。所以，React Router 的`Route`组件提供了另一种渲染组件的方式 `render`, 这个常用于页面组件级别的权限管理。

- 路由的参数传递与获取
- Switch 组件

总是渲染第一个匹配到的组件

- 处理 404 与默认页
- withRoute 高阶组件的使用
- 管理一个项目路由的方法
- [code spliting](https://reacttraining.com/react-router/web/guides/code-splitting)
- HashRouter 和 BrowserRouter 的区别，前端路由和后端路由的区别。这个在 Vue 里应该有讲过了。

## React Router 基本原理

React Router 甚至大部分的前端路由都是依赖于[`history.js`](https://github.com/browserstate/history.js)的，它是一个独立的第三方 js 库。可以用来兼容在不同浏览器、不同环境下对历史记录的管理，拥有统一的 API。

- 老浏览器的 history: 通过`hash`来存储在不同状态下的`history`信息，对应`createHashHistory`，通过检测`location.hash`的值的变化，使用`location.replace`方法来实现 url 跳转。通过注册监听`window`对象上的`hashChange`事件来监听路由的变化，实现历史记录的回退。
- 高版本浏览器: 利用 HTML5 里面的 history，对应`createBrowserHistory`, 使用包括`pushState`， `replaceState`方法来进行跳转。通过注册监听`window`对象上的`popstate`事件来监听路由的变化，实现历史记录的回退。
- node 环境下: 在内存中进行历史记录的存储，对应`createMemoryHistory`。直接在内存里`push`和`pop`状态。
