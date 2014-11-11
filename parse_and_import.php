<?php
	if($_GET['db']=='mysql')
		require_once("../include/mysql_db_connect.php");
	else
		require_once("../include/mongo_db_connect.php");
	$id = '';
	$title = '';
	$published = '';
	$content = '';
	$category = '';
	$duration = '';
	$fav_count = '';
	$viewcount = '';
	$author = '';
	$uid = '';
	$keyword = '';
	$f = fopen("smaller_test.rec","r");
	if($f){
		while(($line = fgets($f))!==false){
			$line = addslashes($line);
			if($line === "@\n"){
				echo $id."___</br>";
				echo $title."___</br>";
				echo $published."___</br>";
				echo $content."___</br>";
				echo $category."___</br>";
				echo $duration."___</br>";
				echo $fav_count."___</br>";
				echo $viewcount."___</br>";
				echo $author."___</br>";
				echo $uid."___</br>";
				echo $keyword."___</br><br>";
				
				#-----------insert-------------
				if($_GET['db']=='mysql'){
					$sql = "INSERT INTO `youtube_rec`(`id`, `title`, `published`, `content`, `category`, `duration`, `favorite_count`, `view_count`, `author`, `uid`, `keyword`) 
					VALUES ($id,'$title','$published','$content','$category',$duration,$fav_count,$viewcount,'$author','$uid','$keyword')";
				}
				else if($_GET['db']=='mongo'){
					$data = array("id" => $id,);
					$db->insert($data);
				}
				#-----------insert-------------
					
				#------------------------------
				$id = '';
				$title = '';
				$published = '';
				$content = '';
				$category = '';
				$duration = '';
				$fav_count = '';
				$viewcount = '';
				$author = '';
				$uid = '';
				$keyword = '';
			}
			else if(substr($line,1,2)==='id'){	
				$id = substr($line,4);
			}
			else if(substr($line,1,5)==='title'){	
				$title = substr($line,7);
			}
			else if(substr($line,1,7)==='content'){	
				$content = substr($line,9);
			}
			else if(substr($line,1,8)==='duration'){	
				$duration = substr($line,10);
			}
			else if(substr($line,1,13)==='favoriteCount'){	
				$fav_count = substr($line,15);
			}
			else if(substr($line,1,10)==='$viewCount'){
				$viewcount = substr($line,12);
			}
			else if(substr($line,1,6)==='author'){
				$author = substr($line,8);
			}
			else if(substr($line,1,4)==='_uid'){
				$uid = substr($line,6);
			}
			else if(substr($line,1,9)==='published'){
				$published = substr($line,11);
			}
			else if(substr($line,1,8)==='category'){
				$category = substr($line,10);
			}
			else if(substr($line,1,7)==='keyword'){
				$keyword = substr($line,9);
			}
		}
	}
	else{
		echo "error opening file\n";
	}
	fclose($f)
?>
