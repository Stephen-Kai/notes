# B 端(01-retail):

## 小程序最低基础库版本： v2.6.1

## 工程目录

```
.
├── README.MD
├── config           工程编译相关的配置文件
├── src              工程业务相关代码
    ├── lib          第三方依赖库
    ├── supermarket
    │   ├── app.js
    │   ├── app.json
    │   ├── app.ts
    │   ├── app.wxss
    │   ├── common              工程公共的功能模块
    │       ├── auth            授权
            ├── behaviors.ts
            ├── httpClient.ts   网络请求
            ├── navigator.ts    导航
            ├── storage.ts      存储
            ├── subScribeMsg    消息订阅
            └── updateManager.ts 更新管理
    │   ├── component           工程组件
    │   ├── config              工程业务相关静态配置文件
              ├── api           存放所有业务的api
              ├── constants     通用型图片地址、消息提示、storagekey
              |-- env           环境变量
              |-- routeMap      routeMap
    │   ├── core                框架需要依赖文件
    │   ├── pages               页面目录，按照拆包划分
              ├── home          主包，拆包时用，需要首先加载的页面
              ├── order         次包，订单类等二级页面
    │   ├── sitemap.json
    │   └── utils               工具类
├── node_modules
├── package.json
├── project.config.json
├── tsconfig.json
└── typings
    ├── index.d.ts
    └── lib.wa.es6.d.ts
```

## 前端工程化

1: 使用 eslint + prettier + husky + lint-staged 方案 强制代码规范
2: 输出 ui 组件库, 并实现了按需引入
3: 输出 npm 包:
业务通用层：
ui:一套更适配电商场景下的组件库
const: 业务相关的常量库
services: 适配业务中台的小程序服务层，如：登录服务、优惠券服务
框架层：
seed：项目骨架
common-utils: 工具库
cli：命令行工具，支持快速创建项目，页面，组件
common-libs: 集成常用的各种解决方案库，如：storage，event，api gateway 等等
builds: 集成常用构建任务，支持组合使用

## 拆包

## 小程序登录
