Function.prototype.bind2 = function (context) {
	var self = this;
	// 获取bind2函数从第二个参数到最后一个参数
	var args = Array.prototype.slice.call(arguments, 1);

	return function () {
		var bindArgs = Array.prototype.slice.call(arguments);
		return self.apply(context, args.concat(bindArgs));
	};
};
