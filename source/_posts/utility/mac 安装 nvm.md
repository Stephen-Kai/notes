1. 打开终端安装，输入

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```

2. 终端报 443

```
curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused
```

3. 解决

```
通过IPAddress.com首页,输入raw.githubusercontent.com查询到真实IP地址：

我这里查询到的是:	185.199.108.133

在终端输入以下命令：sudo vi /etc/hosts
i 修改
同样在尾部追加内容：185.199.108.133 raw.githubusercontent.com
按 esc
输入：wq
回车即可
```

4. 安装完成后关闭终端，重新打开终端输入 nvm 验证一下是否安装成功，报 command not found: nvm

5. 解决

```
// 进入 nvm
cd .nvm
// 新建 .bash_profile 文件
touch .bash_profile
// 打开 .bash_profile 文件
open .bash_profile
// 在 .bash_profile 文件 copy如下内容：
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
// 关闭文件，然后执行这个文件
source .bash_profile
// 检查是否安装成功
nvm --version
// 安装成功
0.34.0
```

6. 但是我重新打开终端，又报 command not found: nvm

7. 于是我打开官网，试了试 ~/.zshrc

```
// 新建文件
touch ~/.zshrc
// 打开文件
open ~/.zshrc
// 输入
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
// 执行
source ~/.zshrc
// 检查
nvm --version
// 0.38.0
// 再次打开终端输入 nvm
// 安装成功
```

参考地址:
[nvm 官方](https://github.com/nvm-sh/nvm)
