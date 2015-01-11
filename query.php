<?php 
	session_start();
	#if(substr($_SERVER["HTTP_REFERER"],0,27)!=='http://140.123.103.188:8135'||$_SESSION['name']!=='shuai')
	#	exit();
	require_once('include/mysql_db_connect.php');
	if($_GET['from']==="index"){
		if(isset($_GET['cat']))
			$category = $_GET['cat'];
		if($category){
			$query = "SELECT * FROM mytube WHERE category = '$category\n' ORDER BY view_count DESC limit 15";
		}
		else
			$query = "SELECT * FROM mytube ORDER BY view_count DESC limit 15";
		$data = mysqli_query($db,$query);
		$result = array();
		$i=0;
		while($row = mysqli_fetch_array($data, MYSQLI_ASSOC)){
			$result[$i++] = $row;
		}
	}
	else if($_GET['from']==='update'){
		$query = "SELECT * FROM mytube ";######
	}
	else if($_GET['from']==='search'){
		echo 'hi';
	}
	
	echo json_encode($result);
?>
