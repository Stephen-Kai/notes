---
title: eslint+prettier+editorconfig+lint-staged 代码规范配置
tag: 前端工程化
catogory:
  - front-end
  - 前端工程化
  - 代码规范
---

# 前端代码规范实际：

##### 通过 eslint 来进行代码告警，prettier 来进行代码规范，editorconfig 来进行编辑器风格覆盖，lint-staged 来进行 pre-commit 钩子捕捉，限制提交

eslint（包括其他一些 lint 工具）的主要功能包含代码格式的校验，代码质量的校验。而 Prettier 只是代码格式的校验（并格式化代码），不会对代码质量进行校验。代码格式问题通常指的是：单行代码长度、tab 长度、空格、逗号表达式等问题。而代码质量问题指的是：未使用变量、三等号、全局变量声明等问题。

## eslint

1: 安装 eslint

```js
npm install eslint --save-dev
```

2: 设置一个配置文件，通过运行 eslint --init 就会在根目录生成一个初始化的配置文件

```js
./node_modules/.bin/eslint --init
```

3: .eslintrc.js 配置

```js
/**
 * eslint 配置: @see https://eslint.org/docs/user-guide/configuring/language-options
 * .eslintrc.js 输出一个配置对象
 * .eslintrc.yaml 定义配置的结构
 * .eslintrc.yml 定义配置的结构
 * .eslintrc.json 定义配置的结构，允许 JavaScript 风格的注释
 * package.json 在 package.json 里创建一个 eslintConfig属性，在那里定义你的配置
 */

module.exports = {
  // env 关键字指定你想启用的环境，并设置它们为 true
  env: {
    // 启用浏览器
    browser: true,
    // 启用node环境
    node: true,
    // 引入的新es2021环境
    es2021: true,
  },
  /**
   * globals 配置属性设置为一个对象，该对象包含以你希望使用的每个全局变量
   *      对应的值设置为 "writable" 以允许重写变量
   *      "readonly" 不允许重写变量
   */
  globals: {},
  /**
   * 共享配置旨在与文件extends功能一起使用.eslintrc @see https://eslint.org/docs/developer-guide/shareable-configs
   * plugin与extend的区别：extend提供了eslint现有规则的一系列预设, plugin则提供了除预设之外的自定义规则
   */
  extends: [
    // 该配置项启用一系列核心规则，这些规则报告一些常见问题，即在(规则页面)中打勾的规则
    "eslint:recommended",
    // eslint-plugin-react 的 可共享配置包 plugin：包名/配置名称
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  //  指定解析器选项
  parserOptions: {
    // 指示您要使用哪些其他语言功能
    ecmaFeatures: {
      //允许在全局作用域下使用return语句
      globalReturn: false,
      //启用全局严格模式（如果ecmaVersion大于等于5）
      impliedStrict: false,
      // jsx-启用JSX
      jsx: true,
    },
    // 指定要使用的ECMAScript语法的版本 2021（与12相同）, 默认为5
    ecmaVersion: 12,
    // sourceType-设置为"script"（默认），或者"module"代码在ECMAScript模块中
    sourceType: "module",
  },
  // plugins 关键字来存放插件名字的列表。插件名称可以省略 eslint-plugin- 前缀
  plugins: ["react", "@typescript-eslint", "prettier"],
  /**
   * 配置规则 @see https://eslint.org/docs/rules/
   *      "off" 或 0 - 关闭规则
   *      "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
   *      "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {},
};
```

4: 通过.eslintignore 在项目的根目录中创建文件来告诉 ESLint 忽略特定的文件和目录。该.eslintignore 文件是纯文本文件

```
.docz
.vscode
node_modules
```

5: 是否生效
npx 想要解决的主要问题，就是调用项目内部安装的模块。
npx 的原理很简单，就是运行的时候，会到 node_modules/.bin 路径和环境变量$PATH 里面，检查命令是否存在。

```
./node_modules/.bin/eslint gatsby-config.js
```

## prettier

1: 安装 Prettier：

```
npm install --save-dev prettier
```

2: 创建一个空的配置文件

```
echo {}> .prettierrc.json
```

3: 创建一个.prettierignore 文件，让 Prettier CLI 和编辑器知道哪些文件不格式化

```
.docz
```

4: 使用 prettier 格式化所有内容

```
./node_modules/.bin/prettier --write .
```

5: 检查文件是否都已格式化

```
 ./node_modules/.bin/prettier --check .
```

6: 安装 eslint-config- prettier 以使 ESLint 和 Prettier 相互配合。它关闭所有不必要的或可能与 Prettier 冲突的 ESLint 规则。

```
npm install --save-dev eslint-config-prettier
```

7: 然后，将 eslint-config-prettier 添加到文件中的“ extends”数组.eslintrc.\*。确保将其放在最后，这样它就有机会覆盖其他配置。

```
{
  "extends": [
    "some-other-config-you-use",
    "prettier"
  ]
}
```

8: 与 Prettier 一起使用其他代码质量工具，安装(这将安装 husky 和 lint-staged)

```
npx mrm lint-staged
```

9: 将 Prettier 作为预提交的钩子来运行。这样可以确保格式化所有提交，而不必等待 CI 构建完成, 将以下内容添加到您的 package.json
针对暂存的 git 文件运行 linters，不要让 💩 进入您的代码库！
在提交代码之前运行时，linting 更有意义。这样，您可以确保没有错误进入存储库并强制执行代码样式。

```
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,ts,tsx,css,less}": [
      "npx prettier --write --check",
      "npx eslint --fix --max-warnings 0"
    ]
  }
```

10: 也可以配置一个 .editorConfig 文件，在配置了"editor.formatOnSave": true 后，如果项目成员没有安装 Prettier 插件，保存时就会读取.editorConfig 文件，同样可以格式化代码。启用 Prettier 插件后，.editorConfig 的配置就会失效，读取.prettierrc 文件的配置

```
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
```

11: vscode 配置，自动保存时进行格式化
建一个 .vscode 文件夹放在项目根目录下，建一个 settings.json 文件放在 .vscode 文件夹中，在这里进行配置

```
{
  //保存时格式化文件。
  "editor.formatOnSave": true,
  //定义一个优先于所有其他格式化程序设置的默认格式化程序。必须是提供格式化程序的扩展的标识符。这里使用的是 prettier
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 保存时要运行的代码操作类型。这里是修复 eslint 问题
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  // 用 eslint 检测的文件
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

以上就是 eslint+prettier+editorconfig+lint-staged 代码规范配置

配置的时候遇到的问题：
1: 配置了 vscode 自动保存，但是保存的时候没有自动格式化
答: 重新打开试试

2: 在 package.json 中配置了 lint-staged，但是提交没有触发 pre-commit 钩子
答：可以查看 .git/hooks/pre-commit 文件验证 hook 是否存在。不存在的话可以重新安装 husky
`cnpm install husky`
如果.git 文件被隐藏，mac 下可以在终端输入如下命令，即可显示隐藏文件和文件夹

```
defaults write com.apple.finder AppleShowAllFiles -boolean true ; killall Finder
```

也可以输入以下命令，再次隐藏原本隐藏的文件和文件夹

```
defaults write com.apple.finder AppleShowAllFiles -boolean false ; killall Finder
```

12: tsconfig.json 配置

```ts
// @see https://www.typescriptlang.org/tsconfig#jsx

{
  // 项目的编译器选项集
  "compilerOptions": {
    // 当编译源文件出现错误的时候，是否继续输出编译结果(为true, 则当编译的源文件中有错误, 不再输出编译结果)
    "noEmitOnError": true,
    // 控制当源文件中存在隐式的any的时候是否报错(为true, 则当源文件中存在隐式的any的时候会报错)
    "noImplicitAny": true,
    // 控制当源文件中存在this的值是any的时候是否报错(为true, 则当源文件中存在this为any的情况会报错)
    "noImplicitThis": true,
    // 控制编译后输出的是什么js版本(默认值为es3)
    "target": "es2015",
    // 指定要引入的库文件, es5、es6、es7、dom 四值可选(默认dom)
    "lib": ["es7", "dom"],
    // 配置模块的解析规则, classic / node(最常用, 建议) @see https://www.typescriptlang.org/docs/handbook/module-resolution.html
    "moduleResolution": "node",
    // 指定要使用的模块标准
    "module": "esnext",
    // 指定编译输出文件中是否删除源文件中的注释(默认为 false)
    "removeComments": true,
    // 控制是否始终以严格模式检查每个模块, 并且在编译后的输出结果中加入"use strict"(默认为false)
    "alwaysStrict": false,
    // 允许导入扩展名为“ .json”的模块
    "resolveJsonModule": true,
    // ES模块互操作
    "esModuleInterop": true,
    // 跳过库检查
    "skipLibCheck": true,
    // 用于指定是否在编译完成后生成相应的*.d.ts文件(默认为false)
    "declaration": true,
    // 控制如何在JavaScript文件中发出JSX构造
    "jsx": "react",
    // 指定编译结果的输出目录
    "outDir": "./lib/",
    // 拓宽引入非相对模块时的查找路径, (默认为 ./)
    "baseUrl": "./",
    // 配合baseUrl一起使用, 相对于baseUrl所在的路径, 主要用于到baseUrl所在目录下查找的时候进行的路径映射
    "paths": {},
    // 指定类型声明文件的查找路径(默认node_modules/@types), 只能识别目录下的.d.ts文件
    "typeRoots": ["node_modules/@types"],
    // 允许在 TypeScript 项目中使用 JavaScript
    "allowJs": false
  },
  // 需要编译的文件，不可以使用通配符
  "files": [],
  // 需要编译的文件，可以使用通配符
  "include": ["src/**/*"],
  // 通过exclude配置来排除掉include配置中包含的源文件
  "exclude": ["node_modules"],
  // 继承另外一个配置文件, 可以直接继承社区最佳实践 @see https://www.npmjs.com/package/@tsconfig/node12
  "extends": "@tsconfig/node12/tsconfig.json"
}

```

参考文章：
[eslint 官网地址](https://eslint.org/)
[prettier 官网地址](https://prettier.io/)
[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier#readme)
[lint-staged](https://github.com/okonet/lint-staged#configuration)
[npx](https://www.npmjs.com/package/npx)
[editorConfig](http://editorconfig.org)
[vscode 配置](https://code.visualstudio.com/docs/getstarted/settings)
[typescript](https://www.typescriptlang.org)
