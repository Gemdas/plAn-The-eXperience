$(document).ready(function(){
// Getting the users IP address	
/*	var ipAddress;
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
		})
		.done(function(response){
			lat=response.latitude;
			long=response.longitude;
			console.log('latitude is '+lat);
			console.log('longitude is '+long);

		})*/
		var map;
		var infowindow;

		function initMap() {
			var pyrmont = {lat: -33.867, lng: 151.195};

			map = new google.maps.Map(document.getElementById('map'), {
				center: pyrmont,
				zoom: 15
			});

			infowindow = new google.maps.InfoWindow();
			var service = new google.maps.places.PlacesService(map);
			service.nearbySearch({
				location: pyrmont,
				radius: 500,
				type: ['store']
			}, callback);
		}

		function callback(results, status) {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				for (var i = 0; i < results.length; i++) {
					createMarker(results[i]);
				}
			}
		}

		function createMarker(place) {
			var placeLoc = place.geometry.location;
			var marker = new google.maps.Marker({
				map: map,
				position: place.geometry.location
			});

			google.maps.event.addListener(marker, 'click', function() {
				infowindow.setContent(place.name);
				infowindow.open(map, this);
			});
		}


			// Pagging location to Event brite API
			/* var eventfulURL = "http://eventful.com/events?q=music";
			function show_alert(){
				var oArgs = {
					app_key:"sxjH4rQHGzt7d3v4",
					id: '20218701',

					page_size: 25,
					where: "Austin"

				};
				EVDB.API.call("/events/search", oArgs, function(oData) {
			      // Note: this relies on the custom toString() methods below
			      console.log(oData);
			  });

			}
			show_alert();
			
		}) */

	// Click function for categories
	$(".back").on("click", function(event) {
		var categoryTopic = $(this).data("topic");
	})

	// Click function for Search
	$("#searchBtn").on("click", function(event) {
		event.preventDefault();
		var searchInput = $("#searchInput").val().trim();
		console.log(searchInput);
		$("form input").val("");
	})
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
			

		})
	})	*/

