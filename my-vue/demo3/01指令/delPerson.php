<?php
	require 'Connection.php';
	
	$id=isset($_POST["id"])?mysqli_real_escape_string($conn,$_POST["id"]):'';

	echo $id;
    if ($id=-2) {
    	$sql = "TRUNCATE persons";
    }else{
		$sql = "DELETE FROM persons WHERE id='{$id}'"; 
    }


	//执行SQL语句(查询) 
	$result = $conn->query($sql); 

	if($result){
		echo "删除成功";
	}else{
		echo  "删除失败";
	}

	//require 'getPersons.php';


	//$conn->close();
?>