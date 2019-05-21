var http=require('http');
var optfile=require('./models/optfile.js');

http.createServer(function (req,res) {
	//res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
	res.writeHead(200,{'Content-type':'image/jpeg'});

	if (req.url!=='/favicon.icon') {
		optfile.readImg('./images/1.jpg',res);
	}
}).listen(8000);


console.log('server running at http://127.0.0.1:8000');