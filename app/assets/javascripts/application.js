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
var myMarker;
var mapOptions;
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
var myPos;
var usingCp = false;
var pos1;
var pos2;
var originLat;
var originLng;
var destLat;
var destLng;
var markers = [];

function initialize() {

  geocoder = new google.maps.Geocoder();
  
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

      var pinColor = "0000FF"
      var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
          new google.maps.Size(21, 34),
          new google.maps.Point(0,0),
          new google.maps.Point(10, 34));

      myMarker = new google.maps.Marker({
        position: myPos,
        map: map,
        title: "You are here",
        icon: pinImage
      }); 

      map.setCenter(myPos);
      console.log(myPos);

    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function setDirections() {

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

function showServices(services) {
  markers = [];
  for (var i = 0; i < services.length; i++) {
    var service = services[i];
    showService(service);
    
  }
}

function showService(service) {
  var servPosA = new google.maps.LatLng(service.origin_lat, service.origin_lng);
  var servPosB = new google.maps.LatLng(service.dest_lat, service.dest_lng);
  var marker = addMarker(servPosA);

  google.maps.event.addListener(marker, 'click', function() {
    // map.setZoom(16);
    map.setCenter(marker.getPosition());
    // if (window.confirm("Take this Picking service?")) {
      $.post("/take_service", { trip_id: service.trip_id }, function(){ console.log("done") });
      clearMarkers();
      marker.setMap(map);
      var start = servPosA;
      var end = servPosB;
      var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        region: "CO"
      };
      directionsDisplay.setMap(map);
      directionsService.route(request, function(response, status) {
        console.log(response);
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          var distance = response.routes[0].legs[0].distance
          var disText = distance.text;
          var cost = distance.value * 2;
          $('.address-box').removeClass('hide').addClass('show');
          $('.calcs').empty().append('<h5>Distance: '+disText+' | Cost: $'+cost+'</h5><button type="button" class="btn btn-primary pull-right" id="take-service">Take Service</button><button type="button" class="btn btn-default pull-right" id="cancel-service">Cancel</button>');
        }
      });
    // }
  });
}


function addMarker(location) {
  var marker = new google.maps.Marker({
    map: map,
    position: location,
    animation: google.maps.Animation.DROP,
  });
  markers.push(marker);
  return marker;
}

function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setAllMap(null);
}

function showMarkers() {
  setAllMap(map);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}


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

  
  $('#origin-input').on('keyup', function() {
    usingCp = false;
  });


  $('.address-input').on('input', function() {
    // e.preventDefault();
    $('.calcs').empty();
    $('.calcs').append('<button type="button" class="btn btn-primary pull-right" id="calc-btn">Calculate</button>');  
  });


  $('.calcs').on('click', '#calc-btn', function(){
    if (usingCp) {
      var start = myPos;
      originLat = myPos.k;
      originLng = myPos.D;
    }else {
      var start = pos1;
      originLat = pos1.k;
      originLng = pos1.D;
    }
    var end = pos2;
    destLat = pos2.k;
    destLng = pos2.D;
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
        var distance = response.routes[0].legs[0].distance
        var disText = distance.text;
        var cost = distance.value * 2;
        $('.calcs').empty();
        $('.calcs').append('<hr><h5>Distance: '+disText+' | Cost: $'+cost+'</h5><button type="button" class="btn btn-primary pull-right" id="find-btn">Find me a Picker</button>');
      }
    });
  });


  $('.calcs').on('click', '#find-btn', function(){
    $.post("/start", { originLat:originLat, originLng:originLng, destLat:destLat, destLng:destLng }, function(){ console.log("done") })
  });

  $('.calcs').on('click', '#take-service', function(){
    $.post("/take_service", { trip_id: service.trip_id }, function(){ console.log("done") });
  });

  $('.calcs').on('click', '#cancel-service', function(){
    directionsDisplay.setMap(null);
    map.setZoom(15);
    clearMarkers();
    showServices(services);
    map.setCenter(myPos);
    $('.address-box').removeClass('show').addClass('hide');
  });

});

