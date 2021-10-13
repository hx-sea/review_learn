##

1. 相同点：

- setState 和 useState 都是更新视图， 底层都调用了 scheduleUpdateOnFiber 方法， 而且事件驱动情况下都有批量更新规则

2. 不同点：

- 在不是 pureComponent 组件模式下， setState 不会浅比较两次 state 的值， 只要调用 setState，在没有其他优化手段下，就会执行更新， 但是 useState 的 dispatchAction 会默认比较两次 state 是否相同， 然后决定是否更新组件

- setState 有专门监听 state 变化的回调函数 callback， 可以获取最新 state；但是在函数组件中，只能通过 useEffect 来执行 state 变化引起的副作用

* setState 底层处理逻辑上主要是和老 state 进行合并处理，而 useState 更倾向于重新赋值
* Object.assign()
* Object.is()
