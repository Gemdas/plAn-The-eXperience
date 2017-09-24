$(document).ready(function(){

	// Grab query parameter from URL
	var urlQueryString = location.search;
	var encodedWords = urlQueryString.split('=');
	var keywords = decodeURI(encodedWords[1]);

	if (keywords === "undefined") {
		$("#searchInput").empty();
	} else {
		$("#searchInput").val(keywords);
	};


	// Click function for Search
	$("#searchBtn").on("click", function(event) {
		event.preventDefault();
		console.log("search click worked!");
		var searchInput = $("#searchInput").val().trim();
		console.log(encodeURI(searchInput));
		location.assign("results.html?q="+encodeURI(searchInput));
	})

	// Click function for event img and title
	$(document).on("click", ".thumbnail, .event-title",function(event) {
		console.log("click worked!");
		console.log($(this).data("eventID"));
		var eventID = $(this).data("eventID");
		location.assign("event.html?q="+encodeURI(eventID));
	})


	// Pagging location to Event brite API


	function show_alert(){
		var oArgs = {
			app_key:"sxjH4rQHGzt7d3v4",
			keywords: ((keywords === "undefined") ? "" : keywords),
			page_size: 25,
			where: "Austin"

		};
		EVDB.API.call("/events/search", oArgs, function(oData) {
	      // Note: this relies on the custom toString() methods below

	      var eventArray = oData.events.event;
				var mapMarkers = [];
	      console.log(eventArray);

	      for (var i=0 ; i < eventArray.length;  i++) {

		      if (eventArray[i].image === null) {
		      	var thumbnailUrl = './assets/images/ATXperience.png';
		      } else {
		      	var thumbnailUrl = eventArray[i].image.medium.url;
		      };

					if (eventArray[i].description === null || eventArray[i].description === "null" || eventArray[i].description === "" || eventArray[i].description === " ") {
						continue;
					};

					var marker  = {
						lng: eventArray[i].longitude,
						lat: eventArray[i].latitude,
						title: eventArray[i].title,
						id: eventArray[i].id,
					}

					mapMarkers.push(marker);


		      var eventCard = $('<div>');
		      eventCard.addClass('media-object event-results');
		      var imgSection = $('<div>');
		      imgSection.addClass('media-object-section');
		      var eventImg = $('<img>');
		      eventImg.addClass('thumbnail event-img');
		      eventImg.attr('src',thumbnailUrl);
					eventImg.data('eventID', eventArray[i].id);
		      var detailSection = $('<div>');
		      detailSection.addClass('media-object-section');
					var eventTitleLink = $('<a>');
					eventTitleLink.data('eventID', eventArray[i].id);
					eventTitleLink.addClass('event-title');
		      var eventTitle=$('<h4>');
		      eventTitle.html(eventArray[i].title);
		      var eventDescription=$('<p>');
		      eventDescription.html(eventArray[i].description);
		      eventDescription.shorten(({
		      		"showChars" : 150,
		      		"moreText"	: "<br>See More...",
		      		"lessText"	: "<br>Less...",
		      	}));
		      imgSection.append(eventImg);
					eventTitleLink.append(eventTitle);
		      detailSection.append(eventTitleLink);
		      detailSection.append(eventDescription);
		      eventCard.append(imgSection);
		      eventCard.append(detailSection);
		      $('#eventList').append(eventCard);

				};

					// Google Maps
					function myMap() {
						var mapProp = {
								center:new google.maps.LatLng(30.2672,-97.7431),
								zoom: 10,
						};

						var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

						for (var i = 0; i < mapMarkers.length; i++) {

							var marker = new google.maps.Marker({
								position: new google.maps.LatLng(mapMarkers[i].lat,mapMarkers[i].lng),
								map: map,
								title: mapMarkers[i].title,
								url: 'event.html?q=' + mapMarkers[i].id,
								animation:google.maps.Animation.DROP,
							});

							google.maps.event.addDomListener(marker, 'click', function() {
			            window.location.href = this.url;
			        });

						};

					};

					myMap();

	  });


	}
	show_alert();

})

