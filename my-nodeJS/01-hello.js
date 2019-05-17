var http=require('http');
http.createServer(function (request,response) {
	response.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
	if (request.url!=='/favicon.ico') {//清除第2次访问
		
		console.log('访问');
		response.write('hello,world!');
		//response.end('');//执行完毕
		response.end('你好世界');//执行完毕
	}
}).listen(8000);

console.log('server running at http:127.0.0.1:8000');