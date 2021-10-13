module.exports = function (source) {
	const options = this.getOptions(); // 获取 webpack 配置中传来的 option
	this.callback(null, addSign(source, options.sign));
	return;
};

function addSign(content, sign) {
	return `/** ${sign} */\n${content}`;
}
