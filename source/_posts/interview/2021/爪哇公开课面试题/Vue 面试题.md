# Vue 经典面试题

## 把你了解的 Vue 响应式原理阐述一下.

如果面试官自己了解, 那就考察一下你对它的掌握程度, 如果面试官不了解, 那就看你能不能用语言让他明白.

首先了解 Vue 中的三个核心类

1. Observer: 给对象的属性添加 getter 和 setter, 用于依赖收集和派发更新.
2. Dep: 用于收集当前响应对象的依赖关系, 每个响应式对象都有一个 dep 实例, dep.subs = watcher[]. 当数据发生变更的时候, 会通过 dep.notify() 通知各个 watcher.
3. Watcher: 观察者对象, render watcher, computed watcher, user watcher.

### 依赖收集

1. initState, 对 computed 属性初始化时, 会触发 computed watcher 收集依赖.
2. initState, 对监听属性初始化的时候, 会触发 user watcher 收集依赖.
3. render, 触发 render watcher 依赖收集.

### 派发更新

Object.defineProperty

1. 组件中对响应的数据进行了修改, 会触发 setter 逻辑.
2. dep.notify().
3. 遍历所有 subs, 调用每一个 watcher 的 update 方法.

总结原理:

当创建 vue 实例时, vue 会遍历 data 里面的属性, Object.defineProperty 为属性添加 getter 和 setter 对数据的读取进行劫持.

getter: 依赖收集
setter: 派发更新

每一个组件的实例都会有一个 watcher 实例.

就比如 new Vue, data, watch, computed

## 计算属性的实现原理

```js
computed: {
    test() {}
}
```

computed watcher, 计算属性的监听器.

computed watcher 持有一个 dep 实例, 通过 dirty 属性标记计算属性是否需要重新求值.

当 computed 的依赖值发生改变后, 就会通知订阅的 watcher 进行更新, computed watcher 会将 dirty 属性设置为 true, 并进行计算属性的调用.

1. computed 所谓的缓存是什么?

计算属性是基于他的响应式依赖进行缓存的, 只有依赖发生改变的时候才会重新求值.

2. 那 computed 缓存存在的意义是什么? 或者你经常在什么时候使用?

比如计算属性方法内部操作非常的耗时, 遍历一个极大的数组, 计算一次可能要耗时 1s.

```js
let largeArray = [
    {...},
    {...},
    {...}
] // 10w

data: {
    id: 1
}

computed: {
    currentItem: function() {
        return largeArray.find(item => item.id = this.id);
    },
    // 建议
    stringId: function() {
        return String(this.id);
    }
}
```

那可能工作中不会遇到这么极端的情况, 但是也有建议, 比如说格式转换, 格式化的东西, 像上面的 stringId

3. 那你知道为什么建议格式转换要进行缓存呢? 这里的格式转换做了什么事情你知道吗？

4. 以下情况, computed 可以监听到数据的变化吗?

```js

template

    {{storageMsg}}

computed: {
    storageMsg: function() {
        return sessionStorage.getItem('xxx');
    },
    time: function() {
        return Date.now();
    }
}

created() {
    sessionStorage.setItem('xxx', '111');
}

onClick() {
    sessionStorage.setItem('xxx', '222');
}
```

如果这道题没答出来, 无论上面的原理答得多好, 面试官会认为都是背的, 实际过程中觉得你不知道会怎么用

以上两个都不会, 只有通过 Vue 初始化监听的东西才可以被计算属性监听到, 如果没有加上 computed watcher, 那无论做什么都无法监听到.

5. computed 和 watch 有什么区别吗？

computed 有缓存, 主要用于做一些格式转换啊一些简单的东西, watch 没有做缓存, 更像是监听到变化之后, 要去做什么动作, 比如调一个函数啊等等, 去做什么动作

## Vue.nextTick 的原理

```js
Vue.nextTick(() => {});

await Vue.nextTick();

// TODO
```

Vue 是异步执行 dom 更新的, 它有一个异步队列, 一旦观察到数据的变化, 把同一个 event loop 中观察数据变化的 watcher 推送进这个队列.

在下一次事件循环时, Vue 清空异步队列, 进行 dom 的更新.

Promise.then -> MutationObserver -> setImmediate -> setTimeout

如果浏览器支持微任务, 就使用微任务实现, 如果不支持微任务, 那就放宏任务中

所以像 vm.someDate = 'new value', dom 并不会马上更新, 而是在异步队列被清除时才会更新 dom.

宏任务 -> 微任务 -> UI render

如果放宏任务实现: 宏任务 -> UI render -> 宏任务

UI render 只是浏览器渲染的一个行为, 那在渲染之前, dom 它已经更新了, 只是没有展示在页面上

1. 一般什么时候用到 nextTick 呢?

在数据变化后执行某个操作, 而这个操作依赖因数据变化而变化的 dom, 这个操作就应该放在 Vue.nextTick 中.

```js
<template>
  <div v-if="loaded" ref="test" />
</template>

async showDiv () {
    this.loaded = true;
    this.$refs.test // 同步获取不到 test, 获取到的会是 undefined

    await Vue.nextTick(); // 这个时候, await 一下, 再获取, 就可以拿到了, 或者直接放在 nextTick 的回调中
    this.$refs.test.xxx() // 可以拿到了, 可以执行它上面的一些方法
}
```

2. 以前有人用 `setTimeout` 实现这个

对, 但是既然已经使用 Vue 了, 而且 Vue 已经封装好了, 那感觉使用它封装好的会好一些, 尽可能少用这样原生的写法

3. 为什么不在 `update` 的钩子里做?

可以啊, 但是有的人可能喜欢把它写在一个函数里, 它可能觉得比较聚合的方式, 方便维护, 而不是把它放在各个生命周期里, 比较散乱.

## 手写一个简单的 Vue, 实现响应式更新(重点)

### 初始化

1. 新建文件夹

```js
mkdir basic-vue && cd basic-vue
```

2. 新建文件

```js
touch {index.html, vue.js, compiler.js, observer.js, dep.js, watcher.js}
```

### 实现

1. index.html 文件, 放置一个用于挂载的跟元素

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>basic-vue</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

2. vue.js 文件, 实现 Vue 类

```js
/**
 * 包括 vue 构造函数, 接收各种配置参数等等.
 */

export default class Vue {
  constructor(options = {}) {
    this.$options = options;
    this.$data = options.data;
    this.$methods = options.methods;

    this.initRootElement(options);
  }

  /**
   * 获取根元素, 并存储到 vue 实例. 简单检查一下传入的 el 是否合法.
   */
  initRootElement(options) {
    if (typeof options.el === "string") {
      this.$el = document.querySelector(options.el);
    } else if (options.el instanceof HTMLElement) {
      this.$el = options.el;
    }

    if (!this.$el) {
      throw new Error("传入的 el 不合法, 请传入 CSS Selector 或者 HTMLElement");
    }
  }
}
```

3. 新建一个 test.js, 命令为`touch test.js`, 验证一下

```js
import Vue from "./vue";

const vm = new Vue({
  el: "#app",
  data: {
    name: "basic-vue",
  },
  methods: {
    sayHello() {
      console.log("hello world");
    },
  },
});

console.log(vm);
```

4. 在 index.html 中引入

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>basic-vue</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="./test.js"></script>
  </body>
</html>
```

5. 打开浏览器, 发现报了个错

```js
Uncaught SyntaxError: Cannot use import statement outside a module
```

6. 因为我们使用了 `ESModule` 的语法, `script` 的 `type` 要声明为 `module`, 浏览器才会识别这是一个 `Module`

```js
<script src="./test.js" type="module"></script>
```

7. 在浏览器打开, 可以看到 vm 信息打印出来了, 可以试着传入一个错误的 CSS Selector 或者 DOM, 可以看到报了错误信息

注意点: 我是使用的 serve 命令开的静态服务器, 而我所有的文件都是在该静态服务器根目录下的, 所以在 test.js 中引入 vue.js 的时候, 我一开始使用的是 `./vue.js`, 报了 404, 后来改成 `/vue.js`, 200 成功了

点击 #app 可以跳转到对应的元素

```js
{
    "$options": {
        "el": "#app",
        "data": {
            "name": "basic-vue"
        },
        "methods": {}
    },
    "$data": {
        "name": "basic-vue"
    },
    "$methods": {},
    "$el": {}
}
```

传入错误的 dom, 报 `Uncaught Error: 传入的 el 不合法, 请传入 CSS Selector 或者 HTMLElement`

8. 思考, 在 vue 里可以使用 this 来获取到 data 的属性

解决办法: 通过 `Object.defineProperty` 来把 data 属性注入到 `this` 上, 注意这里的 `Object.defineProperty` 跟依赖收集, 派发更新 没有关系

注意: 我在这里定义属性的时候不小心写成了 `Object.defineProperties`, 然后注入到 `this` 上, 浏览器报错啦`vue.js:35 Uncaught TypeError: Property description must be an object: n`

`google` 一下 :

`Object.defineProperty(obj, prop, descriptor)`: 直接在一个对象上定义 一个 新属性，或者修改一个对象的现有属性
`Object.defineProperties(obj, props)`: 直接在一个对象上定义 一个或多个 新的属性或修改现有属性, props 是一个对象

改为 `Object.defineProperty` 就好了

constructor 中调用

```js
// 通过 Object.defineProperty 来将 options.data 注入到 vue 实例中
this._proxyData(options.data);
```

```js
_proxyData(data) {
    Object.keys(data).forEach((key) => {
        Object.defineProperty(this, key, {
            enumerable: true,
            configurable: true,
            get() {
                return data[key];
            },
            set(newValue) {
                if(data[key] === newValue) {
                    return
                }
                data[key] = newValue;
            }
        });
    })
}
```

9. 接下来, 先把几个核心类声明好, 具体的实现先不用管

(经验: 当设计比较大型的项目的时候, 先把架子设计好, 对应的依赖关系, 先定义, 再实现, 定义好了再实现, 写好注视, 然后就是更小粒度地去实现)

外部会引入的方法最好使用 jsDoc 的方式注释

10. 开始声明

- dep.js

```js
export default class Dep {
  constructor() {
    // 存储所有的观察者
    this.subs = [];
  }

  /** 添加观察者 */
  addSub(watcher) {}

  /** 发送通知 */
  notify() {}
}
```

- observer.js

```js
export default class Observer {
  constructor(data) {
    this.traverse(data);
  }

  /** 递归遍历 data 里的所有属性 */
  traverse(data) {}

  /** 给传入的对象设置 getter/setter */
  defineReactive(obj, key, val) {
    // TODO 递归遍历
  }
}
```

- watcher.js

```js
export default class Watcher {
  constructor(vm, key, cb) {}

  /** 当数据变化的时候更新视图 */
  update() {}
}
```

- compiler.js

```js
export default class Compiler {
  constructor(vm) {
    this.compiler(vm);
  }

  /** 编译元素 */
  compiler(el) {}
}
```

11. 声明好了之后如何使用呢?

在 `vue.js` 的 `constructor` 中进行调用

```js
// 实例化 observer 对象, 监听数据变化
new Observer(this.$data);

// 实例化 compiler 对象, 解析指令和模板表达式
new Compiler(this);
```

12. 接下来就要实现各个类了

13. 先来实现 `Dep`

```js
/**
 * 发布订阅模式
 * 存储所有的观察者, watcher
 * 每个 watcher 都有一个 update 方法
 * 通知 subs 里的每个 watcher 实例, 触发 update 方法
 */

export default class Dep {
  constructor() {
    // 存储所有的观察者
    this.subs = [];
  }

  /** 添加观察者 */
  addSub(watcher) {
    if (watcher && watcher.update) {
      this.subs.push(watcher);
    }
  }

  /** 发送通知 */
  notify() {
    this.subs.forEach((watcher) => {
      watcher.update();
    });
  }
}

// Dep 在哪里实例化？在哪里 addSub？
// Dep notify 在哪里调用?
```

14. 实现 `Watcher`

```js
import Dep from "/dep.js";

export default class Watcher {
  /**
   *
   * @param {*} vm vue 实例
   * @param {*} key data 中的属性名
   * @param {*} cb 负责更新视图的回调函数
   */
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;

    // 同一时间只维护一个 watcher
    // 首先把当前的 watcher 挂在 Dep.target 上
    Dep.target = this;

    // 初始化的时候, 把旧值保存
    // 注意: 这里触发 get 方法, 在 get 里会触发一些操作(把当前的 watcher 添加到 Dep 依赖数组里面去)
    this.oldValue = vm[key];

    // 防止重复注册, 置为 null, 而且前面已经添加过了, 这里也就没用了
    // 其实是一个兜底的逻辑, 因为可能太多地方监听了, 不重置可能会有问题, 而且这也可以释放内存
    Dep.target = null;
  }

  /** 当数据变化的时候更新视图 */
  update() {
    let newValue = this.vm[this.key];
    if (this.oldValue === newValue) {
      return;
    }
    this.cb(newValue);
  }
}

// 在 Watcher 初始化获取 oldValue 的时候会做哪些操作?
// 通过 vm[key] 获取 oldValue 的时候, 为什么要将当前的实例挂在 Dep 上, 获取之后为什么又置为 null 了?
// update 方法是在什么时候执行的？

// 第一个问题: 初始化获取 oldValue 的时候, 会触发对应 key 的 getter 方法, 在获取 oldValue 前把当前的 watcher 挂
// 在了 Dep.target 上, 那触发 getter 方法的时候就可以把当前的 watcher 添加到依赖数组中
// 第二个问题: 因为挂在 Dep 上是为了获取 oldValue 的时候可以添加当前的 watcher, 那添加好了就不用挂在 Dep 上了, 就可以
// 置为 null 了, 而且防止重复注册
// 第三个问题: update 方法是在监听的 key 被设置新值, 触发了该 key 的 setter 方法中调用的, 在这里, 会遍历依赖数组的 watcher,
// 去执行 watcher 的 update 方法
```

15. 实现 `Compiler`

```js
import Watcher from "/watcher.js";

export default class Compiler {
  constructor(vm) {
    this.vm = vm;
    this.el = vm.$el;
    this.methods = vm.$methods;

    this.compiler(vm.$el);
  }

  /** 编译元素 */
  compiler(el) {
    const childNodes = el.childNodes;

    Array.from(childNodes).forEach((node) => {
      if (this.isTextNode(node)) {
        // 文本节点
        this.compileText(node);
      } else if (this.isElementNode(node)) {
        // 元素节点
        this.compileElement(node);
      }

      // 子节点调用
      if (node.childNodes && node.childNodes.length > 0) {
        this.compiler(node);
      }
    });
  }

  // 编译子节点
  compileText(node) {
    // {{msg}} msg hello world
    const reg = /\{\{(.+?)\}\}/; // 捕获分组
    const value = node.textContent; // node 节点内容{{msg}}

    if (reg.test(value)) {
      const key = RegExp.$1.trim(); // msg
      node.textContent = value.replace(reg, this.vm[key]);

      new Watcher(this.vm, key, (newValue) => {
        // 进行视图的更新
        node.textContent = newValue;
      });
    }
  }

  // 编译子元素
  compileElement(node) {
    const attributes = node.attributes;
    if (attributes.length) {
      Array.from(attributes).forEach((attr) => {
        // 遍历元素节点的所有属性
        const attrName = attr.name; // v-model v-html v-on:click
        if (this.isDirective(attrName)) {
          let directiveName =
            attrName.indexOf(":") > -1
              ? attrName.substr(5)
              : attrName.substr(2);
          const key = attr.value;
          // TODO 更新元素节点
          this.update(node, key, directiveName);
        }
      });
    }
  }

  update(node, key, directiveName) {
    // v-model v-text v-html v-on:click
    const updateFn = this[directiveName + "Updater"];
    updateFn && updateFn.call(this, node, this.vm[key], key, directiveName);
  }

  /** 解析 v-text */
  textUpdater(node, value, key) {
    // 这里只是简单的实现一下, 其实并不是直接修改 textContent, 这样整个文本值都会被替换
    node.textContent = value;
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue;
    });
  }

  /** 解析 v-modal */
  modelUpdater(node, value, key) {
    node.value = value;
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue;
    });

    // 双向绑定
    node.addEventListener("input", () => {
      this.vm[key] = node.value;
    });
  }

  /** 解析 v-html */
  htmlUpdater(node, value, key) {
    node.innerHTML = value;
    new Watcher(this.vm, key, (newValue) => {
      node.innerHTML = newValue;
    });
  }

  /** 解析v-on:click */
  clickUpdater(node, value, key, directiveName) {
    node.addEventListener(directiveName, this.methods[key]);
  }

  // 是否为文本节点
  isTextNode(node) {
    return node.nodeType === 3;
  }

  // 是否为元素节点
  isElementNode(node) {
    return node.nodeType === 1;
  }

  isDirective(attrName) {
    return attrName.startsWith("v-");
  }
}
```

16. 实现 `Observer`

```js
import Dep from "/dep.js";

export default class Observer {
  constructor(data) {
    this.traverse(data);
  }

  /** 递归遍历 data 里的所有属性 */
  traverse(data) {
    if (!data || typeof data !== "object") {
      return;
    }

    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
    });
  }

  /** 给传入的对象设置 getter/setter */
  defineReactive(obj, key, val) {
    // 递归遍历
    this.traverse(val);
    const that = this;
    const dep = new Dep();

    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get() {
        Dep.target && dep.addSub(Dep.target);
        // 注意, 这里是直接返回传入的 val, 并不是获取 obj 里的 val, 不会造成死循环
        return val;
      },
      set(newValue) {
        if (newValue === val) {
          return;
        }
        val = newValue;
        that.traverse(newValue); // 有可能设置了一个对象, 那也要去给这个对象设置 getter, setter
        dep.notify();
      },
    });
  }
}
```

### 解答

1. Dep 在哪里实例化？在哪里 addSub？
2. Dep notify 在哪里调用?

> 第一个问题: Dep 在 Observer 中遍历 data 的时候实例化的, 在 Observer 中重写了 data 中 key 的 getter,
> 那这个时候肯定是某处的订阅该 key 的 watcher 触发了这个 getter 操作, 那这个时候就把当前触发这个方法的 watcher
> 添加到 Dep 中, 那 watcher 是通过在初始化的时候挂在了 Dep.target, 然后再去获取旧值, 由此触发的 getter, 那在
> Observer 中添加完了当前的 watcher 之后呢, 就可以把 Dep.target 置为 null 了
>
> 第二个问题: Dep notify 是在 Observer 中遍历 data, 劫持 key 的 setter 方法中调用的, 这个时候调用 notify 方法
> notify 方法中会遍历订阅的 watcher, 去调用 watcher 的 update 方法, 那 update 方法就会获取到最新的值, 然后去进行视图的更新

3. 在 Watcher 初始化获取 oldValue 的时候会做哪些操作?
4. 通过 vm[key] 获取 oldValue 的时候, 为什么要将当前的实例挂在 Dep 上, 获取之后为什么又置为 null 了?
5. update 方法是在什么时候执行的？

> 第一个问题: 初始化获取 oldValue 的时候, 会触发对应 key 的 getter 方法, 在获取 oldValue 前把当前的 watcher 挂
> 在了 Dep.target 上, 那触发 getter 方法的时候就可以把当前的 watcher 添加到依赖数组中
>
> 第二个问题: 因为挂在 Dep 上是为了获取 oldValue 的时候可以添加当前的 watcher, 那添加好了就不用挂在 Dep 上了, 就可以
> 置为 null 了, 而且防止重复注册
>
> 第三个问题: update 方法是在监听的 key 被设置新值, 触发了该 key 的 setter 方法中调用的, 在这里, 会遍历依赖数组的 watcher,
> 去执行 watcher 的 update 方法

6. 为什么 Dep 每次都要实例化一下呢?

因为 dep 其实是跟 key 绑定的, 也就是每次实例化的 dep 其实都是保存同一个 key 的 watcher

7. 这个 this.oldValue 其实是每次初始化的初始值?

现在实现的其实是一次渲染, 没有 rerender, 所以现在是保存的初始值, 但是 Vue 是一个非常完善的机制, 它又重新渲染, 那它的 oldValue 就会正确的保存, 也就是每次 rerender 都会执行 compilerText 等

8. typescript 用的多吗？

用的非常多, 特别是在很多人协作的大一些的项目里, 对于类型的校验, 通过 ts 静态的代码检查, 它会大大地降低开发的沟通成本.

9. 有什么方法可以在父组件里获取子组件的引用?

通过 ref 就可以, 在父组件里给子组件绑定一个 ref, 在父组件里就可以通过 this.ref.xxx 来获取它了

10. 解决权限问题算是项目亮点吗？

亮点: 之前遇到过一个人, 他的是动态权限的

就一个项目中通常会有路由权限, 按钮权限, 数据权限, 有不同的粒度

可能就是服务端写死了, 哪些角色有哪些权限, 然后在登录的时候获取该用户的信息, 然后看看这个用户有哪些路由, 这就算是一个静态的权限, 因为每次要添加一个新的权限的时候, 都要前端代码去改, 去添加一个新的路由, 然后你的后端可能也要通过一些配置去添加

然后那个的话是通过一个系统去实现复杂的动态的权限系统

11. 二三面挂都没什么问题, 一面过了说明基础还是有的, 二面可能是进阶的一些东西, 比如问你一些原理, 一些算法, 字节对算法还是有要求的, 三面可能是业务不匹配

12. 现在简历太多了, 考算法是很好的筛选人的一道门槛, 随着工作年限, 对算法的能力要求是越来越低的, 对业务和架构是越来越高的

13. 几轮面试

一面问你一些项目的东西, 让你介绍一下项目, 问一些基础的东西, 背一些八股文之类的
二面的话问一些进阶的东西, 可能让你再挑一个没介绍的项目说一下, 包括算法, 包括前端代码实现
三面的话, 业务面的话就不一定是前端面了, 它可能是服务端, 它可能会问你计算机只是以及算法的东西, 以及整个业务的东西

14. 内推

社招也会卡的, 只是内推更没那么严格

15. vue3 用的多吗?

正式环境还是 vue2 用的多些, 因为它用了 proxy, 可能存在一些浏览器兼容的问题, 正式环境还是 vue2 多一些

### 测试

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>basic-vue</title>
  </head>
  <body>
    <div id="app">
      <div>{{msg}}</div>
      <div v-text="text"></div>
      <div v-html="html"></div>
      <input v-model="count" />
      <div>{{count}}</div>
      <div v-on:click="sayHello">sayHello</div>
    </div>
    <script src="./index.js" type="module"></script>
  </body>
</html>
```

index.js

```js
import Vue from "/vue.js";

const vm = new Vue({
  el: "#app",
  data: {
    msg: "basic-msg",
    text: "test 文本",
    html: "<p>html文本</p>",
    count: 0,
  },
  methods: {
    sayHello() {
      alert("hello world");
    },
  },
});

console.log(vm);
```

内卷是系统的错误, 努力是个体的正确 !

内不内卷先不说, 技术是核心, 个人成长才是最重要的
