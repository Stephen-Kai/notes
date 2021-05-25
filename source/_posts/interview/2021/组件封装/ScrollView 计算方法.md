# ScrollView

## 简介

需求驱动, 滚动的计算方法, 支持包裹内容滚动加载

## 功能点

1. 需要提供 triggerHeight, 距离底部多少调用 loadMore 函数
2. 需要提供 scroll 展示状态 数据为空｜加载中｜没有更多数据｜加载失败
3. 如果状态为失败, 需要提供 reload 方法
4. 需要提供滚动到顶部方法, 那这里使用的是一个 toTopKey, 监听有变化则会自动滚动到顶部

## api

那基于以上的功能点，其实 组件的 props 就可以梳理出来了, 需要提供 targetRef, toTopKey 来支持滚动到顶部, 需要提供 loadMore 和 reload 和 triggerHeight 来实现请求, 需要提供 status 来展示 scroll 展示状态

## 实现

1. 首先呢会有一个容器, 展示 children, 然后监听这个容器的滚动事件, 到底部就触发 loadMore 事件
2. 底部事件是通过 const isBottom = scrollTop + clientHeight + triggerHeight > scrollHeight;
3. 然后遇到问题一，这个时候可以会触发多次, 于是加了一个 load 的节流阀作为 props, 当发出了请求设置节流阀为 false, 请求回来则设置为 true
4. 这个时候又遇到一个问题, 由于外部的素材选择器其实是响应式的，并不是固定宽度, 所以在一血屏幕比较大的, 默认设置为 20 张图根本占不满, 那就不具备触发 loadMore 的条件
5. 解决, targetRef.current.offsetHeight < scrollRef.current.offsetHeight 就触发 loadMore 事件
6. targetRef.current.offsetHeight 是外部实际的图片容器占高, scrollRef.current.offsetHeight 是最外层滚动容易的高度
7. 那如果数据加载完了，怎么办呢?
8. 其实如果业务调用方判断数据加载完了，可以设置 status 为 notMore, 那组件内部判断 status 不为 undefined 其实就不会触发加载的, 像 status 为 loading, empty 都不会触发加载
9.
