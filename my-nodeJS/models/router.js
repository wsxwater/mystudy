var optfile=require('./optfile');
module.exports={
	login:function (req,res) {
		function callback(data) {
        	res.write(data);
			res.end('OK');
        }
        optfile.readfile('./views/login.html',callback);//异步
		//res.write('我是login页面');
	},
	reg:function (req,res) {
		function callback(data) {
        	res.write(data);
			res.end('OK');
        }
        optfile.readfile('./views/reg.html',callback);//异步
		//res.write('我是reg页面');
	}
};
