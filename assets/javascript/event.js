$(document).ready(function(){
	//get event id
	var eventfulURL = "http://eventful.com/events?";
	var eventfulID = (location.search).substring((location.search).indexOf("=")+1);
	var oArgs = {
		app_key:"sxjH4rQHGzt7d3v4",
		id:eventfulID
	};

	$(".icon").on("click", function(event) {

		console.log("click worked");
		console.log($(this).data("icon-id"));
		console.log($(this).data("state"));
		console.log($(this));

		// if data-state equals plus-sign, remove class fa-plus, add class fa-check, change data-state to check, run addToItinerary function
		if ($(this).data("state") === "plus") {
			$(this).removeClass("fi-plus");
			$(this).addClass("fi-check");
			$(this).data("state", "check");
			addToItinerary($(this).data("icon-id"));
		} else if ($(this).data("state") === "check") {
			$(this).removeClass("fi-check");
			$(this).addClass("fi-plus");
			$(this).data("state", "plus");
		}

		$(".remove").on("click", function(event) {
			$(this).closest("tr").remove();
		})
	})


	function addToItinerary(item) {
		
		var createRow = $("<tr>")
		var removeBtn = $("<button>").addClass("remove").attr("data-id", item).text("X");
		var removeIcon = $("<td>").attr("data-id", item).append(removeBtn);
		var newItem = $("<td>").attr("data-id", item).text(item);
		var newInputBox = $("<input>").attr("type", "time");
		var newTime = $("<td>").attr("data-id", item).append(newInputBox);
		var newRow = createRow.append(removeIcon).append(newItem).append(newTime);
		$("#itineraryTable").append(newRow);

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
			url:"https://developers.zomato.com/api/v2.1/search?apikey=d05924ed72ee85e73cf712157d5cd73c&count=6&lat="+lat+"&lon="+long+"&radius=1609.34&sort=rating",
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
				$("#food-rec-cost"+i).text("Cost for Two: $"+eateries[i].restaurant.average_cost_for_two);
				$("#food-rec-location"+i).text(eateries[i].restaurant.location.address);
				$("#food-rec-icon"+i).data("icon-id", eateries[i].restaurant.name);
			}

		});

	});
	 
	
	
	
	
});
