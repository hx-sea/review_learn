### let const

1. 变量不会被提升

```js
if (true) {
	let value = 1;
}
console.log(value);
```

2. 重复声明会报错

```js
var value = 1;
let value = 1;
```

3. 不绑定全局作用域

```js
let value = 1;
console.log(value); // undefined
```

4. 临时死区

```js
var value = 'global';
(function () {
	console.log(value);
	let value = 'local';
})();
```

## Map 和 WeakMap 区别？

- Map 值-值对应关系，健可以是任意值

* WeakMap 与 Map 类似

* 区别：

1.  WeakMap 只接受对象作为键名
2.  WeakMap 的键名所指的对象，不计入垃圾回收机制
