	function init() {
		$('#result_area').empty();
		$('#thumbs-preloader').hide()
		.ajaxStart(function(e) {
			$(this).show();
		})
		
	}
	var flag = 0;
	function utf8_to_b64( str ) {
		return window.btoa(unescape(encodeURIComponent( str )));
	}

	function search_go(){
		flag = 0 ;
		var category = $('#category_select').val();
		var col = $('#search_col').val();
		var word = $('#search_text').val();
		var order = $('#search_order').val();
		$('#result_area').empty();
		$('#phrase').text(word);
		var url = 'query.php?from=search&word='+word+"&col="+col;
		
		if(category)
			url += '&cat='+category;
		if(order)
			url += '&order='+order;
		parseVideoFeed(url);
		$(window).scroll(function() {
		  var page = 0;
 		  if($(window).scrollTop() + $(window).height() == $(document).height()) {
     	  	parseVideoFeed(url+'&page_start='+(++page));
  		 }
		});
	}

	function parseVideoFeed(feed) {
	/*get data here.....................*/
		$.getJSON(feed, function(data) {
				
				$.each(data, function(i, entry) {
					if(!flag){
						flag = 1;
						var $sum_area = $('<div id="sum_area"></div>');
						$sum_area.append('</br><h3>'+entry.exe_time+' seconds, ' +entry.count+' hits</h3>');
						$('#result_area').append($sum_area);
					}
					//Create video thumbs
					else{
					var $videoDiv = $('<div></div>').addClass('grid_4 video-thumbnail');
					$videoDiv.append('<img src="//i.ytimg.com/vi/' + entry.id + '/mqdefault.jpg">');
					$videoDiv.append('<h5>' + entry.title + '</h5>');
					$videoDiv.append('<br><p>by ' + entry.author + '</p>');
					$videoDiv.append('<p>' + entry.view_count + ' views</p>');
					$('#result_area').append($videoDiv);
					
					//on thumbnail click
					$videoDiv.click(
					function(e) {
						$.get('query.php?from=update&id='+entry.id);	//update view_count
						var b64_encoded_entry = utf8_to_b64(JSON.stringify(entry));
						window.open("video.php#"+b64_encoded_entry,"_blank");
					});
					}
				});
		});
		
	}
/*
 * Start on Document Ready
 */
$(document).ready(function(e) {
	init();
});
