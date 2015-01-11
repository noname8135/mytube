	function init() {
		$('#main-videos').empty();
		$('#thumbs-preloader').hide()
		//preload
		.ajaxStart(function(e) {
			$(this).show();
		})

		parseVideoFeed('query.php?from=index');
		load_jqcload();
		$(window).scroll(function() {
		  var page = 0;
 		  if($(window).scrollTop() + $(window).height() == $(document).height()) {
     	  	parseVideoFeed('query.php?from=index&page_start='+(++page));
  		 }
		});
	}

	function load_jqcload(){
		$.getJSON("query.php?from=jqcloud", function(data){
		
		var word_list = [
			{text: "ALL", weight: 500, handlers:{click:function(){show_category('')}}},
			{text: "Music", weight:data[7]['b']/2, handlers:{click:function(){show_category('music')}}},
			{text: "People", weight: data[9]['b'], handlers:{click:function(){show_category('peopl')}}},
			{text: "Games", weight: data[5]['b'], handlers:{click:function(){show_category('games')}}},
			{text: "Animate", weight: data[0]['b'], handlers:{click:function(){show_category('anima')}}},
			{text: "Entertainment", weight: data[4]['b'], handlers:{click:function(){show_category('enter')}}},
			{text: "Comedy", weight: data[2]['b'], handlers:{click:function(){show_category('comed')}}},
			{text: "Sport", weight: data[11]['b'], handlers:{click:function(){show_category('sport')}}},
			{text: "Autos", weight: data[1]['b'], handlers:{click:function(){show_category('autos')}}},
			{text: "Educations", weight: data[3]['b'], handlers:{click:function(){show_category('educa')}}},
			{text: "Howto", weight: data[6]['b'], handlers:{click:function(){show_category('howto')}}},
			{text: "Non-profit", weight: data[8]['b'], handlers:{click:function(){show_category('nonpr')}}},
			{text: "Shows", weight: data[10]['b'], handlers:{click:function(){show_category('shows')}}},
			{text: "Trail", weight: data[12]['b'], handlers:{click:function(){show_category('trail')}}},
		];
		$("#jqcloud_area").jQCloud(word_list, {
			delayedMode: true, 
			randomClasses: 3
		});
		});
	}
	function utf8_to_b64( str ) {
		return window.btoa(unescape(encodeURIComponent( str )));
	}

	function show_category(category){
		$('#main-videos').empty();
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
					$videoDiv.append('<h5>' + entry.title + '</h5>');
					$videoDiv.append('<br><p>by ' + entry.author + '</p>');
					$videoDiv.append('<p>' + entry.view_count + ' views</p>');
					$('#main-videos').append($videoDiv);
					
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
/*
 * Start on Document Ready
 */
$(document).ready(function(e) {
	init();
});
