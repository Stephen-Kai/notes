/**
 * 发布订阅模式
 * 存储所有的观察者, watcher
 * 每个 watcher 都有一个 update 方法
 * 通知 subs 里的每个 watcher 实例, 触发 update 方法
 */

export default class Dep {
    constructor() {
        // 存储所有的观察者
        this.subs = [];
    }

    /** 添加观察者 */
    addSub(watcher) {
        if(watcher && watcher.update) {
            this.subs.push(watcher);
        }
    }

    /** 发送通知 */
    notify() {
        this.subs.forEach((watcher) => {
            watcher.update();
        })
    }
}

// Dep 在哪里实例化？在哪里 addSub？
// Dep notify 在哪里调用?

// 第一个问题: Dep 在 Observer 中遍历 data 的时候实例化的, 在 Observer 中重写了 data 中 key 的 getter, 
// 那这个时候肯定是某处的订阅该 key 的 watcher 触发了这个 getter 操作, 那这个时候就把当前触发这个方法的 watcher
// 添加到 Dep 中, 那 watcher 是通过在初始化的时候挂在了 Dep.target, 然后再去获取旧值, 由此触发的 getter, 那在 
// Observer 中添加完了当前的 watcher 之后呢, 就可以把 Dep.target 置为 null 了

// 第二个问题: Dep notify 是在 Observer 中遍历 data, 劫持 key 的 setter 方法中调用的, 这个时候调用 notify 方法
// notify 方法中会遍历订阅的 watcher, 去调用 watcher 的 update 方法, 那 update 方法就会获取到最新的值, 然后去进行视图的更新