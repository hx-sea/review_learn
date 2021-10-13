const fs = require('fs');
const path = require('path');

const pathToFile = path.resolve(__dirname, './text');

// 异步
// fs.readFile(pathToFile, 'utf-8', function (err, result) {
// 	if (err) {
// 		console.log(err);
// 		return err;
// 	}
// 	console.log('result', result);
// });

// 同步获取文件

const content = fs.readFileSync(pathToFile, 'utf-8');
console.log('sync file', content);
