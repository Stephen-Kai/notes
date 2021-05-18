---
title: 04-this
tag: old-study-notes
catogory:
  - front-end
  - old-study-notes
---

```
1.this 对象

this 是 js 的一个关键字，它代表函数运行时，自动生成的一个内部对象，只能在函数内部使用。

this 的指向在函数运行时才进行绑定。

this 指向它所在的函数的调用对象（谁去调用）
this 指向事件的调用对象

严格模式：'use strict'

var box = document.getElementById('box');

function show(){
console.log(this);
}

show(); // 严格模式下为 undefined ，非严格模式下是 window

box.onclick = function () {
show(); // 严格模式下为 undefined ，非严格模式下是 window
}

box.onclick = show; // 严格和非严格模式下都是 box 对象

更多关于 this 对象，今后继续研究......

this 案例：

<div class="box">一个坑</div>
<script>
var box = document.querySelector('.box');
console.log(this);//window

function show(){
console.log(this); // 视情况而定
}

// 1、函数的调用对象(谁去调用)
show(); // 非严格模式下是 window，严格模式下是 undefined
window.show();//this 指向它所在的函数的调用对象(谁去调用)
// 2.this 指向事件的调用对象
box.onclick = function (){//this 指向事件的调用对象
console.log(this);//box
show();//window
window.show();//window
}

box.onclick = show(); // 相当于下面这句，因为 show 函数默认返回 undefined
box.onclick = undefined;

box.onclick = show;//box
box.onclick = window.show;//box
box.onclick = function show(){
console.log(this); //box
}
练习：假设页面中有 6 个 div，点击任意一个 div，输出该 div 的下标
这里先不涉及数组的话：
两个循环，一个循环给 div 添加点击事件，另一个跟 this 进行对比，当相等的时候，输出对应的循环变量的值即为当前 div 的下标
// 给所有的 box 添加一个点击事件
for (var i = 0, len = boxs.length; i < len; i++){
// console.log(i);//0 1 2 3 4
boxs[i].onclick = function (){
// console.log(i);//5 都是 5 异步操作 当用户点击的时候已经循环完了
// console.log(this);//当前点击的元素
// 遍历：依次把数据取出来操作
for (var v = 0, len = boxs.length; v < len; v++){
// 通过遍历，找出当前点击的元素 ( 和 this 相等 )
if (boxs[v] == this){
console.log(v);
}
}
}
}
// console.log(i);//5 循环完后变量为 5

or
for (var i = 0, len = boxs.length; i < len; i++){
boxs[i].index = i; // 给变量增加一个 Index 属性
// console.log(i);//0 1 2 3 4
boxs[i].onclick = function (){
// console.log(i);//5 都是 5 异步操作 当用户点击的时候已经循环完了
// console.log(this);//当前点击的元素
// 遍历：依次把数据取出来操作
console.log(this.index)
}
}

2.声明提升机制

在 JavaScrip 中变量声明和函数声明，声明会被提升到当前作用域的顶部。
当函数和变量重名的时候，函数优先级更高（函数在 js 中是一等公民）

var a = 1;
function test() {
alert(a); // undefined
var a = 2;
alert(a); // 2
}
test();

模拟代码执行的顺序
var a;//声明提升
function test() {
var a;
alert(a);//undefined
a = 2;
alert(a);//2
}
a = 1;
test();

在同一作用域中：

alert(typeof fn); // function
var fn = 10;
function fn() {}
alert(typeof fn); //number

模拟代码执行的顺序
// var fn;
function fn() {}
alert(typeof fn);//function
fn = 10;
alert(typeof fn);//number

JS 解析器
浏览器中有一套专门解析 JS 代码的程序，这个程序称为 js 的解析器。
浏览器运行整个页面文档时，遇到<script>标签时 JS 解析器开始解析 JS 代码。

JS 解析器的工作步骤： 1.预解析代码
主要找一些关键字如 var、function、参数等，并存储进仓库里面(内存)；
变量的初始值为 undefined；
函数的初始值就是该函数的代码块；
当变量和函数重名时：不管顺序谁前谁后，只留下函数的值；
当函数和函数重名时：会留下后面那个函数。

2.逐行执行代码
当预解析完成之后，就开始逐行执行代码，仓库中变量的值随时都可能会发生变化

示例解读：见代码
函数的形参相当于函数的变量

解析器（一） 1.预解析代码:找 var function 参数 -> 存到仓库（EC={}）
global scope:
a: undefined -> 1
test: function () {
alert(a);
var a = 2;
alert(a);
}
test scope:
a: undefined -> 2

2.逐行执行代码
a = 1;
test();

alert(a);
a = 2;
alert(a);

var a = 1;
function test() {
alert(a); //undefined
var a = 2;
alert(a);//2
}
test();

解析器（二） 1.预解析代码:找 var function 参数 -> 存到仓库（EC={}）
global scope:
fn: undefined -> function fn() {} -> 10

2.逐行执行代码
alert(typeof fn);
fn = 10
alert(typeof fn);

alert(typeof fn);//function
var fn = 10;
function fn() {}
alert(typeof fn);//number

3.自执行函数

要执行一个函数，我们必须要有方法定位函数、引用函数。

不能单独定义一个匿名函数：从预解析的角度看，但我们碰到匿名函数的时候，没有名字，无法存进仓库，在执行阶段无法去定位函数，引用函数

匿名函数如何调用？

匿名自执行函数，也叫立即执行函数(IIFE)。

解析器碰到运算符，会直接跳过预解析阶段，执行阶段就立即执行了

(function () {
console.log(123);
})();

小括号能把我们的表达式组合分块，并且每一块都有一个返回值，这个返回值实际上就是小括号中表达式的返回值。

自执行函数的好处：独立的作用域，不会污染全局环境！

可以让代码在局部作用域中执行，避免过多的全局变量问题，避免一些变量冲突，函数命名冲突的问题

    1.作用域
       2.变量污染
       3.模块化

传参：
(function (a,b) {
console.log(a + b);
})(2,3);

常见形式：
(function () {
console.log(11);
})();

(function(){
　　 console.log(22);
}());

!function() {
console.log(33);
}();

+function() {
console.log(55);
}();

-function() {
console.log(66);
}();

......

自执行函数：
// 模块化
var myModule = (function (){
var name = 'xiaocuo';
var age = 30;
function test(){
alert(123);
}
return {
abc: name,
fun: test
}
})();

4.回调函数

把函数作为参数传递给另一个函数，我们把该函数(作为参数的函数)称为回调函数。
通常当特定的事件或条件发生的时候，我们调用回调函数对事件进行处理。

function fn1(callback){
var a = 123;
console.log('函数 fn1 执行');
callback(a);// 回调函数
}
function fn2(num){
console.log('函数 fn2 执行，传入值：' + num);
}
fn1(fn2);

5.递归函数

老王有四个子女，老四比老三小 2 岁，老三比老二小 2 岁，老二比老大小 2 岁，老大现在 16 岁，问老四几岁？

f(4) = f(3) - 2 f(n) = f(n - 1) - 2
f(3) = f(2) - 2
f(2) = f(1) - 2
f(1) = 16

公园里有一堆桃子，猴子每天吃掉一半，挑出一个坏的扔掉，第 6 天的时候发现还剩 1 个桃子，问原来有多少个桃子？

阿里巴巴 2015 年前端面试题
/\*\*
_@desc: fibonacci
_@param: count {Number}
_@return: result {Number} 第 count 个 fibonacci 值，计数从 0 开始
fibonacci 数列为：[1, 1, 2, 3, 5, 8, 13, 21, 34 …]
getNthFibonacci(0) 返回值为 1
getNthFibonacci(4) 返回值为 5
_/

function f1( ){
// ...
}
f1( ); // 函数调用
function f2( ){
f1( ); // 函数调用
}

如果一个函数直接或间接调用函数本身，这个函数就是递归函数。

递归函数的本质：函数循环调用。

一般来说，递归需要有边界条件、递归前进段和递归返回段。
当边界条件不满足时，递归前进；当边界条件满足时，递归返回。

老王有四个子女，老四比老三小 2 岁，老三比老二小 2 岁，老二比老大小 2 岁，老大现在 16 岁，问老四几岁？
function countAge(who) {
if (who == 1) {
return 16;
} else {
return countAge(who - 1) - 2;
}
}
alert(countAge(4)); // 10

递归函数在运行的时候，每调用一次函数就会在内存中开辟一块空间，内存消耗较大，注意防止栈溢出。

Uncaught RangeError: Maximum call stack size exceeded
未捕获 范围错误 ： 内存溢出

阿里巴巴 2015 年前端面试题
/\*\*
_@desc: fibonacci
_@param: count {Number}
_@return: result {Number} 第 count 个 fibonacci 值，计数从 1 开始
fibonacci 数列为：[1, 1, 2, 3, 5, 8, 13, 21, 34 …]
getNthFibonacci(2) 返回值为 1
getNthFibonacci(6) 返回值为 8
_/

斐波那契数列：[1, 1, 2, 3, 5, 8, 13, 21, 34...] 数列从第 3 项开始，每一项都等于前两项之和
斐波那契数列的定义者，是意大利数学家列昂纳多·斐波那契

function getNthFibonacci(count){
function fb(n){
if (n <= 2) {
return 1;
}
return fb(n-2) + fb(n-1);
}
return fb(count);
}
console.log( getNthFibonacci(6) );//8
console.log( getNthFibonacci(9) );//34

递归算法一般用于解决三类问题： 1.数据的定义是按递归定义的; 2.问题解法按递归算法实现; 3.数据的结构形式是按递归定义的。

练习: 1.利用递归求 15 的阶乘 ? ( 1307674368000 )
/_ f(15) = 15 _ f(14)
f(2) = 2 _ f(1)
f(1) = 1 _/
function multSum (n) {
if (n == 1) {
return 1;
}
return n _ multSum(n - 1)
}
console.log( multSum(15)) 2.公园里有一堆桃子，猴子每天吃掉一半，挑出一个坏的扔掉，
第 6 天的时候发现还剩 1 个桃子，问原来有多少个桃子？
function sum (n) {
if (n == 6) {
return 1;
}
return (sum(n + 1) + 1) _ 2
}
console.log(sum(1))

6.构造函数（了解）

构造函数：用于创建特定类型的对象。

JS 内部构造函数：Object、Number、String、Array、Function、Boolean 等等...

当任意一个普通函数用于创建一类对象，并通过 new 操作符来调用时它就可以作为构造函数。

构造函数一般首字母大写(不是硬性要求，只是大家都普遍遵守，也是为了区分普通函数和构造函数)。

构造函数案例:
function test(){
console.log(this)
}
var val1 = test();//普通函数调用 this 输出 window
console.log(val1);//undefined

var val2 = new test();//作为构造函数调用 this 输出 test
console.log(typeof val2);//object
console.log(val2) //test

var str1 = 'abc';
var str2 = new String('abc');
console.log(typeof str1);//string
console.log(typeof str2);//object
console.log(str1 == str2);//true
console.log(str1 === str2);//false

var num1 = 123;
var num2 = new Number(123);
console.log(typeof num1);//number
console.log(typeof num2);//object
console.log(num1 == num2);//true
console.log(num1 === num2);//false

var bol1 = true
var bol2 = new Boolean(false)
console.log(typeof bol1) // boolean
console.log(typeof bol2) // object

var obj1 = {
name: '小敏',
age: 13
}
var obj2 = new Object({age: 19, name: '哈哈'})
console.log(obj1.name) // 小敏
console.log(typeof obj1) // object
console.log(obj2.name) // 哈哈
console.log(typeof obj2) // object
console.log(undefined++ + ' ') // NaN

var f1 = function () {
console.log('这是字面量函数')
}
var f2 = new Function(console.log('这是构造函数')) // 可以直接输出
console.log(typeof f1) // function
console.log(typeof f2) // function

var arr1 = [];
var arr2 = new Array();
console.log(typeof arr1) // object
console.log(typeof arr2) // object

解析器案例：
alert(a);// function a(){alert(3);}
var a=1;
alert(a);// 1
function a(){alert(2);}
alert(a);// 1
var a=3;
alert(a);// 3
function a(){alert(3);}
alert(a);// 3

var a=1;
function fn(){
alert(a);//1
a=2;
}
fn();
alert(a);//2

解析器 1.预解析代码:找 var function 参数 -> 存到仓库（EC={}）
global scope:
a: undefined -> 1
fn: function fn(a){
alert(a);//undefined 1
a=2;
}
fn scope:
a: undefined -> 2

2.逐行执行代码
a=1;
fn();

alert(a);
a=2;

alert(a);

var a=1;
function fn(a){
alert(a);//undefined
a=2;
}
fn();
alert(a);//1

var a=1;
function fn(a){
alert(a);//1
a=2;
}
fn(a);
alert(a);//1

console.log(num);//undefined
var num = 24;
console.log(num);//24
func(100 , 200);
function func(num1 , num2) {
var total = num1 + num2;
console.log(total);//300
}

fn();//2
function fn() {console.log(1);}
fn();//2
var fn = 10;
fn();//报错 因为这里 fn 已经被赋值 10, typeof fn 为 number 了
function fn() {console.log(2);}
fn(); // js 是单线程，报错后下面的代码就不执行了

var a = 1;
fn();
function fn(){
a = a + 1;
console.log(a);
return a;
}
fn();
console.log( fn() + 1 );

// 2 3 4 5

function fn1() {
var a = 0;

function fn2() {
++a;
alert(a);
}
return fn2;
}
fn1()();
var newFn = fn1();
newFn();
newFn();

// 1 1 2
```
