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
	

	

			// Pagging location to Event brite API
			var eventfulURL = "http://eventful.com/events?q=music";
			function show_alert(){
				var oArgs = {
					app_key:"sxjH4rQHGzt7d3v4",
					id: '20218701',

					page_size: 25,
					where: "Austin"

				};
				EVDB.API.call("/events/search", oArgs, function(oData) {
			      // Note: this relies on the custom toString() methods below
			      
			      var eventArray=oData.events.event;
			      console.log(eventArray);

			      for (var i=0 ; i < eventArray.length;  i++) {
			      	
			      if (eventArray[i].image === null) {
			      	var thumbnailUrl = './assets/images/ATXperience.png';
			      } else {
			      	var thumbnailUrl = eventArray[i].image.medium.url;
			      }

			      var eventCard= $('<div>');
			      eventCard.addClass('media-object event-results');
			      var imgSection=$('<div>');
			      imgSection.addClass('media-object-section');
			      var eventImg= $('<img>');
			      eventImg.addClass('thumbnail event-img');
			      eventImg.attr('src',thumbnailUrl);
			      var detailSection=$('<div>');
			      detailSection.addClass('media-object-section');
			      var eventTitle=$('<h4>');
			      eventTitle.html(eventArray[i].title);
			      var eventDescription=$('<p>');
			      eventDescription.html(eventArray[i].description);

			      imgSection.append(eventImg);
			      detailSection.append(eventTitle);
			      detailSection.append(eventDescription);
			      eventCard.append(imgSection);
			      eventCard.append(detailSection);
			      $('#eventList').append(eventCard);

			      }
			  });


			}
			show_alert();
			
		}) 

	// Click function for categories
	$(".back").on("click", function(event) {
		console.log("click worked!");
		console.log($(this).data("topic"));
	})

	// Click function for Search
	$("#searchBtn").on("click", function(event) {
		event.preventDefault();
		console.log("search click worked!");
		var searchInput = $("#searchInput").val().trim();
		console.log(searchInput);
		$("form input").val("");
	})




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

