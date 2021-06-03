# woerma 6 月 3 日工作

## 优惠券

下午帮测优惠券用例去了

优惠券执行用例真麻烦

分门店, 分商品, 分配送方式, 是极速达还是次日达等等 .

## woerma 灰度

然后讨论下灰度方案, 由于 B 端 React 是第一个需求, 灰度方案还在讨论中.

大佬原话:
我们新的 B 端想走灰度，需要做一些调整，基本网络、流水线我这边和运维已经配好，现在需要代码里面做一些调整，我列一下发出来，你们先看看

老 B 端：

1. iframe 加载 url 的策略
   如果 version 为空（qa1），保持现有的加载路径，http://phoenix.console.qa.ghsmpwalmart.com/settings/video
   如果 version 有值，加载路径增加两级/env-gray/[version 值]
   例如：version=gray1，加载路径：http://phoenix.console.qa.ghsmpwalmart.com/env-gray/gray1/settings/video

新 B 端：

1. 构建时，要根据构建时传进去的 process.env.tversion 值，修改 window.routerBase 的值

   如：
   tversion 传 0，window.routerBase 指向根路径"/"
   tversion 传 gray1，window.routerBase 指向灰度路径"/env-gray/gray1/"

2. 请求头仿照 tversion，加一个变量 version

以下是我的记录:
背景:
woerma B 端之前使用的是 Angular 1.0, 代码及其老旧, 需要重构, 目前新的需求需要使用 React 开发.

老 B 端是一个域名, 新 B 端是一个域名, 所有的数据在同一台服务器上, 运维配置 ngix 进行转发.

目前的情况是 在老 B 端中使用了一个 iframe 嵌套, url 为新 B 端域名.

由于新 B 端域名只有一个, 暂时没有配置线上和灰度环境, 所以现在想的一个灰度方案是, 首先发布, 运维会把我们的代码打包放在一个 cos 桶上, 那根目录下的资源是线上的, 灰度的新建个文件夹, 比如 /env-gray/gray1/..., 把对应的灰度环境的资源放在这里的文件夹下

然后 B 端使用的 UMI, 其实 UMI 打包后会在 index 文件中加上

```
<script>
    window.routerBase = "/";
</script>
```

也就是所有的资源都会打到 / 根目录下, 那现在要做的事情就是要在路由拼接 /env-gray/gray1/, 找下 umi 的配置文件, 应该有提供对应配置, 但是 gray1 并不是固定的, 于是在 umi 的几份配置文件中进行接收, shell 执行构建中使用 cross-env 加上 TVERSION=gray1, 那这个环境变量就会添加到 process.env 环境变量中, 可以在配置文件中进行读取, 配置 base

```
routerBase: process.env.TVERSION && Number(process.env.TVERSION) !== 0 ? `/env-gray/${process.env.TVERSION}/` : '/'
```

但是这样的话, 只是在路由层面做了处理, 也就是不会在访问灰度环境时路由打到线上的路径, 请求还是一个, 那就在 headers 中加上拦截, 把 version 加上, 这样服务端就知道使用什么数据

然后大佬说要让运维配置下 nginx 转发, 当我们请求时, 转发到真正的服务器上

然后大佬又想了想, 诶, 是不是可以让运维把所有的请求都转到真正服务器上再拼接下路径啊, 不过她不能动态读取 version, 只能写死了, 诶, 这样前端是不是就不能做处理了, 工作量都丢给运维了啊

然后我想了想, 嗯, 是的, 但是我还有点疑问, 怎么区分要不要加 /env-gray/gray1/ 呢, 线上的不用加啊

然后看了看 url, 嗯, 是不是可以在老 B 端上配置 version, 构建时加入到 process.env 上, 进行读取, 在配置 iframe 上进行区分配置

大佬没回话呢, 他跟运维讨论地火热

线上和灰度是两个服务器, 前端请求 nginx 服务器, 这里像 prod 会又很多个域名其实都指向了同一个 nginx 服务器地址, gray 也又很多域名指向同一个 nginx 服务器, 然后 nginx 转发到真正的服务器地址, 灰度的话会有 online 的灰度 和 qa 的灰度,

然后他又提: 我想到一个问题，需要在灰度的 ng 上，配上 Phoenix 域名的跨域

运维答: 你先试试, 因为最后还是会到 cdn

## yunmall 构建流水线

1. 首先 yunmall 有很多域名, 直接没有 dev 环境了, 只有 qa, gray, 和 prod, 提交代码到指定分支, devops 监听 commit, 会自动拉对应的分支代码, 会注入对应的环境变量, 然后部署到指定域名

至于请求, 本地开发的时候是使用的 proxy, 指定到 qa 的服务器, 同时在 shell 构建时添加 tversion, 在 request interceptors 中拦截加上请求头 version: gray, 那后端会在 header 中统一获取, 然后使用对应的数据

一开始准备了十几个域名做这样的出来, 后来再想了一个方案, 就是在 layout 开发了一个 input, 配置然后写入到 localStorage 中, 在拦截时先读取 localStorage 的, 如果没有再读取配置中的 version
