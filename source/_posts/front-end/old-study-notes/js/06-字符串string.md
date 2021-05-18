---
title: 06-字符串string
tag: old-study-notes
catogory:
  - front-end
  - old-study-notes
---

```
字符串 string
JavaScript的字符串就是用' '或" "括起来的字符。

字符串之间使用 + 号进行拼接。

创建字符串：
var str1 = 'abc';
var str2 = new String('abc');

两者都有 length 属性 也都可以通过索引打印出字符
字面量 和 构造函数 创建的字符串在使用上没有什么区别
一个是基本类型 string，一个是对象 object

length-属性返回字符串的长度(字符的个数)
str1.length; // 3

可以通过索引访问字符串中的某个字符：str1[0]、str1[1]

字符串常用API
API（Application Programming Interface,应用程序编程接口）是一些预先定义好的函数

toLowerCase() 方法将整个字符串转成小写字母

toUpperCase() 方法将整个字符串转成大写字母

indexOf() 方法返回字符串中子串第一处出现的索引值，没有匹配返回-1

lastIndexOf() 方法返回字符串中子串最后出现的索引值，没有匹配返回-1

slice() 方法从已有字符串中提取部分字符，返回新的字符串
var str = str1.slice(start,end);
slice()返回的子串包括start处的字符，但不包括end处字符

split() 方法把一个字符串分割成字符串数组，返回新数组
var str = str1.split('分割符',length);
第一个参数指定分割的符号，第二个参数可选，为返回数组的长度
eg:
var str5 = 'abc123def123';
console.log( str5.split() );//["abc123def123"]
console.log( str5.split('') );//["a", "b", "c", "1", "2", "3", "d", "e", "f", "1", "2", "3"]
console.log( str5.split('123') );//['abc','def','']

substr() 方法返回一个从指定位置开始的指定长度的子串
var str = str1.substr(start,length);
参数start必须，字符的起始位置，length参数可选，截取字符串的长度
eg: console.log( str5.substr(3,6) );//'123def' 截取六位

substring() 方法返回字符串中介于两个指定下标之间的子串
var str = str1.substring(start,end);
包含start处的字符，不包含end处的字符
eg: console.log( str5.substring(3,9) );//'123def' 按照下标

concat() 方法将两个或多个字符串组合起来，返回一个新的字符串(比较少用，因为可以使用 + 拼接)

charAt() 方法返回指定索引位置的字符 比较少用，因为可以直接下标
eg:
console.log( str7.charAt(4) );//'d'
console.log( str7[4] );//'d'

replace() 方法用于在字符串中用一些字符替换另一些字符，返回替换后的字符串(和谐敏感词)
var newStr = str.replace('abc','替换abc');
var newStr = str.replace('敏感字', function (str){ ... return '**'; })

charCodeAt() 方法返回指定索引处字符的ASCII编码值
eg: str7 第一个位置的 ascii 值 (编码)
console.log( str7.charCodeAt(0) );// ASCII 119 编码

String.fromCharCode(num1,num2,num3......) 方法根据指定的ASCII编码值来返回字符串 (解码)
var str = String.fromCharCode(65,66,67);// 'ABC'

编码字符集
编码字符集：（简称字符集，如ASCII、GBK、Unicode）
编码字符集，用一个编码值来表示一个字符在库表中的位置，这个值称为字符对应于编码字符集的序号。

ASCII码是一套编码规则，规定了常用符号用哪些二进制数来表示。

ASCII码占用一个字节，可以有0～255共256个取值。前128个为常用的字符如运算符，字母 ，数字等键盘上可以显示的，后 128个为特殊字符是键盘上找不到的字符。

ASCII编码主要针对的是英语，全世界有上百种语言，中国制定了GB2312编码，日本制定了Shift_JIS编码，韩国制定了Euc-kr编码...

各国有各国的标准，就会不可避免地出现冲突，结果就是，在多语言混合的文本中，显示出来会有乱码。

Unicode编码把所有语言都统一到一套编码里，这样就不会再有乱码问题了！

Unicode 编码是一个很大的集合，现在的规模可以容纳100多万个符号。
Unicode 编码开头的 128 个和 ASCII 编码一样。
编码字符集Unicode，有UTF-8、UTF-16、UTF-32等多种字符编码。

ASCII 编码表


基本包装类型
基本类型：Undefined，Null，Boolean，Number，String
基本包装类型：boolean,number,string

只有对象才会有属性和方法的，在需要的时候会被临时包装成一个对象
js 引擎会做这件事情，不用我们去执行 如下情况:
var str = 'hello'; //string 基本类型
var s2 = str.charAt(0); //为什么它能召唤出一个 charAt() 的方法？
//在执行到这一句的时候 后台会自动完成以下动作 ：
（
var _str = new String('hello'); // 1 找到对应的包装对象类型，然后通过包装对象创建出一个和基本类型值相同的对象
var s2 = _str.chaAt(0); // 2 然后这个对象就可以调用包装对象下的方法，并且返回结给s2.
_str = null;  //    3 之后这个临时创建的对象就被销毁了， _str =null;
）
alert(s2);//h
alert(str);//hello

基本包装类型：Boolean，Number，String


Math 对象

Math 对象用于执行数学任务。

Math是一个内置对象，不需要创建，可以直接使用。

Math对象常用API

Math.PI --------------返回圆周率3.1415926...
Math.ceil(x) ----------对数值x进行向上取整
Math.floor(x) --------对数值x进行向下取整
Math.round(x) -------对数值x进行四舍五入
Math.abs(x) ----------返回x的绝对值
Math.pow(x,y) --------返回x的y次方
Math.sqrt(x) ----------返回x的平方根
Math.min(a,b,c...) ----返回abc...中的最小值
Math.max(a,b,c...) ----返回abc...中的最大值
Math.random() --------返回介于[0,1)之间的随机数

注意：Math.random() 理论上能得到0，实际使用几乎不可能得到0

如何得到 0 ~ 1 的随机整数[0,1]？
var int = Math.round( Math.random() );

如何得到 0 ~ 5 的随机整数[0,5]？
var int = Math.round(Math.random()*5);

如何得到 5 ~ 10 的随机整数[5,10]？
var int = Math.round(Math.random()*(10-5))+5;

如何得到 8 ~ 24 的随机整数[8,24]？
var int = Math.round(Math.random()*(24-8))+8;

写一个函数 randomInt(min,max) 随机生成[min,max]区间的整数。

// 写一个函数 randomInt(min,max) 随机生成[min,max]区间的整数。
function randomInt(min,max){
    return Math.round(Math.random()*(max-min))+min;
    // return parseInt(Math.random() * (max - min + 1)) + min
}
for (var i = 0; i < 30; i++){
    console.log( randomInt(100,200) );
}


三角函数
Math.sin(x) ----- 返回x的正弦
Math.cos(x) ----- 返回x的余弦
... ...
x 是弧度
一个角，可以用度数来表示，也可以用弧度来表示
弧度更加符合计算机的计算模式
【60°=π / 3】，【90°=π / 2】，【180°=π】，【360°=2π】
弧度 = 角度 × π / 180

怎么应用到代码里面？
var angle = 60; //60度角
var radian = angle * Math.PI / 180; //计算出弧度




计时器
重复计时器 (重复执行)
    setInterval('要执行的函数','时间间隔');//单位毫秒 1秒=1000毫秒
    var timer1 = setInterval(function (){
        console.log(123);
    }, 1000);
    console.log(timer1);//1

延迟计时器(执行一次)
    setTimeout('要执行的函数','延迟执行的时间');
    var timer2 = setTimeout(function (){
        alert('老中医祖传秘方');
    },5000);
    console.log(timer2);//2
timer1, timer2 返回的是定时器的 id ，相当于是编号

引用类型
// 删除 delete
delete obj1.abc;
console.log(obj1.abc);//undefined

练习题(关键代码部分)

// 1.写一个函数 randomColor 生成随机的十六进制颜色值 #E1A2D7
// 16进制数: 0 1 2 3 4 5 6 7 8 9 a b c d e f

function randomColor(){
    var col = '#';
    var arr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];//0-15
    for (var i = 0; i < 6; i++){
        var num = Math.round(Math.random()*15);//0-15
        col += arr[num];
    }
    return col;
}
// console.log(randomColor());

var box = document.querySelector('.box');
for (var i = 0; i < 100; i++){
    box.innerHTML += '<span style="background:'+randomColor()+';"></span>';
}



// 2.和谐敏感词
var con = document.querySelector('#con');
var btn = document.querySelector('#btn');
var box = document.querySelector('#box');

// 第一种方法：
btn.onclick = function () {
    var content = con.value
    var reg = /马化腾/g
    var content1 = content.replace(reg, '哈哈')
    console.log(content1)
    box.innerText = content1
}

// 第二种方法：根据被和谐的字数显示多少个 *
btn.onclick = function (){

    var conTxt = con.value;

    var reg = /马化腾|麻花藤|马华疼|腾讯|藤训|疼训/g;// 敏感词库（正则）

    // conTxt = conTxt.replace(reg,'***');//固定替换
    conTxt = conTxt.replace(reg,function (str){
        var x = '';
        for (var i = 0; i < str.length; i++){
            x += '*';
        }
        return x;
    });//动态替换

    box.innerHTML = conTxt;
}


// 3.圆周运动
var ball = document.querySelector('.ball');

setInterval(move,30);
var r = 100,
angle = 0,
x = 195,
y = 195;
function move(){
    angle += 5;
    x = Math.cos(angle * Math.PI/180) * r + 195;
    y = Math.sin(angle * Math.PI/180) * r + 195;
    ball.style.left = x + 'px';
    ball.style.top = y + 'px';
}
// 4.曲线运动 在以上基础上再添加 span 的样式
var ball = document.querySelector('.ball');
var wrap=document.querySelector('.wrap');

setInterval(move,30);
var r = 100,
angle = 0,
x = 195,
y = 195;
function move(){
    angle += 5;
    // x = Math.cos(angle * Math.PI/180) * r + 195;
    x += 5;
    y = Math.sin(angle * Math.PI/180) * r + 195;
    ball.style.left = x + 'px';
    ball.style.top = y + 'px';

    // 添加的代码内容 如果添加在body 标签上原本的小球不动
    var spx=x+'px';
    var spy=y+'px';
    wrap.innerHTML+='<span style="left:'+spx+';top:'+spy+';">';
}


// 5.基本包装类型: string number boolean
// 在需要的时候会被临时包装成一个对象
console.log( str1.length );
console.log( str1.toLowerCase() );

var str4 = 'Hello';//string
var res = str4.toLowerCase();
console.log( res );
// 当上面的代码执行的时候，系统自动完成以下工作：
// 1.找到对应的类，并创建这个类的一个对象（值相同）
var _str4 = new String('hello');
// 2.调用对象的方法
var res = _str4.toLowerCase();
// 3.销毁临时对象
_str4 = null;



// 6.统计字符串中每个字母的个数(利用对象中键值对)
var str = 'asdfljlasaAakjjjbbbSkljDDqwe';
function countLetter(str){
    str = str.toLowerCase();// 转成小写
    var res = {};//存储统计数据
    for (var i in str){
        var letter = str[i];//单个字母
        if (res[letter]) {//访问对象不存在的属性，返回undefined
            res[letter] = res[letter]+1;//如果有这个属性，值加一
        } else {
        res[letter] = 1;//如果没有该属性，添加属性并赋值
       }
    }
    return res;
}

var result = countLetter(str);
console.log( result );

for (var key in result){
    if (key == 'k') {
    console.log( result[key] );
    }
}
// 7.写一个函数 randomCode 生成6位随机验证码
function randomCode(){
    var arr = [1,1,1,1,1,1];//存储生成的随机字符
    for (var i in arr){
        // 48-122
        do{
            var ascii = Math.round(Math.random()*(122-48))+48;// 48-122
           } while(ascii>57&&ascii<65 || ascii>90&&ascii<97);
        arr[i] = String.fromCharCode(ascii);
    }
    return arr.join('');// 返回的字符串
}
console.log( randomCode() );

var box = document.querySelector('.box');
box.innerText = randomCode();

box.onclick = function (){
    box.innerText = randomCode();
}
// 随机验证码改造一：
function randomCode1 (n) {
    // 生成一个数组，用来存放
    let arr = []
    for (let i = 0; i < n; i ++) {
        arr.push(1)
    }
    // console.log(arr)
    for (let i in arr) {
        do {
            var num = Math.round(Math.random() * (122 - 48)) + 48
        }while((num > 57 && num < 65) || (num > 90 && num < 97))
        arr[i] = String.fromCharCode(num)
    }
    // console.log(arr)
    return arr.join('')
}
// 当点击的时候随机生成新的验证码
box.innerText = randomCode1(8)
box.onclick = function () {
    box.innerText = randomCode1(8)
}

// 随机验证码二：
// 生成的验证码位数随机 4 - 8 位
function randomCode2 () {
    var len = Math.round(Math.random() * (8 - 4)) + 4
    var arr = []
    for (let i = 0; i < len; i ++) {
        arr.push(1)
    }
    // console.log(arr)
    for(let i in arr) {
        do {
           var num = Math.round(Math.random() * (122 - 48)) + 48
          }while((num > 57 && num < 65) || (num > 90 && num < 97))
         arr[i] = String.fromCharCode(num)
    }
    return arr.join('')
}
// console.log(randomCode2())
box.innerText = randomCode2()
box.onclick = function () {
box.innerText = randomCode2()
}
// 4.表单验证（判断输入不能为空，验证账号密码手机号）
// 账号：只能包含数字、字母、下划线
// 密码：长度为6到18个字符
// 手机：必须为纯数字

<div class="register">
    账号：<input type="text" id="username">*

    密码：<input type="password" id="password">*

    手机：<input type="text" id="phonenum">*

    <button id="btn">注册</button>
</div>
<script>

var username = document.querySelector('#username');
var password = document.querySelector('#password');
var phonenum = document.querySelector('#phonenum');
var btn = document.querySelector('#btn');

btn.onclick = function (){
    var user = username.value;
    var pass = password.value;
    var phone = phonenum.value;

    // 判断是否为空
    if (user == '' || pass == '' || phone == '') {
        alert('输入内容不能为空！');
    return;
    }

    // 账号：只能包含数字、字母、下划线
    for (var i in user){
        var ascii = user[i].charCodeAt();//ASCII 编码
        // 数字：48-57 字母：97-122
        if (!(ascii>=48&&ascii<=57 || ascii>=97&&ascii<=122 || ascii>=65&&ascii<=90 || ascii==95)) {
            alert('账号只能输入数字、字母、下划线！');
        return;
        }
    }

    // 密码：长度为6到18个字符
    if (pass.length < 6 || pass.length > 18) {
        alert('密码长度必须是6到18个字符');
        return;
    }

    // 手机：必须为纯数字
    if (isNaN(phone)) {// isNaN() -> Number() -> NaN
        alert('请正确输入手机号！');
        return;
    }

    alert('成功提交！');
}

// 编写函数has(arr , 60) 判断数组中是否存在60这个元素，返回布尔类型
var arr1 = [3,14,'abc',77];
function has(arr,item) {
    for (var i = 0, len = arr.length; i < len; i++){
        if (arr[i] == item) {
            return true;
        }
    }
    return false;
}
// console.log( has(arr1,'abcd') );


// 编写函数norepeat(arr) 将数组的重复元素去掉，并返回新的数组
var arr2 = [12,4,12,7,34,2,4,12,76];
// var arr1 = [12,4,7,34,2,76];//得到这个数组
function norepeat(arr) {
    var newArr = [];
    for (var i = 0, len = arr.length; i < len; i++){
        if (!has(newArr,arr[i])) {
        // newArr.push(arr[i]);
        newArr[newArr.length] = arr[i];
        }
    }
    return newArr;
}
// console.log( norepeat(arr2) );//[12,4,7,34,2,76]


function norepeat2(arr) {
    arr.sort(function (a,b) {
        return a-b;
    });
    var newArr = [];
    for (var i = 0, len = arr.length; i < len; i++){
        if (arr[i] != arr[i+1]) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
console.log( norepeat2(arr2) );

// 动态渲染
// 动态渲染页面（高频次重复）
// 数组一般是用于数量比较大，对 key 又没什么要求的时候
// 对象一般不会过大
// json 严格格式：{"key": "value"}
// 一定要是严格模式，不然数据解析的时候可能会出错
// 前端： 其实就是 js 里的对象
// 后端： 后端发送给前端的"字符串"数据
/* 如果数据很大，对索引没什么要求的话，建议使用数组，
如果对属性有要求，数据较少，建议使用对象 */


// 6.密码强度验证
// 强：包含数字、字母、特殊字符中的三种字符
// 中：包含数字、字母、特殊字符中的两种字符
// 弱：包含数字、字母、特殊字符中的一种字符

let input = document.querySelector('.input')
let ruo = document.querySelector('.ruo')
let zhong = document.querySelector('.zhong')
let qiang = document.querySelector('.qiang')

input.onchange = function () {
    // 首先要清楚之前添加的样式
    ruo.style.backgroundColor = '#eee'
    zhong.style.backgroundColor = '#eee'
    qiang.style.backgroundColor = '#eee'
    let value = input.value
    let arr = []
    let newArr = []
    for (let i = 0, len = value.length; i < len; i ++) {
        let num = value.charCodeAt(i)
        // console.log(num)
        if (48 <= num && num <= 57) {
            arr.push('number')
        }else if (65 <= num && num <= 90 || 97 <= num && num <= 122) {
            arr.push('char')
        }else {
            arr.push('other')
        }
    }
// console.log(arr);
// 第一种方法: 如果使用 indexOf 返回值不为 -1 就存入新数组 最后判断新数组的长度来判断强中弱
// 第二种方法：使用数组去重，存入新数组中
// 第三种方法：新建一个对象，里面有三个属性，循环遍历判断类型，改变对象中的属性值，最后判断对象中属性值再判断强中弱
    if (arr.indexOf('number') != -1) {
        newArr.push('number')
    }
    if (arr.indexOf('char') != -1) {
        newArr.push('char')
    }
    if (arr.indexOf('other') != -1) {
        newArr.push('other')
    }
    // console.log(newArr.length)
    switch(newArr.length) {
        case 1: ruo.style.backgroundColor = 'red'
        break;
        case 2: zhong.style.backgroundColor = 'yellow'
        break;
        case 3: qiang.style.backgroundColor = 'green'
        break;
    }
}

```
