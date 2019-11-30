var fs=require('fs');

function readfileSync(path) {//同步读取
	var data=fs.readFileSync(path,'utf-8');
	console.log(data);
	console.log('同步执行完毕');
    return data; 
}

function readfile(path,callback) {//异步读取
    fs.readFile(path,function (err,data) {
    	if (err) {
<<<<<<< HEAD
    		console.log('bbb'+err);
    		callback('文件不存在！！！')
=======
    		console.log(err);
>>>>>>> ddc4ed0645783b77bb6c050ae019b20a64231d67
    	}else{
			//console.log(data.toString());
			callback(data);
    	}
    });
	
	console.log('异步执行完毕');
}

function writefile(path,data,callback) {//异步写文件
    fs.writeFile(path,data,function (err) {
    	if (err) {
    		throw err;
    	}else{
			console.log('It\'s saved!');//文件保存
			callback('写文件成功！！！');
    	}
    });
	
	console.log('异步执行完毕');
}

<<<<<<< HEAD
/**
 * [readImg 读取图片]
 * @param  {[type]} path [图片路径]
 * @param  {[type]} res  [respond]
 */
function readImg(path,res) {
	fs.readFile(path,'binary',function (err,filedata) {
	    	if (err) {
	    		throw err;
	    		return;
	    	}else{
				res.write(filedata,'binary');
				res.end();
	    	}
	})
}

module.exports={
	readfileSync:readfileSync,
	readfile:readfile,
	writefile:writefile,
	readImg:readImg
=======
module.exports={
	readfileSync:readfileSync,
	readfile:readfile,
	writefile:writefile
>>>>>>> ddc4ed0645783b77bb6c050ae019b20a64231d67
}