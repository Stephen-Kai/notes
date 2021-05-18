---
title: 01-JavaScript 概述
tag: old-study-notes
catogory:
  - front-end
  - old-study-notes
---

### 1.JavaScript 概述

> js 是单线程的，一个时间段只做一件事情

##### JavaScript 是什么？

> JavaScript 是一种直译式脚本语言，是一种动态类型、弱类型、基于原型的语言。
> 直译式：直接编译并执行，代码不进行预编译。
> 脚本：凡是不能独立执行需要依赖其他程序的，通常都叫做脚本。
>
> HTML 文件必须在浏览器里执行，JS 文件必须嵌入到 HTML 文件里才能执行。
> 脚本语言：依附于某个程序来运行，为某个程序提供服务的语言

![01-01](/assets/images/old-study-notes/01-01.jpg)

> 动态类型：声明一个变量，能够随时改变它的类型
> 静态类型：声明一个变量，不能改变它的类型
> 弱类型：允许变量类型的隐式转换，允许强制类型转换（编译时检查很弱）
> 强类型：变量对象在编译时确定类型，不允许类型的隐式转换（编译时检查严格）
> 基于原型：原型的主要作用是继承，对象之间的继承，主要是靠原型链接

##### JavaScript 能干什么？

> 网页前端三剑客（HTML，CSS，JavaScript）
> Html:负责一个页面的结构（结构层）
> Css:负责一个页面的样式（样式层）
> JavaScript：负责与用户交互，加强用户体验（行为层）
>
> 网页前端开发（Javascript 的老本行）
> 移动开发 webapp 混合式应用
> 网站后端开发（Node.js 可以让 js 在后端运行）
> 插件开发（由于 js 跨平台这一特性，很多插件使用 js 进行开发，因为一次开发可以保证跨平台使用）
> 桌面开发（主要是指 chrome 浏览器能把 js 写的程序打包成桌面应用）
> 游戏开发 等等。。。

##### js 在网页前端中的作用：

> 数据提交到服务器之前验证数据
> 给 HTML 网页增加动态功能
> 响应用户操作
> 加强用户体验

##### 特性：跨平台

![01-02](/assets/images/old-study-notes/01-02.jpg)

##### JavaScript 简史

> 90 年代 28.8kb/s
>
> 1995 Netscape2 加入 LiveScript，改名 JavaScript
>
> 微软 IE3 加入 JScript
>
> Nombas 推出 ScriptEase
>
> 1997 ECMA TC39 ECMA-262 标准 命名 ECMAScript
>
> JavaScript 兼容于 ECMA 标准，通常也称为 ECMAScript
>
> JavaScript 由三大部分组成：核心部分（ECMA-262）、DOM、BOM
>
> ECMAScript（简称 ES）版本名称了解：
> 1997 年 7 月，ECMAScript 1.0 发布。
> 1998 年 6 月，ECMAScript 2.0 版发布。
> 1999 年 12 月，ECMAScript 3.0 版发布，成为 JavaScript 的通行标准，得到了广泛支持。（ES3）
> 2008 年 7 月 ECMAScript 4.0 版本比较激进被废弃，替代方案将现有功能小幅度升级发布为 ECMAScript 3.1，之后改名为 ECMAScript 5，> 所以各类文章所说的 ECMAScript 3.1 等同于 ECMAScript 5（ES5）
> 2011 年 6 月，ECMAscript 5.1 版发布，到了 2012 年底，所有主要浏览器都支持 ECMAScript 5.1 版的全部功能。
> 在这之后，版本发布规则发生变化， 标准委员会决定，标准在每年的 6 月份正式发布一次，作为当年的正式版本。接下来的时间，就在这个版本的基础> 上做改动，直到下一年的 6 月份，草案就自然变成了新一年的版本，只要用年份标记就可以了。
> 2015 年 6 月发布了 ECMAScript 6.0 版本正式名称就是《ECMAScript 2015 标准》（简称 ES2015）-> ES6
> 2016 年 6 月小幅修订的《ECMAScript 2016 标准》如期发布（简称 ES2016）
> 2017（简称 ES2017）
> ......

##### JS 和 H5 的关系

> H5 是一种新的技术，就目前我们所知的 H5 都是一些标签，但是有了 JS 之后，这些标签深层的扩展功能才得以实现。
>
> 比如 video 标签，我们对其理解为一个简单的标签，但是实际上，video 标签还有更深层次的扩展功能。

### 2.JS 引入及运行

##### 引入方式

- 内部引入：在 html 文件中直接写在 script 标签内部

```js
//type属性可以省略
<script type="text/javascript">alert('hello world');</script>
```

- 标签内引入：直接写在标签内

```js
<button onclick="alert('hello world');">按钮</button>
```

- 外部引入：在 html 文件中通过 script 标签引入外部 js 文件

```js
<script src="test.js"></script>
```

##### 思考：？

```js
//不会执行，不能这么做
<script src="test.js">alert('hello world');</script>
```

##### 常用输出/调试方法

> alert( ) 浏览器弹窗，弹出的内容就是（）括号中的内容
>
> document.write( ) 向文档写入字符串、html 或 javascript 代码
>
> console.log( ) 在控制台打印相关信息
>
> 注意：调试代码应当从最终的产品代码中删除掉
>
> Uncaught SyntaxError: Unexpected identifier helloWorld.html:34
> 未捕获 语法错误 ：报文 报错位置

### 3.基本语法

> JavaScript 大量借鉴了 C 类语言的语法，但 JS 的语法更加宽松
>
> JavaScript 中的语句以一个分号 ; 结尾
>
> JavaScript 多条语句组合的代码块，以 { 开头，以 } 结尾
>
> JavaScript 中的一切都区分大小写 (如 变量名、函数名等)
>
> 养成良好的代码注释习惯，既方便自己也方便他人!!
>
> 标识符指变量、函数、属性或函数的参数的名字。

```
单行注释：
// 注释内容不可以换行

块级/多行注释：
/* 注释内容
可以换行
注释代码块 */

说明文档注释：
/**
*    文档说明的注释
*    用在插件或方法开头
*    说明参数及返回值等
*/
```

##### JavaScript 关键字

> 关键字可用于表示控制语句的开始或结束，或用于执行特定操作等。
> 按照规则，关键字也是语言保留的，不能用作标识符！
> break do try typeof
> case else new instanceof
> catch in return var
> continue for switch while
> function this with default
> if throw delete ......

##### JavaScript 保留字

> 保留字有可能在将来被用作关键字来使用，不能用作标识符！
> abstract int short boolean
> export interface static byte
> extends long super char
> final native class float
> throws const goto private
> double import public ......

### 4.变量的概念及使用

> 标识符命名规范
> 标识符指变量、函数、属性或函数的参数的名字
>
> 标识符命名规范： 1.第一个字符必须是字母、下划线 \_ 或美元符号 $ 2.其他字符可以是字母、下划线、美元符号或数字 3.不能含有空格 4.不能>以关键字或保留字命名 5.使用驼峰命名法（建议，非必须）
>
> 变量的概念及底层原理
> 变量是指没有固定的值，可以改变的数；是存储信息的容器。
>
> 优点：方便使用，统一修改。
>
> JS 的变量是松散类型的，可以用来保存任何类型的数据。
>
> JS 中使用关键字 var 来声明变量：
> 关键字 变量名 赋值 数据
> var userName = 'xiaocuo';
> 左值：在等号左侧，是变量名
> 右值：在等号右侧，是存进变量中的数据
> 引用变量名：document.write( userName );
>
> var 声明变量的底层原理：
> 从本质上看，变量代表了一段可操作的内存，也可以认为变量是内存的符号化表示。当我们使用关键字 var 声明一个变量的时候，解析器根据变量的数>据类型分配一定大小的内存空间。程序就可以通过变量名来访问对应的内存了。
>
> 错误类型：
> Uncaught ReferenceError: hello is not defined test.html:38
> 未捕获 引用错误 : 报文 报错位置
> Uncaught SyntaxError: Unexpected token var test.html:40
> 未捕获 语法错误 : 报文 报错位置

### 5.数据类型

> es6 之前是 6 种， es6 之后是 7 种
>
> 简单数据类型
> 简单数据类型：string、number、boolean、undefined、null
>
> string 类型，值为字符串
> JS 中使用双引号或单引号表示字符串
> var str1=‘123’;
> var str2=“abc”;
>
> number 类型，值为数字
> JS 中 number 类型包括整型、浮点型和非数值
> var num1 = 123;
> var num2 = 123.45;
> NaN 即非数值，是 number 类型中的一个特殊值
> NaN 用于表示本来要返回一个数值的操作数，结果未返回数值的情况（'a'-1） ('b'-3)
>
> 错误的计算结果：NaN (not a number) 非数字
> 当进行计算，希望返回一个数值，结果并不是我们想要的数字时，返回 NaN
>
> NaN 有两个特点：(Not a Number)
>
> 1.  任何涉及 NAN 的操作都会返回 NaN
> 2.  NaN 与任何值都不相等，包括它本身
>     isNaN() 判断值是否为 NaN，返回布尔值(底层进行了 Number() 转换)
>     parseInt() 解析一个字符串，并返回一个整数
>     parseFloat() 解析一个字符串，并返回一个浮点数
>     Number.toFixed(n) 方法可把 Number 四舍五入保留 n 位小数
>
> boolean 类型，值为布尔值
> boolean 类型有两个值 : true 和 false
>
> undefined 类型，表示值未定义
> undefined 类型只有一个特殊值为 : undefined
> var und;
> 声明变量未赋值，这个变量的值就是 undefined
>
> null 类型，表示空
> null 类型只有一个特殊值为 : null
> 如果变量准备在将来用于保存一个对象，那么该变量最好初始化为 null
>
> // isNaN(x)做了什么？
> // 1.隐式类型转换
>
> // Number 强制类型转换
> console.log( Number('123') );//123
> console.log( Number(456) );//456
> console.log( Number(true) );//1
> console.log( Number('123a') );//NaN
> console.log(Number('123'-1)) // 122
> console.log(Number('123a'-1)) // NaN
> console.log(Number('123'+1)) // 1231
> console.log(Number('123'+'1a')) // NaN
> console.log(Number(true - 1)) // 0
>
> console.log( isNaN('123') );//false
> console.log( isNaN(456) );//false
> console.log( isNaN(true) );//false
> console.log( isNaN('123a') );//true 是 NaN
>
> // 判断输入是否为：纯数字
> var value = '13520559717';
> if (isNaN(value)) {
> // 不是纯数字
> } else {
> // 是纯数字
> }

##### 复杂数据类型

> 复杂数据类型：object 类型
>
> object 类型，值为对象类型
> JS 中 { } 表示对象，[ ] 表示数组，function 表示函数
> var obj1=[1,2,3];
> var obj2={‘name’:‘laowang’};
> var obj3=function () { };
>
> var abc;
> console.log(typeof abc);//undefined
>
> abc = 123;
> console.log(typeof abc);//number
>
> abc = 'true';
> console.log(typeof abc);//string
>
> abc = true;
> console.log(typeof abc);//boolean
>
> abc = null;
> console.log(typeof abc);//object
>
> abc = [];
> console.log(typeof abc);//object
>
> abc = function (){};
> console.log(typeof abc);//function
> console.log(undefined == null);//true
> 所以准确来说，JavaScript 中的类型应该包括这些：
>
> - Number（数字）
> - String（字符串）
> - Boolean（布尔）
> - Symbol（符号）（ES2015 新增）
> - Object（对象）
> - Function（函数）
> - Array（数组）
> - Date（日期）
> - RegExp（正则表达式）
> - null（空）
> - undefined（未定义）
>
> typeof 运算符
> typeof 操作符返回一个用来表示数据类型的字符串。
>
> 使用 typeof 操作符将会返回下列六个字符串之一：
> “undefined”---值为定义
> “boolean”---值是布尔值
> “string”---值是字符串
> “number”---值是数值
> “object”---值是对象、数组或 null
> “function”---值是函数

### 6.逗号、赋值、算术、关系、逻辑运算符

> 逗号运算符
> 使用逗号运算符可以在一条语句中执行多个操作，如：
> var a = 1, b = 2, c = 3;
>
> 赋值运算符
> = += -= \*= /= %=
>
> JS 中的 '=' 号并非数学计算中的'='号，而是赋值运算符
> 如：a = 5，应该理解为，把 5 这个值，赋值给变量 a
>
> var a = 1;
> a += 5 --> a = a + 5;
> console.log(a);
>
> 算术运算符
> 加 减 乘 除 余
>
> - - - / %
>
> console.log(0/3);
> console.log(3/0);
>
> % 取余(求模)，5%3 即 5 对 3 取余 或 5 模 3
>
> 1.不考虑正负号，小的数值 对 大的数值取余，余未小的数值 2.余数的正负号，取决于运算符前面的数值的符号
>
> 5%3 == 2 9%3 == 0
>
> 2%7 == 2 7%4 == 3
> (-2)%7 == -2 (-7)%4 == -3
> 2%(-7) == 2 (7)%(-4) == 3
> (-2)%(-7) == -2 (-7)%(-4) == -3
>
> 递增和递减运算符
> ++ 和 --
> ++ 表示值递增加 1
> -- 表示值递减减 1
> var i = 0;
> ++i 表示先递增，后取值
> i++ 表示先取值，后递增
>
> 思考：
> var i = 4, v;
> v = i++;
> i = ++i;
> alert(v);
> alert(i);
>
> var k = 0;
> console.log(k++ + ++k + k \* 2 + k++);
> console.log(k);
>
> 关系运算符
>
> > < == === >= <= !=
> > 关系运算符返回布尔值
> > 等于 == 只比较值是否相等(忽略类型)
> > 全等 === 先比较类型，再比较值
>
> 表达式两侧都是数值 --> 正常比较
> 表达式两侧都是字符串 --> 正常比较，比较字符的 ASCII 码值，'0' -- 48，'A' -- 65，'a' -- 97
> 表达式两侧有一侧是纯数字字符串，该字符串自动转成数值，再进行比较
> 表达式两侧有一侧是非数字字符串，不能正常比较，所有非正常比较都返回 false
>
> 三元运算符(三目运算符)：
> 简单说，参与计算的数，有几个，就叫几元运算符
> Boolean ? express1 : express2;
> var str = 3 > 4 ? 'aaa' : 'bbb';
> document.write(str);
> 优点：代码少
> 缺点：不方便阅读和维护
>
> 逻辑运算符
> 逻辑运算符返回布尔值
> && 逻辑与，&&前后均为 true 才会返回 true
> || 逻辑或，||前后有一个为 true 就会返回 true
> ! 逻辑非，!求当前值的相反值
>
> var res1 = true && false;
> var res2 = false || true;
> var res3 = !true;
>
> 短路操作（非正常操作）
> var a = 2, b = 3;
> (a < b) && (a = 5);
> alert(a); // 5
>
> var a = 4, b = 3;
> (a < b) && (a = 5);
> alert(a); // 4
>
> var a = 2, b = 3;
> (a < b) || (a = 5);
> alert(a); // 2
>
> var a = 4, b = 3;
> (a < b) || (a = 5);
> alert(a); // 5

### 7.进制介绍

> 进制也就是进位计数制，是人为定义的带进位的计数方法。
>
> 十六进制是逢十六进一，十进制是逢十进一，八进制是逢八进一，二进制就是逢二进一 ...
>
> 在 javaScript 中进制之间的转换提供了两个非常好用的方法：toString()、parseInt()。
>
> 使用 toString() 方法把十进制转为其他进制：
> var x = 28;// 10 进制
> console.log(x.toString(2)); //把十进转为 2 进制  
> console.log(x.toString(8));//把十进转为 8 进制  
> console.log(x.toString(16));//把十进转为 16 进制
>
> 使用 parseInt() 方法把其他进制转为十进制：
> var x = "110";//二进制的字符串
> console.log(parseInt(x, 2));//把这个字符串当做二进制，转为十进制
>
> var x = "070";//八进制的字符串
> console.log(parseInt(x, 8));//把这个字符串当做八进制，转为十进制
>
> var x = "0x1c";//十六进制的字符串
> console.log(parseInt(x, 16));//把这个字符串当做十六进制，转为十进制
>
> parseInt() 方法，第一个参数为要转换的字符串，第二个参数指定字符串的进制，默认为十进制
>
> 其他进制的相互转换，先使用 parseInt 变为十进制， 在利用 toString 变为其他进制。
>
> 在 javaScript 中，八进制以 0 开头，十六进制以 0x 开头，可省略。
>
> js 对小数 计算有缺陷
>
> // 浮点数
> // var float = 0.1 + 0.2;
> // console.log(float);//0.30000000000000004
>
> // var float2 = 0.1 + 0.7;
> // console.log(float2);//0.7999999999999999
>
> // 进制：缝进制加一，原位归零
> // 10 机制：1 2 3 4 5 6 7 8 9 10
> // 2 进制：1 10 11 100 101 110 111.。。。
> // 8 进制：1 2 3 4 5 6 7 10
> // 16 进制：1 2 3 4 5 6 7 8 9 a b c d e f 10
>
> // 密码学：64 进制，128 进制。。。。
>
> // 十进制 0.1 转成 2 进制：小数位 * 2，取乘积的整数部分，小数继续 *2
> // 0.1\*2 = 0.2 ---- 0
>
> // 0.2*2 = 0.4 ---- 0
> // 0.4*2 = 0.8 ---- 0
> // 0.8*2 = 1.6 ---- 1
> // 0.6*2 = 1.2 ---- 1
>
> // 0.2*2 = 0.4 ---- 0
> // 0.4*2 = 0.8 ---- 0
> // 0.8*2 = 1.6 ---- 1
> // 0.6*2 = 1.2 ---- 1
>
> // 0.2*2 = 0.4 ---- 0
> // 0.4*2 = 0.8 ---- 0
> // 0.8*2 = 1.6 ---- 1
> // 0.6*2 = 1.2 ---- 1
>
> // 0.2*2 = 0.4 ---- 0
> // 0.4*2 = 0.8 ---- 0
> // 0.8*2 = 1.6 ---- 1
> // 0.6*2 = 1.2 ---- 1
> // .....
> // 0.1 => 0.0 0011 0011 0011 0011 0011 ....

### 8.运算符优先级

### 浮点数

> 进制：缝进制加一，原位归 0
> 为什么 0.1+0.2 不等于 0.3 ，这里涉及到了进制，小数十进制转二进制会出现循环，小数的计算，javascript 天生的缺陷
> 解决方案，如：先把小数相加后的结果乘以 100，再 parseInt 一下，再去除以 除，如果需要小数点，可以使用 number.toFixed(n)，需要多少>位小数 n 就是多少
> toFixed(n) 是四舍五入函数，里面的数字就是保留小数的位数
> typeof NaN // number 属于数值类型
> NaN 有两个特性：（Not a Number）
> 任何涉及 NaN 的操作，都会返回 NaN
> NaN 跟任何值都不相等，包括它本身
> NaN 的好处：防止报错，首先 js 是单线程，如果报错则下面的程序不能执行了
> 字符串拼接： 隐式类型转换
> Number 强制类型转换
> isNaN 判断是否为 NaN，底层首先会执行 Number ，再进行判断，所以可以使用 isNaN 来判断是否为纯数字
> 对于引用类型的值，先比较的是内存地址，如 console.log({}==={}) 结果为 false
> 两个字符串进行比较的时候，先比较第一个字符的 ASCII 码值，0 是 48，如： console.log('10'>= '19') // false
> 短路操作
> 短路与&& ， 短路或 ||，短路
> 进制
> toString() 十进制转其他进制
> parseInt() 其他进制转十进制，第二个参数为其他进制
> 所谓函数引用、对象引用、函数名其实都是内存中的一个地址，这个地址指向了某个函数或对象或方法，谁拿到了这个地址，谁就拥有了调用函数、调用>方法的权利，所以所谓传入函数作为参数，其实就是把这个地址传给了另外一个函数，让另外一个函数拥有操作这个函数的权利
> 去除重复元素（使用 filter()过滤器）
> r = arr.filter(function(element, index, self){
> return self.indexOf(element) === index;
> })
> 这里去除重复元素的方法依靠的是 indexOf 总是返回第一个元素的位置，后续返回的重复元素位置与 indexOf 返回的位置不相等，因此被 >filter 过滤掉了
> 图片格式:
> WebP 格式，谷歌（google）开发的一种旨在加快图片加载速度的图片格式。图片压缩体积大约只有 JPEG 的 2/3，并能节省大量的服务器带宽资源>和数据空间。Facebook Ebay 等知名网站已经开始测试并使用 WebP 格式。
> 但 WebP 是一种有损压缩。相较编码 JPEG 文件，编码同样质量的 WebP 文件需要占用更多的计算资源。
