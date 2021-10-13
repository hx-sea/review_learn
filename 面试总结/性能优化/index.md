## 性能优化目的是什么？

1. 首屏时间
2. 首次可交互时间
3. 首次有意义内容渲染时间

pollyfill: https://polyfill.io/v3/url-builder/

- polyfill 体积非常大，要做很多适配，不用 webpack 把 polyfill 打包到资源包，链接当作 js 资源通过 script 标签加载进来就行

1. 只请求当前需要的资源

   - 异步加载 懒加载 polyfill(babel-polyfill)

2. 缩减资源体积

   - 打包压缩 webpack4 内置了

   * gzip(默认开启) 一种压缩算法，减少 js css 静态资源的算法
   * 图片格式的优化 375 宽度 压缩https://tinypng.com/ 免费压缩图片网站，对于 png 格式压缩，根据屏幕分辨率展示不同分辨率的图片，webp 图片格式
   * 尽量控制 cookie 大小，因为每一个请求都会携带 cookie

3. 时序优化

- js promise.all

* ssr 在服务端渲染好，可以根据某些特征做缓存，方便 seo
*

4. 合理运用缓存

   - cdn 预热：如果没有预热，所有请求会打到原站上
   - cdn 刷新：拉取最新内容
