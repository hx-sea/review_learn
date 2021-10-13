(function (moudles) {
	console.log(moudles);
	function require(id) {
		const [fn, mapping] = moudles[id];

		function locaRequire(relativePath) {
			return require(mapping[relativePath]);
		}

		const module = { exports: {} };

		fn(locaRequire, module, module.exports);

		return module.exports;
	}
	require(0);
})({
	0: [
		function (require, module, exports) {
			'use strict';

			var _message = require('./message.js');

			var _message2 = _interopRequireDefault(_message);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}

			console.log(_message2.default);
		},
		{ './message.js': 1 },
	],
	1: [
		function (require, module, exports) {
			'use strict';

			Object.defineProperty(exports, '__esModule', {
				value: true,
			});
			exports.default = '$xianghai is a  boy';
		},
		{},
	],
});
