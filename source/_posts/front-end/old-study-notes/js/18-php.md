---
title: 18-php
tag: old-study-notes
catogory:
  - front-end
  - old-study-notes
---

PHP
php 不允许中文路径

相关知识

HTML：网页的结构
CSS：网页的样式
JavaScript：网页的行为

网站分为静态网站与动态网站
静态网站：我们之前使用 HTML+CSS+JavaScript 实现的就是静态的网站！它没有与数据进行交互！
动态网站：我们做的网页能够与服务端的数据进行交互(数据库)！HTML 网页不能与数据库进行交互！

服务器
服务器，也称伺服器，是提供计算服务的设备。
服务器的构成包括处理器、硬盘、内存、系统总线等，和通用的计算机架构类似，但是由于需要提供高可靠的服务，因此在处理能力、稳定性、可靠性、安全性、可扩展性、可管理性等方面要求较高。
在网络环境下，根据服务器提供的服务类型不同，分为文件服务器、数据库服务器、应用程序服务器、WEB 服务器等。
随着 PC 技术的日益提高，许多入门级服务器与 PC 机的配置差不多，所以也有部分人认为入门级服务器与“PC 服务器”等同。

一般来说专门的服务器都要 7X24 小时不间断地工作。

服务端语言需要运行在 web 服务器下。
如 PHP 运行在 apache 服务器下，java 运行在 tomcat 服务器下，C#运行在 IIS 服务器下...
服务端语言的优势：

1. 开发 web 动态网站
2. 操作硬盘文件
3. 操作数据库（mysql）
4. 给前端提供数据接口，实现前后端数据分离
   ......

要将自己的电脑作为 web 服务器，需要安装一些软件来提供 http 服务。
以前实现 web 动态网站需要独立安装 apache、mysql、php 三个软件，但是安装、配置起来比较繁琐。
所以有人将 apache、mysql、php 这三个软件集成到一起，这种软件我们称之为集成环境。

IP 地址与域名
IP 地址可以定位到网络上唯一的一台计算机，但 IP 地址很不方便记忆！
域名用于在数据传输时标识计算机的电子方位（有时也指地理位置）。
IP 地址与域名犹如一个人的身份证号与姓名。

DNS
DNS（Domain Name System，域名系统）用来将域名解析为对应的 IP 地址 ,DNS 服务器安装在网络运营商的机房里面！

HTTP 协议
HTTP: 超文本传输协议（英语：HyperText Transfer Protocol，缩写：HTTP）是用于从 WWW 服务器传输超文本到本地浏览器的传输协议。
HTTPS：超文本传输安全协议（英语：HyperText Transfer Protocol Secure，缩写：HTTPS ）是以安全为目标的 HTTP 通道，简单讲是 HTTP 的安全版。

通过 HTTP 或者 HTTPS 协议请求资源

URI，即 Uniform Resource Identifier，统一资源标识符，用来唯一的标识一个资源。
URL，即 Uniform Resource Locator，统一资源定位符（在浏览器的地址栏里的网站地址），它是一种具体的 URI。
// url 的组成部分:

http://image.baidu.com:80/search/detail?tn=baiduimage&wd=tupian#header

http: 超文本传输协议

image.baidu.com 域名(IP)

:80 端口号(默认端口可以省略)

/search/detail 资源目录（路径）
key = value & key = value & .....
tn=baiduimage & wd=tupian 发送到服务器的数据
// key = value & key = value......

#header 锚点

端口号
一台拥有 IP 地址的主机可以提供许多服务，比如 Web 服务、FTP(文件传输协议)服务、SMTP（邮件传输协议）服务等，这些服务完全可以通过 1 个 IP 地址来实现。
那么，主机是怎样区分不同的网络服务呢？
显然不能只靠 IP 地址，因为 IP 地址与网络服务的关系是一对多的关系。
实际上是通过 IP 地址+端口号来区分一台电脑上不同的服务。

http 协议默认是 80 端口
https 协议默认是 443 端口
apache 服务器默认端口是 80
mysql 服务器默认端口是 3306

浏览器与服务器

什么是 PHP？

PHP（英文:PHP: Hypertext Preprocessor，中文：“超文本预处理器”）；
PHP 是一种创建动态交互性站点的强有力的服务器端脚本语言；
PHP 是一种被广泛使用的开源脚本语言，可以免费使用；
PHP 文件的后缀是 ".php"；
PHP 文件能够包含文本、HTML、CSS 、JS 以及 PHP 代码（混编）；
PHP 代码在服务器上执行，而结果以纯文本返回浏览器。

PHP 基本语法

php 解决中文乱码格式声明:
1.php 中在头部 header 设置编码方式
header("Content-type:text/html;charset=utf-8");
2.php 中用 iconv 转码
echo iconv("GB2312","UTF-8",'中文内容'); 3.在 html 中用<meat>标签声明

<meta http-equiv="Content-Type" content="text/html; charset="utf-8" />

PHP 脚本以 <?php 开头，以 ?> 结尾

<?php
    // 此处是 PHP 代码
?>

PHP 中的注释

<?php
    // 这是单行注释

    # 这也是单行注释

    /*
    这是多行注释块
    它横跨了
    多行
    */
?>

PHP 输出语句
echo 一次可以输出多个值，多个值之间用逗号分隔
print 一次只能输出一个值，并始终返回 1
print_r() 函数用于打印变量，以更容易理解的形式展示
var_dump() 函数显示关于一个或多个表达式的结构信息，包括表达式的类型与值
die() 函数输出一条消息，并退出当前脚本
exit() 函数输出一条消息，并退出当前脚本

echo '<pre>'; // 格式化代码

设置响应头，防止乱码
header("Content-type:text/html;charset=utf8");

PHP 字符串
php 中字符串型可以用三种方法定义：单引号形式、双引号形式和 Heredoc 结构形式
当单引号中包含变量时，变量会被当做字符串输出。
当双引号中包含变量时，变量会被解析并与双引号中的内容拼接在一起。
PHP 中两个字符串拼接使用点号(.)连接起来。

<?php
    $a = 'hello';
    $b = 'abc $a';
    $c = "abc $a";
    echo $b; // abc $a
    echo $c; // abc hello
    echo 'abc  ' . $a; // abc hello
?>

使用 Heredoc 结构形式的方法来解决输出大量字符串的问题：
首先使用定界符表示字符串（<<<），接着在“<<<“之后提供一个标识符，
然后是要输出的字符串，最后以提供的这个标识符结束字符串。

结束的 str 标识符必须顶格写
PHP 中的大小写
PHP 中的变量名称对大小写敏感；
PHP 中的函数、类和关键词（例如 if、else、echo 等等）都对大小写不敏感。

PHP 变量
变量以 $ 符号开头，其后是变量的名称
变量名称必须以字母或下划线开头
变量名称不能以数字开头
变量名称只能包含字母数字字符和下划线（A-z、0-9 以及 \_）
变量名称对大小写敏感（$y 与 $Y 是两个不同的变量）

PHP 没有创建变量的关键字
变量会在首次为其赋值时被创建：

<?php
    $txt = "Hello world!";
    $x = 5;
    $y = 10.5;
?>

PHP 与 JavaScript 都是松散类型的脚本语言！

Local 和 Global 作用域

<?php
    $x=5; // 全局作用域
    function myTest() {
       $y=10; // 局部作用域
    在这加上 global $x; 就可以访问全局变量了
       echo "<p>在函数内部测试变量：</p>";
       echo "变量 x 是：$x"; //空
       echo "
";
       echo "变量 y 是：$y"; //输出10
    }
    myTest();
    echo "<p>在函数之外测试变量：</p>";
    echo "变量 x 是：$x"; //输出5
    echo "
";
    echo "变量 y 是：$y"; //空
?>

PHP 数据类型
在 PHP 中有八种数据类型：

- 四种标量类型
  布尔型（boolean）
  整型（integer）
  浮点型（float）
  字符串（string）

- 两种复合类型
  数组（Array）
  对象（Object）

- 两种特殊类型
  null  
  资源（Resource）

PHP 数组
php 中如果添加完了删除不会像 js 一样在前面补上，后面添加也是在上次添加的索引后面添加

数组是特殊的变量，它能够在单独的变量名中存储一个或多个值。
在 PHP 中，有三种数组类型：
索引数组 - 带有数字索引的数组
关联数组 - 带有指定键的数组
多维数组 - 包含一个或多个数组的数组

索引数组是指数组的键是整数，并且键的整数顺序是从 0 开始
有两种创建索引数组的方法：
自动分配索引（索引从 0 开始）
用 array()创建一个数组直接赋值，数组会默认建立从 0 开始的整数键
$arr1 = array('a','b','c','d');
print_r($arr1);

手动分配索引
用变量的名字后跟一个中括号的方式赋值，中括号内的键必须是整数
$arr2 = [];
$arr2[1] = 'a2';
$arr2[3] = 'b2';
$arr2[5] = 'c2';
$arr2[7] = 'd2';
print_r($arr2);

关联数组是使用您分配给数组指定键的数组，一般数组的键是字符串
创建关联数组有两种方式：
$arr3['one'] = '星期1';
$arr3['two'] = '星期 2';
$arr3['three'] = '星期3';
$arr3['four'] = '星期 4';
print_r($arr3);

$arr4 = array(
    'one'=>'星期11',
    'two'=>'星期22',
    'three'=>'星期33',
    'four'=>'星期44'
);
print_r($arr4);

$arrlength = count($arr); 函数用于返回数组的长度（元素个数）
遍历数组 foreach 循环可以将数组里的所有键/值都访问到
$arr5 = array(
    'one'=>'html',
    'two'=>'css',
    'three'=>'js',
    'four'=>'php',
    'five'=>'mysql'
);
foreach ($arr5 as $k => $v) {
    if ($v == 'php') {
echo "php 这个值对应的 key 是：".$k;
die();
}
}

PHP 超全局变量
超全局变量在 PHP 4.1.0 中引入，是在全部作用域中始终可用的内置变量。
PHP 中的许多预定义变量都是“超全局的”，这意味着它们在一个脚本的全部作用域中都可用。
如：$_GET、$\_POST、$_REQUEST、$GLOBALS、$_FILES、$\_COOKIE、$\_SESSION 等等。

$\_GET 变量是一个数组，内容是由 GET 方法发送的键值

$\_POST 变量是一个数组，内容是由 POST 方法发送的键值

form 用 get 方式提交，参数值会在 url 地址中，如：index.php?k1=v2&k2=v2
form 用 post 方式提交，参数值不会在 url 地址中

接收 get 参数： $\_GET['表单 name 名称']
接收 post 参数： $\_POST['表单 name 名称']

post 比 get 相对来说更安全，因为 post 传参不会暴露在 url 地址栏上面。

设置响应头，防止乱码
header("Content-type:text/html;charset=utf8");

关闭错误报告
error_reporting(0);

练习： 1.将练习项目放在服务器环境下，利用本机 ip 让其他同学访问该页面 2.编写并感受 php 代码 3.理解相关概念，如 服务器，数据交互等

mySQL 数据库

数据库：顾名思义，就是存储数据的仓库。

MySQL 是一种关联数据库管理系统，关联数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内，这样就增加了速度并提高了灵活性。
MySQL 是一个轻量级的数据库，与 PHP 配合使用效果非常好，MySQL 支持大部分 SQL 语句。

常见的数据库：oracle、mysql、sql server、MongoDB 等

安装 mysql
wamp 集成环境中已经自带 mysql。安装 wamp 时，已经安装上了 mysql 软件。

要想操作 mysql 中的数据，我们需要使用一种语言叫做 sql 来实现。
SQL（Structured Query Language） 是一种结构化查询语言，使用它可以对数据库中的数据进行增删改查。

编写 sql 语句
mysql 安装的时候默认自带客户端和服务端的，在 mysql 客户端中编写 sql 就可以操作数据库中的数据。
使用 mysql 客户端，需要在 cmd 中进入到 mysql 安装的 bin 目录中，执行以下命令：
mysql -u 用户名 -p 密码
敲回车就进入到了 mysql 模式的交互环境了，此时可以写 sql 语句进行数据库的操作。

设置中文(window 下)
set names utf8;
set character_set_database=utf8;
set character_set_server=utf8;
set character_set_client=gbk;
set character_set_connection=gbk;

show variables like "character%"; #查看数据库的默认编码格式

数据库操作相关 sql 语句
show databases; # 查看 mysql 有多少个数据库
create database 数据库名 charset utf8; # 创建数据库
drop database 数据库名； # 删除数据库
use 数据库名；# 选择操作哪个数据库

数据表操作相关 sql 语句
创建数据表(务必要先选择一个数据库)
create table 表名(字段名 类型,字段名 类型.....); #创建数据表 添加字段
create table user(id int primary key auto_increment not null,name char(30) not null default "小错",sex enum("男","女","未知") default "未知",age tinyint(5) not null default 1) charset utf8;

create table user(
id int primary key auto_increment not null,
name char(30) not null default "小错",
sex enum("男", "女", "未知") default "未知",
age tinyint(5) not null default 1
)charset utf8;

主键 primary key auto_increment
实际开发中每个表基本都会有一个主键，其作用是确保每条记录的唯一性，后面就是通过此主键值对表中的每条记录进行增删改查操作。
主键的值是自动增长的，设置 auto_increment 即可，该主键字段的值由 mysql 自动维护。
enum() 类型的只能是后面几种选项

show tables; #查看数据库中的数据表
desc 表名; #查看表结构
drop table 表名; #删除数据表

数据操作相关 sql 语句
添加 (insert into)
insert into user set name="小张",sex="女",age="21"; #向表中添加数据

删除 (delete)
delete from user where id=4; #删除 id=4 的数据

更新 (update)
update user set age="24" where id=1; #更新 user 表中 id=1 的 age 字段

查询（select）
select _ from user where sex='nv'; #查询表中 sex=nv 的内容
select _ from user where sex="男"; #查询所有 sex="男"的数据

通过 php 操作 mysql

通过 php 操作 mysql 的基本步骤：
连接 mysql ->选择数据库->编写 sql 语句->执行 sql 语句 获取结果

关闭警告报告
error_reporting(0); // 放前面

- 连接数据库
  $link = mysql_connect('主机名','用户名','密码')；

更新的 API:
$link = mysqli_connect('主机名','用户名','密码')；

$link = mysql_connect('', 'root', '') or die("Error-数据库连接失败！");
if($link){
echo "OK—数据库连接成功！";
}

\*设置编码
mysql_query("set names utf8");

- 选择数据库
  mysql_query（'use 数据库名'）

- 执行 sql 语句
  $result = mysql_query('sql 语句')

- 获取 select 查询语句的结果
  $result = mysql_query('select \* from users'); //返回结果集 资源类型 Resource

- 获取增删改查语句的结果
  $sql = "insert/update/delete....";
$result = mysql_query( $sql);
$num = mysql_affected_rows() ; // 函数返回前一次 MySQL 操作所影响的记录行数
  if($num > 0){
   echo '成功';
    $rows = [];
    // mysql_fetch_assoc 函数每次从结果集中取得一行作为关联数组， 如果没有则返回 false。
    while($row = mysql_fetch_assoc($result)){
        $rows[] = $row;
    }
    print_r($rows); // 二维数组
  echo json_encode($rows,JSON_UNESCAPED_UNICODE);//数组转 JSON 字符串 json_unescaped_unicode 常量 大写  
   exit();
  }else{
  echo '<p>查询失败，无记录！</p>'；
  exit();
  }

练习: 1.数据库增删改查
2.php 操作数据库

<?php
// 设置响应头 解决中文乱码问题
header("Content-type:text/html;charset=utf8");
error_reporting(0); // 放前面 关闭警告报告

$val = $_GET['val']; // 里面获取表单元素的 name

// 更新的 API
// $link = mysqli_connect('', 'root', '') or die('连接失败!');
$link = mysql_connect('', 'root', '') or die('连接失败!');

if ($link) {
    echo '连接成功';
}

echo '
';

// 设置编码
mysql_query('set names utf8');

// 选择数据库
mysql_query('use gp1');

// 执行 sql 语句

$sql = "select * from user where sex='{$val}'"; // 本身这里就有一个单引号

$result = mysql_query($sql); // 查询的结果集

// 判断返回的有没有数据
$num = mysql_affected_rows();

if ($num > 0) {
// echo "执行成功，受影响条数为 $num ";
    $rows = [];
    while($row = mysql_fetch_assoc($result)) {
        $rows[] = $row; // 相当于赋值一个二维数组
    }
    echo '<pre>';
    print_r($rows);
    // echo '
';
    echo json_encode($rows, JSON_UNESCAPED_UNICODE);
        // 把数组转成 json 字符串 返回

}else {
    echo '<p>暂无数据</p>';
}

echo '
';

var_dump($result); // resource 类型

?>
