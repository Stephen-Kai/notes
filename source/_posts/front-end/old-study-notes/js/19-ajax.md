---
title: 19-ajax
tag: old-study-notes
catogory:
  - front-end
  - old-study-notes
---

ajax

安装 wamp 的目的：将一台计算机变成 web 服务器，方便开发者在真正的服务器环境进行测试

JSON 与 XML 都是常见的数据格式
JSON（JavaScript Object Notation）轻量级数据格式
XML 是一种可扩展标记语言，与 HTML 都是标记语言

JSON 的优势：
轻量级，体积小，节省流量，提高加载速度
解析成原生 JS 对象，解析比 XML 更快
查找数据无需查找标签，更快速更高效

xml 中多了很多标签,文件体积更大，访问速度更慢，需要更多流量，
加载速度更快，对于用户来说也可以节省流量

在数据传输流程中，JSON 是以文本即字符串的形式传递的，而 JS 操作的是 JSON 对象
所以，JSON 对象和 JSON 字符串之间的相互转换是关键：

var json1 = '{ "name": "cxh", "sex": "man" }'; // JSON 字符串
var json2 = { "name": "cxh", "sex": "man" }; // JSON 对 象

由 JSON 字符串转换为 JSON 对象
方法一. var obj1 = eval('(' + json1 + ')');
方法二. var obj2 = json1.parseJSON();
方法三. var obj3 = JSON.parse(json1); // 需严格的 json 格式

将 JSON 对象转化为 JSON 字符串
方法一. var str1=json2.toJSONString();
方法二. var str2=JSON.stringify(json2);

ajax 是什么

国内常翻译为“阿贾克斯”

AJAX => Asynchronous Javascript And XML
直译：异步的 JavaScript 和 XML
AJAX 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术(局部刷新)

通俗的讲，AJAX 就是 JS 通过一个网址去加载数据，这个过程通常是用户不可见的
传统的网页（不使用 AJAX）如果需要更新内容，必需重新加载整个网页,浪费用户流量，降低用户体验

生活中的同步和和异步：
同步：先煮完饭后，再去烧菜。 （一个时间段内，事情按照顺序做）
异步：煮饭同时也在烧菜。（一个时间段内，事情不按顺序做）

在程序中，同步和异步的区别就是在于代码的执行顺序。
同步代码按照顺序运行，异步代码不按照顺序运行。

ajax 如何使用

同步：数据请求回来了才能去做下一件事
异步：发送请求后，先不管，先执行下面的代码

XMLHttpRequest 对象可以与服务器交互数据
主流 W3C 标准浏览器都支持 XMLHttpRequest 对象（ajax 对象）

低版本的 IE 浏览器（IE5 和 IE6） 使用 ActiveXObject

1.创建 ajax 对象
if(window.XMLHttpRequest){ // 非 IE5 IE6
var xhr=new XMLHttpRequest();
}else{ // IE5 IE6
var xhr=new ActiveXObject("Microsoft.XMLHTTP");
};

2.连接服务器
xhr.open(method,url,async);
参数 说明：
method：请求的类型 get 或 post
url：文件在服务器上的位置(数据地址)
async：可选，默认 true（异步）， false（同步）
同步需要等待返回结果才能继续，异步不必等待
通常使用异步(true)，不推荐使用同步(false)
如：xhr.open('get','test.php',true);

3.将请求发送到服务器
xhr.send(param);
param：对于 get 请求，参数为空或 null
如：xhr.send(null);

param：对于 post 请求，参数为发送到服务器的数据
如：xhr.send('name=xiaoming&age=24');

为 post 请求时，需要在 send()之前设置 http 请求头：作用是模拟表单 post 来传递参数
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

get 和 post 区别
_ get 参数通过 url 传递，post 放在请求体（request body）中；
_ get 请求在 url 传递的参数有长度限制，而 post 没有；
_ get 比 post 更不安全，因为参数直接显示在 url 地址中，所以不能传递敏感数据；
_ get 请求浏览器会主动缓存，而 post 不会； \* get 请求参数会保存在浏览历史记录，而 post 请求不会；
get 和 post 本质上都是 tcp 连接。

4.服务器响应情况
readyState 属性存有 XMLHttpRequest 对象的状态
readyState 会从 0 到 4 发生变化：
0: 请求未初始化 1: 服务器连接已建立 2: 请求已接收  
3: 请求处理中 4: 请求已完成
当 readyState 改变时就会触发 onreadystatechange 事件

status：http 请求的状态码
状态码代表着 http 请求是成功还是失败等信息。
下面是常见的 HTTP 状态码（HTTP Status Code）：
_ 200：请求成功(数据请求成功了)
_ 301：网页被重定向到其它 URL(服务器重定向到另一个页面)
_ 304：文件未被修改，使用缓存资源(使用本地缓存就行了) 就像我们去访问一个网站，第二次打开的时候会比前面更快，因为第一次访问的时候有很多资源就缓存下来了，用户体验会更好，但是不适用于那些数据经常变化的
浏览器有一个机制，如果我们去请求同一个请求资源，浏览器会默认使用上次缓存的数据，解决这个问题，在 url 后面拼接一个绝对不一样的数据(比如时间 cuo，随机数),我们加了，但是后端接不接收是后端的事，这样请求的是不一样的资源，浏览器就不会使用本地缓存中的内容，
_ 404：找不到此网页（指定的资源） \* 500：服务器内部错误
更多状态码： https://www.runoob.com/http/http-status-codes.html

当 readyState 为 4 且 status 为 200 时，表示响应已就绪，请求成功
xhr.onreadystatechange=function (){
if (xhr.readyState==4) { // 请求完成
if (xhr.status==200) { //ok 成功
alert( xhr.responseText ); // 得到响应结果
} else{
alert( xhr.status ); // 弹出失败的状态码
};
};
}

xhr.responseText 获得文本形式的响应数据
xhr.responseXML 获得 XML 形式的响应数据

json 文件

1. json 文件中不能有注释
2. json 文件比 xml 文件小，没有 xml 中这么多标签
3. 读取更方便

思考：如何封装 ajax 函数

ajax 练习： 1.简单的登录验证 2.百度搜索关键词联想 'http://suggestion.baidu.com/su?wd=' 3.注册、登录（连数据库）

跨域

由于浏览器的同源策略，禁止 ajax 从一个域名请求另外一个域名上的数据。
浏览器的同源策略，是对 JavaScript 实施的安全限制。

所谓的同源是指，域名、协议、端口均为相同。

http://image.baidu.com:80/search/detail?ct=503316480&z=undefined#header
URL 构成：
http ---- 超文本传输协议
image.baidu.com ---- 域名
80 ---- 端口
/search/detail ---- 资源目录
ct=503316480&z=undefined ---- 发送到服务器的数据
#header ---- 锚点

判断如下请求是否为跨域：
http://local.com/index.html 请求 http://native.com/index.php 域名不同
https://www.abc.com/index.html 请求 http://www.abc.com/index.php 协议不同(默认端口也不一样)
http://www.abc.com:8888/index.html 请求 http://www.abc.com:8889/index.php 端口不同
http://www.abc.com/item/index.html 请求 http://www.abc.com/index.php 同源

几种主流的跨域解决方案：

第一种：通过服务端语言代理请求。如 PHP，服务端语言 php 是没有跨域限制的。

- 让服务器去别的网站获取内容然后返回页面。
  同源策略是浏览器的，服务端并不是运行在浏览器下，可以跨域

第二种：jsonp 跨域

- jsonp 跨域就是利用 script 标签的跨域能力请求资源
- 既然叫 jsonp，显然目的还是 json，而且是跨域获取
- 利用 js 创建一个 script 标签，把 json 的 url 赋给 script 的 src 属性，把这个 script 插入到页面里，让浏览器去跨域获取资源
- callback 是页面存在的回调方法，参数就是想得到的 json
- 回调方法要遵从服务端的约定一般是用 callback 或者 cb
- 注意：jsonp 只针对 get 请求

浏览器限制 ajax 跨域拿数据，但是它并不限制一些标签的跨域行为(如 link 可以去请求别的网站的 css，img，script 可以引用别的网站的静态资源)
在 script 的 src 后面拼接一个回调函数，当浏览器请求成功后就调用这个回调函数，会给我们传入一个 json 对象，因为是在 src 后拼接，所以只针对 get 请求，回调函数名字是 callback / cb

第三种：CORS 跨域资源共享(xhr2)

- CORS 是一个 W3C 标准，全称是"跨域资源共享"（Cross-origin resource sharing）
- 它允许浏览器向跨源服务器，发出 XMLHttpRequest 请求，从而克服了 AJAX 只能同源使用的限制
- 整个 CORS 通信过程，都是浏览器自动完成，不需要用户参与
- 对于开发者来说，CORS 通信与同源的 AJAX 通信没有差别，代码完全一样
- 实现 CORS 通信的关键是服务器，只要服务器实现了 CORS 接口，就可以跨源通信

实现 CORS 并不难，只需服务端做一些设置即可：如

<?php
header("Access-Control-Allow-Origin:*"); // 允许任何来源
注意：IE10以下不支持CORS

第四种：nginx代理跨域

第五种: 使用 jquery 封装的 ajax 方法

第六种: 使用 axios

jsonp练习：
1．百度搜索下拉提示
2 . 手机号码查询
3．一周天气预报展示



jsonp 跨域
// 搜索关键字 json 跨域
<style>
* {
margin: 0;
padding: 0;
list-style: none;
}
.wrap {
width: 500px;
margin: 50px auto 0;
}
.ipt {
width: 496px;
font-size: 16px;
}
.list li{
font-size: 14px;
line-height: 30px;
/* text-indent: 2em; */
background-color: #eee;
padding: 0 10px;
}
.list li:hover {
background-color: #ccc;
}
</style>
</head>
<body>
<div class="wrap">
<input type="text" class="ipt">
<ul class="list">
<!-- <li>123</li>
<li>1234</li>
<li>12354</li> -->
</ul>
</div>
<script>
let list = document.querySelector('.list')
let ipt = document.querySelector('.ipt')
let scriptObj = null

ipt.onkeyup = function () {
// jsonp 跨域请求 利用 script 标签的跨域能力
if (!ipt.value) {
return // 如果 input 中的值为 空就没必要发送请求了
}
if (scriptObj) { // null 转 布尔值 为 false 第一次不会进入到这里
document.body.removeChild(scriptObj) // 如果有 scriptObj 就首先移除掉
}
scriptObj = document.createElement('script')
scriptObj.src = 'http://suggestion.baidu.com/su?wd='+ipt.value+'&cb=mycallback'
document.body.appendChild(scriptObj)
}

function mycallback(json) {
// 浏览器会调用这个函数，回传一个 json 对象
// console.log(typeof json);
list.innerHTML = ''
json.s.forEach(function(item) {
list.innerHTML += '<li>'+item+'</li>'
})
}

// 问题:
// 1: 之前的内容不会消失，叠加: 在遍历添加 li 的时候首先先清空
// 2.如果 input 中的值为空的话: 首先判断 input 中有没有值，
如果没有酒 return
// 3.出现很多个 script 标签: 在全局添加一个变量 script 记录，
判断，第一次为 false，
// 所以会创建，但是后面请求的时候有值了，就会进入判断条件中
removeChild(script)
// 4.第3点中全局 script 必须要重新添加script标签,因为第一次
创建的时候，浏览器就已经根据script 的 src
// 去请求资源了，后面再去改变它的 src，浏览器不会去发送请求

</script>


//电话号码查询 jsonp 跨域
let ipt = document.querySelector('.ipt')
let con = document.querySelector('.con')
let scriptObj = null // 先定义好一个变量用来标记

if (scriptObj) { // 第一次是不会进来的，因为 null 转 布尔值为 false
    document.body.removeChild(scriptObj)
}

ipt.onblur = function () {
    // 创建一个 script 标签 改变 script 的 src 属性，让 浏览器帮我们去请求数据
    et tel = ipt.value
    scriptObj = document.createElement('script')
    scriptObj.src = 'http://tcc.taobao.com/cc/json/mobile_tel_segment.htm?callback=myCallback&tel=' + tel
    document.body.appendChild(scriptObj)
}
// 跨域请求
function myCallback(json) {
    // console.log(json);
    con.innerHTML = `<p>手机号:${json.telString}</p>
<p>运营商:${json.carrier}</p><p>注册地:${json.province}</p>`
}
// 封装 ajax 请求
function ajax(obj){
    // 1.创建XMLHttpRequest对象(买手机)
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();//非IE5 6
    } else {
        var xhr = new ActiveXObject(Microsoft.XMLHTTP);//IE5 6
    }
    // data: user=xiaocuo&age=23
if (obj.type == 'get' || obj.type == 'GET') {
xhr.open('get',obj.url+'?'+obj.data+'&_='+new Date().getTime(),true);
xhr.send(null);
} else if (obj.type == 'post' || obj.type == 'POST'){
// 2.打开与服务器的连接(拨号)
xhr.open('post',obj.url,true);

// 先设置请求头，模拟表单form的post方式提交数据
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

// 3.发送到服务器(按下拨号键)
xhr.send(obj.data);
} else {
alert('亲，目前只支持get和post请求方式');
return;
}
// 4.等待服务器的响应(有可能关机，不在服务区，无人接听，有人接听)
xhr.onreadystatechange = function (){
if (xhr.readyState == 4) {//请求已完成
if (xhr.status == 200) {//OK 请求成功
obj.succeed(xhr.responseText);//成功的回调函数
} else {
obj.failed(xhr.status);//失败的回调函数
}
}
}
}
//图灵机器人
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Document</title>
<style>
*{margin: 0; padding: 0; list-style: none;}
.wrap{
width: 500px;
height: 500px;
margin: 50px auto 0;
border: 1px solid #ccc;
position: relative;
}
.ipt{
width: 500px;
height: 40px;
line-height: 40px;
font-size: 18px;
position: absolute;
bottom: 0;
left: 0;
box-sizing: border-box;
padding: 0 10px;
}
.list{
width: 500px;
height: 460px;
position: absolute;
left: 0;
top: 0;
overflow-y: auto;
background-color: #eee;
padding: 20px 0;
box-sizing: border-box;
}
.list li{
overflow: hidden;
margin-top: 10px;
padding: 0 10px;
}
.list .left span{
float: left;
background-color: #CDD7E2;
padding: 5px 8px;
border-radius: 5px;
font-size: 16px;
}
.list .right span{
float: right;
background-color: #95D6F7;
padding: 5px 8px;
border-radius: 5px;
font-size: 16px;
}

</style>
</head>
<body>

<div class="wrap">
<input type="text" class="ipt">
<ul class="list">
<!-- <li class="left"><span>你好啊！</span></li> -->
<!-- <li class="right"><span>你好，我是机器人。。。</span></li> -->
</ul>
</div>


<script>
function ajax(option) {
// 1.创建ajax对象
if (window.XMLHttpRequest) {
var xhr = new XMLHttpRequest();//非IE5 IE6
} else {
var xhr = new ActiveXObject('Microsoft.XMLHTTP');//IE5 IE6
}

if (option.method == 'get' || option.method == 'GET') {
// 2.连接服务器
xhr.open(option.method,option.url+'?'+option.datas+'&_='+new Date().getTime(),true);//解决get缓冲问题
// 3.将请求发送到服务器
xhr.send(null);//get请求
} else if (option.method == 'post' || option.method == 'POST'){
// 2.连接服务器
xhr.open(option.method,option.url,true);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
// 3.将请求发送到服务器
xhr.send(option.datas);//post请求
} else {
alert('暂时只支持get与post请求.');
return;
}

// 4.服务器响应情况
xhr.onreadystatechange = function () {
if (xhr.readyState == 4) {//请求完成
if (xhr.status == 200) {//ok 成功
option.succeed(xhr.responseText);
}else {
option.succeed(xhr.status);
}
}
}
}



var ipt = document.querySelector('.ipt');
var list = document.querySelector('.list');

//创建左边消息
function msgLeft(val) {
var msg = document.createElement('li');
msg.className = 'left';
msg.innerHTML = '<span>'+val+'</span>';
list.appendChild(msg);
}
//创建右边消息
function msgRight(val) {
var msg = document.createElement('li');
msg.className = 'right';
msg.innerHTML = '<span>'+val+'</span>';
list.appendChild(msg);
}
ipt.onkeyup = function (e) {
// console.log(e.keyCode);//13 回车键
if (e.keyCode == 13) {
msgRight(ipt.value);
list.scrollTop = 10000000;
ajax({
url: 'http://www.tuling123.com/openapi/api',
method: 'get',
datas: 'key=4670f9d766704929b7983312808cdfa7&userid=xiaocuo&info='+ipt.value,
succeed: function (str) {
var json = JSON.parse(str);
msgLeft(json.text);
list.scrollTop = 10000000;
},
failed: function (msg) {
console.log(msg);
}
});
ipt.value = '';
}
}

</script>
</body>
</html>
