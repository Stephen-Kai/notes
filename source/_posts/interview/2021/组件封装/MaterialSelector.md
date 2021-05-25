素材选择组件功能:

1: 可以选择素材, 把素材回传给外部
2: 支持上传素材
3: 筛选条件: 分组名, 素材名称, 分页
4: 可定制选择条件

问题点: 这个组件原本是分页, 后面改成滚动查询, 遇到的问题点

### 1: 如果 切换分组 / 搜索素材名称, 列表是需要重置的, 而如果是滚动, 则需要进行数据追加 ?

该请求函数使用 useCallback 包裹, 依赖数组包括 groupName, pageIndex, searchKey 等, 使用 useEffect 监听 useCallback, 如果 useCallback 变化 则 发送请求, 请求函数中获取到数据后根据 pageIndex 是否为 1 来判断是重置还是追加, 当 groupName, searchKey 发生变化时, 重置 pageIndex

### 2: 如果用户暴力操作切换分组, 请求过于频繁 ?

1、切换素材组，加上防抖
2、切换素材组，取消上一次接口请求：https://github.com/umijs/umi-request/blob/master/README_zh-CN.md
cancel token 方案
3、groupName 变化及时清理素材列表，避免影响 scrollView 组件计算

### 3: 为什么不是请求函数 getMaterialList 加防抖, 而是加在点击分组上呢 ?

因为 ScrollView 会在 autoLoad & 到达滚动条件时触发 loadMore，loadMore 是通过设置 pageIndex ++ 来触发加载请求, 目前 autoLoad 开关 是在请求前关闭, 请求完成/失败打开, 如果请求函数防抖, autoLoad 不会影响 scrollView 触发 loadMore, 所以, 如果用户操作在短时间内多次触发滚动加载更多, pageIndex ++, 但是请求可能由于防抖, 导致跳过部分数据

### 4: 为什么请求列表数据, 不做 Notification.error 处理, 为什么明明取消了上一次请求, 后台请求未取消 ?

切换素材组取消上一次请求 cancel token 方案, 详细见 https://github.com/umijs/umi-request/blob/master/README_zh-CN.md
原生 fetch 本身不支持中断请求, umi-request 提供的 cancelToken 实际上是对 promise 的 reject, 并不是真的中断请求(见 issues), 所以会抛出异常, 但是目前 Service 层统一做了处理, 返回了默认 err 信息, 无法判断是否是取消抛出的异常

### 5: 为什么切换分组要清空数据再加 loading ?

数据重置 或 数据追加 是在请求数据回来后进行判断处理, 那切换分组的 loading 态 和 追加的 loading 都是展示在目前列表下, 可能会影响滚动计算？还有一点可能是体验吧.

### 6: 为什么要使用 renderDataCache / groupNameCache / statusCache 缓存之前的数据 ？

切换分组, 对 onChange 函数（见代码）做了防抖处理, MaterialScrollList 会在 context 中取得 groupName, 监听, 并通过设置 pageIndex 为 1 来触发请求, 并对数据进行重置

问题场景 1: 切换分组加了防抖, 那在频繁切换分组时, 右边列表状态无变化？
处理: 在 context 中 添加了 isGroupChanging 和 setIsGroupChanging 来标识并修改 是否是切换分组态, 切换分组时, 首先设置 isGroupChanging 为 true, MaterialScrollList 监听到 isGroupChanging 清空数据并展示 loading 态

问题场景 2: 快速切换分组, a -> b -> a, 这时 MaterialScrollList 会一直 loading?

处理:
由于 a -> b -> a, MaterialScrollList 监听到 isGroupChanging 清空数据并展示 loading 态

但其实 切换分组结束后, 分组名为 a 并没有发生变化, 所以不会触发请求, 即当前列表已经被清空了, 并且 loading 无处关闭, 即使在 isGroupChanging 为 false 关闭, 那列表也是错误状态

在每一次请求数据成功后, 设置 renderDataCache / groupNameCache / statusCache 缓存之前的数据
如果 isGroupChanging 为 false, 判断 context 中的 groupName 是之前的 groupName, 则进行列表状态和数据恢复
如果 context 中的 groupName 不为之前的 groupName, 则会重新触发请求

### 7: 为什么取消请求放在 getMaterialList 中而不是 切换分组的时候？

pageIndex, pageSize, groupName 发生变化都会导致 getMaterialList 变化, useEffect 监听到就会触发请求

问题场景: 加载了很多数据, 比如 pageIndex 为 9, 这个时候切换分组到另一个分组, 可能由于依赖的 groupName(getMaterialList 依赖的)发生变化触发一次 pageIndex 为 9 & 最新 groupName 的请求, 监听的 groupName 变化重置了 pageIndex 为 1 又触发了请求

处理: 取消请求放在 getMaterialList 中, 进入了则说明该请求肯定会进行, 而 autoLoad & autoLoadRef 可以限制 loadMore 的触发, 做到了节流, 也不会跳过数据, 注意: 看 network 判断请求是否取消成功是不准确的哦, 见上面 第二点, 可在 queryMaterial 后 log 查看.

如果放在切换分组时, 可能未成功取消, 如果 pageIndex 为 9 的数据在 pageIndex 为 1 的请求之后返回, 则数据会有问题

### more ? let me see ...
