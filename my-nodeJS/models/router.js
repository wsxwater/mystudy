var optfile=require('./optfile');
var url=require('url');
var querystring=require('querystring');


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
    

    //get方式传参
    // var redata=url.parse(req.url,true).query;
    // console.log(redata);

    // if (redata['uname']!=undefined) {
    // 	console.log('用户名：'+redata['uname']+'\n');
    // 	console.log('密码：'+redata['pwd']+'\n');
    // }
    // 
    // callback=getCallback(req,res);
    // optfile.readfile('./views/login.html',callback);//异步

    //post方式传参   
    var post='';

    req.on('data', function(chunk) {
    	post+=chunk;
    });

    req.on('end', function() {
    	post=querystring.parse(post);

  //   	console.log(post);
  //   	console.log(post['uname']+post['pwd']);
		// callback=getCallback(req,res);
        arr=['uname','pwd'];
        function callback(data) {
        	res.writeHead(200,{'Content-type':'text/html;charset=utf-8;'});
         	dataStr=data.toString();
	        for (var i = 0; i < arr.length; i++) {
	        	re=new RegExp('{'+arr[i]+'}','g');
                dataStr=dataStr.replace(re,post[arr[i]]);
	        }
	        res.write(dataStr);
	        res.end();
         } 
	    optfile.readfile('./views/login.html',callback);//异步
    });

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
