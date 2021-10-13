const http = require('http');

const proxy = http.createServer((req, res) => {
	res.writeHead(200, { 'x-xh': 'hello xh' });
	res.end('hello world'); // 发送的请求
});

proxy.listen(8888, '127.0.0.1', () => {
	console.log('server start');
});
