# UMD 规范检测

兼容的模块化解决方案, 同构的解决方案, 一份代码可以在不同的平台上运行, 使用 UMD, 模块可以运行在 浏览器端, 也可以运行在 Node.js 服务器端.

实现: 判断一下这些模块化规范的特征值, 判断当前在哪一个模块化规范特征的环境下, 再把模块内容按照检测出的模块化规范的语法导出即可.

```js
(function (self, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    // 当前环境是 CommonJS 规范环境
    module.exports = factory();
  } else if (typeof define === "function" && typeof define.amd) {
    // 当前环境是 AMD 规范环境
    define(factory);
  } else {
    // 当前什么环境都不是, 直接挂在全局对象上
    self.umdModule = factory();
  }
})(this, function () {
  return function () {
    return Math.random();
  };
});
```
