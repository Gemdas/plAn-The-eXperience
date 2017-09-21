$(document).ready(function(){
	var keyword

	// Pagging location to Event brite API
	var eventfulURL = "http://eventful.com/events?q=music";
	function show_alert(){
		var oArgs = {
			app_key:"sxjH4rQHGzt7d3v4",
			//id: '20218701',

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

