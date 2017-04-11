var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var mapboxlayer = L.tileLayer('https://api.mapbox.com/styles/v1/saadtarik/cj1cpsity005u2slj55l0pvb0/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2FhZHRhcmlrIiwiYSI6ImNqMWNwbWJuNzAwNzEzM283czBpbWRnNXYifQ.isiT1-PV7VshNUa82D5gFg', {
    attribution: 'Saad Tarik'
});


var map = L.map('map', {
    center: [42.008, -93.612],
    zoom: 13.5,
    layers: [mapboxlayer]
});


var baseMaps = {
    "Mapbox": mapboxlayer,
    "OpenStreetMap": osm

};

var overlayMaps = {};
L.control.layers(baseMaps, overlayMaps).addTo(map);