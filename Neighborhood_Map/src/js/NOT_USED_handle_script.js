var map;
var markers = [];

/*function loadScript() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?v=3&callback=initMap';
	document.body.appendChild(script);
}*/
//window.onload = loadScript;

function initMap() {
	var mapDetails = {
		zoom: 13,
		center: {lat: 13.0368, lng: 80.2676},
	};
	map = new google.maps.Map(document.getElementById('map'), mapDetails);
	setMarkers(markers);
	setAllMap();
	function resetMap() {
		map.setZoom(mapDetails.zoom);
		map.setCenter(mapDetails.center);
	}
	$("#reset").click(function() {
		resetMap();
		console.log("reset happened");
	});
	$(window).resize(function () {
		resetMap();
	});
}

function setAllMap() {
	for (var i = 0; i < markers.length; i++) {
		if(markers[i].boolTest === true) {
			markers[i].holdmarker.setMap(map);
		}
		else {
			markers[i].holdmarker.setMap(null);
		}
	}
}

// Markers - Array JSON with places to stay
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
		id:"nav0",
		visible:ko.observable(true),
		boolTest: true
	},
	{
		title:"Government Museum",
		lat: 13.0716,
		lng: 80.2568,
		streetAddress:"Beside Government Maternity Hospital, Pantheon Road",
		cityAddress:"Egmore, Chennai, Tamil Nadu 600008",
		id:"nav0",
		visible:ko.observable(true),
		boolTest: true
	},
	{
		title:"Edward Elliot's Beach (aka Bessy)",
		lat: 12.9989,
		lng: 80.2719,
		streetAddress:"Besant Nagar",
		cityAddress:"Chennai, India",
		id:"nav0",
		visible:ko.observable(true),
		boolTest: true
	},
	{
		title:"Guindy National Park",
		lat: 13.0049,
		lng: 80.2379,
		streetAddress:"Rangeguindy",
		cityAddress:"Chennai, Tamil Nadu 600025",
		id:"nav0",
		visible:ko.observable(true),
		boolTest: true
	},
	{
		title:"Birla Planetarium",
		lat: 13.0119,
		lng: 80.2440,
		streetAddress:"Gandhi Mandapam Rd, Duraisamy Nagar",
		cityAddress:"Kotturpuram, Chennai, Tamil Nadu 600025",
		id:"nav0",
		visible:ko.observable(true),
		boolTest: true
	}
];

// For the street view images we are going with the below code
var headingImageView = [5, 235, 55, 170, 190, 240, -10, 10, 190];
var streetViewImage;
var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=180x90&location=';

function determineImage() { // Need to make a few changes according to the above mentioned array
    if (i === 3) {
        streetViewImage = streetViewUrl + '38.892052,-77.008888&fov=75&heading=' + headingImageView[i] + '&pitch=10';
    } else if (i === 4) {
        streetViewImage = streetViewUrl +
                        markers[i].streetAddress + ',' + markers[i].cityAddress +
                        '&fov=75&heading=' + headingImageView[i] + '&pitch=10';
    } else {
       streetViewImage = streetViewUrl +
                        markers[i].lat + ',' + markers[i].lng +
                        '&fov=75&heading=' + headingImageView[i] + '&pitch=10';
    }
}

//Sets markers on maps within the initialise functions

function setMarkers(location) { // this also can be changed
	var defaultIcon = makeMarkerIcon('0091ff');
	var highlightedIcon = makeMarkerIcon('FFFF24');
	for(i=0; i<location.length; i++) {
		location[i].holdMarker = new google.maps.Marker({
			 position: new google.maps.LatLng(location[i].lat, location[i].lng),
			 map: map,
			 title: location[i].title,
			 icon: defaultIcon,
			 id: i
		 });
		 //function to place google street view images within info windows
		 determineImage();
		 //Binds infoWindow content to each marker
		 location[i].contentString = '<img src="' + streetViewImage +
		 '" alt="Street View Image of ' + location[i].title + '"><br><hr style="margin-bottom: 5px"><strong>' +
		 location[i].title + '</strong><br><p>' +
		 location[i].streetAddress + '<br>' +
		 location[i].cityAddress + '<br></p><a class="web-links" href="http://' + location[i].url + '" target="_blank">' + location[i].url + '</a>';
		 var infowindow = new google.maps.InfoWindow({
			 content: markers[i].contentString
		 });
		 //Click marker to view infoWindow
		 //zoom in and center location on click
		 new google.maps.event.addListener(location[i].holdMarker, 'click', (function(marker, i) {
			 return function() {
				 infowindow.setContent(location[i].contentString);
				 infowindow.open(map,this);
				 var windowWidth = $(window).width();
				 if(windowWidth <= 1080) {
					 map.setZoom(14);
				 } else if(windowWidth > 1080) {
					 map.setZoom(16);
				 }
				 map.setCenter(marker.getPosition());
				 location[i].picBoolTest = true;
			 };
		 })(location[i].holdMarker, i));
		 //Click nav element to view infoWindow
		 //zoom in and center location on click
		 var searchNav = $('#nav' + i);
		 searchNav.click((function(marker, i) {
			 return function() {
				 infowindow.setContent(location[i].contentString);
				 infowindow.open(map,marker);
				 map.setZoom(16);
				 map.setCenter(marker.getPosition());
				 location[i].picBoolTest = true;
			 };
		 })(location[i].holdMarker, i));
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

//show $ hide markers in sync with nav
$("#input").keyup(function() {
setAllMap();
});


// Making markers instead of adding images -
function makeMarkerIcon(markerColor) {
	var markerImage = new google.maps.MarkerImage(
		'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor + '|40|_|%E2%80%A2',
		new google.maps.Size(21, 34),
		new google.maps.Point(0, 0),
		new google.maps.Point(10, 34),
		new google.maps.Size(21,34));
		return markerImage;
}
var isNavVisible = true;
function noNav() {
    $("#search-nav").animate({
                height: 0, 
            }, 500);
            setTimeout(function() {
                $("#search-nav").hide();
            }, 500);    
            $("#arrow").attr("src", "img/down-arrow.gif");
            isNavVisible = false;
}
function yesNav() {
    $("#search-nav").show();
            var scrollerHeight = $("#scroller").height() + 55;
            if($(window).height() < 600) {
                $("#search-nav").animate({
                    height: scrollerHeight - 100,
                }, 500, function() {
                    $(this).css('height','auto').css("max-height", 439);
                });  
            } else {
            $("#search-nav").animate({
                height: scrollerHeight,
            }, 500, function() {
                $(this).css('height','auto').css("max-height", 549);
            });
            }
            $("#arrow").attr("src", "img/up-arrow.gif");
            isNavVisible = true;
}

function hideNav() {
    if(isNavVisible === true) {
            noNav();
            
    } else {
            yesNav();  
    }
}
$("#arrow").click(hideNav);
