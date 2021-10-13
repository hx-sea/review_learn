// module.exports = {
// 	text: 'hello world',
// };

require(['moduleA', 'moduleB'], function (moduleA, moduleB) {
	console.log(moduleB);
});
