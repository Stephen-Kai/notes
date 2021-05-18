---
title: mac 使用 tree 命令生成项目结构树
tag: 实用小工具
catogory:
  - 实用小工具
---

如果要生成项目的结构树，可以使用 homebrow 安装 tree，使用 tree 命令来生成

```ts
brew install tree
```

安装成功后，可以根据 tree --help 来查看所有的命令

```ts
  ------- 列表选项 -------
-a             列出所有文件
-d             仅列出目录
-l             遵循像目录这样的符号链接
-f             打印每个文件的完整路径前缀
-x             仅保留当前文件系统
-L level       输出的项目树的层级
-R             达到最大目录级别时重新运行树
-P pattern     仅列出与给定模式匹配的文件
-I pattern     不列出与给定模式匹配的文件
--ignore-case  模式匹配时忽略大小写
--matchdirs    在-P模式匹配中包含目录名
--noreport     关闭树列表末尾的文件/目录计数
--charset X    将charset X用于terminal/HTML和缩进行输出.
--filelimit #  不要下载超过#个文件的目录
--timefmt <f>  根据格式打印和格式化时间<f>
-o filename    输出到文件而不是标准输出

  ------- 排序选项 -------
-v             按版本对文件进行字母数字排序
-t             按上次修改时间对文件排序           .
-c             按上次状态更改时间对文件排序
-U             不排序文件
-r             颠倒排序顺序
--dirsfirst    在文件之前列出目录（-U禁用）
--sort X       选择排序：名称、版本、大小、mtime、ctime

  ------- 图形选项 -------
  -i            不要打印缩进行
  -A            打印ANSI线条图形缩进线条
  -S            使用CP437（控制台）图形缩进线打印
  -n            始终关闭着色（-C覆盖）
  -C            始终启用着色
  ------- XML/HTML/JSON 选项 -------
  -X            打印出树的XML表示
  -J            打印出树的JSON表示
  -H baseHREF   打印出以baseHREF作为顶部目录的HTML格式
  -T string     用字符串替换默认的HTML标题和H1标题
  --nolinks     关闭HTML输出中的超链接
  ------- 输入选项 -------
  --fromfile    从文件中读取路径（.=stdin）
  ------- 其他选项 -------
  --version     打印版本并退出
  --help        打印用法和此帮助消息并退出
  --            选项处理终止符
```

比如可以使用以下命令来生成项目结构为 2 级，过滤掉来 node_modules 文件，树列表末尾不会显示文件数 的项目树，并且把项目树输入到了 tree.md 的文件中(会自动创建)

```ts
tree -L 2 -I "node_modules" --noreport > tree.md
```

如图：
![tree.md](/assets/images/utility/tree.jpg)
