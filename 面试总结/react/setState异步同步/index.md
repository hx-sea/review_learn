# 结论

- 由 react 引发的事件处理，调用 setState 不会同步更新 this.state,除此之外的 setState 调用会同步执行 this.state, (指的是绕过 React 通过 addEventListener 直接添加的事件处理函数)，还有通过 setTimeout/setInterval 产生的异步调用

# 原因

- 在 React 的 setState 函数实现中，会根据一个变量 isBatchingUpdates 判断是直接更新 this.state 还是放到队列中回头再说，而 isBatchingUpdates 默认是 false，也就表示 setState 会同步更新 this.state,但是，有一个函数 batchedUpdates,这个函数会把 isBatchingUpdates 修改为 true，而当 React 在调用事件处理函数之前就会调用这个函数，造成的后果，就是 React 控制的事件处理过程 setState 不会同步更新 this.state
