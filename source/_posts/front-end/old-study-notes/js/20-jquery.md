---
title: 20-jquery
tag: old-study-notes
catogory:
  - front-end
  - old-study-notes
---

jQuery 简介

jQuery 也就是 JavaScript 和查询（Query）即 辅助 JavaScript 开发的类库。
jQuery 是一个兼容多浏览器的 javascript 库。

核心理念是 write less,do more (写得更少,做得更多)。

jQuery 在 2006 年 1 月由美国人 John Resig 在纽约的 barcamp 发布，吸引了来自世界各地的众多 JavaScript 高手加入。
曾经，jQuery 是最流行的 JavaScript 库，在世界前 10000 个访问最多的网站中，有超过 55%在使用 jQuery！

jQuery 的优点：轻量级、强大的选择器、出色的 DOM 操作、可靠的事件处理机制、完善的 Ajax、出色的浏览器兼容性、便捷的链式操作、丰富的插件支持、完善的文档、学习成本低、开源 等等

大多数 JavaScript 类库一般都具备的特性包括：
选择器（Selector）、DOM 操作、实用函数、事件处理、Ajax 等

ready 方法
ready
$(document).ready(function (){
// 页面 dom 结构渲染完执行
// addEventListener 和 ready 执行时机都是 dom 渲染完执行
});
// 放在头部写 js 的时候，放在 window.onload 里面
window.onload = function () {
// 执行时机靠后,会在页面所有 dom 样式 脚本 图片等资源加载完成后执行
// 所有东西都出来了，但是 js 都不会运行，页面没法点，没法用，
//所以用户体验度不好
}
// 但是 ready 方法不一样，dom 节点加载完就可以了，只要 dom 渲染完了就可以执行了
// window.onload 是 dom 0 级事件，相同类型注册多个会覆盖

jQuery 使用

进入 jQuery 官网或其他平台下载 jQuery 文件，并且引入页面：

<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>

下载: http://www.jq22.com/jquery-info122

通常每个版本号有两个版本可供下载
生产版 - 用于实际的网站中，已被精简和压缩
开发版 - 用于测试和开发，未压缩，是可读的代码

注意：2.0 及之后的版本，不再兼容 IE 6 7 8

也可以引入服务器上的 jQuery 文件

<script type=“text/javascript” src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
<script type="text/javascript" src="http://libs.baidu.com/jquery/2.0.3/jquery.min.js"></script>

在 jQuery 库中，$ 就是 jQuery 的一个简写形式（别称）
例如： $(“#nan”) === jQuery(“#nan”)
console.log($('.box') === jQuery('.box')); // false
// jQuery('.box')得到一个 jq 对象
// $('.box')得到一个新对象 这是两个对象
// 在原生 javascript 中，我们获取 dom 节点，传入一样的选择器
// 得到的是页面上同一个 dom 节点
// 但是 jQuery 对象不同，你传入选择器，得到对象，其实每次都会
// 返回一个新的 jQuery 对象，而不是页面上的 dom 节点了，
// 虽然都操作同一个 dom 对象，但是对于 jQuery 对象来说，不是同一个

// 原生 js 对象 和 jQuery 对象可以看作是两个类的实例对象，属于不用类
// jQuery.prototype.click = function(){}
console.log($('.box')); // init [div.box, prevObject: init(1), context: document, selector: ".box"]
console.log(jQuery('.box')); // init [div.box, prevObject: init(1), context: document, selector: ".box"]
console.log($ === jQuery); // true
console.log($); // 和下面的一样
console.log(jQuery); // ƒ ( selector, context ) {
        // The jQuery object is actually just the init constructor 'enhanced'
        //return new jQuery.fn.init( selector, context, rootjQuery );
    //}
console.log(jQuery.__proto__); // ƒ () { [native code] }
console.log($.**proto**); // ƒ () { [native code] }

当浏览器解析完 DOM 之后，执行 ready 小括号内的函数
$(document).ready( function () { …} )
可简写为：$(function () {…} )
$(function(){..})等于 document.ready 事件，即在页面 dom 节点渲染完成执行

原生 js 中也有等页面 dom 结构渲染完执行的事件, addEventListener 可以注册多次
// DOMContentLoaded 页面 dom 结构渲染完执行 IE 6 7 8 不支持
window.addEventListener('DOMContentLoaded',function (){
console.log('d1');
},false);
window.addEventListener('DOMContentLoaded',function (){
console.log('d2');
},false);

jQuery 选择器

选择器：简洁的写法，支持 CSS1 到 CSS3 的选择器

$(“#test”)选取id为test的元素---单个元素
$(“.test”)选取所有 class 为 test 的元素---元素集合
$(“div”)选取所有的<div>元素---元素集合
$(“div span”)选取<div>里的所有的<span>(可以选到子和孙所有元素)元素---元素集合
$(“div:first”)选取所有<div>元素中第1个<div>元素---单个元素
$(“div:last”)选取所有<div>元素中最后一个<div>元素---单个元素
$(“input:even”)选取索引(索引从0开始,0算为偶数)是偶数的<input>元素---元素集合 (实际上选择的是奇数的，只是索引从 0 开始)(用户不会管你做了什么操作，只会看到表面效果)
$(“input:odd”)选取索引(索引从 0 开始)是奇数的<input>元素---元素集合(实际上选择的是偶数的，只是索引从 0 开始，如选择的索引 0 是第一个)
$(“div[title=test]”)选取属性title为“test”的<div>元素---元素集合
$(“div:nth-child(1)”) 选取所有 div 中，是其父标签的第一个子元素的 div 元素---元素集合
.......

let $box = $('#box')
// 工作中最好用一个变量来接收,不然就是每一次都会去查找
// jQuery 和 原生 js 是可以混合在一起用的，但是为了辨识 jquery 对象
// 会在前面加上 $
// jQuery 里面元素集合也可以直接操作，获取到元素集合后，
// 如果要添加点击事件或者别的，jQuery 会给每个匹配到的元素添加

$('.list li').click(function (){
// this -> dom 对象
// alert(this.innerText);
// alert(this.innerHTML);

// $(this) -> jQuery实例对象
// alert($(this).text());
// alert($(this).html());

// console.log(this);
// console.log($(this));
// 是 dom 对象，而不是 jQuery 对象，所以不能使用 jQuery 下的方法
// console.log($(this)[0]); // dom 对象
// console.log($(this)[0] === this);//true
});

jQuery DOM

创建节点:
运用传统的 javascript 方法，创建一个 div 节点：
var newDiv = document.createElement(‘div’);
newDiv.innerText = ' 新建节点';

jQuery 中创建一个 div 节点：
$(‘<div>新建节点</div>’);

插入节点:
用 javascript 方法，插入一个节点：
var div = document.createElement('div');
div.innerText = '新创建的节点';
document.body.appendChild(div);
document.body.insertBefore(div,box);

jQuery 中插入节点：例：$( a ).append( c );

内部插入:
append ------a 里末尾插 c
appendTo ---c 插到 a 里末尾
prepend ------a 里前面插 c
prependTo ---c 插到 a 里前面

外部插入:
after-----------a 之后插 c
insertAfter ----c 插到 a 之后
before --------a 之前插 c
insertBefore --c 插到 a 之前

var oDiv = $('<li>新创建的节点</li>'); // 创建一个 jQuery 对象
$('.list').append(oDiv); // list 内部的后面插入 oDiv
oDiv.appendTo('.list'); // 把 oDiv 插入到 list 内部的后面

$('.list').prepend(oDiv); // list 内部的前面插入 oDiv
oDiv.prependTo('.list'); // 把 oDiv 插入到 list 内部的前面

$('.list').after('<h3>新建的h3</h3>'); // 在 list 外部的后面插入 h3
$('<h3>新建的 h3</h3>').insertAfter('.list'); // 把 h3 插入到 list 外部的后面

$('.list').before('<h3>新建的h3</h3>'); // 在 list 外部的前面插入 h3
$('<h3>新建的 h3</h3>').insertBefore('.list'); // 把 h3 插入到 list 外部的前面
// 无论是选择器还是字符串，都要变成 jQuery 对象

删除节点:
用 javascript 方法，删除一个节点：
var b = document.getElementById(“test”);
var c = b.parentNode;
c.removeChild(b); // 删除某个子节点，一定是父级调用

jQuery 中删除节点：
$('#test').remove();
remove() 删除节点 // 节点本身调用
empty() 清空节点内容 // 清空节点本身内部
detach() 移除被选元素，包括所有的文本和子节点，返回移除元素的副本，在需要调用的时候还可以使用

$('.con').remove(); // 删除节点本身
$('#box').empty();//清空 box 内部 但会留下 box 节点
var boxs = $('#box').detach();//删除节点，返回删除节点的副本 可以用变量接收，以便后备之需
$('body').prepend(boxs);// 恢复到页面中

替换节点:
用 javascript 方法，替换节点：找父级替换
parent.replaceChild( newNode , oldNode );

jQuery 中替换节点： 不用找父级了，直接就替换了
$(“<p>替换 </p>”).replaceAll(“#test1″);

复制节点:
运用传统的 javascript 方法，复制一个节点： cloneNode
原生 js 复制节点: 使用 cloneNode() 方法，参数为 true 则为深复制，复制节点本身以及内部的子节点，但是不会复制节点上的事件，参数为 false，则为浅复制，只复制节点本身

let box = document.querySelector('.box')
let boxClone1 = box.cloneNode(false)
console.log(boxClone1);
console.log(boxClone1 == box); // false 不是同一个 dom 对象
let boxClone2 = box.cloneNode(true)
console.log(boxClone2);
console.log(boxClone2 == box); // false 不是同一个 dom 对象

var txt = document.querySelector("p");
var clonep = txt.cloneNode(true);
document.body.appendChild(clonep);

区别：
1.jQuery 中深复制可以复制节点上的事件，但是原生 js 中深复制是不会复制节点上的事件

jQuery 中复制一个节点： clone 方法
var clone_a = a.clone(true); 深复制包括事件处理程序
$('body').append(clone_a);

常用方法:
.children() 获得匹配元素集合中每个元素的所有子元素(不包含孙子辈的)
.next() 获得匹配元素集合中每个元素的下一个同辈元素
.prev() 获得匹配元素集合中每个元素紧邻的上一个同辈元素
.parent() 获得当前匹配元素集合中每个元素的父元素
.closest() 从当前元素开始，返回最先匹配到的符合条件的父元素
// .closest() // 获取祖先元素，但是需要传选择器告诉它获取哪个祖先元素,如
$('.box').closest('body') // 也是第一个匹配到的父级元素

.find(child) 获得当前匹配元素集合中每个元素的后代
// .find() // 在链式操作中经常用
// 在链式操作中查找指定的子元素是很实用的
// 但是不建议这样做，可读性比较差
$('#box').css('color', 'blue').find('.box').css('color', 'red')

.siblings() 获得匹配元素集合中所有元素的同辈元素
// .siblings 选择同辈元素 里面可以放选择器 不放就是全部的兄弟姐妹
$('#box h4').css('color', 'blue').siblings('p').css('color', '#999')
// 应用场景: 当我们选中某个元素时，给他添加样式，其他兄弟姐妹是别的样式 tab 切换

.eq() 匹配元素集合中指定索引的一个元素(返回的是 jquery 对象，所以可以使用 jquery 的方法)

// 报错 $('.list li')[2] 返回的是 dom 对象，不能用 jquery 下的方法
$('.list li')[2].css('color', 'red')
// 获取元素的某一个
let num = 2
$('.list li').eq(num).css()
$(`.list li:eq(${num})`).css()
$('.list li:eq(num)').css()
// 这两种方式返回的都是 jquery 对象，可以调用 jquery 下的方法
// 不一样的是下面是字符串，变量变成了字符串

. index() 方法返回指定元素相对于其他指定元素的 index 位置
.end() 将匹配的元素变为前一次的状态
.each() 循环，为每个匹配的元素执行函数
.is() 根据选择器、元素或 jQuery 对象来检测匹配元素集合，如果有元素匹配给定的参数，则返回 true
.addClass() 为每个匹配的元素添加指定的类名
.removeClass() 从匹配的元素中删除全部或者指定的类
.toggleClass() 从匹配的元素中添加或删除一个类
.hasClass() 检查元素是否含有某个特定的类，有则返回 true
.attr() 设置或返回被选元素的属性值
.removeAttr() 从每一个匹配的元素中删除一个属性
.html() 设置或取得第一个匹配元素的 html 内容(包括文本节点)
.text() 设置或取得第一个匹配元素的文本内容
.val() 设置或返回匹配元素的值(表单元素)
.css() 设置或返回匹配元素的样式属性(可以返回非行间样式，是一个带单位的字符串) 里面可以传一个对象，键值对的形式就可以同时设置几个属性值
原生 js 中也有个 方法可以写多个样式:

$('.box')[0].style.cssText='color:red;background:green;';//IE678 不支持

.width() 设置或返回匹配元素的宽度 (设置可带单位可不带，获取返回数字)
.height() 设置或返回匹配元素的高度
.scrollLeft() 设置或返回匹配元素相对滚动条左侧的偏移
.scrollTop() 设置或返回匹配元素相对滚动条顶部的偏移
.position() 获取匹配元素相对于定位父元素的偏移 {left: 40, top: 50}
.offset() 获取或设置匹配元素在当前视口的相对偏移 {left: 40, top: 50}(到窗口左侧和右侧的，相当于我们之前封装的 offset 函数)
. wrap() 使用指定的 HTML 元素来包裹每个被选元素
$("p").wrap("<div></div>"); // 给每个P元素包裹一个div元素(相当于给每个匹配的元素加个父级)
......
$.trim( str ) 函数会移除字符串开始和末尾处的所有空白字符
console.log($.trim(' 123 abc ') );//去掉前后的空格 123 abc

上面有一个 jquery 实例.each() 的方法，遍历这个 jquery 实例对象，但是下面的是遍历数组的方法
$.each() 遍历数组
$.each(data,function (index,value) {
console.log('数组当前元素的索引' + index);
console.log('数组当前元素的值' + value);
});

注意不带引号的 jQuery 对象:
$(this) / $(document) / $(window) / $('html') / $('body')

获取整个页面的滚动条：$('html') / $('window') / $(document).scrollTop 都可以，不要用$('body')
// console.log( $('html').scrollTop() );//600
// console.log( $('body').scrollTop() );//0
// console.log( $(document).scrollTop() );//600
// console.log( $(window).scrollTop() );//600
$('h4').click(function (){
$(document).scrollTop(600);//设置
// $(window).scrollTop(600);//设置 传入值就是设置了
})
jQuery 动画

展开／收起:
slideUp(null/speed , easing , fn); 收起(实际上是改变元素的高度来实现的动画,利用一个定时器，设置个变量，变量值减减，再把这个值赋值给这个元素)
slideDown(null/speed , easing , fn); 展开
参数：可选
null：不传参，执行默认效果
speed：'slow'|'normal'|'fast' 或 毫秒数 动画的持续时间
easing：指定动画效果，默认是"swing"，可扩展
fn：回调函数，当动画执行完毕以后执行

示例
$('#con').slideDown( 1000 , 'swing' , function (){ alert('123'); } );
$('#con').slideUp({
duration:1000, // 时间 / fast / slow / normal
easing:'easeOutElastic',
complete:function (){
alert('再见~');
}
});

反转开关:
1.toggle(null/speed , easing , fn); // 显示隐藏
参数：可选
null：不传参，执行默认效果
speed：'slow'|'normal'|'fast' 或 毫秒数
easing：指定动画效果，默认是"swing"，可扩展
fn：回调函数，当动画执行完毕以后执行

2.用于绑定两个或多个事件处理器函数，以响应被选元素轮流的 click 事件(如果绑定了几个事件，第一次点击是执行第一个，第二次点击是执行第二个，依次，都执行过了就轮流到第一个)

3.开关动画，有参数就是动画，没有参数就是显示隐藏
$('.box').toggle(1000) // x 和 y 同时变动

显示隐藏：
show(null/speed , easing , fn); 显示
hide(null/speed , easing , fn); 隐藏 (只要有参数就以动画的形式来执行)
参数：可选
null：不传参，执行默认效果
speed：'slow'|'normal'|'fast' 或 毫秒数
easing：指定动画效果，默认是"swing"，可扩展
fn：回调函数，当动画执行完毕以后执行

淡入淡出：
fadeIn(null/speed , easing , fn); 淡入
fadeOut(null/speed , easing , fn); 淡出
参数：可选
null：不传参，执行默认效果
speed：'slow'|'normal'|'fast' 或 毫秒数
easing：指定动画效果，默认是"swing"，可扩展
fn：回调函数，当动画执行完毕以后执行

自定义动画：
用法一 : animate({styles} , speed , easing , fn)
参数：可选
{styles}：一组 css 设置集合
speed：'slow'|'normal'|'fast' 或 毫秒数
easing：指定动画效果，默认是"swing"，可扩展
fn：回调函数，当动画执行完毕以后执行
animate( )方法执行 css 属性集的自定义动画

用法二 : animate({styles} ,{queue,duration,easing,complete});
参数：
{styles}：一组 css 设置集合
queue：是否加入动画队列执行 true/false (默认 true)
(除非所有的都为 true ，否则就不存在队列)
duration：定义动画持续时间
easing：指定动画效果，默认是“swing”，可扩展
complete：回调函数，当动画执行完毕以后执行

动画 animate 里面也可以链式调用

可操作属性：
不是所有的 css 属性都可以用 Jquery 动画（animate 函数）来动态改变，下面是 JQ 可以操作的 css 属性：
backgroundPosition borderWidth borderBottomWidth
borderLeftWidth borderRightWidth borderTopWidth
borderSpacing margin marginBottom marginLeft
marginRight marginTop outlineWidth padding
paddingBottom paddingLeft paddingRight
paddingTop height width maxHeight maxWidth
minHeight maxWidth font fontSize opacity
bottom left right top letterSpacing wordSpacing
lineHeight textIndent scrollLeft scrollTop
… …

停止动画：
stop()停止当前动画(并不会停止动画队列中剩下的动画)
stop(true)停止所有动画
stop(true,true)停止所有动画,并到达当前动画的终点
$("#go").click(function(){
  $(“.block”).animate({left: ‘200px'}, 5000);
});
$("#stop").click(function(){
$(".block").stop(); //停止当前动画
});

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
语法：live( event , fn ) // 1.9.x 已经放弃(不是以事件委托的方式，效率不是很好)
$("p").live("click", function(){
alert( $(this).text() );
});
使用 die() 解绑
JQ1.4 之前用得比较多，现在已被放到不推荐使用列表中
die(event , fnName ) 与 live() 反向的操作，删除先前用 live()绑定的事件

delegate( ) 把事件绑定到当前及以后添加的元素上面
语法：delegate( selector , event , fn )(事件委托)
$("ul").delegate("li", "click", function(){
alert( $(this).html() );
});
JQ1.4 之后加入的，和 live 有点相似
undelegate( selector , event , fnName ) 删除由 delegate() 方法添加的一个或多个事件处理程序

on( ) 把事件绑定到当前及以后添加的元素上面(事件委托，方法写在父元素上)
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

// 一次性事件
$('.add').bind('click',function (){
$('.box').append('<p>新来的</p>');
$('.add').unbind('click');
});
$('.add').one('click',function (){
$('.box').append('<p>新来的</p>');
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

// 合成事件
// mouseover mouseout
$('.box').hover(function (){
$(this).css('background','red');// mouseover
},function (){
$(this).css('background','#ccc');// mouseout
});

// toggle 中如果是两个函数，则两个轮流，如果是多个函数，则多个轮流
$('.box').toggle(function (){
alert(11);
},function (){
alert(22);
});

练习使用以上所有常用方法！

tab 切换 jQuery 实现
$(function() {
// 内部会遍历每一个，添加点击事件
// $('.head h3').click(function() {
// // 当前元素添加类名，其他元素去掉类名 $(this) 变成 jQuery 对象
// // 获取元素的下标
// // 第一种方式 当前点击的元素在父级中的索引值，所以这里返回的就是 0 1 2 3 只能改变第一个 con 的内容
// let index = $(this).index()
// // 第二种方式
// // let index = $('.head h3').index(this) // 有多个也是也是可以切换的，因为它获取到了全部,返回所有选中元素中，当前点击的索引值，比如这里有 8 个
// // 具体使用看情况 如果只有一个，那两中方法都可以用
// $(this).addClass('selected').siblings().removeClass('selected')
// $('.con div').eq(index).addClass('show').siblings().removeClass('show')
// })

// 第二种方法 这种的好处就是直接就知道当前索引就不用求索引了
$('.head h3').each(function (index, item) {
// console.log($(this));
// console.log(item); //item 是一个 dom 节点
// 直接就获取索引了
$(item).click(function() {
$(this).addClass('selected').siblings().removeClass('selected')
$('.con div').eq(index).addClass('show').siblings().removeClass('show')
})
})
})
