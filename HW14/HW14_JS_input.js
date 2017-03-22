console.clear();

var OSM_bw = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var Esri_WorldStreetMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

var map = L.map('map').setView([0, 0],2);L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map); //[44.39, -84.11]

var baseMaps = {
  "ESRI StreetMap": Esri_WorldStreetMap,
  "OpenStreetMap (B&W)": OSM_bw,
};

map.doubleClickZoom.enable();
//myURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
myURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';

var geojsonMarkerOptions = {
  color: "#000",
  weight: 0, 
  opacity: 1,
  fillOpacity: 0.5
};

// set color of the circle
function getColor(d) {
  return d > 6 ? '#FF0000' : //red
  d > 5 ? 'orange' :
  d > 4 ? 'yellow' :
  d > 3 ? 'green' :
  'blue'; //white
}

var geojsonLayer = new L.GeoJSON.AJAX(myURL, {
  pointToLayer: function(feature, latlng) {
    return new L.CircleMarker(latlng, geojsonMarkerOptions);
  },
  style: function(feature) {
    //console.log(feature.properties.mag);//note this is how you access contents of each quake within L.geoJson
    return {
      radius: feature.properties.mag * 2,
      fillColor: getColor(feature.properties.mag)
    };
  },
  onEachFeature: function(feature, layer) {
   // layer.bindPopup("Mag: " + feature.properties.mag + "<br> Place: " + feature.properties.place);
    layer.bindPopup(feature.properties.title);
  }
}).addTo(map);

//create legend
var legend = L.control({
  position: 'bottomleft'
	//Possible values are 'topleft', 'topright', 'bottomleft' or 'bottomright'
});

legend.onAdd = function(map) {

  var div = L.DomUtil.create('div', 'info legend'),
    sizeCat = [3,4,5,6,7],
    labels = ['Weak','', 'Medium','', 'Strong'];

	
	//console.log(feature.length);
	
	 div.innerHTML += "<b>Magnitude</b><br>";
  // loop through items and generate a label with a colored square for each
  for (var i = 0; i < sizeCat.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getColor(sizeCat[i] ) + ' "></i> ' +' '+ labels[i]+'<br>';
  }
  
  //Used to count the number of earhtquakes and update the text  in the title.
$.ajax({
  url: myURL,
  dataType: 'json',
}).done(function(data) {

  totalNumber = data.features.length;
  $("#totalNumber").html(totalNumber);
});


$('#clearLayers').click(function() {
  map.removeLayer(geojsonLayer);
});

  return div;
};

legend.addTo(map);
