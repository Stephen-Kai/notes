---
title: 29-gulp
tag: old-study-notes
catogory:
  - front-end
  - old-study-notes
---

Gulp

什么是 Gulp

Gulp 是基于 Node.js 流的前端自动化构建工具

为什么使用 Gulp

Gulp 自动化构建工具可以增强你的工作流程！
易于使用、易于学习、构建快速、插件高质！
在日常开发中，可以借助 Gulp 的一些插件完成很多的前端任务。
如：代码的编译（sass、less）、压缩 css，js、图片、合并 js，css、es6 转 es5、自动刷新页面等。

从性能优化的角度看，减少请求数，如果合并成一个文件，那就只需要请求一次了，当然这个也需要看情况，如果合并后文件过大，加载时间长，用户体验度不好的话，那就看情况了

前端构建工具还有: grunt、webpack、browserify

gulp 中文官网： https://www.gulpjs.com.cn/
插件地址： https://gulpjs.com/plugins/

使用 Gulp

都是基于 node 流，使用管道来读取文件，设置文件，打包到 dist 目录(一个文件夹就像是一个水桶，里面的内容就是水，通过管道来流通)

确保根目录存在 package.json 文件，执行 npm init -y 生成
建议安装 3.x.x 版本，稳定、插件较多

1.全局安装 gulp：三版本
$ npm install gulp@3 --global

2.作为项目的开发依赖（devDependencies）安装：
$ npm install gulp@3 --save-dev

3.在项目根目录下创建一个名为 gulpfile.js 的配置文件：
var gulp = require('gulp');
gulp.task('default', function() {
// 将你的默认任务的代码放在这
console.log('hello world');
});

4.命令行运行 gulp：
$ gulp

直接运行 gulp 默认执行 default 任务（task）。
想要单独执行特定的任务（task），请输入 gulp taskName

Gulp API 介绍

使用 gulp，仅需知道几个 API 即可：gulp.task()、gulp.src()、pipe()、gulp.dest()、gulp.watch()

gulp.task 方法用来定义任务
gulp.task(name[, deps], fn)
name 为任务名
deps 是当前定义的任务需要依赖的其他任务，为一个数组。当前定义的任务会在所有依赖的任务执行完毕后才开始执行。如果没有依赖，则可省略这个参数。
fn 为任务函数，我们把任务要执行的代码都写在里面。该参数也是可选的。因为有可能只是用来执行其他的，就不用一个一个选了

定义一个有依赖的任务
var gulp = require('gulp');
gulp.task('mytask', ['task1', 'task2', 'task3'], function() {
console.log('执行任务 mytask');
});

gulp 中执行多个任务，可以通过任务依赖来实现：
// 只要执行 default 任务，就相当于把 one,two,three 这三个任务执行了
var gulp = require('gulp');
gulp.task('default',['one','two','three']);

如果某个任务所依赖的任务是异步的，gulp 并不会等待那个所依赖的异步任务完成，而是会接着执行后续的任务。例如：
var gulp = require('gulp');
gulp.task('one',function(){
//one 是一个异步执行的任务
setTimeout(function(){
console.log('one is done')
},5000);
});

//two 任务虽然依赖于 one 任务,但并不会等到 one 任务中的异步操作完成后再执行
gulp.task('two',['one'],function(){
console.log('two is done');
});

在异步操作完成后执行一个回调函数来通知 gulp 这个异步任务已经完成，这个回调函数就是任务函数的第一个参数。
var gulp = require('gulp');
gulp.task('one',function(done){ //done 为任务函数提供的回调，用来通知任务已经完成
//one 是一个异步执行的任务
setTimeout(function(){
console.log('one is done');
done(); //执行回调，表示这个异步任务已经完成
},5000);
});

//这时 two 任务会在 one 任务中的异步操作完成后再执行
gulp.task('two',['one'],function(){
console.log('two is done');
});

gulp.src 方法用来读取文件(管道)
gulp.src(globs[, options])
globs 参数是文件匹配模式(类似正则表达式)，当然也可以直接指定某个具体的文件路径。当有多个匹配模式时，该参数为一个数组。
options 为可选参数，通常不需要用到。

gulp.src('./js/a.js'); // 读取一个文件，这就是具体路径
gulp.src('./js/\*.js'); // 读取 js 目录下的所有 js 文件
gulp.src(['./js/a.js','./js/b.js']); // 读取两个文件

匹配模式：

- 匹配文件路径中的 0 个或多个字符，但不会匹配路径分隔符(/)，除非路径分隔符出现在末尾 \*_ 匹配路径中的 0 个或多个目录及其子目录，需要单独出现，即它左右不能有其他东西了。如果出现在末尾，也能匹配文件。
  ? 匹配文件路径中的一个字符(不会匹配路径分隔符)
  [...] 匹配方括号中出现的字符中的任意一个，当方括号中第一个字符为^或!时，则表示不匹配方括号中出现的其他字符中的任意一个，类似 js 正则表达式中的用法
  !(pattern|pattern|pattern) 匹配任何与括号中给定的任一模式都不匹配的
  ?(pattern|pattern|pattern) 匹配括号中给定的任一模式 0 次或 1 次，类似于 js 正则中的(pattern|pattern|pattern)?
  +(pattern|pattern|pattern) 匹配括号中给定的任一模式至少 1 次，类似于 js 正则中的(pattern|pattern|pattern)+
  _(pattern|pattern|pattern) 匹配括号中给定的任一模式 0 次或多次，类似于 js 正则中的(pattern|pattern|pattern)\*
  @(pattern|pattern|pattern) 匹配括号中给定的任一模式 1 次，类似于 js 正则中的(pattern|pattern|pattern)

匹配示例：

- 能匹配 a.js,x.y,abc,abc/,但不能匹配 a/b.js
  _._ 能匹配 a.js,style.css,a.b,x.y
  _/_/_.js 能匹配 a/b/c.js,x/y/z.js,不能匹配 a/b.js,a/b/c/d.js
  ** 能匹配 abc,a/b.js,a/b/c.js,x/y/z,x/y/z/a.b,能用来匹配所有的目录和文件
  **/_.js 能匹配 foo.js,a/foo.js,a/b/foo.js,a/b/c/foo.js 当前目录以及所有的子目录
  a/**/z 能匹配 a/z,a/b/z,a/b/c/z,a/d/g/h/j/k/z
  a/**b/z 能匹配 a/b/z,a/sb/z,但不能匹配 a/x/sb/z,因为只有单\*\*单独出现才能匹配多级目录
  ?.js 能匹配 a.js,b.js,c.js
  a?? 能匹配 a.b,abc,但不能匹配 ab/,因为它不会匹配路径分隔符
  [xyz].js 只能匹配 x.js,y.js,z.js,不会匹配 xy.js,xyz.js 等,整个中括号只代表一个字符
  [^xyz].js 能匹配 a.js,b.js,c.js 等,不能匹配 x.js,y.js,z.js

gulp.dest 方法用来写入文件（设置生成文件的路径）
gulp.dest(path[,options])
path 为写入文件的路径。
options 为可选参数，通常不需要用到。

var gulp = require('gulp');
gulp.task('mytask', function() {
gulp.src("./js/a.js")
.pipe(gulp.dest("./dist/"));
});
读取文件流（gulp.src），通过管道（pipe），把文件流写入（gulp.dest）当前目录下的 dist 文件夹中

字节流: 读取图片等
字符流：文本内容等

文件少的话，还可以写死

gulp.watch 方法用来监视文件的变化
gulp.watch(globs[, opts], tasks)
globs 为要监视的文件匹配模式，规则和用法与 gulp.src()方法中的 globs 相同。
opts 为可选参数，通常不需要用到。
tasks 为文件变化后要执行的任务(数组)

gulp.watch()还有另外一种使用方式：
gulp.watch(glob[, cb])
cb 参数为一个函数。每当监视的文件发生变化时，就会调用这个函数,并且会给它传入一个对象，该对象包含了文件变化的一些信息。
gulp.watch('./\*_/_.\*', function(event){
console.log(event.type); //added 为新增，deleted 为删除，changed 为改变
console.log(event.path); //变化的文件路径
});

Gulp 常用插件

文件合并（js、css）
使用 gulp-concat
安装：npm install --save-dev gulp-concat
var gulp = require('gulp');
var concat = require('gulp-concat');
gulp.task('concat', function () {
gulp.src('./js/\*.js') //要合并的文件
.pipe(concat('all.js')) //合并匹配到的 js 文件并命名为 "all.js"
.pipe(gulp.dest('./dist/'));//写入 dist 文件夹
});

js 文件压缩
使用 gulp-uglify
安装：npm install --save-dev gulp-uglify
var gulp = require('gulp');
var uglify = require('gulp-uglify');
gulp.task('minifyJS', function () {
gulp.src('./dist/all.js') // 要压缩的 js 文件
.pipe(uglify()) //使用 uglify 进行压缩
.pipe(gulp.dest('./dist/js'));//写入 js 文件夹
});

css 文件压缩
使用 gulp-minify-css
安装：npm install --save-dev gulp-minify-css
var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
gulp.task('minifyCss', function () {
gulp.src('./css/\*.css') // 要压缩的 css 文件
.pipe(minifyCss()) //压缩 css
.pipe(gulp.dest('./dist/'));//写入 dist 文件夹
});

重命名
使用 gulp-rename
安装：npm install --save-dev gulp-rename
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
gulp.task('rename', function () {
gulp.src('./js/jquery-1.8.3.js') //读取文件
.pipe(uglify()) //压缩
.pipe(rename('jquery-1.8.3.min.js'))//重命名
.pipe(gulp.dest('./js/'));//写入 js 文件夹
});

html 文件压缩
使用 gulp-minify-html
安装：npm install --save-dev gulp-minify-html
var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
gulp.task('minifyHtml', function () {
gulp.src('./test.html') //要压缩的 html 文件
.pipe(minifyHtml()) //压缩 html
.pipe(gulp.dest('./dist/'));//写入 dist 文件夹
});

less 编译
使用 gulp-less
安装：npm install --save-dev gulp-less
var gulp = require('gulp'),
less = require("gulp-less");
gulp.task('compile-less', function () {
gulp.src('./less/\*.less')
.pipe(less())
.pipe(gulp.dest('./dist/'));
});

sass 编译
使用 gulp-sass
安装：npm install --save-dev gulp-sass
var gulp = require('gulp'),
sass = require("gulp-sass");
gulp.task('sass',function () {
gulp.src('./test.scss')
.pipe(sass())
.pipe(gulp.dest('./dist/'));
});

gulp.task('compileSass',function () {
gulp.watch('./test.scss',['sass']);
});

图片压缩
使用 gulp-imagemin
安装：npm install --save-dev gulp-imagemin
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
gulp.task('imagemin', function () {
gulp.src('./img/\*') // 要压缩的图片
.pipe(imagemin()) // 压缩图片
.pipe(gulp.dest('./dist/'));//写入 dist 文件夹
});

ES6 转 ES5
使用 gulp-babel
安装：npm install --save-dev gulp-babel @babel/core @babel/preset-env
var gulp = require('gulp');
var babel = require('gulp-babel');
gulp.task('es6', function () {
gulp.src('./es6-class.js')
.pipe(babel({ presets: ['@babel/preset-env']}))
.pipe(gulp.dest('./dist/'))
});

浏览器自动刷新
使用 browser-sync
安装：npm install --save-dev browser-sync
var gulp = require('gulp');
var server = require('browser-sync').create();//执行函数返回对象
gulp.task('server',function(){
server.init({
server:"./",
port:3002
});
gulp.watch('./\*.html').on('change',server.reload);//监听变化，执行刷新
});

自动加载
使用 gulp-load-plugins 可以获得所有 依赖 的 gulp 插件
安装：npm install --save-dev gulp-load-plugins
var gulp = require('gulp');
var load = require('gulp-load-plugins')(); //加载并马上运行它，返回一个对象
然后我们要使用 gulp-rename、gulp-imagemin 和 gulp-uglify 这些插件的时候，就可以使用 load.rename 和 load.imagemin 来代替了,也就是原始插件名去掉 gulp-前缀，之后再转换为驼峰命名。

实质上 gulp-load-plugins 是为我们做了如下的转换:
load.imagemin = require('gulp-imagemin');
load.rename = require('gulp-rename');
load.uglify = require('gulp-uglify');
var gulp = require('gulp');
var load = require('gulp-load-plugins')();//立即执行之后得到一个加载对象

gulp.task('imagemin', function () {
gulp.src('./img/\*') // 要压缩的图片
.pipe(load.imagemin()) // 压缩图片
.pipe(gulp.dest('./dist/'));//写入 dist 文件夹
});

gulp.task('rename', function () {
gulp.src('./js/jquery-1.8.3.js') //读取文件
.pipe(load.uglify()) //压缩
.pipe(load.rename('jquery-1.8.3.min.js'))//重命名
.pipe(gulp.dest('./js/'));//写入 js 文件夹
});

//错误处理提示插件
var plumber = require('gulp-plumber'),
//压缩文件
zip = require('gulp-zip'),
//控制 task 中的串行和并行。（gulp 默认是并行）
//串行是指多个任务时，各个任务按顺序执行，完成一个之后才能进行下一个。
//并行指的是多个任务可以同时执行。
runSequence = require('gulp-run-sequence'),
//用来删除文件
clean = require('gulp-clean');

gulp.task('default', ['task1', 'task2', 'task3']);
// 相当于是 promise.all，几个任务是并行的，没办法保证顺序,但是如果几个任务中有依赖关系就会出错，这个就是让任务串行

在 gulpfile.js 里面配置

// 加载包
const gulp = require('gulp');
const server = require('browser-sync').create();
const load = require('gulp-load-plugins')();

// 合并文件
gulp.task('concatCss',function (){
gulp.src('./css/\*_/_.css')
.pipe(load.concat('test.css'))
.pipe(gulp.dest('./dist/css'))
});

gulp.task('concatJs',function (){
gulp.src(['./js/a.js','./js/b.js'])
.pipe(load.concat('test.js'))
.pipe(load.uglify())
.pipe(gulp.dest('./dist/js'))
});

gulp.task('uglify',function (){
gulp.src(['./js/goodsList.js','./js/shoppingCar.js'])
.pipe(load.concat('cart.js'))
.pipe(load.uglify())
.pipe(gulp.dest('./dist/js'))
});

gulp.task('minifyHtml',function (){
gulp.src('./test.html')
.pipe(load.minifyHtml())
.pipe(gulp.dest('./dist'))
});

gulp.task('default',['minifyHtml','concatCss','concatJs']);

// 删除文件
gulp.task('clean',function (){
gulp.src('./dist/\*',{read: false})
.pipe(load.clean())
});

// 压缩图片
gulp.task('imagemin',function (){
gulp.src('./img/_._')
.pipe(load.imagemin())
.pipe(gulp.dest('./dist/img'))
});

// es6 to es5
gulp.task('toes5',function (){
gulp.src('./js/class.js')
.pipe(load.babel({ presets: ['@babel/preset-env']}))
.pipe(gulp.dest('./dist/js'))
});

// 自动刷新
gulp.task('server',function (){
server.init({
server:'./',
port: 3003
})
gulp.watch('./\*.html').on('change',server.reload)
})
