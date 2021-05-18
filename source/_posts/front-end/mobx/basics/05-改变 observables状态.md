---
title: 05-改变 observables状态
tag: mobx
catogory:
  - front-end
  - mobx
---

# mobx 入门

## 改变 observables 状态

### 1. action

接上面案例，添加 action 到类中：

```js
class Store {
  @observable arr = [];
  @observable obj = { a: 1 };
  @observable map = new Map();

  @observable str = "hello";
  @observable num = 123;
  @observable bool = false;

  @computed get result() {
    return this.str + this.num;
  }

  @action bar() {
    this.str = "world";
    this.num = 40;
  }
}
const store = new Store();

//调用action，只会执行一次
store.bar();
```

### 2. action.bound

`action.bound` 可以用来自动地将动作绑定到目标对象。

```js
class Store {
  @observable arr = [];
  @observable obj = { a: 1 };
  @observable map = new Map();

  @observable str = "hello";
  @observable num = 123;
  @observable bool = false;

  @computed get result() {
    return this.str + this.num;
  }

  @action bar() {
    this.str = "world";
    this.num = 40;
  }

  //this 永远都是正确的
  @action.bound foo() {
    this.str = "world";
    this.num = 40;
  }
}

const store = new Store();
setInterval(store.foo, 1000);
```

### 3. runInAction

`action` 只能影响正在运行的函数，而无法影响当前函数调用的异步操作。如果你使用 async function 来处理业务，那么我们可以使用 `runInAction` 这个 API 来解决这个问题。

```js
@action async fzz() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        num: 220,
        str: 'world'
      })
    }, 1000)
  })
  runInAction(()=>{
    store.num = 220
    store.str = 'world'
  })
}
```
