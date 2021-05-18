---
title: 06-在react中使用mobx
tag: mobx
catogory:
  - front-end
  - mobx
---

# 在 react 中使用 mobx

在 react 中使用 mobx，需要借助 mobx-react。

它的功能相当于在 react 中使用 redux，需要借助 react-redux。

首先来搭建环境：

```bash
create-react-app react-app
cd react-app
npm run eject
npm i @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D
npm i mobx mobx-react -S
```

修改 package.json 中 babel 的配置：

```json
  "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ],
      [
        "@babel/plugin-proposal-class-properties",
        {
          "loose": true
        }
      ]
    ]
  }
```

注意：vscode 编译器中，js 文件使用装饰器会报红。解决方式：

在根目录编写写 jsconfig.json

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "experimentalDecorators": true
  },
  "include": ["src/**/*"]
}
```
