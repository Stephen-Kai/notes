# CommonJS 原理

明确了是 Node.js 运行时的一个 require 方法, 自己实现一个

可以看到, require.js 是通过给包裹的函数注入 module, module.exports, 包裹的函数通过 module 和 exports 接收到外部的引用地址, 外部 return 的是 module.exports 的内容

问题:

1. 为什么 exports 也可以导出？

答: CommonJS 规范中的 require 函数会返回 module.exports, 在给函数包裹时注入了 module.exports, exports 接收到了 module.exports 的引用, 故可以在 module.exports 挂载内容

2. 为什么 exports = {} 之后就在外部接收不到导出的值了呢？

答: 因为 require 其实返回的是 module.exports, exports 是通过指向 module.exports 来实现导出的, 而给 exports 赋值为对象后修改了引用

```js
// module.js
module.exports = {
  hello: "please tell me your name ～",
};

// require.js
// 一开始呢, 只有两种作用域, 全局作用域 & 函数作用域
// 所以要解决不同模块间变量命名冲突呢, 有两种形式, 一种是给每个变量重命名, 全局变量唯一的一个标识
// 但是上面的方法很麻烦, 所以可以使用函数作用域, 给每一个模块呢, 用函数进行包裹, 这样就可以隔离每个模块的作用域

const path = require("path");
const fs = require("fs");
const vm = require("vm"); // 虚拟机

function r(fileName) {
  // 接收到相对路径, 拼接出绝对路径, 因为绝对路径比较严谨, 在 Node.js 中最好使用绝对路径, 避免产生一些错误
  const pathToFile = path.resolve(__dirname, fileName);
  const content = fs.readFileSync(pathToFile, "utf-8");

  const wrapper = ["(function(require, module, exports) {", "})"];

  // 给文件内容包裹一个函数
  const wrapperContent = wrapper[0] + content + wrapper[1];

  console.log(typeof content, content); // string module.exports = {hello: 'please tell me your name ～'}

  // 把代码从一个字符串变成了可执行的代码块
  const script = new vm.Script(wrapperContent, {
    filename: "index.js",
  });

  console.log(typeof script, script); // object Script {}

  // 编译代码，在当前全局变量的上下文中运行代码(不往全局挂, 以免其他文件就会收到影响)
  const result = script.runInThisContext();

  const module = {
    exports: {},
  };

  result(r, module, module.exports);

  return module.exports;
}

const content = r("./module.js");
console.log(content); // { hello: 'please tell me your name ～' }
```
