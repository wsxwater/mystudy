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
    		console.log(err);
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

module.exports={
	readfileSync:readfileSync,
	readfile:readfile,
	writefile:writefile
}