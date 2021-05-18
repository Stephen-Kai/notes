---
title: 01-Electron介绍
tag: electron
catogory:
  - front-end
  - electron
---

# Electron 介绍

### 1、概览

想必你已经听说了可以应用 electron 来构建令人惊叹的桌面应用程序！

<img src="/assets/images/electron/basics/Snip20200301_16.png" style="width:500px;">

单纯使用 JavaScript API 就可以构建 Mac, windows 或者 Linux 应用程序。

长期以来，很多开发语言都保留了生成桌面应用程序的功能，比如 C 和 Java，但是用这些语言来构建应用程序是非常困难的。

<img src="/assets/images/electron/basics/Snip20200301_17.png" style="width:500px;">

当然，近年来，构建本地应用程序变的更加灵活，但您仍然需要为每个操作系统学习不同的语言并使用非常特定的工具进行开发。

<img src="/assets/images/electron/basics/Snip20200301_18.png" style="width:500px;">

而如今，在 Mac，Windows 和 Linux 系统上，应用 Electron 技术，可以使我们前端开发人员运用现有的知识来解决这个问题了。

我们利用 JavaScript，HTML 和 CSS 这些 Web 技术来构建单个应用程序，然后为 Mac windows 和 Linux 编译该应用程序。

<img src="/assets/images/electron/basics/Snip20200301_20.png" style="width:500px;">

这样，我们就不用为特定的平台维护不同的应用程序了。

此外，我们还可以使用我们喜欢的框架和库来实现这个程序，比如 Vue, React 等前端框架。

<img src="/assets/images/electron/basics/Snip20200301_21.png" style="width:500px;">

Electron 开发利用的是纯 Web 技术，她基于 Chromium 和 Node.js, 让你可以使用 HTML, CSS 和 JavaScript 构建应用。

<img src="/assets/images/electron/basics/Snip20200301_22.png" style="width:500px;">

Electron 完全开源，她是一个由 GitHub 及众多贡献者组成的活跃社区共同维护的开源项目。

<img src="/assets/images/electron/basics/Snip20200301_23.png" style="width:500px;">

Electron 完全跨平台，她兼容 Mac、Windows 和 Linux，可以构建出三个平台的应用程序。

<img src="/assets/images/electron/basics/Snip20200301_25.png" style="width:500px;">

如果你可以建一个网站，你就可以建一个桌面应用程序。 Electron 是一个使用 JavaScript, HTML 和 CSS 等 Web 技术创建原生程序的框架，它负责比较难搞的部分，你只需把精力放在你的应用的核心上即可。Electron,一定比你想象的更简单！！

<img src="/assets/images/electron/basics/Snip20200301_26.png" style="width:500px;">

Electron 最初为 GitHub 开发 Atom 编辑器, 此后被世界各地的公司采纳。比如 Slack, 甚至微软自己的 Visual Studio。

<img src="/assets/images/electron/basics/Snip20200301_27.png" style="width:500px;">

我们先来[搭建一个 Electron 的运行环境](02-搭建Electron运行环境.md)。

### 2、Electron 原理

在深入学习 Eelectron 之前，我们有必要了解一下 Electron 的应用架构。

Electron 运行在两类进程中，一类是主进程，一类是渲染进程
我们要知道，electron 是基于 chromium 才能工作的，那我们就先简单看下 chromium 架构：

<img src="/assets/images/electron/basics/Snip20200301_29.png" style="width:500px;">

chromium 运行时有一个 Browser Process，以及一个或者多个 Renderer Process。Renderer Process 顾名思义负责渲染 Web 页面。Browser Process 则负责管理各个 Renderer Process 以及其他部分（比如菜单栏，收藏夹等等）。

我们再来看看 electron 在 chromium 的基础上做了什么：

<img src="/assets/images/electron/basics/Snip20200301_30.png" style="width:500px;">

- Renderer Process

在 electron 中，仍然使用 Renderer Process 渲染页面，也就是说 electron app 使用 Web 页面作为 UI 显示，并且兼容传统的 Web 页面。不同的是 electron app 开发者可以可选的配置是否支持 Node.js。

- Main Process

electron 对 Browser Process 改动较大，干脆另起一个名字叫 Main Process。Main Process 除了原来 chromium 的 runtime，又添加了 Node.js 的 runtime，main.js 便运行在此之上。

electron 将 Node.js 的 message loop 和 chromium 联系起来，使得 js 中可以灵活的控制页面显示，以及和 Renderer Process 的 IPC 通信。 进程间通信(IPC,Inter-Process Communication)指至少两个进程或线程间传送数据或信号的一些技术或方法。
当然原生的 Node API 和第三方的 node module 同样支持，并且有 electron API 提供给开发者控制原生菜单和通知等。
有一点需要注意，Browser Process 本来没有 js 运行时，所以还需要依赖 V8（当然这是 chromium 中的 V8，不是单独的 V8 库）。

<img src="/assets/images/electron/basics/Snip20200301_31.png" style="width:500px;">

总结一下，一个 Main Process(主进程），一个或多个 Rederer(渲染进程) 构成了 Electron 的运行架构。
我们姑且把主进程叫 Server-side 服务端，将 rederen process 叫客户端。

- electron 使用 Node.js 原生模块

<img src="/assets/images/electron/basics/Snip20200301_32.png" style="width:500px;">
<img src="/assets/images/electron/basics/node.png" style="width:500px;">

Node.js 原生模块是用 C++ 编写的 Node.js 扩展。C++ 源码通过 node-gyp 编译为 .node 后缀的二进制文件（类似于 .dll 和 .so）。在 Node.js 环境中可以直接用 require() 函数将 .node 文件初始化为动态链接库。一些 npm 包会包含 C++ 扩展，例如： node-ffi、node-iconv、node-usb，但都是源码版本，在安装后需要编译后才能被 Node.js 调用。
Electron 同样也支持 Node 原生模块，但由于和官方的 Node 相比使用了不同的 V8 引擎，如果你想编译原生模块，则需要手动设置 Electron 的 headers 的位置。
