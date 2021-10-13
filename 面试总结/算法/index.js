// 1.两数之和
// arr = [2,7,11] target = 9 [0,1]
// {
// 	2:0,
// 	2:1,
// }
function towNum(arr, target) {
	let map = new Map();

	for (let i = 0; i < arr.length; i++) {
		if (map.has(target - arr[i])) {
			return [map.get(target - arr[i]), i];
		}
		map.set(arr[i], i);
	}
}

// 2.无重复最长子串
// 'pwwkew'
var lengthOfLongestSubstring = function (s) {
	let arr = [];
	let max = 0;
	for (let i = 0; i < s.length; i++) {
		let index = arr.indexOf(s[i]);
		if (index !== -1) {
			arr.splice(0, index + 1);
		}
		arr.push(s.charAt(i));
		max = Math.max(arr.length, max);
	}
	return max;
};

// console.log(lengthOflongestSubstring('pwwkeww'));

// 实现 new Queue 类
new Queue()
.task(1000,()=>console.log(1))
.task(2000,()=>console.log(2))
.task(3000,()=>console.log(3)).start();
// 实现一个Queue函数，调用start之后，1s后打印1，接着2s后打印2，然后3s后打印3

function sleep(delay, cb) {
	return new Promise((rsolve, reject) => {
		setTimeout(() => {
			rsolve();
			cb();
		}, delay);
	});
}
class Queue {
	constructor() {
		this.listenser = [];
	}

	task(delay, cb) {
		this.listenser.push(() => sleep(delay, cb));
		return this;
	}

	async start() {
		for (const lister of this.listenser) {
			await lister();
		}
	}
}

new Queue()
	.task(1000, () => console.log(1))
	.task(2000, () => console.log(2))
	.task(3000, () => console.log(3))
	.start();

// 最熟悉的一种排序
function quickSort(arr) {
	if (arr.length < 2) {
		return arr;
	}
	let cur = arr[arr.length - 1];
	let right = [];
	let left = [];
	for (let i = 0; i < arr.length - 1; i++) {
		if (arr[i] >= cur) {
			right.push(arr[i]);
		} else {
			left.push(arr[i]);
		}
	}
	return [...quickSort(left), cur, ...quickSort(right)];
}

// console.log(quickSort([1, 3, 2, 4, 6, 5]));


//假设链表为 1 -> 2 -> 3，我们想要把它改成 3 -> 2 - 1

function reverseList(head) {
	let prev = null;
	let curr = head;
	while (curr) {
		const next = curr.next;
		curr.next = prev;
		prev = curr;
		curr = next;
	}
	return prev;
}

// 实现千分位format函数

// format(12345, 789); // 123,456

function format(number) {
	let str = number.toString();
	let [int, dec = ''] = str.split('.');
	let intStr = '';
	for (let i = int.length - 1; i >= 0; i--) {
		if ((int.length - i) % 3 === 0 && i !== 0) {
			intStr = ',' + int[i] + intStr;
		} else {
			intStr = int[i] + intStr;
		}
	}
	let decStr = '';
	if (dec.length > 0) {
		for (let i = 0; i < dec.length; i++) {
			let sum = decStr + dec[i];
			if ((i + 1) % 3 === 0) {
				decStr = sum + ',';
			} else {
				decStr = sum;
			}
		}
	}
	return decStr.length > 0 ? `${intStr}.${decStr}` : `${intStr}`;
}

// console.log(format(12345.789));

// 旋转数组 [1, 2, 3, 4, 5, 6]
// var rotate = function (nums, k) {
// 	const n = nums.length;
// 	const newArr = new Array(n);
// 	[x, x, x, x, x, x];
// 	for (let i = 0; i < n; ++i) {
// 		newArr[(i + k) % n] = nums[i];
// 	}
// 	for (let i = 0; i < n; ++i) {
// 		nums[i] = newArr[i];
// 	}
// };
// rotate([1, 2, 3, 4, 5, 6], 2) => [6, 1, 2, 3, 4, 5]

// 连续数组最大项的和

// function maxSubArray(num) {
// 	let pre = 0;
// 	let maxAny = num[0];

// 	num.forEach((nums) => {
// 		pre = Math.max(pre + nums, nums);
// 		maxAny = Math.max(maxAny, pre);
// 	});

// 	return maxAny;
// }

// const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
// console.log(maxSubArray(nums));

// 两个大数相加

// let a = '0009007199254740991';
// let b = '1234567899999999999';

function add(a, b) {
	const maxLength = Math.max(a.length, b.length);

	a = a.padStart(maxLength, a);
	b = b.padStart(maxLength, b);

	let f = 0; // 进位
	let t = 0;
	let sum = '';

	for (let i = maxLength - 1; i >= 0; i--) {
		t = parseInt(a[i]) + parseInt(b[i]) + f;
		f = Math.floor(t / 10);
		sum = (t % 10) + sum;
	}
	if (f == 1) {
		sum = 1 + sum;
	}

	return sum;
}

// console.log(add(a, b));
