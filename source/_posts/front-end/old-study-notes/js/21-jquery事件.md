---
title: 21-jquery事件
tag: old-study-notes
catogory:
  - front-end
  - old-study-notes
---

jQuery 事件

blur()
focus()
click()
dblclick()
keyup()
keydown()
mouseenter()
mouseleave()
mouseover()
mouseout()
mousedown()
mousemove()
mouseup()
change()
select()
submit()
scroll()
resize()
ready()
load()
... ...

事件绑定及移除

bind( ) 为每个匹配的元素绑定一个或多个事件处理函数
语法：bind( event , fn ) //不能给未来元素添加事件
$("p").bind("click", function(){
alert( $(this).text() );
});

$('h2').bind({
mouseover: function (){
alert('移上');
},
mouseout: function (){
alert('移出');
}
})

unbind( ) 与 bind( ) 反向的操作，删除元素的一个或多个事件
语法：unbind(event , fnName )

live( ) 把事件绑定到当前及以后添加的元素上面
语法：live( event , fn ) // 1.9.x 已经放弃
$("p").live("click", function(){
alert( $(this).text() );
});
JQ1.4 之前用得比较多，现在已被放到不推荐使用列表中
die(event , fnName ) 与 live() 反向的操作，删除先前用 live()绑定的事件

delegate( ) 把事件绑定到当前及以后添加的元素上面
语法：delegate( selector , event , fn )
$("ul").delegate("li", "click", function(){
alert( $(this).html() );
});
JQ1.4 之后加入的，和 live 有点相似
undelegate( selector , event , fnName ) 删除由 delegate() 方法添加的一个或多个事件处理程序

on( ) 把事件绑定到当前及以后添加的元素上面
语法：on( event , selector , fn )
$("p").on("click", function(){ //未来元素无效
alert( $(this).text() );
});

$(“ul”).on( “click” , “li”, function(){ //未来元素有效
alert( $(this).html() );
});
JQ1.7 开始引入了全新事件绑定机制
off( event , selector , fn ) on()的反向操作，移除用 on()绑定的事件

建议:
从 jQuery1.7 开始，jQuery 引入了全新的事件绑定机制，on()和 off()两个函数统一处理事件绑定。
jQuery 推出 on()的目的有 2 个，一是为了统一接口，二是为了提高性能，所以从现在开始用 on()替换 bind(), live(), delegate 吧。尤其是不要再用 live()了，因为它已经放入不推荐使用列表中，随时会被弃用。

一次性事件
one( ) 为匹配的元素绑定一次性的事件处理函数
语法：one( event , fn ) //未来元素无效
$("p").one("click", function(){
alert( $(this).html() );
});
当使用 one() 方法时，每个元素只能运行一次事件处理器函数，执行完之后事件就会被移除

合成事件:

hover( )方法
语法：hover(fn1,fn2); // 鼠标进入时执行 fn1，鼠标离开时执行 fn2

$("td").hover(
function () {
$(this).addClass("hover");
},
function () {
$(this).removeClass("hover");
}
);

toggle( )方法
语法：toggle(fn1,fn2,fn3,fn4...);
$("li").toggle( // 响应匹配元素的轮流的 click 事件
function () { $(this).addClass(“show”); },
function () { $(this).removeClass(“show”); }
);

$(“div”).toggle( ); //显示隐藏

事件流 特征: 传播

事件对象 {...}

事件对象存储了和事件相关的信息
原生 JS 事件对象:
oDiv.onclick=function (ev){
var oEvent=ev||window.event;
console.log(oEvent); //oEvent 即为事件对象
}

JQ 处理了其中的兼容问题，可以直接使用
$(‘body’).click(function(e){
console.log(e); //e 即为事件对象
});

阻止冒泡/传播：e.stopPropagation()
阻止默认行为：e.preventDefault();
事件类型：e.type
触发事件的元素：e.target ( 原生 DOM 节点 )
指示按了哪个键或按钮：e.which
鼠标的相对坐标：e.clientX/Y e.pageX/Y(包括卷曲上去的距离)
事件发生时的时间戳：e.timeStamp（返回总毫秒数）
鼠标事件中离开或者进入的 DOM 元素：e.relatedTarget
... ...

转换：
在实际工作中，我们可能会有这样的需求
使用 JQ 获取 DOM 对象，然后在 JS 使用
或者 JS 获取的 DOM 对象，然后在 JQ 使用
var box = document.querySelector('#box'); // js dom
var $box = $('#box'); // jq dom

$box[0].style.color = 'blue';
$box.get(0).style.color = 'blue';

$(box).css('color','red');

$符冲突问题

1: 谁在后面引入，$符就归谁所有
2: jQuery 使用 jQuery
jQuery('#jquery').click(function (){//$符有效
jQuery('#box').css('background','red');});
3: jQuery 首先获取到$符使用权，使用 $.noConflict() 来放弃使用权，它会返回另一个名称，可以替代 $ 使用
// $.noConflict();//放弃$符使用权
var s = $.noConflict();//放弃$符使用权，设置 s === jQuery
s('#jquery').click(function (){//$符有效
s('#box').css('background','red');
});

4: 获取到 $ 符使用权后，$.noConflict 放弃 $ 符使用权，使用 jQuery,并传入 $ ，在内部就可以继续使用 $ 了

$.noConflict();//放弃$符使用权
jQuery(function ($){
// 正常使用$
$('#jquery').click(function (){
$('#box').css('background','red');
});

在 jQuery 中，$符是jQuery的别名
1.所有使用$符的地方都可以使用 jQuery 来替换
例如：
$('#div').click(....);  
 等同于  
 jQuery('#div').click(....);

当我们引入多个 js 库后，在另一个 js 库中也定义了$符的话，我们使用$符号时就会发生冲突。

<script src="prototype-1.6.0.js"></script>
<script src="jquery-1.8.3.js"></script>

jquery 最后引入
此时，$符指向jquery中定义的$符号

<script src="jquery-1.8.3.js"></script>
<script src="prototype-1.6.0.js"></script>

prototype 最后引入
此时，$符指向prototype中定义的$符号

noConflict()方法
jQuery 中的 noConflict( )方法的作用就是让 jQuery 放弃对$符的所有权(首先得有使用权)
当代码中调用该方法后，不可以使用$来调用 jQuery 方法

$.noConflict( ); // 有一个 返回值
var s = $.noConflict(); // 放弃 $ 符使用权，设置 s === jQuery
$(‘#div’).click(....); //无效
jQuery(‘#div’).click(....); //有效

jQuery 别名
jQuery 中允许我们自定义 jQuery 的别名

var jq=$.noConflict();
jq(‘#div’).click(....); //有效
jQuery(‘#div’).click(....); //有效
$(‘#div’).click(....); //无效 报错

如何继续使用$符
如果jQuery代码习惯使用$符号，并且不愿意改变这种习惯，可以把$符号作为变量传递给ready方法，函数内可以正常使用$符
$.noConflict( );
jQuery(function ($){
$(‘h1’).click( function (){ alert($(this).html( ) );
});

jQuery 扩展 ( 插件开发接口 )

如果只有一个参数，前面的参数默认 this, 函数的调用对象
$ === jQuery / $.prototype === $.fn === jQuery.prototype
jQuery 中有很多方法都是通过 extend 方法扩展的

jQuery 中 target 要么等于传入的第一个参数，要么等于 this

如果有业务需求，不应该在插件的源码里面直接修改，而是通过它的扩展接口进行扩展

$.extend()方法 
jQuery.extend（target [，object1] [，objectN]）
当提供两个或多个对象参数时，其他对象的属性将合并到目标对象。
var obj1 = {a: 1, b: 2, c: {d: 4, e: 5}};
var obj2 = {c: {g: 7}, d: 8};
$.extend(obj1,obj2);
console.log(obj1);

Object.assign(obj1,obj2);
console.log(obj1);

如果只提供一个参数对象，则表示省略了 target 参数。在这种情况下，jQuery 对象本身被假定为目标。
通过这样做，您可以向 jQuery 名称空间添加新功能。这对于希望向 JQuery 添加新方法的插件非常有用。像 jQuery 类扩展
$.extend({
    fly:function (){
        alert('I can fly');
    }
})
$.fly();

$.fn.extend()方法
jQuery 源码如下:
jQuery.fn = jQuery.prototype = {
constructor: jQuery,
......

jQuery.fn = jQuery.prototype // 原型对象
jQuery.fn.extend = jQuery.prototype.extend

$.fn.extend扩展的是 jQuery 实例对象的方法 扩展到 jQuery.prototype 上
$.fn.extend({
rclick:function (fn){
$(this).mousedown(function (e){
            if (e.which == 3) {
                fn();
            }
        })
    }
})
$('#box').rclick(function (){
alert('右键点击');
})

练习：JQ 扩展拖拽功能

插件概述
JQ 插件是以 jQuery 的核心代码为基础，编写出符合一定规范的应用程序。也就是说，插 件也是 jQuery 代码，通过 js 文件引入的方式植入即可。 插件的种类很多，主要大致可以分为：UI 类、表单及验证类、输入类、特效类、Ajax 类、滑动类、图形图像类、导航类、综合工具类、动画类等等。
引入插件的步骤，基本如下： 1.必须先引入 jquery.js 文件，而且在所有插件之前引入； 2.引入插件； 3.引入插件的周边，比如皮肤、中文包等。

jQuery validate 表单验证插件

插件文档： https://www.runoob.com/jquery/jquery-plugin-validate.html

序号
规则
描述
1
required=true
必须输入的字段。
2
remote="check.php"
使用 ajax 方法调用 check.php 验证输入值。
3
email=true
必须输入正确格式的电子邮件。
4
url=true
必须输入正确格式的网址。
5
date=true
必须输入正确格式的日期。日期校验 ie6 出错，慎用。
6
dateISO=true
必须输入正确格式的日期（ISO），例如：2009-06-23，1998/01/22。只验证格式，不验证有效性。
7
number=true
必须输入合法的数字（负数，小数）。
8
digits=true
必须输入整数。
9
creditcard:
必须输入合法的信用卡号。
10
equalTo="#field"
输入值必须和 #field 相同。
11
accept:
输入拥有合法后缀名的字符串（上传文件的后缀）。
12
maxlength=5
输入长度最多是 5 的字符串（汉字算一个字符）。
13
minlength=10
输入长度最小是 10 的字符串（汉字算一个字符）。
14
rangelength=[5,10]
输入长度必须介于 5 和 10 之间的字符串（汉字算一个字符）。
15
range=[5,10]
输入值必须介于 5 和 10 之间。
16
max=5
输入值不能大于 5。
17
min=10
输入值不能小于 10。

jQuery AJAX

$.ajax( options ) 通过 HTTP 请求加载远程数据

url：请求的 url 地址

type：请求类型（get/post...）

cache：是否读取缓存，默认 true(就相当于原生中我们写的是否添加随机数，添加了随机数后就不会读取本地缓存)

data：要发送给服务器的数据，示例：
"name=jack&age=19"
string 或 Object
{name:"jack",age:"19"}

async：默认 true，为异步请求

dataType：服务器返回的数据类型
特殊的格式 JQ 会进行预解析和兼容性修复。
可选择的值："xml" , "html" , "script" , "json" , "text"，”jsonp”等(如果使用了 jsonp，则 dataType 为 jsonp ，这不属于 ajax 的范畴)

jsonpCallback/jsonpCb: 回调函数就是 success，这里只是名字

timeout：设置超时（毫秒）

success：请求成功的回调函数

error：请求失败的回调函数

complete：请求完成后的回调函数，无论成功与失败

beforeSend：发送请求前可以修改 XMLHttpRequest 对象的函数，例如添加自定义 HTTP 头。
在 beforeSend 中如果返回 false 可以取消本次 ajax 请求。XMLHttpRequest 对象是惟一的参数。

$('#login').click(function (){
$.ajax({
type:'get',
url:'test.php',
dataType:'json',
cache:false, //不使用缓存
success:function (json){
$('h1').html(json.name+json.sex+json.age);
},
error:function (){
alert('请求失败');
}
});
})

$.ajax({
    url: 'http://tcc.taobao.com/cc/json/mobile_tel_segment.htm',
    type: 'get',
    data: {tel:$('.ipt').val()},
dataType: 'jsonp',
timeout: 4000,
// cache: false,// 是否读取缓存
jsonp: 'callback',
// jsonpCallback: 'myCallback', // jsonpCb 填数据接口的回调函数
success: function (json){
$('.con').text(json.carrier);
},
error: function (err){
alert('请求失败');
}
});

serialize( )
将一个 form 表单内的所有数据转换为可以发送给服务器的字符串
示例：$("form").serialize()
"name=小明&age=19&msg=abc"

$.get()
$.get( url [, data] [, callback] [, dataType]);
url : 请求的 URL
data ： 可选，发送至服务器的数据
callback ： 可选，请求完成时的回调函数
dataType ： 可选，参照$.ajax参数中的dataType
$.get(“act.php”,{user:“cainiao”,pass:“123”},function (data){
alert(data.msg);
},“json”);

$.get('data/test1.txt',function (d){
$('.con').text(d);
},'text');

$.post()
$.post 与 $.get 语法相同，唯一的不同就是请求是以post方式进行。
示例：
$.post(“act.php”,{user:“cainiao”,pass:“123”},function (data){
alert(data.msg);
}, ”json”);

$.getJSON()
$.getJSON(url [, callback]);加载一段 JSON 并解析
$.getJSON('data/test2.json',function (json){
$('.con').text(json.title[0]);
});

$.getScript()
getScript() 方法使用 AJAX 的 HTTP GET 请求获取和执行 JavaScript
$.getScript(url,success(response,status))

$.getScript('data/test.js');

load()
方法从服务器加载数据，并把返回的数据放置到指定的元素中
$(selector).load(url,data,function(response,status,xhr))
$('div').load('data/test.html')

$('.header').load('header.html');

jsonp：
ipt.onkeyup=function (){
$.ajax({
        type:'get',
        url:'http://suggestion.baidu.com/su?wd='+$('#ipt').val(),
dataType:'jsonp',
jsonp:'cb',
// jsonpCallback:'mycallback',
success:function (json){
// $('#list').empty();
$('#list').html('');
for (var i = 0; i < json.s.length; i++) {
$('#list').append('<li>'+json.s[i]+'</li>');
}
}
});
}

低版本 jQuery 兼容
在低版本 IE 中， undefined 是可以被修改的，所以万一在哪里修改了 undefined 的值，而下面有功能需要 undefined 进行判断，那么就会出错，所以为了保证 undefined 是原本的 undefined，第二个值不传，默认就是 undefined
(function(window,undefined) {})(window)

// 给 jq 对象扩展一个拖拽方法
// $.fn.extend({
$.extend($.fn,{
drag: function (){
$(this).css({
'position':'absolute',
'cursor': 'move'
});
$(this).mousedown(function (e){
e.preventDefault();
var toLeft = e.clientX - $(this).offset().left;
var toTop = e.clientY - $(this).offset().top;
var $this = $(this);
$(document).bind('mousemove',function (e){
var l = e.clientX - toLeft;
var t = e.clientY - toTop;
$this.css({
'left': l,
'top': t
});
});
$(document).mouseup(function (){
$(this).unbind('mousemove');
});
});
}
});

简书上的:https://www.jianshu.com/p/3967cdb58fe6?utm_campaign=haruki&utm_content=note&utm_medium=reader_share&utm_source=qq
JQuery 最外层使用的匿名函数自执行结构，为了最大程度避免代码污染，防止冲突
传入参数 window 的主要目的有两点

1. 在尾端传入的参数是实参，表明在函数执行时第一个参数是 window，这样就避免了在内部使用 window 时再次去外层查找，在 js 中 window 属于最顶层的变量，而根据 js 原型链的查找原则，函数会优先查找本身的变量，在查找不到的情况下逐步向上查找，所以如果在 window 没有作为参数传入到函数内部的情况下，会从底层一直查找到最顶层，浪费大量性能，在形参中传入第二个参数 undefined，主要是考虑到在低版本浏览器中 undefined 的值是可以改变的;在代码中我们可能会需要判断变量值===undefined 的情况，为了避免我们获取的 undefined 的值是被改变过的值，我们在形参中传入一个参数，由于在实参中没有传入对应的值，那么这个值本身就是 undefined，所以我们在使用 undefined 时就可以直接使用该值，而不用担心是否在操作改变过的 undefined
2. 为压缩代码做考虑，如果 window 不是参数而只是一个变量，那么 window 字段将无法被压缩，但如果只是作为形参的情况下可以被压缩为单字符，实际上我们看压缩后的代码。window 被压缩成了 e
