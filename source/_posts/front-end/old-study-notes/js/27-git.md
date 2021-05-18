---
title: 27-git
tag: old-study-notes
catogory:
  - front-end
  - old-study-notes
---

一：Git 是什么？
Git 是目前世界上最先进的分布式版本控制系统。
二：SVN 与 Git 的最主要的区别?
SVN 为集中式版本控制系统，版本库是集中存放在中央服务器的
单独搭建 SVN 服务器，不能离线工作
操作简单，代码保密性较强

放在自己这里，总比放在别的地方更安全，小公司通常没有这个资源来单独搭建 SVN 服务器

GIT 为分布式版本控制系统根本没有“中央服务器”，每个人的电脑上都是一个完整的版本库
适合分布式开发，强调个体
公共服务器压力和数据量都不会太大(不用公司自己去搭建服务器)
速度快灵活
可以离线工作(只是来网了可以提交到远程仓库)

操作复杂，代码保密性差(毕竟代码是放在别人那里，即使是私密仓库， github 本身后台中也可以看到)

GitHub,免费的远程仓库，如果是个人的开源项目，放到 GitHub 上是完全没有问题的。GitHub 还是一个开源协作社区，通过 GitHub，既可以让别人参与你的开源项目，也可以参与别人的开源项目。  
SVN 的存储需要依赖一个服务器，而 git 所有的东西是放在线上的。节约成本，省时省力。

上传一个项目，别人如果觉得你项目好的话，就会参与你的项目，给你提意见，优化，如果觉得好的话，也可以允许别人修改，同时，我们也可以去参与别人的项目，申请提交

三：在 windows 上如何安装 Git？

          下一步 ---（next）
          安装成功后会出现这两个东西


          运行Git Bash会出现如下结果:



四. GitHub 注册
https://github.com/ 打开 GitHub 官网 。

                                                       熟悉的Hello world,然而并没有什么用。



安装结束后需要进行一些设置

'Please tell me who you are.'
命令 git config --global user.name "你的 git 名称"
命令 git config --global user.email "你的 git 验证邮箱"

git 命令行中的操作命令：
命令 cd d: 进入相应的磁盘
命令 cd 进入文件夹
命令 cd .. 返回上一层目录
命令 mkdir 创建目录
命令 pwd 显示当前工作目录的全路径
命令 touch xx 新建 xx 文件
命令 vi xx 编辑 xx 文件，按 i 切换到编辑模式，按 esc 切换到命令模式，输入冒号:wq 回车，保存并返回
命令 rm 删除文件
命令 ls 查看当前目录的所有文件
命令 clear 清屏

然后！最重要的步骤来了！！git init

命令 git init
显示成功后去相应的文件夹中查看是不是多了一个.git 文件

     这个文件夹不要乱动！！这个文件夹不要乱动！！这个文件夹不要乱动！！
     这个文件夹就是你的版本库了，把项目放在文件夹下。

.git 文件夹就可以把我们的文件夹变成一个版本库了，默认是隐藏的，可以在查看中设置显示隐藏文件，当然不显示的话更安全，我么就操作不到了
现在进行一个测试。在当前目录先建立一个 readme.txt 文件，并且随便写的什么。

五.如何将文件提交到 git 服务器。

你的本地仓库由 git 维护的三棵“树”组成：
　　第一个是你的 工作目录，它持有实际文件；
　　第二个是 暂存区（Index），临时保存你的改动；
　　最后是 HEAD，指向你最近一次提交后的结果。

工作目录(.git 文件所在文件夹) -> 暂存区(git add) -> 本地仓库(git commit)

1.打开 Git Bash

命令 git add ‘文件名’
git add -u 提交所有被修改(modified)和被删除(deleted)文件，不包括新文件(new)
git add . 提交所有新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件
git add -A 提交所有变化

把咱们的文件存放在一个神秘的地方 >>>> 暂存区 （暂存区在本机）

2.把文件提交到本地仓库中去。

[master (root-commit) 7c793dc] : 哈希值编号，每次操作都会有个哈希值来记录

命令 1 . git commit -m '我提交时候的备注（注释）'

3.查看 commit 状态

命令 1 git status 用于显示工作目录和暂存区的状态。

出现 如下提示就说明咱们的 commit 是成功的。

修改下 readme.txt 里面的内容(改变的是工作区的文件，我们改的都是工作区的文件)。并重新使用 git status 命令 。

会发现出现了一些变化。git 告诉我们，git 进行了一些修改，但是这些修改并没有被提交。

4.查看修改内容。

命令 1 git diff 你的文件名 会出现更改信息，发现多了两个换行， 多了 7654321 内容；

将更改后的东西提交上去，和之前一样。先 add 然后再 commit 。

5.版本退回

命令 1. git log （ 查看日志） HEAD 指向最近一次提交
commit 7c793dcba8443220ceb1abea4cc776fe5b78a4ca (HEAD -> master)
commit 后面的是哈希值，就是记录哪次提交的哈希值
(如果看到了 please tell me who are you) 说明用户名邮箱没设置好

           git reflog
    7c793dc (HEAD -> master)

退回

命令 1 . git reset --hard HEAD^ 退回到上个版本 如果需要退回好多版本就在后面加上 ^ 例： git reset --hard HEAD^^退回两个版本。
git reset --hard 191e0c7 回退到指定版本
然后去查看 readme.txt 是否成功退回。

前三个版本，git reset --hard HEAD ^(几个^ 就是回退几个版本)

git reset --hard (提交时候的哈希值,可以从 reflog 中看到)

如 git reset --hard 7c793dc 就恢复到了想要的版本，工作目录中的文件也恢复到了指定的版本
每次的命令都会有记录，可以使用方向键盘来拿，不用每次都写
版本号没必要写全，前几位就可以了，Git 会自动去找。当然也不能只写前一两位，因为 Git 可能会找到多个版本号，就无法确定是哪一个了。

Git 的版本回退速度非常快，因为 Git 在内部有个指向当前版本的 HEAD 指针，当你回退版本的时候，Git 仅仅是把 HEAD 从指向 append GPL：
┌────┐
│HEAD│
└────┘
│
└──> ○ append GPL
│
○ add distributed
│
○ wrote a readme file
改为指向 add distributed：
┌────┐
│HEAD│
└────┘
│
│ ○ append GPL
│ │
└──> ○ add distributed
│
○ wrote a readme file
然后顺便把工作区的文件更新了。所以你让 HEAD 指向哪个版本号，你就把当前版本定位在哪。

如果只是想恢复前面版本中的某一个文件
从最新版恢复到 1094a，把文件 1 复制出来
再恢复回最新版，把文件 1 覆盖进去
提交文件 1 的改动

6.删除

    新建一个 b.txt

然后 commit 到库中。 并删除。

命令 1. git add

命令 2. git commit -m ‘备注’

命令 3. rm b.txt 这个是删除 b 文件的命令

回过头来看文件夹中的 b.txt

b.txt 不见了，查看下状态。

删除的是工作目录中的文件，本地仓库的文件都需要提交
删除的，修改的都是工作区的文件，修改删除之后需要提交到本地仓库

可以 commit，可以放弃修改 git reset --hard 版本号来回复文件。

1. git init -> 创建版本库
2. git add 文件名 -> 添加到暂存区
3. git commit -m '提交注释' ->提交到本地仓库

然后连接本地仓库，并将自己的库 push 到服务器中去。

命令 1. git remote add origin https: // github.com/你的账号/你的项目名称

命令 2. git push -u origin master 将本地的库推送到 master 分支 （就是推送到服务器上）
git push -u -f origin master(提交到远程仓库，这个命令中的 -f 是强制推送，因为远程仓库只有初始化的文件，所以强制推送上去就行了，不加-f 会报当前分支没有远程分支新，强制推送可以覆盖 master，这样就完成了第一次提交的步骤)

git remote -v 查看远程仓库地址

要把远端地址从 https 改成 ssh 的，需要先删除远端地址:
git remote rm origin 删除远端地址
再添加
git remote add origin 项目地址 添加远端 ssh 地址

在服务器上查看是否推送成功。

从现在开始，只需要 git push 就可以把本机的代码提交到远程仓库。
git push (提交 master 分支 到远程仓库)
git push origin 分支名 (提交其他分支 到远程仓库)

获取远程仓库的更新数据：
git fetch：相当于是从远程获取最新到本地，不会自动 merge
git pull：相当于是从远程获取最新版本并 merge 到本地
git pull origin 分支名 更新某个远程分支到本地
如果在 master 中 git pull origin 分支名，则会把那个分支 合并到 master 中

从服务器克隆数据， git clone

git merge : 合并

命令 1. git clone https://github.com/yanghuaizhi1210/GitTest

将服务器端的数据克隆过来。

如果输入$ git remote add origin git@github.com:djqiang（github 帐号名）/gitdemo（项目名）.git
提示出错信息：fatal: remote origin already exists.
解决办法如下：
1、先输入$ git remote rm origin
2、再输入$ git remote add origin git@github.com:djqiang/gitdemo.git 就不会报错了！
3、如果输入$ git remote rm origin 还是报错的话，error: Could not remove config section 'remote.origin'. 我们需要修改 gitconfig 文件的内容
4、找到你的 github 的安装路径，我的是 C:\Users\ASUS\AppData\Local\GitHub\PortableGit_ca477551eeb4aea0e4ae9fcd3358bd96720bb5c8\etc
5、找到一个名为 gitconfig 的文件，打开它把里面的[remote "origin"]那一行删掉就好了！

生成秘钥：
（1）首先检查电脑是否曾经生成过秘钥
cd ~/.ssh (用 git bash)
若打开该文件夹为空，则表示没有生成过秘钥，进入第二步。（~表示根目录）
(2) 生成秘钥
ssh-keygen -t rsa -C "your email"
命令要求输入密码，不用输，三个回车即可。
执行成功后，会在主目录.ssh 路径下生成两个文件：id_rsa 私钥文件；id_rsa.pub 公钥文件；

登陆 github 帐户点击头像，然后 Settings -> 左栏点击 SSH and GPG keys -> 点击 New SSH key
在远程仓库 gitlab 上添加 title 和 key，和本地的一致。title 可以自己取一个容易区分的名字，key 为 id_rsa.pub 中的内容（全部复制，可用 cat id_rsa.pub 命令打开）

配置了 ssh 秘钥，使用远程仓库的 ssh 地址提交

https://www.cnblogs.com/superGG1990/p/6844952.html

分支操作:

查看分支：git branch
当前分支前有 \* 号

创建分支：git branch <name>

切换分支：git checkout <name>

当我们切换了分支之后，本地目录下的代码就是切换分支的代码，操作也都是操作 分支里 的代码

创建+切换分支：git checkout -b <name>

合并某分支到当前分支：git merge <name>

删除分支：git branch -d <name>

合并分支：

1、先建一个分支 git branch 分支名

2、切换到新建的分支 git checkout 分支名

3、提交分支上的代码 git add . git commit -m “提交注释”

4、切换至主分支上 git checkout master

5、然后合并分支 git merge 分支名字

6、合并完以后就 push 最好先 pull 一次 然后 git push

7、切换到自己的分支 git merge 分支名称

开发的时候，由组长创建主分支，组员 clone 到本地，组员自己新建自己的分支，在分支上开发，提交到自己的分支上就好了，最后由组长审查代码，合并提交

线上只有一个 master 分支，小组开发，都提交到 master 分支上

设置 git 忽略文件： 1.创建文件：.gitignore(可以在 vs code 中新建这个文件) 2.忽略文件列表

# .gitignore 忽略文件列表

.DS_Store
node_modules/
/dist/
npm-debug.log*
yarn-debug.log*
yarn-error.log\*

# Editor directories and files

.idea
.vscode
_.suo
_.ntvs\*
_.njsproj
_.sln

如果出现如：
Please enter a commit message to explain why this merge is necessary,

# especially if it merges an updated upstream into a topic branch.

“:wq”是 Linux 操作系统命令： 表示强制性写入文件并退出。
输入“:wq”，注意是英文输入状态下的冒号，然后按下“Enter”键。

SVN 使用
使用 VisualSVN Server 建立版本库
https://www.cnblogs.com/lcyuhe/p/4539696.html

一定要养成一个习惯，每次提交都要先更新，不然可能冲突啥的很多

不要在本地创建一个与你要拉取的仓库同名的分支，不然本地会有记录，远程也有记录，会出错的，
要么本地创建，push 到远程，要么远程创建，pull 到本地

删除分支
https://baijiahao.baidu.com/s?id=1596093203877347214&wfr=spider&for=pc

切换到 master 分支
git checkout master
查看已有的本地及远程分支
git branch -a
删除远程分支
git push origin --delete dev
删除后，再次查看分支情况
git branch -a
删除本地分支
git branch -D dev
远程分支和本地分支删除完毕

更新 master 分支到本地分支
https://www.cnblogs.com/revel171226/p/8580369.html
当有人对 master 进行更新之后，你想让已经创建的分支内容更新到 master 的最新状态，
git checkout 自己的分支名//切换到分支下
git merge master //合并 master 到分支
git status // 如果是空的，你可以直接 push ，如果有内容，走下，保险都走一遍吧
git add -A
git commit -m""
git push origin 自己的分支名//push 到远程分支
