let map;
let markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 37.773, lng: -122.431}
  });
  let city_locator = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    deleteMarkers();
    locateCity(city_locator);
  });
}


function locateCity(city_locator) {
  let address = document.getElementById('address').value;
  let type = document.getElementById("place-type").value;
  console.log(address);
  console.log(type);
  city_locator.geocode({'address': address}, function(results, status) {
    console.log(status);
    if (status === 'OK') {
      console.log(results);
      map.setCenter(results[0].geometry.location);
      setLanguage(results);
      console.log(results[0].geometry.location.lat());
      console.log(results[0].geometry.location.lng());
      let lat1 = results[0].geometry.bounds.getNorthEast().lat();
      let lat2 = results[0].geometry.bounds.getSouthWest().lat();
      let lon1 = results[0].geometry.bounds.getNorthEast().lng();
      let lon2 = results[0].geometry.bounds.getSouthWest().lng();
      let radius = findRadius(lat1, lon1, lat2, lon2);
      console.log(`radius: ${radius}`);
      let service = new google.maps.places.PlacesService(map);
      let request = {
        location: {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()},
        radius: radius,
        query: `${address} + ${type}`
      }
      service.textSearch(request, callback);
    } else {
        alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function findRadius(lat1, lon1, lat2, lon2) {
  let R = 6371e3; // metres
  let φ1 = lat1 * Math.PI /180;
  let φ2 = lat2 * Math.PI /180;
  let Δφ = (lat2-lat1) * Math.PI /180;
  let Δλ = (lon2-lon1) * Math.PI /180;

  let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c / 2);
}

function callback(results, status) {
  console.log(results);
  console.log(`status: ${status}`);
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    console.log("inside callback");
    console.log(results);
    results.forEach(result => {
      createMarker(result);
    });
  }
}

function createMarker(place) {
  console.log("inside create marker");
  let infowindow = new google.maps.InfoWindow();
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  markers.push(marker);

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function deleteMarkers() {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
}