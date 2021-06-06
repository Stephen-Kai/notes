// 一开始呢, 只有两种作用域, 全局作用域 & 函数作用域
// 所以要解决不同模块间变量命名冲突呢, 有两种形式, 一种是给每个变量重命名, 全局变量唯一的一个标识
// 但是上面的方法很麻烦, 所以可以使用函数作用域, 给每一个模块呢, 用函数进行包裹, 这样就可以隔离每个模块的作用域

const path = require('path');
const fs = require('fs');
const vm = require('vm'); // 虚拟机

function r(fileName) {
    // 接收到相对路径, 拼接出绝对路径, 因为绝对路径比较严谨, 在 Node.js 中最好使用绝对路径, 避免产生一些错误
    const pathToFile = path.resolve(__dirname, fileName);
    const content = fs.readFileSync(pathToFile, 'utf-8');

    // 包裹一个函数
    const wrapper = [
        '(function(require, module, module.exports) {',
        '})'
    ]

    const wrapperContent = wrapper[0] + content + wrapper[1];

    console.log(content, typeof content);

    // 让代码从一个字符串变成了可执行的代码块
    const script = new vm.Script(wrapperContent, {
        filename: 'index.js'
    });

    // 因为有些文件可能会往全局上挂载一个方法, 那其他文件就会收到影响
    const result = script.runInThisContext();

    const module = {
        exports: {

        }
    }

    result(r, module, module.exports );
}

r('./module.js');