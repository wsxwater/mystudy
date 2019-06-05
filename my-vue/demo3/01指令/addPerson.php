<?php 
	# echo "hello world!";
	# 
	require 'Connection.php';
    
	// if (isset($_POST['name']) || isset($_POST['age']) || isset($_POST['sex'])) {
 //    	echo 0;exit;
	// }
	// 
	

	$name=isset($_POST['name']) ? mysqli_real_escape_string($conn,$_POST['name']) : '';
	$age=isset($_POST['age']) ? mysqli_real_escape_string($conn,$_POST['age']) : '';
	$sex=isset($_POST['sex']) ? mysqli_real_escape_string($conn,$_POST['sex']) : '';

	if ($name || $age || $sex) {
		$query="INSERT INTO persons(id,name,age,sex) VALUES(default,'$name','$age','$sex')";

	    mysqli_query($conn,"set names utf8");
		
		if (mysqli_query($conn,$query)) {
			echo "用户添加成功";
		}else{
			echo "用户添加失败".mysqli_error($conn);
		}
	}	
	
	#$conn->close();
	
?>