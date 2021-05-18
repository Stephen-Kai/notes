# hexo

- 访问: https://dangaohaohao.github.io/

#### 安装

```
npm install hexo -g
```

#### 创建

新建一个 repository, <Your GitHub UserName>.github.io

```
hexo init your-project-name && cd your-project-name && npm i
```

```
git init
git remote add your-project-romote-url

```

#### 新建文章

- 快速开始, 如: hexo new "hello-world"

```
hexo new [layout] <title>
```

- 常用命令

| 命令 | 说明                       | 例子                                     |
| ---- | -------------------------- | ---------------------------------------- |
| -p   | 自定义新文章的路径         | hexo new page --path about/me "About me" |
| -r   | 如果存在同名文章，将其替换 | hexo new "hello-world" -r                |

#### 生成静态文件

- 快速开始, 简写 hexo g

```
hexo generate
```

- 常用命令

| 命令 | 说明                                                 | 例子      |
| ---- | ---------------------------------------------------- | --------- |
| -d   | 文件生成后立即部署网站                               | hexo g -d |
| -w   | 监视文件变动                                         | hexo g -w |
| -f   | 强制重新生成文件(相当于 hexo clean && hexo generate) | hexo g -f |

#### 发表草稿

- 快速开始, 如 hexo publish "hello-world"

```
hexo publish [layout] <filename>
```

#### 启动服务器

- 快速开始, 默认访问 http://localhost:4000/

```
npm install hexo-server --save
hexo server
```

- 常用命令

| 命令         | 说明                           | 例子                |
| ------------ | ------------------------------ | ------------------- |
| -p, --port   | 重设端口                       | hexo server -p 3000 |
| -s, --static | 只使用静态文件                 | hexo server -s      |
| -l, --log    | 启动日记记录，使用覆盖记录格式 | hexo server -l      |

#### 部署网站

- 快速开始, 简写 hexo d

```
hexo deploy
```

- 常用命令

| 命令           | 说明                     | 例子           |
| -------------- | ------------------------ | -------------- |
| -g, --generate | 部署之前预先生成静态文件 | hexo deploy -g |

#### 清除缓存文件 (db.json) 和已生成的静态文件 (public)

- 快速开始, 特别是切换主题后如果主题不生效, 执行该命令

```
hexo clean
```

#### 列出网站资料

- 快速开始

```
hexo list
```

#### 显示 Hexo 版本

- 快速开始

```
hexo version
```

#### 一键部署

- 安装

```
npm install hexo-deployer-git -D
```

- 配置 \_config.yml

```
deploy:
  type: git
  repo: your-remote-url
  banch: your-deployment-branch
```

- 运行

```
hexo deploy
```

#### 完成后自动部署

- 快速开始

```
hexo generate --deploy
```

#### 主题配置

- 采用主题见: https://github.com/yanm1ng/hexo-theme-vexo

#### 加密

- 使用 https://github.com/D0n9X1n/hexo-blog-encrypt/blob/master/ReadMe.zh.md

#### 更多

更多命令详见: https://hexo.io/
