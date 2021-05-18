---
title: 16-es5常用API
tag: old-study-notes
catogory:
  - front-end
  - old-study-notes
---

ES5 常用 API

ES 即 ECMAScript，是 JavaScript 的语言标准
ES5 即 ECMAScript 5，也称为 ECMAScript 2009
ES5 支持情况：ie9+, chrome 19+, safari 5+, firefox 4+, opera 12+

ES6 狭义上指的是 2015 年更新的版本
广义上指的是在 2015 年之后更新的版本，官方并没有 ES6，在那之后每年都会更新，就直接加年份了

严格模式
除了正常运行模式，ECMAscript5 添加了第二种运行模式："严格模式"（strict mode）。
顾名思义，这种模式使得 Javascript 在更严格的条件下运行。

设立"严格模式"的目的，主要有以下几个：
消除 JavaScript 语法的一些不合理、不严谨之处，减少一些怪异行为;
消除代码运行的一些不安全之处，保证代码运行的安全；
提高编译器效率，增加运行速度；
为未来新版本的 JavaScript 做好铺垫。

进入"严格模式"的标志："use strict";

将 "use strict"; 放在脚本文件的第一行，则整个脚本都将以"严格模式"运行。

<script>
   "use strict";
   console.log("全局严格模式。");
</script>

将"use strict"放在函数体的第一行，则整个函数以"严格模式"运行。
function strict(){
"use strict";
console.log("全局严格模式。");
}

ES5 严格模式的限制规范：

1.变量声明必须使用 var，否则报错

2.对不合理的操作显示报错，不再做静默失败处理

3.禁止对象属性重名（IE）

4.禁止函数参数重名

5.禁止使用以 0 开头的八进制数字
ES6 新的语法标准，八进制以 0o 来表示，与 16 进制的 0x 形成统一的语法格式

6.禁止使用 with 语句
with 语句 扩展一个语句的作用域链
with (expression) {
statement
}
JavaScript 查找某个未使用命名空间的变量时，会通过作用域链来查找，作用域链是跟执行代码的 context 或者包含这个变量的函数有关。'with'语句將某个对象添加到作用域链的顶部，如果在 statement 中有某个未使用命名空间的变量，跟作用域链中的某个属性同名，则这个变量将指向这个属性值。如果沒有同名的属性，则将拋出 ReferenceError 异常。
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with

7.强制为 eval 创建新作用域
eval() 函数计算 JavaScript 字符串，并把它作为脚本代码来执行。
如果参数是一个表达式，eval() 函数将执行表达式。
如果参数是 Javascript 语句，eval()将执行 Javascript 语句。
严格模式为 JavaScript 程序创建了第三种作用域：eval 作用域

8.arguments 不再追踪参数变化
var x = 1
function fn1(x) {
x = 2;
arguments[0] = 3;
alert(x);
}
fn1(4);

9.禁止使用 arguments.callee
// 在匿名的递归函数中
var factorialArray = [1, 2, 3, 4, 5].map(function(n) {
return (n < 2) ? 1 : arguments.callee(n - 1) \* n;
});
console.log(factorialArray);

10.禁止 this 指向全局对象 window，this 变成 undefined

11.函数必须声明在整个脚本或函数层面

12.新增一些保留字，不能使用他们作为标识符命名
implements, interface, let, package, private, protected, public, static, yield
......

Array 扩展
indexOf() 方法返回指定元素在数组中的第一个的索引，不存在则返回 -1

lastIndexOf() 方法返回指定元素在数组中的最后一个的索引，不存在则返回 -1

forEach() 方法为每个元素执行对应的方法
不会改变原数组
如果没有 return ,则返回值为 undefined
var arr = [1,2,3,4];
var sum = 0;
var res = arr.forEach(function (item,index,array){
// item 当前数组的元素 index 当前元素的索引 array 当前执行 forEach 的数组
sum += item;
// return sum += item;
});
console.log(sum);//10
console.log(res);//undefined 如果没有 return 则返回值为 undefined
console.log(arr);//[1,2,3,4] 不会改变原数组

// 相当于以下 for 循环
for(var i = 0; i < arr.length; i++){
sum += arr[i];
}
console.log(sum);

map() 方法对数组的每个元素进行一定操作后，返回一个新的数组
不会改变原数组
var arr = [123,456,789];
var res = arr.map(function (item,index,array){
return item + 'abc';
// item + 'abc';
});
console.log(arr); //[123, 456, 789]
console.log(res); //["123abc", "456abc", "789abc"]

filter() 方法返回一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素

var arr = ['123a','456','a789'];
var res = arr.filter(function (item,index,array){
return item.indexOf('a') != -1; // 返回字符串中包含 a 的字符串
});
console.log(arr);
console.log(res);//['123a','a789']

Array.isArray() 方法检查对象是否为数组(对应着 jquery 中的 $.isArray())

var str = 'abcd';
var arr = [1,3,4];
console.log( Array.isArray(str) );//false
console.log( Array.isArray(arr) );//true

Object 扩展
返回指定对象的所有自身可枚举属性组成的数组
Object.keys(object)
var obj1 = {a: 123, b: 456, c: 789};
var obj2 = {7: 123, 3: 456, 13: 789};
console.log( Object.getOwnPropertyNames(obj1) ); // ["a", "b", "c"]
console.log( Object.getOwnPropertyNames(obj2) ); // ["3", "7", "13"]

for (var key in obj2){ 44// for in 也是访问自身可枚举属性
console.log(key); // '3' '7' '13'
}

返回指定对象的所有自身属性组成的数组（包括不可枚举属性）
Object.getOwnPropertyNames(object)
var obj1 = {a: 123, b: 456, c: 789};
var obj2 = {7: 123, 3: 456, 13: 789};
console.log( Object.getOwnPropertyNames(obj1) ); // ["a", "b", "c"]
console.log( Object.getOwnPropertyNames(obj2) ); // ["3", "7", "13"]
111
创建新对象并指定其原型，返回新对象
Object.create(prototype, [descriptors])
prototype：新对象的原型对象，不能省略，可以为 null
[descriptors]：可选，为新对象指定新的属性, 并对属性进行描述
var obj = {a: 123, b: 456};
var obj1 = Object.create(null); // 没有继承的属性，没有属性和原型链接
var obj2 = Object.create(obj); // 继承了 obj 对象，空对象，没有属性，有原型 obj3

返回对象的原型
Object.getPrototypeOf(object)
// 返回对象的原型
// Object.getPrototypeOf(object)
var obj3 = {a: 123, b: 456};
var obj5 = Object.create(obj3);
console.log( Object.getPrototypeOf(obj3) );//Object.prototype
console.log( Object.getPrototypeOf(obj5) );//{a: 123, b: 456}

直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象
Object.defineProperty(object, property, descriptor)
object 要在其上定义属性的对象。
property 要定义或修改的属性的名称。
descriptor 将被定义或修改的属性描述符(对象)

// 直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象
// Object.defineProperty(object, property, descriptor)
var obj7 = {
name: 'xm',
age: 23
}
obj7.sex = '男';
console.log(obj7); // {name: "xm", age: 23, sex: "男"}
Object.defineProperty(obj7,'sex',{
// 是否可配置（删除，修改，枚举）
configurable: true,//默认为 false
// 是否可枚举
enumerable: true,//默认为 false
// 是否可修改
writable: false,//默认为 false
value: '男'
});
obj7.sex = '女 1';
console.log(obj7); // {name: "xm", age: 23, sex: "男"} // writable 为 false value 不能修改
// delete obj7.sex; // 删除 sex 属性 可以恢复原型链接 如果原型中有这个属性则可以获取到
console.log(obj7.sex);//undefined
console.log( Object.keys(obj7) ); // ["name", "age"]
obj7.age = null //如果只是置为 null，不会删除该属性，也不能恢复与原型的链接
console.log(obj7.age); // null
console.log(obj7); // {name: "xm", age: null, sex: "男"}

delete 可以删除对象属性，恢复原型链接，但是让 obj.属性 = null ，并不能恢复原型链接

descriptor 属性描述符具有以下可选键值：
configurable
当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。
enumerable
当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。
writable
当且仅当该属性的 writable 为 true 时，value 才能被赋值运算符改变。默认为 false。

// 创建新对象并指定其原型，返回新对象
// Object.create(prototype, [descriptors])
var obj3 = {a: 123, b: 456};
var obj4 = Object.create(null);//空对象，没有属性和原型链接
var obj5 = Object.create(obj3);//空对象，没有属性,有原型 obj3
var obj6 = Object.create(obj3,{c:{value:789,writable: true}});
obj6.c = '888';
console.log(obj6.c); // 888 writable 为可修改的

value
该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。

var obj1 = Object.defineProperty({},'abc',{
configurable: true,
enumerable: true,
writable: true, // 默认值 false
value: '123'
});
obj1.abc = 456;
console.log(obj1.abc); // 456

对象访问器 属性 Getter 和 Setter，ES5 允许使用类似于获取或设置属性的语法来定义对象方法。
get
一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。当访问该属性时，该方法会被执行，默认为 undefined。
set
一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。默认为 undefined。

var obj3 = {
name: 'xm',
age: 18,
say: function (){
alert('大家好');
}
}
Object.defineProperty(obj3,'age',{
// 是否可配置(枚举、可写、删除)
configurable: true,
// 是否可枚举属性（遍历属性）
enumerable: true,
set(value) {
console.log('触发 setter 函数');
this.\_age = value; //用中间介质变量 this.\_age，不能直接用 this.age
},
get() {
console.log('触发 getter 函数');
return this.\_age; //用中间介质变量 this.\_age，不能直接用 this.age
}
});
obj3.age = 22; // 触发 setter 函数
console.log(obj3.age); // 22 触发 getter 函数
console.log( Object.getOwnPropertyDescriptor(obj3,'age') );
// {get: ƒ, set: ƒ, enumerable: true, configurable: true}
注意：一个描述符不能同时有(writable、value)和(get、set)关键字。

添加或更改多个对象属性
Object.defineProperties(object, descriptors)

返回对象的属性的描述符
Object.getOwnPropertyDescriptor(object, property)

// 第一种形式
var obj10 = {
name: 'xh',
// age: 26
\_age: 23,//中间介质的变量 也可以是其他变量，只是需要一个中间变量，不能直接操作而已
set age(value){
this.\_age = value;
console.log('setter 调用');
},
get age(){
console.log('getter 调用');
this.\_age += '岁'; // 可以对值做一些处理
return this.\_age;
}
}
// obj10.age = 25;//setter 调用
console.log(obj10.age);//getter 调用
// 第二种形式
var obj11 = Object.defineProperty({},'age',{
configurable: true,
enumerable: true,
// writable: true,
// value: 23
get: function (){
console.log('getter');
return this.\_age;
},
set: function (val){
console.log('setter');
this.\_age = val;
}
});
obj11.age = 26;//赋值 setter
console.log(obj11); // {\_age: 26}
console.log( obj11.age );// getter 取值 26
// 添加或更改多个对象属性
// Object.defineProperties(object, descriptors)
var obj12 = Object.defineProperties({},{
abc: {
configurable: true,
enumerable: false,
writable: true,
value: '123'
},
def: {
configurable: true,
enumerable: true,
writable: false,
value: '456'
}
});
console.log(obj12); // {def: "456", abc: "123"}
console.log(obj12.abc); // 123
console.log(obj12.def); // 456

var obj13 = {};
obj13.abc = 777;//默认 configurable: true, enumerable: true, writable: true, value: 777
obj13.def = 888;//默认 configurable: true, enumerable: true, writable: true, value: 888
// 直接赋值默认为 true,一旦使用 defineProperty 方法来定义属性，即使不写，
也会默认为 false

// // 返回对象的属性的描述符
// // Object.getOwnPropertyDescriptor(object, property)
var attrObj1 = Object.getOwnPropertyDescriptor(obj13, 'abc');
console.log( attrObj1 );
// {value: 777, writable: true, enumerable: true, configurable: true}

// 显式声明变量和隐式声明变量的区别？
// 1.在函数中，显式声明变量为局部变量，隐式声明变量为全局变量
// 2.显式声明变量默认不可删除（configurable: false），隐式声明变量可以删除（configurable: true）
// 3.隐式声明变量在严格模式中禁止使用
var a = 123456;
var attrObj2 = Object.getOwnPropertyDescriptor(window, 'a');
console.log( attrObj2 ); //{value: 123456, writable: true, enumerable: true, configurable: false}

delete window.a;//不能删除 a 属性依然存在
console.log(window.a); // 123456

b = 456789;
var attrObj3 = Object.getOwnPropertyDescriptor(window, 'b');
console.log( attrObj3 ); // {value: 456789, writable: true, enumerable: true, configurable: true}
delete window.b;//被删除
console.log(window.b);//undefined
String 扩展
String.trim() 删除字符串两端的空白字符。
var str = " Hello World! ";
console.log( str.trim() ); // 'Hello World!'

只能删除字符串两端的空白字符，要删除所有的还是得用正则表达式

Date 扩展
Date.now() 返回自时间起点到当前的毫秒数
Date.now() 的返回与在 Date 对象上执行 getTime() 的结果相同

console.log( Date.now() ); // 1566646195347
console.log( new Date().getTime() ); // 1566646195347 // 需要创建一个时间对象，再调用 getTime() 方法

Function 扩展
bind(obj) 将函数内的 this 绑定为 obj, 并将函数返回

var obj = {abc: 123};
setTimeout(function (){
console.log(this); // obj
}.bind(obj),1000);

JSON 方法
在数据传输流程中，JSON 是以文本(即字符串)的形式传递

var json1 = '{ "name": "cxh", "sex": "man" }'; // JSON 字符串
var json2 = { "name": "cxh", "sex": "man" }; // JSON 对 象

JSON.parse() 用于将 JSON 字符串转换为 JSON 对象
var obj = JSON.parse(json1); // 需严格的 json 格式 严格的 json 格式需要加双引号

JSON.stringify() 用于将 JSON 对象转换为 JSON 字符串
var str = JSON.stringify(json2);

eval 方法也可以解析 json 字符串，转变为 json 对象(但是 eval 方法效率更低，能用 parse 尽量使用 parse,如果后端给的不是严格的 json 字符串，则也可以使用 eval 方法解析)
var jsonObj2 = eval('('+ json2 +')') // 需要加引号双括号

classList 对象
在新的 API 里，页面里的每个 DOM 节点上都有一个 classList 对象
可以使用 classList 对象里面的方法新增、删除、修改及判断节点上的 CSS 类

classList 对象一些很有用的属性方法：
length 类名个数 // console.log( box.classList.length );
item(index) 获取类名 // console.log( box.classList.item(1) );// 获取元素类名 传索引
add(class1,class2, ...) 添加类 // box.classList.add('blue','yellow'); // 多个类名用 , 隔开
remove(class1,class2, ...) 删除类 // box.classList.remove('yellow','red');
contains(class) 判断类 有就返回 true，没有就返回 false
if (box.classList.contains('hide')) {
box.style.display = 'none';
} else {
box.style.display = 'block';
}
toggle(class) 反转类 // box.classList.toggle('hide');
原本是 jquery 中的方法，因为好用，所以 js 原生就加进来了，全部挂载在 classList 对象上

案例

1.简单的双向绑定，需要了解原理

<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>数据双向绑定</title>
</head>
<body>

<p>
input1=><input type="text" id="input1">
</p>
<p>
input2=><input type="text" id="input2">
</p>
<div>
输入的值是=><span id="span"></span>
</div>

<script>
// 简单的双向绑定 双向绑定的原理 defineProperties
var oInput1 = document.getElementById('input1');
var oInput2 = document.getElementById('input2');
var oSpan = document.getElementById('span');
var data = {a:2};//数据
// data.a = 3;//怎么监听它的变化？
Object.defineProperties(data, {
val1: {
configurable: true,
get() {
oInput1.value = '';
oInput2.value = '';
oSpan.innerHTML = '';
return '';
},
set(newValue) {
oInput2.value = newValue;
oSpan.innerHTML = newValue;
}
},
val2: {
configurable: true,
get() {
oInput1.value = '';
oInput2.value = '';
oSpan.innerHTML = '';
return '';
},
set(newValue) {
oInput1.value = newValue;
oSpan.innerHTML = newValue;
}
}
})
oInput1.value = data.val1;//getter
oInput1.addEventListener('keyup', function() {
data.val1 = oInput1.value;//setter
}, false)
oInput2.addEventListener('keyup', function() {
data.val2 = oInput2.value;//setter
}, false)


</script>
</body>
</html>

2.缓冲运动改版

<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Document</title>
<style>
.box{
width: 100px;
height: 100px;
background-color: red;
position: absolute;
left: 0px;
top: 50px;
}
span{
position: absolute;
left: 500px;
top: 0;
width: 1px;
height: 400px;
background-color: blue;
}

</style>
</head>
<body>
<button class="btn">走你</button>
<div class="box"></div>
<span></span>

<script>
var btn = document.querySelector('.btn');
var box = document.querySelector('.box');
// var timer;


// var num1 = 4.3;//ceil 5
// var num2 = -4.3;// floor -5

btn.onclick = function (){
move(box,{left:1000,top:500});
// move(box,{left:100,top:400});
}
function move(dom,target){
dom.timer = null;
clearInterval(dom.timer);
// 水平运动
dom.timer = setInterval(function (){
var speedx = (target.left - dom.offsetLeft) / 10;//持续变好的速度

// 浮点数计算，造成数据丢失，无法到达目的地 => 取整
speedx = speedx > 0 ? Math.ceil(speedx) : Math.floor(speedx);
// 剩余运动量 <= 每次运动的量5
if (Math.abs(dom.offsetLeft - target.left) <= Math.abs(speedx)) {
clearInterval(dom.timer);
dom.style.left = target.left + 'px';//手动设置终点
} else{
dom.style.left = dom.offsetLeft + speedx + 'px';//每次的运动
}

// 垂直运动
var speedy = (target.top - dom.offsetTop) / 10;//持续变好的速度

// 浮点数计算，造成数据丢失，无法到达目的地 => 取整
speedy = speedy > 0 ? Math.ceil(speedy) : Math.floor(speedy);
// 剩余运动量 <= 每次运动的量5
if (Math.abs(dom.offsetTop - target.top) <= Math.abs(speedy)) {
clearInterval(dom.timer);
dom.style.top = target.top + 'px';//手动设置终点
dom.parentNode.removeChild(dom);
} else{
dom.style.top = dom.offsetTop + speedy + 'px';//每次的运动
}
},20);
}

</script>
</body>
</html>

3.面向对象---烟花

<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Document</title>
<style>
html,body{
width: 100%;
height: 100%;
margin: 0;
padding: 0;
background-color: #000;
}
.wrap{
width: 100%;
height: 100%;
position: relative;
}
.fire{
width: 10px;
height: 10px;
border-radius: 50%;
position: absolute;
}

</style>
</head>
<body>

<div class="wrap"></div>

<script src="utils.js"></script>
<script>
// 1.点击创建一颗烟花
// 获取点击坐标对象
// 实例化一个烟花对象
// 2.烟花爆炸
// 创建x个烟花节点（随机20-40 for）
// 样式、坐标、颜色
// 添加到页面
// 运动->到终点后删除

var wrap = $1('.wrap');

// 点击发射
wrap.onclick = function (ev){
var e = ev || window.event;
var client = {left: e.clientX, top: e.clientY};// 点击位置的坐标对象
new Fireworks(wrap,client);//实例化一个烟花对象
}

// 自动发射
setInterval(function (){
var client = {
left: randomInt(200,wrap.clientWidth-200),
top: randomInt(50,wrap.clientHeight-140)
};// 点击位置的坐标对象
new Fireworks(wrap,client);//实例化一个烟花对象
},2200);

// 创建对象
function Fireworks(wrap,client){
this.wrap = wrap;//烟花所在的容器
this.client = client;//烟花运动终点坐标
this.fire = document.createElement('div');//烟花节点
this.init();//初始化
}

// 初始化
Fireworks.prototype.init = function (){
this.fire.className = 'fire';
this.fire.style.left = this.client.left + 'px';//初始位置x
this.fire.style.bottom = '0px';//初始位置y
this.fire.style.background = randomColor();//随机颜色
this.wrap.appendChild(this.fire);//添加到页面
this.send();//发射
}

// 往上运动（缓冲运动）
Fireworks.prototype.send = function (){
bufferMove(this.fire,this.client,function (){
this.wrap.removeChild(this.fire);//运动结束，删除节点
this.boom();// 爆炸
}.bind(this));
}

// 烟花爆炸
Fireworks.prototype.boom = function (){
var _this = this;
// 创建x个烟花节点（随机20-40 for）样式、坐标、颜色
var len = randomInt(20,40);
for (var i = 0; i < len; i++){
var fire = document.createElement('div');
fire.className = 'fire';
fire.style.left = this.client.left + 'px';
fire.style.top = this.client.top + 'px';
fire.style.background = randomColor();
this.wrap.appendChild(fire);// 添加到页面
// 运动->到终点后删除
var pos = {
left: randomInt(10,this.wrap.clientWidth-10),
top: randomInt(10,this.wrap.clientHeight-100),
};

// 涉及同步异步问题，通过bind()传递参数
bufferMove(fire,pos,function (){
_this.wrap.removeChild(this);//运动结束，删除节点
}.bind(fire));
}
}

</script>
</body>
</html>

4.封装的工具方法
// 通过类名获取元素(全局)
function byClass1(classn){
var allTag = document.all || document.getElementsByTagName('\*');
var arr = [];
var reg = new RegExp('\\b'+classn+'\\b','g');
for (var i = 0; i < allTag.length; i++){
// if (allTag[i].className.indexOf(classn) != -1) {
if (reg.test(allTag[i].className)) {
arr.push(allTag[i]);
}
}
return arr;
}

// 通过类名获取元素(局部)
function byClass2(parentId,classn){//
var parent = document.getElementById(parentId);
var allTag = parent.all || parent.getElementsByTagName('\*');
var arr = [];
var reg = new RegExp('\\b'+classn+'\\b','g');
for (var i = 0; i < allTag.length; i++){
// if (allTag[i].className.indexOf(classn) != -1) {//
if (reg.test(allTag[i].className)) {//allTag[i].className -> 'box1 box2 blue'
arr.push(allTag[i]);
}
}
return arr;
}

// 获取星期几
function getWeek(){
var d = new Date();
var num = d.getDay();//0-6
var arr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
return arr[num];
}

// 生成范围随机数
function randomInt(min,max){
return Math.round(Math.random()\*(max-min))+min;
}

// 生成十六进制随机颜色
function randomColor(){
var col = '#';
var arr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];//0-15
for (var i = 0; i < 6; i++){
var num = Math.round(Math.random()\*15);//0-15
col += arr[num];
}
return col;
}

// 生成 6 位随机验证码
function randomCode(){
var arr = [1,1,1,1,1,1];//存储生成的随机字符
for (var i in arr){
do{
var ascii = Math.round(Math.random()\*(122-48))+48;// 48-122
} while(ascii>57&&ascii<65 || ascii>90&&ascii<97);
arr[i] = String.fromCharCode(ascii);
}
return arr.join('');// 返回的字符串
}

// 获取元素样式
function getStyle(dom,style){
if (dom.currentStyle) {//IE
return dom.currentStyle[style];
} else {
return getComputedStyle(dom,null)[style];
}
}

// 添加事件监听
function addEvent(dom,type,fn){
if (dom.attachEvent) {//IE
dom.attachEvent('on'+type,fn);
} else {
dom.addEventListener(type,fn,false);
}
}

// 获取元素到 body 左侧或顶部的距离（包含父级边框）
function offset(dom){
var l = 0;
var t = 0;
var bdl = dom.clientLeft;//元素左边框宽度
var bdt = dom.clientTop;//元素上边框宽度
while(dom){
l = l + dom.offsetLeft + dom.clientLeft;
t = t + dom.offsetTop + dom.clientTop;
dom = dom.offsetParent;//指向最近的定位父级
}
return {left: l - bdl, top: t - bdt};
}

// 缓冲运动
function bufferMove(dom,target,callback){
dom.timer = null;
clearInterval(dom.timer);
dom.timer = setInterval(function (){
// x 轴运动
var speedX = (target.left - dom.offsetLeft) / 10;//持续变化的速度
speedX = speedX > 0 ? Math.ceil(speedX) : Math.floor(speedX);//对速度取整，避免数据丢失
// 剩余的运动量 < 每次所走的运动量
if (Math.abs(dom.offsetLeft - target.left) <= Math.abs(speedX)) {
// clearInterval(dom.timer);
dom.style.left = target.left + 'px';//设置终点
} else {
dom.style.left = dom.offsetLeft + speedX + 'px';
}

// y 轴运动
var speedY = (target.top - dom.offsetTop) / 10;//持续变化的速度
speedY = speedY > 0 ? Math.ceil(speedY) : Math.floor(speedY);//对速度取整，避免数据丢失
// 剩余的运动量 < 每次所走的运动量
if (Math.abs(dom.offsetTop - target.top) <= Math.abs(speedY)) {
clearInterval(dom.timer);
dom.style.top = target.top + 'px';//设置终点
callback();//回调函数
} else {
dom.style.top = dom.offsetTop + speedY + 'px';
}
},20);
}

// 获取元素
function $1(selector) {
return document.querySelector(selector);
}
function $2(selector) {
return document.querySelectorAll(selector);
}
