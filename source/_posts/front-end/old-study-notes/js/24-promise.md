---
title: 24-promise
tag: old-study-notes
catogory:
  - front-end
  - old-study-notes
---

Promise - “承诺”

传统的就是一个一个嵌套，代码可读性较差，还要保证顺序 day24
Promise 是 ES6 对异步编程的一种解决方案，比传统的解决方案（回调函数和事件）更合理更强大。
Promise 简单说就是一个容器，里面保存着一个尚未完成且预计在未来完成的异步操作。

Promise 是一个构造函数，用来创建一个 Promise 对象。

Promise 对象代表一个异步操作，有三种状态：
pending（进行中）
fulfilled（成功）
rejected（失败）

Promise 对象的状态改变有两种：
从 pending 变为 fulfilled
从 pending 变为 rejected

一旦状态改变，就不会再变，任何时候都可以得到这个结果。
有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数(可读性差，不方便维护)。
并不是说 Promise 是异步的，而是它内部的操作是异步的

console.log('沈老板：A 同学，你上课再睡觉，我抓到一次，赏你一管芥末'); // 同步
var pm = new Promise(function (resolve,reject){ // 同步
console.log('A 同学：老师，我保证以后上课不睡觉了！');
var num = Math.ceil(Math.random()\*10);//1-10
if (num <= 5) {
resolve('承诺兑现');
} else {
reject('承诺失败');
}
});
pm.then(function (msg){ // 异步
console.log(msg);
},function (err){
console.log(err);
});
console.log('沈老板：好的，看你以后的表现！'); // 同步

var p = new Promise(function(resolve, reject) {
// do something ...
if (/_ 异步操作成功 _/){
resolve(value);
} else {
reject(error);
}
});
Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject。
resolve 和 reject 是两个函数，由 JavaScript 引擎提供，不用自己部署。

resolve 函数的作用是，将 Promise 对象的状态从“进行中”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。

reject 函数的作用是，将 Promise 对象的状态从“进行中”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

reject 专门用来处理错误的，Promise 内部发生错误或进入失败状态，就会执行
内部语法错误或者说人为抛出错误都会执行 reject ，相当于隐式调用了 reject，

p.then(function(value) {
// success
return 值 // 代表下一个 promise 成功的返回值
}, function(error) {
// failure 可选
return // 代表下一个 promise 成功的返回值
}).then(function(str) {
// 上一个 promise 执行成功，即 return 成功就会执行
},function(err) {
// 上一个 promise 内部发生错误
})

Promise 实例的 then 方法：
第一个参数是 resolved 状态的回调函数
第二个参数（可选）是 rejected 状态的回调函数
方法返回的是一个新的 Promise 实例

Promise 实例的 catch 方法：用于指定发生错误时的回调函数，可以捕获 then 里面的错误。

p.then(function(value) {
// success
return 值 // 代表下一个 promise 成功的返回值
}, function(error) {
// failure 可选
return // 代表下一个 promise 成功的返回值
}).catch(function(err) { // 捕获是前一个 then 里面的错误

})
.finally(() => {
// 无论成功还是失败都会执行
})

throw new Error('出错啦');

惰性创建
function returnPromise() { // 放在函数里面，当需要的时候再创建
return new Promise(funcion(resolve, reject) {
resolve('成功) // 创建对象成功调用了 resolve，状态一旦改变就不会再变了
reject(''失败)
})
}
returnPromise().then(function() {}, function() {})

Promise.all 可以将多个 Promise 实例包装成一个新的 Promise 实例。 1.它接受一个数组作为参数。 2.数组可以是 Promise 对象，也可以是其它值，只有 Promise 会等待状态改变。 3.当所有的子 Promise 都完成，该 Promise 完成，返回值是全部值的数组。 4.如果有任何一个失败，该 Promise 失败，返回值是第一个失败的子 Promise 的结果。
为了保证前面几个都完成才会执行下面的操作
Promise.all([p1,p2,p3]).then(function (arr){
console.log(arr); // 前面几个 Promise 的返回结果的集合
},function (error){
console.log(error); // 只要上面有一个没有完成，都会进入到这里
});

promise.race() 跟 promist.all 类似，也接受一个参数，但是.then((result) => {}) // 只有一个结果，谁执行地快就是谁的，
但是 promise.all 中接受的是一个数组

升级打怪
第一种方式 回调地狱
ajax({
url: 'datas.php',
type: 'get',
data: 'userid=abc1001',
succeed: function (str){
var json = JSON.parse(str);
n = json.name;
ajax({
url: 'datas.php',
type: 'get',
data: 'userid=' + json.id,
succeed: function (str){
var json = JSON.parse(str);
c = json.idcode;
ajax({
url: 'datas.php',
type: 'get',
data: 'userid=' + json.id,
succeed: function (str){
var json = JSON.parse(str);
a = json.address;
con.innerText = `姓名：${n}，身份证：${c}，住址：${a}`;
}
});
}
});
}
});
第二种方式: promise
promiseAjax({
url: 'datas2.php',
type: 'get',
data: 'userid=abc1001'
})
.then(function (str){
var json = JSON.parse(str);
n = json.name;
return promiseAjax({
url: 'datas.php',
type: 'get',
data: 'userid=' + json.id
})
},function (err){
console.log(err);
throw new Error('出错拉！');
})
.then(function (str){
var json = JSON.parse(str);
c = json.idcode;
return promiseAjax({
url: 'datas.php',
type: 'get',
data: 'userid=' + json.id
})
})
.then(function (str){
var json = JSON.parse(str);
a = json.address;
con.innerText = `姓名：${n}，身份证：${c}，住址：${a}`;
}); // 只有成功的回调函数，出错会报错
第三种方式: promise.all 方法
var res1 = promiseAjax({
url: 'datas.php',
type: 'get',
data: 'userid=abc1001'
});
var res2 = promiseAjax({
url: 'datas.php',
type: 'get',
data: 'userid=abc1002'
});
var res3 = promiseAjax({
url: 'datas.php',
type: 'get',
data: 'userid=abc1003'
});
Promise.all([res1,res2,res3])
.then(function (arr){
// console.log(arr);
var n = JSON.parse(arr[0]).name;
var c = JSON.parse(arr[1]).idcode;
var a = JSON.parse(arr[2]).address;
con.innerText = `姓名：${n}，身份证：${c}，住址：${a}`;
})

1.Promise 改造 函数嵌套

2.Promise 改造 ajax 嵌套依赖

var p2 = new Promise(function (resolve,reject){
// resolve('请求成功');
// reject('请求失败');
// alertt('123');// promise.html:45 ReferenceError: alertt is not defined
throw new Error('alertt is not a function'); // Error: alertt is not a function
});
p2.then(function (res){
console.log(res);//'请求成功'
},function (err){//promise 内部发生错误或进入失败状态，会执行这里
console.log(err);//请求失败
});

var p3 = new Promise(function (resolve,reject){
resolve('请求成功');
// reject('请求失败');
// alertt('123');
// throw new Error('alertt is not defiend');
});
p3.then(function (res){
console.log(res);//'请求成功'
// return '上一个 promise 执行成功';//代表下一个 promise 成功的返回值
alertt(123);
},function (err){//promise 内部发生错误或进入失败状态，会执行这里
console.log(err);//请求失败
return '上一个 promise 执行失败';//代表下一个 promise 成功的返回值
}).then(function (str){
console.log(str);//上一个 promise 执行失败
},function (err){
console.log(err);//ReferenceError: alertt is not defined
});
另一种方式: 使用 catch 来捕获 then 中的错误
var p4 = new Promise(function (resolve,reject){
resolve('请求成功');
// reject('请求失败');
// alertt('123');
// throw new Error('alertt is not a function');
});
p4.then(function (res){
console.log(res);//'请求成功'
alertt('123');
},function (err){
console.log(err);
}).catch(function (err){
console.log(err);//ReferenceError: alertt is not defined
});

了解 fetch 与 axios

fetch：号称是 AJAX 的替代品，是基于 promise 设计的。
fetch 不是 ajax 的进一步封装，而是原生 js，代码结构比起 ajax 简单多了。

axios：是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
vue 官方推荐的 HTTP 请求库。

fetch 和 axios

https://www.jianshu.com/p/8bc48f8fde75

CSRF

https://baike.baidu.com/item/CSRF/2735433?fr=aladdin

Generator 遍历器生成函数

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。
形式上，Generator 函数是一个普通函数，但是有两个特征：
一是，function 关键字与函数名之间有一个星号 \*；二是，函数体内部使用 yield 表达式，定义不同的内部状态（yield 即“产出”）。

// Generator 遍历器生成函数
function\* myGenerator(){
yield 'hello';
yield 'world';
yield 'result';
// 如果在这里加上 return 'over' ，遍历到这里 done 就为 true
}
var iterator = myGenerator();
console.log( iterator ); // 遍历器对象（Iterator Object）
console.log( iterator.next() ); // {value: "hello", done: false}
console.log( iterator.next() ); // {value: "world", done: false}
console.log( iterator.next() ); // {value: "result", done: false}
// console.log( iterator.next() ); // {value: "over", done: true}
console.log( iterator.next() ); // {value: undefined, done: true}

执行 Generator 函数会返回一个遍历器对象，是一个遍历器对象生成函数。
每次调用遍历器对象的 next 方法(存在原型中)，就会返回一个有着 value 和 done 两个属性的对象。
value 表示当前的内部状态的值，是 yield 后面那个表达式的值；done 是一个布尔值，表示是否遍历结束。
Generator 函数返回的遍历器对象，只有调用 next 方法才会遍历下一个内部状态，其实是提供了一种可以暂停执行的函数。yield 表达式就是暂停标志。

碰到 yield 就暂停，调用 next 方法就继续

for...of 循环，扩展运算符（...）、解构赋值和 Array.from 等方法，内部调用的都是遍历器接口。

提供了可以暂停语句的函数，可以遍历，调用一次，产出值
for of 遍历数组，其实就是调用了 Generator 的接口(数组的 Symbol.iterator 指向它的 Generator 函数)，生成一个迭代器对象，然后自动的调用迭代器的 next 方法，一直到 done 为 true

任意一个对象的 Symbol.iterator(指向了它的 Generator 函数 )方法（数组，字符串， Set，Map，元素集合，arguments），等于该对象的遍历器生成函数（ Generator），调用该函数会返回该对象的一个遍历器对象。
for of 就会自动调用迭代器的 next 方法 , 直到 done 为 true

原生 js 对象不具备 Iterator 接口，无法使用上述接口，将 Generator 函数加到对象的 Symbol.iterator 属性上面即可使用。

手动部署迭代器接口
function\* objGenerator() {
let keys = Object.keys(this); // ["name", "sex", "aeg"]
for (let key of keys) {
yield [key, this[key]]; // [key,value] 希望遍历出什么 yeild 就产出什么
}
}

let xmObj = { name: 'xiaoming', sex: '男', aeg: 23 };

// 将 Generator 函数加到对象的 Symbol.iterator 属性上面
xmObj[Symbol.iterator] = objGenerator;

for (let [key, value] of xmObj) { // 可以使用 for/of 遍历
console.log(`${key}: ${value}`);
}
// name: xiaoming
// sex: 男
// aeg: 23

手动迭代
let iterator = xmObj[Symbol.iterator]()
console.log(iterator.next())

var str = 'abcd';
var iterator = str[Symbol.iterator](); // Symbol.iterator 指向遍历器生成函数
console.log(iterator.next()); // {value: "a", done: false}
console.log(iterator.next()); // {value: "b", done: false}
console.log(iterator.next()); // {value: "c", done: false}
console.log(iterator.next()); // {value: "d", done: false}
console.log(iterator.next()); // {value: undefined, done: true}

// 迭代器
// 给对象手动部署迭代器接口
function \* myGenerator() {
let keys = Object.keys(this) // 得到一个数组，放着对象的 key
for(let key of keys) {
// yield key // key 值
// yield this[key] // value 值
yield [key, this[key]] // 希望遍历出什么就产出什么
}
}

let obj = {name: '哈哈', age: 18, sex: '女'}

obj[Symbol.iterator] = myGenerator

for(let value of obj) {
console.log(value); // ["name", "哈哈"] ) ["age", 18] ["sex", "女"]
}

// 类数组对象
var obj2 = {
0:'b1',
1:'b2',
2:'b3',
length:3
};
obj2[Symbol.iterator] = objIterator;
console.log(...obj2); // b1 b2 b3 3

var arr = Array.from(obj2); // 转为数组
console.log(arr); // ["b1", "b2", "b3", 3]
arr.push('abc');
console.log(arr); // ["b1", "b2", "b3", 3, "abc"]

作用:

1.      部署迭代器
2.      异步编程解决方案

async 和 await

async 函数是什么？一句话，它就是 Generator 函数的语法糖。
async 函数就是将 Generator 函数的星号（\*）替换成 async，将 yield 替换成 await，仅此而已。
async 和 await，比起星号和 yield，语义更清楚了。

async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。

async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。
async 函数内部 return 语句返回的值，会成为 then 方法回调函数的参数。
async function fn() {
return 'hello world';
}
fn().then(v => console.log(v)); // "hello world"
console.log('我先执行'); // "我先执行"
console.log( fn() ); // Promise {<resolved>: "hello world"}

async 函数有多种使用形式。
// 函数声明
async function foo() {}

// 函数表达式
let foo = async function () {};

// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)

// Class 的方法
class Storage {
constructor() {
this.cachePromise = caches.open('avatars');
}
async getAvatar(name) {
const cache = await this.cachePromise;
return cache.match(`/avatars/${name}.jpg`);
}
}
const storage = new Storage();
storage.getAvatar('jake').then(…);

// 箭头函数
let foo = async () => {};

// 立即执行函数
(async function (){
// ...
})();

async 函数内部抛出错误，导致返回的 Promise 对象变为 reject 状态。抛出的错误对象会被 catch 方法回调函数接收到。
async function fn() {
throw new Error('出错了');
}

async function fn() {
return 'hello' // 成功或者没有值(undefined)都会进入到成功这个函数
}
相当于
function fn() {
return new Promise(function(resolve, reject) {
resolve('hello')
})
}
fn().then(
v => console.log(v),
e => console.log(e) // catch Error: 出错了
)

await 命令
正常情况下，await 命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。
async function fn() {
return await 123;
// 等同于
// return 123;
}
fn().then( v => console.log(v) );
// 123
上面代码中，await 命令的参数是数值 123，这时等同于 return 123。

注意，await 一定要运行在 async 函数内！

当 async 函数执行的时候，一旦遇到 await 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
可以让代码按照我们想要的顺序执行
(async function (){
var res1 = await new Promise(function (resolve,reject){
setTimeout(function (){
console.log('异步任务 1');
resolve('成功 1');
},1000);
});
var res2 = await new Promise(function (resolve,reject){
setTimeout(function (){
console.log('异步任务 2');
resolve('成功 2');
},1000);
});
console.log(res1,res2);
console.log('同步任务 3');
console.log('同步任务 4');
})();

// 异步任务 1
// 异步任务 2
// 成功 1，成功 2
// 同步任务 3
// 同步任务 4

await 会等待这个 Promise 完成，并将其 resolve 的结果返回出来。

await 命令后面的 Promise 对象如果变为 reject 状态，则 reject 的参数会被 catch 方法的回调函数接收到。
async function fn() {
await Promise.reject('出错了');
}
fn().then(v => console.log(v)).catch(e => console.log(e))
// 出错了

任何一个 await 语句后面的 Promise 对象变为 reject 状态，那么整个 async 函数都会中断执行。
async function fn() {
await Promise.reject('出错了');
await Promise.resolve('hello world'); // 不会执行
}
fn().then(
v => console.log(v),
err => console.log(err)
);
// '出错了'

await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中(try ... catch 处理异常或容易出错的代码)。
try catch 语句： 把容易出错的代码放在 try catch 里面，这里就不会影响后面代码 的执行,对就执行，出错也没关系
async function f() {
try {
await Promise.reject('出错了');
} catch(e) {
console.log(e);
}
return await Promise.resolve('hello world');
}
f().then(v => console.log(v));
// hello world

async 函数返回的 Promise 对象，必须等到内部所有 await 命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到 return 语句或者抛出错误。也就是说，只有 async 函数内部的异步操作执行完，才会执行 then 方法指定的回调函数。

(async function (){
var res1 = await promiseAjax({
type: 'get',
url: 'datas.php',
data: 'userid=abc1001'
});
var res2 = await promiseAjax({
type: 'get',
url: 'datas.php',
data: 'userid=abc1002'
});
var res3 = await promiseAjax({
type: 'get',
url: 'datas.php',
data: 'userid=abc1003'
});
res1 = JSON.parse(res1);
res2 = JSON.parse(res2);
res3 = JSON.parse(res3);
// con.innerHTML = `姓名：${res1.name}，身份证：${res2.idcode}，地址：${res3.address}`;
return `姓名：${res1.name}，身份证：${res2.idcode}，地址：${res3.address}`;
})().then(val=>{
con.innerHTML = val;
});

如果模块之间相互依赖彼此的执行结果

(async function (){
var res1 = await promiseAjax({
url: 'datas2.php',
type: 'get',
data: 'userid=abc1001'
});
res1 = JSON.parse(res1);
var res2 = await promiseAjax({
url: 'datas.php',
type: 'get',
data: 'userid=' + res1.id
});
res2 = JSON.parse(res2);
var res3 = await promiseAjax({
url: 'datas.php',
type: 'get',
data: 'userid=' + res2.id
});
res3 = JSON.parse(res3);

    // con.innerText = `姓名：${res1.name}，身份证：       ${res2.idcode}，地址：${res3.address}`;
    return [res1,res2,res3];

})().then(function (arr){
con.innerText = `姓名：${arr[0].name}，身份证： ${arr[1].idcode}，地址：${arr[2].address}`;
},function (err){
console.log(err);
});

设置元素为选中状态 el.checked = true
设置元素为未选中状态 el.checked = false;

封装 ajax

function promiseAjax(option) {
return new Promise(function (resolve,reject){

// 1.创建 ajax 对象
if (window.XMLHttpRequest) {
var xhr = new XMLHttpRequest();//非 IE5 IE6
} else {
var xhr = new ActiveXObject('Microsoft.XMLHTTP');//IE5 IE6
}

if (option.type == 'get' || option.type == 'GET') {
// 2.连接服务器
xhr.open(option.type,option.url+'?'+option.data+'&\_='+new Date().getTime(),true);//解决 get 缓冲问题
// 3.将请求发送到服务器
xhr.send(null);//get 请求
} else if (option.type == 'post' || option.type == 'POST'){
// 2.连接服务器
xhr.open(option.type,option.url,true);
// 设置请求头
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
// 3.将请求发送到服务器
xhr.send(option.data);//post 请求
} else {
alert('暂时只支持 get 与 post 请求.');
return;
}

// 4.服务器响应情况
xhr.onreadystatechange = function () {
if (xhr.readyState == 4) {//请求完成
if (xhr.status == 200) {//ok 成功
resolve(xhr.responseText);
}else {
reject(xhr.status);
}
}
}

});
}

嵌套例子

setTimeout(function (){
console.log('异步任务 1');
setTimeout(function (){
console.log('异步任务 2');
setTimeout(function (){
console.log('异步任务 3');
},1000);
},1000);
},1000);

function doSomeThing(task){
return new Promise(function (resolve,reject){
setTimeout(function (){
resolve(task);
},1000);
});
}
doSomeThing('异步任务 1')
.then(function (d1){
console.log(d1);
return doSomeThing('异步任务 2');
})
.then(function (d2){
console.log(d2);
return doSomeThing('异步任务 3');
})
.then(function (d3){
console.log(d3);
});
