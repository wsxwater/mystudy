var http=require('http');
var router=require('./models/router.js');
var url=require('url');

http.createServer(function (req,res) {
	if (req.url!=='/favicon.ico') {
		pathname=url.parse(req.url).pathname;
		pathname=pathname.replace(/\//g,'');

		try{
			router[pathname](req,res);
		}catch(err){
			console.log('!!!Error!!!：'+err.toString());
			res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
			res.write('!!!Error!!!：'+err.toString());
			res.end();
		}
	}
}).listen(8000);

console.log('server running at http:127.0.0.1:8000');