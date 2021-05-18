---
title: 07-Date
tag: old-study-notes
catogory:
  - front-end
  - old-study-notes
---

```
Date 对象

Date对象及常见API
Date 对象用于处理日期与时间。

Date 对象自动使用当前系统的日期和时间作为其初始值。

创建Date对象：
var d = new Date();
console.log(d);
Tue Apr 30 2019 00:45:42 GMT+0800 (中国标准时间)

UTC国际标准时间又称世界时，以零经度线上的时间作为国际上统一采用的标准时间。
因为零经度线通过英国格林尼治天文台，所以国际标准时间也称为格林尼治时间GMT。
国际标准时间的起点：1970/01/01 00:00:00
北京时区的时间起点：1970/01/01 08:00:00
所以，北京时间 = 国际标准时间 + 8小时

获取：
getFullYear()------从 Date 对象以四位数字返回年份。
getMonth()---------从 Date 对象返回月份 (0 ~ 11)。
getDate()----------从 Date 对象返回一个月中的某一天 (1 ~ 31)。
getHours()---------返回 Date 对象的小时 (0 ~ 23)。
getMinutes()-------返回 Date 对象的分钟 (0 ~ 59)。
getSeconds()-------返回 Date 对象的秒数 (0 ~ 59)。
getMilliseconds()--返回 Date 对象的毫秒(0 ~ 999)。
getDay()-----------从 Date 对象返回一周中的某一天 (0 ~ 6)。
getTime()----------返回1970年1月1日至今的毫秒数。

返回一个'年月日 时分秒'的本地格式字符串:
d.toLocaleString(); // '2019/4/30 上午12:55:42'

返回一个'年月日'的本地格式字符串:
d.toLocaleDateString(); // '2019/4/30'

设置：
setFullYear()------设置 Date 对象中的年份（四位数字）。
setMonth()---------设置 Date 对象中月份 (0 ~ 11)。
setDate()----------设置 Date 对象中月的某一天 (1 ~ 31)。
setHours()---------设置 Date 对象中的小时 (0 ~ 23)。
setMinutes()-------设置 Date 对象中的分钟 (0 ~ 59)。
setSeconds()-------设置 Date 对象中的秒钟 (0 ~ 59)。
setMilliseconds()--设置 Date 对象中的毫秒 (0 ~ 999)。
setTime()----------设置 Date 对象(向1970/1/1添加毫秒数)。

创建指定时间点的Date对象：
var d1 = new Date(毫秒数); //从时间起点开始叠加的毫秒数
var d2 = new Date('yyyy/MM/dd HH:mm:ss');

返回当前时间与起始时间之间的毫秒数:
Date.now(); // 1556556512764

返回转换后的Date对象与起始时间之间的毫秒数:
Date.parse('2019/05/01 00:00:00'); // 1556640000000
// 创建特定时间的Date对象(倒计时)
// 1.实现倒计时效果（2019/10/01）
// 分析:
// day: (1000 * 60 * 60 * 24)
// hour: (1000 * 60 * 60)
// minutes: (1000 * 60)
// seconds: 1000

let timeBox = document.querySelector('.time')

// 方法一: 利用时间互补
setInterval(function (){
    var d1 = new Date();
    // var d2 = new Date(1565664153784);
    var d3 = new Date('2019/10/01 00:00:00')

    var timeD1 = d1.getTime();//1970/1/1到现在的总毫秒数
    var timeD3 = d3.getTime();//1970/1/1到2019/10/1的总毫秒数
    var allTime = timeD3 - timeD1;// 现在到国庆总的时间

    var days = parseInt( allTime/(1000 * 60 * 60 * 24) );//天数

    var hours = 23 - d1.getHours();// 小时

    var minutes = 59 - d1.getMinutes();// 分钟

    var seconds = 59 - d1.getSeconds();// 秒

    var millseconds = 999 - d1.getMilliseconds();// 毫秒

    document.querySelector('h1').innerHTML = '距离2019国庆还有' + days + '天' + hours + '小时' + minutes + '分' + seconds + '秒';

},1);
// 方法二：计算
setInterval(function () {
    let country = new Date('2019/10/01')
    let now = new Date()

    let count = country.getTime()
    let nowt = now.getTime()

    let diff = count - nowt

    let day = parseInt(diff / (1000 * 60 * 60 * 24))
    timeBox.innerText = '距国庆还有:' + day + '天' + hour + '时' + minutes + '时' + seconds + '秒' + milliseconds + '毫秒'
}, 1)

BOM

BOM的概念及作用

Browser Object Model -- BOM
  浏览器    对象    模型
BOM提供了独立于内容而与浏览器窗口进行交互的对象，核心对象是window

JavaScript语法的标准化组织是ECMA，DOM的标准化组织是W3C，BOM缺乏标准
BOM最初是Netscape浏览器标准的一部分

DOM是为了操作文档节点出现的API，document是其的一个对象

BOM是为了操作浏览器对象出现的API，window是其的一个对象

<!-- 原生对象（本地对象）：native object

ECMA所定义的对象
Number String boolean Object Array Function Date
RegExp 内置对象(如 Math Global不需要实例化) Error .....

宿主对象:host object（如 window BOM DOM ）
什么是宿主？
web的运行环境，操作系统 浏览器 -> 提供对象 -> 宿主对象 -->非 ECMA 定义的对象
window对象

window对象是浏览器中的Global对象

var newWindow = window.open(URL,name,specs);  返回一个新窗口
URL：打开页面的URL，没有指定URL将打开新的空白窗口
name：_blank  新窗口打开，默认
            _self  当前页面打开
      ......
specs：一个逗号分隔的项目列表。支持以下值：
            width=pixels    height=pixels  最小值为100
            left=pixels        top=pixels    ......
示例 window.open('','','width=200,height=200');

window.close() 方法用于关闭浏览器窗口(新打开的)；

调整窗口大小  window.resizeTo(width,height);
调整窗口大小 window.resizeBy(width,height);
注：此功能在一些标签型浏览器中无效。

window.screenLeft 属性返回窗口相对于屏幕的X坐标
window.screenTop 属性返回窗口相对于屏幕的Y坐标
window.screenX 属性返回窗口相对于屏幕的X坐标
window.screenY 属性返回窗口相对于屏幕的Y坐标

window.setInterval ( 函数/名称 , 毫秒数 )
表示每经过一定的毫秒后，执行一次相应的函数(重复)
window.setTimeout ( 函数/名称 , 毫秒数 )
表示经过一定的毫秒后，只执行一次相应的函数(不重复)
清除计时器：clearInterval( );      clearTimeout( );

当我们启用多个定时器的时候需要注意：开启之前先清除

提示框 alert (“ ”);
用户必须先关闭该消息框然后才能继续进行操作
确认框 confirm(“ ”);
confirm(“需要确认的内容”);
选择“确定”返回true        选择“取消”返回false
输入框 prompt(“ ”,“ ”);
prompt(“对话框的提示文本”,"默认的输入文本");
单击取消，则返回 null；单击确认，则返回输入的文本

history对象

history对象包含有关用户的访问历史记录

length 返回浏览器历史列表中的 URL 数量
forward() 加载 history 列表中的下一个 URL
back() 加载 history 列表中的上一个 URL
go() 加载 history 列表中的某个具体页面
history.go(-1)    后退一页
history.go(1)    前进一页

练习：
由页面a跳转到页面b，5秒后自动返回页面a，也可点击立即返回
<!-- a.html -->
<a href="b.html">去支付</a>
<!-- b.html -->
<h1>支付成功！</h1>
<p><span>5</span>秒后返回上一页<button>立即返回</button></p>

var btn = document.querySelector('button');
var span = document.querySelector('span');

btn.onclick = function (){
     history.back();
}

var n = 5;
setInterval(function (){
    n--;
    span.innerText = n;
    if (n <= 0) {
       history.go(-1);
    }
},1000);
location对象

location对象包含有关当前页面的URL信息

host 属性设置或返回主机名和当前 URL 的端口号
port 属性设置或返回当前 URL 的端口号
href 属性设置或返回完整的 URL    ……
assign() 方法加载新的文档
reload() 方法重新加载当前文档
replace() 方法用新的文档替换当前文档

navigator对象

navigator对象用于提供与用户浏览器相关的信息

appCodeName 属性返回浏览器的代码名
appName 属性返回浏览器的名称
cookieEnabled 属性返回指明浏览器中是否启用cookie的布尔值
platform 属性返回运行浏览器的操作系统平台

appVersion 属性返回浏览器的平台和版本信息(用户浏览器信息 火狐不能正常用)
userAgent 属性返回用户浏览器发送服务器的user-agent头部的值

识别浏览器
var str1=window.navigator.userAgent;
var str2=window.navigator.appVersion;
结合indexOf( )和toLowerCase( )方法可识别用户浏览器

//获取用户浏览器识别码并转成小写
var userAgent = navigator.userAgent.toLowerCase();
if (userAgent.indexOf('chrome') != -1) {
    alert('是谷歌浏览器');
} else if (userAgent.indexOf('firefox') != -1){
    alert('是火狐浏览器');
} else if (userAgent.indexOf('rv:11.0') != -1){
    alert('是Edge(11)浏览器');
} else if (userAgent.indexOf('msie 10') != -1){
    alert('是IE10浏览器');
} else if (userAgent.indexOf('msie 9') != -1){
    alert('是IE9浏览器');
}
screen对象

screen对象包含有关客户端显示屏幕的信息

width 属性返回显示器屏幕的宽度
height 属性返回显示器屏幕的高度
availHeight 属性返回显示屏幕的高度 (除 Windows 任务栏之外)
availWidth 属性返回显示屏幕的宽度 (除 Windows 任务栏之外)

tab 切换案例关键代码

var aH3 = document.querySelectorAll('.header h3');
var aBox = document.querySelectorAll('.box');

// 方式一
aH3[0].onclick = function (){
    aH3[0].className = 'active';
    aH3[1].className = '';
    aH3[2].className = '';
    aH3[3].className = '';
    aBox[0].className = 'box show';
    aBox[1].className = 'box';
    aBox[2].className = 'box';
    aBox[3].className = 'box';
}
// 方式二
function clearClass(){
    aH3[0].className = '';
    aH3[1].className = '';
    aH3[2].className = '';
    aH3[3].className = '';
    aBox[0].className = 'box';
    aBox[1].className = 'box';
    aBox[2].className = 'box';
    aBox[3].className = 'box';
}
aH3[0].onclick = function (){
    clearClass();
    aH3[0].className = 'active';
    aBox[0].className = 'box show';
}
// 方式三
function clearClass(){
    for (var i = 0; i < aH3.length; i++){
        aH3[i].className = '';
        aBox[i].className = 'box';
    }
}

for (var i = 0; i < aH3.length; i++){
    aH3[i].onclick = function (){
        clearClass();
        for (var v = 0; v < aH3.length; v++){
            if (this == aH3[v]) {
                aH3[v].className = 'active';
                aBox[v].className = 'box show';
            }
        }
    }
}
// 方式四
for (var i = 0; i < aH3.length; i++){
    aH3[i].onclick = function (){
        for (var v = 0; v < aH3.length; v++){
            aH3[v].className = '';
            aBox[v].className = 'box';
            if (this == aH3[v]) {
                aH3[v].className = 'active';
                aBox[v].className = 'box show';
            }
        }
    }
}
// 方式五
var prevIndex = 0;//记录上次选中的下标

for (var i = 0; i < aH3.length; i++){
    aH3[i].index = i;//给元素添加一个属性index,记录它的下标
    aH3[i].onclick = function (){
        aH3[prevIndex].className = '';
        aBox[prevIndex].className = 'box';
        aH3[this.index].className = 'active';
        aBox[this.index].className = 'box show';
        prevIndex = this.index;//更新上一次的下标
    }
}
// 方式六 利用一个循环调用函数 将 i 值传进去 */
var prevIndex = 0;//记录上次选中的下标

function tab(n){
    aH3[n].onclick = function (){
        aH3[prevIndex].className = '';
        aBox[prevIndex].className = 'box';
        aH3[n].className = 'active';
        aBox[n].className = 'box show';
        prevIndex = n;//更新上一次的下标
    }
}
for (var i = 0; i < aH3.length; i++){
    tab(i);
}



// 判断是否在某一时间段
// 参数形式: '13:34'
// 首先判断传入的格式是否正确
// 获得毫秒数相减，判断是否在某一区间
// 抢购中: 1
// 即将开始: 2
// 活动已结束: 3
// 活动未开始: 4
function timeRange(beginTime, endTime, nowTime) {
let strb = beginTime.split(':');
let stre = endTime.split(':');
let strn = nowTime.split(':');

if (strb.length != 2 || stre.length != 2 || strn.length != 2) {
console.log('请传入正确的时间格式');
return false;
}

let b = new Date();
b.setHours(strb[0]);
b.setMinutes(strb[1]);

let e = new Date();
e.setHours(stre[0]);
e.setMinutes(stre[1]);

let n = new Date();
n.setHours(strn[0]);
n.setMinutes(strn[1]);

let nTime = n.getTime();
let bTime = b.getTime();
let eTime = e.getTime();
let halfTime = 30 * 60 * 1000;

console.log(bTime - nTime)
console.log(halfTime);

// 进行判断
if (nTime - bTime > 0 && nTime - eTime < 0) {
console.log('抢购中');
return 1;
}else if (0 < bTime - nTime && bTime - nTime < halfTime) {
console.log('即将开始');
return 2;
}else if (eTime - nTime < 0) {
console.log('活动已结束');
return 3;
}else {
console.log('活动未开始');
return 4;
}

}

```
