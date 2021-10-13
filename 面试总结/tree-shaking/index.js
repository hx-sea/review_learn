function Foo() {
	getName = function () {
		// 对window的getName属性重新赋值
		alert(1);
	};
	return this; // this指向window
}
Foo.getName = function () {
	alert(2);
};
Foo.prototype.getName = function () {
	alert(3);
};
var getName = function () {
	alert(4);
};
function getName() {
	alert(5);
}

// 请写出以下输出结果：
Foo.getName(); // 2
getName(); // 4 函数优先级大于var， 函数先执行，var覆盖了函数
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); //3
