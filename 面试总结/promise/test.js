// class MyPromise {
// 	static pending = 'PENDING';
// 	static fulfilled = 'FULFILLED';
// 	static rejected = 'REJECTED';
// 	_status = MyPromise.pending;
// 	cosntructor(execute) {
// 		this.status = MyPromise.pending;
// 		this.value = null;
// 		this.reason = null;
// 		this.FULFILLED_CALLBACK_LIST = [];
// 		this.REJECTED_CALLBACK_LIST = [];
// 		try {
// 			execute(this.resolve.bind(this), this.rejected.bind(this));
// 		} catch (error) {
// 			this.rejected(error);
// 		}
// 	}

// 	resolve(value) {
// 		if (this.status === MyPromise.pending) {
// 			this.value = value;
// 			this.status = MyPromise.fulfilled;
// 		}
// 	}

// 	rejected(reason) {
// 		if (this.status === MPromise.pending) {
// 			this.reason = reason;
// 			this.status = MyPromise.rejected;
// 		}
// 	}

// 	get status() {
// 		return this._status;
// 	}

// 	set status(newStatus) {
// 		this._status = newStatus;
// 		switch (newStatus) {
// 			case MyPromise.fulfilled: {
// 				this.FULFILLED_CALLBACK_LIST.forEach((cb) => cb(this.value));
// 				break;
// 			}
// 			case MyPromise.rejected: {
// 				this.REJECTED_CALLBACK_LIST.forEach((cb) => cb(this.reason));
// 				break;
// 			}
// 		}
// 	}

// 	isFunction(fn) {
// 		return typeof fn === 'function';
// 	}

// 	then(onFulFilled, onRejected) {
// 		const realOnFulFilled = this.isFunction(onFulFilled) ? onFulFilled : (value) => value;
// 		const realOnRejected = this.isFunction(onRejected)
// 			? onRejected
// 			: (reason) => {
// 					throw reason;
// 			  };

// 		const promise2 = new MyPromise((resolve, rejected) => {
// 			const microtaskFulfilledFn = () => {
// 				try {
// 					queueMicrotask(() => {
// 						const x = realOnFulFilled();
// 						this.resolvePromise(x);
// 					});
// 				} catch (error) {
// 					rejected(error);
// 				}
// 			};

// 			const microtaskRejectedFn = () => {
// 				try {
// 					queueMicrotask(() => {
// 						const x = realOnRejected();
// 						this.resolvePromise(x);
// 					});
// 				} catch (error) {
// 					rejected(error);
// 				}
// 			};
// 			switch (this.status) {
// 				case MyPromise.fulfilled: {
// 					microtaskFulfilledFn();
// 				}
// 				case MyPromise.rejected: {
// 					microtaskRejectedFn();
// 				}
// 				case MyPromise.MyPromise: {
// 					this.FULFILLED_CALLBACK_LIST.push(microtaskFulfilledFn);
// 					this.REJECTED_CALLBACK_LIST.push(microtaskRejectedFn);
// 				}
// 			}
// 		});

// 		return promise2;
// 	}

// 	resolvePromise(promise2, x, resolve, rejected) {
// 		if (x === promise2) {
// 			return new TypeError('禁止套娃');
// 		}
// 		if (x instanceof MyPromise) {
// 			x.then((y) => {
// 				this.resolvePromise(promise2, y, resolve, resolve);
// 			});
// 		} else if (typeof x === 'object' || this.isFunction(x)) {
// 			if (x === null) {
// 				return rejected(x);
// 			}

// 			let then = x.then;

// 			try {
// 				then = x.then;
// 			} catch (error) {
// 				rejected(error);
// 			}

// 			if (this.isFunction(then)) {
// 				let called = false;
// 				then(
// 					(y) => {
// 						if (called) {
// 							return;
// 						}
// 						this.resolvePromise(promise2, y, resolve, rejected);
// 						called = true;
// 					},
// 					(r) => {
// 						if (called) {
// 							return;
// 						}
// 						rejected(r);
// 						called = true;
// 					},
// 				);
// 			}
// 		} else {
// 			resolve(x);
// 		}
// 	}

// 	static catch(onRejected) {
// 		return this.then(null, onRejected);
// 	}

// 	static resolve(x) {
// 		if (x instanceof MyPromise) {
// 			return x;
// 		}
// 		return new MyPromise((resolve) => {
// 			resolve(x);
// 		});
// 	}

// 	static rejected(reason) {
// 		return new MyPromise((resolve, rejected) => {
// 			rejected(reason);
// 		});
// 	}

// 	static race(arrPromise) {
// 		return new MyPromise((resolve, rejected) => {
// 			if (!Array.isArray(arrPromise)) {
// 				return console.log('must be a array');
// 			}
// 			const len = arrPromise.length;
// 			if ((len = 0)) {
// 				resolve();
// 			}

// 			for (let i = 0; i < len; i++) {
// 				return MyPromise.resolve(arrPromise[i]).then(
// 					(res) => {
// 						return resolve(res);
// 					},
// 					(reason) => {
// 						return rejected(reason);
// 					},
// 				);
// 			}
// 		});
// 	}

// 	static all(arrPromise) {
// 		return new MyPromise((resolve, rejected) => {
// 			if (!Array.isArray) {
// 				return rejected('必须传入一个数组');
// 			}

// 			const len = arrPromise.length;

// 			const result = [];
// 			let count = 0;
// 			for (let i = 0; i < len; i++) {
// 				 MyPromise.resolve(arrPromise[i])
// 					.then((value) => {
// 						count++;
// 						result[i] = value;
// 						if (count === len) {
// 							resolve(result);
// 						}
// 					})
// 					.catch((err) => {
// 						rejected(err);
// 					});
// 			}
// 		});
// 	}

// 	static allSettled(arrPromise) {
// 		return new MyPromise((resolve, rejected) => {
// 			if (!Array.isArray(arrPromise)) {
// 				rejected('必须传入一个数组');
// 			}

// 			const promiseNum = arrPromise.length;

// 			const res = [];
// 			let count = 0;
// 			for (let i = 0; i < promiseNum; i++) {
// 				 MyPromise.resolve(arrPromise[i])
// 					.then((value) => {
// 						res[i] = {
// 							status: 'fulfilled',
// 							value: value,
// 						};
// 					})
// 					.catch((reason) => {
// 						res[i] = {
// 							status: 'rejected',
// 							value: reason,
// 						};
// 					})
// 					.finally(() => {
// 						count++;
// 						if (count === len) {
// 							resolve(res);
// 						}
// 					});
// 			}
// 		});
// 	}
// }

// const xh = new MyPromise((resolve, rejected) => {
// 	resolve(111);
// }).then((res) => {
// 	console.log(res, 233);
// });

// console.log(xh);
