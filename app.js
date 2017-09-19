$(document).ready(function(){
	var ipAddress;
	var ipify='https://api.ipify.org?format=jsonp&callback=?';

	var getIP = $.getJSON( ipify, function( json ) {
		ipAddress= json.ip;
		console.log('You IP Address is:'+ ipAddress);

		var geoIp='https://freegeoip.net/json/'+ipAddress;
		console.log(geoIp);
		var lat;
		var long;
		$.ajax({
			url:geoIp,
			method:'GET',
			dataType:'json',	
		})
		.done(function(response){
			lat=response.latitude;
			long=response.longitude;
			console.log('latitude is '+lat);
			console.log('longitude is '+long);
			

			var googleApiURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA2QtFLDPl4gg-fPzzgUGpcUeiKcOAblwE&libraries=places"

			$.ajax({
				url:googleApiURL,
				method: 'GET',
				crossDomain:true,
				headers:{
					'X-Requested-With':'XMLHttpRequest'
				},
				Origin:'*',
				'Access-Control-Allow-Origin':'*'
			})
			.done(function(response){
				console.log('successful '+ response);

		})
	})			

})
})
