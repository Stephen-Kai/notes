## 封装 FormItem & FormSection 挂在 FormContainer 下

https://www.react-hook-form.com/zh/v6/api#Controller
https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView

1. 已有功能: 基础表单受控组件 Input 等存在
2. WebApi 提供了 scrollIntoView 可以滚动到指定元素位置

功能: 基于 react-hook-form 封装，实现提交表单，自动跳转(scrollInToView) 到错误的表单项目
实现思路:

首先就是初始化的时候需要收集每个表单的 ref, 当提交的时候, react-hook-form 会抛出错误信息 errors, 以键值对的形式保存着校验不通过的表单的 name 和 错误信息, 那组件监听到错误信息, 需要找到最顶部的错误表单

1. 实现一个 FormContainer, 使用 useReducer 存储各表单的 ref
2. 实现一个 FormItem, 包裹表单, 初始化时 dispatch ref 给 FormContainer
3. 封装 useScrollToFirstError Hook, 输入是当前存储的各表单 ref, 还有 react-hook-form 抛出的 errors 对象, 功能是监听到错误信息时, 处理有错误时滚动到第一个表单
4. useScrollToFirstError Hook 首先收集错误表单 name 数组, 遍历这个数组, 从 ref state 中拿到对应的 ref, 找到距离顶部最近的表单 ref, 使用 scrollIntoView 滚动到具体的表单位置
