# cachePromise

### 前言

像刚刚提到的, 所有的 Promise 在实例化的时候就已经执行了, 那利用这点可以做一些事情

这道题目的意义是, 比如要去调用一个接口, 这个请求调用的是一个常量, 可能很多页面都使用到了, 那如果没有全局的状态管理, 那每个页面都调用一遍, 执行一遍, 也会比较浪费服务器的性能(让我想起了小程序做的获取登录状态的优化)

那这里使用装饰器来实现一遍

### 装饰器科普

看看文章解析: https://jelly.jd.com/article/6030875363dc65014d6fb76f

target 是所属类的原型
name 是修饰的属性名称
descriptor 是修饰的属性描述符号, 如 writable 这些配置等等, value 是属性值, 参考 Object.defineProperty

ES6 中定义一个类的写法，其实只是一个语法糖，而实际上当我们给一个类添加一个属性的时候，会调用到 Object.defineProperty 这个方法，它会接受三个参数：target 、name 和 descriptor

```js
// 属性描述符
let descriptor = {
  value: function () {
    console.log("meow ~");
  },
  enumerable: false,
  configurable: true,
  writable: true,
};

// 经过 readonly 装饰器修饰后的属性描述符
descriptor = readonly(Cat.prototype, "say", descriptor) || descriptor;

// ES6中 给类添加属性
Object.defineProperty(Cat.prototype, "say", descriptor);
```

当装饰器作用于类本身的时候，我们操作的对象也是这个类本身，而当装饰器作用于类的某个具体的属性的时候，我们操作的对象既不是类本身，也不是类的属性，而是它的描述符（descriptor），而描述符里记录着我们对这个属性的全部信息，所以，我们可以对它自由的进行扩展和封装，最后达到的目的呢，就和之前说过的装饰器的作用是一样的。

当然，如果你喜欢的话，也可以直接在 target 上进行扩展和封装

### 实现

刷新肯定就没了, 那没什么办法, 装饰器是 es7 的, 如果不支持可能要安装一个 babel 插件

有缓存, 就要考虑时效, 没有任何一个缓存是永久有效的, 在这里在去标识一下过期时间啊

```js
const cacheMap = new Map();

function enableCache(target, name, descriptor) {
  const val = descriptor.value;
  descriptor.value = async function (...args) {
    const cacheKey = `${name}${JSON.stringify(args)}`;
    if (!cacheMap.get(cacheKey)) {
      const cacheValue = Promise.resolve(val.apply(this, args)).catch((_) => {
        cacheMap.set(cacheKey, null);
      });
      cacheMap.set(cacheKey, cacheValue);
    }
    return cacheMap.get(cacheKey);
  };
  return descriptor;
}

class PromiseClass {
  @enableCache()
  static async getInfo() {}
}

PromiseClass.getInfo.then(...).catch(...);
```
