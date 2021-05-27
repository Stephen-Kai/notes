https://blog.csdn.net/weixin_44691775/article/details/117308374

# linux 极客时间基础篇

## 内核版本

网址: https://www.kernel.org/

## 发行版本

红帽, 稳定但要钱

红帽还出了一个免费但是不稳定的

使用 Centos，免费且稳定

## 安装虚拟机

VirtualBox

网址: https://www.virtualbox.org/wiki/Downloads

mac 系统选择 OS X hosts

点击会下载 VirtualBox 的 dmg 文件

点击打开, 根据提示来进行下载

## 安装 CenterOS

网址: https://www.centos.org/download/

国内镜像参考: https://zhuanlan.zhihu.com/p/273218413

安装: http://isoredirect.centos.org/centos/7/isos/x86_64/CentOS-7-x86_64-DVD-1810.iso

我的安装地址是: http://mirrors.aliyun.com/centos/7/isos/x86_64/

安装的是 CentOS-7-x86_64-DVD-2009.iso

## 新建虚拟机

点击新建，按照默认的设置一步步确定即可

## 加载下载的安装镜像

点击设置 -> 点击存储 -> 选择控制器(没有盘片) -> 点击右侧的分配光驱 -> 选择一个虚拟光驱文件(点击选择刚刚下载的 centos iso 文件) -> 左边的盘片发生变化，变成我们选择的虚拟光驱文件 -> 点击 ok

## 启动虚拟机

点击启动 -> 打开系统偏好设置(根据提示操作即可, 勾选 VirtualBox)

点击启动的时候遇到一个问题(其实是在安装的时候有一个系统偏好设置询问，当时我选择了拒绝):

Kernel driver not installed (rc=-1908) Make sure the kernel module

解决办法:

1. 打开系统偏好设置>安全性与隐私
2. 会有一行 Oracle 的权限授权，点击允许
3. 重启 mac
4. 虚拟机可以正常启动
5. 选择语言, 中文简体
6. 开全屏, 退出按 Ctrl + F, 菜单隐藏了, 显示按 Ctrl + home

## 启动虚拟机后

1. 点击分区, 安装默认的自动分区(一定要保证现有数据的安全), 点击安装
2. 软件选择 -> GNOME 桌面(图形桌面) -> 安装(我没有这一步)
3. 开始安装(下面进度条显示安装)
4. 设置 root 密码: xuan
5. 完成配置, 点击重启
6. 登录(root -> xuan)
7. 发现我没有安装图形桌面

## 如果安装了图形界面

1. 选择语言, 输入法, 时区
2. 设置用户(可以使用 root), 或者设置自己的, 那这样就有两个用户
3. 那这样就登录完成了

问题: 图形界面有点小
解决: 应用程序 -> 系统工具 -> 设置 -> 设备 -> Display -> 可以调大分辨率 -> 保留更改

问题: 终端字体有点小
解决: 应用程序 -> 终端 -> 编辑 -> 首选项 -> 字体 -> 设置字体 -> 选择(也可以去修改颜色等等)

## 第一次启动

如果安装了图形界面, 想切换到终端, 可以点击应用程序 -> 终端 -> init 3

如果觉得终端界面小, 可以点击下方的电脑图标, 选择 screen 来进行放大

进行登录

如果登录后闪烁的光标前为 $, 则说明登录的是一个普通用户

如果登录后闪烁的光标前为 #, 则说明登录的是一个 root 用户

可以使用 exit 退出登录

## 终端的使用

1. 图形终端
2. 命令后终端
3. 远程终端(SSH, VNC)

## 常用的目录结构介绍

终端执行 ls / : 会显示根目录下的文件夹字符

/ 根目录
/root root 用户的家目录
/home/username 普通用户的家目录
/etc 配置文件目录
/bin 命令目录
/sbin 管理命令目录
/usr/bin /usr/sbin 系统预装的其他命令

# 关机

通常 linux 作为服务器端的是不需要关机的, 但是如果需要关机可以执行 init 0
