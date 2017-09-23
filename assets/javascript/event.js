$(document).ready(function(){
	//get event id
	var eventfulURL = "http://eventful.com/events?";
	var eventfulID = (location.search).substring((location.search).indexOf("=")+1);
	var oArgs = {
		app_key:"sxjH4rQHGzt7d3v4",
		id:eventfulID
	};
	//send the eventful api the id
	EVDB.API.call("/events/get", oArgs, function(oData) {
		//populate the event page
		var eventTime = oData.start_time;
		var formattedDate = moment(eventTime).format("MMMM Do YYYY, h:mm a");
		$("#event-title").text(oData.title);
		$("#event-date").text(formattedDate);
		$("#event-venue").text(oData.venue_name);
		$("#event-address").text(oData.address);
		$("#event-URL").attr("href", oData.url);
		$("#event-description").html(oData.description);
		//get the longituide & lattitude
		var lat=oData.latitude;
		var long=oData.longitude;
		console.log(lat);
		//call the zomato api
		$.ajax({
			method: "GET",
			url:"https://developers.zomato.com/api/v2.1/search?apikey=d05924ed72ee85e73cf712157d5cd73c&entity_type=city&count=6&lat="+lat+"&lon="+long+"&radius=8048&sort=rating",
		}).done(function(results){
			console.log(results);
			var eateries=results.restaurants;
			//populate the eats catagory
			for (var i = 0; i < eateries.length; i++) {
				$("#food-rec-name"+i).text(eateries[i].restaurant.name);
				$("#food-rec-image"+i).attr("src", eateries[i].restaurant.featured_image);
				$("#food-rec-rating"+i).text((eateries[i].restaurant.user_rating.aggregate_rating)+"/5.0");
				$("#food-rec-URL"+i).attr("href", eateries[i].restaurant.url);
				$("#food-rec-category"+i).text(eateries[i].restaurant.cuisines);
				$("#food-rec-cost"+i).text("Cost for two is: "+eateries[i].restaurant.average_cost_for_two);
				$("#food-rec-location"+i).text(eateries[i].restaurant.location.address);
			}

		});

	});
	 
	
	
	
	
});
