// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require bootstrap-sprockets
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var geocoder;
var map;
var infowindow = new google.maps.InfoWindow();
var marker;
var mapOptions;
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
var myPos;
var usingCp = false;
var pos1;
var pos2;

function initialize() {

  geocoder = new google.maps.Geocoder();
  var markers = [];
  // var anyPosition = new google.maps.LatLng(6.2087601, -75.5707247)
  mapOptions = {
    // center: anyPosition,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map_canvas"),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      myPos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      marker = new google.maps.Marker({
        position: myPos,
        map: map,
        title: "You are here"
      }); 

      map.setCenter(myPos);

    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }


  var input = /** @type {HTMLInputElement} */(
      document.getElementById('origin-input'));


  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // [START region_getplaces]
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    
    pos1 = markers[0].position;

    map.fitBounds(bounds);
    map.setZoom(18);
  });
  // [END region_getplaces]

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });


  var input2 = (document.getElementById('destination-input'));


  var searchBox2 = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input2));

  google.maps.event.addListener(searchBox2, 'places_changed', function() {
    var places = searchBox2.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    pos2 = markers[0].position;

    //map.fitBounds(bounds);
  });
  
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

// function currentLocation() {
// }





$(document).on("page:change", function(){

  $("#set-cp").click(function(e) {
    e.preventDefault();

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
      myPos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      map.setCenter(myPos);
      usingCp = true;

      geocoder.geocode({'latLng': myPos}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            $('#origin-input').val(results[0].formatted_address);
            map.setZoom(18);
            infowindow.setContent(results[0].formatted_address);
            infowindow.open(map, marker);
          } else {
            alert('No results found');
          }
        } else {
          alert('Geocoder failed due to: ' + status);
        }
      });

    }, function() {
      handleNoGeolocation(true);
    });
    } else {
      handleNoGeolocation(false);
    }
  });

  $('.address-input').blur(function() {
    // e.preventDefault();
    $('.calcs').empty();
    if (usingCp) {
      var start = myPos;
    }else {
      var start = pos1;
    }
    var end = pos2;
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        region: "CO"
    };
    console.log(request);
    directionsDisplay.setMap(map);
    directionsService.route(request, function(response, status) {
      console.log(response);
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        var distance = response.routes[0].legs[0].distance.text;
        $('.calcs').append('<div class="calcs"><hr><h5>Distance: 5.6 Km | Cost: $20.000</h5><button type="button" class="btn btn-primary pull-right" id="find-btn">Find me a Picker</button></div>');
      }
    });
  });

  $('.calcs').on('click', '#find-btn', function(){
    
  });

});

