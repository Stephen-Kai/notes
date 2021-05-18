---
title: 17-es6常用API
tag: old-study-notes
catogory:
  - front-end
  - old-study-notes
---

ES6 常用 API
狭义上指 ECMAScript 2015，但是广义上是指 ES5 之后的所有新的标准

let 与 const

let 关键字，用来声明变量，它的用法类似于 var。

let 不允许重复声明变量；
var a = 1;
var a = 2;
console.log(a);

let b = 1;
let b = 2; // 报错 是这行报错
console.log(b);

let 声明变量仅在块级作用域内有效；
for (var i = 0; i < 10; i++) {
console.log(i);
};
alert(i);

for (let v = 0; v < 10; v++) {
console.log(v);
}
alert(v); // 报错 v is not defined

不能通过 let 声明和形参相同的变量；

function fn1(a,b){
console.log(a);//2
var a = 123;
console.log(a+b);//126
}
fn1(2,3);

function fn1(a,b){
console.log(a); // 不会输出值，在预解析阶段就报错了
//ES6 明确规定，如果区块中存在 let 和 const 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
let a = 123;//报错
console.log(a+b);//126
}
fn1(2,3);

function test(a) {
let a = 123; // 报错
console.log(a);
}
test(456);

用来理解的
// console.log(a); // ReferenceError: Cannot access 'a' before initialization
// console.log(b); //Uncaught ReferenceError: b is not defined
a = 3;
console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 3;
console.log(a);

let 声明变量不会提升；
alert(a); // undefined
var a = 2;

alert(b); // 报错
let b = 2;
注意：let 声明的变量一定要在声明之后使用，否则报错。

暂时性死区;
ES6 规定在某个区块中， 一旦用 let 或 const 声明一个变量，那么这个区块就变成块级作用域，用 let 或 const 声明的变量就“绑定”这个区域，不再受外部的影响。 在该变量声明之前不可以用，在语法上我们叫这种情况为：暂时性死区 (temporal dead zone，简称 TDZ)。
let v = 1;
if (true) {
console.log(v); // 报错
let v = 2;
}
console.log(v);

var v = 1;
if (true) {
console.log(v);//1
var v = 2;
}
console.log(v);//2

for(var i = 0; i < 4; i++){
setTimeout(function (){
console.log(i);// 4 4 4 4
},1000);
}

for(let i = 0; i < 4; i++){
setTimeout(function (){
console.log(i);// 0 1 2 3
},1000);
}

上面代码中，存在全局变量 v，但是块级作用域内 let 又声明了一个局部变量 v，导致后者绑定这个块级作用域，所以在 let 声明变量之前，对 v 赋值会报错。

let 应用：改造选项卡效果

const 关键字，用来声明一个只读的常量。
const 与 let 类似，但是，const 常量一旦声明，常量将不能重新赋值！
const AGE = 18;
alert(AGE);// value
AGE = 20; // 报错
alert(AGE);

意味着，const 一旦声明，就必须立即初始化，不能留到以后赋值！
const AGE; // 报错

本质：const 实际上保证的，并不是值不能改变，而是指向的那个内存地址不能改变。重点重点
常量不能修改
如果是基本类型的话，他的值是存在栈中的，如果赋值的话就相当于在栈中新开辟了一块空间
如果是引用类型的话，只要存在栈中的地址不变就好了，堆中对象的属性和方法可以改变

const FOO = {name: 'xm'};
FOO.age = 18;
console.log(FOO.age); // 18
FOO = {name: 'xh'}; // TypeError: Assignment to constant variable. 重新赋值，改变了栈中的内存地址，会报错

注意：为了和变量区分，一般常量用大写字母。
如：const PI = 3.14;

arrow functions(箭头函数)

定义：( 形参 ) => { 函数体 }
var box = document.getElementById('box');
box.onclick = function () { // ES5
console.log(this); // box
}
box.onclick = () => { // ES6
console.log(this); // 外层代码块中的 this
}

用箭头函数来写比原来的 function 写法要简洁很多（针对匿名函数使用）。
var reflect = function (value){ //ES5
return value;
};
let reflect = value => value; //ES6

箭头函数与传统的 JavaScript 函数主要区别在于以下几点： 1.对 this 的关联。函数内部的 this 指向，取决于箭头函数在哪定义，而非箭头函数的调用对象。
var name = 'xh';
var obj = {
//这里没有 this
name: 'xm',
say: () => {
alert(this.name);
}
}
obj.say(); // xh obj 中没有 this,函数内部才有

当我们使用箭头函数时，函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。并不是因为箭头函数内部有绑定 this 的机制，实际原因是箭头函数根本没有自己的 this，它的 this 是继承外面的，因此内部的 this 就是外层代码块的 this。
var box = document.getElementById('box');
box.onclick = function () {
setTimeout(() => {
console.log(this); // box
},2000);
}

2.new 不可用。箭头函数不能使用 new 关键字来实例化对象，不然会报错。
var Test = function () {};
var obj = new Test();
console.log(obj); // Test {}

var Test = () => {};
var obj = new Test(); //Test is not a constructor

3.this 不可变。函数内部 this 不可变，在函数体内整个执行环境中为常量。
var obj1 = {
name: '隔壁王叔叔',
age: 33
}
setTimeout(() => {
console.log(this);
}.bind(obj1),1000); //报错

this 不是箭头函数自己的，不能改变

4.没有 arguments 对象。更不能通过 arguments 对象访问传入参数。
function fn(){
console.log(arguments[0]);
console.log(arguments[1]);
}
fn(1,2);

var fn = () => {
console.log(arguments[0]); //报错 arguments is not defined
}
fn(3);

template string(（字符串模板）

ES6 中字符串模板使用反引号 ` ` 表示，字符串模板中可以解析变量和函数，使用 ${ } 解析
var sname = "小错";
function fnAge(){
    return 18;
}
var str = `大家好，我叫${sname},我今年${fnAge()}岁了`;
alert( str );

字符串模板非常有用，当我们要插入大段的 html 内容到文档中时，传统的写法非常麻烦
var box = document.getElementById('box');
var val1 = 11, val2 = 22, val3 = 33;
box.innerHTML = '<ul><li>'+val1+'</li><li>'+val2+'</li><li>'+val3+'</li></ul>';
box.innerHTML = '<ul>'+
'<li>'+val1+'</li>'+
'<li>'+val2+'</li>'+
'<li>'+val3+'</li>'+
'</ul>';

使用 ES6 字符串模板：
box.innerHTML = ` <ul> <li>${val1}</li> <li>${val2}</li> <li>${val3}</li> </ul>`;

for 循环中括号中也存在作用域

Destructuring（解构赋值）

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构赋值。
解构赋值：解析结构进行赋值。

var x = 10 , y = 20 , z = 30;

var cat = 'ken';
var dog = 'lili';
var zoo = {cat: cat, dog: dog}; / var zoo = {cat, dog}
console.log(zoo); // {cat: "ken", dog: "lili"}

用 ES6 完全可以像下面这么写：

var [x,y,z] = [10,20,30];
var {sname,age} = {age : 10, sname : "xm" }
console.log( sname ); // xm
console.log( age ); // 10

let cat = 'ken';
let dog = 'lili';
let zoo = {cat, dog}; // key 和 value 同样的话，可以简写
console.log(zoo);

反过来可以这么写：
let dog = {type: 'animal', many: 2};
let { type, many} = dog;
console.log(type); // animal
console.log(many); // 2

解构赋值可以作用在函数的参数上，让函数参数的值传递顺序改变
function fn( {sname,age} ){
return `大家好我叫${sname}，我今年${age}岁了`;
}
console.log( fn( {age:23,sname:"jack"} ) );

Array.from( )

Array.from：将含有 length 属性的对象、类数组转成真正的数组。
类数组对象： 索引为数字，有一个 length 属性

Array.from(obj, map 函数);
第一个参数为要转换的对象，第二个参数为一个函数，可选，类似 map 函数。
map 函数 : 遍历数组--操作数组--返回数组
var arr = [1,2,3,4,5];
var newArr = arr.map( (item) => { return item\*2 } );
console.log( newArr );

likeArray = Array.from(likeArray,function (item,index,arr){
return item += '22';
});
console.log(likeArray); // ["aa22", "bb22", "cc22"]
likeArray.push('asdfsdef');

类数组元素集合：
var lis = document.getElementsByTagName("li");
console.log(lis); //HTMLCollection(5) [li, li, li, li, li]
lis.push('abc'); // 报错，lis.push is not a function
console.log(lis);

将 lis 集合（类数组）转成 数组：
lis = Array.from(lis);
console.log( lis ) // (5) [li, li, li, li, li]
lis.push('abc'); // 此时可成功 push
console.log(lis); // (6) [li, li, li, li, li, "abc"]

将对象转成 数组：
var obj = {
"0" : 10 ,
"1" : 20 ,
"2" : 30 ,
"length" : 3
};
var arr = Array.from( obj );
console.log( arr ); // [10, 20, 30]

第二个参数是一个匿名函数 实现的是 map 功能：
var newArr = Array.from( obj , (item) => { return item\*2; } )
console.log( newArr );

迭代器
let lis = document.querySelectorAll('li') // 元素集合 类数组对象
// console.log(lis); // NodeList(5) [li, li, li, li, li]
// console.log(lis[Symbol.iterator]); // ƒ values() { [native code] }
// console.log(lis[Symbol.iterator]().next()); // {value: li, done: false} done 表示是否迭代完

// 用一个变量来接收迭代器对象
let iterator = lis[Symbol.iterator]() //迭代器对象
console.log(iterator.next()); // {value: li, done: false}
console.log(iterator.next()); // {value: li, done: false}
console.log(iterator.next()); // {value: li, done: false}
console.log(iterator.next()); // {value: li, done: false}
console.log(iterator.next()); // {value: li, done: false}
console.log(iterator.next()); // {value: undefined, done: true} done 为 true 迭代完成

// 部署了迭代器的数据结构：数组、字符串、元素集合、Set、Map
// 访问一些属性会调用迭代器接口：Array.from()、（...）、for-of、Object.keys、Object.values

针对有顺序的数据内部会部署 iterator 接口，我们自己创建的对象是没有 iterator 接口

三个点（...）

扩展运算符用三个点号表示，其功能是把数组或类数组对象展开成一系列用逗号隔开的参数序列。
console.log(...[1, 2, 3]); // 1 2 3
console.log(1, ...[2, 3, 4], 5); // 1 2 3 4 5

var lis = document.getElementsByTagName("li");
console.log([...lis]);

其他用法：
var arr1 = [1,2];
var arr2 = [3,4,5];
function addItems(arr, ...items) { // rest 运算符
arr.push(...items); // 扩展运算符
};
addItems(arr1,...arr2); // 扩展运算符
console.log(arr1); // (5) [1, 2, 3, 4, 5]

arr.push(...items) 和 addItems(arr1,...arr2) 函数调用都使用了扩展运算符将数组变为参数序列
注意这行：function addItems(arr, ...items) 这里的三个点并不是扩展运算符，而是 rest 运算符

rest 运算符也是三个点，其功能与扩展运算符恰好相反，把逗号隔开的参数序列组合成一个数组

var arr = [1,2,3];
function fn(...args) {// rest 运算符 组合数组
console.log(args); // (3) [1, 2, 3] 在参数中就已经组合成一个数组了
};
fn(...arr);// 扩展运算符 展开数组
console.log(...arr); // 1 2 3 扩展运算符

Set 和 Map

ES6 提供了两种新的数据结构 Set 和 Map。

Set 是一个构造函数，用来生成 Set 数据结构，它类似于数组，但是成员的值都是唯一的、没有重复的， 初始化 Set 可以接受一个数组或类数组对象作为参数，也可以创建一个空的 Set：
var s1 = new Set();
var s2 = new Set([1, 2, 3]);
console.log(s1); // Set(0) {}
console.log(s2); // Set(3) {1, 2, 3}
// 数组去重
var s3 = new Set([12,4,6,24,12,4]);
console.log(s3); // Set(4) {12, 4, 6, 24}
一句话解决数组去重
console.log( [...new Set([12,4,6,24,12,4])] ); // (4) [12, 4, 6, 24]
console.log( Array.from(new Set([12,4,6,24,12,4])) ); // (4) [12, 4, 6, 24]

在 Set 中成员的值是唯一的，重复的值自动被过滤掉
var s1 = new Set([1, 2, 2, 3, 1, 4]);
console.log(s1); // Set(4) {1, 2, 3, 4}

Set 的一些属性方法：
size：返回成员总数
add(value)：添加某个值，返回 Set 结构本身
delete(value)：删除某个值，返回一个布尔值，表示删除是否成功
has(value)：返回一个布尔值，表示该值是否为 Set 的成员
clear()：清除所有成员，没有返回值

var set = new Set([1,2]);
set.add(3);// 添加成员
console.log(set.size);// 3 成员总数
console.log(set);// Set(3) {1, 2, 3}
set.add([4,5]);// 添加成员
console.log(set.size);// 4 成员总数
console.log(set.has(2));// true 有该成员
console.log(set);// Set(4) {1, 2, 3, [4, 5]}
set.delete(2);// 删除成员
console.log(set);// Set(3) {1, 3, [4, 5]}
console.log(set.has(2));// false 没有该成员
set.clear();// 清除所有成员
console.log(set);// Set(0) {}

得益于数据结构 Set 查找更快速高效，但也因为数据结构的内部数据是无序的，无法实现按下标改查，排序等操作
var arr = [1,2,3,'a',4,'b'];
var set = new Set(arr);
console.log(set[0]);// undefined
console.log(set['a']);// undefined

遍历 Set 对象
var set = new Set(['a','b','c','d']);
set.forEach((val,key,set)=>{
console.log('val: '+val);
console.log('key: '+key);
console.log(set);
});

Set 的 prototype 上有 forEach 方法
Array 的 prototype 上也有 forEach 方法

使用 ES6 的 for of 遍历（数组，类数组）
var set = new Set(['a','b','c','d']);
for (const val of set) {
console.log(val); // a b c d
}

Set 没有类似 getter 的方法，怎么取值呢？
可以用上面的遍历取值，或者可以把 Set 转成真正的数组！

for/of 与 for/in
for/of：遍历值 for of 可以遍历数组 类数组(包括字符串)
var arr = [4,5,6,7];
for (var val of arr) {
console.log(val);//4 5 6 7
}

for/in：遍历键
var arr = [4,5,6,7];
for (var key in arr) {
console.log(key);//0 1 2 3
}

var str = 'javascript';
for (var val of str) {
console.log(val); // j a v a s c r i p t
}

类数组对象不能使用数组的 pop 和 push 方法

Map 是一个构造函数，用来生成 Map 数据结构，它类似于对象，也是键值对的集合，但是“键”可以是非字符串， 初始化 Map 需要一个二维数组，或者直接初始化一个空的 Map：
var m1 = new Map();
var m2 = new Map([['a', 123], ['b', 456], [3, 'abc']]);
console.log(m1); // Map(0) {}
console.log(m2); // Map(3) {"a" => 123, "b" => 456, 3 => "abc"}

Map 的一些操作方法：
size: 值的个数
set(key, value)：设置键值对
get(key)：获取键对应的值
has(key)：是否存在某个键
delete(key)：删除某个键值对，返回一个布尔值，表示删除是否成功

var map = new Map([['a', 123], ['b', 456], [3, 'abc']]);
map.set('c',789);
console.log(map.get('c')); // 789
console.log(map.has('b')); // true 此 key 存在
map.delete(3); // true 成功删除 key
console.log(map); // Map(3) {"a" => 123, "b" => 456, "c" => 789}

遍历 Map 对象
var map = new Map([['a', 123], ['b', 456], [3, 'abc'],['c', 789]]);
map.forEach((val,key,obj)=>{
console.log('val: '+val);
console.log('key: '+key);
console.log(obj);
});

当然也可以使用 ES6 的 for of 遍历
var map = new Map([['a', 123], ['b', 456], [3, 'abc'],['c', 789]]);
console.log( map ); // Map(4) {"a" => 123, "b" => 456, 3 => "abc", "c" => 789}
for (const item of map) {
console.log( item ); //数组 // (2) ["a", 123] (2) ["b", 456] (2) [3, "abc"] (2) ["c", 789]
}
for (const [key,val] of map) {
console.log(key+' : '+val); // a : 123 b : 456 3 : abc c : 789
}

传统 Object 用字符串作键，Object 结构提供了“字符串 — 值”的对应
Map 结构提供了“值 — 值”的对应，是一种更完善的 Hash 结构实现
如果你需要“键值对”的数据结构，Map 比 Object 更快速 更高效 更合适。

Symbol 类型

ES5 的对象属性名都是字符串，这容易造成属性名的冲突。
ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值。
Symbol 是 JavaScript 语言的第七种数据类型。

在创建 symbol 类型数据时的参数只是作为标识使用，直接使用 Symbol() 也是可以的。

表示独一无二的值，作为变量标识的属性

let s = Symbol('xm');
console.log( s ); // Symbol(xm)
console.log( typeof s ); // symbol

对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。
var xm = Symbol();
var obj = {
[xm] : "小明" //对象的属性是 Symbol 类型
}
Symbol 类型的属性 取值是 必须 obj[xm] 不能用 obj.xm
console.log( obj[xm] );

var s4 = Symbol();
var obj = {
'name': 'xm',
[s4]: 'xh',
[Symbol('age')]: 18
}
console.log(obj); // {name: "xm", Symbol(): "xh", Symbol(age): 18}
console.log(obj.name); // xm
console.log(obj[s4]); // xh 访问对象的 Symbol 属性的值
console.log(obj[Symbol('age')]); // undefined 不同的 Symbol 对象都是独一无二的
console.log(obj1[Symbol()]);//访问不到 不同的 Symbol 对象都是独一无二的

修改 symbol 类型的属性
obj[xm] = "web 前端";
console.log( obj[xm] );

对象的 Symbol 属性不会被遍历出来（可以用来保护对象的某个属性）
var obj = {
"sname":"小明",
"skill" : "web"
}
var age = Symbol();
obj[age] = 18;
console.log( obj ); // {sname: "小明", skill: "web", Symbol(): 18}
for( var key in obj ){
console.log(key + " -> " + obj[key] ); // sname -> 小明 skill -> web
}

Object.getOwnPropertySymbols 方法会返回当前对象的所有 Symbol 属性，返回数组
let id = Symbol("id");
let obj = {
[id]: '007',
[Symbol(name)]: 'xiaocuo'
};
let arr = Object.getOwnPropertySymbols(obj);
console.log(arr); //[Symbol(id),Symbol(name)]
console.log(obj[arr[0]]); //'007' 访问对象的 Symbol 属性的值

虽然这样保证了 Symbol 的唯一性，但我们不排除希望能够多次使用同一个 symbol 值的情况。
let s1 = Symbol('name');
let s2 = Symbol('name');
console.log( s1 === s2 ); // false

官方提供了全局注册并登记的方法：
let name1 = Symbol.for('name'); //检测到未创建后新建
let name2 = Symbol.for('name'); //检测到已创建后返回
console.log(name1 === name2); // true

通过 symbol 对象获取到参数值：
let name1 = Symbol.for('name1');
let name2 = Symbol.for('name2');
console.log(Symbol.keyFor(name1)); // 'name1'
console.log(Symbol.keyFor(name2)); // 'name2'

// 每一个 Symbol 都是独一无二的
var s3 = Symbol('name');
var s4 = Symbol('name');
console.log(s3 === s4);//false
// 使用 .for 可以使用同一个 Symbol
var s5 = Symbol.for('name');
var s6 = Symbol.for('name');
console.log(s5); // Symbol(name)
console.log(s6); // Symbol(name)
console.log(s5 === s6);//true

Object 扩展
Object.getOwnPropertySymbols(obj)
方法会返回当前对象的所有 Symbol 属性，返回数组

Object.setPrototypeOf(obj1,obj2)
方法用来设置一个对象的 prototype 对象，与 Object.getPrototypeOf (获取对象的原型)方法配套

es5 实现原型链接
var obj1 = Object.create(obj2); // 创建一个空对象,并把该对象的原型链接到 obj2 对象

es6 实现原型链接
Object.setPrototypeOf(obj1,obj2); // 把对象 obj1 的原型链接到 obj2

Object. getOwnPropertyDescriptors(obj)
获取指定对象的所有自身属性的描述符，如果没有任何自身属性，则返回空对象。
var obj2 = {
name: 'xm',
age: 23
}
var attrObj1 = Object.getOwnPropertyDescriptor(obj2,'name'); // ES5 获取一个属性的描述符
var attrObj2 = Object. getOwnPropertyDescriptors(obj2); // 获取所有自身属性的描述符
console.log(attrObj1);
console.log(attrObj2);

Object.values(obj)
方法返回一个数组，成员是参数对象自身的所有可枚举属性的值（与 Object.keys(获取所有可枚举的键)配套）
var obj = { foo: 'abc', baz: 123 };
console.log(Object.values(obj));// ["abc", 123]

Object.entries(obj)
方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。

const obj = { foo: 'bar', baz: 42 };
Object.entries(obj); // [ ["foo", "bar"], ["baz", 42] ]

除了返回值不一样，该方法的行为与 Object.values 基本一致（不包括 Symbol 属性/值）
Object.entries 方法可以将对象转为真正的 Map 结构
const obj = { foo: 'bar', baz: 42 };
const map = new Map(Object.entries(obj));
console.log(map); // Map(2) {"foo" => "bar", "baz" => 42}

Object.assign(target,source)
对象合并 / 对象拷贝
方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
var obj1 = {a: 1, b: 2, c: {d: 4, e: 5}};
var obj2 = Object.assign({}, obj1); // 拷贝
console.log(obj1.c === obj2.c); // ture
Object.assign 方法是一种对象浅拷贝，如果对象属性是引用类型，只能是拷贝引用地址

对象深拷贝
var obj1 = {a: 1, b: 2, c: {d: 4, e: 5}};
var obj2 = JSON.parse(JSON.stringify(obj1)); // 先转为 json 字符串 再解析成 json 对象
console.log(obj1.c === obj2.c); // false

Object.is(val1,val2)
方法用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
不同之处只有两个：一是: +0 不等于-0，二是: NaN 等于自身。
其他情况和 === 一样+

undefined === undefined //true
null === null // true
强制类型转换，变为数字 0

+0 === -0 //true
NaN === NaN // false

{} === {} // false
Object.is({}, {}); // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true

ES6 类与继承

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念。
新的 class 写法让对象原型的写法更加清晰、更像面向对象编程的语法，也更加通俗易懂。
无需考虑 ES5 中令人头疼的几个部分：构造函数、原型、继承...

用 class 定义一个“类”，可以看到里面有一个 constructor 方法，这就是构造方法，而 this 关键字则代表实例对象。简单地说，constructor 内定义的方法和属性是实例对象自己的，而 constructor 外定义的方法和属性则是所有实例对象可以共享的。

class 之间可以通过 extends 关键字实现继承，这比 ES5 通过修改原型链实现继承，要清晰和方便很多。

super 关键字，它指向父类的实例（即父类的 this 对象）。子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错。这是因为子类没有自己的 this 对象，而是继承父类的 this 对象，然后对其进行加工。如果不调用 super 方法，子类就得不到 this 对象。(如果是子类，一定要使用 super，否则会报错的)

ES6 的继承机制，实质是先创造父类的实例对象 this（所以必须先调用 super 方法），然后再用子类的构造函数修改 this。

// es6 类与继承
class Cat {
mm = 789; // 原型上的属性
constructor(n,c){ // 构造器
this.name = n;
this.color = c;
this.trait = function () {
console.log('卖萌~');
}
};
skill(){ // 原型上的方法 实例方法
console.log('抓老鼠');
};
}
class Dog extends Cat { // 继承
constructor(n,c,f){
super(n,c); // 构造函数继承
this.food = f;
// console.log(super); // Uncaught SyntaxError: 'super' keyword unexpected here 不能直接访问
// console.log(super.food);//不能访问属性
// super.skill();//作为对象使用，可以访问函数，不能访问属性 抓老鼠
// super.skill();//super 当一个对象来使用时,只能访问方法(函数)
// console.log(super.abc);//不能访问属性 undefined
// console.log(this.abc);//123
// this.skill();//'抓老鼠'
// console.log(super);报错
};
}

var dog1 = new Dog('大黄','黑色','shi');
dog1.trait();
dog1.skill();
console.log( dog1.name );
console.log( dog1.color );
console.log( dog1.food );
console.log( dog1.mm );
console.log( dog1.constructor ); // Dog
