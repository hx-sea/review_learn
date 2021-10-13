1. chunk 和 bundle 的区别是什么？

- Chunk 是 webpack 打包过程中 Modules 的集合，是（打包过程中）的概念

* Bundle 是我们最终输出的一个或者多个打包好的文件

* Bundle 和 Chunk 的关系是什么？

大多数情况下，一个 chunk 会生产一个 Bundle, 但是也有例外

如果加了 source-map，一个 entry，一个 chunk 对应两个 bundle

Chunk 是过程中的代码块，Bundle 是打包过程结果输出的代码块， Chunk 构建完成就呈现为 Bundle

2. slpit chunk

## Plugin 和 Loader 分别是做什么的？ 怎么工作？

1. Loader

模块转换器， 将非 js 模块化转化为 webpack 能识别的 js 模块

本质上，webpack loader 将所有类型的文件，转换应用程序的 **依赖图** 可以直接引用的模块

2. Plugin

扩展插件，webpack 运行的各个阶段，都会广播出对应事件，插件去监听对应的事件

3. Compiler

对象，包含了 webpack 环境的所有配置信息，包括 option loader plugins。 webpack 启动的时候实例化，它在全局是唯一的，可以把他理解为 webpack 实例

4. Compliation 包含了当前模块资源，编译生成资源。 webpack 在开发模式下运行的时候，每当检测到一个文件变化，就会创建一次新的 Compliation

## 简单描述下 webpack 打包过程

1. 初始化参数 shell webpack.config.js
2. 开始编译： 初始化一个 Compiler 对象，加载所有的配置，开始执行编译
3. 确定入口：根据 entry 中的配置，找出所有入口文件
4. 编译模块： 从入口文件开始， 调用所有 loader, 再去递归找依赖，
5. 完成模块编译： 得到每个模块被编译后的最终内容以及他们之间的依赖关系
6. 输出资源：根据得到依赖关系，组装成一个个包含多个 module 的 chunk
7. 输出完成： 根据配置，确定要输出的文件名以及文件路径

# 自己实现一个打包工具

1. 找到一个入口文件
2. 解析这个入口文件，提取它的依赖
3. 解析依赖的依赖，递归的去创建一个文件间的依赖图，描述所有文件的依赖关系
4. 把所有文件打包成一个文件
