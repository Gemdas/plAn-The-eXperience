			

$(document).ready(function(){
// Getting the users IP address	

	var ipAddress;
	var ipify='https://api.ipify.org?format=jsonp&callback=?';

	var getIP = $.getJSON( ipify, function( json ) {
	ipAddress= json.ip;
	console.log('You IP Address is:'+ ipAddress);

// Getting the users Geolocation
		var geoIp='https://freegeoip.net/json/'+ipAddress;
		console.log(geoIp);
		var lat;
		var long;
		$.ajax({
			url:geoIp,
			method:'GET',
			dataType:'json',	
		}).done(function(response){
			lat=response.latitude;
			long=response.longitude;
			console.log('latitude is '+lat);
			console.log('longitude is '+long);

// Creating a map using google maps api and appending the script to <head>
		
		});	


			

			

// Pagging location to Event brite API
		function show_alert()

{

  var oArgs = {

            app_key:"sxjH4rQHGzt7d3v4",

            id: "20218701",

            page_size: 25 ,

  };

  EVDB.API.call("/events/get", oArgs, function(oData) {
console.log
   

    });

}

		


			
			

		
});
// Passing the user's location to Google API
		/*var googleApiURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA2QtFLDPl4gg-fPzzgUGpcUeiKcOAblwE&libraries=places"

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
			*/



