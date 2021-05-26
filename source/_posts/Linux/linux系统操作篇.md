# linux 系统操作篇

## 万能的帮助命令

man

help

info

使用网络资源(搜索引擎和官方文档)

### man

man ls: 获取某条命令的帮助

man man: 获取 man 的帮助

man 1 passwd: 获取某条命令第一页的帮助

### help

shell 自带的命令为内部命令, 否则为外部命令

内部命令:

help cd

外部命令:

ls --help

### info

## 初识 pwd 和 ls 命令

在 linux 中, 一切皆文件

1. 文件查看
2. 目录文件的创建和删除
3. 通配符
4. 文件操作
5. 文件内容查看

### 文件查看(都可以使用 man 命令来查看对应的帮助信息)

pwd: 显示当前的目录名称

cd: 更改当前的操作路径

ls: 查看当前目录的文件

su - root: 切换到 root 用户

clear: 清空终端
