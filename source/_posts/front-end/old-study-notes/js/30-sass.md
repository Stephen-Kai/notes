---
title: 30-sass
tag: old-study-notes
catogory:
  - front-end
  - old-study-notes
---

Sass

Sass 是什么

中文官网： https://www.sass.hk/

CSS 用来编写网页样式，为 CSS 加入编程元素，这被叫做"CSS 预处理器"（css preprocessor）。
SASS (Syntactically Awesome StyleSheets)是一种动态的 CSS（CSS 预处理器），它扩展了 CSS 语法，定义了一套新的语法规则和函数，以加强和提升 CSS。
还有一种 CSS 扩展语言叫 less https://www.bootcss.com/p/lesscss/#guide

Sass 扩展了 css 的特性：
变量
嵌套规则
@import 导入样式
@mixin 混合器及传参
@extend 继承
@if、@for、@function 等

Sass 和 Scss
Sass 包括两套语法：
最开始的语法叫做“缩进语法”，使用缩进来区分代码块，并且用回车将不同规则分隔开；
而较新的语法叫做“SCSS”，使用和 CSS 一样的块语法，即使用大括号将不同的规则分开，使用分号将具体的样式分开。
通常情况下，这两套语法通过.sass 和.scss 两个文件扩展名区分开。

.sass 文件
body
background-color: red
font-size: 16px

div
color: red

.scss 文件
body{
background-color: red;
font-size: 16px;
}

浏览器不认识 sass，需要编译成 css 文件！！

此外，你仍然可以在 Sass 中写普通的 CSS 语句！

安装 Sass
sass 基于 Ruby 语言开发而成，因此安装 sass 前需要安装 Ruby。（注:mac 下自带 Ruby 无需在安装 Ruby!）
window 下安装 SASS 首先需要安装 Ruby，先从官网下载 Ruby 并安装。
安装过程中请注意勾选 Add Ruby executables to your PATH 添加到系统环境变量。

安装完成后需测试安装有没有成功,运行 CMD 输入以下命令：
ruby -v
//如安装成功会打印
ruby 2.6.3p62 (2019-04-16 revision 67580) [x64-mingw32]

因为国内网络的问题导致 gem 源间歇性中断因此我们需要更换 gem 源：
//1.删除原 gem 源
gem sources --remove https://rubygems.org/

//2.添加国内 gem 源
gem sources --add https://gems.ruby-china.com/

//3.打印是否替换成功
gem sources -l

//4.更换成功后打印如下
**_ CURRENT SOURCES _**
https://gems.ruby-china.com

安装 Sass 输入下面的命令：
gem install sass

验证安装情况：
sass -v
Ruby Sass 3.7.4

Sass 常用命令：
//更新 sass
gem update sass
//查看 sass 版本
sass -v
//查看 sass 帮助
sass -h

编译 sass

sass 编译有很多种方式，如命令行编译模式、sublime 插件 SASS-Build、编译软件 koala、前端自动化软件 codekit、Grunt 打造前端自动化工作流 grunt-sass、Gulp 打造前端自动化工作流 gulp-sass 等。

命令行编译
//单文件转换命令
sass sass/a.scss css/a.css --style expanded
sass sass/a.scss:css/a.css --style expanded

//单文件监听命令
sass --watch sass/input.scss:css/output.css --style expanded

//如果你有很多的 sass 文件的目录，你也可以告诉 sass 监听整个目录：
sass --watch sass:css --style expanded
监听目录 sass 中的所有 scss 文件，输出到目录 css 中，编译格式为 expanded

编译配置选项
sass 内置有四种编译格式：nested(缩进嵌套)、expanded(展开式的)、compact(紧凑型的)、compressed(压缩后的)

/_ 未编译样式 _/
.box {
width: 300px;
height: 400px;
&-title {
height: 30px;
line-height: 30px;
}
}

nested 编译排版格式（嵌套的） 不是真的嵌套，只是看起来像
/_命令行内容_/
sass style.scss:style.css --style nested

/_编译过后样式_/
.box {
width: 300px;
height: 400px; }
.box-title {
height: 30px;
line-height: 30px; }

expanded 编译排版格式（展开的）
/_命令行内容_/
sass style.scss:style.css --style expanded

/_编译过后样式_/
.box {
width: 300px;
height: 400px;
}
.box-title {
height: 30px;
line-height: 30px;
}

compact 编译排版格式（紧凑的）
/_命令行内容_/
sass style.scss:style.css --style compact

/_编译过后样式_/
.box { width: 300px; height: 400px; }
.box-title { height: 30px; line-height: 30px; }

compressed 编译排版格式（压缩的）
/_命令行内容_/
sass style.scss:style.css --style compressed

/_编译过后样式_/
.box{width:300px;height:400px}.box-title{height:30px;line-height:30px}

软件方式编译
koala 和 codekit,它们是优秀的编译器，界面清晰简洁，操作起来也非常简单。

koala 是一个国产免费前端预处理器语言图形编译工具，支持 Less、Sass、Compass、CoffeeScript，帮助 web 开发者更高效地使用它们进行开发。跨平台运行，完美兼容 windows、linux、mac。
koala：http://koala-app.com/index-zh.html

注：以下均为 scss 语法

变量
sass 使用$符号来标识变量
$nav-color: #F90;
$width: 100px;
nav {
width: $width;
color: $nav-color;
}
//编译后
nav {
width: 100px;
color: #F90;
}

嵌套规则
在 Sass 中，你可以像俄罗斯套娃那样在规则块中嵌套规则块。
Sass 允许将一套 CSS 样式嵌套进另一套样式中，内层的样式将它外层的选择器作为父选择器。
#box{
width:100px;
height:100px;
h1{
text-align:center;
}
span{
font-size:16px;
a{
color:blue
}
}
}
//编译后
#box {
width: 100px;
height: 100px;
}
#box h1 {
text-align: center;
}
#box span {
font-size: 16px;
}
#box span a {
color: blue;
}

父选择器的标识符& 指向的不是 html 的父级，而是嵌套的那个 sass 中的父级
a {
background-color:red;
&:hover{
font-size:60px;
}
}
//编译后
a {
background-color: red;
}
a:hover {
font-size: 60px;
}

@import 导入样式
css 有一个特别不常用的特性，即@import url()规则，它允许在一个 css 文件中导入其他 css 文件。 页面打开时，link 引用的 css 文件被加载。而@import 引用的 CSS 等页面加载完之后再加载。

sass 也有一个@import 规则，但不同的是，sass 的@import 规则在生成 css 文件时就把相关文件导入进来。
@import "sidebar";这条命令将把 sidebar.scss 文件中所有样式添加到当前样式表中。

// a.scss
$width : 100px;
.before {
    width: $width;
}
@import "b";
.after {
    width: $width;
}
.container {
    width: $width;
    height: $height;
    border: 1px solid;
}
// b.scss
$width : 200px;
$height : 200px
编译后
// a.css
.before {
width: 100px;
}
.after {
width: 200px;
}
.container {
width: 200px;
height: 200px;
border: 1px solid;
}

// bgblue.scss
aside {
background: blue;
color: white;
}

.bluebox {
@import "bgblue"
}

//生成的结果
.bluebox {
aside {
background: blue;
color: #fff;
}
}

混合器（宏） @mixin
你可以通过 sass 的混合器实现大段样式的重用。
@mixin no-bullets {
list-style: none;
li {
list-style-image: none;
list-style-type: none;
margin-left: 0px;
}
}
ul.plain {
color: #444;
@include no-bullets;
}
// 编译后：
ul.plain {
color: #444;
list-style: none;
}
ul.plain li {
list-style-image: none;
list-style-type: none;
margin-left: 0px;
}

给混合器传参 相当于 @animation 动画名
@mixin 名称 (可选参数) 括号里面可以传参
哪里需要就在那里使用 @include 来引入
@mixin link-colors($normal, $hover, $visited) {
color: $normal;
&:hover {
color: $hover;
}
&:visited {
color: $visited;
}
}
a {
@include link-colors(blue, red, green);
}
// 编译后：
a {
color: blue;
}
a:hover {
color: red;
}
a:visited {
color: green;
}

@extend 使用选择器继承来精简 CSS
.error {
border: 1px solid red;
background-color: #fdd;
}
.seriousError {
@extend .error;
border-width: 3px;
}
// 编译后：
.error {
border: 1px solid red;
background-color: #fdd;
}
.seriousError {
border: 1px solid red;
background-color: #fdd;
border-width: 3px;
}

@if 注意 100% 计算，不是我们日常中的计算
如 : $num = 50%
$num \* 5 = 500%
// 当 @if 的表达式返回值不是 false 或者 null 时，条件成立，输出 {} 内的代码：
p {
@if 1 + 1 == 2 { border: 1px solid; }
@if 5 < 3 { border: 2px dotted; }
@if null { border: 3px double; }
}
// 编译为
p {
border: 1px solid;
}

@for
// @for 指令可以在限制的范围内重复输出格式，每次按要求（变量的值）对输出结果做出变动。
@for $i from 1 through 3 {
    .item-#{$i} { width: 2em _ $i; }
}
或者
@for $i from 1 to 4 {
    .item-#{$i} { width: 2em _ $i; }
//item-1 item-2 item-3
}
循环都是 1 - 3，只是前面的写法包含，后面的写法不包含

// 编译为
.item-1 {
width: 2em;
}
.item-2 {
width: 4em;
}
.item-3 {
width: 6em;
}

@function
// Sass 支持自定义函数，并能在任何属性值或 Sass script 中使用：
$grid-width: 40px;
$gutter-width: 10px;
@function grid-width($n) {
    @return $n * $grid-width + ($n - 1) \* $gutter-width;
}
#sidebar { width: grid-width(5); }
// 编译为
#sidebar {
width: 240px;
}

RequireJs

什么是 RequireJs

AMD 规范全称是 Asynchronous Module Definition，即异步模块加载机制。从它的规范描述页面看，AMD 很短也很简单，但它却完整描述了模块的定义，依赖关系，引用关系以及加载机制。

RequireJS 是一个非常小巧的 JavaScript 模块载入框架，是 AMD 规范最好的实现者之一。
CDM 推崇依赖就近 AMD 推崇依赖前置

随着网站功能逐渐丰富，网页中的 js 也变得越来越复杂和臃肿，原有通过 script 标签来导入一个个的 js 文件这种方式已经不能满足现在互联网开发模式，我们需要团队协作、模块复用、单元测试等等一系列复杂的需求。

为什么使用 RequireJS
模块化：模块化就是将不同功能的函数封装起来，并提供使用接口，他们彼此之间互不影响。
RequireJS，会在相关的 js 加载后执行回调函数，这个过程是异步的，所以可以防止 js 加载阻塞页面渲染。
使用程序调用的方式加载 js，防出现如下丑陋的场景：

<script type="text/javascript" src="a.js"></script>
<script type="text/javascript" src="b.js"></script>
<script type="text/javascript" src="c.js"></script>
<script type="text/javascript" src="d.js"></script>
<script type="text/javascript" src="e.js"></script>
<script type="text/javascript" src="f.js"></script>
<script type="text/javascript" src="g.js"></script>
<script type="text/javascript" src="h.js"></script>
<script type="text/javascript" src="w.js"></script>
<script type="text/javascript" src="m.js"></script>

"一个模块就是一个文件"

require 用来加载依赖模块，并执行加载完后的回调函数
require(['moduleA', 'moduleB'], function (a, b){
// ...
});
第一个参数是依赖模块列表，为一个数组
第二个参数是一个 callback 函数， 加载的模块会以参数形式传入该函数

require.config({
baseUrl: 'js/lib',
paths : {
"jquery" : ["http://libs.baidu.com/jquery/2.0.3/jquery","jquery-2.1.4.min"],
"mytask" : "myTask"  
 }
})
require(["jquery","mytask"],function($, mytask){
$(function(){
mytask("load finished");
})
})

require.config 是用来配置模块加载位置，简单点说就是引入模块并起一个别名
比如将百度的 jquery 库地址标记为 jqu ery，这样在 require 时只需要写["jquery"]就可以加载该 js
本地的 js 模块我们也可以这样配置

全局配置
上面的例子中重复出现了 require.config 配置，如果每个页面中都加入配置，必然显得十分不雅，requirejs 提供了一种叫"主数据"的功能，我们首先创建一个 main.js：
require.config({
baseUrl: 'js/lib',
paths : {
"jquery" : ["http://libs.baidu.com/jquery/2.0.3/jquery","jquery-2.1.4.min"],
"mytask" : "myTask"  
 }
})

然后在页面中使用下面的方式来使用 requirejs：

<script src="js/require.js" data-main="js/main"></script>

加载 requirejs 的 script 标签加入了 data-main 属性(设置入口文件)，这个属性指定的 js 将在 require.js 加载完成后处理，我们把 require.config 的配置加入到 data-main 后，就可以使每一个页面都使用这个配置，然后页面中就可以直接使用 require 来加载所有的短模块名。

define 用来定义一个模块，返回一个对象（接口）

define (name, deps, callback)
一般不定义模块的 name， 官方的说法是：让优化工具去自动生成这些模块名！
定义了模块的名字，就写死了，就没办法取别名了

define(function( ){
// ...
return {...};
});

define(['依赖的模块路径'], function(依赖模块名称){
　// ...
　 return {
　　// ...
　};
});
