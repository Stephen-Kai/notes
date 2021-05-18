---
title: 28-node
tag: old-study-notes
catogory:
  - front-end
  - old-study-notes
---

Nodejs

node.js 官网： https://nodejs.org/en/
node.js 中文： http://nodejs.cn/
node.js 社区： https://cnodejs.org/

Node.js 简介

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。
Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。

简单的说 Node.js 就是运行在服务端的 JavaScript。

V8 引擎本身就是用于 Chrome 浏览器的 JS 解释部分，但是 Ryan Dahl 这哥们，把这个 V8 搬到了服务器上，用于做服务器的软件。

Node.js 是一个让 JavaScript 运行在服务器端的开发平台，它让 JavaScript 的触角伸到了服务器端，可以与 PHP、JSP、Python、Ruby 平起平坐。

Node.js 不是一种独立的语言，与 PHP、JSP、Python、Perl、Ruby 的“既是语言，也是平台”不同，Node.js 使用 JavaScript 进行编程，运行在 JavaScript 引擎上（V8）。

与 PHP、JSP、.net 等相比（PHP、JSP、.net 都需要运行在服务器程序上，Apache、Nginx、Tomcat、IIS。），Node.js 跳过了 Apache、Naginx、Tomcat、IIS 等 HTTP 服务器，它自己不用建设在任何服务器软件之上。

浏览器、nodejs 和其他服务器之间的关系

node.js 特点：

单线程
在 Java、PHP 或者.net 等服务器端语言中，会为每一个客户端连接创建一个新的线程。而每个线程需要耗费大约 2MB 内存。也就是说，理论上，一个 8GB 内存的服务器可以同时连接的最大用户数为 4000 个左右。要让 Web 应用程序支持更多的用户，就需要增加服务器的数量，而 Web 应用程序的硬件成本当然就上升了。

Node.js 不为每个客户连接创建一个新的线程，而仅仅使用一个线程。当有用户连接了，就触发一个内部事件，通过非阻塞 I/O、事件驱动机制，让 Node.js 程序宏观上也是并行的。使用 Node.js，一个 8GB 内存的服务器，可以同时处理超过 4 万用户的连接。

多线程，当有用户连接的时候，就会为用户创建一个线程，当一个用户的崩了，不会影响其他用户, 稳定可靠
非阻塞 I/O（异步）
当在访问数据库取得数据的时候，需要一段时间。在传统的单线程处理机制中，在执行了访问数据库代码之后，整个线程都将暂停下来，等待数据库返回结果，才能执行后面的代码。也就是说，I/O 阻塞了代码的执行，极大地降低了程序的执行效率。

由于 Node.js 中采用了非阻塞型 I/O 机制，因此在执行了访问数据库的代码之后，将立即转而执行其后面的代码，把数据库返回结果的处理代码放在回调函数中，从而提高了程序的执行效率。
当某个 I/O 执行完毕时，将以事件的形式通知执行 I/O 操作的线程，线程执行这个事件的回调函数。为了处理异步 I/O，线程必须有事件循环，不断的检查有没有未处理的事件，依次予以处理。
阻塞模式下，一个线程只能处理一项任务，要想提高吞吐量必须通过多线程。而非阻塞模式下，一个线程永远在执行计算操作，这个线程的 CPU 核心利用率永远是 100%。

缺点: 如果有很多请求，那内存就会占用特别大，但是像 java 这种，由于线程池中的线程数都是固定的，所以更不会出现这种情况

适合做高并发
这是一种特别有哲理的解决方案：与其人多，但是好多人闲着；还不如一个人玩命，往死里干活儿。

没有 web 容器(就像 apache 上的 www), 没有根目录的概念,计算机上任何地方都可以运行， 要访问电脑上的某些静态资源，必须通过路由来配置

宏观上，由于使用 非阻塞 io 可以实现并发
微观上，还是单线程

事件驱动
在 Node 中，客户端请求建立连接，提交数据等行为，会触发相应的事件。在 Node 中，在一个时刻，只能执行一个事件回调函数，但是在执行一个事件回调函数的中途，可以转而处理其他事件（比如，又有新用户连接了），然后返回继续执行原事件的回调函数，这种处理机制，称为“事件循环”机制。
Node.js 底层是 C++（V8 也是 C++写的）。底层代码中，近半数都用于事件队列、回调函数队列的构建。用事件驱动来完成服务器的任务调度，用一个线程，担负起了处理非常多的任务的使命。

银弹是指能快速解决问题或者解决棘手问题的方法

聊天室 直播 站内信等可能同一时间有很多人用的
Node.js 是一个让 JavaScript 运行在服务器端的开发平台，所以必须首先在本机安装 Node.js 环境

1. 下载地址
   https://nodejs.org/en/
   官网术语解释
   LTS 版本：Long-term Support 版本，长期支持版，即稳定版。
   Current 版本：Latest Features 版本，最新版本，新特性会在该版本中最先加入。

2. 启动程序 node-v10.16.0-x64.msi 一直点 下一步......

3. 在 cmd 中，输入 node -v 就能够查看版本号，同时，也内置了 npm，通过 npm -v 查看版本号

4. 重启电脑，系统环境变量才会起作用。
   就是在系统的任何目录下，都能运行 c:\program files\nodejs 里面的程序。

windows 系统命令行：
打开方式：win + r 输入 cmd 回车
命令 c: 或 d: 或 e: 进入相应的磁盘
命令 mkdir xx 创建 xx 目录
命令 cd xx 进入 xx 文件夹
命令 cd .. 返回上一级目录
命令 cd / 返回根目录
命令 echo.> xx.xx 创建 xx 文件(包含换行的文件)
命令 dir 查看当前目录下的全部文件
命令 del xx 删除 xx 文件
命令 cls 清屏
命令 exit 退出 cmd 窗口
命令 ipconfig 查看本机 ip 地址( 系统环境变量 Path 末尾处加上 ";C:\Windows\System32" )

NPM 介绍
官网：https://www.npmjs.cn/
NPM 是随同 NodeJS 一起安装的包管理工具，包的结构使您能够轻松跟踪依赖项和版本。

NPM 能解决 NodeJS 代码部署上的很多问题，常见的使用场景有以下几种：
允许用户从 NPM 服务器下载别人编写的第三方包到本地使用。
允许用户从 NPM 服务器下载并安装别人编写的命令行程序到本地使用。
允许用户将自己编写的包或命令行程序上传到 NPM 服务器供别人使用。

生成 package.json 配置文件
$ npm init

$ npm init -y 跳过所有提问

安装包

本地安装（当前项目能访问到）
$ npm install 包名(默认放在项目依赖 即 --save)

全局安装（其他项目都能访问到）
$ npm install 包名 -global

缩写形式
$ npm i 包名 -g

项目依赖（添加到 dependencies）
$ npm install 包名 -save
项目上线需要用到的包，缩写 $ npm install 包名 -S (大写)
从项目开发到项目上线打包都需要用到的

开发依赖（添加到 devDependencies）
$ npm install 包名 --save-dev
开发测试需要用到的包，缩写 $ npm install 包名 -D (大写)
项目开发时一些为了方便我们开发的包，项目不是必须的，如构建工具,sass(上线需要的是 css)等

移除依赖模块
$ npm uninstall 包名 -save
$ npm uninstall 包名 --save-dev

清除缓存数据
npm cache verify
如报错 -4048 时使用
因为 npm 是国外的服务器，下载的时候包太大，容易出现掉包，漏包，删除重新下，有时候经常下的是缓存里面的，所以要清除缓存

淘宝 NPM 镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org

当我们使用别人的项目时(不包含 node_modules)，首先 npm install，把项目所依赖的文件下载下来(会根据 package.json 来下载)

package.json 中给的版本是个大概的范围，如多少以上，而 package-lock.json 会锁定版本

package.json 中 "scripts" 字段定义的是脚本命令，如:
"start": "node jsonp.js"
npm run start 等同于 node jsonp.js

编写 nodejs 程序

之前所编写的 javascript 代码都是在浏览器中运行(必须拖到 html 页面)的，因此可以直接在浏览器的控制器 console 中编写 js 代码并运行。

现在我们编写的 javascrip 代码都是在 Node 环境中执行，执行方式有两种：

方式一：在 window 命令行环境中输入指令 node 并回车，进行 node 的交互式环境,编写 javascript 代码执行即可。其中 node 交互式环境也称之为 REPL(Read Eval Print Loop-读取评估打印循环 )，按两次 ctrl+c,可退出 REPL 环境。

先输入 node 指令，进入 node 的交互式环境，在输入 js 代码。
C:\Users\qf>node

> 2+2

方式二：把 javascript 代码写在后缀为.js 的文件中
如有一个 hello.js 文件，在 window 命令行中输入 node hello.js 即可执行。
如在 hello.js 中编写以下代码:
var a = 2;
var b = 2;
console.log(a+b);
命令行中执行：node hello.js

注：在浏览器环境中全局对象是 window，在 node 环境中全局对象变为 global

搭建 web 服务器

文档链接：http://nodejs.cn/api/http.html#http_http_createserver_options_requestlistener

步骤： 1. 加载 http 模块 2. 创建 http 服务 3. 服务端对象监听 request 请求事件，用于监听客户端的请求 4. 启动 http 服务，监听端口

参考代码：

1. 加载 http 模块 var http = require('http');
2. 创建 http 服务 var server = http.createServer();
3. 服务端对象监听 request 请求事件，用于监听客户端的请求
   server.on('request',function (req, res) {
   //req-请求对象 , res-响应对象
   //处理客户端请求逻辑
   console.log('收到请求: '+ req.url); //用户请求地址
   res.end(); //必须结束响应，否则浏览器会被挂起
   });
4. 启动 http 服务，开始监听 3000 端口
   server.listen(3000, function () {
   console.log('服务已经启动，请访问： http://localhost:3000 或 http://127.0.0.1:3000');
   });

注意：

1.  在监听 request 事件中，最后一定要 res.end()结束响应。
    如果没有 end 前端就会一直在等
2.  浏览器显示中文可能是乱码，需设置响应头告诉浏览器显示时所使用的编码，要在 res.end()之前设置
    res.setHeader("Content-type","text/plain;charset=utf-8"); // 响应为纯文本
    res.setHeader("Content-type","text/html;charset=utf-8"); //响应为 html 文本

或者

设置响应头、状态码、响应类型及编码
res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
Node.js 是服务端的程序，写的 js 语句，都将运行在服务器上。返回给客户的，都是纯 html 已经处理好的。

node.js 没有根目录、没有 web 容器的概念！
node 的路由跟实际的文件没有什么关系

nodejs 读写文件

官方文档：http://nodejs.cn/api/fs.html

使用到的文件系统模块 var fs = require('fs'); // file system

读文件：fs.readFile(file[, options], callback)
_ 参数 1：要读取的文件路径，必填。加上 ./，遵循后端的规范
_ 参数 2：读取文件时的选项，比如：文件编码 utf8。选填。 \* 参数 3：文件读取完毕后的回调函数，必填。

读文件注意：
_ 该操作采用异步执行
_ 回调函数有两个参数，分别是 err 和 data
_ 如果读取文件时没有指定编码，返回的是二进制数据，如指定编码 utf8，会返回指定的编码数据。
_ 只要异步操作，回调函数第一个都是错误对象 err 优先

写文件：fs.writeFile(file, data[, options], callback);
_ 参数 1：要写入的文件路径，必填。还有同目录下也要加上 ./
_ 参数 2：要写入的数据，必填。
_ 参数 3：写入文件时的选项，比如：文件编码。
_ 参数 4：文件写入完毕后的回调函数，必填。

写文件注意：
_ 该操作采用异步执行
_ 如果文件存在则替换原内容
_ 默认写入的文件编码为 utf8
_ 回调函数有 1 个参数：err，表示在写入文件的操作过程中是否出错了。
_ 如果出错了 err != null，成功时 err === null
_ 写入文件（文件不存在则自动创建）

注：writeFile 写入文件是先把文件内容清空再写入，如果要追加写入的话可以使用 appendFile 函数

其他常用模块：
path 模块 提供用于处理文件路径和目录路径的实用工具。

url 模块 用于处理与解析 URL。

querystring 模块 提供用于解析和格式化 URL 查询字符串的实用工具。
......

本地服务器
npm i http-server -g
cmd 进入当前目录 运行 http-server

CommonJS 模块化规范

node 应用由模块组成，采用的 commonjs 模块规范。
每一个文件就是一个模块，拥有自己独立的作用域，变量，以及方法等，对其他的模块都不可见。
加载某个模块，其实是加载该模块的 module.exports 属性，require 方法用于加载模块。

CommonJS 模块的特点：
所有代码都运行在模块作用域，不会污染全局作用域。
模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。
要想让模块再次运行，必须清除缓存。
加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。
模块加载的顺序，按照其在代码中出现的顺序。

module 对象
CommonJS 规范规定，每个模块内部，module 变量代表当前模块。
这个变量是一个对象，它的 exports 属性（即 module.exports）是对外的接口。

module.exports 属性
module.exports 属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取 module.exports 变量。

exports 变量
node 为每一个模块提供了一个 exports 变量(可以说是一个对象)，指向 module.exports。
这相当于每个模块中都有一句这样的命令 var exports = module.exports;这样，在对外输出时，可以在这个变量上添加方法。
例如：exports.add = function (r){return Math.PI * r *r};

注意：不能把 exports 直接指向一个值，这样就相当于切断了 exports 和 module.exports 的关系。
例如：exports=function(x){console.log(x)}; // 错误

一个模块的对外接口，就是一个单一的值，不能使用 exports 输出，必须使用 module.exports 输出。
例如：module.exports = function(x){console.log(x);};
var example = require('./example.js');
example(2);//2

require 方法
require 方法用于加载模块文件，相当于读入并执行一个 js 文件，然后返回该模块的 exports 对象，没有发现指定模块，则就会报错。
例如：example.js
exports.name = 'tom';
exports.age = 50;
在 同目录下的 demo.js 文件中
var example = require('./example.js');
console.log(example.name); // tom
console.log(example.age); // 50
或者 example.js
function fn(){console.log(1)};
var name = 'tom'
module.exports = {fn:fn,name:name}
es6 的对象简写，key 和 value 一致，可以只写一个：module.exports = {fn,name}；
在 同目录下的 demo.js 文件中
var example = require('./example.js');
example.fn(); // 1

ES6 模块与 CommonJS 模块的差异

ES6 模块与 CommonJS 模块完全不同，它们有两个重大差异。

第一个差异：
CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。(实时绑定)
CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

第二个差异：
因为 CommonJS 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行完才会生成。
而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

下面重点解释第一个差异。

CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下面这个模块文件 lib.js 的例子。

// lib.js
var counter = 3;
function incCounter() {
counter++;
}
module.exports = {
counter: counter,
incCounter: incCounter,
};
上面代码输出内部变量 counter 和改写这个变量的内部方法 incCounter。然后，在 main.js 里面加载这个模块。

// main.js
var mod = require('./lib');

console.log(mod.counter); // 3
mod.incCounter();
console.log(mod.counter); // 3
上面代码说明，lib.js 模块加载以后，它的内部变化就影响不到输出的 mod.counter 了。这是因为 mod.counter 是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。

// lib.js
var counter = 3;
function incCounter() {
counter++;
}
module.exports = {
get counter() {
return counter
},
incCounter: incCounter,
};
上面代码中，输出的 counter 属性实际上是一个取值器函数。现在再执行 main.js，就可以正确读取内部变量 counter 的变动了。

$ node main.js
3
4

node 环境下如何使用 jquery

第一步，下载 jquery 包
命令：npm install jquery

第二步 , 下载 jsdom 包
命令：npm install jsdom

第三步，我们新建一个 index.js，代码如下：
const jsdom = require("jsdom");
const { JSDOM } = jsdom; // 解构赋值
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jQuery')(window); // 手动传一个 window 对象，因为 node 中是没有 window 对象的
console.log($); //测试 jquery 是否可以正常工作

第四步：执行命令 node index.js

查看输出信息：

证明 jquery 可以正常使用了
const arr = ['aaa','bbb','ccc','ddd'];
$.each(arr,function (i,val){
console.log(val);
});

截取长图片:
Chrome 浏览器：按 F12 打开调试页面，同时按下 ctrl + shift + p，输入命令 Capture full size screenshot 并回车，浏览器会自动截取整个网页内容并保存为图片。保存路径：此电脑—图片—屏幕截图。

错误的回调优先: 在回调函数中，第一个参数是错误对象，默认为 null，如果出现 err ，则为错误对象

/_
错误处理:
同步 : try catch 异步: 错误回调优先
文件夹的处理
CURD: 增删改查
_/

exports 和 module.exports :
exports = module.exports = {}

当 module.exports 改变指向时， exports 不会跟着改变指向，他们只是最初的时候指向了同一个空对象

如果需要一个一个的输出，推荐使用
exports.a = 1;
exports.b = 2;

如果需要整体输出，只能使用
module.exports = {
a: 1,
b: 2
}

(function(module, require, **dirname, **filename) {
// exports = module.exports = {} // 初始化的时候

    // return module.exports; // 输出这个对象

})();

// node 只是提供了一个 exports 对象指向 module.exports 指向
// 的那个对象，但是如果 module.exports = {...}, exports 不
// 会跟着改变，它还是原来的那个空对象

文件路径:
只有 index 是能够省略的，其他都是不可以省略的

查找模块的顺序: 内置模块 -> node_modules 中的第三方模块(先找自身的，自身没有就找父目录下的，知道根目录，比如 D 盘, C 盘) -> 自定义模块
console.log(module)，打印出的对象中有个 path 数组，就是按照里面的路径一级级向上找
好玩的事情案例: 安装 gulp，本地没有安装也能用，可能是在根目录安装了

文件模块:
文件引入就执行，引入多次，只会执行一次，require 一次，全部执行，引入的内容会放入到内存中，后面再引入，就直接读取 缓存中的值

当两个模块互相引用， node 中不会报错

process

setTimeout 和 setImmediate 的区别:
https://www.cnblogs.com/onepixel/articles/7605465.html

setImmediate 等待主线程执行完了，立即执行
nextTick 这个函数放在主线程队列的最后面，如果这个函数有很多复杂的操作，则会影响事件队列的操作

node 中模块:

1.  const path = require('path')
2.  path.basename()
3.  path.win32.basename()
4.  path.posix.basename()
5.  第一个参数是文件路径,第二个参数是 扩展符，传入.html 则切割掉 .html，l 则切掉后面的 l
6.  根据系统不同，返回值也会不同，posix 系统上只有一个盘，没有分盘，所以他不能识别 c://，那就回返回全部，但是如果没有盘符就可以返回文件名了
7.  path.normalize() 规范化给定的 path，跟我们 app 的路径没有关系，只是把给定的字符串规范化
8.  path.join() 把所有给定的路径合并起来，如果路径不规范，连接起来后悔 normalize 一下
9.  path.resolve() 将路径拼接成绝对路径 //相对路径转为绝对路径时， node 会认为这个相对路径是执行 node 命令的路径，而不是代码文件所在的路径
10. 以上的方法的可以加个 .win32/ .posix
11. path.dirname 得到目录名,如 a/b/c/d/，则目录名为 a/b/c/
12. path.extname 的到文件的扩展名，包括.
13. path.parse(path) 解析路径返回一个对象，
14. path.format(pathObj) 传入一个对象，组装成一个路径，当 root 和 dir 同时存在，取 dir，当 base 和 name / ext 同时存在，取 base 的值（应用场景，需要解析出路径改变文件名 / 解析出文件名，改变路径）
15. \_\_dirname ，是不管文件在哪里执行，都指向文件的路径， path.resolve() 是看文件在哪里执行
16. path.delimiter 取操作系统的路径分割符，比如 process.env.PATH 打印出环境变量(window)
17. path.relative(from, to) 取绝对路径 根据当前工作目录返回 from 到 to 的相对路径
18. **filename 是执行代码的文件所在的路径，包括 文件名 / **dirname 是执行代码的文件所在系统的绝对目录，不包括文件名 ；不会因为入口文件的变化而变化，而 path.resolve('./') 和 process.cwd() 则是执行 node 时的绝对路径；require('./') 是相对于当前路径引入模块

Buffer

1. Buffer.from
2. Buffer.concat() 连接
3. Buffer 是一个类数组对象
4. Buffer.byteLength() 返回二进制的字节长度，中文字符是三个字节，字体图标是四个字节
5. Buffer.length 二进制流的长度
6. Buffer.toString() 二进制流转字符串 / + '' 加一个字符串也会转换成字符串
7. Buffer.fill() 填充
8. Buffer.indexOf()
9. Buffer.copy()
10. buf1.equals(buf2) 判断是否相等
11. buf1.copy(buf2, 0, 1, 6) // （target，开始位置，结束位置）,把 buf1 拷贝到 buf2 中

fs

1. const fs = require('fs')
2. fs.readFile('文件', '编码格式', '回调函数') // 读取文件
3. fs.writeFile() // 写入文件
4. fs.appendFile() // 追加内容
5. fs.stat(文件， (error, statInfo) => {}) statInfo 中有一个 mode 表明是文件还是文件夹，但是不准确，可以使用 statInfo.isFile() 来判断是否是文件, statInfo.isDirectory() 来判断是否是文件夹
6. fs.readdir() // 读取文件夹，只能读取一层
7. fs.mkdir() // 创建文件夹
8. fs.rmdir() // 删除文件夹
9. fs.rename() // 重命名
10. fs.unlink() // 删除文件
11. bf.toString('utf-8'); // 可以传入文件格式 ascii /
12. throw error 异步抛出异常 ，同步可以使用 try catch 捕获异常
13. 所有方法都有同步方法 Sync
14. 错误优先
15. util.promisify(fs.readFile) node 中帮我们封装了这个方法，将异步回调的代码写成 promise 的同步形式的代码

响应的方法:
1: res.setHeader('Content-Type', 'application/json; charset=utf-8')
2: res.statusCode = 200;
3: res.statusMessage()
4: res.write(200, 'ok', {
'Content-Type', 'application/json; charset=utf-8';
'content-length': '123',
})
等等等

url:
1: url.parse()
2: url.format()

案例: 删除 3-1 下的所有 txt 文件
1： 读文件夹 readdir
2 : 遍历
3： 判断是否是文件夹，是就递归
4：得到了所有的文件路径
5：查找 txt ；path.extname 方法
6： unlink 删除文件
7：

作业: 1. http / http2.0 / https 的区别 2. IScroll 的方法 3. node.js 中的方法 4. 写一个 gulp-webserver
