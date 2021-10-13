Function.prototype.call2 = function (context) {
	context.fn = this;

	const arg = [];
	for (let i = 1; i < arguments.length; i++) {
		arg.push(`arguments[${i}]`);
	}
	eval(`context.fn(${arg})`);
	delete context.fn;
};

const foo = {
	value: 1,
};

function bar(name, age) {
	console.log(name);
	console.log(age);
	console.log(this.value);
}

bar.call2(foo, 'xh', 18);

Function.prototype.bind2 = function (context) {
	var self = this;

	var arg = [].slice.call(arguments, 1);
	return function () {
		var arg1 = [].slice.call(arguments);
		self.apply(context, arg.concat(arg1));
	};
};
