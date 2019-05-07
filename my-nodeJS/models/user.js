function User(id,name,age) {
	this.id=id;
	this.name=name;
	this.age=age;
	this.enter=function () {
		console.log(`我是${this.name}，可以进入图书馆。`);
	};
}

module.exports=User;