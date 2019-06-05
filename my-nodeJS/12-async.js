/*var http=require('http');
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
}).listen(8000);*/

//var async=require('async');

function oneFun() {
	console.log('oneFun');
    var i=0;
	var timer=setInterval(function () {
		console.log('oneFun现在时间：'+new Date());
		i++;
		if (i==3) {
			clearInterval(timer);
		}
	},1000);
}

function twoFun() {
	console.log('twoFun');
    var j=0;
	var timer=setInterval(function () {
		console.log('twoFun现在时间：'+new Date());
		j++;
		if (j==3) {
			clearInterval(timer);
		}
	},1000);
}

//oneFun();
//twoFun();
console.log('主程序执行完毕！');

function exec() {
	
}