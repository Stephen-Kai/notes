### EventBus(需要设置一个最大监听数怎么办)

加一个 maxListeners 参数, 在 on 监听时 push 前进行拦截就好了, 设计的魅力

```js
class EventEmitter {
  constructor(maxListeners) {
    this.events = {};
    this.maxListeners = maxListeners || Infinity;
  }

  on(event, cb) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    const exceed =  this.maxListeners !== Infinity &&
      this.events[event].length >= this.maxListeners；

    if ( exceed ) {
      console.warn(`您订阅的事件${event}已超过最大监听数${this.maxListeners}`);
      return this;
    }

    this.events[event].push(cb);

    return this;
  }

  once(event, cb) {
    // 包装一层, 执行的时候先移除订阅, 再执行 cb
    const func = (...args) => {
      this.off(event, func);
      cb.apply(this, args);
    };

    this.on(event, func);

    return this;
  }

  emit(event, ...args) {
    const cbs = this.events[event];

    if (!cbs) {
      console.log("暂无该订阅事件");
      return this;
    }

    cbs.forEach((cb) => cb.apply(this, args));

    return this;
  }

  off(event, cb) {
    if (!cb) {
      this.events[event] = null;
    } else {
      this.events[event] = this.events[event].filter((item) => item !== cb);
    }

    return this;
  }
}
```
