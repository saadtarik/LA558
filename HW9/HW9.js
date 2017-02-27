var map = L.map('map').setView([42.028365, -93.649307], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//this will add one marker
var marker1 = L.marker([42.025418, -93.646072]).addTo(map)

marker1.bindPopup("The Campanile <br> <img src = 'https://upload.wikimedia.org/wikipedia/commons/7/70/ISU_campanile.jpg' width = '80px'/>")

var redIcon = L.icon({
  iconUrl: 'http://www.google.com/mapfiles/marker.png',
  // shadowUrl: 'http://maps.google.com/mapfiles/arrowshadow.png',
  iconSize: [20, 34], // size of the icon
  //shadowSize: [39, 34], // size of the shadow
  iconAnchor: [10, 34], // icon pixel which will correspond
  // to the marker's location relative
  // to its top left corner of image
  //shadowAnchor: [10, 34], // the same for the shadow
  popupAnchor: [1, -35] // point from which the popup should
    // open relative to the iconAnchor
});

//var marker1test = L.marker([42.023938, -93.647544], {
//  draggable: false,
//}).addTo(map)

var marker2 = L.marker([42.023938, -93.647544], {
  icon: redIcon,
  draggable: true,
}).addTo(map)

marker2.bindPopup("<strong>Lake LaVerne </strong><br> Named for Dr. LaVerne W. Noyes, who also donated the funds to see that Alumni Hall could be completed after sitting unfinished and unused from 1905 to 1907. Dr. Noyes is an 1872 alumnus. Lake LaVerne is located west of the Memorial Union and south of Alumni Hall, Carver Hall, and Music Hall. The lake was a gift from Dr. Noyes in 1916.", {
  maxWidth: 200,
  minWidth: 150,
  maxHeight: 80,
  autoPan: true,
  keepInView: true,
  closeButton: true,

});
marker2.openPopup();

// Div icon
var myDivIcon1 = L.divIcon({
  iconSize: new L.Point(60, 40),
  iconAnchor: new L.Point(20, 20),
  html: 'Stephens Auditorium',
  className: 'leaflet-div-icon'
});

var makerDivIcon1 = L.marker([42.020232, -93.637927], {
  icon: myDivIcon1,
}).addTo(map).bindPopup("Div Icon");

//Circle Marker
var circleMarkers = [
  ["15", 42.014834, -93.671175, "School"],
  ["20", 42.013481, -93.635511, "Stadium"],
  ["15", 42.033839, -93.677398, "School"],
  ["30", 42.008318, -93.645402, "Park"],
  ["30", 42.029621, -93.630258, "Park"],
  ["30", 42.019264, -93.631719, "Park"],
  ["25", 42.018434, -93.637044, "Parking Lot"],
  ["25", 42.013398, -93.648757, "Parking Lot"],
  ["20", 42.021526, -93.669419, "Super Market"],
  ["20", 42.019894, -93.619945, "Super Market"],
];

//Set the colors of the markers
function markerColor(x) {
  return x == 'School' ? "#a2bae0" :
    x == 'Stadium' ? "#ff4e50" :
    x == 'Park' ? "#88b200" :
    x == 'Parking Lot' ? "#b4b7be" :
    x == 'Super Market' ? "#ff9b6f" :
    "#FFFFFF";
}

for (var i = 0; i < circleMarkers.length; i++) {
  marker = new L.circleMarker([circleMarkers[i][1], circleMarkers[i][2]], {
      radius: circleMarkers[i][0] / 2,
      fillColor: markerColor(circleMarkers[i][3]),
      color: "#000",
      weight: 0,
      opacity: 1,
      fillOpacity: 1
    })
    .bindPopup("Category: " + circleMarkers[i][3])
    .addTo(map);
}
