import Dep from '/dep.js';

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
        if(this.oldValue === newValue) {
            return
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