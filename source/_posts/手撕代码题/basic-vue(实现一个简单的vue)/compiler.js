import Watcher from '/watcher.js'

export default class Compiler {
    constructor(vm) {
        this.vm = vm;
        this.el = vm.$el;
        this.methods = vm.$methods;

        this.compiler(vm.$el);
    }

    /** 编译元素 */
    compiler(el) {

        const childNodes = el.childNodes;

        Array.from(childNodes).forEach((node) => { 

            if(this.isTextNode(node)) {
                // 文本节点
                this.compileText(node);
            } else if(this.isElementNode(node)) {
                // 元素节点
                this.compileElement(node);
            }

            // 子节点调用
            if(node.childNodes && node.childNodes.length > 0) {
                this.compiler(node);
            }
            
        });
    }

    // 编译子节点
    compileText(node) {
        // {{msg}} msg hello world
        const reg = /\{\{(.+?)\}\}/; // 捕获分组
        const value = node.textContent; // node 节点内容{{msg}}

        if(reg.test(value)) {
            const key = RegExp.$1.trim(); // msg
            node.textContent = value.replace(reg, this.vm[key]);

            new Watcher(this.vm, key, (newValue) => {
                // 进行视图的更新
                node.textContent = newValue;
            });
        }
    }

    // 编译子元素
    compileElement(node) {
        const attributes = node.attributes;
        if(attributes.length) {
            Array.from(attributes).forEach((attr) => {
                // 遍历元素节点的所有属性
                const attrName = attr.name; // v-model v-html v-on:click
                if(this.isDirective(attrName)) {
                    let directiveName = attrName.indexOf(':') > -1 ? attrName.substr(5): attrName.substr(2) ;
                    const key = attr.value;
                    // TODO 更新元素节点
                    this.update(node, key, directiveName);
                }
            });
        }
    }

    update(node, key, directiveName) {
        // v-model v-text v-html v-on:click
        const updateFn = this[directiveName + 'Updater'];
        updateFn && updateFn.call(this, node, this.vm[key], key, directiveName);
    }

    /** 解析 v-text */
    textUpdater(node, value, key) {
        // 这里只是简单的实现一下, 其实并不是直接修改 textContent, 这样整个文本值都会被替换
        node.textContent = value;
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue;
        })
    }

    /** 解析 v-modal */
    modelUpdater(node, value, key) {
        node.value = value;
        new Watcher(this.vm, key, (newValue) => {
            node.value = newValue;
        });
        // 双向绑定
        node.addEventListener('input', () => {
            this.vm[key] = node.value;
        });
    }

    /** 解析 v-html */
    htmlUpdater(node, value, key) {
        node.innerHTML = value;
        new Watcher(this.vm, key, (newValue) => {
            node.innerHTML = newValue;
        })
    }

    /** 解析v-on:click */
    clickUpdater(node, value, key, directiveName) {
        node.addEventListener(directiveName, this.methods[key])
    }

    // 是否为文本节点
    isTextNode(node) {
        return node.nodeType === 3;
    }

    // 是否为元素节点
    isElementNode(node) {
        return node.nodeType === 1;
    }

    isDirective(attrName) {
        return attrName.startsWith('v-');
    }
}