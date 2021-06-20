# css 世界

## css 技巧

### 页面某个模块的文字内容是动态的，可能是几个字，也可能是一句话。然后，希望文字少的时候居中显示，文字超过一行的时候居左显示

```css
.box {
  text-align: center;
}
.content {
  display: inline-block;
  text-align: left;
}
```

### 任意高度元素的展开收起动画技术

> 其中展开后的 max-height 值，我们只需要设定为保证比展开内容高度大的值就可以，因为
> max-height 值比 height 计算值大的时候，元素的高度就是 height 属性的计算高度
>
> 建议 max-height 使用足够安全的最小值，这样，收起时即使有延迟，也
> 会因为时间很短，很难被用户察觉，并不会影响体验

```css
.element {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.25s;
}
.element.active {
  max-height: 666px; /* 一个足够大的最大高度值 */
}
```

### 透明的占位图片也是多余的资源

```html
<img />
```

```css
img {
  visibility: hidden;
}
img[src] {
  visibility: visible;
}

/* 没有 src 属性时显示 alt 文字 */
img::after {
  /* 生成 alt 信息 */
  content: attr(alt);
  /* 尺寸和定位 */
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transform: translateY(100%);
  /* 来点过渡动画效果 */
  transition: transform 0.2s;
}
img:hover::after {
  /* alt 信息显示 */
  transform: translateY(0);
}
```

### hover 替换图片 url, 不过右键保存的还是原来 src 对应的图片

```html
<img src="laugh.png" />
```

```css
img:hover {
  content: url(laugh-tear.png);
}
```

### 重置样式表

```css
img {
  display: inline-block;
}

input,
textarea,
img,
video,
object {
  box-sizing: border-box;
}
```

### 标志使用<h1>标签，里面会有网站名称和标志图片使用背景图

```html
<h1>《CSS 世界》</h1>
```

```css
h1 {
  content: url(logo.png);
}

/* 在移动端使用该技术，建议使用 SVG 矢量图片(使用 content 生成图片，我们是无法设置图片的尺寸)。例如： */
h1 {
  content: url(logo.svg);
}
```

### 使用 content 使用 ... 动画

- '\A': 回车
- '\D': 换行

```html
正在加载中<dot>...</dot>
```

```css
dot {
  display: inline-block;
  height: 1em;
  line-height: 1;
  text-align: left;
  vertical-align: -0.25em;
  overflow: hidden;
}
dot::before {
  display: block;
  content: "...\A..\A.";
  white-space: pre-wrap;
  animation: dot 3s infinite step-start both;
}
@keyframes dot {
  33% {
    transform: translateY(-2em);
  }
  66% {
    transform: translateY(-1em);
  }
}
```

## 语录:

- 无论对谁太过热情, 就增加了不被珍惜的概率. 倘若没有过度的欢喜, 便不会有极度的悲伤.
