console.clear();

var OSM_bw = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var Esri_WorldStreetMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

var map = L.map('map').setView([-37.83, 175.38],8);L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map); //[44.39, -84.11]

var baseMaps = {
  "ESRI StreetMap": Esri_WorldStreetMap,
  "OpenStreetMap (B&W)": OSM_bw,
};

map.doubleClickZoom.enable();
//myURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
		var markers = L.markerClusterGroup();
		var singleMarkers = L.layerGroup([]);

		for (var i = 0; i < addressPoints.length; i+=100) {
		  var a = addressPoints[i];
		  var title = a[2];
		  var marker = L.marker(new L.LatLng(a[0], a[1]), {
		    title: title
		  });console.clear();

var OSM_bw = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var Esri_WorldStreetMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

var map = L.map('map').setView([-37.83, 175.38],10);L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map); //[44.39, -84.11]

var baseMaps = {
  "ESRI StreetMap": Esri_WorldStreetMap,
  "OpenStreetMap (B&W)": OSM_bw,
};

map.doubleClickZoom.enable();
//myURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
		var markers = L.markerClusterGroup();
		var singleMarkers = L.layerGroup([]);

		for (var i = 0; i < addressPoints.length; i+=100) {
		  var a = addressPoints[i];
		  var title = a[2];
		  var marker = L.marker(new L.LatLng(a[0], a[1]), {
		    title: title
		  });
		  marker.bindPopup(title);
		  markers.addLayer(marker);
		  singleMarkers.addLayer(marker);
		}

		map.addLayer(singleMarkers);

//Heat map
var myArray = [];
var max = 100;
var min = 1;
var map;

//Assign x, y, z values
for (var i = 0; i< addressPoints.length; i+=100) {
  var x = addressPoints[i][0];
  var y = addressPoints[i][1];
  var z = addressPoints[i][2];
  //nsole.log(x)
  myArray.push([x, y, z]);
}
console.log(addressPoints.length);
console.log(myArray);
		//layer control

var heatMap = L.heatLayer(myArray, {
	minOpacity: 0.1, //the minimum opacity the heat will start at
	maxZoom: 19, //zoom level where the points reach maximum intensity (as intensity scales with zoom), equals maxZoom of the map by default
	max: 1.0, //maximum point intensity, 1.0 by default
	radius: 25, //radius of each "point" of the heatmap, 25 by default
	blur: 15, //amount of blur, 15 by default
	gradient: {
			0.2: 'yellow', 
			0.65: 'lime', 
			1: 'red'
	} //color gradient config, e.g. {0.4: 'blue', 0.65: 'lime', 1: 'red'}	
}).addTo(map);


		var baseMaps = {
		  "OSM": OSM_bw
		};

		var overlayMaps = {
		  "Single markers": singleMarkers,
		  "Cluster": markers,
      "Heatmap": heatMap
		};


		L.control.layers(baseMaps, overlayMaps).addTo(map);
		  marker.bindPopup(title);
		  markers.addLayer(marker);
		  singleMarkers.addLayer(marker);
		}

		map.addLayer(singleMarkers);


		//layer control

		var baseMaps = {
		  "OSM": OSM_bw
		};

		var overlayMaps = {
		  "Single markers": singleMarkers,
		  "Cluster": markers

		};


		L.control.layers(baseMaps, overlayMaps).addTo(map);