// 节流  固定间隔时间去执行函数

function debounce(fn, wait) {
	let timer = null;
	return function () {
		if (!timer) {
			clearTimeout(timer);
		}
		let content = this;
		let arg = argument;
		timer = setTimeout(function () {
			fn.apply(content, arg);
		}, wait);
	};
}

function throttle(fn, delay) {
	let timer = null;
	return function () {
		let content = this;
		let arg = argument;
		if (!timer) {
			timer = setTimeout(function () {
				fn.apply(content, arg);
				timer = null;
			}, delay);
		}
	};
}

function throttle(fn, interval) {
	let last = 0;
	return function () {
		let now = Date.now();
		if (now - last >= interval) {
			last = now;
			fn.apply(this, arguments);
		}
	};
}

function handle() {
	console.log(1111);
}

const throttleHandle = throttle(handle, 1000);

throttleHandle();

// 第一次会立即执行

// 第一次不会执行怎么写  首先想到定时器，延时1000执行

function throttle(fn, interval) {
	let timer = null;
	return function () {
		let content = this;
		let arg = arguments;
		if (!timer) {
			timer = setTimeout(() => {
				fn.apply(content, arg);
				timer = null;
			}, interval);
		}
	};
}

// 最后一次立即执行

function throttle(fn, delay) {
	let timer = null;
	let startTimer = Data.now();
	return function () {
		let currTimer = Date.now();
		let remanning = delay - (currTimer - startTimer);
		let content = this;
		let arg = arguments;
		clearTimeout(timer);
		if (remanning <= 0) {
			fn.apply(content, arg);
			startTimer = Data.now();
		} else {
			timer = setTimeout(function () {
				fn.apply(content, arg);
			}, remanning);
		}
	};
}

// iterator 一种接口，interface 任何数据只要有这种接口就可以遍历

// 生成一个generateIterator

function generateItereator(array) {
	let nextIndex = 0;
	return {
		next: () =>
			nextIndex < array.length
				? {
						value: array[nextIndex++],
						done: false,
				  }
				: {
						value: undefined,
						done: false,
				  },
	};
}

const iterator = generateItereator([1, 2, 3]);

console.log(iterator.next());

// 迭代协议 包含[Symbol.iterator]属性，属性值是一个函数返回一个包含next方法的对象，next方法返回包含value和done属性的对象

const obj = {
	count: 0,
	[Symbol.iterator]: () => {
		return {
			next: () => {
				obj.count++;
				if (obj.count <= 5) {
					return {
						value: obj.count,
						done: false,
					};
				} else {
					return {
						value: undefined,
						done: true,
					};
				}
			},
		};
	},
};

for (const a in arr) {
	console.log(a);
	// if (Object.hasOwnProperty.call(object, key)) {
	// 	const element = object[key];
	// }
}

for (const a in obj) {
	console.log(a);
	// if (Object.hasOwnProperty.call(object, key)) {
	// 	const element = object[key];
	// }
}

for (const key in obj) {
	console.log(key);
}

let arr = [
	{
		age: 15,
	},
	{
		age: 16,
	},
	{
		age: 17,
	},
];

arr.forEach((ele) => {
	if (ele.age < 16) {
		console.log(ele.age);
		break;
	}
});

for (let item of arr) {
	if (item.age < 17) {
		console.log(item);
		break;
	}
}


const arr = [1, 2, [3, 4, [5]]];

console.log(arr.flat(Infinity));

// 手写

function flatDeep(arr, d = 1) {
	if (d > 0) {
		return arr.reduce((res, val) => {
			if (Array.isArray(val)) {
				res = res.concat(flatDeep(val, d - 1));
			} else {
				res = res.concat(val);
			}
			return res;
		}, []);
	} else {
		return arr.slice();
	}
}

function myRace(promiseArr) {
	return new Promise((resolve, reject) => {
		let promiseNum = promiseArr.length;
		if (promiseNum === 0) {
			resolve();
		} else {
			for (let i = 0; i < promiseNum; i++) {
				Promise.resolve([promiseArr[i]]).then(
					(value) => {
						return resolve(value);
					},
					(reason) => {
						return reject(reason);
					},
				);
			}
		}
	});
}

setInterval

let timerId = null;

function mockSetInterval(fn, delay, ...args) {
	const recur = function () {
		timerId = setTimeout(() => {
			fn.apply(this, args);
			recur();
		}, delay);
	};
	recur();
}

function mockClearIntereval(id) {
	clearTimeout(id);
}

mockSetInterval(
	(name) => {
		console.log(name);
	},
	1000,
	'向海',
);

setTimeout(() => {
	mockClearIntereval(timerId);
}, 4000);

