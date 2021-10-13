// 实现一个sizeof 计算字节数

const obj = {
	a: 111,
	b: 222,
};

console.log(Object.keys(obj)[0]);


// let seen = WeakSet();

// function sizeOfObject(obj) {
// 	if (typeof obj === null) {
// 		return 0;
// 	}
// 	let bytes = 0;
// 	const objKey = Object.keys(obj);
// 	for (let i = 0; i < key.length; i++) {
// 		const key = objKey[i];
// 		if (seen.has(obj[key])) {
// 			continue;
// 		} else {
// 			seen.add(obj[key]);
// 		}	
// 	}
// 	bytes += calculator(key);
// 	bytes += calculator(obj[key]);
// }

// function calculator(obj) {
// 	let objectType = typeof obj;

// 	switch (objectType) {
// 		case 'string': {
// 			return objectType.length * 2;
// 		}
// 		case 'number': {
// 			return 8;
// 		}
// 		case 'boolean': {
// 			return 4;
// 		}
// 		case 'object': {
// 			if (Array.isArray(obj)) {
// 				return obj.reduce(calculator).reduce((res, val) => {
// 					return res + val;
// 				}, 0);
// 			}
// 			return sizeOfObject(obj);
// 		}
// 	}
// }

// let seen = new WeakSet();
// function sizeofObject(object) {
// 	if (typeof object === null) {
// 		return 0;
// 	}

// 	let bytes = 0;

// 	const objKey = Object.keys(object);

// 	for (let i = 0; i < objKey.length; i++) {
// 		const key = objKey[i];
// 		if (typeof object[key] === 'object' && object[key] !== null) {
// 			if (seen.has(object[key])) {
// 				continue;
// 			} else {
// 				seen.add(object[key]);
// 			}
// 		}
// 		bytes += calculator(key);
// 		bytes += calculator(object[key]);
// 	}
// 	return bytes;
// }

// function calculator(object) {
// 	const objectType = typeof object;
// 	switch (objectType) {
// 		case 'string': {
// 			return object.length * 2;
// 		}
// 		case 'boolean': {
// 			return 4;
// 		}
// 		case 'number': {
// 			return 8;
// 		}
// 		case 'object': {
// 			if (Array.isArray(object)) {
// 				return object.map(calculator).reduce((curr, val) => {
// 					return curr + val;
// 				}, 0);
// 			} else {
// 				return sizeofObject(object);
// 			}
// 		}

// 		default:
// 			break;
// 	}
// }

// const obj = {
// 	a: 111,
// 	b: 222,
// };

