function isObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
}

function deepClone(target, hash = new WeakMap()) {
	if (!isObject(target)) return target;
	if (hash.has(target)) return hash.get(target);

	let resultObj = Array.isArray(target) ? {} : [];
	hash.set(target, resultObj);

	for (let key in object) {
		if (Object.prototype.hasOwnProperty.call(object, key)) {
			if (isObject(object[key])) {
				resultObj[key] = deepClone(object[key], hash);
			} else {
				resultObj[key] = object[key];
			}
		}
	}
}
