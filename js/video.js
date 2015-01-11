	function b64_to_utf8( str ) {
		return decodeURIComponent(escape(window.atob( str )));
	}
	function init() {
		var x = location.hash.split('#')[1];
		var entry = JSON.parse(b64_to_utf8(x));
		console.log(entry);
		displayVideo(entry.id.substring(0,entry.id.length-1) ,entry.title);
		
		show_category(entry.category);
		$('#info_area').append('<br><div class="info" id="info">By: '+entry.author+'</br>Published on: '+entry.published+"</br>Viewed: "+entry.view_count+" times </div></br>");
		$('#info_area').append(entry.content+"</br>");
		$('#info_area').append();
	}
	function show_category(category){
		var url = 'query.php?from=index';
		if(category)
			url += '&cat='+category;
		parseVideoFeed(url);
	}
	function parseVideoFeed(feed) {
	/*get data here.....................*/
		$.getJSON(feed, function(data) {
				$.each(data, function(i, entry) {
					//Create video thumbs
					var $videoDiv = $('<div></div>').addClass('grid_4 video-thumbnail');
					$videoDiv.append('<img src="//i.ytimg.com/vi/' + entry.id + '/mqdefault.jpg">');
					$videoDiv.append('<p><b>' + entry.title + '</b></p>');
					$videoDiv.append('<br><p>by ' + entry.author + '</p>');
					$videoDiv.append('<p>' + entry.view_count + ' views</p>');
					$('#same_cat').append($videoDiv);
					
					//on thumbnail click
					$videoDiv.click(
					function(e) {
						$.get('query.php?from=update&id='+entry.id);	//update view_count
						var b64_encoded_entry = utf8_to_b64(JSON.stringify(entry));
						window.open("video.php#"+b64_encoded_entry,"_blank");
					});
				});
		});
		
	}
	function utf8_to_b64( str ) {
		return window.btoa(unescape(encodeURIComponent( str )));
	}

	function displayVideo(id, title) {
		$('#title-search-container h1').text(title);
		$('#main-videos').empty();
		$('#video-display').remove();
		$('#results-text').remove();
		
		var $videoDisplay = $('<section id="video-display"></div>');
		var $videoArea = $('<div id="video-area" class="grid_8"></div>');
		var $videoPlaceholder = $('<div id="video-placeholder"></div>');
		var params = {};
		params.allowfullscreen = "true";
		$videoDisplay.insertAfter('#title-search-container');
		$videoDisplay.append($videoArea);
		$videoArea.append($videoPlaceholder);
		
		//embed player 
		swfobject.embedSWF('https://www.youtube.com/e/' + id + '?enablejsapi=1&playerapiid=ytplayer', 
		'video-placeholder', '800', '600', '9.0.0', null, params, { allowScriptAccess: "always" }, 
		{ id: "mytubeplayer" } );
	}
	
	
$(document).ready(function(e) {
	init();
});