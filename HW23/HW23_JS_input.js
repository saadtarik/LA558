console.clear();

$(document).ready(function() {
    var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
    });
    var purpleline = L.tileLayer('http://mapwarper.net/maps/tile/20245/{z}/{x}/{y}.png', {
        attribution: 'Open Street Map',
        maxZoom: 18
    });
    var map = L.map('map', {
        center: new L.LatLng(38.97, -76.97),
        zoom: 11,
        layers: [osm, purpleline]
    });

    // Layer control
    var basemap = {
        "Open Street Map": osm
    };

    var overlay = {
        "MTA Purple Line": purpleline
    };

    L.control.layers(basemap, overlay).addTo(map);

})