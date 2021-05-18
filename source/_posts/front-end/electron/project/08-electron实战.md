---
title: 08-electron实战
tag: electron
catogory:
  - front-end
  - electron
---

### 本项目是应用 Electron + Vue.js 完成一个网站收集和网站浏览的功能。具体包括网站添加、网站浏览、列表项目删除、内容搜索、菜单定制及项目打包等功能。

# 环境搭建

### 1、搭建 Electron 环境

在你认为合适的目录下 创建 readit-vue 目录，在终端命令行里输入命令：

```s
cd 你认为合适的目录/readit-vue
npm init -y
npm install electron@latest -D
```

### 2、创建 main.js 文件

在项目根目录下创建 main.js 文件：

```js
// /main.js

// Modules
const { app, BrowserWindow } = require("electron");
const windowStateKeeper = require("electron-window-state");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  // Win state keeper
  let state = windowStateKeeper({
    defaultWidth: 500,
    defaultHeight: 650,
  });

  mainWindow = new BrowserWindow({
    x: state.x,
    y: state.y,
    width: state.width,
    height: state.height,
    minWidth: 350,
    maxWidth: 650,
    minHeight: 300,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Load local vue server into the new BrowserWindow
  mainWindow.loadURL("http://localhost:8080");

  // Manage new window state
  state.manage(mainWindow);

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Electron `app` is ready
app.on("ready", createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
```

### 3、搭建 Vue 环境, 启动 Vue 服务

在命令行里输入：

```s
vue create vue-renderer
cd vue-renderer
yarn serve
```

### 4、配置 package.json npm 脚本

```json
// /package.json
{
  // ...
  "scripts": {
    "start": "nodemon --exec 'electron .'"
  }
}
```

### 5、启动应用

```
npm start
```

# 构建 Vue 项目基本结构

准备 Header, Main, 和 Modal 三个组件。

### 1、reset.css 样式

编写 reset.css 样式：

```css
/* /src/assets/styles/reset.css */

html,
body {
  height: 100%;
}

body {
  font: caption;
  margin: 0;
  display: flex;
  flex-flow: column;
}
```

### 2、App 根组件

编辑 `/renderer/src/App.vue`：

```vue
<template>
  <div>
    <Header></Header>
    <Main></Main>
    <Modal></Modal>
  </div>
</template>

<script>
import Header from "./components/Header";
import Main from "./components/Main";
import Modal from "./components/Modal";

export default {
  components: {
    Header,
    Main,
    Modal,
  },
};
</script>

<style lang="stylus" scoped>
div
  height 100%
  position relative
</style>
```

### 3、Header 组件

在 components 文件夹下创建 Header.vue 组件： /src/components/Header.vue

```vue
<template>
  <header>
    <button id="show-modal">+</button>
    <input type="text" id="search" placeholder="Search" />
  </header>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
button {
  background: dodgerblue;
  color: white;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  outline: none;
}

input {
  font-size: 20px;
  border-radius: 5px;
  border: 1px solid silver;
  padding: 0 10px;
}

input::placeholder {
  color: lightgray;
}

header {
  background: lightgray;
  display: flex;
  padding: 10px;
  font-weight: bold;
  border-bottom: 1px solid silver;
  box-shadow: 0px 10px 10px rgba(0,0,0,0.1);
}

#show-modal {
  padding: 0px 12px 5px;
  margin-right: 10px;
  font-size: 30px;
}

#search {
  flex-grow: 1;
}
</style>
```

### 4、Main 组件

在 components 文件夹下创建 Main.vue 组件： /src/components/Main.vue

```vue
<template>
  <main>
    <p id="no-items">No Items</p>
    <div id="items"></div>
  </main>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
#items {
  flex-grow: 1;
}

#no-items {
  font-weight: bold;
  color: silver;
  text-align: center;
  width: 100%;
  position: absolute;
  top: 100px;
  z-index: -1;
}
</style>
```

### 5、modal 组件

在 components 文件夹下创建 Modal.vue 组件： /src/components/Modal.vue

```vue
<template>
  <div id="modal">
    <input type="text" id="url" placeholder="Enter URL" />
    <button id="add-item">Add Item</button>
    <button id="close-modal">Cancel</button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
#modal {
  position: absolute;
  top 0;
  left 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  display: none;
}

#url {
  flex-grow: 1;
  width: 100%;
  margin: 0 25px 15px;
  padding: 10px;
}

#modal button {
  padding: 10px;
}

#close-modal {
  background: white;
  color: black;
  margin-left: 15px;
}

#add-item {
  margin-left: 25px;
}

.read-item {
  display: flex;
  align-items: center;
  align-content: center;
  border-bottom: lightgray 2px solid;
  background: #FAFAFA;
  padding: 10px;
}

.read-item img {
  width: 20%;
  margin-right: 25px;
}
</style>
```

# 添加一个新的信息

### 1、创建 Store

##### 1.1 编辑 store

编辑 `/vue-renderer/src/store/index.js`：

```js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isShowModal: false,
  },

  mutations: {
    setModalVisible(state, show) {
      state.isShowModal = show;
    },
  },

  actions: {
    setModalVisible({ commit }, show) {
      commit("setModalVisible", show);
    },
  },
});
```

##### 1.2 引入 store

编辑 `/vue-renderer/src/main.js`：

```js
// ...
import store from "./store";
// ...
```

### 2、显示添加窗口

编辑 `/vue-renderer/src/components/Header.vue`:

```vue
<template>
  <header>
    <button id="show-modal" @click="setModalVisible(true)">+</button>
    // ...
  </header>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["setModalVisible"]),
  },
};
</script>
```

### 3、完善添加模态组件

编辑 `/vue-renderer/src/components/Modal.vue`：

```vue
<template>
  <div id="modal" v-show="isShowModal">
    <input
      type="text"
      id="url"
      :disabled="status"
      v-model="url"
      placeholder="输入 URL ..."
    />
    <button
      id="add-item"
      :class="{ disabled: status }"
      :disabled="status"
      @click="addItem"
    >
      {{ addButtonText }}
    </button>
    <button id="close-modal" v-show="!status" @click="setModalVisible(false)">
      取消
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      url: "",
      status: false,
      addButtonText: "添加",
    };
  },

  created() {
    // Listen for new item from main process
    ipcRenderer.on("new-item-success", (e, newItem) => {
      console.log(newItem);

      this.status = false;
      this.addButtonText = "添加";
      this.url = "";

      this.setModalVisible(false);
    });
  },

  computed: {
    ...mapState(["isShowModal"]),
  },

  methods: {
    ...mapActions(["setModalVisible"]),

    addItem() {
      if (this.url !== "") {
        // Send new item url to main process
        ipcRenderer.send("new-item", this.url);

        this.status = true;
        this.addButtonText = "添加中...";
      }
    },
  },
};
</script>
```

### 4、完善主进程 main.js

编辑 `/main.js` , 在文件代码中的最外层添加 `ipcMain` 的 `new-item` 时间监听，重点是 `ipc` 通信：

```js
//...

// Modules
const { ipcMain } = require("electron");

// Listen for new item request
ipcMain.on("new-item", (e, itemUrl) => {
  // Get new item and send back to renderer
  setTimeout(() => {
    e.sender.send("new-item-success", "New item from main process");
  }, 2000);
});

// ...
```

# 获得屏幕快照

### 1、完善主进程处理

从渲染进程中拿到 `url` 后，通过 `offscreen` 获取屏幕快照。
在项目根目录下，创建 `readItem.js`：

```js
// /readItems

// Modules
const { BrowserWindow } = require("electron");

// Offscreen BrowserWindow
let offscreenWindow;

// Exported readItem function
module.exports = (url, callback) => {
  // Create offscreen window
  offscreenWindow = new BrowserWindow({
    width: 500,
    height: 500,
    show: false,
    webPreferences: {
      offscreen: true,
    },
  });

  // Load item url
  offscreenWindow.loadURL(url);

  // Wait for content to finish loading
  offscreenWindow.webContents.on("did-finish-load", (e) => {
    // Get page title
    let title = offscreenWindow.getTitle();

    // Get screenshot (thumbnail)
    offscreenWindow.webContents.capturePage((image) => {
      // Get image as dataURL
      let screenshot = image.toDataURL();

      // Execute callback with new item object
      callback({ title, screenshot, url });

      // Clean up
      offscreenWindow.close();
      offscreenWindow = null;
    });
  });
};
```

### 2、更新 main.js

在 `/main.js` 文件里添加对 `readItem.js` 的引用：

```js
// Modules
// ...
const readItem = require("./readItem");

// ...

// Listen for new item request
ipcMain.on("new-item", (e, itemUrl) => {
  // remove all codes here.

  // Get new item and send back to renderer
  readItem(itemUrl, (item) => {
    e.sender.send("new-item-success", item);
  });
});
```

# 显示列表

屏幕快照的图片获取生成以后，将返回的信息显示在列表里。

### 1、重新规划 Store

重新规划 Store, 使用 `Vuex` 模块来分开管理数据。在 `/src/store/` 创建 `modules` 文件夹, 在文件里创建 `main.js` 与 `modal.js` 两个文件。将 `/src/store/index.js` 文件里的代码迁移到 `modal.js` 里，做修改。三个文件的内容如下：

##### 1.1 index.js

修改 `/src/store/index.js`：

```js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import modal from "./modules/modal";
import main from "./modules/main";

export default new Vuex.Store({
  modules: {
    modal,
    main,
  },
});
```

##### 1.2 modal

编辑 /src/store/modules/modal.js

```js
const state = {
  isShowModal: false,
};

const mutations = {
  setModalVisible(state, show) {
    state.isShowModal = show;
  },
};

const actions = {
  setModalVisible({ commit }, show) {
    commit("setModalVisible", show);
  },
};

export default {
  state,
  mutations,
  actions,
};
```

##### 1.3 main.js

编辑 `main.js`，提供 Main.vue 管理的数据：

```js
import store from "store";

const state = {
  items: [],
};

const mutations = {
  setItems(state, item) {
    state.items.push({
      id: new Date().getTime(),
      ...item,
    });

    // 数据缓存
    store.set("items", state.items);
  },

  initItems(state, items) {
    state.items = items;
  },
};

const actions = {
  setItems({ commit }, item) {
    commit("setItems", item);
  },

  initItems({ commit }, items) {
    commit("initItems", items);
  },
};

export default {
  state,
  mutations,
  actions,
};
```

### 2、修改 Modal.vue

`/src/components/Modal.vue` 获取到数据后，装填到 `Store` 中：

```vue
<script>
import { mapState, mapActions } from "vuex";
export default {
  // ...
  created() {
    ipcRenderer.on("new-item-success", (e, newItem) => {
      this.setItems(newItem);

      // ...
    });
  },

  methods: {
    ...mapActions(["setModalVisible", "setItems"]),

    // ...
  },
};
</script>
```

### 3、修改 Main.vue 组件

修改 `/src/components/Main.vue` 组件，用来响应的显示 `Store` 里的 `items` 数据。

```vue
<template>
  <main>
    <p id="no-item">暂无数据。</p>
    <div id="items">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="read-item"
        :class="{ selected: index === currentIndex }"
        @click="changeIndex(index)"
      >
        <img :src="item.screenshot" alt="item.title" />
        <h2>{{ item.title }}</h2>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import store from "store";

export default {
  data() {
    return {
      currentIndex: 0,
    };
  },

  created() {
    let items = store.get("items") || [];
    this.initItems(items);
  },

  computed: {
    ...mapState({
      items: (state) => state.main.items,
    }),

    // ...
  },

  methods: {
    ...mapActions(["initItems"]),

    changeIndex(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style lang="stylus" scoped>
#items
  flex-grow 1

#no-item
  font-weight bold
  color silver
  text-align center
  width 100%
  position absolute
  top 100px
  z-index -1

.read-item
  display flex
  align-items center
  align-content center
  border-bottom lightgray 2px solid
  background #fafafa
  padding 10px
  border-left 10px solid lightgray
  -webkit-user-select none
  img
    width 20%
    margin-right 25px
    border solid 1px #ccc
  &:hover
    background #eee
  &.selected
    border-left-color dodgerblue
</style>
```

# 打开网站窗口

点击一个条目，根据获取到的网站 `URL` 信息，打开网站窗口。

### 1、修改 Main.vue

在 `/src/components/Main.vue` 组件里，给每个条目添加双击事件，双击后打开网站窗口，同时注入一段 `JS` 代码：

```vue
<template>
  <main>
    // ...
    <div id="items">
      <div
        // ...
        @dblclick="open(item.url, index)"
      >
        // ...
      </div>
    </div>
  </main>
</template>

<script>

// ...

import buttonJS from './button'

export default {
  // ...
  methods: {

    // ...

    open(url, index) {
      let readerWin = window.open(url, '', `
        maxWidth=2000,
        maxHeight=2000,
        width=1250,
        height=800,
        backgroundColor=#dedede,
        nodeIntegration=1,
        contextIsolation=1
      `)

      readerWin.eval(buttonJS)
    }
  }
}
</script>
```

### 2、Button.js

创建 `/src/components/button.js`，编写要注入的 `JS` 代码：

```js
export default `
  alert('hello.')
`;
```

# 删除信息

在打开的窗口里注入按钮，点击按钮关闭窗口，同时删除相应的条目。

### 1、在打开的窗口中注入按钮

修改 `/src/components/button.js`，编写创建的按钮 `JS` 代码，同时修改注入语句，将被点击条目的`index` 值传递到窗口的按钮上。

###### 1.1 button.js

```js
export default `
  let readitClose = document.createElement('div')
  readitClose.innerText = '关闭窗口'

  readitClose.style.position = 'fixed'
  readitClose.style.bottom = '100px'
  readitClose.style.right = '30px'
  readitClose.style.padding = '5px 10px'
  readitClose.style.fontSize = '14px'
  readitClose.style.background = 'dodgerblue'
  readitClose.style.fontWeight = 'bold'
  readitClose.style.color = 'white'
  readitClose.style.borderRadius = '5px'
  readitClose.style.cursor = 'default'
  readitClose.style.boxShadow = '2px 2px 2px rgba(0, 0, 0, 0.2)'

  readitClose.onclick = e => {
    window.opener.postMessage({
      action: 'delete-reader-item',
      itemIndex: {{index}}
    }, '*')
  }

  document.querySelector('body').appendChild(readitClose)
`;
```

##### 1.2 修改 Main.vue

```vue
<script>
export default {
  // ...
  methods: {
    // ...

    ...mapActions(["initItems", "removeItem"]),

    open(url, index) {
      // ...
      readerWin.eval(buttonJS.replace("{{index}}", index));
    },
  },
};
</script>
```

### 2、删除条目

介绍到用户点击打开的按钮消息后，执行关闭窗口和删除条目的操作。

##### 2.1 编辑 `/src/components/Main.vue`：

```vue
<script>
export default {
  // ...
  created() {
    // ...
    window.addEventListener("message", (e) => {
      if (e.data.action === "delete-reader-item") {
        // 删除条目
        this.removeItem(e.data.itemIndex);

        // 更新当前高亮的 currentIndex
        if (this.currentIndex > 0) this.currentIndex--;

        // 关闭打开的窗口
        e.source.close();
      }
    });
  },
};
</script>
```

##### 2.2 修改 Store

修改 `/src/store/modules/main.js`, 添加删除数据的功能：

```js
// ...

const mutations = {
  // ...

  removeItem(state, index) {
    state.items.splice(index, 1);

    store.set("items", state.items);
  },
};

const actions = {
  // ...

  removeItem({ commit }, index) {
    commit("removeItem", index);
  },
};

// ...
```

# 搜索信息

搜索信息的思路：在 `/src/components/Header.vue` 组件里获取到用户从搜索框里的关键字(keyword)，保存在 `Store` 里，再做个 `getter` , 过滤 `items` 信息，修改 `Main.vue` 组件的渲染信息源。

### 1、定制 Store

修改 `src/store/modules/main.js`：

```js
// ...

const state = {
  // ...
  keywords: "",
};

const mutations = {
  // ...

  changeKeywords(state, keywords) {
    state.keywords = keywords;
  },
};

const actions = {
  // ...

  changeKeywords({ commit }, keywords) {
    commit("changeKeywords", keywords);
  },
};

const getters = {
  filteredItems(state) {
    if (state.keywords) {
      return state.items.filter((value, index) => {
        return value.title.indexOf(state.keywords) != -1;
      });
    }

    return state.items;
  },
};

export default {
  // ...

  getters,
};
```

### 2、修改 Header.vue

处理 `/src/componnent/Header.vue` 的 keywords 信息获取与存储：

```vue
<template>
  <header>
    // ...
    <input
      type="text"
      @keyup.enter="searchItem"
      v-model="keywords"
      id="search"
      placeholder="搜索..."
    />
  </header>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      keywords: "",
    };
  },

  methods: {
    ...mapActions(["setModalVisible", "changeKeywords"]),

    searchItem() {
      this.changeKeywords(this.keywords);
    },
  },
};
</script>
```

### 3、修改 Main.vue

修改 `/src/components/Main.vue`，获取关键字和修改数据渲染数据源。

```vue
<template>
  <main>
    // ...
    <div id="items">
      <div
        v-for="(item, index) in filteredItems"
        // ...
      >
        // ...
      </div>
    </div>
  </main>
</template>

<script>
// ...
export default {
  // ...

  computed: {
    // ...

    ...mapGetters(['filteredItems'])
  },

  // ...
}
</script>
```

# 定制菜单

本节为大家介绍如何为我们的应用定制一个菜单，让它看起来更像一个原生的桌面端 APP。

### 1、载入菜单模块

在 `renderer` 的 `/public/index.html` 里载入菜单模块：

```html
<script>
  const { remote, shell } = require("electron");
</script>
```

### 2、定制菜单

修改 `/src/App.vue`，在 `mounted` 里定制菜单：

```vue
<script>
// ...

export default {
  // ...
  mounted() {
    // Menu template
    const template = [
      {
        label: "Items",
        submenu: [
          {
            label: "Add New",
            click: () => {
              this.setModalVisible(true);
            },
            accelerator: "CmdOrCtrl+O",
          },
        ],
      },
      {
        role: "editMenu",
      },
      {
        role: "windowMenu",
      },
      {
        role: "help",
        submenu: [
          {
            label: "Learn more",
            click: () => {
              shell.openExternal(
                "https://github.com/stackacademytv/master-electron"
              );
            },
          },
        ],
      },
    ];

    // Set Mac-specific first menu item
    if (process.platform === "darwin") {
      template.unshift({
        label: remote.app.getName(),
        submenu: [
          { role: "about" },
          { type: "separator" },
          { role: "services" },
          { type: "separator" },
          { role: "hide" },
          { role: "hideothers" },
          { role: "unhide" },
          { type: "separator" },
          { role: "quit" },
        ],
      });
    }

    // Build menu
    const menu = remote.Menu.buildFromTemplate(template);

    // Set as main app menu
    remote.Menu.setApplicationMenu(menu);
  },
};
</script>
```

# 项目打包部署

### 1、基本概念

本节我们将介绍打包和分发我们的项目，内容包括代码签名和添加发布自动应用程序更新的功能。

![desc-1](/assets/images/electron/project/dest-1.png)

为此，我们将使用 electron builder 模块。electron Builder 已成为打包 electron 几乎所有我们需要的所有功能，包括一个非常简单的使用 `electron` 更新。

![desc-2](/assets/images/electron/project/dest-2.png)

我们应该听说将应用程序更新推送到官方的服务器。这里 `Mac` 应用程序商店需要一个专用的应用程序更新服务器。在配置和维护时，这通常增加了复杂性。

所以在使用 electron Builder 时，我们将看到如何实现将本地的应用

![desc-4](/assets/images/electron/project/desc-4.png)

发布到 `Github` 服务器上，只使用 `Github` 更新服务器。

![desc-5](/assets/images/electron/project/desc-5.png)

### 2、Eletron-Builder

```
npm install -g electron-builder
electron-builder -m zip
```
