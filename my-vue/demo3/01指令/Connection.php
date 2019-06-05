<?php
	$db_host   = 'localhost';  //数据库主机名称，一般都为localhost 
	$db_user   = 'root';        //数据库用户帐号，根据个人情况而定 
	$db_passw = '';   //数据库用户密码，根据个人情况而定 
	$db_name  = 'persons';         //数据库具体名称，以刚才创建的数据库为准
	  
	//连接数据库 
	$conn = new mysqli($db_host,$db_user,$db_passw,$db_name);	
	// Check connection
	if ($conn->connect_error) {
	    die("数据库连接失败: " . $conn->connect_error);
	} 
?>