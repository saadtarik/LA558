console.clear()

var OSM_bw = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var Esri_WorldStreetMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

var map = L.map('map').setView([44.39, -84.11],5);L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var baseMaps = {
  "ESRI StreetMap": Esri_WorldStreetMap,
  "OpenStreetMap (B&W)": OSM_bw,
};

//set color of marker
function getColor(d) {
  return d == '1' ? '#9F0410' :
         d == '2' ? "#14049F" :
         d == '3' ? "#7DE723" :

         "#FFFFFF"; //white
}
//set the color of markers
function style(feature) {
    return {
        fillColor: getColor(feature.properties.sizeCat),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '2',
        fillOpacity: 0.7
    };
}

var url = "https://saadtarik.github.io/LA558/Data/GreatLakes.geojson";

var geojsonLayer = new L.GeoJSON.AJAX(url , {
  style: style,
	 pointToLayer: function (feature, latlng) {
        return new L.CircleMarker(latlng, {
//            stroke: true,
//            weight: 2, //stroke weight
//            color: '#000000', //stroke color
//            opacity: 1.0, //stoke opacity
//			      fillColor: 'yellow',
//            fillOpacity: 0.85,
//            radius: 10,
           //title: this is not supported here - see layer.bindTooltip  below
       });
    },

    onEachFeature: function (feature, layer) {
        htmlText = "<strong>" + feature.properties.name + "</strong><br> Area: " + feature.properties.area;
        layer.bindPopup(htmlText);
		    layer.bindTooltip(feature.properties.name);
    }
}).addTo(map);

//create legend
var legend = L.control({
  position: 'bottomleft'
	//Possible values are 'topleft', 'topright', 'bottomleft' or 'bottomright'
});

legend.onAdd = function(map) {

  var div = L.DomUtil.create('div', 'info legend'),
    sizeCat = [1, 2, 3],
    labels = ['Greater than 31,000', '15,000 to 31,000', 'Less than 15,000'];

	
	//console.log(feature.length);
	
	 div.innerHTML += "<b>Size [sq. mi.]</b><br>";
  // loop through items and generate a label with a colored square for each
  for (var i = 0; i < sizeCat.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getColor(sizeCat[i] ) + ' "></i> ' +' '+ labels[i]+'<br>';
  }

  return div;
};

legend.addTo(map);

var Cities = new L.LayerGroup();

  L.marker([43.026901, -87.912723]).bindPopup('Milwaukee').addTo(Cities),
  L.marker([42.342972, -83.082390]).bindPopup('Detroit').addTo(Cities),
  L.marker([41.855674, -87.668992]).bindPopup('Chicago').addTo(Cities);

var Forests = new L.LayerGroup();

  L.marker([44.525493, -83.789985]).bindPopup('Huron National Forest').addTo(Forests),
  L.marker([43.778345, -85.839215]).bindPopup('Mainstee National Forest').addTo(Forests),
  L.marker([46.365940, -88.817196]).bindPopup('Ottawa National Forest').addTo(Forests);

var overlays = {
  "Cities": Cities,
  "National Forests": Forests
}

L.control.layers(baseMaps, overlays).addTo(map);