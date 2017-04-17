var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var mapboxlayer = L.tileLayer('https://api.mapbox.com/styles/v1/saadtarik/cj1mjpunt001a2sqro6ki8fi7/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2FhZHRhcmlrIiwiYSI6ImNqMWNwbWJuNzAwNzEzM283czBpbWRnNXYifQ.isiT1-PV7VshNUa82D5gFg', {
    attribution: 'Saad Tarik'
});


var map = L.map('map', {
    center: [44.768, -83.331],
    zoom: 5.6,
    layers: [mapboxlayer]
});


var baseMaps = {
    "Mapbox": mapboxlayer,
    "OpenStreetMap": osm

};

var overlayMaps = {};
L.control.layers(baseMaps, overlayMaps).addTo(map);