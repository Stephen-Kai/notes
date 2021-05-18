---
title: 32-webpack
tag: old-study-notes
catogory:
  - front-end
  - old-study-notes
---

webpack 4+

Webpack 是当下最热门的前端资源模块化管理和打包工具。

通过 loader 转换，任何形式的资源都可以当做模块，比如 CommonsJS、AMD、ES6、CSS、JSON、Sass、图片 等。

Webpack 最核心的功能就是解决模板之间的依赖，把各个模块按照特定的规则和顺序组织在一起，最终合并成一个 JS 文件（比如 bundle.js）。这整个过程也常常被称为是模块打包。

官网： https://www.webpackjs.com/

单页面应用: 一个项目只有一个 html 文件，内容切换通过改变组件的方式切换
多页面应用: 一个项目有多个 html 文件

本地安装

要安装最新版本或特定版本，请运行以下命令之一：
npm install --save-dev webpack
npm install --save-dev webpack@<version>
npm install -D

如果你使用 webpack 4+ 版本，你还需要安装 CLI（此工具用于在命令行中运行 webpack）。
装了后可以在命令行运行
npm install --save-dev webpack-cli
npm install webpack-cli -D

对于大多数项目，我们建议本地安装。
在本地安装 webpack 后，你能够从 node_modules/.bin/webpack 访问它的 bin 版本。

全局安装

以下的 NPM 安装方式，将使 webpack 在全局环境下可用：
npm install --global webpack

不推荐全局安装 webpack。这会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。

全局安装，每个项目都能用，就会统一版本，那这样使用不同 webpack 版本的项目中，就会出错

0 配置:
webpack -v 查看版本
webpack --help : 帮助信息
webpack --mode production / development
生产版本 和 开发版本 内部优化不一样

跑全局的: webpack ，
跑本地的: node_modules/.bin/webpack
跑本地的有点长，可以在脚本中(script 中)配置:
"start": "node_modules/.bin/webpack --mode=development" // 开发版本
然后在命令行中输入 run start 可以跑了

起步

在 webpack 4 中，可以无须任何配置使用。

0 配置，其实它内部也是做了很多事的，会有一些默认设置，就需要按照它给定的目录结构创建

创建以下目录结构、文件和内容：运行 webpack
/demo
|- /src
|- index.js
|- /node_modules
|- package.json
|- index.html

然而大多数项目会需要很复杂的设置，这就是为什么 webpack 仍然要支持 配置文件。

通常不使用 0 配置，webpack 就是因为配置更灵活，所以功能更强大

配置文件：webpack.config.js or webpackfile.js

0 配置就相当于做了下面的事情：
入口
输出
const path = require('path');
module.exports = {
entry: './src/index.js', // 单入口文件
output: {
filename: 'bundle.js', // 打包后的文件名称
path: path.resolve(\_\_dirname, 'dist') // 打包后的目录，绝对路径
}
};

单入口文件 entry 后是一个字符串
多入口文件，entry 后面可以是一个数组
多页面应用: entry 后面可以是一个对象

path.resolve 是 path 这个核心模块中的方法，可以拼接路径

nodejs 中的全局变量
**dirname: 当前文件的绝对目录(不包含当前文件)
**filename: 当前文件的绝对路径(包含当前文件的)

由于浏览器中的缓存问题，当我们打包好了新的文件，文件内容改了，但是浏览器有缓存，所以当用户访问的时候，还是会访问之前的文件

webpack 本身就是在 node 中跑的，所以支持 commonJs

上面导入的 path 模块它是一个 Node.js 核心模块，用于操作文件路径。
path 模块：http://nodejs.cn/api/path.html#path_path_resolve_paths
Node.js 中提供了两个与文件操作相关全局变量**dirname 和**filename，
**dirname 表示当前文件所在的目录 ，**filename 表示正在执行脚本的文件名。

webpack 命令将默认选择 webpack.config.js 作为配置文件
等价于：
webpack --config webpack.config.js

webpack --config 任意的 js 文件作为配置文件

在 package.json 添加一个 npm 脚本(npm script)：
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"build": "webpack --config webpack.config.js"
},
使用 npm run build 命令，来替代我们之前使用的命令。

webpack 的四个核心概念：
entry - 入口
output - 输出
loader - 加载器 类似于 gulp 中的 test，别人封装好的，处理各种任务的 loader
plugins - 插件

plugins 的功能比 loader 的功能更强大些，种类更多

入口(entry)

入口起点指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。
可以通过在 webpack 配置中设置 entry 属性，来指定一个入口起点（或多个入口起点）。默认值为 './src' 。

webpack.config.js
module.exports = {
entry: './path/to/my/entry/file.js' // 单个入口文件
};

webpack.config.js
module.exports = {
entry: ['./path/to/my/entry/file1.js', './path/to/my/entry/file2.js'] // 多个入口文件
};
写成数组的方式可以打包多入口文件，打包后合并成一个文件

webpack.config.js
module.exports = {
entry: { // 多页面应用
'page1': './src/page1/index.js',
'page2': './src/page2/index.js',
'page3': './src/page3/index.js'
},
};
根据经验：每个 HTML 文档只使用一个入口起点。

出口(output)

output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 './dist' 。
基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。

webpack.config.js
const path = require('path');
module.exports = {
entry: './path/to/my/entry/file.js',
output: {
path: path.resolve(\_\_dirname, 'dist'), // 打包后的目录，绝对路径
filename: 'bundle.js' // 打包后的文件名称
// filename: 'bundle.[hash:5].js',// 打包后的文件名称
}
};

path 设置打包后的文件目录。
filename 设置打包后的文件名称。

webpack.config.js
const path = require('path');
module.exports = {
// 多页面应用
entry: {
// 'page1': ['./src/page1/index.js','./src/index1.js'],
'page1': './src/page1/index.js',
'page2': './src/page2/index.js',
'page3': './src/page3/index.js'
},
output: {
path: path.resolve(\_\_dirname, 'dist')// 打包后的目录，绝对路径
filename: 'js/[name].[hash:5].js',// 多入口打包[name]将出口文件名和入口文件名对应
// 上面的 入口文件的 key 就对应着 name
要打包到 js 文件夹中，那就 js/[name].[hash:5].js 这里前面添加 js
}
};
多页面应用，多个入口起点，应该使用占位符[name]来确保每个文件具有唯一的名称。

单页面应用: 单入口文件后面接字符串
// 在 node 中跑的，所以支持 commonJs

// 核心概念:
// entry 入口
// output 输出
// loader 加载器
// plugins 插件

const path = require('path');

module.exports = {
'entry': './src/index.js', // 单入口文件
'output': {
// 占位符: 解决浏览器的缓存问题 就像 ajax 请求的时候加上个随机数
// 由于每次打包的都是 bundle.js 这样浏览器就会存在缓存
// name 可以作为全局的一个属性 默认 name 为 main
// filename: 'bundle.[name].js',
// filename: 'bundle.[hash].js', // hash 值，我们每次打包都会有 hash 值
filename: 'bundle.[hash:6].js', // 不用加上所有的 hash, 加上几位就好了
path: path.resolve(\_\_dirname, 'dist')
}
}

// commonJs: require 加载文件 module.exports / exports 来导出模块
// requireJs: 用来处理依赖模块 :require(['moduleA', 'moduleB'], function (a, b){});

// 配置默认运行文件: --config name
// 打包模式: --mode=development
// "start": "node_modules/.bin/webpack --config webpack.config.js --mode=development"

但是加入了 hash 值，我们页面中引入的 js 文件就不能是固定的文件名了，就需要使用要插件

多入口文件,需要把两个入口文件打包成一个入口文件

单页面应用 多入口文件:

多页面应用: 后面是一个对象:

加载器(loader)

loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。
因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。

loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。
loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。
loader 甚至允许你直接在 JavaScript 模块中 import CSS 文件！

对于 webpack 来说，所有东西都是模块，比如 css 也可以
import('./src/page1/index.css');

在 webpack 的配置中 loader 有两个目标：

1. test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
2. use 属性，表示进行转换时，应该使用哪个 loader。

webpack.config.js
const path = require('path');
module.exports = {
entry: './path/to/my/entry/file.js',
output: {
path: path.resolve(\_\_dirname, 'dist'),
filename: 'my-bundle.js'
},
module: {
rules: [
{
test: /\.css$/, // 解析 css 匹配所有后缀是 css 的文件
use: ['style-loader', 'css-loader'] // 从右向左解析
// css-loader ( 从 js 中 把 css 抽离出来)执行完了，再交给 style-loader(把抽离出来的 css 放在 head 中的 style 标签里)
}
]
}
};

以上配置将告诉 webpack 编译器如下信息：
“嘿，webpack 编译器，当你碰到「在 require()/import 语句中被解析为 '.css' 的路径」时，在你对它打包之前，先使用 css-loader 转换，再使用 style-loader 转换一下。”

loader 也能够使用 options 对象进行配置。
module: {
rules: [
{
test: /\.css$/,
use: [
{ loader: 'style-loader' },
{
loader: 'css-loader',
options: {
modules: true
}
}
]
}
]
}

插件(plugins)

插件是 webpack 的支柱功能，插件目的在于解决 loader 无法实现的其他事。
loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。
插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。

想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中，使用 new 操作符来创建它的一个实例。

webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
entry: './path/to/my/entry/file.js',
output: {
path: path.resolve(\_\_dirname, 'dist'),
filename: 'my-bundle.js'
},
module: {
rules: [
{
test: /\.css$/,
use: ['style-loader', 'css-loader']
}
]
},
plugins: [
// 创建类的一个实例，使用 src 目录下的 index.html 作为模板来打包
// 打包后生成的 html 自动引入 js、css 等资源
// 有多个就创建多个对象，但是还需要其他配置，否则名字一样，产生覆盖，还有引入 js 也会引入多个，需要配置，看官网

    // 使用 filename 可以命名文件 如
     // new HtmlWebpackPlugin( {
    template: './src/index.html',
    filename: 'page1'
    } )

// 这个时候每个页面都引入了 3 个文件，可以使用 chunks 来指定
// new HtmlWebpackPlugin( {
template: './src/index.html', // 打包的 html 模板
filename: 'page1', // 打包之后生成的 html 文件名称
chunks: ['page1] //对应关系，生成的 page1.html 使用对应的入口资源，如入口名为 page1,则引入 page1 的 js 文件
} )

    // 这些功能是插件提供的，不是 webpack 提供的

        new HtmlWebpackPlugin( {template: './src/index.html'} )
    ]

};

使用 npm info 包名 查看包的版本信息

模式

设置 mode 参数，可以启用相应模式下的 webpack 内置优化

可选择 development 或 production 之中的一个，默认为 production
在配置中提供 mode 选项：
module.exports = {
mode: 'development'
};

或者从 CLI 参数中传递：
webpack --mode=development

提取 CSS

extract-text-webpack-plugin 和 mini-css-extract-plugin（webpack 4+）(官方推荐，但是只能在 webpack 4+ 才能用)
插件将 CSS 提取到单独的文件中。它为每个包含 CSS 的 JS 文件创建一个 CSS 文件。(webpack 中的 loader 只能写在 head 中 的 style 标签中)

安装 loader：npm i mini-css-extract-plugin -D

extract-text-webpack-plugin 这个插件可以使用 npm info 包名来查看版本信息,如果要在 webpack 4 中使用要使用 next 版本
mini-css-extract-plugin 与 extract-text-webpack-plugin 相比：

- 异步加载
- 没有重复的编译（性能）
- 更容易使用
- 特定于 CSS（extract-text 不一定是用于 css 中，text text 文本）
  webpack.config.js
  // mini-css-extract-plugin 插件将 CSS 提取到单独的文件中
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  module: {
  rules: [
  {
  test: /\.css$/,
  use: [MiniCssExtractPlugin.loader,'css-loader']
  // 将 css 用 link 的方式引入，不再需要 style-loader 了
  }
  ]
  },
  plugins: [
  new MiniCssExtractPlugin({
  // 类似 webpackOptions.output 里面的配置
  filename: 'css/[name].[hash:5].css'
  }),
  ]

@next 表示可以支持 webpack4 版本的插件
安装 loader：npm i extract-text-webpack-plugin@next -D

webpack.config.js
// extract-text-webpack-plugin 插件将文本（CSS）提取到单独的文件中
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
module: {
rules: [
{
test: /\.css$/,
use: ExtractTextWebpackPlugin.extract({ // 用这个插件把 css 放到某个文件
// 将 css 用 link 的方式引入就不再需要 style-loader 了
use: 'css-loader', // 还是需要用这个模块解析 css
// publicPath: '../'
})
},
]
},
plugins: [
// 放到 css 文件夹中 也要考虑浏览器缓存问题，要确保文件名的唯一性，name 根据 入口的 key 来决定
new ExtractTextWebpackPlugin('css/[name].[hash:5].css')
]

CSS 中引入图片

安装 loader：npm i url-loader -D
在 css 文件里引入背景图之类的图片，需要指定一下相对路径！

url-loader 中依赖 file-loader,要使用 url-loader，必须要安装 file-loader

webpack.config.js
module: {
rules: [
{
test: /\.css$/,
            use: ExtractTextWebpackPlugin.extract({
                // 将css用link的方式引入就不再需要style-loader了
                use: 'css-loader',
                publicPath: '../' // 在css中指定相对路径，就可以根据相对路径引用到图片资源
            })
        },
        {
            test: /\.(jpe?g|png|gif)$/,
use: [ // use 数组中使用对象，可以在对象中添加配置项
{
loader: 'url-loader',
options: {
limit: 8192, // 小于 8k 的图片自动转成 base64 格式，不会存在实体图片
outputPath: 'imgs/' // 图片打包后存放的目录
}
}
]
}
]
},

页面 img 引入图片

安装 loader：npm i html-withimg-loader -D

webpack.config.js
module: {
rules: [
{
test: /\.(htm|html)$/,
use: [
{
loader: 'html-withimg-loader',
options: {
limit: 8192, // 小于 8k 的图片自动转成 base64 格式，不会存在实体图片
outputPath: 'imgs/' // 图片打包后存放的目录
}
}
]
}
]
},

开发服务器

安装： npm i webpack-dev-server -D

添加 npm scripts：{ "start": "webpack-dev-server" }

启动一个静态服务器，默认会自动刷新，就是说你对 html,css,js 文件做了修改并保存后，浏览器会默认刷新一次展现修改后的效果。

不会重新打包一个实际文件，而是在内存中存有打包的那个文件，显示内存中那个文件

需要在 module.exports 中再添加一个字段 devServer

https://www.npmjs.com/package/webpack-dev-server

webpack.config.js
module.exports = {

    mode: "development" , // 开发环境不需要打包生产环境的包

    devServer:{ // 开发服务器配置
        contentBase: './dist', // 指定启动目录
        open: true, // 自动打开浏览器
        port: 3003, // 设置启动端口  node 一般是 3000开头的
        // hot: true, // 启用热更新
    },

};

运行 npm run start 启动服务器
在 script 中配置了脚本命令
"start": "webpack-dev-server --config webpack.config.js"

删除上次打包出来的文件

安装插件: npm i clean-webpack-plugin -D

webpack.config.js
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
plugins: [
new CleanWebpackPlugin(), // 默认删除 webpack output.path 目录中的所有文件
]

如何让一个元素相对于父元素固定定位
之前在项目中，遇到了一个场景，需要实现相对于父元素的 fixed 定位：在父元素内拖动滚动条时，"fixed"定位的元素不能滑动，在外层拖动滚动条时，父元素及父元素内的所有元素跟着一起滑动。但是 position: fixed 是相对于窗口进行的定位，不能直接实现我们需要的效果。

我们想让特定子元素相对于父元素"fixed"定位，也就是说，剩余的子元素不定位。那我们可以分开来想，如果添加一个祖先元素 assistor，有两个祖先元素，一个用于辅助定位，一个用于包裹不定位的内容，这个问题不就解决了吗。像这样

实质上是 child 相对于 assistorabsolute 定位，parent 内的内容自己负责展示。只要 assistor 和 parent 一样大，看起来就像是子元素 child 相对于父元素 parent 固定定位了。具体原理是 position: absolute;的元素会相对于第一个设置了 position: relative;的祖先元素进行定位，我们将 assistor 设置为 position: reletive;，滚动条是在 parent 中的，这样"fixed"定位和 parent 内的内容滚动就都实现了。

设置渐变色:
background: -webkit-linear-gradient(left, orange, red);
从左边开始的渐变色
