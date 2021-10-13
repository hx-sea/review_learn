## loader

1. test 属性：识别哪些文件会被转化
2. use 属性：定义出在进行转化时，使用哪个 loader

```js
// 同步loader
module.exports = function (content) {
	const res = dosth(content);
	return res;
};
// 调用this.callback,return undefined
module.exports = function (content) {
	const options = this.getOptions();
	const res = someSyncOperation(content, options);
	this.callback(null, res, sourceMap);
	return;
};
```

```js
// 异步loader this.async()
module.exports = function (content) {
	var callback = this.async();
	someSyncOperation(content, function (err, result) {
		if (err) return callback(err);
		callback(null, result, sourceMaps, meta);
	});
};
```
