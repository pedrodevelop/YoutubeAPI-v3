var nomeCanal = 'MFWalkthroughs';
var upload_id;
var subscriptions;
var banner;

$(document).ready(function(){
	$.get("https://www.googleapis.com/youtube/v3/channels",{
			part:'brandingSettings',
			forUsername: nomeCanal,
			key:'AIzaSyBeUsAkH7YI4JwqkPLS7XFCY9hjgYHzJpE'},
			function(data){
				var fotoBanner;
				banner = data.items[0].brandingSettings.image.bannerImageUrl;
				fotoBanner = '<img src='+ banner +'>'
				$('div#janela_banner').html(fotoBanner);
				console.log(data)
			}
		)

	$.get("https://www.googleapis.com/youtube/v3/channels",{
			part: 'snippet',
			forUsername: nomeCanal,
			key:'AIzaSyBeUsAkH7YI4JwqkPLS7XFCY9hjgYHzJpE'},
			function(data){
				var fotoPerfil;
				foto = data.items[0].snippet.thumbnails.high.url;
				fotoPerfil = '<img src="' + foto +'" class="responsive">'
				$('div#janela_imagem_icon').prepend(fotoPerfil);
			}	
		)

	$.get("https://www.googleapis.com/youtube/v3/channels",{
			part: 'brandingSettings',
			forUsername: nomeCanal,
			key:'AIzaSyBeUsAkH7YI4JwqkPLS7XFCY9hjgYHzJpE'},
			function(data){
				canal = data.items[0].brandingSettings.channel.title;
				$('div#janela_imagem_icon div').prepend(canal);
			}	
		)

	$.get("https://www.googleapis.com/youtube/v3/channels",{
			part:'statistics',
			forUsername: nomeCanal,
			key: 'AIzaSyBeUsAkH7YI4JwqkPLS7XFCY9hjgYHzJpE'},
			function(data){
				var inscricoes;
				var valorFormatado;
				subscriptions = data.items[0].statistics.subscriberCount;
				console.log(subscriptions.substring(2,3))
				if ( subscriptions >= 1000 && subscriptions < 1000000) {
					quantidade = "mil"
					valorFormatado = subscriptions.substring(0,3)
				} else{
					if (subscriptions >= 1000000) {
						quantidade = "mi"
						valorFormatado = subscriptions.substring(0,2)
					}else{
						quantidade = ""
					}
				}
				if (subscriptions >= 1000000 && subscriptions.substring(2,3) >= 1 ) {
					valorFormatado = subscriptions.substring(0,2) +','+ subscriptions.substring(2,3)
				}
				if (subscriptions >= 100000 && subscriptions < 1000000 && subscriptions.substring(3,4) >= 1 ) {
					valorFormatado = subscriptions.substring(0,3) +','+ subscriptions.substring(3,4)
				}
				if (subscriptions >= 1000 && subscriptions < 10000 && subscriptions.substring(1,2) >= 1 && subscriptions.substring(2,3) >= 1 ) {
				valorFormatado = subscriptions.substring(0,1) +','+ subscriptions.substring(1,3)
				}
				inscricoes = '<br><small>' + valorFormatado +' ' + quantidade + ' inscritos</small>'
				$('div#janela_imagem_icon div').append(inscricoes);
			}
		)

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
				data.items.shift();
				$.each(data.items, function(i, item){
					imagem = item.snippet.thumbnails.medium.url;
					titulo = item.snippet.title;
					publicacao = formartarData(item.snippet.publishedAt);
					videoId = item.snippet.resourceId.videoId;
					arquivo = '<li class="principal"><a class="fancybox-media" data-fancybox href="https://www.youtube.com/watch?v='+ videoId +'"><div class="foto"><img src="'+ imagem +'"/><div class="legenda"><h5>'+ titulo + '</h5><p>Data: '+ publicacao +'</p></div></div></a></li>';
					$('div#janela ul').append(arquivo);
				});
			}
		)
	}

	function formartarData(data){
		return data.substr(8,2) + '/' + data.substr(5,2) + '/' + data.substr(0,4);
	}
});