<?php
	require 'Connection.php';

	header("content-type:application/json; charset=utf-8");

	$sql = "SELECT * FROM persons"; 
	//执行SQL语句(查询) 
	$result = $conn->query($sql); 
	if ($result) {
		#数据集
		$users=array();
		$i=0;
		while($row = $result->fetch_assoc()){
			$users[$i]=$row;
			$i++;
		}
		echo json_encode(array('code'=>200,'dataList'=>$users),JSON_UNESCAPED_UNICODE);
		
	}
	$conn->close();
?>