var http=require('http');
//var optfile=require('./models/optfile');


var url=require('url');
var router=require('./models/router');

http.createServer(function (req,res) {
	res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});

	if (req.url!=='/favicon.ico') {
        //optfile.readfileSync('./views/login.html');//同步
        //res.end('OK');
        


        /*function callback(data) {
        	res.write(data);
			res.end('OK');
        }
        optfile.readfile('./views/login.html',callback);//异步*/


        pathname=url.parse(req.url).pathname;//只获取请求的路径名
        pathname=pathname.replace(/\//,'');
        console.log(pathname);
        router[pathname](req,res);


        console.log('主程序执行完毕');
	}
}).listen(8000);

console.log('server running at http://127.0.0.1:8000');