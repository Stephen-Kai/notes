# npm

**一: 创建工程**

```
mkdir my_package && cd my_package
```

**二: 如果使用 git 来管理软件包代码**

```
git init
git remote add origin git-remote-url // git-remote-url 替换为你的远程仓库地址
```

**三: 创建 package.json**

1.  创建无命名空间的包

    ```
    npm init
    // or 使用 npm 默认设置
    npm init -y
    ```

2.  创建携带命名空间的包，运行 npm init 命令并将范围传递给 scope 标志
    - 对于组织范围的程序包，请替换 my-org 为您的组织名称：
      ```
      npm init --scope=@my-org
      ```
    - 对于用户范围的程序包，请替换 my-username 为您的用户名：
      ```
      npm init --scope=@my-username
      ```

**四：创建一个 README.md 说明如何使用包，使用 [markdown 语法](https://guides.github.com/features/mastering-markdown/#what)**

**五: 创建 .npmignore 或 .gitignore 文件 来忽略无需发布的文件**

**六: 登录，出现提示时，输入用户名，密码和电子邮件地址**

```
npm login
```

**七: 测试是否已成功登录：**

```
npm whoami
```

**八: 发布包**

```
npm publish
// 默认情况下，有作用域的程序包以私有可见性发布，如要公开，键入npm publish --access public
```

**九: 更新版本**

npm 采用语义版本控制，如 1.0.0，一共三位，依次代表：主版本（major）、次要版本（minor）、补丁版本（patch）。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210403135735729.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDY5MTc3NQ==,size_16,color_FFFFFF,t_70)
变更版本号的命令：npm version <newversion | major | minor | patch>

1.  如本次变更是解决 bug，发补丁版本, version 变更： 1.0.0 -> 1.0.1
    ```
    npm version patch
    ```
2.  如本次变更是次要发布，version 变更： 1.0.0 -> 1.1.0
    ```
    npm version minor
    ```
3.  如本次变更是大版本发布，version 变更： 1.0.0 -> 2.0.0
    ` npm version major `
    再执行发布

```
npm publish
```

可以通过 npm [-v | --version] 来打印 npm 版本, npm view my_package version 以查看软件包的发布版本

**十：删除 和 废弃**

1: 删除

```
// 删除指定版本，如  npm unpublish my_package@1.0.0
npm unpublish <package_name>@<version>
// 删除整个程序包，如 npm unpublish my_package --force
npm unpublish <package_name> --force
```

相关限制:

- 为了再次发布该程序包，必须使用新的版本号。如果取消发布整个程序包，则可能要等到 24 小时后才能发布该程序包的任何新版本。
- 对于新创建的包，只要 npm Public Registry 中没有其他包依赖于您的包，就可以在发布后的前 72 小时内随时取消发布。
- 无论包发布的时间有多长，您都可以取消发布以下包：1: npm Public Registry 没有其他包依赖 2: 上周下载量不足 300 次 3: 只有一个所有者/维护者

2: 弃用

```
如: npm deprecate my_package@1.0.0 '1.x is no longer supported'
npm deprecate <pkg>[@<version range>] <message>
```

取消发布 和 废弃的区别在于，取消发布后，该包就不再提供安装了，而弃用还可以提供安装，安装时会向所有尝试安装该软件包的人提供弃用警告，不影响使用。

如果目的是鼓励用户升级，或者不再希望维护软件包，可以考虑使用 deprecate 命令。

参考文档:
[npm](https://docs.npmjs.com/creating-a-new-npm-user-account)
