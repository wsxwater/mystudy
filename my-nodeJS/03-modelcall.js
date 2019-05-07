var http=require('http');
var User=require('./models/user');
var Teacher=require('./models/teacher');

http.createServer(function (req,res) {

	res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});

    if (req.url!=='/favicon.ico') {
    	
        //user=new User(1,'wsx',20);
        //user.enter();
        teacher=new Teacher(1,'kkk',40);
        teacher.enter();
        teacher.teach(res);
    	res.end('');
    }

}).listen(8000);

console.log('server running at http://127.0.0.1:8000');