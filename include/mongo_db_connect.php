<?php 
	$user='noname8135';
	$pass='056337853';
	$con = new MongoClient(); // Connect to Mongo Server
	#var_dump($con);
    $db = $con->selectDB("mytube") or die('Could not connect '); // Connect to Database
    #var_dump($db);
?>