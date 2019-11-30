var http=require('http');
//var optfile=require('./models/optfile');


var url=require('url');
var router=require('./models/router');

http.createServer(function (req,res) {
	res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});

	if (req.url!=='/favicon.ico') {
                
<<<<<<< HEAD
            pathname=url.parse(req.url).pathname;//只获取请求的路径名
            pathname=pathname.replace(/\//,'');
            console.log(pathname);
            router[pathname](req,res);


            console.log('主程序执行完毕');
=======
                pathname=url.parse(req.url).pathname;//只获取请求的路径名
                pathname=pathname.replace(/\//,'');
                console.log(pathname);
                router[pathname](req,res);


                console.log('主程序执行完毕');
>>>>>>> ddc4ed0645783b77bb6c050ae019b20a64231d67
	}
}).listen(8000);

console.log('server running at http://127.0.0.1:8000');