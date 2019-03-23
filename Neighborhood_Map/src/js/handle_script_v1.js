var map;
var markers = [
	{
		title:"Marina Beach",
		lat: 13.0575,
		lng: 80.2822,
		streetAddress:"Bharathi Salai, Marina Beach",
		cityAddress:"Triplicane, Chennai, Tamil Nadu 600005",
		id:"nav0",
		visible:ko.observable(true),
		boolTest: true
	},
	{
		title:"Kapaleeshwarar Temple",
		lat: 13.0338,
		lng: 80.2699,
		streetAddress:"Kapaleesvarar Sannadhi Street, Vinayaka Nagar Colony",
		cityAddress:"Mylapore, Chennai, Tamil Nadu 600004",
		id:"nav1",
		visible:ko.observable(true),
		boolTest: true
	},
	{
		title:"Government Museum",
		lat: 13.0716,
		lng: 80.2568,
		streetAddress:"Beside Government Maternity Hospital, Pantheon Road",
		cityAddress:"Egmore, Chennai, Tamil Nadu 600008",
		id:"nav2",
		visible:ko.observable(true),
		boolTest: true
	},
	{
		title:"Edward Elliot's Beach (aka Bessy)",
		lat: 12.9989,
		lng: 80.2719,
		streetAddress:"Besant Nagar",
		cityAddress:"Chennai, India",
		id:"nav3",
		visible:ko.observable(true),
		boolTest: true
	},
	{
		title:"Guindy National Park",
		lat: 13.0049,
		lng: 80.2379,
		streetAddress:"Rangeguindy",
		cityAddress:"Chennai, Tamil Nadu 600025",
		id:"nav4",
		visible:ko.observable(true),
		boolTest: true
	},
	{
		title:"Birla Planetarium",
		lat: 13.0119,
		lng: 80.2440,
		streetAddress:"Gandhi Mandapam Rd, Duraisamy Nagar",
		cityAddress:"Kotturpuram, Chennai, Tamil Nadu 600025",
		id:"nav5",
		visible:ko.observable(true),
		boolTest: true
	}
];

function initMap() {
	map = new google.maps.Map(document.getElementById('map'),{
		center:{lat: 13.0368, lng: 80.2676},
		zoom: 13
	});
	
	setMarkers(markers);
}

function reloadPage() {
	window.location.reload();
}

function setMarkers(location) {
	var infoWindow = new google.maps.InfoWindow();
	// console.log(location);
	for (var i = 0; i < location.length; i++) {
		location[i].holdMarker = new google.maps.Marker({
			position: new google.maps.LatLng(location[i].lat, location[i].lng),
			map:map,
			title:location[i].title,
			description: location[i].streetAddress + '<br/>' + location[i].cityAddress,
			animation: google.maps.Animation.DROP,
			id: i
		});
		//var largeinfoWindow = new google.maps.infoWindow();
		// Populate the info-window to the marker
		// location[i].holdMarker.infoWindow = new google.maps.infoWindow();
		// console.log(infoWindow);
		google.maps.event.addListener(location[i].holdMarker,'click', (function(marker, i) {
			return function() {
				// console.log(marker.getPosition());
				map.setCenter(marker.getPosition());
				map.setZoom(15);
				marker.setAnimation(google.maps.Animation.BOUNCE);
				populateinfoWindow(this, infoWindow);
		}})(location[i].holdMarker, i));

		var searchNav = $('#nav' + i);
		searchNav.click(function(marker, i) {
			return function() {
				map.setCenter(marker.getPosition());
				map.setZoom(15);
				marker.setAnimation(google.maps.Animation.BOUNCE);
				
				populateinfoWindow(marker, infoWindow);
			}
		}(location[i].holdMarker, i));
	}
}

function populateinfoWindow(marker, infoWindow) {
	// Check to make sure the infoWindow is not already opened on this marker.
	// console.log(marker);
	// console.log(infoWindow);
	getWeatherDetails(marker);
	if (infoWindow.marker != marker) {
		// Clear the infoWindow content to give the streetview time to load.
		infoWindow.setContent('');
		infoWindow.marker = marker;
		// Make sure the marker property is cleared if the infoWindow is closed.
		infoWindow.addListener('closeclick', function() {
			infoWindow.marker = null;
		});
		var streetViewService = new google.maps.StreetViewService();
		var radius = 50;
		// In case the status is OK, which means the pano was found, compute the
		// position of the streetview image, then calculate the heading, then get a
		// panorama from that and set the options
		function getStreetView(data, status) {
			if (status == google.maps.StreetViewStatus.OK) {
				var nearStreetViewLocation = data.location.latLng;
				var heading = google.maps.geometry.spherical.computeHeading(
					nearStreetViewLocation, marker.position);
				// console.log(marker);
				infoWindow.setContent('<div><p>' + marker.title + '</p>' + '<p>' + marker.description + '</p><hr>' + '<div id="pano"></div>' + "</div>");
				var panoramaOptions = {
					position: nearStreetViewLocation,
					pov: {
						heading: heading,
						pitch: 30,
					}
				};
				var panorama = new google.maps.StreetViewPanorama(
					document.getElementById('pano'), panoramaOptions);
			} else {
				infoWindow.setContent('<div>' + marker.title + '</div>' + '<div>No Street View Found</div>' + weatherResult);
			}
		}
		// Use streetview service to get the closest streetview image within
		// 50 meters of the markers position
		streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
		// Open the infoWindow on the correct marker.
		infoWindow.open(map, marker);
	}
}

var viewModel = {
    query: ko.observable(''),
};

viewModel.markers = ko.dependentObservable(function() {
    var self = this;
    var search = self.query().toLowerCase();
    return ko.utils.arrayFilter(markers, function(marker) {
    if (marker.title.toLowerCase().indexOf(search) >= 0) {
            marker.boolTest = true;
            return marker.visible(true);
        } else {
            marker.boolTest = false;
            setAllMap();
            return marker.visible(false);
        }
    });       
}, viewModel);

ko.applyBindings(viewModel);

var isNavVis = true;
function noNav() {
	// body...
	$('#navigate').animate({
		height: 0,
	}, 500);
	setTimeout(function() {
		$('#navigate').hide();
	}, 500);
	$('#arrow').attr("src", 'images/down-arrow.gif');
	isNavVis = false;
}

function yesNav() {
	$("#navigate").show();
	var scrollerHight = $('').height() + 55;
	if($(window).height() < 600) {
		$("#navigate").animate({
			height: scrollerHight - 100,
		}, 500, function () {
			// body...
			$(this).css('height','auto').css("max-height", 439);
		});
	} 
	else {
		$("#navigate").animate({
			height: scrollerHight,
		}, 500, function () {
			$(this).css('height','auto').css("max-height", 549);
		});
	}
	$("#arrow").attr("src", "images/up-arrow.gif");
	isNavVisible = true;
}

function hidNav() {
	if(isNavVis === true) {noNav();}
	else {yesNav();}
}

$("#arrow").click(hidNav);

function setAllMap() {
	for (var i = 0; i < markers.length; i++) {
		if(markers[i].boolTest === true) {markers[i].holdMarker.setMap(map);}
		else {markers[i].holdMarker.setMap(null);}
	}
}

// Open weather API
function getWeatherDetails (locDetails) {
	// console.log(locDetails);
	var lat = locDetails.getPosition().lat();
	var lng = locDetails.getPosition().lng();
	
	var weatherUrl = "http://api.openweathermap.org/data/2.5/weather";
	function self()  { }
	self.Request = $.ajax({
		url: weatherUrl,
		jsonp: "callback",
		datatype: "jsonp",
		data: {
			units: "metric",
			lat: lat,
			lon: lng,
			APPID: "c9f079615f5c4c6ff4d7deb50ecfaa9b"
		},
		success: function(response) {
			 $("#currentTemp").append("<p>Temprature: " + response.main.temp + "C" + " Pressure: " + response.main.pressure + " hPa </p>");
		}
	});
	// return result;
}

function onGoogleMapLoadError() {
	alert("Please note that there is an error in loading the maps from google. Kindly contact your developers for the same.");
}

function gm_authFailure() {
	alert("This is to record an authentication issue with respect to google maps. Kindly contact your developers for the same.");
};