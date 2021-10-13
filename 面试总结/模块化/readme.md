# 问题

- 全局污染和依赖管理混乱

# 模块化管理方案 CommonJs EsModule

1. 应用场景：

- CommonJs

* Node
* webpack

2. 模块执行原理

```js
function wrapper(script) {
	return '(function (exports, require, module, __filename, __dirname) {' + script + '\n})';
}
```

- 返回一个包装字符串函数，模块加载的时候，通过 vm.runInThisContext（可以理解成 eval）执行，传入 require、exports、module 等参数

3. require 文件加载流程

- 加载原理：
  - module: 在 Node 中每个 js 文件都是一个 module，module 上保存了 exports 等信息之外，还有一个 loaded 表示该模块是否被加载
  - Module：缓存每一个模块加载的信息

```js
// id 为路径标识符
function require(id) {
   /* 查找  Module 上有没有已经加载的 js  对象*/
   const  cachedModule = Module._cache[id]

   /* 如果已经加载了那么直接取走缓存的 exports 对象  */
  if(cachedModule){
    return cachedModule.exports
  }

  /* 创建当前模块的 module  */
  const module = { exports: {} ,loaded: false , ...}

  /* 将 module 缓存到  Module 的缓存属性中，路径标识符作为 id */
  Module._cache[id] = module
  /* 加载文件 */
  runInThisContext(wrapper('module.exports = "123"'))(module.exports, require, module, __filename, __dirname)
  /* 加载完成 *//
  module.loaded = true
  /* 返回值 */
  return module.exports
}

```

- require 避免重复加载

* require 避免重复引用

module.exports = { name }

exports = {} // 相当于直接修改了形参

- CommonJS 模块同步加载并执行模块文件，ES6 模块提前加载并执行模块文件，

Plugin 扩展插件，在 webpack 运行的各个生命周期都会广播出对应的事件，插件去监听事件

Loader 编译转换器，将非 js 文件转换为 webpack 能识别的 js 模块
