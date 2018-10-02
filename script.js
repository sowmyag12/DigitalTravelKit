const GOOGLE_MAPS_URL = "https://maps.googleapis.com/maps/api/js";
const GOOGLE_API_KEY = "AIzaSyDZPP2pokVpAEMTOq6WRrYp3eUd7cU1O90";

function initMap() {
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {lat: 37.773, lng: -122.431}
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function() {
      geocodeAddress(geocoder, map);
    });
  }

  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }


  
  /*function initMap() {
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {lat: 37.773, lng: -122.431}
    });

    changeCity(map);
  }

  function changeCity(map) {
    let geocoder = new google.maps.Geocoder();
    $('#enter-city').on('click', function(event) {
      geocodeAddress(geocoder, map);
    });
  }

  function geocodeAddress(geocoder, resultsMap) {
    let address = $(event).find('#city').val();
    geocoder.geocode({'address': address}, function(results,status){
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        let marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      }
      else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }*/
