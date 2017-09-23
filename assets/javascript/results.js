$(document).ready(function(){

	// Grab query parameter from URL
	var urlQueryString = location.search;
	var encodedWords = urlQueryString.split('=');
	var keywords = decodeURI(encodedWords[1]);
	console.log(keywords);

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

	      var eventArray=oData.events.event;
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

	      }
	  });


	}
	show_alert();

})

