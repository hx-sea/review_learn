### 什么是 Virtual DOM

1. 虚拟 DOM 并不是真实的 DOM，它跟原生 ODM 本质没什么关系
2. 本质上 Virtual DOM 是一个 javascript 对象，描述了视图和应用状态之间的一种映射关系，是某一时刻真实 DOM 状态的内存映射
3. 在视图显示上，Virtual DOM 的对象节点和真实 DOM tree 每个位置的属性一一对应

### 为什么需要 Virtual DOM

- 真实 DOM 操作代价昂贵，操作频繁引起页面卡顿影响用户操作，Virtual DOM 就是为了解决浏览器这个性能问题

浏览器渲染线程、js 引擎线程互斥

### reactjs：

本质：减少不必要的 DOM API 调用。

- diff： 两次 Virtual DOM 比较，只对变化的部分进行更新，而不是更新整个 DOM
- batching：将多次比较的结果合并后一次性更新到页面，从而有效的减少了页面渲染次数

### ReactElement

由 CreateElement 创建

- CreateElement 接收 3 个参数， type, config, children
  1.  type: ReactElement 类型，可以是 DOM 元素类型，也可以是 React 组件类型
  2.  config: 元素上的属性组成的对象
  3.  children: 数组，代表该元素的子元素

### React Fiber

# Fiber Nodes

- ReactElement 的 \_owner 对象

* 多个 fiber 节点怎么连接形成 fiber tree 呢？
  1. return: 指向父级 fiber 节点
  2. child： 指向子级 fiber 节点
  3. sibling： 指向右边第一个 fiber 兄弟节点

# 双缓冲 Fiber tree

- 在 React 中同时存在两根 fiber tree， 通过 alternate 连接
  1. 当前屏幕显示的 current fiber
  2. 内存中正在构建的 workInProgress fiber

## 整体工作流程

1. 初始化渲染，调用函数组件，或者 class 的 render 方法，将 jsx 代码编译成 ReactElement 对象，描述当前组件内容的数据结构
2. 根据 ReactElement 构建 fiber tree， 包含 schedule、reconciler、render 所需要的信息
3. Schedule 接到更新后，根据任务优先级高低来进行调度，决定要执行的任务是什么
4. Reconciler 负责对比找出变化的 Virtual DOM,为其打上标记，当所有组件都完成了 Reconciler，统一交给 Renderer
5. 根据标记，同步执行对应的 DOM 更新操作

### diff 策略

1. 只对同级元素进行 diff，如果跨越了层级，重新创建新节点
2. 两个不同类型的元素会产生不同的树
3. 开发者可以通过 key props 来暗示哪些子元素在不同的渲染下能保持稳定
