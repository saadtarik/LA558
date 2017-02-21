var map = L.map('map').setView([42.028365, -93.649307], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//this will add one marker
L.marker([42.0236, -93.6457]).addTo(map)
   .bindPopup("ISU Memorial Union");
   //.openPopup();


L.marker([42.027961, -93.648881], {opacity: 0.5}).addTo(map)
   .bindPopup("Parks Library");
   //.openPopup();

//
var marker3 = L.marker([42.021156, -93.634652], {draggable: true}).addTo(map)

marker3.bindPopup("Drag Me!").openPopup();

// Circles
var circ1 = L.circle([42.032852, -93.611600], 100, {color: 'red', fill: true,
                                        weight: 2}).addTo(map)

circ1.bindPopup("Hospital").openPopup();

var boundcoords = [[42.025158, -93.654092], [42.024919, -93.652397]];

var rect1 = L.rectangle(boundcoords, {color: "blue", weight: 10}).addTo(map);

rect1.bindPopup("State Gym").openPopup();

var circlemag1 = L.circleMarker([42.007393, -93.646958]).addTo(map);
circlemag1.setStyle({fillColor: 'green', color: 'green', radius: 8});
circlemag1.bindPopup("Small Park").openPopup();

var circlemag2 = L.circleMarker([42.012699, -93.621785]).addTo(map);
circlemag2.setStyle({fillColor: 'green', color: 'green', radius: 12});
circlemag2.bindPopup("Medium Park").openPopup();

var circlemag3 = L.circleMarker([42.041112, -93.650210]).addTo(map);
circlemag3.setStyle({fillColor: 'green', color: 'green', radius: 16});
circlemag3.bindPopup("Large Park").openPopup(); 