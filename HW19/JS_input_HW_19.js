console.clear();

var map = L.map('map').setView([42.02, -93.64], 7);
var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        $("#location").html("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
  $("#location").html("Lat: " + position.coords.latitude + "<br> Lon: " + position.coords.longitude),
    map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), 17);
    var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
    marker.bindPopup("<b>Lat: </b>" + position.coords.latitude +
        "<br><b>Lon: </b>" + position.coords.longitude).openPopup();
}