# B 端(01-admin):

项目介绍 & 开发流程：
https://blog.csdn.net/weixin_44691775/article/details/114669344

商家端:
https://blog.csdn.net/weixin_44691775/article/details/114667542
运营端:
https://blog.csdn.net/weixin_44691775/article/details/114667643
小程序:
https://blog.csdn.net/weixin_44691775/article/details/114667667

## 框架

React

- [UMI3](https://umijs.org/docs)
- [UMI3 语雀](https://www.yuque.com/umijs/umi/quickstart)

## 代码规范

eslint + prettier + husky + lint-staged

## 前端工程化

1: 输出 component 组件库, 组件库中有对工具函数做单元测试
2: 使用 eslint + prettier + husky + lint-staged 方案 强制代码规范
3: 输出 npm 通用包:
app: 接口请求 Service

## 接口请求

请求库: 使用 umi-request

app: 接口请求 Service

## UI 库

component 业务组件
component 基础组件
sr 样式

## 监控

#### aegis 上报

Aegis 是一站式前端监控平台，涵盖了错误监控，资源测速（img, script, css），接口测速，页面性能（首屏时间）。 无需侵入代码，只需引入 SDK 即可自动完成所有监控上报

- [aegis-web-sdk](https://www.npmjs.com/package/aegis-web-sdk)
- [detect-browser](https://www.npmjs.com/package/detect-browser)

步骤:
1: 前往 Aegis 管理后台 https://aegis.ivweb.io ， 未注册用户需先通过注册验证
2: 申请项目，申请完成后得到项目 id， id 在使用 sdk 时候会使用。
3: 在项目内安装 aegis-web-sdk npm install aegis-web-sdk
4: 提供了三种方式引入, 但是请务必保证 sdk 在 <head></head> 内, 这样能保证拿到各类数据监控
5: 项目中采用的是 引入 sdk, 实例化 sdk(在 global.ts 中实例化, 导出, 后面再看)
6: 接入完成后，即可在 Aegis.ivweb.io 上查看项目数据

## 第三方库使用

react hooks 库: ahooks
富文本编辑器: braft-editor & braft-extensions & braft-utils
js 工具函数: lodash-es
时间: moment
url 字符串处理: query-string
装修: react-dnd & react-dnd-html5-backend
表单: react-hook-form
动画: react-transition-group
请求: umi-request
获取浏览器版本信息: detect-browser(原理 userAgent 代理字符串)
cookies 设置: browser-cookies
自定义滚动条: react-custom-scrollbars
店铺装修: react-dnd 实现拖拽后台

## 兼容

主打 Chrome 浏览器, 不支持 IE

一: 准备一个提示用户升级协议的页面
二: umi 允许 document.ejs 作为默认的 html 模板, 在 document.ejs 中进行 userAgent 判断(比如 小于 IE11 的用户代理字符串中包含 MSIE, IE 的 Edge 浏览器的用户代理字符串包含 edg|edge, IE11 包含了 TRIDENT)
三: 当判断是 IE 浏览器时使用 window.location.href 跳转到升级协议的页面

1: public/upgrade.html 升级浏览器提示页面

```upgrade.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>请升级浏览器</title>
  <style>...</style>
</head>
<body>

  <div class="wrap">
    <div class="center">
      <p id="browerTip"></p>
      <p><a id="login" style="color: #5a66ff;text-decoration: none;" href="<%=  %>">返回登录页</a></p>
      <div>各种浏览器</div>
    </div>
  </div>
  <div class="footer">
    图片
  </div>

  <script>
    // 获取浏览器官方名称
    var browserName = window.navigator.appName;
    // 获取浏览器版本
    var browserVersion = window.navigator.appVersion;
    // 设置展示文本
    var browerTip = document.getElementById('browerTip');
    browerTip.innerText = '您当前的浏览器为：' + browserName + browserVersion;
    // 当前 host
    var host = window.location.host;
    // 该页面部署在 cdn 上, login 跳转替换 cdn 为 admin
    var publicPath = '//' + host.replace(/^cdn/, 'admin');

    var login = document.getElementById('login');
    login.href = publicPath + '/login';

  </script>
</body>
</html>
```

```document.ejs 默认的渲染模板
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width">
  <title><%= context.config.title %></title>
  // 引入 aegis 监控
  <script src="监控文件"></script>
  <script>
    var upgradeBrowserUrl = '<%= context.config.publicPath %>browser.html';
    var userAgent = window.navigator.userAgent;

    // 判断是否为<IE11的浏览器
    var isIE = userAgent.indexOf("MSIE") > -1;

    // 判断是否IE的Edge浏览器
    var isMicrosoftEdgeBrowser = /edg|edge/i.test(userAgent);

    // 判断是否为IE11
    var isIE11 = userAgent.toUpperCase().indexOf("TRIDENT/") > -1;
    if (isIE || isIE11) {
      window.location.href =  upgradeBrowserUrl;
    }

    // 获取 Edge 的版本号
    function getMicrosoftEdgeBrowserVersion() {
      var version = null;
      var userAgentLowerCase = window.navigator.userAgent.toLowerCase();
      if (isMicrosoftEdgeBrowser) {
        var matches = userAgentLowerCase.match(/(edge|edg)\/([\d\.]+)/);
        if (matches) {
          version = matches[2];
        }
      }
      return version;
    }

    var edgeBrowserVersion = getMicrosoftEdgeBrowserVersion();
    var isOlderVersion = edgeBrowserVersion && parseFloat(edgeBrowserVersion) < 19;

    if (isMicrosoftEdgeBrowser && isOlderVersion) {
      window.location.href =  upgradeBrowserUrl;
    }

  </script>
  <link rel="icon" type="image/png" href="<%= context.config.publicPath %>favicon.png" />
</head>

<body>
  <div id="root"></div>

  // 放cdn上的文件
  <script src="<%= context.config.publicPath %>moment.min.js"></script>
</body>
</html>

```

## 项目架构

.
├── README.md 项目的开发文档, 协议规范
├── config 项目的配置文件 很多配置项
│   ├── config.qa.ts // qa 配置
│   ├── config.ts // 配置, umi 默认读取
│   ├── menu.ts // 菜单, 开发可以开启环境中 process.env.mockmenu 配置, 在 loginWrapper 中进行读取, 若开启读取本地, 未开启读取接口
│   ├── routes 路由
│   └── routes.ts
├── docs 文档
├── mock mock 数据文件
├── package-lock.json
├── package.json
├── public // 此目录下所有文件会被 copy 到输出路径
│   ├── favicon.png
│   └── browser.html
├── src // 所有源码
│   ├── app.ts
│   ├── assets
│   ├── components
│   ├── config
│   ├── global.less
│   ├── global.ts
│   ├── hooks
│   ├── layouts
│   ├── models
│   ├── pages
│   ├── services
│   ├── styles
│   └── utils
├── tsconfig.json
├── typings.d.ts
└── yarn.lock

模块的话，包括

- 概况
  - 概况
- 店铺

  - 店铺装修
  - 素材管理
  - 门店管理

- 商品
  - 商品管理
- 订单
  - 订单管理
  - 正向, 逆向
- 客户
  - 客户管理
- 数据
  - 使用的小马报表
- 营销
  - 优惠券
  - 分销优惠券
  - 限时优惠
- 财务
  - 发票
- 推广
  - 分销
- 设置
  - 店铺设置
  - 权限设置
  - 小程序设置等等

## 部署配置文件

process 对象是一个全局变量，提供了有关当前 Node.js 进程的信息并对其进行控制, process.env 属性会返回包含用户环境的对象

- [process](http://nodejs.cn/api/process.html#process_process_env)

1: config.qa.ts 只是式例

```
// 获取环境 version
const version = process.env.VERSION;
// 获取环境 domain 或默认 domain
const domain = Number(process.env.DOMAIN) !== 0 ? process.env.DOMAIN : 'test.com';
// 配置 apihost
const apihost = `//mapi.${domain}`;
// cdn 资源路径
const publicPath =
  Number(version) === 0 ? `//cdn.${domain}/admin/` : `//cdn.${domain}/admin/${version}/`;
// 导出远程生产配置
export default {
  define: {
    'process.env.env': 'prod',
    'process.env.mockmenu': false,
    'process.env.apihost': apihost,
    'process.env.version': version,
  },
  hash: true,
  publicPath,
};

```

2: config.qa.ts

```
export default {
  define: {
    'process.env.env': 'qa',
    'process.env.local': 1,
    'process.env.apihost': '/proxy',
    'process.env.mockmenu': false,
    'process.env.version': process.env.VERSION,
    'process.env.log': false,
    'process.env.animation': true,
  },
  // 配置请求代理, umi 会在本地起一个服务, 请求 target 的接口地址, 再下发给本地对应的请求, 跨域策略对服务器之间的请求没有限制, 在 umi 的 request 中配置 prefix, 接口前缀
  proxy: {
    '/proxy': {
      target: 'target地址',
      changeOrigin: true,
      pathRewrite: { '^/proxy': '' },
    },
  },
  publicPath: '/',
  mock: false,
};

```

3: config.ts 文件, umi 默认读取

```
import { IConfig } from 'umi';
import routes from './routes';
import chainWebpack from './chain-webpack';

const config: IConfig = {
  // 配置路由
  routes,
  // 配置别名
  alias: {
  },
  // 启用按需加载, 把构建产物进行拆分, 在需要的时候下载额外的 JS 再执行, 默认是一个js,一个css, 省心, 部署方便, 但是用户初次打开网站会比较慢
  dynamicImport: { loading: '@/components/biz/LoadingBar' },
  // 配置标题
  title: '配置标题',
  // 提供给代码中可用的变量, 全局可用
  define: { GLOBAL_CODE: 'test' },
  // 设置哪些模块可以不被打包，通过 <script> 或其他方式引入，通常需要和 scripts 或 headScripts 配置同时使用
  externals: {
    moment: 'window.moment',
  },
  // 修改 webpack 配置
  ...chainWebpack,
};

export default config;

```

## mock 数据

```
import { delay } from 'roadhog-api-doc';
import mockjs from 'mockjs';
import { Request, Response } from 'express';

const proxy = {
  'POST /api': (req: Request, res: Response) => {
    res.send({
      data: {
      }
    });
  },
};

export default delay(proxy, 1000);

```

## 部署

node 环境变量

## 路由管理

1: config/routes 文件夹

存放各模块的路由配置文件

```login.ts
export const login: Route = {
  path: '/login',
  component: '../layouts/login/login',
  routes: [
    { path: '/login', component: './login/login' },
    { path: '/login/recover', component: './login/recover/index.tsx' }
  ],
};
```

2: config/routes.ts 文件

统一引入，导出

```
import { login } from './routes/login';
const homePage = { path: '/', component: './index' };

const basic = {
  path: '/',
  component: '../layouts/default/default',
  routes: [
    homePage,
  ],
};

const routes: Route[] = [login, basic, { component: './404' }];

export default routes;

```

3: config/config.ts

在 config 文件中配置 routes, umi 会根据 config 文件进行配置

```
import { IConfig } from 'umi';
import routes from './routes';
const config: IConfig = {
  routes,
};
export default config;
```

项目中有一个存放配置的 config 文件夹，该文件夹下有一个 routes 文件夹, 用来存放各模块的路由配置文件, 每个文件导出一个对象, 每个对象有 path 配置, 比如/login，那包含/login 的路由就会进入, component 配置用来配置外层包裹, routes 数组配置存放具体的路由和页面组件, 在 config 文件夹下还有一个 routes 文件统一对刚才的 routes 文件夹 引入, 导出, 以及 404 页面的配置

## 如何进行远程 debug

- [whistle](https://cloud.tencent.com/edu/learning/course-2605-49877)

使用 whistle 工具, 本地打包, 进行调试
https://www.cnblogs.com/kunmomo/p/11811458.html
https://github.com/avwo/whistle

1: 可以本地配置跟现网一样的配置, 开启 source-map

```ts
const version = process.env.VERSION;
const domain = "test.com";
const apihost = `//mapi.${domain}`;
const publicPath =
  Number(version) === 0
    ? `//cdn.${domain}/admin/`
    : `//cdn.${domain}/admin/${version}/`;
export default {
  define: {
    "process.env.env": "qa",
    "process.env.apihost": apihost,
    "process.env.version": version,
  },
  hash: true,
  publicPath,
  devtool: "source-map",
};
```

2: 运行命令，进行本地打包

```js
npx cross-env VERSION=0105-store UMI_ENV=qa-remote umi build
```

3: https://github.com/avwo/whistle
使用 whistle 代理，使用本地打包文件进行调试，实现跟线上一样的环境

4: 使用 whistle 配置规则
^https://test.com/* file:///Users/dangaohaohao/workspace/01-admin/dist/index.html
^https://cdn.test.com/admin/0105-store/** file:///Users/dangaohaohao/workspace/01-admin/dist/$1

5: 在本地访问显示域名

自身经验:
在开发店铺认证需求时, 踩了一个坑
首先页面有四个 stepper, 也就是四个表单认证页面, 点击下一页进行校验, 当有错误项时进行提示, 没有错误就展示下一页, 开发时很顺利, 部署上去后点击下一页就报错, 然后使用 whitle 模拟生产环境调试时就发现, 是 react-hook-form 表单验证插件的 trigger 方法报错, 这是一个用来触发校验的方法, 他是根据注册的表单 key 去找表单的 ref 获取值进行校验, 但是认证页面其实有很多表单是动态展示的, 也就是有些表单其实是隐藏的, 有可能注册的 key 对于的表单是不存在的, 那 react-hook-form 找不到就报错了, 然后就进行了对应的修改, 改成了四个表单, 使用每个表单的 submit 方法解决。

## 登录

方案: Token 登录
Token 是服务端生成的一串字符串，以作为客户端请求的一个令牌。当第一次登录后，服务器会生成一个 Token 并返回给客户端，客户端后续访问时，只需带上这个 Token 即可完成身份认证。

可参考: https://zhuanlan.zhihu.com/p/155890203

好处:
缺点:

首先用户请求地址, 比如说域名是 test.com, 由于是第一次登录, 用户会来到登录页

用户输入账号, 密码, 服务端进行 账号 / 密码验证, 如果失败则登录失败, 如果成功, 则返回 authToken 和 到期时间

客户端获取到了 authToken 和 到期时间, 保存在 cookie 中(https://www.npmjs.com/package/browser-cookies), 之后的每次请求都会在请求头中加上 authToken 字段, 后端会进行验证, 如果验证无效则会踢回登录页(当然需要用户信息的页面前端也会做一层 loginWrapper 处理, 后面再说)

然后进行跳转选择店铺页面, 在选择店铺页面可以创建新的店铺或者选择店铺

可以进行选择店铺, 用 saasId 标识, 选择好店铺之后要给后端发送请求, 选择了哪个店铺, 然后跳转到概览页面, 概览页面会被一层默认布局包裹(umi 支持的 component), 默认布局中会有通用的侧边栏啊, 头部, 底部啊, ErrorBoundary 错误边界处理啊等, 最外层是 loginWrapper, 会进行鉴权, 查询用户信息的操作, 然后放在 loginContext 中, 这样其他地方比如说侧边栏就可以读取菜单数据进行展示。

## loginWrapper

context 方案

在 loginWrapper 中会获取 cookie 中保存的 authToken, 如果没有, 就会跳转到登录页, 如果有, 就会获取用户信息, 用户信息中会有用户的基础信息, 可访问的菜单, 以及权限位等信息, 保存在 LoginContext 中, 如果请求成功就展示 children, 请求失败就展示返回登录的错误页面, 其他地方比如说侧边栏就可以读取 loginContext 中共享的菜单进行菜单的展示。

## 全局错误边界处理

ErrorBoundary, 在默认布局 loginWrapper 中进行包裹通用的 Layout, 使用的是 React 的 componentDidCatch 钩子在全局进行捕获, 当页面发生错误时, 展示错误页面, 并展示返回首页的按钮

如果有些页面不在默认布局中, 也需要使用 ErrorBoundary 包裹进行错误捕获

## 全局共享数据, 如 空图片 等设置

context 方案

有一些全局通用的应用设置, 比如说 logo 图, 空数据图等等, 在运营端进行配置, 在商家端统一读取, 包裹默认布局, 通过 context 方法注入, 在需要的地方进行读取, 使用对象 key - value 结构存储

## 权限方案

#### 权限解释

权限系统设计基于通用的 RBAC 模型,基于角色的访问控制（Role-Based Access Control)，其中关键名词解释如下：

用户：发起操作的主体，有唯一的系统账号对应（包括手工创建的子账号）。

角色：对应名词是岗位，角色起到了桥梁的作用,连接了用户和权限的关系,每个角色可以关联多个权限,同时一个用户关联多个角色,那么这个用户就有了多个角色的多个权限。

权限：是用户可以访问的资源,包括页面权限,操作权限,数据权限

页面权限：即用户登录系统可以看到的页面,由菜单来控制,菜单包括一级菜单和二级菜单、三级菜单,只要用户有一级和二级菜单三级菜单的权限,那么用户就可以访问页面。

操作权限：即页面的功能按钮,包括查看,新增,修改,删除,导入导出等,用户点击删除按钮时,后台会校验用户角色下的所有权限是否包含该删除权限,如果是,就可以进行下一步操作,反之提示无权限。

数据权限：数据权限就是用户在同一页面看到的数据是不同的，比如订单列表页，总部管理员可以看到全部门店数据，门店管理员只能看到所在门店数据。

#### 处理

那在权限这一块, 可能更重要的后端这边要做好控制, 前端能把控的是菜单, 按钮的显隐, 还有一些体验优化吧.

比如页面权限, 其实在用户登录后后端会返回菜单列表, 这个菜单列表 menuList 其实就是对应着能对该用户展示的菜单, 前端获取到后就遍历展示, 当然有可能用户记住了某些他在该角色中无法访问的 url, 然后在地址栏直接输入, 那这个时候其实是会跳转到一个提示无权限访问的页面的, 是使用的 Permission 组件进行包裹, 那这个后面再说吧.

那像操作权限, 是使用了一个 权限 code 数组, 每一个操作按钮都有一个权限 code, 这个权限 code 数组也是在用户登录时可以获取到的, 如果用户拥有这个权限 code, 该按钮就可以进行展示, 还有一个 api 权限, 也是挂靠在 权限 code 上的

像数据权限的话, 是后端这边根据 saasId, 还有对应的角色 id 等进行处理, 应该返回什么数据

那当开发一个新页面, 关于权限方面的工作是这样的, 给当前页面 和 操作按钮都各自取一个 code 值, 比如素材管理, 那取个名字可能是 Material_Management, 那这个页面有一个默认的查看权限位, 取为 Material_Management_View 吧, 再来个删除的按钮, 取为 Material_Management_Delete

取好之后, 在运营平台去进行 apis 的录入, 然后在菜单管理这里新建菜单, 然后这个菜单下有哪些资源 Code, 进行录入, 比如刚刚的查看 和 删除权限位, 然后这个权限位关联了哪些 api, 也就是这个资源 code 可以访问哪些资源, 做了这一步, 对于前端而言就是已经把 api 挂在了权限 code 上

然后再去岗位管理这里, 找到拥有该权限的岗位, 勾选上对应的权限, 那在这里其实也是给用户分配了权限 code

然后在新开发的页面, 使用 Permission 组件包裹页面, 入参 Material_Management_View, 使用 Permission 组件包裹按钮, 入参 Material_Management_Delete, 那新页面的权限方面工作就完成了

那 Permission 组件的实现是这样的, 用户登录成功, 会返回该用户的 permissionCodes 数组, Permission 组件 会获取到, 判断该数组中是否包含入参的资源 code, 如果有就展示该按钮, 如果没有就不展示, 那像刚刚包裹页面, 其实还会入参一个标识, 表示这是一个页面, 那如果没有该页面的权限就会跳转到提示无权限的页面。

不过其实页面权限在菜单这里就已经做了处理, 这里主要是处理一个用户体验的问题, 因为如果用户记住了某个他在该店铺下无访问权限的 url 并进行访问, api 是有做把控的, 会有个 tip 提示无权限访问, 那相对而言跳转到无权限页面体验会好些, 并提供了返回首页按钮

## 数据管理

dva, 在 umi 中集成了

## 素材审核

使用天御的机器审核，可能存在误杀率, 信安的机审也无视频审核

## 报表

使用的是小马报表

https://xiaoma.tencent.com/#/

## 业务模块

#### 概况

用于像商家展示一些数据情况, 比如昨日的订单数, 支付金额, 小程序打开人数等等, 还有一些待办项 / 常用功能 的快捷入口

有新手操作指导, 用 stepper 展示用户成功发布小程序所需的每一步, 点击可新开页面跳转

没啥, 就是接口数据的展示

###### 亮点:

1. stepper 组件
2. 新手引导的 stepper 提示

#### 店铺

##### 页面装修

react-dnd 实现拖拽

1. 新建模板

2. 展示模板弹窗

3. 可以选择空白模板或者提供的几种常用模板, 比如服装类, 零食类, 点击跳转装修编辑页面携带 templateId

4. 这里的代码我看不懂, 感觉应该先去看一下 react-dnd 和 dva, 再来看

5. 店铺装修就可以作为一个亮点，因为它这里做的还是很好的

##### 素材管理

素材统一管理, 素材可批量操作, 可放大查看, 本地操作无刷新

1. 左边分组, 右边为筛选项和列表
2. 分页已经做到了懒加载, 并不是一次性加载, 并且请求列表数据 利用 useEffect 消除副作用的能力做防抖

##### 悬浮窗

小程序悬浮窗配置, 展示页面配置如主页, 装修页, 详情页 等

1. 亮点在于悬浮窗的动画以及样式的变动
2. react-dnd 的拖拽, react-dnd-html5-backend

##### 店铺导航配置

小程序底部导航配置, 如背景配置, icon 配置, 颜色的颜色配置

1. 小程序的导航最多只有 5 个
2. react-dnd 的拖拽
3. 动态设置 style 中的背景图片展示的

##### 门店列表

门店列表, 支持批量导入, 有使用一个地图, 但是地图只能在 https 才能展示, 使用 whistle

1. 我写了门店营业时间组件 & 多选下拉框组件 & 单选下拉框组件
2. 这里使用了地图组件
3. window 监听 beforeunload 卸载事件, 在卸载事件的 event

```
  const handleBeforeunload = (event: Event) => {
    const confirmMessage: any = '确定退出吗';
    const e = event || window.event;
    if (e) {
      e.returnValue = confirmMessage;
    }
    return confirmMessage;
  };
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeunload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
    };
  }, []);
```

4. umi 有提供 Prompt 可以进行拦截

5.

##### 定向弹窗

用于一些活动推广, 比如在一些活动时间点, 在首页或者支付完成页会弹出一些广告, 可配置图片和跳转页面链接。可配置显示频率, 如每次启动访问还是每次首次访问还是每周一次等等

##### 导购员列表

对门店的导购员管理

#### 商品

商品列表, 根据名称, ID, 分组等进行筛选, 也有 全部/销售中等筛选, 可以进行新建, 下降, 编辑, 删除等操作

这里记一个点, 就是在新建商品时难免会遇到 选择分组 等的操作, 但是用户的数据可能为空, 也就是他填到一半发现自己没新建分组, 这里一个比较好的体验是提供一个新建按钮和一个刷新按钮, 点击新建可新开新建分组的页面, 用户可以在新页面进行新建操作, 完成后再到原来的页面点击刷新, 刷新只是刷新分组的数据

###### 亮点

1. 商品类目

#### 配送模板
