<?php
	#require_once("include/mysql_db_connect.php");
#	require_once("include/mongo_db_connect.php");
#	$collection = $db->mytube;
#	$cursor = $collection->find();
   	// iterate cursor to display title of documents
#   	foreach ($cursor as $document) {
#    	 echo $document['id']."<br>";
#   	}
	$id = '';
	$title = '';
	$published = '';
	$content = '';
	$category = '';
	$duration = '0';
	$fav_count = '0';
	$viewcount = '0';
	$author = '';
	$uid = '';
	$keyword = '';
	$f = fopen("y1_20.rec","r");
	$counter = 0;
	if($f){
		while(($line = fgets($f))!==false){
			$line = addslashes($line);
			if($line === "@\n"){
				$counter++;
				
				$record  = array("id"=>"$id", "title"=>"$title", "published"=>"$published", "content"=>"$content", "category"=>"$category", "duration"=>"$duration", "favorite_count"=>$fav_count, "view_count"=>$viewcount, "author"=>"$author", "uid"=>"$uid", "keyword"=>"$keyword");
				echo "{'id':'$record[id]',"."'title':'$record[title]',"."'published':'$record[published]',"."'content':'$record[content]',"."'category':'$record[category]',"."'duration':'$record[duration]',"."'favorite_count':$record[favorite_count],"."'view_count':$record[view_count],"."'author':'$record[author]',"."'uid':'$record[uid]',"."'keyword':'$record[keyword]'}\n";
				#-----------insert-------------
				#if($_GET['db']=='mysql'){
					/*
					$sql = "INSERT INTO mytube(id,title,published,content,category,duration,favorite_count,view_count,author,uid,keyword) 
					VALUES ('$id','$title','$published','$content','$category',$duration,$fav_count,$viewcount,'$author','$uid','$keyword')";
					$result = mysqli_query($db,$sql) ;
					if ($result ===false){
						$estr=mysqli_error($db);
						var_dump($estr);
						 "\n<br>".$sql;
					}*/
				#}
				#else if($_GET['db']=='mongo'){
				#	$data = array("id" => $id,);
				#	$db->insert($data);
				#}
				$id = '';
				$title = '';
				$published = '';
				$content = '';
				$category = '';
				$duration = '0';
				$fav_count = '0';
				$viewcount = '0';
				$author = '';
				$uid = '';
				$keyword = '';
			}
			else if(substr($line,1,2)==='id'){	
				$id = substr($line,4,-1);
			}
			else if(substr($line,1,5)==='title'){	
				$title = substr($line,7,-1);
			}
			else if(substr($line,1,7)==='content'){	
				$content = substr($line,9,-1);
			}
			else if(substr($line,1,8)==='duration'){	
				$duration = substr($line,10,-1);
			}
			else if(substr($line,1,13)==='favoriteCount'){	
				$fav_count = substr($line,15,-1);
			}
			else if(substr($line,1,10)==='$viewCount'){
				$viewcount = substr($line,12,-1);
			}
			else if(substr($line,1,6)==='author'){
				$author = substr($line,8,-1);
			}
			else if(substr($line,1,4)==='_uid'){
				$uid = substr($line,6,-1);
			}
			else if(substr($line,1,9)==='published'){
				$published = substr($line,11,-1);
			}
			else if(substr($line,1,8)==='category'){
				$category = substr($line,10,-1);
			}
			else if(substr($line,1,7)==='keyword'){
				if (substr($line,-1)==="\n")
				$keyword = substr($line,9,-1);
				else
				$keyword = substr($line,9);
			}
		}
	}
	else{
		echo "error opening file\n";
	}
	fclose($f);
		#echo "successfully insert $counter record!";
?>
