---
title: 05-对象Object
tag: old-study-notes
catogory:
  - front-end
  - old-study-notes
---

```
对象 Object

对象的概念及操作
对象是一组无序的键值对，是带有属性和方法的集合。

通俗讲，对象就是无序的数据集合。

属性是与对象相关的值，方法是能够在对象上执行的动作。

对象的作用：用于在单个变量中存储多个值。
...
创建对象的两种形式：
    1.对象字面量(把属性和方法都放在对象变量中 / 写一个空对象，然后动态地添加属性 和 方法)
    2.使用构造函数创建对象

创建对象：
var obj1 = { };
obj1.name = '小错';
obj1.age = 18;
obj1.sayHi = function (){
    alert('hi，大家好');
}
console.log( obj1.name );
obj1.sayHi( );

var obj2 = new Object();
obj2.name = '小错';
obj2.age = 18;
obj2.sayHi = function (){
    alert('hi，大家好');
}
console.log( obj2.name );
obj2.sayHi( );


对象字面量：(JSON对象格式)
var obj = { 键：值, 键：值 ...... }; 无序的
键：一般用双引号引起来（不用引号也可以）
值：可以是任意类型的数据
var obj = {
    name: '小错',
    age: 18,
    sayHi: function (){
        alert('hi，大家好');
    }
}

访问对象成员：
    1. 对象.属性   对象.方法()
    2. 对象[变量或字符串]
    3. 增删改查：删 delete 对象.属性
eg: 如下

遍历对象：
    for / in 循环
    for in 循环遍历下标，只会显示有内容的下标 key是字符串
    for (var key in obj){
        console.log( obj[key] );
    }
    for / of 循环



对象类型可以动态添加属性和方法！
简单类型不可以动态添加属性和方法！

var obj = {
    name: '小错',
    age: 15,
    sex: '女',
    sayHi: function () {
        console.log('hello, my name is ' + this.name + '年龄是' + obj.age + '岁')
    }
}

对象[变量]一般是用来访问一个不确定的属性
console.log(obj.name)
console.log(obj.sayHi())
obj.character = function () {
    console.log('我的性格特点')
}
console.log(obj.character())
var who = 'name'
console.log(obj['name']) // 访问用字符串 小错
console.log(obj[name]) // 不能这样 因为 name 更加特殊 是 window
自带的一个属性 会把 name 当变量 结果为undefined
console.log(obj[age]) // 报错 age is not defined
console.log(obj[who]) // 小错
obj['sayHi']() // hello, my name is 小错年龄是15岁
obj.sayHi() // hello, my name is 小错年龄是15岁
console.log(obj['na' + 'me']) // 小错
console.log(name) // 空的，不会报错，name不是关键字，是window下
自有的属性。
console.log(age) // 报错 age is not defined

// 遍历对象
for (var key in obj) {
    console.log(key) // name age sex sayHi
    console.log(obj[key]) // 会把每个 属性对应的值打印出来
}

// 函数也是一个对象，也可以有自己的属性和自己的方法 ，
// 还有数组，获取到的 dom 元素等 只要是对象，就可以添加自己的属性和方法
// 但是基本类型是不能动态添加属性和方法的，基本类型和对象类型的一个区别

var fn1 = function () {
}
fn1.type = 'function'
fn1.sayHi = function () {
    console.log('我是一个函数')
}
console.log(fn1.type) // function
fn1.sayHi() // 我是一个函数

var arr = ['哈', 123, 456]
arr.type = 'array'
arr.sayHi = function () {
    console.log('我是一个数组')
}
console.log(arr.type) //array
arr.sayHi() //我是一个数组

var str = new String('123')
str.age = 12
str.sayHi = function () {
    console.log('我是通过构造函数 new 的字符串')
}
console.log(str.age) // 12
str.sayHi() //我是通过构造函数 new 的字符串

// 下面还有一下基本类型的例子
var str1 = '123'
str1.age = 15
str1.sayHi = function () {
    console.log('我是一个字符串')
}
console.log(str1.age) // undefined
str1.sayHi() //Uncaught TypeError: str1.sayHi is not a function

var num1 = 2
num1.age = 19
num1.sayHi = function () {
    console.log('我是一个数字')
}
console.log(num1.age) // undefined
num1.sayHi() //报错 num1.sayHi is not a function



数组 Array

数组的概念及操作
数组，是有序的元素序列。

通俗讲，数组就是有序的数据集合。

数组的下标始终从 0 开始，尽量少直接使用下表去改变值，因为长度未必确定知道

数组的特性：当访问数组的值超出了数组的长度，数组会自动添加相应的长度，空缺的地方为 undefined，数组.length 返回数组的长度

数组属于对象类型。

数组的作用：用于在单个变量中存储多个值。

创建数组：
var arr1 = [ ];

var arr2 = new Array( );

var arr3 = new Array( size );

var arr4 = new Array( el1, el2, el3 ... );


基本操作：
var arr5 = ['a', 'b', 'c'];

访问数组元素：arr5[0]、arr5[1]、arr5[2]

中括号里的数字为数组的索引值，数组的索引总是从0开始！

设置数组元素：arr5[1] = 2;  arr5[4] = 5;

获取数组的长度(数组中元素的个数)：arr5.length


数组的操作方法：

push() 在数组的后面添加(单个或多个)新元素，返回数组新的长度

pop() 删除数组的最后一个元素，返回被删除的元素

unshift() 在数组的前面添加(单个或多个)新元素，返回数组新的长度

shift() 删除数组的第一个元素，返回被删除的元素

splice() 可以对数组进行增、删、改，返回一个数组(被删除的元素)
删除n项：arr.splice(起始位置,n)
增加元素：arr.splice(起始位置,0,添加1,添加2......)
修改元素：arr.splice(起始位置,2,替换1,替换2)

sort() 将数组进行排序，返回数组
arr.sort(); //默认按照字符编码排序

reverse() 将数组进行倒转，返回倒转过后的数组
arr.reverse();

以上方法都会改变原数组！

slice() 从数组中拷贝一部分，开始下标和结束下标(省略即为拷贝后面所有)，返回新数组
arr.slice(1,4) 包含索引为1的元素，不包含索引为4的元素(拷贝索引为 1 2 3 的元素)

concat() 用于合并数组，返回新数组，参数为数组，谁调用谁的顺序就在前面
arr.concat(arr1,arr2......)

toString() 将数组转成字符串，返回字符串(除了 undefined null 其他基本都可以使用，继承至 object )

join() 将数组转成字符串，参数为分隔符，返回字符串

以上方法都不会改变原数组！


清空数组：
    1. arr = [];(创建了一个新的数组，重新赋值给变量 arr)
    2. arr.length = 0; (效率比上面的高，建议使用)


数组的遍历：

for 循环

for/in 循环
没有循环条件，自动取出下标，下标为字符串
一般用于遍历对象，不推荐数组使用
for in 循环遍历下标，只会显示有内容的下标


对象数组/二维数组

var arr1 = [
    {name: '小明', age: 17},
    {name: '小红', age: 18},
    {name: '小东', age: 19}
];

var arr2 = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

多维数组

// 对象数组
var gp1 = [
{name:'xw',age:18},
{name:'xh',age:18},
{name:'xq',age:18},
{name:'xj',age:18},
{name:'xk',age:18},
{name:'xc',age:18},
{name:'xv',age:18}
]

var gp2 = {
name:['xw','xh','xq','xj','xk','xc','xv'],
age:[12,24,15,16,17,18,19,21,22]
}

var gp3 = [123,'abc',function (){alert('yyyyy')},{}];
gp3[2]();

// 多维数组
var arr11 = [
'abc',
123,
['a','b','c'],
{name:'xiaocuo',age:20,fs:['xh','xf'.]},
[1,2,['rr','tt']]
]
console.log( arr11[2][2] );//'c'
console.log( arr11[4][2][1] );//'tt'
console.log(arr11[3].fs[1]);//'xf'


数组排序

sort( [fn] ) 排序，返回数组

arr.sort(); //默认按照字符编码排序

arr.sort(function (a,b) { //升序，只能对数值排序
    return a-b;
});

arr.sort(function (a,b) { //降序，只能对数值排序
    return b-a;
});

自定义函数排序：
它只需要我们返回一个 大于0 小于0 等于0 的数字就好了
我们可以根据业务自己定义
arr.sort(function (a,b) {//升序
    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    return 0;
});

ASCII 码



选择排序：假设一个最小值，选出最小值，互换位置......
1.假设一个最小值以及最小值的下标
2.找出最小值以及最小值的下标
3.假设的最小值与找出的最小值换位
function selectSort(arr){
    for (var n = 0; n < arr.length-1; n++){
        // 1.假设一个最小值以及最小值的下标：
        var min = arr[n];
        var minIndex = n;
        // 2.找出最小值以及最小值的下标：
        for (var i = n+1; i < arr.length; i++){
            if(min > arr[i]){
                min = arr[i];
                minIndex = i;
            }
        }
        // 3.假设的最小值与找出的最小值换位:
        var tmp = arr[n];
        arr[n] = min;
        arr[minIndex] = tmp;
    }
    return arr;
}

var arr5 = [1, 6, 8, 2, 5, 6,5, 9, 10]
console.log(arr5) // (9) [1, 6, 8, 2, 5, 6, 5, 9, 10]
function selectSortt (arr) {
    for (let i = 0, len = arr.length; i < len - 1; i ++) {
        for (let j = i + 1, len = arr.length; j < len; j ++) {
            // 应该是以下方式
            if (arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]]
            }
        }
    }
    return arr
}
selectSortt (arr5)
console.log(arr5) // (9) [1, 2, 5, 5, 6, 6, 8, 9, 10]


冒泡排序：相邻两个数进行比较，互换位置......
function bubbleSort(arr){
    for (var n = 0; n < arr.length-1; n++){ //比较轮数
        for (var i = 0; i < arr.length-(n+1); i++){ //每一轮比较次数
            if (arr[i] > arr[i+1]) {//前面的大于后面的：换位
                var tmp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = tmp;
            }
        }
    }
    return arr;
}

var arr2 = [3, 6, 1, 7, 2, 8, 4, 5]
console.log(arr2) // (8) [3, 6, 1, 7, 2, 8, 4, 5]
for (let i = 0, len = arr2.length; i < len - 1; i ++) {
    for (let j = 0, len = arr2.length; j < len - 1 - i; j ++) {
        if (arr2[j] > arr2[j + 1]) {
            [arr2[j], arr2[j + 1]] = [arr2[j + 1], arr2[j]]
        }
    }
}
console.log(arr2) // (8) [1, 2, 3, 4, 5, 6, 7, 8]

// 选择排序就相当于先选出一个位置，认为是最小值，跟后面的一个个比较
/* 冒泡排序就相当于冒泡，或者说沉底，相邻的进行比较，
把最小的冒泡出来，或者最大的沉底 */
桶排序：创建桶，把数据放到桶里(对应下标的位置)，遍历桶取出有数据的桶(的下标)......
桶排序效率最高，但是占的内存很大比如最大的数字如果是100的话，就需要有下标为100的，即需要101个桶
长度为最大值 + 1

function bucketSort(arr){
    var bucket = []; // 1. 创建桶
    for (var i = 0; i < arr.length; i++){
        // 2. 把数据放到桶里（对应下标位置）
        var item = arr[i];
        bucket[item] = 'abc';(只是作为一个标记，可以是其它内容)
    }
    arr.length = 0; // 3. 清空数组
    for (var index in bucket){    //4. for in 循环遍历下标，只会显示有内容的下标
        // 4. 遍历桶取出有数据的桶(的下标)
        arr.push(parseInt(index));// index => string
    }
    return arr;
}


快速排序：找中点，分左右，递归运算......
                有返回值，不是作用于原数组，而且返回的数组没有重复的值
function quickSort(arr){
    // 递归出口
    if (arr.length <= 1) return arr; // 终止条件一定要加，否则一直递归调用，栈溢出
    // 找中点(中点的位置的下标及值)
    var midIndex = parseInt( arr.length/2 );
    var mid = arr[midIndex];
    // 分左右
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++){
        if (arr[i] === mid) {
            continue; //跳过本次循环
        }
        if (arr[i] < mid) {//与中点比较分左右
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    // 递归运算(左中右三个数组合并)
    return quickSort(left).concat([mid],quickSort(right));
}


基本类型和引用类型

基本数据类型指的是简单的数据段，引用数据类型指的是有多个值构成的对象。(简单类型 复杂类型)

基本类型：number、string 、boolean、null和undefined

基本数据类型是保存在栈内存中的简单数据段，是按值访问的，可以直接操作保存在变量中的实际值。

var a = 10;
var b = a;
b = 20;
console.log(a);

变量b只是保存了变量a复制的一个副本，所以变量b的改变，对变量a没有影响。


引用类型：对象类型，如 Object 、Array 、Function 等等

引用数据类型是保存在堆内存中的对象。

在JavaScript中不可以直接操作堆内存中的对象，只能操作对象在栈内存中的引用地址。

var obj1 = {name: '老王', age: 28};
var obj2 = obj1;
obj2.name = '老赵';
console.log(obj1.name);
console.log(obj2.name);

var obj2 = obj1; 在栈内存中把堆内存对象的引用地址复制一份给obj2。

意味着 obj1和obj2 指向同一个堆内存对象。

obj2.name = '老赵'; 实际上改变的是堆内存对象。

所以，obj1.name和obj2.name 都是'老赵'。


 示例：函数的值传递和引用传递

console.log(undefined++ + ''); // NaN



根据对象内 属性 排序:
  var arr = [{ 'id': 12, 'name': 'xiaoz' }, { 'id': 3, 'name': 'xiaoco' }, { 'id': 4, 'name': 'xiaou' }];

        function compare(property) {
            return function (obj1, obj2) {
                var value1 = obj1[property];
                var value2 = obj2[property];
                return value1 - value2;     // 升序
            }
        }
        var sortObj = arr.sort(compare("id"));
        console.log(sortObj);



利用 apply 得到数组的最大值
let max = Math.max.apply(null, array)

深拷贝


判断是不是数组
```
