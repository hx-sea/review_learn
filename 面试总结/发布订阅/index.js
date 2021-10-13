class EventEmittle {
	constructor(options = {}) {
		this.events = {};
		this.maxListeners = options.maxListeners;
	}

	on(event, cb) {
		if (!this.events[event]) {
			this.events[event] = [];
		}
		if (this.events[event].length >= this.maxListeners) {
			console.warn(`${event} has max listener`);
		}
		this.events[event].push(cb);
		return this;
	}

	emit(event, ...args) {
		const cds = this.events[event];
		if (!cds) {
			new Error(`${event} is not rejested`);
			return this;
		}
		cds.forEach((fn) => fn.apply(this, args));
		return this;
	}

	once(event, cb) {
		// 用完即焚
		const func = (...args) => {
			this.off(event, func);
			cb.apply(this, args);
		};
		this.on(event, func);
		return this;
	}

	off(event, cb) {
		if (!cb) {
			this.event = null;
		} else {
			this.events[event] = this.events[event].filter((fn) => fn !== cb);
		}
	}
}

// const event = new EventEmittle();
// const event = new EventEmittle({ maxListeners: 3 }); // 设置最大监听数

// const add = (a, b) => console.log(a + b);
// event.on('add', add); // 监听
// event.emit('add', 1, 2); // 触发 3
// event.off('add', add); //取消监听
// event.once('add', (value) => console.log(value, '监听')); // 只监听一次
// event.emit('add', 1, 2); // 触发 3
// event.emit('add', 2, 3); // 触发 3
