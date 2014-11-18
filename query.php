<?php 
	$db_type = $_GET['db'];
	if($db_type==='mongo')
		require_once('include/mongo_db_connect.php');
	else if($db_type==='mysql')
		require_once('include/mysql_db_connect.php');
	else {
		echo "UNKNOWN DB TYPE!";
		exit();
	}
	
	if($db_type === 'mongo'){
		$result = array();
		$cursor = $db->find()->limit(20);#->sort(array('view_count'=>-1));
		$cursor->timeout(-1);
		$i=0;
		foreach ($cursor as $tmp){
			$result[$i++] = $tmp;
		}
	}
	else{
		$query = "SELECT * FROM mytube ORDER BY view_count";
		$result = mysqli_query($db,$query);
	}
	echo json_encode($result);
?>