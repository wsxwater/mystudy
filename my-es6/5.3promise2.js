const fs=require('fs');

fs.readFile('笔记12.txt',function (err,data) {
	var p=new Promise(function (resolve,reject) {
		if (err) {
			reject(err);
		} else {
			resolve(data);
		}
		
	});

	p.then(function (value) {
		console.log(value);
		//console.log(value.toString());
	},function (value) {
		console.log(value);
	});5
});