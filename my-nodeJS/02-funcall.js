var http=require('http');
var otherfun=require('./models/otherfun');
http.createServer(function (req,res) {
	res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
	if (req.url!=='/favicon.ico') {
		res.write('kkk');
		//fun1(res);

		//可用字符串调用对应函数
		funname='fun2';
		otherfun[funname](res);
		//otherfun['fun3'](res);
		//otherfun.fun2(res);
		//otherfun.fun3(res);
		

		res.end('');
	}
}).listen(8000);

console.log('server running at http:127.0.0.1:8000');


function fun1(res) {
	console.log('hello,fun1');
	res.write('你好，我是fun1');
}