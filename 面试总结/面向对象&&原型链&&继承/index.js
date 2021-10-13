// function Player(name) {
// 	this.name = name;
// 	this.setName = function () {
// 		console.log(name);
// 	};
// }

// const play1 = new Player();
// const play2 = new Player();

// console.log(play1.setName === play2.setName);

// function Player(name) {
// 	this.name = name;
// }

// Player.prototype.setName = function () {
// 	console.log();
// };

// const play1 = new Player();
// const play2 = new Player();

// console.log(play1.setName === play2.setName);

// function Player(name) {
// 	this.name = name;
// }
// Player.prototype.setName = function () {
// 	console.log();
// };

// function objectFactor() {
// 	let obj = new Object();
// 	let constorFn = [].shift.call(arguments);
// 	obj.__proto__ = constorFn.prototype;
// 	const result = constorFn.apply(obj, arguments);
// 	return typeof result === 'object' ? result : obj;
// }

// const play1 = objectFactor(Player, '嘻嘻');

// console.log(play1.name);

// function Parent() {
// 	this.name = 'parentName';
// }

// Parent.prototype.getName = function () {
// 	console.log(this.name);
// };

// function Child() {}

// Child.prototype = new Parent();

// Child.prototype.constructor = Child;

// const child1 = new Child();
// const child2 = new Child();

// // 如果构造函数的属性是引用类型，一旦某个实例修改了属性，所有实例都会被影响

// console.log(child1.name);

// function Parent() {
// 	this.name = 'parentName';
// }

// let child = new Parent();

// console.log(child instanceof Parent, child.__proto__ === Parent.prototype);

// // 构造函数继承

// function Parent(params) {
// 	xxx
// }

// function Child(params) {
// 	Parent.call(this)
// }

// // 寄生继承

// function Parent(params) {
// 	this.name = 'parentName';
// }

// function Child(params) {}

// function temFun(params) {}

// const a = Parent.prototype;

// temFun.prototype === a;

// Child.prototype === temFun.prototype;

// 例：
// function test() {}
// test.prototype.then = function () {
// 	console.log('test => then');
// };
// Function.prototype.mythen = function () {
// 	console.log('Function => mythen');
// };
// test.mythen();
// test.then();

// Function.prototype.a = () => console.log(1);
// Object.prototype.b = () => console.log(2);
// function A() {}
// var a = new A();
// a.b();
// a.a();
// 怎么改造才能执行console.log(1)呢？
