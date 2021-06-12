import Dep from '/dep.js';

export default class Observer {
    constructor(data) {
        this.traverse(data);
    }

    /** 递归遍历 data 里的所有属性 */
    traverse(data) {
        if(!data || typeof data !== 'object') {
            return
        }

        Object.keys(data).forEach((key) => {
            this.defineReactive(data, key, data[key]);
        })
    }

    /** 给传入的对象设置 getter/setter */
    defineReactive(obj, key, val) {
        // 递归遍历
        this.traverse(val);
        const that = this;
        const dep = new Dep();
        
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            get() {
                Dep.target && dep.addSub(Dep.target);
                // 注意, 这里是直接返回传入的 val, 并不是获取 obj 里的 val, 不会造成死循环
                return val;
            },
            set(newValue) {
                if(newValue === val) {
                    return
                }
                val = newValue;
                that.traverse(newValue); // 有可能设置了一个对象, 那也要去给这个对象设置 getter, setter
                dep.notify();
            }
        });
    }
}