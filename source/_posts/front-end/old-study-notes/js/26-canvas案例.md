---
title: 26-canvas案例
tag: old-study-notes
catogory:
  - front-end
  - old-study-notes
---

canvas 案例
。。。

Web Worker

JS 运行在浏览器中，是单线程的，每个 window 一个 JS 线程
JavaScript 高强度的计算会导致浏览器无暇顾及用户页面而进入假死状态

Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给 Worker 线程运行。
在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。
等到 Worker 线程完成计算任务，再把结果返回给主线程。
这样的好处是，一些高强度计算或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

Web Worker 有以下几个使用注意点：

（1）同源限制
分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

（2）DOM 限制
Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用 document、window 这些对象。但是，Worker 线程可以 navigator 对象和 location 对象。

（3）通信联系
Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

（4）脚本限制
Worker 线程不能执行 alert()方法和 confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。

（5）文件限制
Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络（服务环境运行）。

支持性检测
if(typeof Worker !== "undefined"){
alert('支持多线程');
}else{
alert('不支持多线程');
}
IE6789 不支持

主线程

主线程采用 new 命令，调用 Worker()构造函数，新建一个 Worker 线程。

var worker = new Worker('worker.js');

Worker()构造函数的参数是一个脚本文件，该文件就是 Worker 线程所要执行的任务。

主线程调用 worker.postMessage()方法，向 Worker 发消息。

worker.postMessage('Hello World');
worker.postMessage({name: 'xm', friends: ['xh','xf']});

主线程通过 worker.onmessage 指定监听函数，接收子线程发回来的消息。

worker.onmessage = function (event) {
console.log(event.data);
// doSomething
}

onmessage = function (event) {
}

事件对象的 data 属性可以获取 Worker 发来的数据。

Worker 完成任务以后，主线程就可以把它关掉。

worker.terminate();

主线程可以监听 Worker 是否发生错误。如果发生错误，Worker 会触发主线程的 error 事件。

Worker 线程

Worker 线程内部需要有一个监听函数，监听 message 事件

self.addEventListener('message', function (event) {
console.log(event.data);
// doSomething
}, false);
上面代码中，self 代表子线程自身，即子线程的全局对象

等同于下面两种写法:

// 写法一
this.addEventListener('message', function (event) {
console.log(event.data);
// doSomething
}, false);

// 写法二
addEventListener('message', function (e) {
console.log(event.data);
// doSomething
}, false);

就相当于:
onmessage = function() {}
self.onmessage = function () {}
this.onmessage = function () {}

worker 线程里面是没有全局对象，全局对象就相当于是 worker 自己,没有 window,document，主要是为了计算一些高强度的，高延迟的任务

除了使用 self.addEventListener()指定监听函数，也可以使用 self.onmessage 指定

事件对象的 data 属性包含主线程发来的数据

self.postMessage() 方法用来向主线程发送消息

self.close() 用于在 Worker 内部关闭自身

Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。

Worker 内部如果要加载其他脚本，有一个专门的方法 importScripts()

worker.html

<body>
<button class="btn">按钮</button>
<button class="btn2">执行其他任务</button>
<h1 class="con"></h1>

<script>
var btn = document.querySelector('.btn');
var btn2 = document.querySelector('.btn2');
var con = document.querySelector('.con');


// 支持检测
// if (typeof Worker != 'undefined') {
// alert('支持');
// } else {
// alert('不支持');
// }

btn2.onclick = function (){
console.log('执行其他任务');
}

// var num = 0;
// for (var i = 0; i < 1000000000; i++){
// num+=i;
// }
// console.log(num);


btn.onclick = function (){
var worker = new Worker('worker.js');

// worker.postMessage('干活了');//给worker线程发送数据
// worker.onmessage = function (event){
// // console.log(event.data);
// con.innerText = event.data;
// }

worker.postMessage('abc1001');//给worker线程发送数据
worker.onmessage = function (e){
var json = JSON.parse(e.data);
con.innerText = `姓名：${json.name}，性别：${json.sex}，年龄：${json.age}`;
worker.terminate();//关闭 worker线程
}
}
</script>
</body>

work.js
importScripts('ajax.js');
onmessage = function (event){
// console.log(event);
// console.log(event.data);//主线程发过来的消息
if (event.data == '干活了') {
var num = 0;
for (var i = 0; i < 2000000000; i++){
num+=i;
}
// console.log(num);
postMessage(num);//把计算结果返回给主线程
}

if (event.data == 'abc1001') {
ajax({
url: 'datas.php',
type: 'get',
data: 'userid=' + event.data,
succeed: function (jsonStr){
postMessage(jsonStr);
close();// 用于在 Worker 内部关闭自身
}
});
}
}

// self.onmessage = function (){
// }

// this.onmessage = function (){
// }
