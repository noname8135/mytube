<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="description" content="" />
		<title>Mytube</title>
		<script type="text/javascript" src="js/jquery-1.5.2.min.js"></script>
		
		<script type="text/javascript" src="js/search.js"></script>
		
        <link href="css/s960.css" type="text/css" rel="stylesheet">
		<link href="css/search.css" type="text/css" rel="stylesheet">
		<link rel="shortcut icon" type="image/png" href="images/favico.ico"/>
	</head>

	<body>  
		<section id="header">
			<div class="container_12">
				<div class="grid_12">
					<a href="index.php">
						<img src="images/logo.png">
					</a>
					<a href="litechat.html" id='sec_sublogo'>
						<img src='images/chat.png'>
					</a>
				</div>
			</div>
		</section>
		<section id="title-search-container" class="container_12">
			<div id="search">
					<div id='search_select'>
					<label for='search_col'>Search By:</label>
					<select id='search_col' class='select_bar'>
						<option value="title">title</option>
						<option value="content">content</option>
						<option value="author">author</option>
						<option value="keyword">keyword</option>
					</select>
					<br>
					Order By:
					<select id='search_order' class='select_bar'>
						<option value=''>whatever</option>					
						<option value="view_count">view_count</option>
						<option value="published">published</option>
						<option value="duration">duration</option>
						<option value="favorite_count">favorite_count</option>
					</select>
					<br>In Category:
					<select id='search_cat' class='select_bar'>
						<option value="">ALL</option>
						<option value="Music">Music</option>
						<option value="People">People</option>
						<option value="Tech">Tech</option>
						<option value="News">News</option>
						<option value="Games">Games</option>
						<option value="Animals">Animals</option>
						<option value="Entertainment">Entertainment</option>
						<option value="Comedy">Comedy</option>
						<option value="Travel">Travel</option>
						<option value="Sports">Sports</option>
						<option value="Autos">Autos</option>
						<option value="Education">Education</option>
						<option value="Howto">Howto</option>
						<option value="Film">Film</option>
						<option value="Nonprofit">Nonprofit</option>
						<option value="Shows">Shows</option>
						<option value="Trailers">Trailers</option>
						<option value="Movies">Movies</option>
					</select>
					</div>
					<div id='search_bottom'>
						<input type="text" id="search_text" required="required"/>
						<button id="search_btn" class="search_btn" onclick="search_go()"> GO </button>
					</div>
			</div>
		</section>
		<h1><center>Search for: <p id='phrase'>NOTHING YET~</p></center></h1>
		<section id="result_area" class="container_12">
		
		</section>
		<section id="footer" class="container_12">
			<div class="grid_12">
				ssg
			</div>
		</section><!-- footer -->
		
	</body>
	
</html>