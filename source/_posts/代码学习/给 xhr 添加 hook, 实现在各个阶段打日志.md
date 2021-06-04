### 代码题, 你能给 xhr 添加 hook, 实现在各个阶段打日志吗？

XMLHttpRequest

send
onreadystatechange
onload
onerror

方案: 重写, 面试官特别喜欢在最后出这种题目, 因为考察的点特别全面
一定要记住, 重写不是说要完全重写它所有的方法, 保存一下, 底层还是要调用它的

1. 方法的重写
2. 属性的重写

为什么不用箭头函数?
因为当 new XMLHttpRequest 的时候, 是需要把 this 绑定到新创建的实例上的, 而箭头函数没有自己的 this 指向, 不符合

前置 Hook 其实还应该有一个拦截的作用

```js
// 需求: 需要在请求各个阶段添加 Hook, 执行一些方法, 并且可以拦截
// 方案: 重写请求类(实现一个 XhrHook 类)
// 核心思路:
// 构造实例时, 保存传入的前置 Hook, 后置 Hook, 保存原有的类, 方便后面调用原来的方法, 进行初始化
// 初始化: 重写 window 上的 XHRHttpRequest 方法, 这样外部调用时使用的是我们重写的, 在这里挂载一个原有类的实例, 方便后面调用, 进行方法 & 属性的重写(这里可以拆出去)
// 重写: 遍历属性, 分为方法和属性的重写
// 方法重写, 是否有对应的前置 Hook, 有, 调用, 判断是否拦截, 调用原有类的方法实现功能, 调用后置 Hook(后置 Hook 应该可以接受到返回值)
// 属性重写, 使用 Object.defineProperty 来定义
// 总结: 写比较复杂代码的时候, 可以一点点地进行拆分, 不要在一个代码块去写很多逻辑, 可以先把一个个方法定义好, 它负责什么逻辑, 就清晰很多

const xhr = new XMLHttpRequest();

// tips: 什么叫做方法, 像 open, send 这样可以直接调用的东西叫做方法, 像 onreadystatechange, onerror 这样我们去给它赋值的叫做属性

xhr.open('GET', 'www.baidu.com', true);

xhr.send();

xhr.onreadystatechange = () => {}

xhr.onerror = () => {}
...

// XhrHook 使用方法
new XhrHook({
    open: function () {
        console.log('open');
        // 提供拦截功能, 如果 true 继续执行, 如果 false 进行拦截
        return false;
    },
    send: function () {
        console.log('send');
    },
    ...
})

// 设计
class XhrHook {
    constructor(beforeHooks, afterHooks) {
        // 保存原有的 XMLHttpRequest, 特别重要特别重要!!!
        this.XHR = window.XMLHttpRequest;
        this.beforeHooks = beforeHooks;
        this.afterHooks = afterHooks;
        this.init();
    }

    init() {
        const _this = this;
        // 重写 XHRHttpRequest 方法, 不能使用箭头函数, 指向问题
        window.XHRHttpRequest = function () {
            // 挂载原有方法的实例, 用于后面调用
            this._xhr = _this.XHR();
            this.overwrite(this);
        }
    }

    overwrite(proxyXHR) {
        for(let key in proxyXHR) {
            // 重写方法
            if(typeof proxyXHR[key] === 'function') {
                this.overwriteMethod(key, proxyXHR);
                continue();
            }
            // 重写属性
            this.overwriteAttributes(key, proxyXHR);
        }
    }

    // 重写方法
    overwriteMethod(key, proxyXHR) {
        let beforeHooks = this.beforeHooks; // 拦截的前置 Hooks
        let afterHooks = this.afterHooks; // 拦截的后置 Hooks

        proxyXHR[key] = (...args) => {

            // 前置 Hook 拦截
            if(beforeHooks[key] && typeOf beforeHooks[key] === 'function') {
                // 调用对应的 Hook
                const res = beforeHooks[key].apply(proxyXHR, args);
                // 如果返回 false, 拦截掉
                if(res === false) {
                    return
                }
            }

            // 调用原来 XHRHttpRequest 的方法
            const res = proxyXHR._xhr[key].apply(proxyXHR._xhr, args);

            // 后置 Hook 拦截
            if(afterHooks[key] && typeOf afterHooks[key] === 'function') {
                afterHooks[key].apply(proxyXHR, res)
            }

            return res;
        }

    }

    // 重写属性
    overwriteAttributes(key, proxyXHR) {
        Object.defineProperty(proxyXHR, key, this.getDescriptor(key, proxyXHR));
    }

    // 获取属性描述符, 其实不是所有的属性都要去重写, 我们需要重写的其实就是这些以 on 开头的钩子, 对于属性来说, 不必要像主动暴露
    getDescriptor(key, proxyXHR) {
        const obj = Object.create(null);
        let _this = this;

        obj.set = function (val) {
            // 保存一个私有属性, 用于以后扩展
            if(!key.startsWith('on')) {
                proxyXHR['__' + key] = val;
                return
            }

            // 以 on 开头的, 重写它的方法
            if(_this.beforeHooks[key]) {
                this._xhr[key] = function (...args) {
                    _this.beforeHooks[key].apply(proxyXHR, args);
                    val.apply(proxyXHR, args)
                }
                return;
            }

            // 原有的实例上添加对应的 val 值
            this._xhr[key] = val;
        }

        obj.get = function () {
            return proxyXHR['__' + key] || this._xhr[key];
        }

        return obj;
    }
}
```
