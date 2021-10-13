### Fiber

为了可以中断 react 的渲染过程， 把控制权还给浏览器， 执行更高优先级的任务，浏览器空闲恢复渲染

再一些比较大的 js 计算或者 dom 计算的时候，就不会显得特别卡顿，而是一帧一帧有规律的执行

```js
const task = []; 10个

function fun() {
	let task;
	while ((task = task.shift()) {
		execute(task); // 10s
	}
}
```

generator

```js

const task = []; 10个

function * fun() {
	let task;
	while ((task = task.shift()) {
		if(hightTask){
			yield;
		}
		execute(task); // 10s
	}
}

run.next()

```

1. 为什么不用

-
- generator 是有状态的

```js
function doWork(a, b, c) {
	const x = doWxpensiveWork(a);
	yield;
	const y = doWxpensiveWork(b);
	yield;
	const z = doWxpensiveWork(c, x, y);
	return z;
}
```

a,b 任务执行了 c 还没有执行 ，这时候 b 任务更新了 ，没有办法获取 b 最新的状态，只能沿用之前的状态

1. 高优先级任务

- 当前的 js 环境没有办法判断是否有高优先级任务

* 给每一个任务一个合理的执行时间，超过时间，中断执行，

2. requestIdleCallback

- 在浏览器有空的时候执行回调函数
- 一个回调函数 ，一个执行时间， 就是浏览器供给我们回调的执行时间， 超过这个时间，又是中断渲染

3. 浏览器在什么什么时候有空

1s /60 帧 1000ms/60 = 16ms

- 响应用户的输入
- js 执行
- requestAnimation 调用
- 布局 layout
- 绘制

10ms 6ms

timeout 50ms 回调在下一帧将会被强制执行

task

react 预订了 5 个任务

- Immediate 需要立即执行 不能被中断
- UserBlocking 一般是和用户交互的结果， 需要立即反馈
- normal 不需要立即反馈， 比如网络请求
- Low 可以被延后的任务 ，但是最终需要被 zhixing
- Idle 可以无期限延后
