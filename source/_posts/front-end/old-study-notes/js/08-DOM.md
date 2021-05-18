---
title: 08-DOM
tag: old-study-notes
catogory:
  - front-end
  - old-study-notes
---

```
DOM

DOM 的概念及作用

Document Object Model -- DOM
文档 对象 模型
DOM 是针对 HTML 和 XML 文档的一个 API。

DOM 描绘了一个层次化的节点树，即 HTML 文档中的所有内容都是节点(node)。
DOM 树中的所有节点均可通过 JS 进行访问，允许开发人员添加、移除、修改和查询页面的某一部分。

获取所有元素：document.all; || document.getElementsByTagName('\*');

节点类型

整个文档是一个文档节点
每个 HTML 元素是元素节点
HTML 元素内的文本是文本节点(回车也是文本节点)
每个 HTML 的属性是属性节点
注释是注释节点

nodeType 属性：返回一个整数，这个数值代表节点的类型
元素节点 返回 1
属性节点 返回 2
文本节点 返回 3
注释节点 返回 8
文档节点 返回 9

nodeName 属性：返回节点的名称
元素节点的 nodeName 是标签名称 ( 大写 )
属性节点的 nodeName 是属性名称
文本节点的 nodeName 永远是 #text
注释节点的 nodeName 永远是 #comment
文档节点的 nodeName 永远是 #document

nodeValue 属性：返回节点的值
对于元素节点，nodeValue 返回值是 undefined 或 null
对于文本节点，nodeValue 返回文本内容
对于属性节点，nodeValue 返回属性值
对于注释节点，nodeValue 返回注释内容
对于文档节点，nodeValue 返回 null

对于元素节点，用 innerHTML／innerText / value 设置或取值

节点关系

节点之间的关系，通常用家庭中的辈分关系来描述。

祖先 -> 父辈 -> 子女(兄弟姐妹) -> 子孙

parentNode：父节点
children：所有元素子节点

childNodes：所有子节点 ，IE678 与高版本浏览器返回值不一样

IE678 返回元素节点，高版本浏览器返回文本节点（回车）
nextSibling：下一个兄弟节点
previousSibling：上一个兄弟节点
firstChild : 第一个子节点

都返回文本节点（回车）
lastChild：最后一个子节点

IE678 不支持
nextElementSibling
previousElementSibling
firstElementChild
lastElementChild

节点方法

createElement(“标签名”) : 创建元素节点
createTextNode(“”) : 创建文本节点(不太会用，可以直接使用 节点.innerHTML / 节点.innerText / 节点.value(表单))
var newNode=document.createElement('div');
var textNode=document.createTextNode('文本内容');

appendChild(node) : 末尾插入一个节点 node
insertBefore(node,target) : target 之前插入节点 node
removeChild(node) : 移除某个子节点(removeChild 删除元素 一定要父级执行)
replaceChild(newNode,oldNode) : newNode 替换 oldNode

document.getElementById('');
document.getElementsByName('');// input 表单元素
document.getElementsByTagName('');

//IE678 不支持
document.getElementsByClassName('类名');
document.querySelector('选择器');
document.querySelectorAll('选择器');

cloneNode(boolean) : 复制一个节点
true：深复制，复制节点及其整个子节点树
false : 浅复制，只复制节点本身。
注：不会复制添加到 DOM 节点中的 JS 属性，例如事件处理程序等。原生 js 中不会复制节点的事件,但是 jquery 中有方法可以复制节点中的事件

getAttribute(“name”) 获取节点上 name 属性的值
setAttribute(“name”,“value”) 设置节点上 name 属性的值为 value
removeAttribute(“name”) 删除节点上的 name 属性
getAttributeNode(“type”) 获取节点上 type 属性节点

获取元素样式

行间样式与非行间样式

行间样式：

<div id="box1" style="width:300px; height:100px;"></div>
console.log(box1.style.width);

非行间样式：
#box2 {width: 200px; height: 50px;}

<div id="box2"></div>
console.log(box2.style.width);
非行间样式不能通过style 对象获得

getComputedStyle：获取样式（IE678 除外）
如：getComputedStyle(对象，参数).样式
第一个参数是要获取样式的元素对象
第二个参数可以传递任何数据，通常为 false 或 null

currentStyle：IE678 获取样式的方法
如：obj.currentStyle.样式

练习：
自己封装获取元素样式的函数（注意兼容问题）

行间样式 写在标签里面 可以通过 style. 方式来获取
非行间样式 不.
能通过 style 对象来获取
getComputedStyle 非 IE
currentStyle IE

offset/client 系列属性

offsetLeft：获取对象左侧与定位父级之间的距离(默认是 body)
offsetTop：获取对象上侧与定位父级之间的距离(默认是 body)
offsetWidth：获取元素自身的宽度（包含边框）
offsetHeight：获取元素自身的高度（包含边框）

clientLeft、clientTop：获取元素内容到边框的距离，效果和边框宽度相同，很少使用
clientWidth：获取元素自身的宽度（不含边框）
clientHeight：获取元素自身的高度（不含边框）

document.documentElement.clientWidth 浏览器可视区宽度
document.documentElement.clientHeight 浏览器可视区高度

document.body.clientWidth body 的宽度
document.body.clientHeight body 的高度

document.documentElement.offsetWidth 整个文档宽度
document.documentElement.offsetHeight 整个文档高度

document.documentElement.clientWidth
document.documentElement.clientHeight
document.documentElement // html
但是不是说获取 html 的宽高，只是这样用代表获取浏览器可视区域的宽高
并不是 html 的宽高

获取 body 的宽高 并不等于 html 的宽高，边上多 8
console.log(document.body.clientWidth);
console.log(document.body.clientHeight);

滚动条的宽度通常 17 px

<script>

/* 1.封装一个函数，通过类名获取元素（兼容谷歌、火狐、IE678）
获取所有元素：document.all; || document.getElementsByTagName('*');
function byClass(parent,classn){} */
/* 思路: 首先获取到页面所有的元素
循环遍历每个元素 判断 class 属性值
但是这里又有一个问题 就是class 属性值不是只有一个 所以不能用 =
可以使用 indexOf 吧 */

function byClass (classn) {
// 都有用，二选一即可
// let objs = document.getElementsByTagName('*')
let objs = document.all || document.getElementsByTagName('*')
// console.log(objs)
let newArr = []
for (let i = 0, len = objs.length; i < len; i ++) {
let str = objs[i].getAttribute('class')
// console.log(str) // 若元素没有 class 属性，则为 null if 判断时要注意，因为 null 没有 indexOf 方法
if ( str && str.indexOf('classn') != -1) {
newArr.push(objs[i])
}
}
return newArr
}

let arr = byClass('classn')
console.log(arr)

// 但是有一个问题：只要包含了有 classn 的就会被加入到新数组
// 思路一： 判断左右是否有空格
// 思路二：放数组里面检索
// 思路三：不是思路，就是写的时候注意些

// 改进一： 可以根据 parentId 来查找 parentId 里面的元素
function byClass (parentId, classn) {
// 都有用，二选一即可
// let objs = document.getElementsByTagName('*')
let parent = document.getElementById(parentId)
let objs = parent.all || parent.getElementsByTagName('*')
// console.log(objs)
let newArr = []
for (let i = 0, len = objs.length; i < len; i ++) {
let str = objs[i].getAttribute('class')
// console.log(str) // 若元素没有 class 属性，则为 null if 判断时要注意，因为 null 没有 indexOf 方法
if ( str && str.indexOf('classn') != -1) {
newArr.push(objs[i])
}
}
return newArr
}

// 暂时告退

</script>

<style>
.myTag {
width: 600px;
padding: 10px;
border: 1px solid #ccc;
min-height: 50px;
overflow: hidden;
}

.myTag span {
float: left;
line-height: 40px;
padding: 6px 10px;
margin: 0 10px 10px 0;
background-color: yellowgreen;
}

.myTag span em {
color: red;
cursor: pointer;
}

.default {
width: 600px;
padding: 10px;
border: 1px solid #ccc;
min-height: 50px;
overflow: hidden;
margin-top: 30px;
}

.default p {
float: left;
line-height: 40px;
padding: 6px 10px;
margin: 0 10px 10px 0;
background-color: pink;
}
</style>
</head>

<body>
我的标签:
<div class="myTag">
<!-- <span>冰柠<em>x</em></span>
<span>冰柠<em>x</em></span>
<span>冰柠<em>x</em></span> -->
</div>
<div class="default">
<p>咖喱</p>
<p>牛奶</p>
<p>面包</p>
<p>雪碧</p>
</div>

<input type="text" class="ipt">
<button class="btn">贴上</button>

<script>
let myTag = document.querySelector('.myTag')
let tagContainer = document.querySelector('.default')
let tags = document.querySelectorAll('.default p')

for (let i = 0, len = tags.length; i < len; i++) {
tags[i].onclick = function () {
// let txt = this.innerHTML
createSpan(this.innerHTML)
}
}

// 自定义标签
let btn = document.querySelector('.btn')
let ipt = document.querySelector('.ipt')
btn.onclick = function () {
// let txt = ipt.value
// 这里直接调用封装完的函数就好了
createSpan(ipt.value)
}

// 发现很多内容一样，所以可以进行封装
// 函数的参数可以让函数更加灵活

function createSpan(value) {
let txt = value
let span = document.createElement('span')

// 等下试试效果 不是这样的 没有用(自己写的)
// span.innerText = txt
// let em = document.createElement('em')
// span.appendChild(em)

span.innerHTML = txt + '<em>x<em>'
myTag.appendChild(span)

// 给未来未来元素添加事件一定要在它插入之后
let ems = document.querySelectorAll('.myTag em')
// 在这获取可以获取到最新的个数
for (let j = 0, len = ems.length; j < len; j++) {
ems[j].onclick = function () {
// 需要移除 em 的父元素 需要它父元素的父元素调用
this.parentNode.parentNode.removeChild(this.parentNode)
}
}
}
</script>
```
