var http=require('http');
var url=require('url');
var router=require('./models/router');

http.createServer(function (req,res) {
	
	if (req.url!=='/favicon.ico') {
		var pathname=url.parse(req.url).pathname;
		pathname=pathname.replace(/\//g,'');
		router[pathname](req,res);
	}

}).listen(8000);

console.log('server running at http:127.0.0.1:8000');
