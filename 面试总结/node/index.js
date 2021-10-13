const path = require('path');

const resolvePath = path.resolve('a', 'b', 'c');
const joinPath = path.join('a', 'b', 'c');

// console.log(resolvePath); // /Users/sea/Desktop/work/my-app/a/b/c // 绝对路径
// console.log(joinPath); // a/b/c // 拼接起来

__dirname; // 文件夹名称
__filename; // 文件名称

console.log(__dirname); //  /Users/sea/Desktop/work/my-app/面试/node
console.log(__filename); //  /Users/sea/Desktop/work/my-app/面试/node/index.js
