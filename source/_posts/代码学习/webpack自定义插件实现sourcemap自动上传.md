# webpack 自定义插件实现 sourcemap 自动上传

## 公众号文章

@see https://mp.weixin.qq.com/s?__biz=MzUzNjk5MTE1OQ==&mid=2247504607&idx=2&sn=236e33f1f90afe5c2de38a0893f40e34&chksm=faef5607cd98df118ef385da5c6912876541631eae476f2bdab751b13c9e0d62db5e7a31d540&mpshare=1&scene=23&srcid=0604hEoOcA7J9gIdAKvjEbs0&sharer_sharetime=1622788409137&sharer_shareid=17f619abf3110f5df39d1da2334fae4a%23rd

## 手写代码

为了我们每一次构建服务端能拿到最新的 map 文件，我们编写一个插件让 webpack 在打包完成后触发一个钩子实现文件上传，在 vue.config.js 中进行配置

### vue.config.js

```js
let SourceMapUploader = require("./source-map-upload");

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src');
            }
        },
        plugins: [
            // url 为上报地址
            new SourceMapUploader({url: "http://localhost:3000/upload"});
        ]
    }
}
```

### source-map-upload.js

```js
const fs = require("fs");
const http = require("http");
const path = require("path");

class SourceMapUploader {
  constructor(options) {
    this.options = options;
  }

  // hooks 中的 done 就是打包完成的钩子事件
  // status.compilation.outputOptions 就是打包的 dist 文件

  apply(compiler) {
    if (process.env.NODE_ENV == "production") {
      compiler.hooks.done.tap("sourcemap-uploader", async (status) => {
        // 读取目录下的map后缀的文件
        let dir = path.join(status.compilation.outputOptions.path, "/js/");
        const chunks = fs.readdirSync(dir);
        let map_files = chunks.filter((item) => {
          return item.match(/\.js\.map$/) !== null;
        });

        // 上传 sourceMap
        while (map_files.length > 0) {
          let file = map_files.shift();
          await this.upload(this.options.url, path.join(dir, file));
        }
      });
    }
  }

  upload(url, file) {
    return new Promise((resolve) => {
      let req = http.request(`${url}?name=${path.basename(file)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          Connection: "keep-alive",
        },
      });

      let fileStream = fs.createReadStream(file);
      fileStream.pipe(req, { end: false });
      fileStream.on("end", function () {
        req.end();
        resolve();
      });
    });
  }
}

modules.exports = SourceMapUploader;
```
