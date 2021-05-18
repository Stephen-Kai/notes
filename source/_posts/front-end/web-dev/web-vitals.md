---
title: web-vitals
tag: web-vitals
catogory:
  - front-end
  - web-dev
  - web-vitals
---

## 性能指标

1: web-vitals 核心指标

- LCP(Largest Contentful Paint): 衡量装载性能。为了提供良好的用户体验，LCP 应该在页面首次开始加载后的 2.5 秒内发生。
- FID(First Input Delay): 衡量互动性。为了提供良好的用户体验，页面的 FID 应当小于 100 毫秒。
- CLS(Cumulative Layout Shift): 衡量视觉稳定性。为了提供良好的用户体验，页面的 CLS 应保持小于 0.1。

2: 其它指标

- TBT(Total Blocking Time): 测量总阻塞时间（TBT）指标: FCP(首次内容渲染) + TTI(互动时间)

## 相关工具

> @see https://web.dev/vitals-tools/

- [Chrome 用户体验报告](https://developers.google.com/web/tools/chrome-user-experience-report)
- [PageSpeed 见解](https://developers.google.com/speed/pagespeed/insights/)
- [Search Console（核心网络生命力报告）](https://support.google.com/webmasters/answer/9205520)
- [web-vitals JavaScript 库](https://github.com/GoogleChrome/web-vitals)
- [Lighthouse Chrome 扩展程序]() : 无法测量 FID
- [Chrome DevTools 性能面板]()
- [Web Vitals Chrome 扩展程序](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma/related?hl=en)

## LCP

> 最大内容绘画（LCP）度量标准报告相对于页面首次开始加载的时间，在视口中可见的最大图像或文本块的渲染时间。

## FID

> 首次输入延迟（FID）是一种重要的以用户为中心的度量，用于衡量负载响应能力，因为它可以量化用户尝试与无响应页面进行交互时的体验-低 FID 有助于确保页面可用。
> 首次输入延迟（FID）度量标准有助于衡量用户对网站的交互性和响应性的第一印象。

## CLS

> 累积版式移位（CLS）是衡量用户视觉稳定性的一项重要的以用户为中心的度量标准，因为它有助于量化用户经历意外的版式移位的频率-较低的 CLS 有助于确保页面令人愉悦。

### 可能原因

> 异步加载资源或将 DOM 元素动态添加到现有内容上方的页面
> 尺寸未知的图像或视频，呈现比其后备更大或更小的字体
> 动态调整自身大小的第三方广告或小部件

### 麻烦点

> 网站在开发中的功能通常与用户的体验有很大不同。个性化或第三方内容在开发中的行为通常与在生产中的行为不同，测试图像通常已经存在于开发人员的浏览器缓存中，并且在本地运行的 API 调用通常是如此之快，以至于延迟不明显。

## 参考文章

- [web-dev - web-vitals](https://web.dev/learn-web-vitals/)
