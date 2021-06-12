import Observer from '/observer.js';
import Compiler from '/compiler.js';

/**
 * 包括 vue 构造函数, 接收各种配置参数等等.
 */

export default class Vue {
    constructor(options = {}) {
        this.$options = options;
        this.$data = options.data;
        this.$methods = options.methods;

        this.initRootElement(options);

        // 通过 Object.defineProperty 来将 options.data 注入到 vue 实例中
        this._proxyData(options.data);

        // 实例化 observer 对象, 监听数据变化
        new Observer(this.$data);

        // 实例化 compiler 对象, 解析指令和模板表达式
        new Compiler(this);
    }

    /**
     * 获取根元素, 并存储到 vue 实例. 简单检查一下传入的 el 是否合法.
     */
    initRootElement(options) {
        if(typeof options.el === 'string') {
            this.$el = document.querySelector(options.el);
        }else if(options.el instanceof HTMLElement) {
            this.$el = options.el;
        }

        if(!this.$el) {
            throw new Error('传入的 el 不合法, 请传入 CSS Selector 或者 HTMLElement');
        }
    }

    _proxyData(data) {
        Object.keys(data).forEach((key) => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return data[key];
                },
                set(newValue) {
                    if(data[key] === newValue) {
                        return
                    }
                    data[key] = newValue;
                }
            });
        })
    }
}