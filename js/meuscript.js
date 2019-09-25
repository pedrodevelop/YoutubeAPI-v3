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
				$.each(data.items, function(i, item){
					imagem = item.snippet.thumbnails.medium.url;
					arquivo = '<li class="principal"><div class="foto"><img src="'+ imagem +'"/><div class="legenda"><h5>Título</h5></div></div></li>';
					$('div#janela ul').append(arquivo);
				});
			}
		)
	}
});