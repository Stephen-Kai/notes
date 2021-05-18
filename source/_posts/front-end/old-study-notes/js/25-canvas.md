---
title: 25-canvas
tag: old-study-notes
catogory:
  - front-end
  - old-study-notes
---

canvas 画布

<canvas>标签：
<canvas id="myCanvas" width="200" height="200">< /canvas>
canvas 元素自身有两个属性：width 和 height
除此之外，canvas 还拥有所有主要的 HTML5 属性，比如说 class 和 id 等

IE 6 7 8 不支持 <canvas>标签

每个画布都必须要有一个 context（上下文）的定义，如下面代码所示：
var ctx = cvs.getContext("2d"); // 2d 的绘制环境

在标识画布并指明了它的上下文之后，就可以开始绘画了

Canvas 的坐标

假设 canvas 画布的大小为宽 100 像素，高 100 像素

绘制流程：
告诉大家我要开始绘画了
确定要绘制的起点
过程......
确定要绘制的终点
关闭绘制路径
确定画笔的样式
使用设置好的画笔描边或者填色

ctx.beginPath() ：开始一个路径
ctx.moveTo(x,y)： 路径移到画布中的指定点 , 即起点
ctx.lineTo(x,y) ：添加一个新点，画线
......
ctx.closePath() ：关闭绘制路径
ctx.fillStyle：用来设置填充颜色
ctx.fill() ：填充已定义好的路径 填充的时候会填充掉在路径里的线宽
ctx.lineWidth：画线的宽度 线宽一半在路径里面，一半在路径外面
ctx.strokeStyle：用来设置描边颜色
ctx.stroke() ：绘制已定义好的路径

绘制矩形的方法：
rect(x,y,w,h)
x、y 为起始坐标，w、h 为矩形的宽、高
支持这么写：
ctx.fillRect(x,y,w,h) 及 ctx.strokeRect(x,y,w,h)

绘制圆形的方法：
arc(x,y,r,sa,ea,true/false)
x、y 为圆心坐标，r 为半径，
sa、ea 分别为起始角度和结束角度，
true 是逆时针画圆，false 是顺时针画圆；
360 度为 2PI 弧度，1 度就是 2PI/360=PI/180 弧度，
90 度就是 2PI/360\*90=PI/2 弧度(其他的角度自行计算)

贝塞尔曲线
quadraticCurveTo (cx,cy,ex,ey)
二次贝塞尔曲线，一个控制点，一个结束点

bezierCurveTo (cx1,cy1,cx2,cy2,ex,ey)
三次贝塞尔曲线，两个控制点，一个结束点

绘制文字
fillText(text,x,y,maxWidth): 填充绘制
text 表示文字 x、y 为坐标
maxWidth 可选，为文字最大宽度，防止文字溢出

strokeText(text,x,y,maxWidth): 描边绘制
text 表示文字 x、y 为坐标
maxWidth 可选，为文字最大宽度，防止文字溢出

常用属性设置：
font 文本内容的当前字体属性
示例: ctx.font = 'bold 60px 微软雅黑';

textAlign 文本内容的当前对齐方式
示例: ctx.textAlign=“left/center/right”;

textBaseline 绘制文本时使用的当前文本基线
示例: ctx.textBaseline=“ top/middle/ bottom ”;

清除画布：
ctx.clearRect(x,y,width,height)
x : 清除起点横坐标
y : 清除起点纵坐标
width : 清除长度
height : 清除高度
示例：ctx.clearRect(0,0,cvs.width,cvs.height);

清除整个画布:
ctx.clearRect(0,0,cvs.width,cvs.height);//清除整个画布
清除局部区域:
ctx.clearRect(180,400,270,80);//清除局部区域

图形的阴影：
加在图形上而不是画布上
shadowColor：设置阴影颜色
shadowBlur：设置阴影模糊级别
shadowOffsetX：设置阴影在 x 轴上距离图形的距离
shadowOffsetY：设置阴影在 y 轴上距离图形的距离

图形的组合方式：
globalCompositeOperation 属性，控制图形的组合方式
这个属性归 getContext(‘2d’)所创建的对象所有

ctx.globalCompositeOperation="type";
type 的值：
：source-over (默认值) 后面的覆盖前面的
：source-in 保留重叠部分
：source-out 留下后面图形状，去掉重叠部分
：source-atop 留下前面图片形状，留下重叠的
：destination-over 前面的覆盖后面的
：destination-in
: destination-out
: destination-atop
：lighter
：xor
：copy

source-over：默认值，表示新图覆盖在旧图之上
source-atop：只绘制旧图和重叠的部分，其他透明
source-in：只绘制新图的重叠部分，其他透明
source-out：只绘制新图，重叠部分和旧图透明
destination-over：表示旧图覆盖在新图之上
destination-atop：只绘制新图和重叠的部分，其他透明
destination-in：只绘制旧图的重叠部分，其他透明
destination-out：只绘制旧图，重叠部分和新图透明

lighter：旧图与新图都绘制，重叠部分混色处理
xor：旧图和新图重叠处做透明处理
copy：只绘制新图形，不绘制旧图形

图像的处理:

绘制固定宽高的图像：
drawImage(img,x,y,w,h)
img：图片
x：图片横坐标的起始值
y：图片纵坐标的起始值
w：在画布中图片显示的宽度
h：在画布中图片显示的高度

剪切图像，在画布上定位被剪切部分：
drawImage(img,x,y,w,h,rx,ry,rw,rh)
img：图片
x、y：源图片的坐标
w、h：在源图片上裁剪的宽、高
rx、ry：显示在画布中的坐标
rw、rh：显示在画布中的宽、高

图像平铺：
createPattern(img,type)
img：图片
type：repeat 整个画布平铺
repeat-x/y 在 x/y 轴方向上平铺
no-repeat 不平铺

图像的裁剪：clip()

如果裁剪的区域是圆的话需要注意， 如果不在圆里而只是在圆相对应的正方形也是不会显示出来的
配合路径使用，先绘制好路径，然后调用 clip 方法
注意：一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）。

ctx.fillRect(50, 50, 300, 120) // 合在一起的无效

裁剪
ctx.beginPath();
ctx.rect(50,50,400,200);
ctx.fill();
ctx.closePath();

ctx.clip();//裁剪路径

ctx.beginPath();
ctx.fillStyle = 'blue';
ctx.fillRect(0,0,400,200);
ctx.closePath();

var cvs = document.querySelector('.cvs');//画纸
// var img = document.querySelector('.img');
var ctx = cvs.getContext('2d');//画笔

var img = new Image();
// img.src = '1.jpg';
img.src = '01.jpg';

img.onload = function (){
ctx.beginPath();

    // ctx.drawImage(this,100,100);
    // ctx.drawImage(this,100,100,200,200);
    // ctx.drawImage(this,62,114,70,70,100,100,210,210);

    var pat = ctx.createPattern(img,'repeat');
    ctx.fillStyle = pat;
    ctx.fillRect(0,0,cvs.width,cvs.height);

    ctx.closePath();

}

像素处理：
getImageData(x,y,w,h)：可以获取指定区域内的像素点的数据；
x:canvas 的 x 轴坐标 y:canvas 的 y 轴坐标
w:指定区域的宽度 h:指定区域的高度
putImageData(imgdata,x,y)：getImageData 返回的像素数据点 imgdata 填充到画布上面，从
x、y 点开始填充；
注: 服务器环境运行

图像输出：
canvas.toDataURL( type , args ):
为 canvas 的方法，用来返回一个 url 地址，将 canvas 画布转化为一张图像；
图像是基于 Base64 编码的 , 如果不指定两个参数，无参数调用该方法，转换的图像格式默认为 png 格式 。
•type:图像格式，image/png image/jpeg 等
•args:可选参数。如果 type 为 image/jpeg，则 args 可以是 0 和 1 之间的值，以指定图像的品质。
注: 服务器环境运行

使用场景: 比如说厘米秀里面，用户自己选择帽子，衣服，组装在一个,导出一张图片 day25

var cvs = document.querySelector('.cvs');//画纸
var ctx = cvs.getContext('2d');//画笔

var img = new Image();
img.src = '01.jpg';

img.onload = function (){
ctx.beginPath();
ctx.drawImage(this,100,100,200,200);

    var imgData = ctx.getImageData(100,100,200,200);
    // console.log(imgData);
    for (var i = 0; i < imgData.data.length; i+=4){
        imgData.data[i] = 255 - imgData.data[i];
        imgData.data[i+1] = 255 - imgData.data[i+1];
        imgData.data[i+2] = 255 - imgData.data[i+2];
        // imgData.data[i+3] = 255 - imgData.data[i];
    }
    ctx.putImageData(imgData,350,100);

    ctx.closePath();

}

img.onload = function (){
ctx.beginPath();
ctx.drawImage(img,0,0,200,200);
ctx.fillStyle = 'blue';
ctx.fillRect(200,0,200,100);

    ctx.fillStyle = 'green';
    ctx.fillRect(200,100,200,100);

    ctx.closePath();

    var url = cvs.toDataURL('image/png',1);
    console.log(url);

    var newImg = new Image();
    newImg.src = url;
    document.body.appendChild(newImg);

}

其他方法：
scale(w,h) 缩放当前绘图:
w: 缩放绘图的宽度 h: 缩放绘图的高度
rotate(angle) 旋转当前绘图 (弧度) ()
1° 等于 Math.PI/180 5°=5\*Math.PI/180
translate(x,y) 重新映射画布上的 (0,0) 位置(整个画布 translate)

save() 保存 canvas 的状态 可以保存之前的状态，后面改变后需要使用之前的状态时就 restore() 恢复
restore() 恢复 canvas 的状态
绘制复杂图形必不可少的方法，分别用来保存、恢复 canvas 的状态，无参数；
用到 save() 和 restore() 方法，大致就是旋转位移了原点等

img.onload = function (){
// ctx.save();//保存当前绘画的状态(画笔的颜色，宽度，原点位置等)
ctx.beginPath();
ctx.fillStyle = 'red';
// ctx.scale(2,2);
ctx.rotate(30\*Math.PI/180);
ctx.drawImage(img,0,0,200,200);

ctx.fillRect(300,0,200,200);

// ctx.translate(100,100);//原点移动到(100,100)位置
// ctx.fillStyle = 'pink';
// ctx.fillRect(50,50,400,200);

// ctx.restore();//恢复到之前保存的绘画状态

// ctx.fillRect(10,10,100,100);
}

canvas 交互
isPointInPath(x , y)
测试给定的坐标点是否位于当前路径之内  
 返回 true 或 false
x : canvas 的 x 轴坐标
y : canvas 的 y 轴坐标
示例：
if (ctx.isPointInPath(x , y)) { ... };

注: isPointInPath 方法只对当前路径有效

canvas 跟用户交互比较难，比如说鼠标经过 li 的时候改变 li 的颜色等，都不容易
而且 isPointInPath 方法必须在绘制过程中才能判断，如果画完了即 fill() / stroke() 之后就没有办法判断了

isPointInPath 指的是我们绘制的路径，而不是画布

画视频：ontimeupdate，视频在播放，就会触发这个事件

扇形

<canvas class="cvs" width="1200" height="550">亲，别再用古董浏览器了！</canvas>

<script>
var cvs = document.querySelector('.cvs');//画纸
var ctx = cvs.getContext('2d');//画笔
console.log(ctx);


ctx.beginPath();
ctx.arc(200,200,100,20*Math.PI/180,60*Math.PI/180);
ctx.lineTo(200,200);
ctx.closePath();
ctx.stroke();

CanvasRenderingContext2D.prototype.shan = function (x,y,r,start,end){
ctx.beginPath();
ctx.arc(x,y,r,start*Math.PI/180,end*Math.PI/180);
ctx.lineTo(x,y);
ctx.closePath();
return this;
}
ctx.fillStyle = 'red';
ctx.shan(200,200,100,60,120).fill();

ctx.fillStyle = 'blue';
ctx.shan(200,200,100,120,278).fill();

</script>

碰壁反弹

<canvas class="cvs" width="600" height="260">亲，别再用古董浏览器了！</canvas>
<button class="btn">清除</button>

<script>
var btn = document.querySelector('.btn');
var cvs = document.querySelector('.cvs');//画纸
var ctx = cvs.getContext('2d');//画笔

// ctx.beginPath();
// ctx.fillStyle = 'red';
// ctx.fillRect(0,0,50,50);
// ctx.closePath();
// ctx.clearRect(0,0,cvs.width,cvs.height);
// ctx.beginPath();
// ctx.fillStyle = 'red';
// ctx.fillRect(100,100,50,50);
// ctx.closePath();

var x = 0, y = 0, h = true, v = true;

setInterval(function (){
ctx.clearRect(0,0,cvs.width,cvs.height);
if (h) {//往右
x++;
if (x >= cvs.width - 50) {
h = false;
}
} else {
x--;
if (x <= 0) {
h = true;
}
}
if (v) {//往下
y++;
if (y >= cvs.height - 50) {
v = false;
}
} else {
y--;
if (y <= 0) {
v = true;
}
}
ctx.beginPath();
ctx.fillStyle = 'red';
ctx.fillRect(x,y,50,50);
ctx.closePath();

},10);

btn.onclick = function (){

// ctx.clearRect(0,0,cvs.width,cvs.height);//清除整个画布
ctx.clearRect(180,400,270,80);//清除局部区域

}


画视频

<video class="vid" src="1.mp4" controls width="600"></video>
<canvas class="cvs" width="600" height="330">亲，别再用古董浏览器了！</canvas>
<!-- <img class="img" src="1.jpg" alt=""> -->

<script>
var cvs = document.querySelector('.cvs');//画纸
var vid = document.querySelector('.vid');//画纸
// var img = document.querySelector('.img');
var ctx = cvs.getContext('2d');//画笔

vid.ontimeupdate = function (){
    ctx.beginPath();
    ctx.drawImage(vid,0,0,600,330);
    ctx.closePath();
}


</script>

画画板

<button class="style">2</button>
<button class="style">4</button>
<button class="style color">red</button>
<button class="style color">blue</button>
<canvas class="cvs" width="1200" height="550">亲，别再用古董浏览器了！</canvas>
<button class="btn">清除</button>

<script>
var btn = document.querySelector('.btn');
var style = document.querySelectorAll('.style');
var cvs = document.querySelector('.cvs');//画纸
var ctx = cvs.getContext('2d');//画笔
var w = 2, color = 'red';

cvs.onmousedown = function (e){
// 获取点击位置在画布中的坐标
var x = e.clientX - cvs.offsetLeft;
var y = e.clientY - cvs.offsetTop;
ctx.beginPath();
ctx.moveTo(x,y);
cvs.onmousemove = function (e){
// 移动之后的坐标
var x = e.clientX - cvs.offsetLeft;
var y = e.clientY - cvs.offsetTop;
ctx.lineTo(x,y);
ctx.lineWidth = w;
ctx.strokeStyle = color;
ctx.stroke();
}
cvs.onmouseup = function (){
cvs.onmousemove = null;
ctx.closePath();
}
}
btn.onclick = function (){
ctx.clearRect(0,0,cvs.width,cvs.height);
}

document.body.onclick = function (e){
if (e.target.className == 'style color') {
color = e.target.innerText;
}
if (e.target.className == 'style') {
w = e.target.innerText;
}
}

</script>

判断点是否在路径里面

<canvas class="cvs" width="1200" height="550">亲，别再用古董浏览器了！</canvas>

<script>
    var cvs = document.querySelector('.cvs');//画纸
    var ctx = cvs.getContext('2d');//画笔

    // ctx.fillStyle = 'blue';
    // ctx.fillRect(100,100,80,80);
    
    // ctx.fillStyle = 'blue';
    // ctx.fillRect(200,100,80,80);

    // ctx.fillStyle = 'blue';
    // ctx.fillRect(300,100,80,80);

function fn1(){
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.rect(100,100,80,80);
    ctx.closePath()
    // ctx.fill();
}
function fn2(){
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.rect(200,100,80,80);
    ctx.closePath()
    // ctx.fill();
}
function fn3(){
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.rect(300,100,80,80);
    ctx.closePath()
    // ctx.fill();
}
// fn1();
// fn2();
// fn3();
// ctx.fill();

var fnArr = [fn1,fn2,fn3];
    fnArr.forEach(function (item,index,arr){
    item();
    ctx.fill();
});

cvs.onclick = function (e){
    var x = e.clientX - cvs.offsetLeft;
    var y = e.clientY - cvs.offsetTop;
    var flag = false;//点不在路径里面
    fnArr.forEach(function (item,index,arr){
    item();
    if (ctx.isPointInPath(x,y)) {
        flag = true;
    }
});

if (flag) {
    fnArr.forEach(function (item,index,arr){
    item();
if (ctx.isPointInPath(x,y)) {
    // alert('在');
    console.log(123);
    ctx.fillStyle = 'red';
} else {
    // alert('不在');
    ctx.fillStyle = 'blue';
}
    ctx.fill();
    });
}
}



上传图片预览

<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Document</title>
<style>
.box{
width: 300px;
margin: 50px auto 0;
overflow: hidden;
}
.cvs{
border: 1px solid #999;
margin: 20px 0 20px 50px;
}
.btn{
float: left;
width: 100%;
height: 40px;
line-height: 40px;
text-align: center;
border-radius: 8px;
background-color: pink;
color: #fff;
position: relative;
}
.upload{
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 40px;
opacity: 0;
}
</style>
</head>
<body>

<div class="box">
<canvas class="cvs" width="200" height="200"></canvas>
<span class="btn">上传头像<input type="file" class="upload"></span>
</div>

<script>
var upload = document.querySelector('.upload');
var cvs = document.querySelector('.cvs');
var ctx = cvs.getContext('2d');

upload.onchange = function (){
// console.log(this.files);//上传文件列表 FileList {0: File, length: 1}
var file = this.files[0];//获取上传文件对象

// 判断上传文件是否为图片
if ( !(/image\/\w+/.test(file.type)) ) {
alert('上传文件必须为图片！');
return false;
}

var reader = new FileReader();// 读取文件的对象
// console.log(reader);
reader.readAsDataURL(file);//把文件转成url
reader.onload = function (){
// console.log(this.result);//读取到的图片路径 base64
var img = new Image();
img.src = this.result;
img.onload = function (){
ctx.beginPath();
ctx.drawImage(this,0,0,200,200);
ctx.closePath();
}
}
}

</script>

</body>
</html>

刮刮乐一

<style>
*{margin: 0; padding: 0;}
.box{
width: 400px;
height: 200px;
position: relative;
margin: 50px auto 0;
}
.txt{
text-align: center;
height: 200px;
line-height: 176px;
border: 12px dashed #000;
box-sizing: border-box;
display: none;
}
.cvs{
position: absolute;
left: 0;
top: 0;
}

</style>
</head>
<body>

<div class="box">
<h1 class="txt">谢谢惠顾</h1>
<canvas class="cvs" width="400" height="200"></canvas>
</div>

<script>
var box = document.querySelector('.box');
var txt = document.querySelector('.txt');
var cvs = document.querySelector('.cvs');
var ctx = cvs.getContext('2d');

var arr = ['谢谢惠顾','一等奖','谢谢惠顾','再来一瓶','二等奖','谢谢惠顾',
'谢谢惠顾','谢谢惠顾','三等奖','谢谢惠顾','三等奖','三等奖','谢谢惠顾',
'谢谢惠顾','再来一瓶','谢谢惠顾','谢谢惠顾','美女一枚','谢谢惠顾','二等奖',
'谢谢惠顾'];

var num = Math.floor(Math.random()*arr.length);
txt.innerText = arr[num];

var img = new Image();
img.src = 'ggl.png';
img.onload = function (){
ctx.beginPath();
ctx.drawImage(this,0,0,400,200);
ctx.closePath();

cvs.onmousedown = function (e){
txt.style.display = 'block';
e.preventDefault();
cvs.onmousemove = function (e){
ctx.globalCompositeOperation = 'destination-out';
var x = e.clientX - box.offsetLeft;
var y = e.clientY - box.offsetTop;
ctx.beginPath();
ctx.arc(x,y,10,0,2*Math.PI);
ctx.fill();
ctx.closePath();
}
cvs.onmouseup = function (){
cvs.onmousemove = null;
}
}
}

</script>
</body>

刮刮乐 2

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>刮刮乐</title>
<style>
* {
margin: 0;
padding: 0;
}
.wrap {
width: 400px;
height: 300px;
border: 1px solid pink;
margin: 50px auto 0;
position: relative;
cursor: pointer;
}
.tips {
font-size: 24px;
text-align: center;
line-height: 300px;
color: #444;
display: none;
}
.cvs {
position: absolute;
top: 0;
left: 0;
}
</style>
</head>
<body>
<div class="wrap">
<h1 class="tips">谢谢惠顾</h1>
<canvas class="cvs" width="400" height="300"></canvas>
</div>

<script>
// 中奖信息
let tipsArr = ['谢谢惠顾', '一等奖', '二等奖', '三等奖', '特等奖', '谢谢惠顾', '谢谢惠顾',
'谢谢惠顾', '谢谢惠顾','谢谢惠顾', '谢谢惠顾','谢谢惠顾', '谢谢惠顾','谢谢惠顾', '谢谢惠顾',
'谢谢惠顾', '谢谢惠顾', '谢谢惠顾', '谢谢惠顾', '谢谢惠顾', '谢谢惠顾']

let cvs = document.querySelector('.cvs')
let ctx = cvs.getContext('2d')
let wrap = document.querySelector('.wrap')
let tips = document.querySelector('.tips')

let num = Math.round(Math.random() * (tipsArr.length - 1))
tips.innerText = tipsArr[num]
let img = new Image()
img.src = '../imgs/bigPerson.jpg'
img.onload = function () {
ctx.beginPath()
ctx.drawImage(img, 0, 0, cvs.width, cvs.height)
ctx.closePath()
tips.style.display = 'block'
}

cvs.onmousedown = function (e) {
e.preventDefault()
let x = e.clientX - wrap.offsetLeft
let y = e.clientY - wrap.offsetTop

ctx.beginPath()
ctx.clearRect(x-10, y-10, 20, 20)
cvs.onmousemove = function (e) {
let x = e.clientX - wrap.offsetLeft
let y = e.clientY - wrap.offsetTop
ctx.clearRect(x-10, y-10, 20, 20)
}
cvs.onmouseup = function () {
cvs.onmousemove = null
ctx.closePath()
}
}

</script>
</body>
</html>

帧动画

<body>
<canvas class="cvs" width="500" height="300" style="border:1px solid #666;"></canvas>
<p>
<button direction="0">方向1</button>
<button direction="1">方向2</button>
<button direction="2">方向3</button>
<button direction="3">方向4</button>
<button direction="4">方向5</button>
<button direction="5">方向6</button>
<button direction="6">方向7</button>
<button direction="7">方向8</button>
</p>
<script>
var btns = document.querySelectorAll('button');
var cvs = document.querySelector('.cvs');
var ctx = cvs.getContext('2d');

var time = 20;//时间间隔 ms
var start = 0;//从第一张图开始
var direction = 0;//默认方向
var clipWH = 256;//裁剪图片的宽高

var img = new Image();
img.src = 'girl.png';
img.onload = function (){
setInterval(() => {
ctx.clearRect(0,0,cvs.width,cvs.height);//清屏
ctx.beginPath();
ctx.drawImage(this,start*clipWH,direction*clipWH,clipWH,clipWH,100,50,clipWH,clipWH);
start++;
if (start >= 8) {
start = 0;
}
ctx.closePath();
},time);
}

for(var i = 0; i < btns.length; i++){
btns[i].onclick = function (){
direction = this.getAttribute('direction');
}
}
</script>

</body>

时钟

<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Document</title>
<style>
.clock{
width: 420px;
height: 420px;
margin: 50px auto 0;
}
.cvs{
border: 1px solid pink;
border-radius: 50%;
}

</style>
</head>
<body>

<div class="clock">
<canvas class="cvs" width="420" height="420">古董浏览器不支持canvas标签！</canvas>
</div>

<script>
var cvs = document.querySelector('.cvs');
var ctx = cvs.getContext('2d');

function clock(){

// 画背景图
var img = new Image();
img.src = '1.jpg';
img.onload = function (){
ctx.clearRect(0,0,cvs.width,cvs.height);//清屏
ctx.drawImage(img,0,0,420,420);
// 画钟盘圆
ctx.beginPath();
ctx.arc(210,210,210,0,2*Math.PI);
ctx.strokeStyle = '#508DEE';
ctx.lineWidth = 16;
ctx.stroke();
ctx.closePath();

// 画分刻度 360/60 = 6
for(var i = 0; i < 60; i++){
ctx.save();
ctx.beginPath();
ctx.translate(210,210);
ctx.rotate(i*6*Math.PI/180);
ctx.moveTo(0,-192);
ctx.lineTo(0,-202);
ctx.lineWidth = 5;
ctx.strokeStyle = '#F6FC3A';
ctx.stroke();
ctx.closePath();
ctx.restore();
}

// 画时刻度 360/12 = 30
for(var i = 0; i < 12; i++){
ctx.save();
ctx.beginPath();
ctx.translate(210,210);
ctx.rotate(i*30*Math.PI/180);
ctx.moveTo(0,-187);
ctx.lineTo(0,-202);
ctx.lineWidth = 8;
ctx.strokeStyle = '#508DEE';
ctx.stroke();
ctx.closePath();
ctx.restore();
}

// 画数字时间
var d = new Date();
var hours = d.getHours();
var minutes = d.getMinutes();
hours = hours > 9 ? hours : '0' + hours;
minutes = minutes > 9 ? minutes : '0' + minutes;
ctx.beginPath();
ctx.fillStyle = '#D72F24';
ctx.font = '26px 微软雅黑';
ctx.fillText(hours + ':' + minutes,180,350);
ctx.closePath();

var h = d.getHours();
var m = d.getMinutes();
var s = d.getSeconds();
h = h + m/60;// 10.55
m = m + s/60;// 38.5

// 画时针
ctx.save();
ctx.beginPath();
ctx.translate(210,210);
ctx.rotate(h*30*Math.PI/180);
ctx.moveTo(0,14);
ctx.lineTo(0,-140);
ctx.lineWidth = 8;
ctx.strokeStyle = '#508DEE';
ctx.stroke();
ctx.closePath();
ctx.restore();

// 画分针
ctx.save();
ctx.beginPath();
ctx.translate(210,210);
ctx.rotate(m*6*Math.PI/180);
ctx.moveTo(0,14);
ctx.lineTo(0,-160);
ctx.lineWidth = 5;
ctx.strokeStyle = '#F6FC3A';
ctx.stroke();
ctx.closePath();
ctx.restore();

// 画秒针
ctx.save();
ctx.beginPath();
ctx.translate(210,210);
ctx.rotate(s*6*Math.PI/180);
ctx.moveTo(0,14);
ctx.lineTo(0,-180);
ctx.lineWidth = 3;
ctx.strokeStyle = '#D72F24';
ctx.stroke();
ctx.closePath();

// 秒针上的圆
ctx.beginPath();
ctx.arc(0,-165,5,0,2*Math.PI);
ctx.fillStyle = '#B6F350';
ctx.strokeStyle = '#D72F24';
ctx.lineWidth = 3;
ctx.fill();
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.arc(0,0,7,0,2*Math.PI);
ctx.fillStyle = '#B6F350';
ctx.strokeStyle = '#D72F24';
ctx.lineWidth = 3;
ctx.fill();
ctx.stroke();
ctx.closePath();

ctx.restore();

}

// ctx.globalCompositeOperation="destination-over";


}
clock();
setInterval(clock,1000);


</script>
</body>
</html>
