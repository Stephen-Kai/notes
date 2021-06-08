# babel 原理解析

### 过程

主要是会编译成 AST (Abstract Syntax Tree)

三个步骤(字符串到字符串的过程): 解析 -> 转换 -> 生成

### babel 原理解析

(add 2 (subtract 40 2)) -> add(2,subtract(40,2));

像 babel 它可以对不同的语言进行转化, 基于分词结果生成一个合法的抽象语法树的内容

Babel 的三个主要处理步骤分别是： 解析（parse）-> 转换（transform）-> ⽣成（generate）

词法分析阶段把字符串形式的代码转换为 令牌（tokens） 流。

针对不同的⼯具，最终也有不同的效果：
@babel/parser : 转化为 AST 抽象语法树；
@babel/traverse 对 AST 节点进⾏递归遍历；
@babel/types 对具体的 AST 节点进⾏进⾏修改；
@babel/generator : AST 抽象语法树⽣成为新的代码；

那通常 babel 插件主要就是处理 DFS 的一些内容

## 实现

(add 2 (subtract 40 2)) -> add(2,subtract(40,2));

达到转化的效果

```js
// 分词, 类型有 (, ), string, number, string & number 可能是连续的
// continue 会跳过本次循环, 进入下一次循环
function generateToken(str) {
  let current = 0;
  let tokens = [];

  while (current < str.length) {
    let char = str[current];

    // 匹配 ( 括号
    if (char === "(") {
      tokens.push({
        type: "paren",
        value: "(",
      });
      current++;
      continue;
    }

    // 匹配 ) 括号
    if (char === ")") {
      tokens.push({
        type: "paren",
        value: ")",
      });
      current++;
      continue;
    }

    // 匹配空格, 空格不需要添加
    if (/[\s\,]/.test(char)) {
      current++;
      continue;
    }

    // 匹配数字, 数字有可能是连续的
    if (/[0-9]/.test(char)) {
      let numberValue = "";
      while (/[0-9]/.test(char)) {
        numberValue += char;
        char = str[++current];
      }
      tokens.push({
        type: "number",
        value: numberValue,
      });
      continue;
    }

    // 匹配数字, 数字有可能是连续的
    if (/[a-zA-Z]/.test(char)) {
      let stringValue = "";
      while (/[a-zA-Z]/.test(char)) {
        stringValue += char;
        char = str[++current];
      }
      tokens.push({
        type: "name",
        value: stringValue,
      });
      continue;
    }

    console.log(char);

    throw new TypeError("未能识别的字符");
  }

  return tokens;
}

// 生成 AST
function generateAST(tokens) {
  let current = 0;
  let ast = {
    type: "Program",
    body: [],
  };

  function walk() {
    let token = tokens[current];

    if (token.type === "number") {
      current++;
      return {
        type: "NumberLiteral",
        value: token.value,
      };
    }

    if (token.type === "paren" && token.value === "(") {
      token = tokens[++current];
      let node = {
        type: "CallExpression",
        name: token.value,
        params: [],
      };
      token = tokens[++current];
      while (
        token.type !== "paren" ||
        (token.type === "paren" && token.value !== ")")
      ) {
        node.params.push(walk());
        token = tokens[current];
      }
      current++;
      return node;
    }
  }

  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
}

// 转换成新的 AST(参考 babel, 它会把我们的代码转成 es6 的 ast, 然后转为 es5 的 ast, 再生成 es5 的代码)
function transform(ast) {
  const newAst = {
    type: "Program",
    body: [],
  };

  // 保存上下文
  ast._context = newAst.body;

  // 可以注册一些事件, 比如遇到哪些 type 类型要做什么处理等等
  DFS(ast, {
    NumberLiteral: {
      enter(node, parent) {
        // 在父级上下文中保存当前节点信息, 供 CallExpression 调用
        parent._context.push({
          type: "NumberLiteral",
          value: node.value,
        });
      },
    },
    CallExpression: {
      enter(node, parent) {
        let expression = {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: node.name,
          },
          arguments: [],
        };
        // 这样呢, 当我们每次执行到 type 为 NumberLiteral 的时候, 就可以把对应的 value push 到对应CallExpression的 arguments 里面去
        node._context = expression.arguments;

        // 判断如果父级不是 CallExpression 类型, 再进行一些操作
        if (parent.type !== "CallExpression") {
          expression = {
            type: "ExpressionStatement",
            expression: expression,
          };
        }

        parent._context.push(expression);
      },
    },
  });

  return newAst;
}

// DFS 深度优先遍历(像 AST 这种多分支的树, 很适合 DFS 深度优先遍历)
function DFS(ast, visitor) {
  // 遍历数组的方法, 像 type 为 Program 有 body, type 为 CallExpression 有 params
  function traverseArray(children, parent) {
    children.forEach((child) => traverse(child, parent));
  }

  function traverse(node, parent) {
    const method = visitor[node.type];
    // 钩子函数, 在处理前执行
    if (method && typeof method.enter === "function") {
      method.enter(node, parent);
    }

    switch (node.type) {
      case "Program": {
        // 有 children, 遍历 children
        traverseArray(node.body, node);
        break;
      }
      case "CallExpression": {
        traverseArray(node.params, node);
        break;
      }
      case "NumberLiteral": {
        break;
      }
      default: {
        break;
      }
    }

    // 钩子函数, 在处理后执行
    if (method && typeof method.exit === "function") {
      method.exit(node, parent);
    }
  }

  return traverse(ast, null);
}

// 基于 AST 生成代码, 可以把生成的 AST 放到 json.net 网站格式化对比看一下, 帮助理解
function generate(ast) {
  switch (ast.type) {
    case "Program": {
      // 处理程序的 body, 每一行表达式呢加上换行
      return ast.body.map((subAst) => generate(subAst)).join("\n");
    }
    case "ExpressionStatement": {
      // 表达式整体, 需要加上 ;
      return generate(ast.expression) + ";";
    }
    case "Identifier": {
      // 直接返回 name
      return ast.name;
    }
    case "NumberLiteral": {
      // 处理数字, 直接返回 value
      return ast.value;
    }
    case "CallExpression": {
      // 处理函数调用, 递归调用 callee, 其实就会返回 name, 然后拼接上括号以及中间的参数, 中间的参数需要加上,
      return (
        generate(ast.callee) +
        "(" +
        ast.arguments.map((arg) => generate(arg)).join(",") +
        ")"
      );
    }
  }
}

function parser(input) {
  // 分词处理
  const tokens = generateToken(input);
  // 解析为 AST
  const ast = generateAST(tokens);
  // 转换为新的 AST
  const newAst = transform(ast);
  // 根据新的 AST 生成代码
  return generate(newAst);
}

module.exports = parser;
```

```js
const parser = require("./index");

const str = "(add 2 (subtract 40 2))";

const ast = parser(str);

// console.log(ast);
console.log(JSON.stringify(ast));
```
