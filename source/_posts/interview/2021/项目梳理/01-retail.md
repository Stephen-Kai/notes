# B 端(01-retail):

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
