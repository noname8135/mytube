<?php 
	$user='noname8135';
	$pass='056337853';
	$con = new MongoClient(); // Connect to Mongo Server
	
    $db = $con->selectDB("mytube")->selectCollection("mytube") or die('Could not connect '); // Connect to Database
?>