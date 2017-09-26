$(document).ready(function(){
	//get event id
	var eventfulURL = "http://eventful.com/events?";
	var eventfulID = (location.search).substring((location.search).indexOf("=")+1);
	var oArgs = {
		app_key:"sxjH4rQHGzt7d3v4",
		id:eventfulID
	};

	var itineraryArray = [];
	var recArray = [];

	$(".icon").on("click", function(event) {

		if ($(this).data("state") === "plus") {
			$(this).removeClass("fi-plus");
			$(this).addClass("fi-check");
			$(this).data("state", "check");
			addToItinerary($(this).data("icon-id"));
		} else if ($(this).data("state") === "check") {
			$(this).removeClass("fi-check");
			$(this).addClass("fi-plus");
			$(this).data("state", "plus");
			removeFromItinerary($(this).data("icon-id"));
		} 

		/* $(".remove").on("click", function(event) {
			var itemName = ($(this).data("id"));
			$(this).closest("tr").remove();
		}) */

	})


	function addToItinerary(item) {
		
		if (itineraryArray.indexOf(item) > -1) {
			console.log("already added");
		} else {
			itineraryArray.push(item);
			var createRow = $("<tr>")
			var newItem = $("<td>").attr("data-id", item).text(item);
			var newInputBox = $("<input>").attr("type", "time");
			var newTime = $("<td>").attr("data-id", item).append(newInputBox);
			var newRow = createRow.append(newItem).append(newTime).attr("data-id", item);
			$("#itineraryTable").append(newRow);
		}

	}

	function removeFromItinerary(item) {

		var itemIndex = itineraryArray.indexOf(item);
		itineraryArray.splice(itemIndex, 1);
		console.log(itineraryArray);

		$('#itineraryTable tr[data-id="' + item + '"]').remove();

		// find itinerary item with data attribute of item and remove it from table

		console.log("remove function working");

	}


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
		console.log(long);
		//call the zomato api
		$.ajax({
			method: "GET",
			url:"https://developers.zomato.com/api/v2.1/search?apikey=d05924ed72ee85e73cf712157d5cd73c&count=6&lat="+lat+"&lon="+long+"&radius=8046.72&sort=rating",
		}).done(function(results){
			console.log(results);
			var eateries=results.restaurants;
			//populate the eats catagory
			for (var i = 0; i < eateries.length; i++) {
				recArray.push(eateries[i].restaurant.name);
				$("#food-rec-name"+i).text(eateries[i].restaurant.name);
				$("#food-rec-image"+i).attr("src", eateries[i].restaurant.featured_image);
				$("#food-rec-rating"+i).text((eateries[i].restaurant.user_rating.aggregate_rating)+"/5.0");
				$("#food-rec-URL"+i).attr("href", eateries[i].restaurant.url);
				$("#food-rec-category"+i).text(eateries[i].restaurant.cuisines);
				$("#food-rec-cost"+i).text("Cost for Two: $"+eateries[i].restaurant.average_cost_for_two);
				$("#food-rec-location"+i).text(eateries[i].restaurant.location.address);
				$("#food-rec-icon"+i).data("icon-id", eateries[i].restaurant.name);
			}

		});

	});
	 
	
	
	
	
});
