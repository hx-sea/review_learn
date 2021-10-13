### js 面向对象

- 对象包含什么？

1. 属性
2. 方法

- 一些内置对象

* Object Array Date Function RegExp

# 创建对象

- 构造函数

* 通过 this 添加属性和方法指向当前对象，所以在实例化的时候，通过 this 添加的属性和方法都会在内存地址中 copy 一份，会造成内存浪费

```js
function Player(name) {
	this.name = name;
	this.setName = function () {
		console.log(name);
	};
}

const play1 = new Player();
const play2 = new Player();

console.log(play1.setName === play2.setName); // false
```

- 原型

* 通过原型方法继承，我们要在原型链上一层一层的查找，这样创建的好处是只在内存中创建一次，实例化的对象都会指向这个 prototype 对象
