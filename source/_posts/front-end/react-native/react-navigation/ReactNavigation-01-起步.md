---
title: ReactNavigation-01-起步
tag: react-native
catogory:
  - front-end
  - react-native
  - react-navigation
---

# React Navigation 导航系统

React Navigation，是专门为 React Native 的应用打造的路由和导航系统。

## 特点

#### 使用简单

开箱即用，体验超好的内置导航器。

#### 为 iOS 和 Android 构建的组件

兼容 iOS 和 Android 平台，根据特定的平台，打造外观和感觉与平滑的动画和手势。

#### 完全可定制

如果你知道如何使用 JavaScript 编写应用程序，则可以自定义 React 导航的任何部分。

#### 平台扩展特性

React Navigation 在每一层都是可扩展的——你可以编写自己的导航器，甚至可以替换面向用户的 API。

# 起步

如果您已经熟悉 React Native，那么你将能够快速使用 React 导航！如果没有，您可能需要先阅读[React Native Express](http://www.reactnativeexpress.com/)的第 1 到 4 节（包括第 1 到 4 节），完成后再回到这里。

本文档的基础知识部分将介绍 React 导航的最重要方面。它应该足以让您了解如何构建典型的小型移动应用程序，并为你提供深入了解 React 导航更高级部分所需的基础知识。

## 安装

在 React Native 项目中安装所需的软件包：

```
npm install @react-navigation/native
```

React Navigation 由一些核心实用程序组成，应用在 RN 中，可以实现路由导航功能。

我们要安装的模块有 react-native-gesture-handler, react-native-reanimated, react-native-screens,react-native-safe-area-context

### 在 expo 项目里安装

```
npm install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

### 在纯 React Native 项目中安装

在项目根目录下，运行：

```
npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

> 在安装依赖包时可能抛出一些警告，这通常是模块的版本匹配问题。你可以暂时忽略。

From React Native 0.60 and higher, linking is automatic. So you don't need to run react-native link.

自从 React Native 0.60 或更高版本后，会自动做 link。因此你不需要运行 react-native link。

If you're on a Mac and developing for iOS, you need to install pods to complete the linking. Make sure you have Cocoapods installed. Then run:

如果你开发环境是 Mac 的 iOS 系统，你需要安装 pods 来完成 link。确保安装了`Cocoapods`。然后运行：

```
cd ios; pod install; cd ..
```

要完成 react native 手势处理程序的安装，请入口文件（例如 index.js 或 App.js）的顶部添加以下内容（确保它位于文件内容的顶部，并且前面没有其他内容）：

```
import 'react-native-gesture-handler';
```

> 注意：如果你跳过这一步，你的应用程序可能会在生产中崩溃，即使它在开发中运行良好。

Now, we need to wrap the whole app in NavigationContainer. Usually you'd do this in your entry file, such as index.js or App.js:

现在，我们需要将整个组件包裹在 NavigationContainer 组件中。通常入口文件（如 index.js 或 App.js）中执行此操作：

```js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return <NavigationContainer>{/* 其他应用代码 */}</NavigationContainer>;
}
```

> 注意: 当你使用 navigator (比如 navigator 路由栈), 你需要安装路由系统其他的依赖。 如果系统出现 "Unable to resolve module" 错误, 那么就需要在系统中安装这些模块。

现在，你可以运行你的程序在手机或模拟器上了。
