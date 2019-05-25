var optfile=require('./optfile');

function getCallback(req,res) {
	res.writeHead(200,{'Content-type':'text/html;charset=utf-8;'});
	function callback(data) {
    	res.write(data);
		res.end('');
    }
	return callback;
}

function login(req,res) {
	//res.write('我是login页面');
	callback=getCallback(req,res);
    optfile.readfile('./views/login.html',callback);//异步
}

function reg(req,res) {
	callback=getCallback(req,res);
    optfile.readfile('../views/reg.html',callback);//异步
	//res.write('我是reg页面');
}

function writefile(req,res) {
	var callback=getCallback(req,res);
       optfile.writefile('./views/one.txt','今天天气真好啊！！！',callback);//异步
	//res.write('我是reg页面');
}

function changeRouter(req,res) {
	res.writeHead(200,{'Content-type':'image/jpeg'});
	optfile.readImg('./images/1.jpg',res);
}

module.exports={
	login:login,
	reg:reg,
	writefile:writefile,
	changeRouter:changeRouter
};
