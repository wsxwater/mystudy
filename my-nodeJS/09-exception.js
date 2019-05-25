var http=require('http');
var url=require('url');
var router=require('./models/router');
var exception=require('./models/Exception.js');

http.createServer(function (req,res) {
	
	if (req.url!=='/favicon.ico') {
		pathname=url.parse(req.url).pathname;
		pathname=pathname.replace(/\//g,'');
		try{
			
			// router[pathname](req,res); 
			data=exception.expfun(10);
			res.write(data);
			res.end();
		}catch(err){
			console.log('aaa：'+err.toString());
			res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
			res.write('!!!Error!!!：'+err.toString());
			res.end();
		}

		console.log('server执行完毕！！！');
	}

}).listen(8000);

console.log('server running at http://127.0.0.1:8000');