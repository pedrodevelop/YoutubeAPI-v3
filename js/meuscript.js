var nomeCanal = 'MFWalkthroughs';
var upload_id;

$(document).ready(function(){
	$.get("https://www.googleapis.com/youtube/v3/channels", {
			part: 'contentDetails',
			forUsername: nomeCanal,
			key: 'AIzaSyBeUsAkH7YI4JwqkPLS7XFCY9hjgYHzJpE'},
			function(data) {
				upload_id = data.items[0].contentDetails.relatedPlaylists.uploads;
				pegarVideos(upload_id);
			} 
	)

	function pegarVideos(id) {
		$.get("https://www.googleapis.com/youtube/v3/playlistItems", {
				part: 'snippet',
				maxResults: 12,
				playlistId: id,
				key: 'AIzaSyBeUsAkH7YI4JwqkPLS7XFCY9hjgYHzJpE'},
			function(data) {
				var imagem;
				var arquivo;
				console.log(data)
				$.each(data.items, function(i, item){
					imagem = item.snippet.thumbnails.medium.url;
					titulo = item.snippet.title;
					publicacao = formartarData(item.snippet.publishedAt);
					videoId = item.snippet.resourceId.videoId;
					arquivo = '<li class="principal"><a class="fancybox-media" href="https://www.youtube.com/watch?v='+ videoId +'"><div class="foto"><img src="'+ imagem +'"/><div class="legenda"><h5>'+ titulo + '</h5><p>Data: '+ publicacao +'</p></div></div></a></li>';
					$('div#janela ul').append(arquivo);
				});
			}
		)
	}

	function formartarData(data){
		return data.substr(8,2) + '/' + data.substr(5,2) + '/' + data.substr(0,4);
	}
});