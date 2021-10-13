1. 构造函数继承

```js
function Person(name) {
	this.name = name;
	this.getName = function () {
		console.log(this.name);
	};
}

function Child() {
	// Array.from(arguments).slice()
	/*
	Array.from(arguments) 转化伪数组
	slice() 相当于浅拷贝
	也可以[].slice.call(arguments)
	*/
	Person.call(this, Array.from(arguments).slice());
}

const p1 = new Child('嘻嘻');

console.log(p1.name);
```

- 问题：没创建一次实例对象，方法和属性都要创建一次，浪费内存

```js
const p1 = new Child('嘻嘻');
const p2 = new Child('嘻嘻');

console.log(p1.getName === p2.getName); // false
```

2. 原型链继承

```js
function Person() {
	this.name = ['嘻嘻', '哈哈'];
	this.gteName = function(){
		console.log(this.)
	}
}

Person.prototype.getName = function () {
	console.log(this.name);
};

function Child() {}

Child.prototype = new Person();
// 避免Child.prototype的constructor属性指向Person的实例
Child.prototype.constructor = Child;

const p1 = new Child();
const p2 = new Child();

console.log(p1.name);
p1.name.pop();
console.log(p1.name);
console.log(p2.name);
```

- 问题：无法传参数， 如果实例属性是引用类型，会互相影响

3. 构造+原型链

```js
function Person(name) {
	this.name = name;
}

Person.prototype.getName = function () {
	console.log(this.name);
};

function Child() {
	Person.call(this, Array.from(arguments).slice());
}

Child.prototype = new Person();
Child.prototype.constructor = Child;

const p1 = new Child('嘻嘻');

console.log(p1.name);
```

- 缺点： 调用两次构造函数 new 一次 call 一次

4. 寄生继承

```js
function Person(name) {
	this.name = name;
}

Person.prototype.getName = function () {
	console.log(this.name);
};

function Child() {
	Person.call(this, Array.from(arguments).slice());
}

const func = function () {};
func.prototype = Person.prototype;
Child.prototype = new func();

const p1 = new Child('嘻嘻');

console.log(p1.name);
```
