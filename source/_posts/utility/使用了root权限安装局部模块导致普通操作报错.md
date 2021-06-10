# npm 报错(使用了 root 和 普通用户)

## 报错

Error: EACCES: permission denied, open '/Users/username/.npm/\_cacache/index-v5/9c/93/f3a9398a1daa4ee39b676f94900a580eeb9c0100425910b64a9f8b894579'

在安装插件的时候出现这样的错误，权限不够，是因为之前用 root 用户进行了局部安装 npm 包的操作，留下所属权为 root 的文件，导致普通用户无法访问 root 的文件内容。

## 解决办法

sudo chown -R YourUserName ~/.npm

## 参考博客:

https://blog.csdn.net/KimBing/article/details/88821182
