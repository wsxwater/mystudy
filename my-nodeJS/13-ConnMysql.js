var http=require('http');
var router=require('./models/router.js');
var url=require('url');

http.createServer(function (req,res) {
	if (req.url!=='/favicon.ico') {
		pathname=url.parse(req.url).pathname;
		pathname=pathname.replace(/\//ig,'')

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


//var mysql=require('mysql');


//创建一个connection 
// var connection=mysql.createConnection({
// 	host:'localhost',
// 	user:'root',
// 	password:'root',
// 	database:'test',
// 	port:'3306'
// });


// console.log(connection);


// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// connection.end();