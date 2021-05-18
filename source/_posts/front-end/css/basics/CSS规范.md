# CSS 规范

> 采用 BEM 命名规范
> B 意为『区块』（‘Block’）
> E 代表元素（Elements）
> M 代表修饰符（Modifiers）

## 解决问题

1: 仅从名字就能知道一个 CSS 选择器具体做什么
2: 从名字能大致清楚一个选择器可以在哪里使用
3: 从 CSS 类的名称可以看出它们之间的联系

## BEM 命名规范

1: 区块(B): 组件样式使用连字符分隔的字符串

```
.super-man {
  border: 1px solid red;
}
```

2: 子组件(E): 组件的子组件通过在两条下划线后加上元素名称来产生

```
// super man 的头
.super-man__head {

}
// super man 的手臂
.super-man__arms {

}
// super man 的腿
.super-man__feet {

}
```

3: 修饰符(M): 修饰符的类名都可以通过在两条连字符后加上元素名来产生, 双连字符指代修饰符

```
.super-man--red {

}
.super-man--blue {

}
.super-man__head--small {

}
.super-man__head--big {

}
```

## 在项目中遇到的问题

1: 如果某个类名跟 javascript 关联, 如使用了 document.querySelector() 来获取 Node 节点, 可使用 js- 开头

```
.js-super-man__food {

}
```

## 注释

- 多写点 CSS 注释

## 参考文章

- [BEM - 命名规范](http://getbem.com/naming/)
- [掘金 - CSS 命名规范](https://juejin.cn/post/6844903556420632583)
