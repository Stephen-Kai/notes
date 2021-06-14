# useState 简单实现

将所有的 hooks 都保存在一个全局数组变量中, 每次更新都改变对应下标的数组内容, 这也是为什么 hooks 不能在条件语句中使用, 需要保证更新前后 hooks 的执行顺序不变. (如果有 hooks 在更新时候与之前的执行顺序发生变化, 会导致后面的 hooks 的执行顺序都发生错误, 然后整个都乱了.)

```js
const hooks = []; // 全局的存储hook的变量
let currentIndex = 0; // 全局的, hook 执行下标
function useState(initVal) {
  hooks[currentIndex] = hooks[currentIndex] || initVal; // 判断一下是否需要初始化
  const _currentIndex = currentIndex; // currentIndex 是全局可变的, 需要保存本次执行顺序的下标
  const setState = (newState) => {
    hooks[_currentIndex] = newState; // 赋值, 更新数据
  };
  return [hooks[currentIndex++], setState]; // 为了多次调用hook, 每次执行 currentIndex + 1
}
```
