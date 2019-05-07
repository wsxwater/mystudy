function fun2(res) {
	console.log('hello,fun2');
	res.write('你好，我是fun2');
}

function fun3(res) {
	console.log('hello,fun3');
	res.write('你好，我是fun3');
}


module.exports={
	fun2:fun2,
	fun3:fun3
};