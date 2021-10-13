class MyPromise {
	static pending = 'PENDING';
	static fulfilled = 'FULFILLED';
	static rejected = 'REJECTED';

	_status = MyPromise.pending;

	constructor(execute) {
		this.status = MyPromise.pending;
		this.value = null;
		this.reason = null;
		this.FULFILLED_CALLBACK_LIST = [];
		this.REJECTED_CALLBACK_LIST = [];

		try {
			execute(this.resolve.bind(this), this.rejected.bind(this));
		} catch (error) {
			this.rejected(error);
		}
	}

	resolve(value) {
		if (this.status === MyPromise.pending) {
			this.value = value; // status改变前拿到value
			this.status = MyPromise.fulfilled;
		}
	}

	rejected(reason) {
		if (this.status === MyPromise.pending) {
			this.reason = reason;
			this.status = MyPromise.rejected;
		}
	}

	get status() {
		return this._status;
	}

	set status(newStatus) {
		// pending的时候吧存入数组里面的函数拿出来执行
		this._status = newStatus;
		switch (newStatus) {
			case MyPromise.fulfilled: {
				this.FULFILLED_CALLBACK_LIST.forEach((cb) => cb(this.value)); // 因为这里同步执行
				break;
			}
			case MyPromise.rejected: {
				this.REJECTED_CALLBACK_LIST.forEach((cb) => cb(this.reason));
				break;
			}
		}
	}

	// 返回一个promise

	isFunction(fn) {
		return typeof fn === 'function';
	}
	then(onFulfilled, onRejected) {
		const fuifilledFn = this.isFunction(onFulfilled) ? onFulfilled : (value) => value;
		const rejectedFn = this.isFunction(onRejected)
			? onRejected
			: (reason) => {
					throw reason;
			  };

		const promise2 = new MyPromise((resolve, reject) => {
			const fulfilledWithCatch = () => {
				queueMicrotask(() => {
					try {
						const x = fuifilledFn(this.value); // 调用结果为x, 调用resolvePromise
						this.resolvePromise(promise2, x, resolve, reject);
					} catch (error) {
						reject(error);
					}
				});
			};

			const rejectedWithCatch = () => {
				queueMicrotask(() => {
					try {
						const x = rejectedFn(this.reason); // 调用结果为x, 调用resolvePromise
						this.resolvePromise(promise2, x, resolve, reject);
					} catch (e) {
						reject(e);
					}
				});
			};

			switch (this.status) {
				case MyPromise.fulfilled: {
					fulfilledWithCatch();
					break;
				}

				case MyPromise.rejected: {
					rejectedWithCatch();
					break;
				}

				case MyPromise.pending: {
					this.FULFILLED_CALLBACK_LIST.push(fulfilledWithCatch);
					this.REJECTED_CALLBACK_LIST.push(rejectedWithCatch);
					break;
				}
			}
		});
		return promise2;
	}

	resolvePromise(promise2, x, resolve, reject) {
		if (promise2 === x) {
			return reject(new TypeError('The Promise and the return value are the same'));
		}
		if (x instanceof promise2) {
			x.then((y) => {
				this.resolvePromise(promise2, y, resolve, reject);
			}, reject);
		} else if (typeof x === 'object' || this.isFunction(x)) {
			if (x === null) {
				return resolve(x);
			}
			let then = null;

			try {
				then = x.then;
			} catch (e) {
				return reject(e);
			}

			if (this.isFunction(then)) {
				let called = false;
				try {
					then.call(
						x,
						(y) => {
							if (called) {
								return;
							}
							called = true;
							this.resolvePromise(promise2, y, resolve, reject);
						},
						(r) => {
							if (called) {
								reutrn;
							}
							called = true;
							reject(r);
						},
					);
				} catch (error) {
					if (called) return;
					reject(error);
				}
			} else {
				resolve(x);
			}
		} else {
			resolve(x);
		}
	}

	catch(onRejected) {
		return this.then(null, onRejected);
	}

	static resolve(value) {
		if (value instanceof MyPromise) {
			return value;
		}
		return new MyPromise((resolve) => {
			resolve(value);
		});
	}

	static reject(reason) {
		return new MyPromise((resolve, reject) => {
			reject(reason);
		});
	}
}

const xh = new MyPromise((resolve, rejected) => {
	setTimeout(() => {
		rejected(111);
	}, 1000);
}).catch(() => {
	setTimeout(() => {
		console.log(xh);
	}, 2000);
});
