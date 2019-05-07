var http=require('http');
var url=require('url');
var router=require('./models/router');

http.createServer(function (req,res) {
	res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});

	if (req.url!=='/favicon.ico') {
	    //console.log(req.url);  //获取url的所有信息，包括后面的参数
		pathname=url.parse(req.url).pathname;//只获取请求的路径名
		pathname=pathname.replace(/\//,'');
		console.log(pathname);
		router[pathname](req,res);
 		res.end('');
	}

}).listen(8000);

console.log('server running at http:127.0.0.1:8000');


/*
报错
  TypeError: router[pathname] is not a function
    at Server.<anonymous> (E:\study\mystudy\my-nodeJS\04-rout.js:13:19)
    at emitTwo (events.js:126:13)
    at Server.emit (events.js:214:7)
    at parserOnIncoming (_http_server.js:602:12)
    at HTTPParser.parserOnHeadersComplete (_http_common.js:116:23)

分析
不要直接访问http://127.0.0.1:8000，不然会报这个错误，要这样http://127.0.0.1:8000/login访问就正常了。
*/


