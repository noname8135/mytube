	
	/*
	 * Start, Get Most Popular Videos Feed
	 */
	function init() {
		$('#main-videos').empty();
		$('#thumbs-preloader').hide()
		
		//preload
		.ajaxStart(function(e) {
			$(this).show();
		})
		
		//when finish, hide!
		/*.ajaxComplete(function(e) {
			$(this).css('display', 'none');
		});*/
		
		//parse most popular videos feed
		//parseVideoFeed('http://gdata.youtube.com/feeds/api/standardfeeds/most_popular?v=2&alt=json');
		var db = location.search.split('db=')[1];
		parseVideoFeed('http://140.123.103.188:8135/mytube/query.php?db='+db);
		//Search for a video
		$('#search-button').click(function(e) {
			e.preventDefault();
			var searchText =$('#search-text').val();
			location.href="search_results.php";
			
		});
	}
	
	/*
	 * Display a single video
	 * Get comments, and related videos
	 */
	function displayVideo(id, title) {
		//update title
		$('#title-search-container h1').text(title);
		
		//empty container, remove video div, to keep only 1 video visible
		//remove search result label (if searched for a video previously)
		$('#main-videos').empty();
		$('#video-display').remove();
		$('#results-text').remove();
		
		//create video area and comments area
		var $videoDisplay = $('<section id="video-display" class="container_12"></div>');
		var $videoArea = $('<div id="video-area" class="grid_8"></div>');
		var $videoPlaceholder = $('<div id="video-placeholder"></div>');
		
		$videoDisplay.insertAfter('#title-search-container');
		$videoDisplay.append($videoArea);
		$videoArea.append($videoPlaceholder);
		
		//embed player
		/*swfobject.embedSWF('http://www.youtube.com/e/' + id + '?enablejsapi=1&playerapiid=ytplayer', 
		'video-placeholder', '620', '375', '9.0.0', null, null, { allowScriptAccess: "always" }, 
		{ id: "myyoutubeplayer" } );*/
		
		//get video comments
		//parseComments('http://gdata.youtube.com/feeds/api/videos/' + id + '/comments?v=2&alt=json');
		
		//get related videos
		$('#main-videos').append('<div class="grid_12"><h3>Related Videos</h3></div>');
		parseVideoFeed('http://gdata.youtube.com/feeds/api/videos/' + id + '/related?v=2&alt=json');
	}
	
	/*
	 * Parse comments on a video
	 
	function parseComments(feed) {
		$('#main-comments').tabs();
		$('#tabs-1').append('<ul id="comments-list"></ul>');
		
		$.getJSON(feed, function(data) {
			if (data['feed']) {
				$.each(data['feed']['entry'], function(i, entry) {
					$('#comments-list').append('<li>' + entry.content.$t + '<span>by ' + entry.author[0].name.$t + '</span></li>');
				});
			}
		});
	}
	*/
	/*
	 * Parses a Video Feed : JSON
	 */
	function parseVideoFeed(feed) {
	
	/*get data here.....................*/
		var er = $.getJSON(feed, function(data) {
			console.log(data);
			
				$.each(data, function(i, entry) {
					//Create video thumbs
					console.log(entry);
					var $videoDiv = $('<div></div>').addClass('grid_4 video-thumbnail');
					$videoDiv.append('<img src="//i.ytimg.com/vi/' + entry.id + '/mqdefault.jpg">');
					$videoDiv.append('<h5>' + entry.title + '</h5>');
					$videoDiv.append('<br><p>by ' + entry.author + '</p>');
					$videoDiv.append('<p>' + entry.view_count + ' views</p>');
					$('#main-videos').append($videoDiv);
					
					//on thumbnail click
					$videoDiv.click(
					function(e) {
					//	displayVideo(entry.media$group.yt$videoid.$t, entry.title.$t);	
						location.href="video.php?id="+entry.id;
					});
				});
			
		});
		er.complete(
			function(){
				console.log(er);
			}
		)
	}
	
/*
 * Start on Document Ready
 */
$(document).ready(function(e) {
	init();
});
