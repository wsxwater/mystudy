var mysql=require('mysql');

//创建一个connection 
var connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'test',
	port:'3306'
});


console.log(connection);