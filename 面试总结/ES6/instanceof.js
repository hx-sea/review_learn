// 实现原理就是判断右边变量的prototype是否在左边变量的原型链上

function new_instance_of(leftValue, rightValue) {
	let rightProto = rightValue.prototype;
	let leftValue = leftValue.__proto__;
	while (true) {
		if (leftValue === null) {
			return false;
		}
		if (leftValue === rightProto) {
			return true;
		}
		leftValue = leftValue.__proto__;
	}
}

