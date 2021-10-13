### cloneElement 和 createElement 区别？

1. createElement 把我们写的 jsx，变成 element 对象； 而 cloneElement 的作用是以 element 元素为样板克隆并返回新的 React 元素， 返回元素的 props 是将新的 props 与原始元素的 props 浅层合并后到结果

我们在组件中可以劫持 children element 然后通过 cloneElement 克隆 element，混入 props，经典案例就是 react-router 中的 switch 组件
