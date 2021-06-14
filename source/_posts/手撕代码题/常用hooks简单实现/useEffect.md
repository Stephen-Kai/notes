# useEffect 简单实现

```js
const hooks = []; // 存储 hook 变量
const currentIndex = 0; // 全局 hook 下标
// 接收两个参数, callback 回调, depArray 依赖数组
function useEffect(callback, depArray) {
  const hasNoDeps = !depArray; // 判断是否有依赖数组, 如果没有每次都要更新, 即 hasNoDeps 为true, 每次都更新
  const hook = hooks[currentIndex] || {}; // hooks 是 {}
  const deps = hooks && hooks.deps; // undefined
  const hasChangeDeps = deps
    ? !depArray.every((el, i) => el === deps[i])
    : true; // 初始执行一遍
  // 如果依赖数组发生改变或者没有依赖数组
  if (hasChangeDeps || hasNoDeps) {
    callback && callback();
    // 更新 deps
    hooks[currentIndex].deps = depArray;
  }
  currentIndex++;
}
```
