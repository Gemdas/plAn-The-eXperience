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
		console.log(oData);
		$("#event-title").text(oData.title);
		$("#event-date").text(oData.start_time);
		$("#event-venue").text(oData.venue_name);
		$("#event-address").text(oData.address);
		$("#event-URL").text(oData.url);
		$("#event-description").html(oData.description);
		//get the longituide & lattitude
		var lat=oData.latitude;
		var long=oData.longitude;
		console.log(lat);
		//call the zomato api
		$.ajax({
			method: "GET",
			url:"https://developers.zomato.com/api/v2.1/search?apikey=d05924ed72ee85e73cf712157d5cd73c&entity_type=city&count=5&lat="+lat+"&lon="+long+"&radius=8048&sort=rating",
		}).done(function(results){
			console.log(results);
			eateries=results.restaurants;
			//populate the eats catagory
			for (var i = 0; i < eateries.length; i++) {
				$("#food-rec-name"+i).text(eateries[i].name);
				$("#food-rec-image"+i).attr("src", eateries[i].photo_url);
				$("#food-rec-rating"+i).text(eateries[i].user_rating.aggregate_rating+"/5.0");
				$("#food-rec-URL"+i).text(eateries[i].url);
				$("#food-rec-category"+i).text(eateries[i].cuisines);
				$("#food-rec-cost"+i).text("Cost for two is: "+eateries[i].average_cost_for_two);
				$("#food-rec-location"+i).text(eateries[i].location.address);
			}
		}
		});
	});
	 
	
	
	
	
});
