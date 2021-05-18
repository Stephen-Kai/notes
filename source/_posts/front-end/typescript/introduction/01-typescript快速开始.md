---
title: 01-typescript快速开始
tag: typescript
catogory:
  - front-end
  - typescript
---

### 什么是 TypeScript

TypeScript 具有类型系统，且是 JavaScript 的超集。 它可以编译成普通的 JavaScript 代码。 TypeScript 支持任意浏览器，任意环境，任意系统并且是开源的。

##### 安装 TypeScript

##### 1、在全局环境里安装 TS

```
npm install -g typescript
```

##### 2、用 tsc 命令编译 .ts 文件

app.ts 文件：

```
let title: string = 'typescript 学习笔记'
```

在命令行里输入以下命令都可以将.ts 文件编译为.js 文件：

```
tsc ./src/app.ts --outFile ./dist/app.js
tsc ./src/* --outDir ./dist --watch
```

##### 3、tsconfig.json 配置文件

在命令行里输入 `tsc --init`命令，创建一个 tsconfig.json 文件，在此配置文件里修改：

```
"outDir": "./dist",
"rootDir": "./src"
```

### 5 分钟了解 TypeScript

##### 构建第一个 TypeScript 文件

在编辑器，将下面的代码输入到 **_src/greeter.ts_** 文件里。我们注意到 **_person: string_**，表示 string 是 person 函数的参数类型注解：

```
function greeter(person: string) {
  return "Hello, " + person
}

let user = "Jane User"
console.log(greeter(user))
```

##### 类型注解

TypeScript 里的类型注解是一种轻量级的为函数或变量添加约束的方式。 在这个例子里，我们希望 greeter 函数接收一个字符串参数。 然后尝试把 greeter 的调用改成传入一个数组：

```
function greeter(person: string) {
 return "Hello, " + person
}

let user = [0, 1, 2]
console.log(greeter(user))
```

重新编译，你会看到产生了一个错误：

```
Argument of type 'number[]' is not assignable to parameter of type 'string'.
```

类似地，尝试删除 greeter 调用的所有参数。 TypeScript 会告诉你使用了非期望个数的参数调用了这个函数。 在这两种情况中，TypeScript 提供了静态的代码分析，它可以分析代码结构和提供的类型注解。

要注意的是尽管有错误，greeter.js 文件还是被创建了。 就算你的代码里有错误，你仍然可以使用 TypeScript。但在这种情况下，TypeScript 会警告你代码可能不会按预期执行。

##### 接口

让我们开发这个示例应用。这里我们使用接口来描述一个拥有 firstName 和 lastName 字段的对象。 在 TypeScript 里，只在两个类型内部的结构兼容那么这两个类型就是兼容的。 这就允许我们在实现接口时候只要保证包含了接口要求的结构就可以，而不必明确地使用 implements 语句。

```
interface Person {
  firstName: string
  lastName: string
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName
}

let user = { firstName: "Jane", lastName: "User" }
console.log(greeter(user))
```

##### 类

最后，让我们使用类来改写这个例子。 TypeScript 支持 JavaScript 的新特性，比如支持基于类的面向对象编程。让我们创建一个 Student 类，它带有一个构造函数和一些公共字段。 注意类和接口可以一起工作。

还要注意的是，在构造函数的参数上使用 public 等同于创建了同名的成员变量。

> **_注：_**public 修饰符会引发 `Parameter 'firstName' implicitly has an 'any' type.`，解决方法是在`tsconfig.json`文件中，添加`"noImplicitAny": false`，或者将`"strict": true`，改为`"strict": false`

```
class Student {
  fullName: string
  constructor(public firstName, public middleInitial, public lastName) {
 this.fullName = firstName + " " + middleInitial + " " + lastName
  }
}

interface Person {
  firstName: string
  lastName: string
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName
}

let user = new Student("Jane", "M.", "User")
console.log(greeter(user))
```
