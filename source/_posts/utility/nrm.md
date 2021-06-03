# 安装 nrm

1. 安装

```
npm install -g nrm
```

2. 查看列表

```
nrm ls
```

3. 查看 nrm 版本号

```
nrm --version
```

4. 添加某个源

```
nrm add tnpm http://r.tnpm.oa.com
```

5. 使用某个源

```
nrm use tnpm
```

6. 删除某个源

```
nrm del tnpm
```

7. 测速

```
nrm test tnpm
```

8. 帮助

```
nrm --help
```

## tnpm 地址

一定要登录内网才可以

npm config set registry=http://r.tnpm.oa.com
npm config set registry https://mirrors.tencent.com/npm/
