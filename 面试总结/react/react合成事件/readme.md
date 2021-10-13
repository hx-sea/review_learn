# react 为什么要自定义一套事件系统

- 动机

1. 抹平浏览器之间的差异性

```js
class Index extends React.Component {
	handerClick = (value) => console.log(value);
	handerChange = (value) => console.log(value);
	render() {
		return (
			<>
				<button onClick={this.handerClick}> 按钮点击 </button>
				<input placeholder="请输入内容" onChange={this.handerChange} />
			</>
		);
	}
}
```

1. 在 jsx 中绑定的事件，handerClick, handerChange 根本没有注册到真实 dom 上，而是绑定到 document 上统一管理
2. 真实 dom 上的 click 事件被底层处理成了一个空函数
3. 在 react 上绑定的事件，比如 onchange，在 document 上可能有多个事件与之对应
4. react 并不是一开始，就把所有事件绑定在 document 上，而是采用一种按需绑定，比如发现了 click 事件，再去绑定 document click

# React17 的改动

- 事件统一绑定在 container 上，ReactDom.render(app, container);而是不 document 上， 这样的好处就是利于微前端，微前端一个前端系统中可能有多个应用，如果继续采取去哪不绑定在 document 上，那么可能多应用下会出现问题

* 取消事件池的复用
